import { YamlNode, YamlNodeType } from "../types";
import _ from 'lodash'
import { isYamlNode } from "./utils";

const yamlNodeToYamlFile = (root: YamlNode, destFile: string) => {


}

const yamlNodeToJSON = (root: YamlNode, destFile?: string) => {

  const parserParams = (params: object | any[]): object | any[] | null | undefined => {

    if (params === null || params === undefined) return params

    let isArray = Array.isArray(params)

    const paramsValue = isArray ? [] : {}

    _.forEach(params, (value, key) => {
      let paramValue
      if (value && typeof value === 'object' && isYamlNode(value)) {
        const node = value as YamlNode
        const { varibleName, metaData, type, name } = node
        switch (type) {
          case YamlNodeType.Binary:
            {
              paramValue = name
            }
            break
          case YamlNodeType.VaribleRef:
            {
              paramValue = `${varibleName}.${metaData[metaData.length - 1]}`
            }
            break
          default:
            paramValue = `${name}`
            break
        }
      } else {
        if (typeof value === 'object' || Array.isArray(value)) {
          paramValue = parserParams(value)
        } else {
          paramValue = value
        }
      }
      if (isArray) {
        (paramsValue as any[]).push(paramValue)
      } else {
        paramsValue[key] = paramValue
      }
    })

    return _.isEmpty(paramsValue) ? null : paramsValue
  }
  const parser = (node: YamlNode) => {
    switch (node.type) {
      case YamlNodeType.Action:
        {
          const { name, varibleName, params, } = node

          const key = varibleName ? `${name}(${varibleName})` : name
          let value
          const newParams = parserParams(params)
          if (newParams) {
            value = newParams
          } else {
            console.error(' no children and params in yaml node ')
          }
          if (value) {
            return {
              [key]: value
            }
          } else {
            return key
          }
        }
      case YamlNodeType.Resource:
        {
          const { name, varibleName, params, children } = node

          const key = varibleName ? `${name}(${varibleName})` : name
          let value
          const childrenValues = []
          for (let i = 0; i < children.length; i++) {
            const node = children[i]

            const childrenValue = parser(node)
            childrenValues.push(childrenValue)
          }

          const newParams = parserParams(params)


          if (childrenValues.length > 0) {
            value = [
              ...childrenValues,
            ]

            if (newParams) {
              value.push({
                params: newParams

              })
            }
          } else if (newParams) {
            value = newParams
          } else {
            console.log(' no children and params in yaml node ')
          }
          if (value) {
            return {
              [key]: value
            }
          } else {
            return key
          }
        }
    }

  }

  const childrenValues = []
  for (let i = 0; i < root.children.length; i++) {
    const node = root.children[i]

    const childrenValue = parser(node)
    childrenValues.push(childrenValue)
  }

  const rootKey = root.name

  const rootValue = {
    [rootKey]: childrenValues
  }
  return rootValue
}

export {
  yamlNodeToYamlFile,
  yamlNodeToJSON
}