import { TypescriptParser } from './walk-ast'
import jsYaml from 'js-yaml'
import json2yaml from 'json2yaml'
import fs from 'fs'
import { yamlNodeToJSON } from './print'



const transform = () => {

  const root = new TypescriptParser().parser()

  const json = yamlNodeToJSON(root)

  const yaml = jsYaml.dump(json)


  // fs.openSync('./jsonToyaml.yaml' , "")
  fs.writeFileSync('./jsonToyaml.yaml', yaml, {
    flag: "w+",
    encoding: 'utf8'
  })
}

transform()