import * as vscode from 'vscode';
import completion from './completion';
import diagnostic from './diagnostics';
import definition from './go-to-definition';
import semantic from './semantic-highlighting';
import { emptyVaribleReg } from './utils';
import { VaribleEmptyCodeActionProvider } from './diagnostics/varible-empty-diagnostic';
import { VaribleDuplicateCodeActionProvider } from './diagnostics/varible-duplicate-diagnostic';




export function activate(context: vscode.ExtensionContext) {

	completion(context)
	diagnostic(context)
	semantic(context)
	definition(context)
	context.subscriptions.push(
		vscode.languages.registerCodeActionsProvider('yaml-injection', new VaribleEmptyCodeActionProvider(), {
			providedCodeActionKinds: VaribleEmptyCodeActionProvider.providedCodeActionKinds
		})
	)

	context.subscriptions.push(
		vscode.languages.registerCodeActionsProvider('yaml-injection', new VaribleDuplicateCodeActionProvider(), {
			providedCodeActionKinds: VaribleDuplicateCodeActionProvider.providedCodeActionKinds
		})
	)
}
