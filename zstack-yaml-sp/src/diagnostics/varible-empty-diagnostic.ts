
import * as vscode from 'vscode';
import { commentReg, emptyVaribleReg, VARIBLE_EMPTY_DEFINED_ID } from '../utils';





const createVaribleEmptyDiagnostic = (document: vscode.TextDocument, diagnostics: vscode.Diagnostic[]) => {


  for (let lineIndex = 0; lineIndex < document.lineCount; lineIndex++) {
    let text = document.lineAt(lineIndex)?.text

    const comment = text?.match(commentReg)
    if (comment) {
      text = text.substr(0, comment.index)
    }

    const emptyVarible = text.match(emptyVaribleReg)

    if (emptyVarible) {
      const diagnostic = new vscode.Diagnostic(
        new vscode.Range(
          new vscode.Position(lineIndex, emptyVarible.index!),
          new vscode.Position(lineIndex, emptyVarible.index! + 2)
        )
        , "空变量",
        vscode.DiagnosticSeverity.Error);

      diagnostic.code = VARIBLE_EMPTY_DEFINED_ID;

      diagnostics.push(diagnostic);
    }
  }

}




class VaribleEmptyCodeActionProvider implements vscode.CodeActionProvider {

  public static readonly providedCodeActionKinds = [
    vscode.CodeActionKind.QuickFix
  ];

  public provideCodeActions(document: vscode.TextDocument, range: vscode.Range, context: vscode.CodeActionContext): vscode.CodeAction[] | undefined {

    const fixs: vscode.CodeAction[] = []

    context.diagnostics.forEach(diagnostic => {
      const fix = new vscode.CodeAction("修复空变量", vscode.CodeActionKind.QuickFix);
      fix.edit = new vscode.WorkspaceEdit();
      fix.isPreferred = true;
      fix.edit.replace(document.uri, new vscode.Range(diagnostic.range.start, diagnostic.range.end), '');

      fixs.push(fix)
    })

    return fixs
  }
}


export default (document: vscode.TextDocument, diagnostics: vscode.Diagnostic[], context: vscode.ExtensionContext) => {

  createVaribleEmptyDiagnostic(document, diagnostics)

  context.subscriptions.push(
    vscode.languages.registerCodeActionsProvider('yaml-injection', new VaribleEmptyCodeActionProvider(), {
      providedCodeActionKinds: VaribleEmptyCodeActionProvider.providedCodeActionKinds
    })
  )
}