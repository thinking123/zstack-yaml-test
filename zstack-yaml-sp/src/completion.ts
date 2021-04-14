import * as vscode from 'vscode';
import * as zstackTypes from './zstack/graphql';
import { resources } from './zstack/constants';







export default () => {

  const providerForResource = vscode.languages.registerCompletionItemProvider('yaml-injection', {

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
  }, '[A-Z]');




  const providerForVarible = vscode.languages.registerCompletionItemProvider('yaml-injection', {

    provideCompletionItems(document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken, context: vscode.CompletionContext) {

      const varibleReg = /\((\w+)\)/g
      const reg = /\b(\w+)(?=\()/
      const getLineText = document.lineAt(position.line)?.text

      const [, resource] = getLineText?.match(reg) ?? []


      if (!resource) {
        return undefined
      }

      const text: string = document.getText() ?? ''
      const allMatch = text.matchAll(varibleReg)

      const varibles = [...allMatch].map(v => {
        return v?.[1]
      }).filter(Boolean)


      // eslint-disable-next-line @typescript-eslint/semi
      let baseName = resource[0]?.toLowerCase() + resource?.substr(1)
      let index = 1
      let completionText = baseName
      while (varibles.includes(completionText)) {
        completionText = baseName + (index++);
      }
      const zstackResourceCompletion = new vscode.CompletionItem(completionText ?? '');
      zstackResourceCompletion.kind = vscode.CompletionItemKind.Variable;

      return [zstackResourceCompletion]
    }
  }, '(');


  return [providerForResource, providerForVarible]

}