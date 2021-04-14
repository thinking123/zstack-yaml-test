import * as vscode from 'vscode';
import * as zstackTypes from './zstack/graphql';
import { resources } from './zstack/constants';





export const providerForResource = vscode.languages.registerCompletionItemProvider('yaml', {

  provideCompletionItems(document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken, context: vscode.CompletionContext) {


    const resourceCompletions = resources.map(resource => {
      const zstackResourceCompletion = new vscode.CompletionItem(resource);
      zstackResourceCompletion.kind = vscode.CompletionItemKind.Class;

      return zstackResourceCompletion;
    });

    return [
      ...resourceCompletions
    ];
  }
});