import * as vscode from 'vscode';
import * as zstackTypes from './zstack/graphql';
import { resources } from './zstack/constants';
import completion from './completion'
import diagnostic from './diagnostics'
import semantic from './semantic-highlighting'
import definition from './go-to-definition'
interface Var {
	resourceName: string
	varName: string
}
export function activate(context: vscode.ExtensionContext) {

	completion(context)
	diagnostic(context)
	semantic(context)
	definition(context)

}
