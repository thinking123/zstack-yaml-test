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



export enum ParserMode {
  Combine = "Combine",
  Single = "Single",
  All = "All",
}
export interface ParserConfig {
  dir?: string
  files?: string[]
  mode: ParserMode
  watch: boolean
  overWrite: boolean
  importResourcePath: string
  pattern: RegExp
  extension: string
}