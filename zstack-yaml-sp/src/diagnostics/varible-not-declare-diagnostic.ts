
import * as vscode from 'vscode';
import { splitTextToRegion, VARIBLE_NOT_DEFINED_ID } from '../utils';

const createVaribleNotDefinedDiagnostic = (document: vscode.TextDocument, diagnostics: vscode.Diagnostic[]) => {

  const regions = splitTextToRegion(document)
  regions.forEach(({ varibles, varibleRefs }) => {

    const notDefinedVaribles = varibleRefs?.filter(({ name, range }) => {
      const noVaribleFound = !varibles?.find(({ name: _name, range: _range }) => (_name === name && range.start.isAfter(_range.start)))

      return noVaribleFound
    })
    notDefinedVaribles.forEach((varible, index) => {
      const diagnostic = new vscode.Diagnostic(varible.range, "not define 的变量",
        vscode.DiagnosticSeverity.Error);
      diagnostic.code = VARIBLE_NOT_DEFINED_ID;
      diagnostics.push(diagnostic);
    })

  })
}




export default (document: vscode.TextDocument, diagnostics: vscode.Diagnostic[], context: vscode.ExtensionContext) => {

  createVaribleNotDefinedDiagnostic(document, diagnostics)

}