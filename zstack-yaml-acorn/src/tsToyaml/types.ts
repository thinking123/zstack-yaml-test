import ts from 'typescript'
import { YamlNode, LogInfo } from "../types";

export interface variableDeclarationParserOptions {
  varibleMap: Map<string, YamlNode>
  variableDeclarationMap: Map<any, any>
  logInfo?: LogInfo[]
  walkNode?: (node: TsNode) => {}
}


export interface TsNode extends ts.Node {
  yamlNode?: YamlNode
}
