import * as vscode from 'vscode';

export interface Varible {
  name: string,
  range: vscode.Range
}
export interface RegionText {
  text: string,
  range: vscode.Range
  varibles: Varible[]
  varibleRefs: Varible[]
}