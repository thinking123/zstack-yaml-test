
import { jsonToAst } from './ast'
import { print } from './print'


const transform = (json: Object, transformKey: string) => {

  // const transformJson = (json as any)?.[transformKey]
  const ast = jsonToAst(json)

  const transformAst = ast?.find(({ name }) => name === transformKey)
  const str = print(transformAst)
  const fun = new Function(str)

  return fun
}

const dump = (yamlFilePath: string, yamlTag: string) => {
}
export {
  transform,
  dump
}