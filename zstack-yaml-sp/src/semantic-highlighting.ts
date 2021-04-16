import * as vscode from 'vscode';
import { tokenModifiers, tokenTypes, splitTextToRegion } from './utils';


const legend = new vscode.SemanticTokensLegend(tokenTypes, tokenModifiers);

export default (context: vscode.ExtensionContext) => {

  const provider: vscode.DocumentSemanticTokensProvider = {
    provideDocumentSemanticTokens(
      document: vscode.TextDocument
    ): vscode.ProviderResult<vscode.SemanticTokens> {
      const tokensBuilder = new vscode.SemanticTokensBuilder(legend);
      const regions = splitTextToRegion(document)

      regions.forEach(({ varibleRefs }) => {
        varibleRefs?.forEach(varibleRef => {
          tokensBuilder.push(
            varibleRef.range,
            'variable',
          )
        })
      })

      return tokensBuilder.build();
    }
  };


  const registerDocumentSemanticTokensProvider = vscode.languages.registerDocumentSemanticTokensProvider("yaml-injection", provider, legend);


  context.subscriptions.push(registerDocumentSemanticTokensProvider);

}