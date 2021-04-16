import * as vscode from 'vscode';
import { RegionText } from './types';


export const varibleReg = /\((\w+)\)/g
export const startRegionReg = /^\w+/
export const varibleDefinitionReg = /\((\w+)\)/
// - var 
// var.p
export const varibleRefReg = /(?<=-\s+)([a-z]\w+)\b|(?<=\s+)([a-z]\w+)(?=\.)/

export const ACTION = 'action'
/**

2: b1:
  -xx
4: b2:
  -xx
@return [{startIndex: 2, text: "b1:\n  -xx"},]
 */
const splitTextToRegion = (document: vscode.TextDocument) => {

  const regions: Partial<RegionText>[] = []
  let buffer: string = ''
  let startIndex: number = 0
  let lineIndex = 0
  let varibles = []
  let varibleRefs = []

  for (; lineIndex < document.lineCount; lineIndex++) {
    const text = document.lineAt(lineIndex)?.text;
    const start = text?.match(startRegionReg)

    if (start) {
      if (buffer) {
        regions.push({
          startIndex,
          endIndex: lineIndex - 1,
          text: buffer,
          varibles,
          varibleRefs
        })
      }
      startIndex = lineIndex
      buffer = text
      varibles = []
      varibleRefs = []
    } else {
      buffer += text
    }

    const varibleMatch = text.match(varibleDefinitionReg)
    if (varibleMatch && varibleMatch?.[1] && varibleMatch?.[1] !== ACTION) {

      const name = varibleMatch[1]
      varibles.push({
        name,
        range: new vscode.Range(
          new vscode.Position(lineIndex,
            varibleMatch.index!),
          new vscode.Position(lineIndex,
            name.length + varibleMatch.index! + 1)
        )
      })
    }

    const varibleRefMatch = text.match(varibleRefReg)
    let varibleRef: string
    if (varibleRefMatch && (varibleRef = varibleRefMatch?.[1] ?? varibleRefMatch?.[2])) {
      varibleRefs.push({
        name: varibleRef,
        range: new vscode.Range(
          new vscode.Position(lineIndex,
            varibleRefMatch.index!),
          new vscode.Position(lineIndex,
            varibleRef.length + varibleRefMatch.index! + 1)
        )
      })
    }
  }
  // const p:vscode.Position  = 
  regions.push({
    startIndex,
    endIndex: lineIndex,
    text: buffer,
    varibles,
    varibleRefs
  })


  return regions
}


// const getVaribles = (document: vscode.TextDocument) => {
//   const regions = splitTextToRegion(document)


// }


export {
  splitTextToRegion
}