import _ from "lodash"
import { walkAst } from "./ast"
import { LogType, MetaData, YamlNode, YamlNodeType } from "./types"
import { Logger } from "./tsToyaml/logger"
import { isRefVairble, setAllYamlNodeVaribleName, getValidParams, printParams, printTreeNodes, renderRequire, walkNode } from "./utils"


const logger = Logger.logger()



const renderExport = (varibleList: string[]) => {

  const varibles = _.union(varibleList)

  return `
  return {
    ${varibles.join(',')}
  }
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


export const print = (astJson: YamlNode) => {

  const resources: YamlNode[] = []
  const actions: YamlNode[] = []
  let buffer = ''
  walkAst(astJson, {
    [YamlNodeType.Resource]: (node: YamlNode) => {
      resources.push(node)
    },
    [YamlNodeType.Action]: (node: YamlNode) => {
      actions.push(node)
    },
  })

  const varibleList = setAllYamlNodeVaribleName(resources)


  const groupByResourceName = _.groupBy(resources, 'name')

  buffer += renderRequire(Object.keys(groupByResourceName))

  const treeObj = []
  buffer += walkNode(astJson, treeObj, varibleList)
  buffer += printTreeNodes(treeObj)
  buffer += renderExport(varibleList)

  return buffer
}
export const print1 = (astJson: YamlNode, printTree = false) => {

  if (!astJson) {
    logger.log(`[print]: astJson is null`, LogType.Warning)
    return
  }
  let buffer = ''
  const resources: YamlNode[] = []
  const actions: YamlNode[] = []


  walkAst(astJson, {
    [YamlNodeType.Resource]: (node: YamlNode) => {
      resources.push(node)
    },
    [YamlNodeType.Action]: (node: YamlNode) => {
      actions.push(node)
    },
  })


  const varibleList = setAllYamlNodeVaribleName(resources)

  const resourcesSet = new Set(resources)
  const resourcesMap = new Map<YamlNode, any>()

  const _resourcesMap = new Map<string, YamlNode>()

  resources.forEach(node => {
    const { cloneParams, refVaribles } = getValidParams(node, varibleList) ?? {}
    node.params = cloneParams as any
    resourcesMap.set(node, refVaribles)
    _resourcesMap.set(node.varibleName, node)
  })
  const _resources: YamlNode[] = []
  while (resourcesMap.size > 0) {
    resourcesMap.forEach((refVaribles, n) => {

    })
  }
  // getValidParams()

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
