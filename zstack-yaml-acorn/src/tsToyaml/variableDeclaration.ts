import ts, { PropertyAccessExpression, VariableDeclaration, NewExpression, ObjectLiteralExpression, ObjectLiteralElementLike, NodeArray, ShorthandPropertyAssignment, SpreadAssignment } from 'typescript'
import { YamlNode, LogInfo } from "../types";
import { Logger } from './logger'


interface variableDeclarationParserOptions {
  varibleMap: Map<string, YamlNode>,
  variableDeclarationMap: Map<any, any>
  logInfo?: LogInfo[]
}

//ObjectLiteralElementLike = PropertyAssignment | ShorthandPropertyAssignment | SpreadAssignment | MethodDeclaration | AccessorDeclaration;
const getObjectLiteralExpressionVal = (node: ObjectLiteralExpression, val: any, options: variableDeclarationParserOptions) => {
  const { properties = [] } = node
  const {
    varibleMap,
    variableDeclarationMap
  } = options
  // const ps = properties as NodeArray<ObjectLiteralElementLike>
  properties.forEach((property: ObjectLiteralElementLike) => {
    switch (property.kind) {
      //const b = 1 ; const obj = { b }
      case ts.SyntaxKind.ShorthandPropertyAssignment:
        {
          const propertyName = (property as ShorthandPropertyAssignment).name.getText()
          val[propertyName] = varibleMap.get(propertyName)
        }
        break
      case ts.SyntaxKind.SpreadAssignment:
        {
          const spreadAssignment = property as SpreadAssignment
          const spreadAssignmentName = spreadAssignment
        }
        break
    }
  })
}

export const variableDeclarationParser = (
  node: ts.Node,
  options: variableDeclarationParserOptions
) => {
  const {
    varibleMap,
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
    // // const obj = {...obj1}
    // case ts.SyntaxKind.SpreadAssignment:
    //   {
    //     const val = variableDeclaration.initializer.getText()
    //     variableDeclarationMap.set(variableName, val)
    //     break
    //   }


    case ts.SyntaxKind.FalseKeyword:
    case ts.SyntaxKind.TrueKeyword: {
      const val = variableDeclaration.initializer.getText() === 'true'
      variableDeclarationMap.set(variableName, val)
      break
    }

    case ts.SyntaxKind.ObjectLiteralExpression:
      {
        const val = variableDeclaration.initializer.getText()
        variableDeclarationMap.set(variableName, val)
        break
      }


    default:
      if (variableDeclaration?.initializer === undefined) {
        variableDeclarationMap.set(variableName, undefined)
      } else {
        logger.log(`no initializer variableDeclaration name : ${variableName}`)
      }

      break;

  }

}