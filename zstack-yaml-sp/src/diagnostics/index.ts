
import * as vscode from 'vscode';
import varibleDuplicateDiagnostic from './varible-duplicate-diagnostic'
import varibleNotDefinedDiagnostic from './varible-not-declare-diagnostic'
import varibleEmptyDiagnostic from './varible-empty-diagnostic'
import { DIAGNOSTIC_COLLECTION } from '../utils';


export function refreshDiagnostics(doc: vscode.TextDocument, diagnosticCollection: vscode.DiagnosticCollection, context: vscode.ExtensionContext): void {
	const diagnostics: vscode.Diagnostic[] = []

	varibleDuplicateDiagnostic(doc, diagnostics, context)
	// varibleNotDefinedDiagnostic(doc, diagnostics, context)
	// varibleEmptyDiagnostic(doc, diagnostics, context)

	diagnosticCollection.set(doc.uri, diagnostics);
}


export default (context: vscode.ExtensionContext): void => {

	const diagnosticCollection = vscode.languages.createDiagnosticCollection(DIAGNOSTIC_COLLECTION);
	context.subscriptions.push(diagnosticCollection);


	if (vscode.window.activeTextEditor) {
		refreshDiagnostics(vscode.window.activeTextEditor.document, diagnosticCollection, context);
	}
	context.subscriptions.push(
		vscode.window.onDidChangeActiveTextEditor(editor => {
			if (editor) {
				refreshDiagnostics(editor.document, diagnosticCollection, context);
			}
		})
	);

	context.subscriptions.push(
		vscode.workspace.onDidChangeTextDocument(e => refreshDiagnostics(e.document, diagnosticCollection, context))
	);

	context.subscriptions.push(
		vscode.workspace.onDidCloseTextDocument(doc => diagnosticCollection.delete(doc.uri))
	);


}



