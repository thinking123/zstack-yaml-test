import * as vscode from 'vscode';
import completion from './completion';
import diagnostic from './diagnostics';
import definition from './go-to-definition';
import semantic from './semantic-highlighting';


export function activate(context: vscode.ExtensionContext) {

	completion(context)
	diagnostic(context)
	semantic(context)
	definition(context)

}
