import { mockPrepareData } from '@test/features/helper/mock'
import { TestEnv } from '@test/features/helper/env'
import gql from 'graphql-tag'
import {
  Env,
  InstanceOffering,
  DiskOffering,
  Zone,
  L2NoVlanNetwork,
  L3Network,
  IpRange,
  LocalStorage,
  Image,
  ImageStoreBackUpStorage,
  Vm,
  Volume,
  Host,
  Cluster,
  CephPrimaryStorage,
  CephBackupStorage
} from '@test/features/helper/env-generator'
import { IMutate, IQuery } from '../../type'
import { SnapshotType } from '@/virtual-resource/resource-snapshot/resource-snapshot.model'
// import { CreateVolumeSnapshotInput } from '@/virtual-resource/vm-instance/vm-instance.model'
import { genUuid } from '@/utils'

describe('capacityCardQuery', () => {
  let testEnv: TestEnv, query: IQuery, mutate: IMutate

  const mnEnv = new Env()
  // 创建区域
  const zone = new Zone()
  const instanceOffering = new InstanceOffering()
  const diskOffering = new DiskOffering({
    diskSize: 1 * 1024 * 1024 * 1024
  })

  const cephPrimaryStorage = new CephPrimaryStorage({
    mons: [
      {
        username: 'root',
        password: 'password',
        port: '22',
        ip: '127.0.3.21',
        t1: null,
        t2: undefined,
        t3: 12,
        t4: 0,
        t5: ''
      }
    ]
  })
  const cephBackupStorage = new CephBackupStorage({
    fsid: cephPrimaryStorage.getParam().fsid,
    mons: [
      {
        username: 'root',
        password: 'password',
        port: '22',
        ip: '127.0.3.11'
      }
    ]
  })
  const imageStoreBackUpStorage = new ImageStoreBackUpStorage({
    hostname: '127.0.3.31'
  })

  const image1 = new Image()
  const image2 = new Image()
  cephBackupStorage.add(image1)
  imageStoreBackUpStorage.add(image2)

  const l2NoVlanNetwork = new L2NoVlanNetwork()
  const l3Network = new L3Network().add(new IpRange({
    startIp: '10.0.0.2',
    endIp: '10.255.255.250',
    netmask: '255.0.0.0',
    gateway: '10.0.0.1'
  }))
  l2NoVlanNetwork.add(l3Network)

  const localStorage = new LocalStorage()

  const cluster1 = new Cluster()
  const host1 = new Host({ managementIp: '127.0.1.11' })
  const host2 = new Host({ managementIp: '127.0.1.12' })

  const vm = new Vm({
    instanceOfferingUuid: instanceOffering.getUuid(),
    imageUuid: image1.getUuid(),
    l3NetworkUuids: [l3Network.getUuid()],
    hostUuid: host1.getUuid()
  })

  const volume = new Volume({
    diskOfferingUuid: diskOffering.getUuid(),
    primaryStorageUuid: cephPrimaryStorage.getUuid(),
    systemTags: ['capability::virtio-scsi']
  })

  zone
    .add(localStorage)
    .add(cephPrimaryStorage)
    .add(l2NoVlanNetwork)
    .add(
      cluster1
        .add(host1)
        .add(host2)
        .handle('AttachPrimaryStorage', {
          primaryStorageUuid: localStorage.getUuid()
        })
        .handle('AttachPrimaryStorage', {
          primaryStorageUuid: cephPrimaryStorage.getUuid()
        })
        .handle('AttachL2Network', { l2NetworkUuid: l2NoVlanNetwork.getUuid() })
    )
    .handle('AttachBackupStorage', {
      backupStorageUuid: cephBackupStorage.getUuid()
    })
    .handle('AttachBackupStorage', {
      backupStorageUuid: imageStoreBackUpStorage.getUuid()
    })

  mnEnv
    .add(instanceOffering)
    .add(diskOffering)
    .add(cephBackupStorage)
    .add(imageStoreBackUpStorage)
    .add(zone)
    // .add(vm)
    .add(volume)
    .add(
      vm.handle('AttachDataVolume', {
        volumeUuid: volume.getUuid()
      })
    )

  beforeAll(async () => {
    const data = await mockPrepareData()
    testEnv = data.testEnv
    query = data.query
    mutate = data.mutate

    await testEnv.initMnEnv(mnEnv.getEnv())
    await testEnv.loginByAccount('admin', 'password')

    await mutate({
      mutation: gql`
        mutation createVolumeSnapshot($input: CreateVolumeSnapshotInput!) {
          createVolumeSnapshot(input: $input) {
            actionId
          }
        }
      `,
      variables: {
        input: {
          payload: {
            volumeUuid: volume.getUuid(),
            name: volume.getUuid(),
            type: SnapshotType.Single
          },
          action: {
            name: '创建 snapshot',
            total: 1,
            actionId: genUuid()
          }
        }
      }
    })
  })

  // beforeEach(async () => {
  //   await testEnv.initMnEnv(mnEnv.getEnv())
  //   await testEnv.loginByAccount('admin', 'password')

  //   await mutate({
  //     mutation: gql`
  //       mutation createVolumeSnapshot($input: CreateVolumeSnapshotInput!) {
  //         createVolumeSnapshot(input: $input) {
  //           actionId
  //         }
  //       }
  //     `,
  //     variables: {
  //       input: {
  //         payload: {
  //           volumeUuid: volume.getUuid(),
  //           name: volume.getUuid(),
  //           type: SnapshotType.Single
  //         },
  //         action: {
  //           name: '创建 snapshot',
  //           total: 1,
  //           actionId: genUuid()
  //         }
  //       }
  //     }
  //   })
  // })

  // afterEach(async () => {
  //   await testEnv.logout()
  //   await testEnv.cleanMnEnv()
  // })

  afterAll(async () => {
    await testEnv.logout()
    await testEnv.cleanMnEnv()
  })

  it('主存储卡片', async () => {
    const result: any = await query({
      query: gql`
        query queryCapacityManagementCard($zoneUuid: String!) {
          queryCapacityManagementCard(zoneUuid: $zoneUuid) {
            primaryStorageInfo {
              total
              usedCapacity
              usedPhysicalCapacity
              availableCapacity
              availablePhysicalCapacity
              totalCapacity
              totalPhysicalCapacity
              systemUsedCapacity
            }
            volumeTotalSizeInfo {
              Root {
                actualSize
                size
              }
              Data {
                actualSize
                size
              }
            }
            imageCacheSizeInfo {
              size
            }
            primaryStorageTrashInfo {
              size
            }
            backupStoreInfo {
              total
              totalCapacity
              availableCapacity
              usedCapacity
              ImageStoreBackupStorage {
                totalCapacity
                availableCapacity
                usedCapacity
              }
              Ceph {
                totalCapacity
                availableCapacity
                usedCapacity
              }
            }
            imageSizeInBackupStoreInfo {
              ImageStoreBackupStorage {
                actualSize
                size
              }
              Ceph {
                actualSize
                size
              }
            }
            backupSizeInBackupStoreInfo {
              size
            }
            backupStoreTrashSizeInfo {
              ImageStoreBackupStorage {
                size
              }
              Ceph {
                size
              }
            }
            vmInstanceInfo {
              total
              actualSize
              size
            }
            dataVolumeInfo {
              total
              actualSize
              size
            }
            imageInfo {
              total
              actualSize
              size
            }
            snapshotInfo {
              total
              size
            }
            computeNodeInfo {
              zstackSize
              otherSize
              totalSize
            }
            managementNodeInfo {
              total
              used
              available
              log
              database
              databaseBackup
              monitor
              upgradeBackup
            }
          }
        }
      `,
      variables: {
        zoneUuid: zone.getUuid()
      }
    })

    console.log(
      'result.data.queryCapacityManagementCard',
      result.data.queryCapacityManagementCard
    )

    expect(result.data.queryCapacityManagementCard.primaryStorageInfo).toEqual({
      total: 2,
      usedCapacity: 33285996544,
      usedPhysicalCapacity: 0,
      availableCapacity: 32952062836736,
      availablePhysicalCapacity: 32985348833280,
      totalCapacity: 32985348833280,
      totalPhysicalCapacity: 32985348833280,
      systemUsedCapacity: 0
    })
    expect(result.data.queryCapacityManagementCard.volumeTotalSizeInfo).toEqual(
      {
        Root: {
          actualSize: 10737418240,
          size: 21474836480
        },
        Data: { actualSize: 0, size: 0 }
      }
    )
    expect(result.data.queryCapacityManagementCard.imageCacheSizeInfo).toEqual({
      size: 10737418240
    })
    expect(
      result.data.queryCapacityManagementCard.primaryStorageTrashInfo
    ).toEqual({
      size: 0
    })
    expect(result.data.queryCapacityManagementCard.backupStoreInfo).toEqual({
      total: 2,
      totalCapacity: 12068858101760,
      availableCapacity: 12068858101760,
      usedCapacity: 0,
      ImageStoreBackupStorage: {
        totalCapacity: 1073741824000,
        availableCapacity: 1073741824000,
        usedCapacity: 0
      },
      Ceph: {
        totalCapacity: 10995116277760,
        availableCapacity: 10995116277760,
        usedCapacity: 0
      }
    })
    expect(
      result.data.queryCapacityManagementCard.imageSizeInBackupStoreInfo
    ).toEqual({
      ImageStoreBackupStorage: { actualSize: 0, size: 21474836480 },
      Ceph: {
        actualSize: 10737418240,
        size: 21474836480
      }
    })
    expect(
      result.data.queryCapacityManagementCard.backupSizeInBackupStoreInfo
    ).toEqual({ size: 0 })
    expect(
      result.data.queryCapacityManagementCard.backupStoreTrashSizeInfo
    ).toEqual({ ImageStoreBackupStorage: { size: 0 }, Ceph: { size: 0 } })
    expect(result.data.queryCapacityManagementCard.vmInstanceInfo).toEqual({
      total: 1,
      actualSize: 10737418240,
      size: 21474836480
    })
    expect(result.data.queryCapacityManagementCard.dataVolumeInfo).toEqual({
      total: 1,
      actualSize: 0,
      size: 0
    })
    expect(result.data.queryCapacityManagementCard.imageInfo).toEqual({
      total: 2,
      actualSize: 10737418240,
      size: 42949672960
    })
    expect(result.data.queryCapacityManagementCard.snapshotInfo).toEqual({
      total: 1,
      size: 0
    })
    expect(result.data.queryCapacityManagementCard.computeNodeInfo).toEqual({
      zstackSize: 0,
      otherSize: 0,
      totalSize: 0
    })
    expect(
      result.data.queryCapacityManagementCard.managementNodeInfo.total
    ).toBeGreaterThan(0)
    expect(
      result.data.queryCapacityManagementCard.managementNodeInfo.used
    ).toBeGreaterThan(0)
    expect(
      result.data.queryCapacityManagementCard.managementNodeInfo.available
    ).toBeGreaterThanOrEqual(0)
    expect(
      result.data.queryCapacityManagementCard.managementNodeInfo.log
    ).toBeGreaterThanOrEqual(0)
    expect(
      result.data.queryCapacityManagementCard.managementNodeInfo.database
    ).toBeGreaterThan(0)
    expect(
      result.data.queryCapacityManagementCard.managementNodeInfo.databaseBackup
    ).toBeGreaterThanOrEqual(0)
    expect(
      result.data.queryCapacityManagementCard.managementNodeInfo.monitor
    ).toBeGreaterThanOrEqual(0)
    expect(
      result.data.queryCapacityManagementCard.managementNodeInfo.upgradeBackup
    ).toBeGreaterThanOrEqual(0)
  })

  it('主存储top', async () => {
    // 物理机器
    const resultHost: any = await query({
      query: gql`
        query queryCapacityManagementTopListHost(
          $zoneUuid: String!
          $sortBy: String!
          $sortDirection: String!
        ) {
          queryCapacityManagementTopListHost(
            zoneUuid: $zoneUuid
            sortBy: $sortBy
            sortDirection: $sortDirection
          ) {
            uuid
            name
            rootMountPointUsed
            detail {
              uuid
              usedCapacityPercentage
              usedCapacity
              freeCapacity
            }
          }
        }
      `,
      variables: {
        sortBy: 'DiskAllUsedCapacityInPercent',
        sortDirection: 'top',
        zoneUuid: zone.getUuid()
      }
    })
    console.log(
      'resultHost',
      resultHost.data.queryCapacityManagementTopListHost
    )

    expect(resultHost.data.queryCapacityManagementTopListHost).toEqual([])

    const resultPrimaryStorage: any = await query({
      query: gql`
        query queryCapacityManagementTopListPrimaryStorage(
          $zoneUuid: String!
          $sortBy: String!
          $sortDirection: String!
        ) {
          queryCapacityManagementTopListPrimaryStorage(
            zoneUuid: $zoneUuid
            sortBy: $sortBy
            sortDirection: $sortDirection
          ) {
            uuid
            name
            detail {
              uuid
              totalPhysicalCapacity
              availablePhysicalCapacity
              usedPhysicalCapacity
              usedPhysicalCapacityPercentage
              rootVolumeSize
              dataVolumeSize
              imageCacheSize
              trashSize
              systemSize
            }
          }
        }
      `,
      variables: {
        sortBy: 'UsedPhysicalCapacityInPercent',
        sortDirection: 'top',
        zoneUuid: zone.getUuid()
      }
    })

    console.log(
      'resultPrimaryStorage',
      resultPrimaryStorage.data.queryCapacityManagementTopListPrimaryStorage
    )

    expect(
      resultPrimaryStorage.data.queryCapacityManagementTopListPrimaryStorage
    ).toEqual([
      {
        uuid: cephPrimaryStorage.getUuid(),
        name: cephPrimaryStorage.getUuid(),
        detail: {
          uuid: cephPrimaryStorage.getUuid(),
          totalPhysicalCapacity: 10995116277760,
          availablePhysicalCapacity: 10995116277760,
          usedPhysicalCapacity: 0,
          usedPhysicalCapacityPercentage: 0,
          rootVolumeSize: 10737418240,
          dataVolumeSize: 0,
          imageCacheSize: 10737418240,
          trashSize: 0,
          systemSize: 0
        }
      },
      {
        uuid: localStorage.getUuid(),
        name: localStorage.getUuid(),
        detail: {
          uuid: localStorage.getUuid(),
          totalPhysicalCapacity: 21990232555520,
          availablePhysicalCapacity: 21990232555520,
          usedPhysicalCapacity: 0,
          usedPhysicalCapacityPercentage: 0,
          rootVolumeSize: 0,
          dataVolumeSize: 0,
          imageCacheSize: 0,
          trashSize: 0,
          systemSize: 0
        }
      }
    ])

    const resultBackupStorage: any = await query({
      query: gql`
        query queryCapacityManagementTopListBackupStorage(
          $zoneUuid: String!
          $sortBy: String!
          $sortDirection: String!
        ) {
          queryCapacityManagementTopListBackupStorage(
            zoneUuid: $zoneUuid
            sortBy: $sortBy
            sortDirection: $sortDirection
          ) {
            uuid
            name
            type
            detail {
              uuid
              totalCapacity
              availableCapacity
              usedCapacity
              usedCapacityPercentage
              imageSize
              backupSize
              trashSize
            }
          }
        }
      `,
      variables: {
        sortBy: 'UsedCapacityInPercent',
        sortDirection: 'top',
        zoneUuid: zone.getUuid()
      }
    })

    console.log(
      'resultBackupStorage',
      resultBackupStorage.data.queryCapacityManagementTopListBackupStorage
    )

    expect(
      resultBackupStorage.data.queryCapacityManagementTopListBackupStorage
    ).toEqual([
      {
        uuid: cephBackupStorage.getUuid(),
        name: cephBackupStorage.getUuid(),
        type: 'Ceph',
        detail: {
          uuid: cephBackupStorage.getUuid(),
          totalCapacity: 10995116277760,
          availableCapacity: 10995116277760,
          usedCapacity: 0,
          usedCapacityPercentage: 0,
          imageSize: 10737418240,
          backupSize: 0,
          trashSize: 0
        }
      },
      {
        uuid: imageStoreBackUpStorage.getUuid(),
        name: imageStoreBackUpStorage.getUuid(),
        type: 'ImageStoreBackupStorage',
        detail: {
          uuid: imageStoreBackUpStorage.getUuid(),
          totalCapacity: 1073741824000,
          availableCapacity: 1073741824000,
          usedCapacity: 0,
          usedCapacityPercentage: 0,
          imageSize: 0,
          backupSize: 0,
          trashSize: 0
        }
      }
    ])

    const resultImage: any = await query({
      query: gql`
        query queryCapacityManagementTopListImage(
          $zoneUuid: String!
          $sortBy: String!
          $sortDirection: String!
        ) {
          queryCapacityManagementTopListImage(
            zoneUuid: $zoneUuid
            sortBy: $sortBy
            sortDirection: $sortDirection
          ) {
            uuid
            name
            actualSize
            size
            system
          }
        }
      `,
      variables: {
        sortBy: 'actualSize',
        sortDirection: 'desc',
        zoneUuid: zone.getUuid()
      }
    })

    console.log(
      'resultImage',
      resultImage.data.queryCapacityManagementTopListImage
    )

    expect(resultImage.data.queryCapacityManagementTopListImage).toEqual([
      {
        uuid: image1.getUuid(),
        name: image1.getUuid(),
        actualSize: 10737418240,
        size: 21474836480,
        system: false
      },
      {
        uuid: image2.getUuid(),
        name: image2.getUuid(),
        actualSize: 0,
        size: 21474836480,
        system: false
      }
    ])

    const resultVmInstance: any = await query({
      query: gql`
        query queryCapacityManagementTopListVmInstance(
          $zoneUuid: String!
          $sortBy: String!
          $sortDirection: String!
        ) {
          queryCapacityManagementTopListVmInstance(
            zoneUuid: $zoneUuid
            sortBy: $sortBy
            sortDirection: $sortDirection
          ) {
            uuid
            name
            actualSize
            size
          }
        }
      `,
      variables: {
        sortBy: 'actualSize',
        sortDirection: 'desc',
        zoneUuid: zone.getUuid()
      }
    })

    console.log(
      'resultVmInstance',
      resultVmInstance.data.queryCapacityManagementTopListVmInstance
    )

    expect(
      resultVmInstance.data.queryCapacityManagementTopListVmInstance
    ).toEqual([
      {
        uuid: vm.getUuid(),
        name: vm.getUuid(),
        actualSize: 10737418240,
        size: 21474836480
      }
    ])

    const resultVolume: any = await query({
      query: gql`
        query queryCapacityManagementTopListVolume(
          $zoneUuid: String!
          $sortBy: String!
          $sortDirection: String!
        ) {
          queryCapacityManagementTopListVolume(
            zoneUuid: $zoneUuid
            sortBy: $sortBy
            sortDirection: $sortDirection
          ) {
            uuid
            name
            actualSize
            size
          }
        }
      `,
      variables: {
        sortBy: 'actualSize',
        sortDirection: 'desc',
        zoneUuid: zone.getUuid()
      }
    })

    console.log(
      'resultVolume',
      resultVolume.data.queryCapacityManagementTopListVolume
    )

    expect(resultVolume.data.queryCapacityManagementTopListVolume).toEqual([
      {
        uuid: volume.getUuid(),
        name: volume.getUuid(),
        actualSize: 0,
        size: 0
      }
    ])

    const resultSnapshot: any = await query({
      query: gql`
        query queryCapacityManagementTopListSnapshot(
          $zoneUuid: String!
          $sortBy: String!
          $sortDirection: String!
        ) {
          queryCapacityManagementTopListSnapshot(
            zoneUuid: $zoneUuid
            sortBy: $sortBy
            sortDirection: $sortDirection
          ) {
            name
            size
            volumeUuid
            volumeType
            resource {
              uuid
              resourceUuid
              resourceName
              resourceType
            }
          }
        }
      `,
      variables: {
        sortBy: 'size',
        sortDirection: 'desc',
        zoneUuid: zone.getUuid()
      }
    })

    console.log(
      'resultSnapshot',
      resultSnapshot.data.queryCapacityManagementTopListSnapshot
    )

    expect(resultSnapshot.data.queryCapacityManagementTopListSnapshot).toEqual([
      {
        name: volume.getUuid(),
        size: 0,
        volumeUuid: volume.getUuid(),
        volumeType: 'Data',
        resource: {
          uuid: volume.getUuid(),
          resourceUuid: volume.getUuid(),
          resourceName: volume.getUuid(),
          resourceType: 'Volume'
        }
      }
    ])

    const resultHostInfo: any = await query({
      query: gql`
        query queryCapacityManagementTopListHostDiskInfo($uuid: String!) {
          queryCapacityManagementTopListHostDiskInfo(uuid: $uuid) {
            key
            diskDeviceLetter
            mountPoint
            fSType
            free
            used
            total
            percent
          }
        }
      `,
      variables: {
        uuid: host1.getUuid()
      }
    })

    console.log(
      'resultHostInfo',
      resultHostInfo.data.queryCapacityManagementTopListHostDiskInfo
    )

    expect(
      resultHostInfo.data.queryCapacityManagementTopListHostDiskInfo
    ).toEqual([])

    const resultDisconnectedResourceCount: any = await query({
      query: gql`
        query queryCapacityManagementDisconnectedResourceCount(
          $zoneUuid: String!
        ) {
          queryCapacityManagementDisconnectedResourceCount(
            zoneUuid: $zoneUuid
          ) {
            host
            primaryStorage
            backupStorage
            primaryStorageNotInCluster
            total
          }
        }
      `,
      variables: {
        zoneUuid: zone.getUuid()
      }
    })

    console.log(
      'resultDisconnectedResourceCount',
      resultDisconnectedResourceCount.data
        .queryCapacityManagementDisconnectedResourceCount
    )

    expect(
      resultDisconnectedResourceCount.data
        .queryCapacityManagementDisconnectedResourceCount
    ).toEqual({
      host: 0,
      primaryStorage: 0,
      backupStorage: 0,
      primaryStorageNotInCluster: 0,
      total: 0
    })
  })
})
