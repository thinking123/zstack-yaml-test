
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

    const lineIndex = range.start.line
    const text = document.lineAt(lineIndex)?.text
    let match
    if (!(match = text.match(emptyVaribleReg))) return

    const fix = new vscode.CodeAction(`修复空变量: ${lineIndex}-${range.start.character}`, vscode.CodeActionKind.QuickFix);
    fix.edit = new vscode.WorkspaceEdit();
    fix.edit.replace(document.uri, new vscode.Range(
      new vscode.Position(lineIndex, match.index!),
      new vscode.Position(lineIndex, match.index! + 2)
    ), '');

    return [fix]
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