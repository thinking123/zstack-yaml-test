

export const valToString = varObj => Object.keys(varObj)[0]

const isYamlNode = node => node && 'name' in node && 'children' in node
export {
  isYamlNode
}