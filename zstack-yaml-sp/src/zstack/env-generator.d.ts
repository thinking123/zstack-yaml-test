interface IEnv<T extends {
  env: object | [];
}> {
  add: (param: IEnvItem) => T;
  getEnv: () => T['env'];
}
interface IEnvChildren {
  name: string;
  param: {
    [x: string]: any;
  };
  children?: IEnvChildren[];
}
interface IEnvItem extends IEnv<IEnvItem> {
  env: IEnvChildren;
  add: (param: IEnvItem) => IEnvItem;
  handle: (name: string, param: object) => IEnvItem;
  getEnv: () => IEnvChildren;
}
export declare class BasicEnvItem implements IEnvItem {
  defaultOpt: {};
  env: IEnvChildren;
  init: (param: any) => void;
  add: (param: IEnvItem) => this;
  handle: (name: string, param: object) => this;
  getUuid: () => string;
  getName: () => string;
  getParam: () => {
    [x: string]: any;
  };
  getEnv: () => IEnvChildren;
}
export declare class Env implements IEnv<Env> {
  env: any[];
  add: (param: IEnvItem) => this;
  getEnv: () => any[];
}
export declare class Zone extends BasicEnvItem {
  constructor(param?: {});
}
export declare class InstanceOffering extends BasicEnvItem {
  defaultOpt: {
    cpuNum: number;
    memorySize: number;
  };
  constructor(param?: {});
}
export declare class DiskOffering extends BasicEnvItem {
  defaultOpt: {
    diskSize: number;
  };
  constructor(param?: {});
}
export declare class VRouterOffering extends BasicEnvItem {
  defaultOpt: {
    cpuNum: number;
    memorySize: number;
  };
  constructor(param?: {
    name?: string;
    managementNetworkUuid: string;
    imageUuid: string;
    publicNetworkUuid?: string;
  });
}
export declare class VpcVRouter extends BasicEnvItem {
  constructor(param?: {});
}
export declare class ImageStoreBackUpStorage extends BasicEnvItem {
  defaultOpt: {
    url: string;
    hostname: string;
    username: string;
    password: string;
  };
  constructor(param?: {});
}
export declare class Image extends BasicEnvItem {
  defaultOpt: {
    url: string;
    format: string;
  };
  constructor(param?: {});
}
export declare class CephPrimaryStorage extends BasicEnvItem {
  defaultOpt: {
    url: string;
    fsid: string;
    mons: {
      username: string;
      password: string;
      ip: string;
      port: string;
    }[];
  };
  constructor(param?: {});
}
export declare class CephPrimaryStoragePoolAndMon extends BasicEnvItem {
  defaultOpt: {
    url: string;
    fsid: string;
    mons: {
      username: string;
      password: string;
      ip: string;
      port: string;
    }[];
  };
  constructor(param?: {});
}
export declare class CephBackupStorage extends BasicEnvItem {
  defaultOpt: {
    url: string;
    fsid: string;
    mons: {
      username: string;
      password: string;
      ip: string;
      port: string;
    }[];
  };
  constructor(param?: {});
}
export declare class SharedBlockGroupPrimaryStorage extends BasicEnvItem {
  defaultOpt: {
    path: string;
    diskUuids: string[];
  };
  constructor(param?: {});
}
export declare class SharedMountPointPrimaryStorage extends BasicEnvItem {
  defaultOpt: {
    url: string;
  };
  constructor(param?: {});
}
export declare class NfsPrimaryStorage extends BasicEnvItem {
  defaultOpt: {
    url: string;
    ip: string;
  };
  constructor(param?: {});
}
export declare class PrimaryStorage extends BasicEnvItem {
  constructor(param?: {});
}
export declare class L2NoVlanNetwork extends BasicEnvItem {
  defaultOpt: {
    physicalInterface: string;
  };
  constructor(param?: {});
}
export declare class L2VlanNetwork extends BasicEnvItem {
  defaultOpt: {
    physicalInterface: string;
    vlan: number;
  };
  constructor(param?: {});
}
export declare class L2VxlanNetworkPool extends BasicEnvItem {
  defaultOpt: {
    endVni: number;
    name: string;
    startVni: number;
    type: string;
  };
  constructor(param?: {});
}
export declare class L3Network extends BasicEnvItem {
  constructor(param?: {});
}
export declare class IpRange extends BasicEnvItem {
  defaultOpt: {
    startIp: string;
    endIp: string;
    netmask: string;
    gateway: string;
  };
  constructor(param?: {
    startIp: string;
    endIp: string;
    netmask: string;
    gateway: string;
  });
}
export declare class AutoScalingGroup extends BasicEnvItem {
  defaultOpt: {
    scalingResourceType: string;
    minResourceSize: number;
    maxResourceSize: number;
    defaultCooldown: number;
    removalPolicy: string;
  };
  constructor(param?: {});
}
export declare class Cluster extends BasicEnvItem {
  defaultOpt: {
    hypervisorType: string;
  };
  constructor(param?: {});
}
export declare class Host extends BasicEnvItem {
  defaultOpt: {
    username: string;
    password: string;
  };
  constructor(param?: {});
}
export declare class Vm extends BasicEnvItem {
  constructor(param?: {});
}
export declare class Volume extends BasicEnvItem {
  constructor(param?: {});
}
export declare class LocalStorage extends BasicEnvItem {
  defaultOpt: {
    url: string;
  };
  constructor(param?: {});
}
export declare class CdRom extends BasicEnvItem {
  constructor(param?: {});
}
export declare class Account extends BasicEnvItem {
  defaultOpt: {
    password: any;
  };
  constructor(param?: {});
}
export declare class Project extends BasicEnvItem {
  constructor(param?: {});
}
export declare class ProjectUser extends BasicEnvItem {
  defaultOpt: {
    password: any;
  };
  constructor(param?: {});
}
export declare class IAM2VirtualID extends BasicEnvItem {
  defaultOpt: {
    name: string;
    password: any;
  };
  constructor(param?: {});
}
export declare class IAM2Organization extends BasicEnvItem {
  defaultOpt: {
    description: string;
  };
  constructor(param?: {});
}
export declare class IAM2ProjectTemplate extends BasicEnvItem {
  defaultOpt: {
    name: string;
    description: string;
  };
  constructor(param?: {});
}
export declare class IAM2VirtualIDGroup extends BasicEnvItem {
  defaultOpt: {
    name: string;
    description: string;
  };
  constructor(param?: {});
}
export declare class IAM2ProjectRole extends BasicEnvItem {
  defaultOpt: {
    name: string;
    description: string;
  };
  constructor(param?: {});
}
export declare class Vip extends BasicEnvItem {
  constructor(param?: {});
}
export declare class IPsecConnection extends BasicEnvItem {
  defaultOpt: {
    peerAddress: string;
    authKey: string;
  };
  constructor(param?: {});
}
export declare class Qos extends BasicEnvItem {
  constructor(param?: {});
}
export declare class Eip extends BasicEnvItem {
  constructor(param?: {});
}
export declare class SharedResource extends BasicEnvItem {
  defaultOpt: {
    resourceUuids: any[];
    accountUuids: any[];
    projectUuids: any[];
  };
  constructor(param?: {});
}
export declare class AffinityGroup extends BasicEnvItem {
  defaultOpt: {
    name: string;
    description: string;
    type: string;
  };
  constructor(params?: {});
}
export declare class IpBlackWhiteList extends BasicEnvItem {
  defaultOpt: {
    name: string;
    rule: string;
    controlStrategy: string;
  };
  constructor(params?: {});
}
export declare class AccesskeyManagement extends BasicEnvItem {
  defaultOpt: {
    key: string;
    name: string;
    secret: string;
    type: string;
  };
  constructor(params?: {});
}
export declare class Tag extends BasicEnvItem {
  constructor(param?: {});
}
export declare class SecurityGroup extends BasicEnvItem {
  constructor(param?: {});
}
export declare class SchedulerJob extends BasicEnvItem {
  defaultOpt: {
    name: string;
    description: string;
    targetResourceUuid: string;
    type: string;
    schedulerTriggerUuid: string;
  };
  constructor(params?: {});
}
export declare class SchedulerTrigger extends BasicEnvItem {
  defaultOpt: {
    name: string;
    description: string;
    repeatCount: number;
    schedulerInterval: number;
    startTime: number;
    schedulerType: string;
  };
  constructor(params?: {});
}
export declare class OSPF extends BasicEnvItem {
  constructor(param?: {});
}
export declare class IAM2Project extends BasicEnvItem {
  defaultOpt: {
    name: string;
    description: string;
  };
  constructor(param?: {});
}
export declare class Alarm extends BasicEnvItem {
  defaultOpt: {
    name: string;
    description: string;
    comparisonOperator: string;
    namespace: string;
    metricName: string;
    threshold: number;
    repeatInterval: number;
    enableRecovery: boolean;
    repeatCount: number;
  };
  constructor(param?: {});
}
export declare class SubscribeEvent extends BasicEnvItem {
  defaultOpt: {
    name: string;
    namespace: string;
    eventName: string;
    emergencyLevel: string;
  };
  constructor(param?: {});
}
export declare class PriceTable extends BasicEnvItem {
  defaultOpt: {
    prices: any[];
  };
  constructor(param?: {});
}
export declare class VRouterRouteTable extends BasicEnvItem {
  constructor(param?: {});
}
export declare class NetflowMeter extends BasicEnvItem {
  defaultOpt: {
    type: string;
    port: number;
    version: string;
    expireInterval: number;
    server: string;
  };
  constructor(param: {
    server?: string;
    port?: number;
    version?: string;
    expireInterval?: number;
    name: string;
  });
}
export declare class StackTemplate extends BasicEnvItem {
  defaultOpt: {
    name: string;
    description: string;
    templateContent: string;
    type: string;
  };
  constructor(param: {
    name?: string;
    description?: string;
    templateContent: string;
    type?: string;
  });
}
export declare class SNSTextTemplate extends BasicEnvItem {
  defaultOpt: {
    applicationPlatformType: string;
    type: string;
    template: string;
    recoveryTemplate: string;
  };
  constructor(param: {
    applicationPlatformType: string;
    type?: string;
    template: string;
    recoveryTemplate: string;
  });
}
export declare class AliyunSmsSNSTextTemplate extends BasicEnvItem {
  defaultOpt: {
    sign: string;
    alarmTemplateCode: string;
    eventTemplateCode: string;
    applicationPlatformType: string;
    template: string;
    description: string;
    eventTemplate: string;
    defaultTemplate: boolean;
  };
  constructor(param: {
    sign?: string;
    alarmTemplateCode?: string;
    eventTemplateCode?: string;
    applicationPlatformType?: string;
    template?: string;
    description?: string;
    eventTemplate?: string;
    defaultTemplate?: boolean;
  });
}
export declare class LogServer extends BasicEnvItem {
  defaultOpt: {
    name: string;
    description: string;
    configuration: string;
    type: string;
  };
  constructor(param: {});
}
export declare class ProcessManagement extends BasicEnvItem {
  defaultOpt: {
    description: string;
    flows: any[];
    ticketTypeUuids: any[];
    projectUuid: string;
  };
  constructor(param: {
    description?: string;
    flows: any[];
    ticketTypeUuids?: string[];
    projectUuid: string;
  });
}
export declare class VpcHaGroup extends BasicEnvItem {
  constructor(param: {
    monitorIps: string[];
  });
}
export declare class VolumeSnapshot extends BasicEnvItem {
  defaultOpt: {};
  constructor(param?: {});
}
export declare class EmailServer extends BasicEnvItem {
  defaultOpt: {
    encryptType: string;
  };
  constructor(param?: {});
}
export declare class PreConfigTemplate extends BasicEnvItem {
  defaultOpt: {};
  constructor(param?: {});
}
export declare class VolumeSnapshotGroup extends BasicEnvItem {
  defaultOpt: {};
  constructor(param?: {});
}
export declare class MulticastRouter extends BasicEnvItem {
  constructor(param?: {});
}
export { };
