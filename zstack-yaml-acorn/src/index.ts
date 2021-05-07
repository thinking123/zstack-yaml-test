
import fs from 'fs'
import path from 'path'
// import prettier from 'prettier'
import yaml from 'js-yaml'
import _ from 'lodash'
import { CachedInputFileSystem, ResolverFactory } from 'enhanced-resolve'
import { jsonToAst } from './ast'
import { print } from './print'
import { Logger } from './tsToyaml/logger'
import { DumpConfig } from './types'

const logger = Logger.logger()


const transform = (json: Object, transformKey?: string, config?: DumpConfig) => {


  const _json = transformKey ? _.find(json, (value: any, key: string) => key === transformKey) : json

  if (!_json) {
    logger.log(`[transform]: yaml is not valid `)
    return
  }
  const transformAst = jsonToAst(_json, config)

  const str = print(transformAst, config)

  // const output = prettier.format(str, {
  //   semi: false
  // })

  const fun = new Function('allResources', 'mnEnv', str)
  return fun(config.allResources, config.mnEnv)
}

const dumpYaml = async (yamlFilePath: string, yamlTag: string, dumpConfig?: DumpConfig) => {

  const myResolver = ResolverFactory.createResolver({
    alias: {
      '@test': path.resolve(process.cwd(), 'test'),
      // '@': path.resolve(process.cwd(), 'src'),
    },
    roots: [process.cwd()],
    fileSystem: new CachedInputFileSystem(fs, 4000),
    extensions: [".yaml",]
  });


  const resolveContext = {};
  const lookupStartPath = process.cwd();
  const request = yamlFilePath;

  return new Promise((res, rej) => {
    myResolver.resolve({}, lookupStartPath, request, resolveContext, (
      err,
      filepath
    ) => {
      if (err || filepath === false) {
        logger.log(`[dumpYaml]: resolve file failed = ${err} , path = ${yamlFilePath}`)
        rej(err)
        return
      }

      const fc = fs.readFileSync(filepath, { encoding: "utf-8" })


      const json = yaml.load(fc)

      const transformRes = transform(json, yamlTag, dumpConfig)

      res(transformRes)
    });
  })

}
export {
  dumpYaml
}