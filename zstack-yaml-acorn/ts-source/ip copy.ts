import {
  mnEnv,
} from '@test/features/helper/simple-test'
import {
  Zone,
  Cluster,
  L2NoVlanNetwork,
  L3Network,
  IpRange,
  VRouterOffering,
  ImageStoreBackUpStorage,
  Image,
  VpcVRouter,
  Host,
  LocalStorage,
  Vip,
  IPsecConnection
} from '@test/features/helper/env-generator'


initBeforeAll()

const zone = new Zone()
const vip = new Vip()
const cluster = new Cluster()
const l2NoVlanNetwork = new L2NoVlanNetwork()
const host = new Host({ managementIp: '127.0.0.10' })
const localStorage = new LocalStorage()

const vpcNetwork = new L3Network({
  name: 'l3-vpc',
  type: 'L3VpcNetwork',
  system: false,
  category: 'Private'
})
  .add(
    new IpRange({
      startIp: '192.168.54.2',
      endIp: '192.168.54.200',
      netmask: '255.255.255.0',
      gateway: '192.168.54.1'
    })
  )
  .handle('AttachNetworkServiceToL3Network', {
    type: 'vrouter'
  })
const l3Network = new L3Network({
  category: 'Public'
})
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

const image = new Image()
const imageBS = new ImageStoreBackUpStorage()
const vrouterOffering = new VRouterOffering({
  imageUuid: image.getUuid(),
  managementNetworkUuid: l3Network.getUuid()
})
const vpcVRouter = new VpcVRouter({
  name: 'vpc',
  hostUuid: host.getUuid(),
  virtualRouterOfferingUuid: vrouterOffering.getUuid()
})
const ipsec = new IPsecConnection({
  l3NetworkUuid: vpcNetwork.getUuid(),
  vipUuid: vip.getUuid()
})

// 构建环境
mnEnv.add(imageBS.add(image)).add(
  zone
    .handle('AttachBackupStorage', { backupStorageUuid: imageBS.getUuid() })
    .add(localStorage)
    .add(l2NoVlanNetwork.add(l3Network.add(vip)).add(vpcNetwork))
    .add(
      cluster
        .add(host)
        .handle('AttachL2Network', { l2NetworkUuid: l2NoVlanNetwork.getUuid() })
        .handle('AttachPrimaryStorage', {
          primaryStorageUuid: localStorage.getUuid()
        })
    )
    .add(vrouterOffering)
    .add(
      vpcVRouter.handle('AttachVpcRouterToL3Network', {
        l3NetworkUuid: vpcNetwork.getUuid()
      })
    )
    .add(ipsec)
)
