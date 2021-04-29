
import fs from 'fs'
import path from 'path'
import yaml from 'js-yaml'
import _ from 'lodash'
import { CachedInputFileSystem, ResolverFactory } from 'enhanced-resolve'
import { jsonToAst } from './ast'
import { print } from './print'
import { Logger } from './tsToyaml/logger'

const logger = Logger.logger()
const transform = (json: Object, transformKey?: string) => {


  const _json = transformKey ? _.find(json, (value: any, key: string) => key === transformKey) : json

  if (!_json) {
    logger.log(`[transform]: yaml is not valid `)
    return
  }
  const transformAst = jsonToAst(_json)

  const str = print(transformAst)
  const fun = new Function(str)
  return fun()
}

const dumpYaml = (yamlFilePath: string, yamlTag: string) => {
  // const path 
  // ts.resolveModuleName()

  const myResolver = ResolverFactory.createResolver({
    alias: {
      '@test': path.resolve(process.cwd(), 'test'),
      '@': path.resolve(process.cwd(), 'src'),
    },
    roots: [process.cwd()],
    fileSystem: new CachedInputFileSystem(fs, 4000),
    extensions: [".yaml",]
  });

  // resolve a file with the new resolver
  const context = {};
  const resolveContext = {};
  const lookupStartPath = process.cwd();
  const request = yamlFilePath;
  myResolver.resolve({}, lookupStartPath, request, resolveContext, (
    err /*Error*/,
    filepath /*string*/
  ) => {
    // Do something with the path
    if (err || filepath === false) {
      logger.log(`[dumpYaml]: resolve file failed = ${err} , path = ${yamlFilePath}`)
      return
    }

    const fc = fs.readFileSync(filepath, { encoding: "utf-8" })


    const json = yaml.load(fc)

    return transform(json, yamlTag)
  });
}
export {
  transform,
  dumpYaml
}