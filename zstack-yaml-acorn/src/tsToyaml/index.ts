import ts from 'typescript'
import fs from 'fs'
import path from 'path'
import { YamlNode, LogInfo, YamlNodeType, LogType, WalkAstOptions } from "../types"







export const getRootName = (fileName: string) => {

  let name = fileName.replace(process.cwd(), '')
  name = name.replace(/-(\w)/g, (m, c: string) => {
    return c.toUpperCase()
  })

  name = name.replace(/\/(\w)?/g, (m, c: string) => {
    if (c)
      return c.toUpperCase()
    return ''
  })

  return name
}

export class Logger {
  logFilePath: string
  index = 1
  constructor(private logFileName: string = 'log.txt', private context: string = process.cwd()) {
    if (logFileName) {
      this.logFilePath = path.join(context, logFileName)
      fs.openSync(this.logFilePath, 'w+')
      fs.truncateSync(this.logFilePath, 0)
    }
  }

  private write(message: string, type: LogType) {
    const msg = `${this.index++}: [${type}]: ${message}\n`
    if (this.logFileName) {
      fs.appendFileSync(this.logFileName, msg, 'utf8')
    } else {
      switch (type) {
        case LogType.Info:
          console.log(msg)
          break
      }
    }
  }

  log(message: string) {
    this.write(message, LogType.Info)
  }
}



export const jsonToYaml = () => {



  const fileName = path.join(process.cwd(), 'ts-source/ip.ts')
  const root: YamlNode = {
    children: [],
    type: YamlNodeType.Root,
    name: getRootName(fileName),
  }

  console.log('fileName', fileName)
  const sourceFile = ts.createSourceFile(
    fileName,
    fs.readFileSync(fileName).toString(),
    ts.ScriptTarget.ES2015,
    true
  );


  let parent = root
  const logger = new Logger('log.txt')
  const walkNode = (node: ts.Node) => {

    logger.log(`node.kind: ${ts.SyntaxKind[node.kind]}`)
    switch (node.kind) {
      case ts.SyntaxKind.ForStatement:
      case ts.SyntaxKind.ForInStatement:
      case ts.SyntaxKind.WhileStatement:
      case ts.SyntaxKind.DoStatement:

        break;
    }

    ts.forEachChild(node, walkNode);
  }

  walkNode(sourceFile)

}

jsonToYaml()