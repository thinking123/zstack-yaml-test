import ts from 'typescript'
import { YamlNode, LogInfo } from "../types";

export interface variableDeclarationParserOptions {
  varibleMap: Map<string, YamlNode>,
  variableDeclarationMap: Map<any, any>
  logInfo?: LogInfo[]
}


export interface Node extends ts.Node {
  yamlNode?: YamlNode
}
