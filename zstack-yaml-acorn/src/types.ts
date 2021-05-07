
export enum YamlNodeType {
  Varible = 'Varible',
  Resource = 'Resource',
  Action = 'Action',
  Root = 'Root',
  Binary = 'Binary',
  VaribleRef = 'VaribleRef',
  UnKnown = 'UnKnown',
}

export interface MetaData {
  [key: string]: string | number
}

export interface YamlNode {
  children: YamlNode[]
  type: YamlNodeType
  name: string
  metaData?: string[]
  params?: MetaData[]
  parent?: YamlNode
  varibleName?: string
}
export enum LogType {
  Error = 'Error',
  Info = 'Info',
  Warning = 'Warning'
}
export enum StdoutType {
  Console = 'Console',
  File = 'File',
}
export interface LogInfo {
  type: LogType,
  message: string
  metaData?: any
}

export type WalkAstOptions = {
  [key in YamlNodeType]: (astNode: YamlNode) => void
}

export interface DumpConfig {
  allResources: any,
  mnEnv: any
}