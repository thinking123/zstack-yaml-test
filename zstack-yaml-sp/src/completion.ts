import * as vscode from 'vscode';
import { resources } from './zstack/constants';
import { splitTextToRegion, resourceReg, fixDuplicatVaribleName } from './utils';







export default (context: vscode.ExtensionContext) => {

  const providerForResourceProperty = vscode.languages.registerCompletionItemProvider('yaml-injection', {

    provideCompletionItems(document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken, context: vscode.CompletionContext) {

      const properties = [
        'uuid',
        'name',
        'param'
      ]
      const resourceCompletions = properties.map(resource => {
        const zstackResourceCompletion = new vscode.CompletionItem(resource);
        zstackResourceCompletion.kind = vscode.CompletionItemKind.Class;

        return zstackResourceCompletion;
      });

      return [
        ...resourceCompletions
      ];
    }
  }, '.');

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

      try {
        const regions = splitTextToRegion(document)
        const region = regions.find(_region => _region.range.contains(position))
        const text = document.lineAt(position.line)?.text

        const [resource] = text?.match(resourceReg) ?? []

        if (!resource) {
          return undefined
        }


        let varibleName = resource[0].toLowerCase() + resource.substr(1)
        varibleName = fixDuplicatVaribleName(varibleName, region?.varibles)


        const zstackResourceCompletion = new vscode.CompletionItem(varibleName);
        zstackResourceCompletion.kind = vscode.CompletionItemKind.Variable;

        return [zstackResourceCompletion]
      } catch (err) {


        console.log('err', err)
      }

    }
  }, '(');


  context.subscriptions.push(providerForResource, providerForVarible, providerForResourceProperty);



}