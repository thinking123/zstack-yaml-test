import {
  Env,
  Zone,
  L2NoVlanNetwork,
  L3Network,
  IpRange,
  LocalStorage,
  Image,
  ImageStoreBackUpStorage,
  Host,
  Cluster,
  DiskOffering,
  CephPrimaryStorage,
  CephBackupStorage,
  SharedBlockGroupPrimaryStorage,
  SharedMountPointPrimaryStorage,
  NfsPrimaryStorage,
  Vip,
  Eip,
  Tag,
  L2VlanNetwork,
  Project,
  ProjectUser,
  Account,
  SharedResource,
  InstanceOffering,
  Vm,
  Volume,
  VRouterOffering,
  VpcVRouter
} from '@test/features/helper/env-generator'


const mnEnv = new Env()

const instanceOffering = new InstanceOffering({ name: 'InstanceOffering-1' })

const diskOffering1 = new DiskOffering({
  name: 'DiskOffering-1',
  diskSize: 1 * 1024 * 1024 * 1024
})
const diskOffering2 = new DiskOffering({
  name: 'DiskOffering-2',
  diskSize: 8 * 1024 * 1024 * 1024
})

const diskOffering3 = new DiskOffering({ name: 'DiskOffering-3' })

const tag1 = new Tag({ name: 'Tag-1' })
const tag2 = new Tag({ name: 'Tag-2' })

const imageStore1 = new ImageStoreBackUpStorage({
  name: 'ImageStore-1',
  hostname: '127.0.4.11'
})
const image1 = new Image({ name: 'Image-1' })
imageStore1.add(image1)

const imageStore2 = new ImageStoreBackUpStorage({
  name: 'ImageStore-2',
  hostname: '127.0.4.12'
})
const image2 = new Image({ name: 'Image-2' })
imageStore2.add(image2)

const cephPrimaryStorage1 = new CephPrimaryStorage({
  name: 'CephPrimaryStorage-1',
  totalCapacity: 11258999068426240,
  availableCapacity: 11258999068426240,
  mons: [
    {
      username: 'root',
      password: 'password',
      port: '22',
      ip: '127.0.3.21'
    }
  ]
})
const cephBackupStorage1 = new CephBackupStorage({
  name: 'CephBackupStorage-1',
  fsid: cephPrimaryStorage1.getParam().fsid,
  mons: [
    {
      username: 'root',
      password: 'password',
      port: '22',
      ip: '127.0.3.11'
    }
  ]
})
const img3 = new Image({ name: 'Image-3' })
cephBackupStorage1.add(img3)

const cephPrimaryStorage2 = new CephPrimaryStorage({
  name: 'CephPrimaryStorage-2',
  totalCapacity: 11258999068426240,
  availableCapacity: 11258999068426240,
  mons: [
    {
      username: 'root',
      password: 'password',
      port: '22',
      ip: '127.0.3.22'
    }
  ]
})
const cephBackupStorage2 = new CephBackupStorage({
  name: 'CephBackupStorage-2',
  fsid: cephPrimaryStorage2.getParam().fsid,
  mons: [
    {
      username: 'root',
      password: 'password',
      port: '22',
      ip: '127.0.3.12'
    }
  ]
})
const img4 = new Image({ name: 'Image-4' })
cephBackupStorage2.add(img4)

// 创建镜像仓库、本地备份服务器、远程备份服务器和主存储
const img5 = new Image()
const localImageStore = new ImageStoreBackUpStorage({
  name: 'LocalImageStore',
  hostname: '127.0.0.21'
})
const remoteImageStore = new ImageStoreBackUpStorage({
  name: 'RemoteImageStore',
  hostname: '127.0.0.22',
  systemTags: ['remotebackup']
})
localImageStore.handle('AttachLocalTag', {})
remoteImageStore.handle('AttachRemoteTag', {})

const zone = new Zone({ name: 'Zone-1' })

// 创建项目和账户
const project = new Project({
  name: 'Project-1',
  attributes: [{ name: '__ProjectRelatedZone__', value: zone.getUuid() }]
})
const project2 = new Project({
  name: 'Project-2',
  attributes: [{ name: '__ProjectRelatedZone__', value: zone.getUuid() }]
})
const projectUser = new ProjectUser({ name: 'ProjectUser-1' })
project.add(projectUser.handle('AttachAdminToAccount', {}))
const account = new Account({ name: 'Account-1' })
const account2 = new Account({ name: 'Account-2' })

const localStorage1 = new LocalStorage({
  name: 'LocalStorage-1',
  url: '/zstack_ps_1'
})
const localStorage2 = new LocalStorage({
  name: 'LocalStorage-2',
  url: '/zstack_ps_2'
})
const localStorage3 = new LocalStorage({
  name: 'LocalStorage-3',
  url: '/zstack_ps_3'
})

const sharedBlockGroupPrimaryStorage1 = new SharedBlockGroupPrimaryStorage({
  name: 'SharedBlockGroupPrimaryStorage-1',
  totalCapacity: 11258999068426240,
  availableCapacity: 11258999068426240
})
const sharedBlockGroupPrimaryStorage2 = new SharedBlockGroupPrimaryStorage({
  name: 'SharedBlockGroupPrimaryStorage-2',
  totalCapacity: 11258999068426240,
  availableCapacity: 11258999068426240
})
const sharedBlockGroupPrimaryStorage3 = new SharedBlockGroupPrimaryStorage({
  name: 'SharedBlockGroupPrimaryStorage-3',
  totalCapacity: 11258999068426240,
  availableCapacity: 11258999068426240
})

const sharedMountPointPrimaryStorage = new SharedMountPointPrimaryStorage({
  name: 'SharedMountPointPrimaryStorage-1',
  totalCapacity: 11258999068426240,
  availableCapacity: 11258999068426240
})

const nfsPointPrimaryStorage1 = new NfsPrimaryStorage({
  name: 'NfsPrimaryStorage-1',
  totalCapacity: 11258999068426240,
  availableCapacity: 11258999068426240,
  url: '127.0.22.2:/nfs_root',
  ip: '127.0.22.2'
})
const nfsPointPrimaryStorage2 = new NfsPrimaryStorage({
  name: 'NfsPrimaryStorage-2',
  totalCapacity: 11258999068426240,
  availableCapacity: 11258999068426240,
  url: '127.0.22.3:/nfs_root',
  ip: '127.0.22.3'
})
const nfsPointPrimaryStorage3 = new NfsPrimaryStorage({
  name: 'NfsPrimaryStorage-3',
  totalCapacity: 11258999068426240,
  availableCapacity: 11258999068426240,
  url: '127.0.22.4:/nfs_root',
  ip: '127.0.22.4'
})

// 创建网络
const vip = new Vip({ name: 'Vip-1' })
const eip = new Eip({ name: 'Eip-1' })
const l3Network = new L3Network({ name: 'L3Network-1' })
const vpcNetwork = new L3Network({ name: 'VPCNetwork', type: 'L3VpcNetwork' })
const l2NoVlanNetwork = new L2NoVlanNetwork({ name: 'L2NoVlanNetwork-1' })
const l3PublicNetwork = new L3Network({
  category: 'Public',
  name: 'L3PublicNetwork-1',
  l2NetworkUuid: l2NoVlanNetwork.getUuid()
})
const l2VlanNetwork = new L2VlanNetwork({ name: 'L2VlanNetwork-1' })
const l3NetworkPrivate = new L3Network({ name: 'L3NetworkPrivate-1' })
l2NoVlanNetwork
  .add(
    l3Network
      .add(new IpRange())
      .handle('AttachNetworkServiceToL3Network', {
        type: 'SecurityGroup'
      })
      .handle('AttachNetworkServiceToL3Network', {
        type: 'Flat'
      })
  )
  .add(
    l3PublicNetwork
      .add(
        new IpRange({
          startIp: '172.20.11.14',
          endIp: '172.20.12.45',
          netmask: '255.0.0.0',
          gateway: '172.0.0.1'
        })
      )
      .handle('AttachNetworkServiceToL3Network', {
        type: 'Flat'
      })
      .add(vip.add(eip))
  )
  .add(
    vpcNetwork
      .add(
        new IpRange({
          startIp: '192.21.111.14',
          endIp: '192.21.111.45',
          netmask: '255.255.255.0',
          gateway: '192.21.111.1'
        })
      )
      .handle('AttachNetworkServiceToL3Network', {
        type: 'vrouter'
      })
  )
l2VlanNetwork.add(
  l3NetworkPrivate
    .add(
      new IpRange({
        startIp: '10.0.0.2',
        endIp: '10.254.254.254',
        netmask: '255.0.0.0',
        gateway: '10.0.0.1'
      })
    )
    .handle('AttachNetworkServiceToL3Network', {
      type: 'Flat'
    })
)

const cluster1 = new Cluster({ name: 'Cluster-1' })
const host1 = new Host({ name: 'Host-1-1', managementIp: '127.0.1.11' })
const host2 = new Host({ name: 'Host-1-2', managementIp: '127.0.1.12' })
const host3 = new Host({ name: 'Host-1-3', managementIp: '127.0.1.13' })
const host4 = new Host({ name: 'Host-1-4', managementIp: '127.0.1.14' })
const host5 = new Host({ name: 'Host-1-5', managementIp: '127.0.1.15' })
const host6 = new Host({ name: 'Host-1-6', managementIp: '127.0.1.16' })
const host7 = new Host({ name: 'Host-1-7', managementIp: '127.0.1.17' })

const cluster2 = new Cluster({ name: 'Cluster-2' })
const host21 = new Host({ name: 'Host-2-1', managementIp: '127.0.1.21' })

const cluster3 = new Cluster({ name: 'Cluster-3' })
const host31 = new Host({ name: 'Host-3-1', managementIp: '127.0.1.31' })
const host32 = new Host({ name: 'Host-3-2', managementIp: '127.0.1.32' })

const cluster4 = new Cluster({ name: 'Cluster-4' })

const cluster5 = new Cluster({ name: 'Cluster-5' })

const cluster6 = new Cluster({ name: 'Cluster-6' })

const cluster7 = new Cluster({ name: 'Cluster-7' })

const cluster8 = new Cluster({ name: 'Cluster-8' })

// 创建虚拟机
const vm1 = new Vm({
  name: 'Vm-1',
  instanceOfferingUuid: instanceOffering.getUuid(),
  imageUuid: image1.getUuid(),
  primaryStorageUuidForRootVolume: localStorage1.getUuid(),
  l3NetworkUuids: [l3Network.getUuid()]
})

const vm2 = new Vm({
  name: 'Vm-2',
  instanceOfferingUuid: instanceOffering.getUuid(),
  imageUuid: image1.getUuid(),
  l3NetworkUuids: [l3Network.getUuid()]
})

// 创建云盘
const volume1 = new Volume({
  name: 'Volume-1',
  diskOfferingUuid: diskOffering1.getUuid()
})

const volume2 = new Volume({
  name: 'Volume-1',
  diskOfferingUuid: diskOffering2.getUuid()
})

// 创建云路由规格
const vrouterOffering = new VRouterOffering({
  name: 'vrouter-offering',
  imageUuid: image1.getUuid(),
  managementNetworkUuid: l3PublicNetwork.getUuid()
})

// 创建vpc路由器
const vpc = new VpcVRouter({
  name: 'vpc',
  virtualRouterOfferingUuid: vrouterOffering.getUuid()
})

zone
  .add(localStorage1)
  .add(localStorage2)
  .add(localStorage3)
  .add(cephPrimaryStorage1)
  .add(cephPrimaryStorage2)
  .add(sharedBlockGroupPrimaryStorage1)
  .add(sharedBlockGroupPrimaryStorage2)
  .add(sharedBlockGroupPrimaryStorage3)
  .add(sharedMountPointPrimaryStorage)
  .add(nfsPointPrimaryStorage1)
  .add(nfsPointPrimaryStorage2)
  .add(nfsPointPrimaryStorage3)
  .add(l2NoVlanNetwork)
  .add(l2VlanNetwork)
  .add(
    cluster1
      .add(host1)
      .add(host2)
      .add(host3)
      .add(host4)
      .add(host5)
      .add(host6)
      .add(host7)
      .handle('AttachPrimaryStorage', {
        primaryStorageUuid: cephPrimaryStorage1.getUuid()
      })
      .handle('AttachL2Network', { l2NetworkUuid: l2NoVlanNetwork.getUuid() })
  )
  .add(
    cluster2
      .add(host21)
      .handle('AttachPrimaryStorage', {
        primaryStorageUuid: cephPrimaryStorage2.getUuid()
      })
      .handle('AttachPrimaryStorage', {
        primaryStorageUuid: sharedBlockGroupPrimaryStorage1.getUuid()
      })
      .handle('AttachL2Network', { l2NetworkUuid: l2NoVlanNetwork.getUuid() })
  )
  .add(
    cluster3
      .add(host31)
      .add(host32)
      .handle('AttachPrimaryStorage', {
        primaryStorageUuid: localStorage1.getUuid()
      })
      .handle('AttachPrimaryStorage', {
        primaryStorageUuid: sharedBlockGroupPrimaryStorage2.getUuid()
      })
      .handle('AttachL2Network', { l2NetworkUuid: l2NoVlanNetwork.getUuid() })
  )
  .add(
    cluster4
      .handle('AttachPrimaryStorage', {
        primaryStorageUuid: localStorage1.getUuid()
      })
      .handle('AttachPrimaryStorage', {
        primaryStorageUuid: localStorage2.getUuid()
      })
      .handle('AttachL2Network', { l2NetworkUuid: l2NoVlanNetwork.getUuid() })
  )
  .add(
    cluster5
      .handle('AttachPrimaryStorage', {
        primaryStorageUuid: sharedMountPointPrimaryStorage.getUuid()
      })
      .handle('AttachL2Network', { l2NetworkUuid: l2NoVlanNetwork.getUuid() })
  )
  .add(
    cluster6
      .handle('AttachPrimaryStorage', {
        primaryStorageUuid: localStorage1.getUuid()
      })
      .handle('AttachL2Network', { l2NetworkUuid: l2NoVlanNetwork.getUuid() })
  )
  .add(
    cluster7
      .handle('AttachPrimaryStorage', {
        primaryStorageUuid: nfsPointPrimaryStorage1.getUuid()
      })
      .handle('AttachPrimaryStorage', {
        primaryStorageUuid: nfsPointPrimaryStorage2.getUuid()
      })
      .handle('AttachL2Network', { l2NetworkUuid: l2NoVlanNetwork.getUuid() })
  )
  .add(
    cluster8
      .handle('AttachPrimaryStorage', {
        primaryStorageUuid: nfsPointPrimaryStorage1.getUuid()
      })
      .handle('AttachL2Network', { l2NetworkUuid: l2NoVlanNetwork.getUuid() })
  )
  .handle('AttachBackupStorage', { backupStorageUuid: imageStore1.getUuid() })
  .handle('AttachBackupStorage', { backupStorageUuid: imageStore2.getUuid() })
  .handle('AttachBackupStorage', {
    backupStorageUuid: cephBackupStorage1.getUuid()
  })
  .handle('AttachBackupStorage', {
    backupStorageUuid: cephBackupStorage2.getUuid()
  })
  .handle('AttachBackupStorage', {
    backupStorageUuid: localImageStore.getUuid()
  })
  .handle('AttachBackupStorage', {
    backupStorageUuid: remoteImageStore.getUuid()
  })
  .add(vrouterOffering)
  .add(
    vpc.handle('AttachVpcRouterToL3Network', {
      l3NetworkUuid: vpcNetwork.getUuid()
    })
  )

mnEnv
  .add(instanceOffering)
  .add(diskOffering1)
  .add(diskOffering2)
  .add(tag1)
  .add(tag2)
  .add(imageStore1)
  .add(imageStore2)
  .add(cephBackupStorage1)
  .add(cephBackupStorage2)
  .add(localImageStore)
  .add(remoteImageStore)
  .add(zone)
  .add(project)
  .add(project2)
  .add(account)
  .add(account2)
  .add(volume1)
  .add(volume2)
  .add(
    vm1.handle('AttachDataVolume', {
      volumeUuid: volume1.getUuid()
    })
  )
  .add(
    vm2.handle('AttachDataVolume', {
      volumeUuid: volume2.getUuid()
    })
  )
// }
// get()

// export { get }
