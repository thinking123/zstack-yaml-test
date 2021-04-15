
import * as vscode from 'vscode';
import { VaribleDuplicateCodeActionProvider, createVaribleDuplicateDiagnostic } from './varible-duplicate-diagnostic'

export const VARIBLE_ID = "zstack-yaml-1"
export const DIAGNOSTIC_COLLECTION = "DIAGNOSTIC_COLLECTION"



export function refreshDiagnostics(doc: vscode.TextDocument, diagnosticCollection: vscode.DiagnosticCollection): void {
	const diagnostics: vscode.Diagnostic[] = [];
	createVaribleDuplicateDiagnostic(doc, diagnostics)
	diagnosticCollection.set(doc.uri, diagnostics);
}


export default (context: vscode.ExtensionContext): void => {

	const diagnosticCollection = vscode.languages.createDiagnosticCollection(DIAGNOSTIC_COLLECTION);
	context.subscriptions.push(diagnosticCollection);


	if (vscode.window.activeTextEditor) {
		refreshDiagnostics(vscode.window.activeTextEditor.document, diagnosticCollection);
	}
	context.subscriptions.push(
		vscode.window.onDidChangeActiveTextEditor(editor => {
			if (editor) {
				refreshDiagnostics(editor.document, diagnosticCollection);
			}
		})
	);

	context.subscriptions.push(
		vscode.workspace.onDidChangeTextDocument(e => refreshDiagnostics(e.document, diagnosticCollection))
	);

	context.subscriptions.push(
		vscode.workspace.onDidCloseTextDocument(doc => diagnosticCollection.delete(doc.uri))
	);

	context.subscriptions.push(
		vscode.languages.registerCodeActionsProvider('yaml-injection', new VaribleDuplicateCodeActionProvider(), {
			providedCodeActionKinds: VaribleDuplicateCodeActionProvider.providedCodeActionKinds
		})
	)
}



