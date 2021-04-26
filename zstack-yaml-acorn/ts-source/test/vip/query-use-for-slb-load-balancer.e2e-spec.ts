import { Op } from '@/api/zstack/base/query-base'
import { initBeforeEach, mnEnv, query } from '@test/features/helper/simple-test'
import gql from 'graphql-tag'
import {
  Cluster,
  Host,
  Image,
  ImageStoreBackUpStorage,
  IpRange,
  L2NoVlanNetwork,
  L3Network,
  Listener,
  LoadBalancer,
  LocalStorage,
  ServerGroup,
  SlbGroup,
  SlbInstance,
  SlbOffering,
  Vip,
  Zone
} from '../../helper/env-generator'

const zone = new Zone()

const imageStoreBackUpStorage = new ImageStoreBackUpStorage()
const cluster = new Cluster()
const localStorage = new LocalStorage()
const host = new Host({ managementIp: '127.0.0.10' })
const image = new Image()
imageStoreBackUpStorage.add(image)

const vip = new Vip()
const l2 = new L2NoVlanNetwork()
const l3 = new L3Network({
  name: 'l3PublicNetwork',
  category: 'Public'
})

const listener = new Listener({ protocol: 'https' })
const serverGroup = new ServerGroup()

const slbOffering = new SlbOffering({
  managementNetworkUuid: l3.getUuid(),
  imageUuid: image.getUuid()
})

const slbGroup = new SlbGroup({
  slbOfferingUuid: slbOffering.getUuid(),
  frontEndL3NetworkUuid: l3.getUuid(),
  backendL3NetworkUuids: [l3.getUuid()]
})
const slbInstance = new SlbInstance({ slbGroupUuid: slbGroup.getUuid() })

const slb = new LoadBalancer({
  vipUuid: vip.getUuid(),
  systemTags: [`SlbGroupUuid::${slbGroup.getUuid()}`]
})

slb
  .add(slbInstance)
  .add(listener)
  .add(
    serverGroup
      .handle('AddBackendServerToServerGroup', {
        servers: [{ ipAddress: '172.0.10.11' }]
      })
      .handle('AddServerGroupToListener', {
        listenerUuid: listener.getUuid()
      })
  )

mnEnv.add(imageStoreBackUpStorage).add(
  zone
    .add(
      l2.add(
        l3
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
          .add(vip)
      )
    )

    .handle('AttachBackupStorage', {
      backupStorageUuid: imageStoreBackUpStorage.getUuid()
    })
    .add(localStorage)
    .add(
      cluster
        .add(host)
        .handle('AttachPrimaryStorage', {
          primaryStorageUuid: localStorage.getUuid()
        })
        .handle('AttachL2Network', {
          l2NetworkUuid: l2.getUuid()
        })
    )
    .add(slbOffering)
    .add(slbGroup)
    .add(slb)
)

initBeforeEach()

describe('vip网络', () => {
  it.skip('query vipNetwork  use for SLB loadBalancer  ', async () => {
    const result: any = await query({
      query: gql`
        query vipNetworkList($conditions: [Condition!]) {
          vipNetworkList(conditions: $conditions) {
            list {
              name
              uuid
              slbLoadBalancer {
                uuid
              }
            }
            total
          }
        }
      `,
      variables: {
        conditions: [
          {
            key: 'uuid',
            op: Op.eq,
            value: vip.getUuid()
          }
        ]
      }
    })

    const _slb = result.data.vipNetworkList.list[0].slbLoadBalancer[0]
    expect(_slb).toEqual(
      expect.objectContaining({
        uuid: slb.getUuid()
      })
    )
  })
})
