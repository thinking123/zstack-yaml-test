
import * as vscode from 'vscode';
import { splitTextToRegion, varibleRefReg } from './utils'

class GoDefinitionProvider implements vscode.DefinitionProvider {
  public provideDefinition(
    document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken) {

    let location: vscode.Location | undefined = undefined
    const text = document.lineAt(position)?.text
    const match = text?.match(varibleRefReg)

    if (match && match?.length > 0 && match?.index! >= 0) {
      const [, varRef1, varRef2, varRef3] = match
      const varRef = varRef1 ?? varRef2 ?? varRef3
      const varRefRange = new vscode.Range(
        new vscode.Position(position.line, match.index!),
        new vscode.Position(position.line, match.index! + varRef.length)
      )

      if (!varRefRange.contains(position)) {
        return undefined
      }
      const regions = splitTextToRegion(document)
      const { varibles } = regions.find(_region => _region.range.contains(position)) ?? {}

      varibles?.forEach(({ range, name }) => {
        if (name === varRef) {
          location = new vscode.Location(document.uri, range)
        }
      })
    }

    return location
  }
}


export default (context: vscode.ExtensionContext) => {
  const goDefinitionProvider = vscode.languages.registerDefinitionProvider("yaml-injection", new GoDefinitionProvider())


  context.subscriptions.push(goDefinitionProvider);

}