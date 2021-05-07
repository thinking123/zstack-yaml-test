import _ from "lodash"
import { walkAst } from "./ast"
import { LogType, MetaData, YamlNode, YamlNodeType, DumpConfig } from "./types"
import { Logger } from "./tsToyaml/logger"
import { isRefVairble, setAllYamlNodeVaribleName, getValidParams, printParams, printTreeNodes, renderRequire, walkNode } from "./utils"


const logger = Logger.logger()



const renderExport = (varibleList: string[]) => {

  const varibles = _.union(varibleList)

  return `
  return {
    ${varibles.join(',')}
  };
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


export const print = (astJson: YamlNode, config?: DumpConfig) => {

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

