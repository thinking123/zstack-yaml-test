
import * as vscode from 'vscode';
import { groupBy, forEach } from 'lodash'
import { VARIBLE_DUPLICATE_ID, splitTextToRegion, fixDuplicatVaribleName } from '../utils';





const createVaribleDuplicateDiagnostic = (document: vscode.TextDocument, diagnostics: vscode.Diagnostic[]) => {


  const regions = splitTextToRegion(document)
  regions.forEach(({ varibles }) => {

    const names = groupBy(varibles, 'name')
    forEach(names, (sameVaribles) => {
      if (sameVaribles?.length > 1) {

        sameVaribles.forEach((sameVarible, index) => {
          const diagnostic = new vscode.Diagnostic(sameVarible.range, "重复的变量",
            vscode.DiagnosticSeverity.Error);
          diagnostic.relatedInformation = sameVaribles.filter((_, _index) => _index !== index).map(otherVarible => {
            return new vscode.DiagnosticRelatedInformation(
              new vscode.Location(document.uri,
                otherVarible.range),
              "重复的变量"
            )
          })

          diagnostic.code = VARIBLE_DUPLICATE_ID;

          diagnostics.push(diagnostic);
        })

      }
    })

  })
}




class VaribleDuplicateCodeActionProvider implements vscode.CodeActionProvider {

  public static readonly providedCodeActionKinds = [
    vscode.CodeActionKind.QuickFix
  ];

  public provideCodeActions(document: vscode.TextDocument, range: vscode.Range, context: vscode.CodeActionContext): vscode.CodeAction[] | undefined {

    const fixs: vscode.CodeAction[] = []

    const regions = splitTextToRegion(document)

    const curRegion = regions.find(region => region.range.contains(range))
    if (curRegion) {
      const { varibles } = curRegion
      const varible = varibles?.find(_varible => _varible.range.isEqual(range))

      if (varible) {
        const newName = fixDuplicatVaribleName(varible, varibles)
        const { range: sameVaribleRange } = varible
        const fix = new vscode.CodeAction("修复重复变量", vscode.CodeActionKind.QuickFix);
        fix.edit = new vscode.WorkspaceEdit();
        fix.edit.replace(document.uri, new vscode.Range(sameVaribleRange.start, sameVaribleRange.start.translate(0, newName.length)), newName);

        fixs.push(fix)
      }
    }

    return fixs
  }
}


export default (document: vscode.TextDocument, diagnostics: vscode.Diagnostic[], context: vscode.ExtensionContext) => {

  createVaribleDuplicateDiagnostic(document, diagnostics)

  context.subscriptions.push(
    vscode.languages.registerCodeActionsProvider('yaml-injection', new VaribleDuplicateCodeActionProvider(), {
      providedCodeActionKinds: VaribleDuplicateCodeActionProvider.providedCodeActionKinds
    })
  )
}