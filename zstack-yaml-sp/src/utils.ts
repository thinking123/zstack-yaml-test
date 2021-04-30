import * as vscode from 'vscode';
import { RegionText, Varible, DuplicatVaribleName } from './types';


export const varibleReg = /\((\w+)\)/g
export const startRegionReg = /^\w+/
export const varibleDefinitionReg = /\((\w+)\)/
export const commentReg = /#.*/
export const emptyVaribleReg = /\(\)/
// - var 
// var.p
// export const varibleRefReg = /(?<=-\s+)([a-z]\w+)\b|(?<=\s+)([a-z]\w+)(?=\.)/
export const varibleRefReg = /(?<=\s+)([a-z]\w+)(?=\.)|(?<=-\s+)([a-z]\w+)(?:\s|$)|(?<=-\s+)([a-z]\w+):$/
export const varibleDigitReg = /(\d+)$/
export const resourceReg = /Zone|InstanceOffering|DiskOffering|VRouterOffering|VpcVRouter|ImageStoreBackUpStorage|Image|CephPrimaryStorage|CephPrimaryStoragePoolAndMon|CephBackupStorage|SharedBlockGroupPrimaryStorage|SharedMountPointPrimaryStorage|NfsPrimaryStorage|PrimaryStorage|L2NoVlanNetwork|L2VlanNetwork|L2VxlanNetworkPool|L3Network|IpRange|AutoScalingGroup|Cluster|Host|Vm|Volume|LocalStorage|CdRom|Account|Project|ProjectUser|IAM2VirtualID|IAM2Organization|IAM2ProjectTemplate|IAM2VirtualIDGroup|IAM2ProjectRole|Vip|IPsecConnection|Qos|Eip|SharedResource|AffinityGroup|IpBlackWhiteList|AccesskeyManagement|Tag|SecurityGroup|SchedulerJob|SchedulerTrigger|OSPF|IAM2Project|Alarm|SubscribeEvent|PriceTable|VRouterRouteTable|NetflowMeter|StackTemplate|SNSTextTemplate|AliyunSmsSNSTextTemplate|LogServer|ProcessManagement|VpcHaGroup|VolumeSnapshot|EmailServer|PreConfigTemplate|VolumeSnapshotGroup|MulticastRouter/
export const ACTION = 'action'

export const tokenTypes = ['class', 'interface', 'enum', 'function', 'variable'];
export const tokenModifiers = ['declaration', 'documentation'];

export const VARIBLE_DUPLICATE_ID = "zstack-yaml-error-1"
export const VARIBLE_NOT_DEFINED_ID = "zstack-yaml-error-2"
export const VARIBLE_EMPTY_DEFINED_ID = "zstack-yaml-error-3"
export const DIAGNOSTIC_COLLECTION = "DIAGNOSTIC_COLLECTION"



function fixDuplicatVaribleName(duplicatVarible: string, varibles: Varible[] | undefined): DuplicatVaribleName
function fixDuplicatVaribleName(duplicatVarible: Varible, varibles: Varible[] | undefined): DuplicatVaribleName
function fixDuplicatVaribleName(duplicatVarible: Varible | string, varibles: Varible[] | undefined): DuplicatVaribleName {
  const name = typeof duplicatVarible === 'string' ? duplicatVarible : duplicatVarible.name
  const [, defIndex] = name?.match(varibleDigitReg) ?? []
  let baseName = name
  let index = 1
  if (defIndex) {
    index += Number(defIndex)
    baseName = baseName.substr(0, baseName.length - defIndex.length)
  }
  const names = varibles?.map(({ name }) => name)
  let newName = baseName + (index++)
  while (names?.includes(newName)) {
    newName = baseName + (index++)
  }

  return { newName, baseName, oldName: name }
}

/**

2: b1:
  -xx
4: b2:
  -xx
@return [{startIndex: 2, text: "b1:\n  -xx"},]
 */
const splitTextToRegion = (document: vscode.TextDocument): RegionText[] => {
  const regions: RegionText[] = []

  try {


    let buffer: string = ''
    let text: string = ''
    let startPosition = new vscode.Position(0, 0)
    let endPosition = new vscode.Position(0, 0)
    let lineIndex = 0
    let varibles = []
    let varibleRefs = []

    for (; lineIndex < document.lineCount; lineIndex++) {
      text = document.lineAt(lineIndex)?.text;

      const comment = text?.match(commentReg)
      if (comment) {
        text = text.substr(0, comment.index)
        if (!text) {
          continue
        }
      }
      const start = text?.match(startRegionReg)

      if (start) {
        if (buffer) {
          const range = new vscode.Range(
            startPosition,
            endPosition
          )
          regions.push({
            range,
            text: buffer,
            varibles,
            varibleRefs
          })
        }
        startPosition = new vscode.Position(lineIndex, 0)
        buffer = text
        varibles = []
        varibleRefs = []
      } else {
        buffer += text
        endPosition = new vscode.Position(lineIndex, text.length ? (text.length - 1) : 0)
      }

      const varibleMatch = text.match(varibleDefinitionReg)
      if (varibleMatch && varibleMatch?.[1] && varibleMatch?.[1] !== ACTION) {

        const name = varibleMatch[1]
        varibles.push({
          name,
          range: new vscode.Range(
            new vscode.Position(lineIndex,
              varibleMatch.index!),
            new vscode.Position(lineIndex,
              name.length + varibleMatch.index! + 1)
          )
        })
      }

      const varibleRefMatch = text.match(varibleRefReg)
      let varibleRef: string
      if (varibleRefMatch && (varibleRef = varibleRefMatch?.[1] ?? varibleRefMatch?.[2])) {
        varibleRefs.push({
          name: varibleRef,
          range: new vscode.Range(
            new vscode.Position(lineIndex,
              varibleRefMatch.index!),
            new vscode.Position(lineIndex,
              varibleRef.length + varibleRefMatch.index! + 1)
          )
        })
      }
    }
    const range = new vscode.Range(
      startPosition,
      endPosition
    )

    regions.push({
      range,
      text: buffer,
      varibles,
      varibleRefs
    })

  } catch (err) {
    console.error(`[splitTextToRegion] : ${err}`)
  } finally {
    return regions
  }
}


// const getVaribles = (document: vscode.TextDocument) => {
//   const regions = splitTextToRegion(document)


// }
const getChars = (upperCase?: boolean) => {

  if (upperCase) {
    return (new Array(26)).fill(0).map((_, index) => {
      return String.fromCharCode(65 + index)
    })
  }
  return (new Array(26)).fill(0).map((_, index) => {
    return String.fromCharCode(97 + index)
  })
}



export {
  fixDuplicatVaribleName,
  getChars,
  splitTextToRegion
}