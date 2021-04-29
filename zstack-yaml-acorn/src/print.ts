import _ from "lodash"
import { walkAst } from "./ast"
import { MetaData, YamlNode, YamlNodeType } from "./types"
import { Logger } from "./tsToyaml/logger"


const logger = Logger.logger

export const renderRequire = (resources: string[], path: string = './assert.js') => {

  return `
    const {
      ${resources.join(',\n')}
    } = requrie("${path}")
  `
}




const transformParams = (params: MetaData[], varibleList: string[]) => {
  if (!params) return ''

  const varibleReg = /(\w+)\.(\w+)/

  const _params = params?.map(param => {
    const paramName = Object.keys(param)?.[0]
    const paramValue = Object.values(param)?.[0]


    if (typeof paramValue === 'string') {
      const [, resource, property] = paramValue?.match(varibleReg) ?? []
      if (resource && property && varibleList.includes(resource)) {
        return `${paramName}:${resource}.${property}`
      }
    }

    let _paramValue: any = ''

    if (typeof paramValue !== 'string' || paramValue === 'undefined') {
      _paramValue = paramValue === 'undefined' ? undefined : paramValue
    } else {
      _paramValue = `"${paramValue}"`
    }

    return `${paramName}:${_paramValue}`
  })?.join(',\n') ?? ''


  return _params ? `{
    ${_params}
  }` : ''
}

export const print = (astJson: YamlNode, printTree = false) => {

  if (!astJson) {
    console.info("null astJson")
    return
  }
  let buffer = ''
  const resources: YamlNode[] = []
  const actions: YamlNode[] = []
  const varibleList: string[] = []
  walkAst(astJson, {
    [YamlNodeType.Resource]: (node: YamlNode) => {
      resources.push(node)
    },
    [YamlNodeType.Action]: (node: YamlNode) => {
      actions.push(node)
    },
  })


  const groupByResourceName = _.groupBy(resources, 'name')

  buffer += renderRequire(Object.keys(groupByResourceName))

  _.forEach(groupByResourceName, (nodes: YamlNode[], resourceName: string) => {
    const namedList = nodes?.filter(({ varibleName }) => varibleName) ?? []
    const names = namedList?.map(({ varibleName }) => varibleName) ?? []

    varibleList.push(...names)

    const notNamedList = nodes?.filter(({ varibleName }) => !varibleName)
    let index = 1
    notNamedList.forEach((node: YamlNode) => {
      const baseName = resourceName[0].toLowerCase() + resourceName.substr(1)
      let name = `${baseName}_${index}`
      while (names?.includes(name)) {
        index++
        name = `${baseName}_${index}`
      }
      node.varibleName = name
      varibleList.push(name)
    })
  })


  resources.forEach((node: YamlNode) => {
    const { type, varibleName, name, params } = node

    const initParam = transformParams(params, varibleList)

    buffer += `const ${varibleName} = new ${name}(${initParam})\n`

    const actions = node.children.filter(({ type }) => type === YamlNodeType.Action)

    actions.forEach(({ params: actionParams, name: actionName }) => {

      const initActionParam = transformParams(actionParams, varibleList)

      buffer += `
        ${varibleName}.${actionName}(${initActionParam})
      `
    })
  })

  let resourceList: string[] = []
  let curBuf = ''
  resources.forEach((node: YamlNode) => {
    const { parent, varibleName } = node

    if (!parent || parent.type === YamlNodeType.Root) {
      curBuf = 'Env'
    } else {
      curBuf = `${parent.varibleName}`
    }
    curBuf += `.add(${varibleName})`
    resourceList.push(curBuf)
  })

  buffer += resourceList.join('\n')

  return buffer
}
