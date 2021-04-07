import ts from 'typescript'
import fs from 'fs'
import path from 'path'


const walkNode = (node: ts.Node) => {

  console.log('node.kind: ', ts.SyntaxKind[node.kind])
  switch (node.kind) {
    case ts.SyntaxKind.ForStatement:
    case ts.SyntaxKind.ForInStatement:
    case ts.SyntaxKind.WhileStatement:
    case ts.SyntaxKind.DoStatement:

      break;
  }

  ts.forEachChild(node, walkNode);
}

export const jsonToYaml = () => {

  const fileName = path.join(process.cwd(), 'ts-source/ip.ts')

  console.log('fileName', fileName)
  const sourceFile = ts.createSourceFile(
    fileName,
    fs.readFileSync(fileName).toString(),
    ts.ScriptTarget.ES2015,
    /*setParentNodes */ true
  );

  walkNode(sourceFile);

}

jsonToYaml()