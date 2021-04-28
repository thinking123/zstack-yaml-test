
import glob from 'glob'
import fs from 'fs'
import ts from 'typescript'
import path from 'path'
import { ESLint, Linter } from 'eslint'
import { RawSource, ReplaceSource } from 'webpack-sources'
import { Logger } from './logger'
import { ParserConfig, ParserMode } from './types'
import { LogType } from '../types'


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
  const rawSource = new RawSource(sourceString)
  const replaceSource = new ReplaceSource(rawSource)
  let yamlFileName = getYamlFileName(fileName, config)

  if (mode === ParserMode.Combine) {
    yamlFileName = `@/all.yaml`
  } else {
    yamlFileName = yamlFileName.replace(process.cwd(), '@')
  }
  const yamlTag = getFileNameYamlTag(fileName, extension)

  const insertImport = `import { dumpYaml } from 'zstack-yaml-acorn';
  `

  let insertFunction = `
    dumpYaml("${yamlFileName}", "${yamlTag}");
  `
  if (exportValirbles.size > 0) {
    insertFunction = `
    const {
      ${Array.from(exportValirbles).join(',')}
    } = dumpYaml("${yamlFileName}", "${yamlTag}");
    `
  }

  let firstLine: any
  modifyRange.forEach(range => {
    if (!firstLine) {
      firstLine = range
    }
    const length = range.end - range.pos + 1
    const newText = " ".repeat(length)
    replaceSource.replace(range.pos, range.end, newText)
  })


  replaceSource.insert(0, insertImport)


  if (firstLine) {
    replaceSource.insert(firstLine.pos, insertFunction)
    const replaceSourceString = replaceSource.source()

    const linter = new Linter()
    const { output, messages } = linter.verifyAndFix(replaceSourceString, {
      rules: {
        "no-multi-spaces": 2
      }
    })

    logger.log(`Linter: ${messages?.join('\n')}`, LogType.Info)
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

export {
  isYamlNode,
  getAllFilesByPatterns,
  getYamlFileName,
  getFileNameYamlTag,
  valToString,
  overWriteFile
}