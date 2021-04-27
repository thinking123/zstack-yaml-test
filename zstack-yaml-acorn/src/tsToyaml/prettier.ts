import _ from "lodash"
import { YamlNode, YamlNodeType } from "../types";
import { walkAst } from "../ast";


const prettier = (root: YamlNode) => {

  const resources: YamlNode[] = []
  walkAst(root, {
    [YamlNodeType.Resource]: (node: YamlNode) => {
      resources.push(node)
    },
  })

  const allVaribleNames = resources?.filter(({ varibleName }) => varibleName)?.map(({ varibleName }) => varibleName)

  const groupByResourceName = _.groupBy(resources, 'name')


  _.forEach(groupByResourceName, (nodes: YamlNode[], resourceName: string) => {
    const namedList = nodes?.filter(({ varibleName }) => varibleName) ?? []
    const names = namedList?.map(({ varibleName }) => varibleName) ?? []

    const notNamedList = nodes?.filter(({ varibleName }) => !varibleName)
    let index = 1
    notNamedList.forEach((node: YamlNode) => {
      const baseName = resourceName[0].toLowerCase() + resourceName.substr(1)
      let name = `${baseName}${index}`
      while (allVaribleNames?.includes(name)) {
        index++
        name = `${baseName}${index}`
      }
      node.varibleName = name
      allVaribleNames.push(name)
    })
  })

  const newRoot = _.clone(root)
  newRoot.children = []

  const prettierResource = (parent: YamlNode) => {
    for (let i = 0; i < parent.children.length; i++) {
      const node = parent.children[i]

      if (node.type === YamlNodeType.Resource) {
        const resources = node.children?.filter(n => n.type === YamlNodeType.Resource)
        if (resources?.length > 0) {
          prettierResource(node)
        }

        const cloneNode = _.clone(node)
        cloneNode.children = node.children.filter(({ type }) => type !== YamlNodeType.Resource)
        newRoot.children.push(cloneNode)
      }
    }
  }


  prettierResource(root)
  sort(newRoot)

  return newRoot
}


const buildTree = (parent: YamlNode) => {
  const children = []
  for (let i = 0; i < parent.children.length; i++) {
    const node = parent.children[i]

    if (node.type === YamlNodeType.Resource) {
      const resources = node.children?.filter(n => n.type === YamlNodeType.Resource)
      if (resources?.length > 0) {
        const res = buildTree(node)

        children.push({
          [node.varibleName]: res
        })
      } else {
        children.push(node.varibleName)

      }

    }
  }

  return children
}

/**
 *  sort by resource name
 */
const sort = (parent: YamlNode) => {

  let resources = parent.children?.filter(n => n.type === YamlNodeType.Resource) ?? []

  if (resources.length === 0) return

  resources.forEach((children) => {
    sort(children)
  })

  resources = _.sortBy(resources, ['name', 'varibleName'])
  parent.children = parent.children?.filter(n => n.type !== YamlNodeType.Resource) ?? []

  parent.children = [...resources, ...parent.children]

}

export {
  buildTree,
  prettier,
  sort
}

