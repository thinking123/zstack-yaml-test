import * as vscode from 'vscode';

const tokenTypes = ['class', 'interface', 'enum', 'function', 'variable'];
const tokenModifiers = ['declaration', 'documentation'];
const legend = new vscode.SemanticTokensLegend(tokenTypes, tokenModifiers);

export default (context: vscode.ExtensionContext) => {

  const provider: vscode.DocumentSemanticTokensProvider = {
    provideDocumentSemanticTokens(
      document: vscode.TextDocument
    ): vscode.ProviderResult<vscode.SemanticTokens> {
      const tokensBuilder = new vscode.SemanticTokensBuilder(legend);

      const varibleReg = /\((\w+)\)/g
      const text: string = document.getText() ?? ''
      const allMatch = text.matchAll(varibleReg)

      const varibles = [...allMatch].map(v => {
        return v?.[1]
      }).filter(Boolean)

      // const varibleRefReg = /\b\b/
      for (let lineIndex = 0; lineIndex < document.lineCount; lineIndex++) {
        const text = document.lineAt(lineIndex)?.text;
        const reg = new RegExp(`\\s+(${varibles.join('|')})\\b`)

        const match = text?.match(reg)


        if (match) {
          const [, varible] = match ?? []
          const index = match?.index ?? 0

          tokensBuilder.push(
            new vscode.Range(new vscode.Position(lineIndex, index), new vscode.Position(lineIndex, index + varible.length + 1)),
            'variable',
          );
        }

      }

      return tokensBuilder.build();
    }
  };


  const registerDocumentSemanticTokensProvider = vscode.languages.registerDocumentSemanticTokensProvider("yaml-injection", provider, legend);


  context.subscriptions.push(registerDocumentSemanticTokensProvider);

}