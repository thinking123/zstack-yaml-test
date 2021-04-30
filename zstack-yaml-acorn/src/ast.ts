import _ from 'lodash'
import { ActionReg, MN_ENV_ROOT, ResourceReg, TREE_ROOT } from "./constant"
import { Logger } from "./tsToyaml/logger"
import { LogInfo, LogType, WalkAstOptions, YamlNode, YamlNodeType, DumpConfig } from "./types"
import { isAction, isResource } from "./utils"




const logger = Logger.logger()

const jsonToAst1 = (json: Object): YamlNode[] => {

  const roots: YamlNode[] = []
  const errorList: LogInfo[] = []
  const parse = (startObj?: Object | Object[], parent?: YamlNode) => {

    if (!startObj) return

    const keys = Object.keys(startObj)
    const isArray = Array.isArray(startObj)
    const length = isArray ? (startObj as Object[]).length : (Object.keys(startObj)).length

    for (let i = 0; i < length; i++) {
      /**
         arr:
           - arr1
           - arr2
           - arr3: str1
           - arr4: 
              obj: 12
         obj:
           obj1:v1
           obj2:v2
         str: "122"
         nullStr: null
         constant
       * 
       */

      // const index = isArray ? i : keys[i]

      // const val = isArray ? (startObj as Object[])[i] : 
      // const key = isArray ? (startObj as object[])[i] : keys[i]

      let key = ''
      let val: any = null

      if (isArray) {
        const arrVal = (startObj as Object[])[i]

        key = typeof arrVal === 'string' ? arrVal : Object.keys(arrVal)[0]
        val = typeof arrVal === 'string' ? null : Object.values(arrVal)[0]
      } else {
        //Object
        key = keys[i]
        val = (startObj as any)[key]
      }


      const isRoot = !parent
      if (isRoot) {
        const root: YamlNode = {
          type: YamlNodeType.Root,
          children: [],
          metaData: [],
          name: key,
          parent: null
        }

        roots.push(root)

        if (typeof val === 'string') {
          //must resource
          const resourceMatch = val?.match(ResourceReg) ?? []

          if (resourceMatch?.length > 0) {
            const [, resource, varibleName] = resourceMatch
            const resourceNode: YamlNode = {
              type: YamlNodeType.Resource,
              children: [],
              metaData: [],
              name: resource,
              varibleName,
              parent: root
            }

            root.children.push(resourceNode)
          } else {
            errorList.push({
              type: LogType.Error,
              message: `is not resource in Root val : ${val}`
            })
          }

          continue
        }

        if (!val) {

          errorList.push({
            type: LogType.Warning,
            message: `Root val is null: `
          })

          continue
        }

        parse(val, root)
        continue
      }

      const actionMatch = key?.match(ActionReg) ?? []

      if (actionMatch?.length > 0) {
        const [, action1, action2] = actionMatch
        const action = action1 ?? action2
        const actionNode: YamlNode = {
          type: YamlNodeType.Action,
          children: [],
          metaData: [],
          name: action,
          parent
        }
        parent.children.push(actionNode)


        if (typeof val === 'string') {
          actionNode.metaData.push(val)

          errorList.push({
            type: LogType.Warning,
            message: `Root val is string: ${val} `
          })
          continue
        }

        if (!val) {
          continue
        }

        parse(val, actionNode)
        continue

      }

      const resourceMatch = key?.match(ResourceReg) ?? []

      if (resourceMatch?.length > 1) {
        const [, resource, varibleName] = resourceMatch
        const resourceNode: YamlNode = {
          type: YamlNodeType.Resource,
          children: [],
          metaData: [],
          name: resource,
          varibleName,
          parent
        }
        parent.children.push(resourceNode)

        if (typeof val === 'string') {
          resourceNode.metaData.push(val)

          errorList.push({
            type: LogType.Warning,
            message: `Root val is string: ${val} `
          })
          continue
        }

        if (!val) {
          continue
        }

        parse(val, resourceNode)
        continue

      }



      //params

      if (typeof val !== 'string' && typeof val !== 'boolean' && typeof val !== 'number') {

        errorList.push({
          type: LogType.Warning,
          message: `params val is not string:  ${JSON.stringify(val)} `,
        })
      }
      if (!parent.params) parent.params = []
      parent.params.push(
        {
          [key]: val
        }
      )
      continue
    }
  }

  parse(json)

  if (errorList.length > 0) {
    errorList.forEach(({ type, message }) => {
      let fun = console.log
      switch (type) {
        case LogType.Error:
          fun = console.error
          break;
        case LogType.Warning:
          fun = console.warn
          break;
      }

      const msg = `[${LogType[type]}] : ${message}`
      fun(msg)
    })
  } else {
    console.log('no error')
  }
  return roots
}

const jsonToAst = (json: Object, config?: DumpConfig): YamlNode => {

  const yamlStack: YamlNode[] = []
  let root: YamlNode
  let yamlNodeMap = new Map<string, YamlNode>()
  const getParentYamlNode = () => yamlStack[yamlStack.length - 1]

  const haveChildrenNode = (value: any) => {
    let res = false
    _.forEach(value, (v, k) => {
      if (res) return
      if (typeof k === 'string') {
        // value === object
        if (isResource(k) || isAction(k)) {
          res = true
        }
      } else {
        // value === array
        if (typeof v === 'string') {
          if (isResource(k) || isAction(k)) {
            res = true
          }
        } else {
          // v === object
          const key = Object.keys(v)?.[0]
          if (isResource(key) || isAction(key)) {
            res = true
          }
        }
      }
    })

    return res
  }
  const parse = (json: any) => {
    _.forEach(json, (value: any, key: string | number) => {
      if (key === MN_ENV_ROOT) {
        root = {
          type: YamlNodeType.Root,
          children: [],
          name: "Env",
          varibleName: MN_ENV_ROOT
        }
        yamlStack.push(root)
        parse(value)
        yamlStack.pop()
      } else if (key === TREE_ROOT) {
        yamlStack.push(root)
        parseTreeRoot(value)
        yamlStack.pop()
      } else if (isAction(key)) {

        const [, action1, action2,] = (String(key)).match(ActionReg) ?? []
        const node: YamlNode = {
          type: YamlNodeType.Action,
          children: [],
          name: action1 ?? action2,
          params: value
        }

        const parent = getParentYamlNode()
        parent.children.push(node)
      } else if (isResource(key) || isResource(value)) {
        const _key = isResource(key) ? key : value
        const [, name, varibleName,] = (String(_key)).match(ResourceReg) ?? []
        const node: YamlNode = {
          type: YamlNodeType.Resource,
          children: [],
          name: name,
          varibleName
        }

        if (varibleName) {
          yamlNodeMap.set(varibleName, node)
        }

        if (haveChildrenNode(value)) {
          yamlStack.push(node)
          parse(value)
          yamlStack.pop()
        } else if (!isResource(value)) {
          node.params = value
        }

      } else if (key === 'params') {
        const parent = getParentYamlNode()
        parent.params = value
      } else {
        if (typeof value !== 'object' || !value) {
          logger.log(`[jsonToAst-parse]: value !== 'object' is ${value}`)
          return
        }
        parse(value)
      }
    })

  }

  const parseTreeRoot = (json: any) => {
    _.forEach(json, (value: any, key: number | string) => {
      if (typeof key === 'string') {
        const varibleName = key
        const node = yamlNodeMap.get(varibleName)
        const parent = getParentYamlNode()
        parent.children.push(node)

        yamlStack.push(node)
        parseTreeRoot(value)
        yamlStack.pop()
      } else if (typeof value === 'string') {
        const varibleName = value
        const node = yamlNodeMap.get(varibleName)
        const parent = getParentYamlNode()
        parent.children.push(node)
      } else {
        if (typeof value !== 'object' || !value) {
          logger.log(`[jsonToAst-parseTreeRoot]: value !== 'object' is ${value}`)
          return
        }
        parseTreeRoot(value)
      }
    })
  }
  parse(json)

  return root
}



const walkAst = (astNode: YamlNode, options?: Partial<WalkAstOptions>) => {
  const base = {
    [YamlNodeType.Root]: (node: YamlNode, walkFun: (node: YamlNode) => void) => {
      const { children } = node
      children.forEach((ch) => {
        walkFun(ch)
      })
    },
    [YamlNodeType.Resource]: (node: YamlNode, walkFun: (node: YamlNode) => void) => {
      const { children } = node
      children.forEach((ch) => {
        walkFun(ch)
      })
    },
    [YamlNodeType.Action]: (node: YamlNode, walkFun: (node: YamlNode) => void) => {
      return
    },
    [YamlNodeType.Varible]: (node: YamlNode, walkFun: (node: YamlNode) => void) => {
      return
    },
    [YamlNodeType.UnKnown]: (node: YamlNode, walkFun: (node: YamlNode) => void) => {
      return
    },
  }

  const walk = (node: YamlNode) => {
    const { type } = node
    base[type](node, walk)
    const found = options[type]
    if (found) {
      found(node)
    }
  }

  walk(astNode)
}


export {
  jsonToAst,
  walkAst
}
