import fs from 'fs'
import jsYaml from 'js-yaml'
import path from 'path'
import { buildTree, prettier } from './prettier'
import { yamlNodeToJSON } from './print'
import { TypescriptParser } from './walk-ast'
import { ParserConfig, ParserMode } from './types'
import { getAllFilesByPatterns } from './utils'
import { Logger } from './logger'
import { StdoutType, LogType } from '../types'


const logger = Logger.logger(StdoutType.Console)

const getFileNameYamlTag = (file: string) => {
  return file?.replace(/\/(\w)?/g, (m, c) => {
    return (String(c ?? '').toUpperCase())
  })
}

const getYamlFileName = (file: string, { pattern }: ParserConfig) => {
  return file?.replace(pattern, (m, c) => {
    return '.yaml'
  })
}

const transformFile = (file: string, config: ParserConfig): string => {


  let yaml: string
  const root = new TypescriptParser().parser(file)

  if (root) {
    const prettierRoot = prettier(root)
    const json = yamlNodeToJSON(prettierRoot)

    const tree = buildTree(root)
    json['treeRoot'] = tree

    const _jsonFileNameTag = getFileNameYamlTag(file)
    const _json = {
      [_jsonFileNameTag]: json
    }

    yaml = jsYaml.dump(_json, {
      replacer(key, value) {
        if (value === undefined) return "undefined"

        return value
      }
    })

    const reg = /\$/g

    yaml = String(yaml).replace(reg, () => "\"")

    // fs.writeFileSync('./jsonToyaml.yaml', yaml, {
    //   flag: "w+",
    //   encoding: 'utf8'
    // })
  }

  return yaml
}

const writeToFile = (yamlFileName: string, content: string) => {
  return new Promise((res, rej) => {
    fs.writeFile(yamlFileName, content, {
      flag: "w+",
      encoding: 'utf8'
    }, (err) => {
      if (err) {
        return rej(err)
      }

      logger.log(`[writeToFile]: write file : ${yamlFileName}`, LogType.Info)

      res()
    })
  })
}
const transform = async (config: ParserConfig) => {
  const { files, dir, pattern, mode } = config
  let _files: string[]
  if (files) {
    _files = await getAllFilesByPatterns(files, pattern)
  } else {
    _files = await getAllFilesByPatterns(dir, pattern)
  }

  logger.log(`[transform]: all files : ${_files}`, LogType.Info)

  let allYaml: string
  await Promise.all(_files?.map(async file => {
    const yamlString = transformFile(file, config)
    const yamlFileName = getYamlFileName(file, config)
    switch (mode) {
      case ParserMode.Single:
        return writeToFile(yamlFileName, yamlString)
      case ParserMode.All:
        allYaml += yamlString
        break;
      default:
        allYaml += yamlString
        break;
    }
  }))


  if (mode !== ParserMode.Single) {
    const allYamlFileName = path.join(process.cwd(), 'all.yaml')
    return writeToFile(allYamlFileName, allYaml)
  }
}

export {
  transform,
  transformFile
}
