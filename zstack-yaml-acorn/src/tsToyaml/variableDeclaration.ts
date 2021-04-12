import ts, { PropertyAccessExpression, VariableDeclaration, NewExpression, ObjectLiteralExpression, ObjectLiteralElementLike, NodeArray, ShorthandPropertyAssignment, SpreadAssignment, PropertyAssignment, StringLiteral, NumericLiteral, Identifier, ArrayLiteralExpression, Expression } from 'typescript'
import { YamlNode, LogInfo } from "../types";
import { Logger } from './logger'
import { variableDeclarationParserOptions } from './types';



//ObjectLiteralElementLike = PropertyAssignment | ShorthandPropertyAssignment | SpreadAssignment | MethodDeclaration | AccessorDeclaration;
export function getObjectLiteralExpressionVal(node: ObjectLiteralExpression,
  val: any,
  options: variableDeclarationParserOptions) {
  const { properties = [] } = node

  properties.forEach((property: ObjectLiteralElementLike) => {
    const name = property?.name?.getText()
    const value = parserLiteralValue(property, options)
    val[name] = value
  })
}
function getArrayLiteralExpressionVal(node: ArrayLiteralExpression,
  val: any[],
  options: variableDeclarationParserOptions) {
  const { elements = [] } = node
  elements.forEach((property: Expression) => {
    const value = parserLiteralValue(property, options)
    val.push(value)
  })
}

//ObjectLiteralExpression
// type LiteralValue = StringLiteral | FalseKeyword | NumericLiteral | NullKeyword | TrueKeyword | Identifier

export function parserLiteralValue(node: ts.Node, options: variableDeclarationParserOptions) {
  const {
    varibleMap,
    variableDeclarationMap
  } = options
  switch (node.kind) {
    case ts.SyntaxKind.NumericLiteral:
      {
        const val = Number(node.getText())
        return val
      }

    case ts.SyntaxKind.NullKeyword:
      {
        return null
      }

    case ts.SyntaxKind.StringLiteral:
      {
        const val = node.getText()
        return val
      }

    case ts.SyntaxKind.FalseKeyword:
    case ts.SyntaxKind.TrueKeyword: {
      const val = node.getText() === 'true'
      return val
    }

    // {}
    case ts.SyntaxKind.ObjectLiteralExpression:
      {
        const val = {}
        getObjectLiteralExpressionVal(node as ObjectLiteralExpression, val, options)
        return val
      }
    // []
    case ts.SyntaxKind.ArrayLiteralExpression:
      {
        const val = []
        getArrayLiteralExpressionVal(node as ArrayLiteralExpression, val, options)
        return val
      }

    case ts.SyntaxKind.Identifier:
      {
        const val = node.getText()
        if (val === 'undefined') {
          return undefined
        }
        return variableDeclarationMap.get(val)
      }
  }
}
/**
 * 解析 属性 value to valMap
 * @param node 
 * @param options 
 */
export const variableDeclarationParser = (
  node: ts.Node,
  options: variableDeclarationParserOptions
) => {
  const {
    variableDeclarationMap
  } = options
  const logger = Logger.logger()
  const variableDeclaration = node as VariableDeclaration
  const variableName = variableDeclaration?.name?.getText()
  switch (variableDeclaration?.initializer?.kind) {
    // Literal 
    case ts.SyntaxKind.NumericLiteral:
      {
        const val = Number(variableDeclaration.initializer.getText())
        variableDeclarationMap.set(variableName, val)
        break
      }

    case ts.SyntaxKind.StringLiteral:
      {
        const val = variableDeclaration.initializer.getText()
        variableDeclarationMap.set(variableName, val)
        break
      }

    case ts.SyntaxKind.FalseKeyword:
    case ts.SyntaxKind.TrueKeyword: {
      const val = variableDeclaration.initializer.getText() === 'true'
      variableDeclarationMap.set(variableName, val)
      break
    }

    // const b = {b:'12',...} , only set Literal value 
    case ts.SyntaxKind.ObjectLiteralExpression:
      {
        const val = {}
        getObjectLiteralExpressionVal(node as ObjectLiteralExpression, val, options)
        variableDeclarationMap.set(variableName, val)
        break
      }
    case ts.SyntaxKind.ArrayLiteralExpression:
      {
        const val = []
        getArrayLiteralExpressionVal(node as ArrayLiteralExpression, val, options)
        variableDeclarationMap.set(variableName, val)
        break
      }


    default:
      if (variableDeclaration?.initializer === undefined) {
        variableDeclarationMap.set(variableName, undefined)
      } else {
        //others: CallExpression , const b = new Cls()
        logger.log(`others : ${variableName}`)
      }

      break;

  }

}