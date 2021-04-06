/*---------------------------------------------------------
 * Copyright (C) Microsoft Corporation. All rights reserved.
 *--------------------------------------------------------*/

import * as vscode from 'vscode';
import * as zstackTypes from './zstack/graphql';
import { resources } from './zstack/constants';


interface Var {
	resourceName: string
	varName: string
}
export function activate(context: vscode.ExtensionContext) {
	const vars: Map<string, Var> = new Map();

	const refreshVar = (doc: vscode.TextDocument, _vars: Map<string, Var>) => {
		const varReg = /([A-Z]\w+)\((\w+)\)/;
		_vars.clear();
		for (let lineIndex = 0; lineIndex < doc.lineCount; lineIndex++) {
			const lineOfText = doc.lineAt(lineIndex);
			const [, resourceName, varName] = lineOfText.text.match(varReg) ?? [];

			if (varName) {
				_vars.set(varName, {
					resourceName,
					varName
				});
			}
		}

	};

	const provider1 = vscode.languages.registerCompletionItemProvider('yaml', {

		provideCompletionItems(document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken, context: vscode.CompletionContext) {

			// a simple completion item which inserts `Hello World!`
			const simpleCompletion = new vscode.CompletionItem('Hello World!');

			// a completion item that inserts its text as snippet,
			// the `insertText`-property is a `SnippetString` which will be
			// honored by the editor.
			const snippetCompletion = new vscode.CompletionItem('Good part of the day');
			snippetCompletion.insertText = new vscode.SnippetString('Good ${1|morning,afternoon,evening|}. It is ${1}, right?');
			snippetCompletion.documentation = new vscode.MarkdownString("Inserts a snippet that lets you select the _appropriate_ part of the day for your greeting.");

			// a completion item that can be accepted by a commit character,
			// the `commitCharacters`-property is set which means that the completion will
			// be inserted and then the character will be typed.
			const commitCharacterCompletion = new vscode.CompletionItem('console');
			commitCharacterCompletion.commitCharacters = ['.'];
			commitCharacterCompletion.documentation = new vscode.MarkdownString('Press `.` to get `console.`');

			// a completion item that retriggers IntelliSense when being accepted,
			// the `command`-property is set which the editor will execute after 
			// completion has been inserted. Also, the `insertText` is set so that 
			// a space is inserted after `new`
			const commandCompletion = new vscode.CompletionItem('new');
			commandCompletion.kind = vscode.CompletionItemKind.Keyword;
			commandCompletion.insertText = 'new ';
			commandCompletion.command = { command: 'editor.action.triggerSuggest', title: 'Re-trigger completions...' };



			const resourceCompletions = resources.map(resource => {
				const zstackResourceCompletion = new vscode.CompletionItem(resource);
				zstackResourceCompletion.kind = vscode.CompletionItemKind.Class;

				return zstackResourceCompletion;
			});

			// return all completion items as array
			return [
				...resourceCompletions
				// simpleCompletion,
				// snippetCompletion,
				// commitCharacterCompletion,
				// commandCompletion
			];
		}
	});

	const provider2 = vscode.languages.registerCompletionItemProvider(
		'yaml',
		{
			provideCompletionItems(document: vscode.TextDocument, position: vscode.Position) {

				const lineText = document.lineAt(position).text;

				console.log('vars', vars);
				console.log('lineText', lineText);

				let _resourceName = '';
				vars.forEach(({ varName, resourceName }) => {
					if (lineText.endsWith(`${varName}.`) && !_resourceName) {
						_resourceName = resourceName;
					}
				});

				console.log('lineText', _resourceName);
				if (!resources.includes(_resourceName)) {
					return undefined;
				}

				// const resourceClass = (zstackTypes as any)[_resourceName];
				// console.log('zstackTypes', zstackTypes);
				// console.log('resourceClass', resourceClass);

				// if (!resourceClass) {
				// 	return undefined;
				// }

				const propertys = [
					'uuid',
					'name',
					'param'
				];
				return propertys.map(key => {
					return new vscode.CompletionItem(key, vscode.CompletionItemKind.Property);
				});

				// return [
				// 	new vscode.CompletionItem('log', vscode.CompletionItemKind.Property),
				// 	new vscode.CompletionItem('warn', vscode.CompletionItemKind.Property),
				// 	new vscode.CompletionItem('error', vscode.CompletionItemKind.Property),
				// ];
			}
		},
		'.' // triggered whenever a '.' is being typed
	);

	const provider3 = vscode.languages.registerCompletionItemProvider(
		'yaml',
		{
			provideCompletionItems(document: vscode.TextDocument, position: vscode.Position) {

				// const lineNumber = document.lineAt(position).lineNumber;
				// const preLineNumber = lineNumber - 1;
				// if(preLineNumber < 0){
				// 	return null;
				// }
				// const preText = document.lineAt(preLineNumber);
				const lineText = document.lineAt(position).text;

				const resourceLineReg = /-?\s*[A-Z][^\s]+:/;
				if (lineText.match(resourceLineReg)) {
					return null;
				}
				const items: vscode.CompletionItem[] = [];
				for (const [key, { varName }] of vars) {
					items.push(
						new vscode.CompletionItem(` ${varName}`, vscode.CompletionItemKind.Variable)
					);
				}

				return items;
			}
		},
		':'
	);
	const provider4 = vscode.languages.registerCompletionItemProvider(
		'yaml',
		{
			provideCompletionItems(document: vscode.TextDocument, position: vscode.Position) {

				const lineText = document.lineAt(position).text;
				const resNameReg = /\b([A-Z]\w+)(?=\()/;

				const [, resourceName] = lineText.match(resNameReg) ?? [];
				if (!resourceName) {
					return undefined;
				}
				const varName = resourceName[0].toLocaleLowerCase() + resourceName.substring(1);
				const items: vscode.CompletionItem[] = [];

				return [new vscode.CompletionItem(varName, vscode.CompletionItemKind.Variable)];
			}
		},
		'('
	);

	context.subscriptions.push(provider1, provider2, provider3, provider4,
		vscode.workspace.onDidChangeTextDocument(e => refreshVar(e.document, vars))
	);
}
