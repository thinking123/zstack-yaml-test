import ts, { PropertyAccessExpression, VariableDeclaration, NewExpression, CallExpression, ObjectLiteralExpression } from 'typescript'
import fs from 'fs'
import path from 'path'
import { YamlNode, LogInfo, YamlNodeType, LogType, WalkAstOptions } from "../types"
import { variableDeclarationParser, getObjectLiteralExpressionVal } from './variableDeclaration'
import { Logger } from './logger'
import { variableDeclarationParserOptions } from './types'


// type ps = ts.IdentifierObject
function getActionParentResource(node: ts.Node, { varibleMap }: variableDeclarationParserOptions) {
  let ps = node.parent

  while (ps.kind === ts.SyntaxKind.PropertyAccessExpression) {
    const expression = (ps as PropertyAccessExpression).expression

    if (expression?.kind === ts.SyntaxKind.Identifier) {
      return varibleMap.get(expression?.getText())
    }

    if (expression?.kind === ts.SyntaxKind.CallExpression) {
      ps = (expression as CallExpression).expression
    }


    if (expression?.kind === ts.SyntaxKind.NewExpression) {

    }

  }


}


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
  const logger = Logger.logger()

  let currentResource: YamlNode;
  let currentAction: string
  const parentResourceStack = [root]
  const resourceList: { varibleName: string, node: ts.Node, resource: YamlNode }[] = []
  const resourceMap = new Map<ts.Node, YamlNode>()
  const varibleMap = new Map<string, YamlNode>()
  const variableDeclarationMap = new Map()
  const walkNode = (node: ts.Node) => {
    // const symbol = typeChecker.getSymbolAtLocation(node)
    switch (node.kind) {
      case ts.SyntaxKind.VariableDeclaration:
        {
          // 提取常量
          variableDeclarationParser(node,
            {
              varibleMap,
              variableDeclarationMap
            })
          break
        }

      case ts.SyntaxKind.Identifier:
        {
          const identifier = node.getText()


          if (identifier === 'add') {

          }
          if (['add', 'handle', 'getParam'].includes(identifier)) {
            currentAction = identifier


            let ps = node.parent
            while (ps.kind === ts.SyntaxKind.PropertyAccessExpression
            ) {
              const { expression } = ps as PropertyAccessExpression
              ps = (expression as CallExpression)?.expression
            }

            if (ps.kind === ts.SyntaxKind.Identifier) {
              const { resource } = resourceList.find(({ varibleName }) => varibleName === identifier) ?? {}

              if (resource) {
                currentResource = resource
              }
            }

            if (identifier === 'add') {

            } else if (identifier === 'handle' && node?.parent?.parent?.kind === ts.SyntaxKind.CallExpression) {

              const args = (node.parent.parent as CallExpression).arguments
              const name = args[0].getText()
              const action: YamlNode = {
                children: [],
                type: YamlNodeType.Action,
                name
              }

              currentResource.children.push(action)
            } else if (identifier === 'getParam' && node?.parent?.parent?.kind === ts.SyntaxKind.CallExpression) {

              // const args = (node.parent.parent as CallExpression).arguments
              // const name = args[0].getText()
              // const action: YamlNode = {
              //   children: [],
              //   type: YamlNodeType.Action,
              //   name
              // }

              // currentResource.children.push(action)
            }

          }

          /**
           * .add(vpcNetwork1) -> vpcNetwork1 
           */
          let resource;
          if ((resource = resourceList.find(({ varibleName }) => varibleName === identifier)) && currentAction === 'add') {
            currentResource.children.push(resource.resource)
            currentAction = ''
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

          currentResource = resource

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

          /**
         *   .add(
        new IpRange({
          startIp: '192.168.54.2',
        })
        */
          if (currentAction) {
            if (currentAction === 'add') {
              currentResource.children.push(resource)
            }

          }


          const argObj = (node as NewExpression)?.arguments?.[0]
          if (argObj.kind === ts.SyntaxKind.ObjectLiteralExpression) {
            const val = {}
            getObjectLiteralExpressionVal(argObj as ObjectLiteralExpression, val, {
              variableDeclarationMap,
              varibleMap
            })
          }

          break;
        }

    }

    ts.forEachChild(node, walkNode);
  }

  walkNode(sourceFile)

}

jsonToYaml()