import ts, { PropertyAccessExpression, VariableDeclaration, NewExpression, } from 'typescript'
import fs from 'fs'
import path from 'path'
import { YamlNode, LogInfo, YamlNodeType, LogType, WalkAstOptions } from "../types"



// type ps = ts.IdentifierObject



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


// const symbol = () => ((node as any).symbol as Symbol | undefined) || typeChecker.getSymbolAtLocation(node)

export const jsonToYaml = () => {



  const fileName = path.join(process.cwd(), 'ts-source/ip.ts')
  const root: YamlNode = {
    children: [],
    type: YamlNodeType.Root,
    name: getRootName(fileName),
  }

  const options = { allowJs: true, module: ts.ModuleKind.ES2015 }

  const program = ts.createProgram([fileName], options)
  const typeChecker = program.getTypeChecker();

  console.log('fileName', fileName)
  const sourceFile = ts.createSourceFile(
    fileName,
    fs.readFileSync(fileName).toString(),
    ts.ScriptTarget.ES2015,
    true
  );


  let parent = root
  const logger = new Logger('log.txt')

  let currentResource: YamlNode;
  let action: string
  let addAction: ts.Node
  const identifierList = []
  const stack = [root]
  const resourceList: { varibleName: string, node: ts.Node, resource: YamlNode }[] = []
  const resourceMap = new Map<ts.Node, YamlNode>()
  const varibleMap = new Map<string, YamlNode>()
  const variableDeclarationMap = new Map()
  const walkNode = (node: ts.Node) => {
    const type = ts.SyntaxKind[node.kind]
    logger.log(`node.kind: ${ts.SyntaxKind[node.kind]}`)
    logger.log(`text: ${node?.getText() ?? ''}`)

    // const symbol = typeChecker.getSymbolAtLocation(node)
    switch (node.kind) {
      case ts.SyntaxKind.VariableDeclaration:
        {
          const variableDeclaration = node as VariableDeclaration
          switch (variableDeclaration?.initializer?.kind) {
            case ts.SyntaxKind.NumericLiteral:
              {
                const val = Number(variableDeclaration.initializer.getText())
                variableDeclarationMap.set(variableDeclaration.name.getText(), val)
                break
              }

            case ts.SyntaxKind.StringLiteral:
              {
                const val = variableDeclaration.initializer.getText()
                variableDeclarationMap.set(variableDeclaration.name.getText(), val)
                break
              }

            case ts.SyntaxKind.FalseKeyword:
            case ts.SyntaxKind.TrueKeyword: {
              const val = variableDeclaration.initializer.getText() === 'true'
              variableDeclarationMap.set(variableDeclaration.name.getText(), val)
              break
            }

          }
          break
        }
      case ts.SyntaxKind.CallExpression:
        {
          const call = node as PropertyAccessExpression
          // if (node instanceof PropertyAccessExpression) {

          // }
          break
        }

      case ts.SyntaxKind.Identifier:
        {
          const identifier = node.getText()

          if (identifier === 'add' && node?.parent?.kind === ts.SyntaxKind.PropertyAccessExpression) {
            action = 'add'
            addAction = node
          }

          /**
           * .add(vpcNetwork1)
           */
          let resource;
          if ((resource = resourceList.find(({ varibleName }) => varibleName === identifier)) && action === 'add') {
            const parent = stack[stack.length - 1]
            parent.children.push(resource.resource)
            stack.push(resource.resource)
            action = ''
          }

          break;
        }

      case ts.SyntaxKind.NewExpression:
        {
          logger.log(`node.kind: ${ts.SyntaxKind[node.kind]}`)
          const resource: YamlNode = {
            children: [],
            type: YamlNodeType.Resource,
            name: ''
          }

          /**
           * resource = L3Network
           * const vpcNetwork1 = new L3Network()
           */
          if (node?.parent?.kind === ts.SyntaxKind.VariableDeclaration) {
            resource.varibleName = (node.parent as VariableDeclaration)?.name?.getText()
          }

          /**
           * resource = L3Network
           * 
           * const vpcNetwork = new L3Network({
              name: 'l3-vpc',
            })
            .add(
              new IpRange({
                startIp: '192.168.54.2',
              })
            )
           */
          if (node?.parent?.kind === ts.SyntaxKind.PropertyAccessExpression) {
            let p = node?.parent
            while (p && p?.kind !== ts.SyntaxKind.Identifier) {
              p = p?.parent
            }

            if (p && p?.kind === ts.SyntaxKind.Identifier) {
              resource.varibleName = p.getText()
            }
          }
          /**
                 * resource = IpRange
                 * 
                 * const vpcNetwork = new L3Network({
                    name: 'l3-vpc',
                  })
                  .add(
                    new IpRange({
                      startIp: '192.168.54.2',
                    })
                  )
                 */
          if (node?.parent?.kind === ts.SyntaxKind.CallExpression) {
            resource.varibleName = undefined
          }
          resource.name = (node as NewExpression).expression.getText()


          resourceMap.set(node, resource)
          if (resource.varibleName) {
            varibleMap.set(resource.varibleName, resource)
          }
          // if (action === 'add') {
          //   /**
          //    *   .add(
          //   new IpRange({
          //     startIp: '192.168.54.2',
          //   })
          //   ) 
          //    */
          //   const parent = stack[stack.length - 1]
          //   parent.children.push(resource)
          //   stack.push(resource)
          //   action = ''
          // }

          /**
         *   .add(
        new IpRange({
          startIp: '192.168.54.2',
        })
        */
          if (addAction) {
            /**
             * new Resource().add(resource1)
             */
            if ((addAction?.parent as PropertyAccessExpression)?.expression?.kind === ts.SyntaxKind.NewExpression) {
              const parent = resourceMap.get((addAction?.parent as PropertyAccessExpression)?.expression)

              parent.children.push(resource)
            }
            /**
                        * resource2.add(resource1)
                        */
            if ((addAction?.parent as PropertyAccessExpression)?.expression?.kind === ts.SyntaxKind.Identifier) {
              const varibleName = (addAction?.parent as PropertyAccessExpression)?.expression.getText()
              const parent = varibleMap.get(varibleName)
              parent.children.push(resource)
            }

          }

          // if (resource.varibleName) {
          //   resourceList.push({
          //     varibleName: resource.varibleName,
          //     node,
          //     resource
          //   })
          // }

          break;
        }

    }

    ts.forEachChild(node, walkNode);
  }

  walkNode(sourceFile)

}

jsonToYaml()