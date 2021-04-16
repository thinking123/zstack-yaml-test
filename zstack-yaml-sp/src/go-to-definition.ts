
import * as vscode from 'vscode';
import { splitTextToRegion, varibleRefReg } from './utils'

class GoDefinitionProvider implements vscode.DefinitionProvider {
  public provideDefinition(
    document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken) {

    // let definitionPosition: vscode.Position | undefined = undefined
    let location: vscode.Location | undefined = undefined
    const text = document.lineAt(position)?.text
    const match = text?.match(varibleRefReg) ?? []

    if (match) {
      const [, varRef1, varRef2] = match
      const varRef = varRef1 ?? varRef2
      const regions = splitTextToRegion(document)
      regions.forEach(({ varibles }) => {
        return varibles?.forEach(({ range, name }) => {
          if (name === varRef) {
            location = new vscode.Location(document.uri, range)
          }
        })
      })
    }

    return location
  }
}


export default (context: vscode.ExtensionContext) => {
  const goDefinitionProvider = vscode.languages.registerDefinitionProvider("yaml-injection", new GoDefinitionProvider())


  context.subscriptions.push(goDefinitionProvider);

}