import { TypescriptParser } from './walk-ast'
import jsYaml from 'js-yaml'
import json2yaml from 'json2yaml'
import fs from 'fs'
import { yamlNodeToJSON } from './print'



const transform = () => {

  const root = new TypescriptParser().parser()

  const json = yamlNodeToJSON(root)

  let yaml = jsYaml.dump(json, {
    replacer(key, value) {
      if (value === undefined) return "undefined"

      return value
    }
  })

  const reg = /\$/g

  yaml = String(yaml).replace(reg, () => "\"")

  // fs.openSync('./jsonToyaml.yaml' , "")
  fs.writeFileSync('./jsonToyaml.yaml', yaml, {
    flag: "w+",
    encoding: 'utf8'
  })
}

transform()