

export const valToString = varObj => Object.keys(varObj)[0]

const isYamlNode = node => 'name' in node && 'parent' in node && 'children' in node
export {
  isYamlNode
}