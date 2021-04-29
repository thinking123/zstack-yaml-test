import _ from "lodash"
import { YamlNode, YamlNodeType } from "../types";
import { walkAst } from "../ast";
import { setAllYamlNodeVaribleName } from "../utils";


const prettier = (root: YamlNode) => {

  const resources: YamlNode[] = []
  walkAst(root, {
    [YamlNodeType.Resource]: (node: YamlNode) => {
      resources.push(node)
    },
  })


  setAllYamlNodeVaribleName(resources)


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

