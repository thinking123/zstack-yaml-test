import * as vscode from 'vscode';

export interface Varible {
  name: string,
  range: vscode.Range
}
export interface RegionText {
  startIndex: number,
  endIndex: number,
  text: string,
  varibles: Varible[]
  varibleRefs: Varible[]
}