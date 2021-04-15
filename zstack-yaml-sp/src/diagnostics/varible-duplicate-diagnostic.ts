
import * as vscode from 'vscode';


export const VARIBLE_ID = "zstack-yaml-1"


export function createVaribleDuplicateDiagnostic(doc: vscode.TextDocument, diagnostics: vscode.Diagnostic[]) {

  const variblesReg = /\((\w+)\)/g
  const varibleReg = /\((\w+)\)/
  const text: string = doc.getText() ?? ''
  const allMatch = text.matchAll(variblesReg)
  const varibles = [...allMatch].map(v => {
    return v?.[1]
  }).filter(Boolean)

  for (let lineIndex = 0; lineIndex < doc.lineCount; lineIndex++) {
    const lineOfText = doc.lineAt(lineIndex);
    const [, varible] = lineOfText?.text?.match(varibleReg) ?? []

    if (varible && varibles?.filter(v => v === varible)?.length > 1) {
      const index = lineOfText.text.indexOf(varible);

      const range = new vscode.Range(lineIndex, index, lineIndex, index + varible.length);

      const diagnostic = new vscode.Diagnostic(range, "重复的变量",
        vscode.DiagnosticSeverity.Error);

      // diagnostic.relatedInformation = [
      // 	new vscode.DiagnosticRelatedInformation(new vscode.Location(doc.uri, doc.positionAt(2)), "createVaribleDuplicateDiagnostic")
      // ]
      diagnostic.code = VARIBLE_ID;

      diagnostics.push(diagnostic);
    }
  }
}




export class VaribleDuplicateCodeActionProvider implements vscode.CodeActionProvider {

  public static readonly providedCodeActionKinds = [
    vscode.CodeActionKind.QuickFix
  ];

  public provideCodeActions(document: vscode.TextDocument, range: vscode.Range): vscode.CodeAction[] | undefined {

    const replaceWithSmileyFix = this.createFix(document, range);
    // Marking a single fix as `preferred` means that users can apply it with a
    // single keyboard shortcut using the `Auto Fix` command.
    replaceWithSmileyFix.isPreferred = true;



    return [
      replaceWithSmileyFix,
    ];
  }



  private createFix(document: vscode.TextDocument, range: vscode.Range): vscode.CodeAction {
    const variblesReg = /\((\w+)\)/g
    const varibleReg = /\((\w+)\)/
    const text: string = document.getText() ?? ''
    const allMatch = text.matchAll(variblesReg)
    const varibles = [...allMatch].map(v => {
      return v?.[1]
    }).filter(Boolean)

    const start = range.start;

    const lineOfText = document.lineAt(start.line);

    const [, varible] = lineOfText?.text?.match(varibleReg) ?? []
    let index = 1
    let newVarible = varible + (index++)
    while (varibles.includes(newVarible)) {
      newVarible = varible + (index++)
    }

    const fix = new vscode.CodeAction(`Convert to new Varible `, vscode.CodeActionKind.QuickFix);
    fix.edit = new vscode.WorkspaceEdit();
    fix.edit.replace(document.uri, new vscode.Range(range.start, range.start.translate(0, varible.length)), newVarible);
    return fix;
  }
}
