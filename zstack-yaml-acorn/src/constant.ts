const ResourceReg = /^([A-Z]\w+)(?:\((\w+)\))?/
const ActionReg = /^(Attach\w+)|(\w+)\(action\)$/
const RefVaribleReg = /(\w+)(?=\.)/
const MN_ENV_ROOT = 'mnEnv'
const TREE_ROOT = 'treeRoot'


export {
  ResourceReg,
  ActionReg,
  MN_ENV_ROOT,
  TREE_ROOT,
  RefVaribleReg
}