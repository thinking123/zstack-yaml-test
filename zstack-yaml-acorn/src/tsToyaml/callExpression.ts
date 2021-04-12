
import ts, { PropertyAccessExpression, VariableDeclaration, NewExpression, ObjectLiteralExpression, ObjectLiteralElementLike, NodeArray, ShorthandPropertyAssignment, SpreadAssignment, PropertyAssignment, StringLiteral, NumericLiteral, Identifier, ArrayLiteralExpression, Expression, CallExpression } from 'typescript'
import { YamlNode, LogInfo } from "../types";
import { Logger } from './logger'
import { variableDeclarationParserOptions } from './types';

const callExpressionParser = (node: CallExpression, options: variableDeclarationParserOptions) => {

  // const { expression, arguments } = node

  // const propertyAccessExpression = expression as PropertyAccessExpression
  // const expressionName = propertyAccessExpression

  // if(propertyAccessExpression.kind === ts.SyntaxKind.NewExpression){

  // }
}