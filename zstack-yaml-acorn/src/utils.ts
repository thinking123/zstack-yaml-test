import { ResourceReg, ActionReg, RefVaribleReg } from "./constant"
import glob from 'glob'
import fs from 'fs'
import ts from 'typescript'
import path from 'path'
import _ from "lodash"
import prettier from 'prettier'
import { RawSource, ReplaceSource } from 'webpack-sources'
import { Logger } from "./tsToyaml/logger"
import { ParserConfig, ParserMode } from "./tsToyaml/types"
import { YamlNode, YamlNodeType } from "./types"
import { walkAst } from "./ast"



const isResource = (key: string | number) => typeof key === 'string' && (key?.match(ResourceReg))
const isAction = (key: string | number) => typeof key === 'string' && (key?.match(ActionReg))
const isRefVairble = (str: any, varibleList: string[]) => {
  if (typeof str !== 'string') return

  const [, varibleName] = str?.match(RefVaribleReg) ?? []

  if (!varibleList.includes(varibleName)) return

  return varibleName
}




const logger = Logger.logger()

const valToString = varObj => Object.keys(varObj)[0]

const isYamlNode = node => node && typeof node === 'object' && 'name' in node && 'children' in node

async function getAllFilesByPatterns(dirOrFiles: string, pattern: RegExp, extension: string): Promise<string[]>
async function getAllFilesByPatterns(dirOrFiles: string[], pattern: RegExp, extension: string): Promise<string[]>
async function getAllFilesByPatterns(dirOrFiles: string | string[], pattern: RegExp, extension: string): Promise<string[]> {

  let files: string[] = []
  if (Array.isArray(dirOrFiles)) {
    files = dirOrFiles?.filter((file) => file.match(pattern))
  } else {
    const dir = path.join(process.cwd(), dirOrFiles as string, './')

    return new Promise((res, rej) => {
      glob(`${dir}**/*${extension}`, (err, _files: string[]) => {
        if (err) {
          return rej(err)
        }
        files = _files?.filter((file) => file.match(pattern)) ?? []
        res(files)
      })
    })
  }

  return files
}

const overWriteFile = (modifyRange: Set<ts.ReadonlyTextRange>,
  exportValirbles: Set<string>,
  fileName: string, config: ParserConfig) => {
  const { extension, mode } = config
  const sourceString = fs.readFileSync(fileName).toString()
  let rawSource = new RawSource(sourceString)
  let replaceSource = new ReplaceSource(rawSource)
  let yamlFileName = getYamlFileName(fileName, config)

  let firstLine: any
  modifyRange.forEach(range => {
    if (!firstLine) {
      firstLine = range
    }
    const length = range.end - range.pos + 1
    const newText = " ".repeat(length)
    replaceSource.replace(range.pos, range.end, newText)
  })


  const exportReg = new RegExp(`(${Array.from(exportValirbles).join('|')})(?=\\.)`, 'g')


  let replaceSourceString = replaceSource.source();

  let allVaribles = [...String(replaceSourceString).matchAll(exportReg)]?.map(v => v?.[0])?.filter(Boolean)

  allVaribles = _.union(allVaribles)
  if (mode === ParserMode.Combine) {
    yamlFileName = `all.yaml`
  } else {
    yamlFileName = yamlFileName.replace(process.cwd(), '')
  }
  const yamlTag = getFileNameYamlTag(fileName, extension)

  const insertImport = `import { dumpYaml } from 'zstack-node-test-code-yaml-acorn';
  import * as allResources from '@test/features/helper/env-generator'
  import * as Root  from '@test/features/helper/simple-test'
  `

  let insertFunction = `
    dumpYaml("${yamlFileName}", "${yamlTag}");
  `
  if (allVaribles.length > 0) {
    insertFunction = `
    const {
      ${allVaribles.join(',')}
    } = dumpYaml("${yamlFileName}", "${yamlTag}" , {
      allResources,
      mnEnv: Root.mnEnv
    });
    `
  }


  rawSource = new RawSource(replaceSourceString)
  replaceSource = new ReplaceSource(rawSource)

  replaceSource.insert(0, insertImport)


  if (firstLine) {
    replaceSource.insert(firstLine.pos, insertFunction)
    replaceSourceString = replaceSource.source()

    const output = replaceSourceString
    // const output = prettier.format(replaceSourceString, {
    // })
    fs.writeFileSync(fileName, output, {
      flag: "w+"
    })
  } else {
    logger.log(`[overWriteFile]: no firstLine , overWriteFile failed`)
  }

}

const getYamlFileName = (file: string, { pattern }: ParserConfig) => {
  return file?.replace(pattern, (m, c) => {
    return '.yaml'
  })
}
const getFileNameYamlTag = (file: string, extension: string) => {
  return file?.replace(path.join(process.cwd(), './'), '')?.replace(extension, '')?.replace(/\/(\w)?/g, (m, c) => {
    return `_${c ?? ''}`
  })
}


const getAllVaribles = (root: YamlNode) => {
  const resources: YamlNode[] = []
  walkAst(root, {
    [YamlNodeType.Resource]: (node: YamlNode) => {
      resources.push(node)
    },
  })

  const allVaribles = new Set<string>()

  resources.forEach(({ varibleName }: YamlNode) => {
    if (varibleName) {
      allVaribles.add(varibleName)
    }
  })

  return allVaribles
}

const setAllYamlNodeVaribleName = (resources: YamlNode[]): string[] => {


  const allVaribleNames = resources?.filter(({ varibleName }) => varibleName)?.map(({ varibleName }) => varibleName)

  const groupByResourceName = _.groupBy(resources, 'name')


  _.forEach(groupByResourceName, (nodes: YamlNode[], resourceName: string) => {
    const namedList = nodes?.filter(({ varibleName }) => varibleName) ?? []

    const notNamedList = nodes?.filter(({ varibleName }) => !varibleName)
    let index = 1
    notNamedList.forEach((node: YamlNode) => {
      const baseName = resourceName[0].toLowerCase() + resourceName.substr(1)
      let name = `${baseName}${index}`
      while (allVaribleNames?.includes(name)) {
        index++
        name = `${baseName}${index}`
      }
      node.varibleName = name
      allVaribleNames.push(name)
    })
  })

  return allVaribleNames

}

const getValidParams = (node: YamlNode, varibleList: string[]) => {
  const { params } = node
  if (!params) return null
  const refVaribles = new Set<string>()
  const cloneParams = {}

  const addValue = (objOrArray: any, value: any, key: any) => {
    if (Array.isArray(objOrArray)) {
      objOrArray.push(value)
    } else {
      objOrArray[key] = value
    }
  }
  const parse = (obj: any, currentObj: any) => {
    _.forEach(obj, (value: any, key) => {
      let varibleName: string
      if (value === null) {
        addValue(currentObj, value, key)
      } else if (value === 'undefined') {
        addValue(currentObj, undefined, key)
      } else if (typeof value === 'number') {
        addValue(currentObj, value, key)
      } else if ((varibleName = isRefVairble(value, varibleList))) {
        refVaribles.add(varibleName)
        addValue(currentObj, `$${value}$`, key)
      } else if (typeof value === 'string') {
        addValue(currentObj, value, key)
      }
      currentObj[key] = Array.isArray(value) ? [] : {}
      parse(value, currentObj[key])
    })
  }

  parse(params, cloneParams)

  return { refVaribles, cloneParams }
}
const printTreeNodes = (treeObj: any) => {
  let buffer = ''
  let level = 0
  const ident = () => ' '.repeat(level * 2)
  const walkTree = (obj: any) => {
    _.forEach(obj, (value: any, key: any) => {
      if (typeof value === 'string') {
        buffer += `${ident()}.add(${value})`
      } else if (typeof key === 'string') {
        const isRoot = key === 'mnEnv'
        buffer += isRoot ? key : `${ident()}.add(${key}\n`
        level++
        walkTree(value)
        level--
        buffer += `${ident()} ${isRoot ? '' : ')'}\n`
      } else {
        if (typeof value !== 'object' && !Array.isArray(value)) {
          logger.log(`[printTreeNodes-walkTree]: not walk value , key = ${value} , ${key}`)
        }

        walkTree(value)
      }
    })

  }
  walkTree(treeObj)

  return buffer
}
const printParams = (params: any, varibleList: string[]) => {
  if (!params) return null
  let buffer = ''
  const printVaribleRef = (value: string) => {
    const varibleRefReg = /^(\w+)\.(\w+)$/
    let varBuffer = ''
    const [, varibleName, propertyName] = value?.match(varibleRefReg) ?? []
    if (!varibleName || !propertyName) {
      logger.log(`[printParams-printVaribleRef]: varibleName or propertyName is null = ${varibleName}.${propertyName}`)
      return ''
    }
    varBuffer += `${varibleName}.`
    switch (propertyName) {
      case 'name':
        varBuffer += `getName()`
        break
      case 'uuid':
        varBuffer += `getUuid()`
        break
      default:
        varBuffer += `getParam().${propertyName}`
        break
    }

    return varBuffer
  }
  const parse = (obj: any) => {
    _.forEach(obj, (value: any, key) => {
      let varibleName: string

      if (typeof key === 'string') {
        buffer += `"${key}":`
      }
      if (value === null) {
        buffer += `null,`
      } else if (value === 'undefined') {
        buffer += `undefined,`
      } else if (typeof value === 'number') {
        buffer += `"${value},`
      } else if ((varibleName = isRefVairble(value, varibleList))) {
        buffer += `${printVaribleRef(value)},`
      } else if (typeof value === 'string') {
        buffer += `"${value}",`
      } else {
        buffer += (Array.isArray(value) ? "[" : "{")
        parse(value,)
        buffer += (Array.isArray(value) ? "]" : "}")
      }
    })
  }
  buffer += '{'
  parse(params,)
  buffer += '}'
  return buffer
}

const renderRequire = (resources: string[]) => {

  return `
    const {
      ${resources.join(',\n')}
    } = allResources;
  `
}

const printNode = (node: YamlNode, varibleList: string[]) => {
  const { varibleName, params, children, name } = node
  const actions = node.children?.filter(({ type }) => type === YamlNodeType.Action)

  let nodeBuffer = ''

  if (node.type === YamlNodeType.Root) return nodeBuffer

  const nodeParams = printParams(params, varibleList) ?? ''
  nodeBuffer += `const ${varibleName} = new ${name}(${nodeParams})${actions?.length > 0 ? '\n' : ';\n'}`
  actions?.forEach(({ name, params }, index) => {
    const printEnd = index === (actions.length - 1)
    const actionParams = printParams(params, varibleList)
    nodeBuffer += `.handle(
      "${name}"
      ${actionParams ? ',' : ''} 
      ${actionParams ? actionParams : ''}
    )${printEnd ? ';\n' : '\n'}`
  })

  return nodeBuffer
}
const walkNode = (node: YamlNode, obj: any[], varibleList: string[]) => {

  let buffer = ''
  const { varibleName } = node
  const child = []
  const subChildren = node.children?.filter(({ type }) => type === YamlNodeType.Resource)
  if (subChildren?.length > 0) {
    obj.push({
      [varibleName]: child
    })
    subChildren.forEach(subNode => {
      buffer += walkNode(subNode, child, varibleList)
    })
  } else {
    obj.push(varibleName)
  }
  buffer += printNode(node, varibleList)

  return buffer
}


export {
  isYamlNode,
  isResource,
  isAction,
  isRefVairble,
  getAllFilesByPatterns,
  getAllVaribles,
  getYamlFileName,
  getFileNameYamlTag,
  getValidParams,
  overWriteFile,
  printParams,
  printTreeNodes,
  printNode,
  renderRequire,
  setAllYamlNodeVaribleName,
  valToString,
  walkNode,
}

