import fs from 'fs'
import jsYaml from 'js-yaml'
import path from 'path'
import { buildTree, prettier } from './prettier'
import { yamlNodeToJSON } from './print'
import { TypescriptParser } from './walk-ast'
import { ParserConfig, ParserMode } from './types'
import { Logger } from './logger'
import { StdoutType, LogType } from '../types'
import { getFileNameYamlTag, getAllVaribles, overWriteFile, getAllFilesByPatterns, getYamlFileName } from '../utils'


const logger = Logger.logger(StdoutType.Console)


const transformFile = (file: string, config: ParserConfig): string => {

  const {
    extension,
    prettier: prettierOutput,
    overWrite
  } = config

  let yaml: string
  const { root, modifyRange } = new TypescriptParser().parser(file)

  if (root) {
    const _jsonFileNameTag = getFileNameYamlTag(file, extension)
    let _json: any

    const exportValirbles = getAllVaribles(root)
    if (prettierOutput) {
      const prettierRoot = prettier(root)
      const json = yamlNodeToJSON(prettierRoot)

      const tree = buildTree(root)
      json['treeRoot'] = tree

      _json = {
        [_jsonFileNameTag]: json
      }
    } else {
      const json = yamlNodeToJSON(root)
      _json = {
        [_jsonFileNameTag]: json
      }
    }


    yaml = jsYaml.dump(_json, {
      replacer(key, value) {
        if (value === undefined) return "undefined"
        return value
      }
    })

    const reg = /\$/g

    yaml = String(yaml).replace(reg, () => "\"")

    if (overWrite) {
      overWriteFile(modifyRange, exportValirbles, file, config)
    }
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

      res('')
    })
  })
}
const transform = async (config: ParserConfig) => {
  const { files, dir, pattern, mode, extension, overWrite } = config
  let _files: string[]
  if (files) {
    _files = await getAllFilesByPatterns(files, pattern, extension)
  } else {
    _files = await getAllFilesByPatterns(dir, pattern, extension)
  }

  logger.log(`[transform]: all files : ${_files}`, LogType.Info)

  let allYaml: string = ''
  await Promise.all(_files?.map(async file => {
    try {
      const yamlString = transformFile(file, config)
      const yamlFileName = getYamlFileName(file, config)
      switch (mode) {
        case ParserMode.Single:
          await writeToFile(yamlFileName, yamlString)
          break
        case ParserMode.All:
          allYaml += yamlString
          break;
        default:
          allYaml += yamlString
          break;
      }


    } catch (err) {
      logger.log(`[transform]:  file ${file} failed = ${err}`)
    }

  }))


  if (mode !== ParserMode.Single) {
    const allYamlFileName = path.join(process.cwd(), 'all.yaml')
    return writeToFile(allYamlFileName, allYaml)
  }
}

export {
  transform,
}
