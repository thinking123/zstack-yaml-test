import ts, { PropertyAccessExpression, VariableDeclaration, NewExpression, ObjectLiteralExpression, ObjectLiteralElementLike, NodeArray, ShorthandPropertyAssignment, SpreadAssignment, PropertyAssignment, StringLiteral, NumericLiteral, Identifier, ArrayLiteralExpression, Expression, ExpressionStatement } from 'typescript'
import { TsNode, variableDeclarationParserOptions } from "./types";




export const expressionStatement = (node: ExpressionStatement, options: variableDeclarationParserOptions) => {

  const { expression } = node
  const { walkNode } = options


  switch (expression?.kind) {
    case ts.SyntaxKind.PropertyAccessExpression:
      {
        // const _expression = (expression as PropertyAccessExpression)?.expression
        walkNode?.(expression)
      }
      break
  }


}