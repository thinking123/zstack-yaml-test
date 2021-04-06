// import { ts } from './graphql';
import * as ts from 'typescript';
import * as path from 'path';
import { readFileSync } from "fs";

export const resources = [
  "Zone",
  "InstanceOffering",
  "DiskOffering",
  "VRouterOffering",
  "VpcVRouter",
  "ImageStoreBackUpStorage",
  "Image",
  "CephPrimaryStorage",
  "CephPrimaryStoragePoolAndMon",
  "CephBackupStorage",
  "SharedBlockGroupPrimaryStorage",
  "SharedMountPointPrimaryStorage",
  "NfsPrimaryStorage",
  "PrimaryStorage",
  "L2NoVlanNetwork",
  "L2VlanNetwork",
  "L2VxlanNetworkPool",
  "L3Network",
  "IpRange",
  "AutoScalingGroup",
  "Cluster",
  "Host",
  "Vm",
  "Volume",
  "LocalStorage",
  "CdRom",
  "Account",
  "Project",
  "ProjectUser",
  "IAM2VirtualID",
  "IAM2Organization",
  "IAM2ProjectTemplate",
  "IAM2VirtualIDGroup",
  "IAM2ProjectRole",
  "Vip",
  "IPsecConnection",
  "Qos",
  "Eip",
  "SharedResource",
  "AffinityGroup",
  "IpBlackWhiteList",
  "AccesskeyManagement",
  "Tag",
  "SecurityGroup",
  "SchedulerJob",
  "SchedulerTrigger",
  "OSPF",
  "IAM2Project",
  "Alarm",
  "SubscribeEvent",
  "PriceTable",
  "VRouterRouteTable",
  "NetflowMeter",
  "StackTemplate",
  "SNSTextTemplate",
  "AliyunSmsSNSTextTemplate",
  "LogServer",
  "ProcessManagement",
  "VpcHaGroup",
  "VolumeSnapshot",
  "EmailServer",
  "PreConfigTemplate",
  "VolumeSnapshotGroup",
  "MulticastRouter",
];

const classNames: { [key: string]: string[] } = {};
const walkAstNode = (node: ts.Node) => {

  // console.log('walkAstNode', node.kind);
  switch (node.kind) {

    case ts.SyntaxKind.InterfaceDeclaration:
      // eslint-disable-next-line no-case-declarations
      const n = node as ts.InterfaceDeclaration;
      // classNames.push(node.getText());
      // classNames = 
      // eslint-disable-next-line no-case-declarations
      const className = n?.name?.escapedText.toString();
      if (resources.includes(className)) {
        const propertys = n?.members.map((_n: any) => {
          return _n?.name?.escapedText;
        }) ?? [];

        classNames[className] = propertys;
      }

      break;
    // case ts.SyntaxKind.InterfaceKeyword:
    //   classNames.push(node.getText());
    //   break;

  }
  ts.forEachChild(node, walkAstNode);
};

const walkAst = (sourceFile: ts.SourceFile) => {
  walkAstNode(sourceFile);
};

export const getClassInfo = () => {

  const fileName = path.join(process.cwd(), 'src/zstack/graphql.ts');

  const sourceFile = ts.createSourceFile(
    fileName,
    readFileSync(fileName).toString(),
    ts.ScriptTarget.ES2015,
    /*setParentNodes */ true
  );

  walkAst(sourceFile);

  console.log('classNames', classNames);

  return classNames;
};

getClassInfo();

// const p = '12'

// interface Ps {
//   p: string
// }
// const ps: Ps = {
//   p
// }

// console.log('p', p)