import fs from 'fs'
import path from 'path'
import ts from 'typescript'
import chalk from 'chalk'
import { YamlNode, YamlNodeType, LogType } from "../types"
import { Logger } from './logger'
import { isYamlNode } from './utils'


interface Import {
  defaultImport?: string,
  namedImports?: string[],
  namespaceImport?: string
}
interface Scope {
  definitions: Map<string, any>
  yamlNodes: Map<YamlNode, string>
  topLevelScope: boolean,
  imports: Map<string, Import>
}

class TypescriptParser {

  private logger: Logger
  private scope: Scope
  private root: YamlNode
  constructor() {
    this.logger = Logger.logger()

    this.scope = {
      definitions: new Map(),
      yamlNodes: new Map(),
      topLevelScope: true,
      imports: new Map(),
    }
  }

  log(message: string, type: LogType = LogType.Error) {
    const titleReg = /\[([^\[\]]+)\]/
    const match = message?.match(titleReg)
    const [, title] = match ?? []
    let chalkTitle: string = title
    if (title) {
      switch (type) {
        case LogType.Error:
          chalkTitle = chalk.red(title)
          break;
        case LogType.Warning:
          chalkTitle = chalk.yellow(title)
          break;
      }

      const msg = `[${chalkTitle}]` + message.substring(match?.[0]?.length ?? 0)
      console.log(msg)
      return
    }
    let msg: string = message
    switch (type) {
      case LogType.Error:
        msg = chalk.red(message)
        break;
      case LogType.Warning:
        msg = chalk.yellow(message)
    }
    console.log(msg)
  }
  parser(fileName?: string) {
    fileName = fileName ?? path.join(process.cwd(), 'ts-source/ip.ts')
    const sourceFile = ts.createSourceFile(
      fileName,
      fs.readFileSync(fileName).toString(),
      ts.ScriptTarget.ES2015,
      true
    );
    this.walkStatements(sourceFile.statements)

    if (this.root) {
      console.log('root: ')
    }

  }


  walkStatements(statements: ReadonlyArray<ts.Statement>) {
    for (let i = 0; i < statements?.length; i++) {
      const statement = statements[i]
      this.walkStatement(statement)
    }
  }


  walkStatement(statement: ts.Statement) {
    switch (statement?.kind) {
      case ts.SyntaxKind.VariableStatement:
        this.walkVariableStatement(statement as ts.VariableStatement)
        break
      case ts.SyntaxKind.ExpressionStatement:
        this.walkExpressionStatement(statement as ts.ExpressionStatement)
        break


      case ts.SyntaxKind.ImportDeclaration:
        this.walkImportDeclaration(statement as ts.ImportDeclaration)
        break
    }
  }



  walkExpressionStatement(statement: ts.ExpressionStatement) {
    const { expression } = statement

    switch (expression.kind) {
      case ts.SyntaxKind.CallExpression:
        this.walkCallExpression(expression as ts.CallExpression)
        break;
      default:
        this.log(`[walkExpressionStatement]:expression type !== YamlNode`)
        break;
    }

  }



  walkVariableStatement(statement: ts.VariableStatement) {
    for (let i = 0; i < statement.declarationList.declarations.length; i++) {
      const declaration = statement.declarationList.declarations[i]
      this.walkVariableDeclaration(declaration)
    }
  }

  walkImportDeclaration(declaration: ts.ImportDeclaration) {
    const { importClause, moduleSpecifier } = declaration

    let importFileName
    switch (moduleSpecifier.kind) {
      case ts.SyntaxKind.StringLiteral:
        importFileName = (moduleSpecifier as ts.StringLiteral).text
        break
      default:
        this.log(`[walkImportDeclaration]:moduleSpecifier.kind(${ts.SyntaxKind[moduleSpecifier?.kind]}) is not used`)
        break
    }

    if (!importFileName) {
      this.log(`[walkImportDeclaration]:importFileName is null`)
    } else {
      const importInfo = this.walkImportClause(importClause)
      this.scope.imports.set(importFileName, importInfo)

      const { namedImports } = importInfo

      const env = namedImports?.find(n => n === 'mnEnv')
      if (env) {
        const resource: YamlNode = {
          type: YamlNodeType.Root,
          name: "mnEnv",
          children: [],
        }

        this.root = resource

        this.scope.definitions.set(env, resource)
      }
    }
  }


  walkImportClause(declaration: ts.ImportClause): Import {
    const { name, namedBindings } = declaration

    let defaultImport
    if (name) {
      defaultImport = name.text
    }

    let namespaceImport
    let namedImports
    switch (namedBindings?.kind) {
      case ts.SyntaxKind.NamedImports:
        namedImports = this.walkNamedImports(namedBindings as ts.NamedImports)
        break;
      case ts.SyntaxKind.NamespaceImport:
        namespaceImport = (namedBindings as ts.NamespaceImport).name.text
        break;

      default:
        break;
    }

    return {
      defaultImport,
      namespaceImport,
      namedImports
    }

  }

  walkNamedImports(declaration: ts.NamedImports): string[] {
    const { elements } = declaration


    const importNames = []
    for (let i = 0; i < elements.length; i++) {

      const element = elements[i]

      importNames.push(element.name.text)

    }

    return importNames

  }


  walkVariableDeclaration(declaration: ts.VariableDeclaration) {
    const name = declaration.name.getText()
    const { initializer } = declaration
    let value: any
    switch (initializer?.kind) {
      case ts.SyntaxKind.NumericLiteral:
        {
          value = (initializer as ts.NumericLiteral).text
        }
        break
      case ts.SyntaxKind.StringLiteral:
        {
          value = value = (initializer as ts.StringLiteral).text
        }
        break
      case ts.SyntaxKind.NullKeyword:
        {
          value = null
        }
        break
      case ts.SyntaxKind.FalseKeyword:
      case ts.SyntaxKind.TrueKeyword:
        {
          value = initializer.getText() === 'true'
        }
        break
      case ts.SyntaxKind.ArrayLiteralExpression:
        {

          value = this.walkArrayLiteralExpression((initializer as ts.ArrayLiteralExpression))
        }
        break

      case ts.SyntaxKind.ObjectLiteralExpression:
        {
          value = this.walkObjectLiteralExpression((initializer as ts.ObjectLiteralExpression))
        }
        break
      case ts.SyntaxKind.Identifier:
        {
          const name = initializer.getText()
          if (name === 'undefined') {
            value = undefined
          } else {
            if (this.scope.definitions.has(name)) {
              value = this.scope.definitions.get(name)
            } else {
              this.log(`[walkVariableDeclaration]: can not find Identifier name = ${name}`)
            }
          }
        }
        break

      case ts.SyntaxKind.CallExpression:
        {
          const res = this.walkCallExpression(initializer as ts.CallExpression)
          value = res.value
        }
        break

      case ts.SyntaxKind.NewExpression:
        {
          const res = this.walkNewExpression(initializer as ts.NewExpression)
          value = res.resource
          if (!isYamlNode(value)) {
            this.log(`[walkVariableDeclaration]:NewExpression type !== YamlNode`)
          }
        }
        break

      default: {


        if (declaration?.type?.flags === ts.NodeFlags.Let) {

        } else {
          if (initializer?.kind) {
            this.log(`[walkVariableDeclaration]:${ts.SyntaxKind[initializer?.kind]} kind not used `)
          }
          return
        }

      }
    }

    this.scope.definitions.set(name, value)

    if (isYamlNode(value)) {
      this.scope.yamlNodes.set(value, name)
      const yamlNode = (value as YamlNode)
      yamlNode.varibleName = name
    }
  }

  walkExpression(expression: ts.Expression) {
    let value
    switch (expression.kind) {
      case ts.SyntaxKind.BinaryExpression:
        {
          value = this.walkBinaryExpression(expression as ts.BinaryExpression)
        }
        break
      case ts.SyntaxKind.NumericLiteral:
        {
          value = (expression as ts.NumericLiteral).text
        }
        break
      case ts.SyntaxKind.StringLiteral:
        {
          value = value = (expression as ts.StringLiteral).text
        }
        break

      default:
        this.log(`[walkExpression]:${ts.SyntaxKind[expression?.kind]} kind not used `)
        break
    }

    return value
  }

  walkBinaryExpression(expression: ts.BinaryExpression) {
    // const { left, right, operatorToken } = expression


    const binary: YamlNode = {
      type: YamlNodeType.Binary,
      name: expression?.getText(),
      children: []
    }
    // const _left = this.walkExpression(left)
    // const _right = this.walkExpression(right)

    // switch(operatorToken.kind)
    // return `${_left} ${operatorToken.getText()} ${_right}`


    return binary

  }






  walkArrowFunction(expression: ts.ArrowFunction) {
    const { body } = expression

    switch (body?.kind) {
      case ts.SyntaxKind.Block:
        this.walkBlock(body as ts.Block)
        break
      default:
        this.log(`[walkArrowFunction]: ${ts.SyntaxKind[body?.kind]} kind not used `)
        break
    }
  }

  walkBlock(block: ts.Block) {
    const { statements } = block
    this.walkStatements(statements)
  }


  walkCallExpression(callExpression: ts.CallExpression): {
    value: any,
    callName?: string
  } {
    const { expression, arguments: _arguments } = callExpression

    let callName: string
    let callObj: any
    switch (expression?.kind) {
      case ts.SyntaxKind.PropertyAccessExpression:
        {
          const res = this.walkPropertyAccessExpression(expression as ts.PropertyAccessExpression)
          callName = res.propertyName
          callObj = res.obj
        }
        break
      case ts.SyntaxKind.Identifier:
        {
          const funName = (expression as ts.Identifier).text
          const notProgressFuns = [
            'afterAll',
            'it',
            'beforeAll'
          ]
          if (notProgressFuns.includes(funName)) {
            this.log(`[walkCallExpression-Identifier]: notProgressFuns : ${funName} `, LogType.Info)

            return
          }
          this.log(`[walkCallExpression-Identifier]: others `, LogType.Warning)

        }
        break
      default:
        this.log(`[walkCallExpression]:expression.kind(${ts.SyntaxKind[expression?.kind]}) is not used`)
        break
    }
    if (!isYamlNode(callObj) && expression?.kind === ts.SyntaxKind.PropertyAccessExpression) {
      this.log(`[walkCallExpression]:callObj type !== YamlNode`)
    }

    const params = []

    for (let i = 0; i < _arguments.length; i++) {
      const argument = _arguments[i]
      switch (argument.kind) {
        case ts.SyntaxKind.ObjectLiteralExpression:
          {
            const arg = this.walkObjectLiteralExpression(argument as ts.ObjectLiteralExpression)
            params.push(arg)
          }
          break;
        case ts.SyntaxKind.CallExpression:
          {
            const res = this.walkCallExpression(argument as ts.CallExpression)
            const arg = res.value
            params.push(arg)
          }
          break;

        case ts.SyntaxKind.NewExpression:
          {
            const res = this.walkNewExpression(argument as ts.NewExpression)
            const arg = res.resource
            params.push(arg)
          }
          break;
        case ts.SyntaxKind.StringLiteral:
          {
            const arg = (argument as ts.StringLiteral).text
            params.push(arg)
          }
          break;

        case ts.SyntaxKind.Identifier:
          {
            const text = (argument as ts.Identifier).text
            const arg = this.scope.definitions.get(text)
            params.push(arg)
          }
          break;

        case ts.SyntaxKind.ArrowFunction:
          {
            this.walkArrowFunction(argument as ts.ArrowFunction)
          }
          break;
        default:
          this.log(`[walkCallExpression]:argument.kind(${ts.SyntaxKind[argument?.kind]}) is not used`)
          break;
      }
    }

    switch (callName) {
      case 'handle':
        {
          const parent = callObj as YamlNode
          const handleName = params[0]
          const handleParams = params[1]
          if (!handleName || !handleParams || typeof handleName !== 'string') {
            this.log(`[walkCallExpression]:callName params checked failed`)
          }
          const action: YamlNode = {
            type: YamlNodeType.Action,
            name: handleName,
            params: handleParams,
            parent,
            children: []
          }

          parent.children.push(action)
        }
        break;
      case 'add':
        {
          const parent = callObj as YamlNode
          if (!isYamlNode(params[0])) {
            this.log(`[walkCallExpression]:add params type !== YamlNode`)
          }
          const resource: YamlNode = params[0] as YamlNode
          parent.children.push(resource)
          resource.parent = parent
        }
        break;

      case 'getUuid'://obj.uuid
        {
          const valueName = this.scope.yamlNodes.get(callObj)
          callObj = `${valueName}.uuid`

          const yamlNode: YamlNode = {
            type: YamlNodeType.VaribleRef,
            varibleName: `${valueName}`,
            params: [
              {
                uuid: 'uuid'
              }
            ],
            metaData: ['uuid'],
            children: [],
            name: ''
          }

          callObj = yamlNode

        }
        break;

      case 'getName':
        {
          const valueName = this.scope.yamlNodes.get(callObj)
          callObj = `${valueName}.name`

          const yamlNode: YamlNode = {
            type: YamlNodeType.VaribleRef,
            varibleName: `${valueName}`,
            params: [
              {
                uuid: 'name'
              }
            ],
            metaData: ['name'],
            children: [],
            name: ''
          }

          callObj = yamlNode
        }
        break;
      case 'getParam':
        {
          // const valueName = this.scope.definitions.get(callObj)
          // callObj = valueName
        }
        break;

      default:
        if (expression?.kind === ts.SyntaxKind.PropertyAccessExpression) {
          this.log(`[walkCallExpression]:callName(${callName}) is not used`)
        }

        break;
    }

    return { value: callObj, callName }
  }

  walkNewExpression(newExpression: ts.NewExpression): {
    resource: YamlNode,
    value?: object
  } {
    const { expression, arguments: _arguments } = newExpression

    let resourceName: string
    switch (expression?.kind) {
      case ts.SyntaxKind.Identifier:
        resourceName = expression.getText()
        break
      default:
        this.log('[walkNewExpression]: expression kind !== Identifier')
        break
    }

    const params = []
    let objectParam
    if (_arguments.length > 1) {
      this.log('[walkNewExpression]: arguments length > 1')
    }
    for (let i = 0; i < _arguments.length; i++) {
      const argument = _arguments[i]
      switch (argument.kind) {
        case ts.SyntaxKind.ObjectLiteralExpression:
          {
            const arg = this.walkObjectLiteralExpression(argument as ts.ObjectLiteralExpression)
            params.push(arg)
            objectParam = arg
          }
          break;

        default:
          this.log('[walkNewExpression]: argument kind  !== ObjectLiteralExpression')
          break;
      }
    }

    const isRoot = resourceName === 'Env'
    const resource: YamlNode = {
      type: isRoot ? YamlNodeType.Root : YamlNodeType.Resource,
      name: resourceName,
      params: objectParam,
      children: [],
    }



    if (isRoot) {
      this.root = resource
    }

    return { resource }
  }

  walkParenthesizedExpression(parenthesizedExpression: ts.ParenthesizedExpression): any {
    const { expression } = parenthesizedExpression
    let value: any
    switch (expression?.kind) {
      case ts.SyntaxKind.NewExpression:
        {
          const res = this.walkNewExpression(expression as ts.NewExpression)
          value = res.resource
        }
        break
      default:
        this.log('[walkParenthesizedExpression]: expression kind  !== NewExpression')
        break
    }

    return value
  }
  walkPropertyAccessExpression(callExpression: ts.PropertyAccessExpression): {
    obj: any,
    propertyName: string
  } {
    const { expression, name } = callExpression
    const propertyName = name.text
    let value
    switch (expression?.kind) {
      case ts.SyntaxKind.CallExpression:
        {
          const res = this.walkCallExpression(expression as ts.CallExpression)
          if (res.callName === 'getParam') {
            const valueName = this.scope.yamlNodes.get(res.value)

            const yamlNode: YamlNode = {
              type: YamlNodeType.VaribleRef,
              varibleName: `${valueName}`,
              params: [
                {
                  uuid: 'getParam'
                }
              ],
              metaData: ['getParam', `${propertyName}`],
              children: [],
              name: ''
            }


            value = yamlNode
          } else {
            value = res.value
          }
        }
        break

      case ts.SyntaxKind.NewExpression:
        {
          const { resource } = this.walkNewExpression(expression as ts.NewExpression)
          value = resource
        }
        break
      case ts.SyntaxKind.ParenthesizedExpression:
        {
          value = this.walkParenthesizedExpression(expression as ts.ParenthesizedExpression)
        }
        break
      case ts.SyntaxKind.PropertyAccessExpression:
        {
          const res = this.walkPropertyAccessExpression(expression as ts.PropertyAccessExpression)
          value = res.obj
        }
        break

      case ts.SyntaxKind.Identifier:
        {
          const name = (expression as ts.Identifier).text
          value = this.scope.definitions.get(name)
        }
        break

      default:
        this.log(`[walkPropertyAccessExpression]: expression kind not used ${ts.SyntaxKind[expression?.kind]}`)
        break
    }


    return { propertyName, obj: value }
  }

  walkObjectLiteralExpression(objectLiteralExpression: ts.ObjectLiteralExpression): object {
    const { properties } = objectLiteralExpression
    const obj = {}
    for (let i = 0; i < properties?.length; i++) {
      const property = properties[i]
      let value: any
      switch (property?.kind) {
        case ts.SyntaxKind.PropertyAssignment:
          {
            const node = (property as ts.PropertyAssignment)
            const name = node.name.getText()
            value = this.walkPropertyAssignment(node)
            obj[name] = value
          }
          break
        case ts.SyntaxKind.ShorthandPropertyAssignment:
          {
            const node = (property as ts.ShorthandPropertyAssignment)
            const name = node.name.getText()
            if (this.scope.definitions.has(name)) {
              value = this.scope.definitions.get(name)
            } else {
              this.log(`[walkVariableDeclaration]-[Identifier]:can not find before name = ${name}`)
            }
            obj[name] = value
          }
          break
        default:
          //other expression
          break
      }
    }

    return obj
  }


  walkPropertyAssignment(propertyAssignment: ts.PropertyAssignment): any {
    const { initializer, } = propertyAssignment

    let value

    switch (initializer?.kind) {
      case ts.SyntaxKind.NumericLiteral:
        {
          value = Number((initializer as ts.NumericLiteral).text)
        }
        break
      case ts.SyntaxKind.StringLiteral:
        {
          value = (initializer as ts.StringLiteral).text
        }
        break
      case ts.SyntaxKind.NullKeyword:
        {
          value = null
        }
        break

      case ts.SyntaxKind.BinaryExpression:
        {
          this.log(`[walkPropertyAssignment]:you are walking in BinaryExpression`, LogType.Warning)
          value = this.walkBinaryExpression(initializer as ts.BinaryExpression)
        }
        break
      case ts.SyntaxKind.FalseKeyword:
      case ts.SyntaxKind.TrueKeyword:
        {
          value = initializer.getText() === 'true'
        }
        break
      case ts.SyntaxKind.PropertyAccessExpression:
        {
          //l2.getuuid() 
          //l2.getparam().id
          const res = this.walkPropertyAccessExpression((initializer as ts.PropertyAccessExpression))
          // l2.id
          value = res.obj
        }
        break
      case ts.SyntaxKind.ArrayLiteralExpression:
        {
          value = this.walkArrayLiteralExpression((initializer as ts.ArrayLiteralExpression))
        }
        break

      case ts.SyntaxKind.ObjectLiteralExpression:
        {
          value = this.walkObjectLiteralExpression((initializer as ts.ObjectLiteralExpression))
        }
        break
      case ts.SyntaxKind.CallExpression:
        {
          const res = this.walkCallExpression((initializer as ts.CallExpression))
          value = res.value
        }
        break

      case ts.SyntaxKind.Identifier:
        {
          const name = initializer.getText()
          if (name === 'undefined') {
            value = undefined
          } else {
            if (this.scope.definitions.has(name)) {
              value = this.scope.definitions.get(name)
            } else {
              this.log(`[walkPropertyAssignment]-[Identifier]:can not find before name = ${name}`)
            }
          }
        }
        break

      default: {
        const id = ts.SyntaxKind[initializer?.kind]
        this.log(`[walkPropertyAssignment]-[${id}]:not use Variable Declaration`)
      }
    }

    return value
  }
  walkLiteralExpression(literalExpression: ts.Node) {
    let value: any
    switch (literalExpression?.kind) {
      case ts.SyntaxKind.PropertyAssignment:
        return this.walkPropertyAssignment(literalExpression as ts.PropertyAssignment)
      case ts.SyntaxKind.ShorthandPropertyAssignment:
        {
          //todo
        }
        return null
      default:
        //other expression
        break
    }

    return value
  }

  walkArrayLiteralExpression(arrayLiteralExpression: ts.ArrayLiteralExpression): any[] {
    const values: any[] = []
    const { elements } = arrayLiteralExpression
    for (let i = 0; i < elements.length; i++) {
      const element = elements[i]
      let value: any
      switch (element.kind) {

        case ts.SyntaxKind.NumericLiteral:
          {
            value = (element as ts.NumericLiteral).text
          }
          break
        case ts.SyntaxKind.StringLiteral:
          {
            value = (element as ts.StringLiteral).text
          }
          break
        case ts.SyntaxKind.NullKeyword:
          {
            value = null
          }
          break
        case ts.SyntaxKind.FalseKeyword:
        case ts.SyntaxKind.TrueKeyword:
          {
            value = element.getText() === 'true'
          }
          break
        case ts.SyntaxKind.PropertyAccessExpression:
          {
            const res = this.walkPropertyAccessExpression((element as ts.PropertyAccessExpression))

            if (this.scope.yamlNodes.get(res.obj)) {
              const varibleName = this.scope.yamlNodes.get(res.obj)
              value = `${varibleName}.${res.propertyName}`
            } else {
              this.log(`[walkArrayLiteralExpression]:can not find PropertyAccessExpression name `)

            }
          }
          break
        case ts.SyntaxKind.ArrayLiteralExpression:
          {
            value = this.walkArrayLiteralExpression((element as ts.ArrayLiteralExpression))
          }
          break

        case ts.SyntaxKind.ObjectLiteralExpression:
          {
            value = this.walkObjectLiteralExpression((element as ts.ObjectLiteralExpression))
          }
          break

        case ts.SyntaxKind.CallExpression:
          {
            const res = this.walkCallExpression((element as ts.CallExpression))

            value = res.value
          }
          break
        case ts.SyntaxKind.Identifier:
          {
            const name = element.getText()
            if (name === 'undefined') {
              value = undefined
            } else {
              if (this.scope.definitions.has(name)) {
                value = this.scope.definitions.get(name)
              } else {
                this.log(`[walkArrayLiteralExpression]-[Identifier]:can not find before name = ${name}`)
              }
            }
          }
          break
      }

      values.push(value)

    }

    return values
  }
}

new TypescriptParser().parser()