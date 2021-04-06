export type Maybe<T> = T
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] }
/** All built-in and custom scalars, mapped to their actual values */
export interface Scalars {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  BigInt: any
}

export interface LoginResp {
  sessionId: Scalars['String']
  accountUuid: Scalars['String']
  userUuid: Scalars['String']
  currentIdentity?: Maybe<Identity>
}

export enum Identity {
  Admin = 'Admin',
  NormalAccount = 'NormalAccount',
  AccountNormalUser = 'AccountNormalUser',
  PlatformAdmin = 'PlatformAdmin',
  PlatformUser = 'PlatformUser',
  ProjectAdmin = 'ProjectAdmin',
  ProjectOperator = 'ProjectOperator',
  ProjectNormalUser = 'ProjectNormalUser',
  IAM2SystemAdmin = 'IAM2SystemAdmin',
  IAM2SecurityAdmin = 'IAM2SecurityAdmin',
  IAM2AuditAdmin = 'IAM2AuditAdmin',
  IAM2DashboardManager = 'IAM2DashboardManager'
}

export interface GetTwoFactorAuthenticationStateResp {
  state?: Maybe<Scalars['String']>
}

export interface ActionSendResp {
  actionId: Scalars['String']
  success: Scalars['Boolean']
  error?: Maybe<Scalars['String']>
}

export interface ActionError {
  code?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  details?: Maybe<Scalars['String']>
}

export interface TaskResource {
  type?: Maybe<Scalars['String']>
  uuid: Scalars['String']
}

export interface TaskResult {
  taskName?: Maybe<Scalars['String']>
  resources?: Maybe<Array<TaskResource>>
}

export interface TaskError {
  code?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  details?: Maybe<Scalars['String']>
}

export interface ResponseActionInfo {
  actionId: Scalars['String']
  state: ActionRespTaskState
  success: Scalars['Int']
  error: Scalars['Int']
  total: Scalars['Int']
}

export enum ActionRespTaskState {
  Running = 'Running',
  Success = 'Success',
  Error = 'Error'
}

export interface ActionResult {
  actionId: Scalars['String']
}

export interface ActionTaskResult {
  /** websocket消息按照 sessionId 分发 */
  sessionId: Scalars['String']
  /** 前端传入的 actionId 原封返还，用于建立关联 */
  actionId: Scalars['String']
  /** 当前子任务执行状态 */
  state: ActionTaskState
  /** inventory 的类型，用于改写前端 cache */
  type?: Maybe<Scalars['String']>
  /** 操作的实体id，一般为 uuid，如果没有 uuid，需要绑定一个唯一性 key，并且与前端的缓存策略对应 */
  id?: Maybe<Scalars['String']>
  /** 本次操作变更的字段，用于改写前端 cache */
  fields?: Maybe<Scalars['String']>
  /** ZStack 返回的 inventory，序列化后传给前端 */
  inventory?: Maybe<Scalars['String']>
  /** ZStack 返回的 error，序列化后传给前端 */
  error?: Maybe<Scalars['String']>
}

export enum ActionTaskState {
  success = 'success',
  fail = 'fail',
  exception = 'exception'
}

export interface ZWatchEvent {
  /** websocket消息按照 sessionId 分发 */
  sessionId: Scalars['String']
  /** ZWatch消息 */
  payload?: Maybe<Scalars['String']>
}

export interface MetricData {
  time: Scalars['Float']
  value?: Maybe<Scalars['Float']>
  type?: Maybe<Scalars['String']>
  metricName?: Maybe<Scalars['String']>
}

export interface MetricLabelValue {
  value: Scalars['String']
}

export interface Zone {
  uuid: Scalars['String']
  name: Scalars['String']
  description?: Maybe<Scalars['String']>
  createDate?: Maybe<Scalars['String']>
  lastOpDate?: Maybe<Scalars['String']>
  state?: Maybe<Scalars['String']>
  clusterCount?: Maybe<Scalars['Int']>
  primaryStorageCount?: Maybe<Scalars['Int']>
  l2NetworkCount?: Maybe<Scalars['Int']>
  vmInstanceCount?: Maybe<Scalars['Int']>
  volumeCount?: Maybe<Scalars['Int']>
}

export interface ZoneResponse {
  total?: Maybe<Scalars['Int']>
  list: Array<Zone>
}

export interface ZoneRelatedSummary {
  clusterTotal: Scalars['Int']
  baremetalClusterTotal: Scalars['Int']
  primaryStorageTotal: Scalars['Int']
  l2NetworkTotal: Scalars['Int']
  backupStorageTotal: Scalars['Int']
}

export interface VCenter {
  uuid: Scalars['String']
  name: Scalars['String']
  description?: Maybe<Scalars['String']>
  state: VCenterState
  status: VCenterStatus
  userName?: Maybe<Scalars['String']>
  zoneUuid?: Maybe<Scalars['String']>
  https?: Maybe<Scalars['Boolean']>
  domainName?: Maybe<Scalars['String']>
  port?: Maybe<Scalars['Float']>
  createDate?: Maybe<Scalars['String']>
  lastOpDate?: Maybe<Scalars['String']>
}

export enum VCenterState {
  Enabled = 'Enabled',
  Disabled = 'Disabled'
}

export enum VCenterStatus {
  Connecting = 'Connecting',
  Connected = 'Connected',
  Disconnected = 'Disconnected'
}

export interface VCenterList {
  list?: Maybe<Array<VCenter>>
  total: Scalars['Float']
  error?: Maybe<ActionError>
}

export interface VCenterSummary {
  clusterCount?: Maybe<Scalars['Float']>
  resourcePoolCount?: Maybe<Scalars['Float']>
  primarystorageCount?: Maybe<Scalars['Float']>
  backupstorageCount?: Maybe<Scalars['Float']>
  hostCount?: Maybe<Scalars['Float']>
  vmInstanceCount?: Maybe<Scalars['Float']>
  volumeCount?: Maybe<Scalars['Float']>
  imageCount?: Maybe<Scalars['Float']>
  l3NetworkCount?: Maybe<Scalars['Float']>
}

export interface CephBackupStorageMon {
  hostname: Scalars['String']
  monPort?: Maybe<Scalars['Int']>
  createDate: Scalars['String']
  lastOpDate: Scalars['String']
  backupStorageUuid?: Maybe<Scalars['String']>
  monAddr?: Maybe<Scalars['String']>
  sshPort?: Maybe<Scalars['Int']>
  status?: Maybe<Scalars['String']>
  sshUsername?: Maybe<Scalars['String']>
  sshPassword?: Maybe<Scalars['String']>
  monUuid?: Maybe<Scalars['String']>
}

export interface BackupStorage {
  uuid: Scalars['String']
  name: Scalars['String']
  description?: Maybe<Scalars['String']>
  type: Scalars['String']
  vCenterUuid?: Maybe<Scalars['String']>
  vcenter?: Maybe<VCenter>
  hostname?: Maybe<Scalars['String']>
  username?: Maybe<Scalars['String']>
  sshPort?: Maybe<Scalars['Int']>
  availableCapacity?: Maybe<Scalars['Float']>
  totalCapacity?: Maybe<Scalars['Float']>
  url: Scalars['String']
  state?: Maybe<BackupStorageState>
  status: Scalars['String']
  createDate: Scalars['String']
  lastOpDate: Scalars['String']
  attachedZoneUuids?: Maybe<Array<Scalars['String']>>
  zone?: Maybe<Zone>
  mons?: Maybe<Array<CephBackupStorageMon>>
  fsid?: Maybe<Scalars['String']>
  poolName?: Maybe<Scalars['String']>
  dataNetwork?: Maybe<Scalars['String']>
  syncImageNetwork?: Maybe<Scalars['String']>
  poolAvailableCapacity?: Maybe<Scalars['Float']>
  poolUsedCapacity?: Maybe<Scalars['Float']>
  poolReplicatedSize?: Maybe<Scalars['Float']>
  ossBucketUuid?: Maybe<Scalars['String']>
}

export enum BackupStorageState {
  Enabled = 'Enabled',
  Disabled = 'Disabled'
}

export interface BackupStorageList {
  list: Array<BackupStorage>
  total?: Maybe<Scalars['Int']>
  error?: Maybe<ActionError>
}

export interface Labels {
  BackupStorageUuid: Scalars['String']
}

export interface BackupStorageMetricData {
  time: Scalars['Float']
  value?: Maybe<Scalars['Float']>
  type?: Maybe<Scalars['String']>
  metricName?: Maybe<Scalars['String']>
  labels: Labels
}

export interface CommonOwner {
  uuid: Scalars['String']
  name: Scalars['String']
  type: Scalars['String']
}

export interface BasicOwner {
  uuid: Scalars['String']
  name: Scalars['String']
  type: Scalars['String']
  createDate: Scalars['String']
  lastOpDate: Scalars['String']
  description?: Maybe<Scalars['String']>
  volumeNum?: Maybe<Scalars['Int']>
  vmNum?: Maybe<Scalars['Int']>
}

export interface AccountOwner {
  uuid: Scalars['String']
  name: Scalars['String']
  type: Scalars['String']
  createDate: Scalars['String']
  lastOpDate: Scalars['String']
  description?: Maybe<Scalars['String']>
  volumeNum?: Maybe<Scalars['Int']>
  vmNum?: Maybe<Scalars['Int']>
}

export interface ProjectType {
  name: Scalars['String']
  ordinal: Scalars['Int']
}

export interface ProjectAttribute {
  uuid: Scalars['String']
  name: Scalars['String']
  value: Scalars['String']
  type: ProjectType
}

export interface ProjectOwner {
  uuid: Scalars['String']
  name: Scalars['String']
  type: Scalars['String']
  createDate: Scalars['String']
  lastOpDate: Scalars['String']
  description?: Maybe<Scalars['String']>
  volumeNum?: Maybe<Scalars['Int']>
  vmNum?: Maybe<Scalars['Int']>
  linkedAccountUuid: Scalars['String']
  state: ProjectType
  attributes: Array<ProjectAttribute>
  admin?: Maybe<Scalars['String']>
}

export interface OwnerSummaryQueryResp {
  project: Scalars['Int']
  account: Scalars['Int']
}

export interface AccountResourceRefInventory {
  accountUuid?: Maybe<Scalars['String']>
  resourceUuid?: Maybe<Scalars['String']>
  ownerAccountUuid?: Maybe<Scalars['String']>
  resourceType?: Maybe<Scalars['String']>
}

export interface BackupStorageRef {
  imageUuid: Scalars['String']
  backupStorageUuid: Scalars['String']
  installPath?: Maybe<Scalars['String']>
  status: Scalars['String']
  exportMd5Sum?: Maybe<Scalars['String']>
  exportUrl?: Maybe<Scalars['String']>
  createDate: Scalars['String']
  lastOpDate: Scalars['String']
}

export interface Owner {
  name: Scalars['String']
  uuid: Scalars['String']
  type: Scalars['String']
}

export interface Image {
  uuid: Scalars['String']
  name: Scalars['String']
  description?: Maybe<Scalars['String']>
  exportUrl?: Maybe<Scalars['String']>
  state: ImageState
  status: ImageStatus
  size: Scalars['Float']
  actualSize: Scalars['Float']
  md5Sum?: Maybe<Scalars['String']>
  url: Scalars['String']
  mediaType: ImageMediaType
  guestOsType?: Maybe<Scalars['String']>
  type: Scalars['String']
  platform?: Maybe<ImagePlatform>
  format?: Maybe<ImageFormat>
  system: Scalars['Boolean']
  createDate: Scalars['String']
  lastOpDate: Scalars['String']
  bootMode?: Maybe<ImageBootMode>
  qga?: Maybe<Scalars['Boolean']>
  baremetal2Image?: Maybe<Scalars['Boolean']>
  backupStorageRefs?: Maybe<Array<BackupStorageRef>>
  backupStorage?: Maybe<BackupStorage>
  owner?: Maybe<Owner>
  toPublic?: Maybe<Scalars['Boolean']>
  shareType?: Maybe<ShareType>
  useFor?: Maybe<ImageUseFor>
}

export enum ImageState {
  Enabled = 'Enabled',
  Disabled = 'Disabled'
}

export enum ImageStatus {
  Creating = 'Creating',
  Downloading = 'Downloading',
  Ready = 'Ready',
  Error = 'Error',
  Deleted = 'Deleted',
  Migrating = 'Migrating'
}

export enum ImageMediaType {
  RootVolumeTemplate = 'RootVolumeTemplate',
  DataVolumeTemplate = 'DataVolumeTemplate',
  ISO = 'ISO'
}

export enum ImagePlatform {
  Linux = 'Linux',
  Windows = 'Windows',
  WindowsVirtio = 'WindowsVirtio',
  Other = 'Other',
  Paravirtualization = 'Paravirtualization'
}

export enum ImageFormat {
  qcow2 = 'qcow2',
  iso = 'iso',
  raw = 'raw',
  vmtx = 'vmtx'
}

export enum ImageBootMode {
  Legacy = 'Legacy',
  UEFI = 'UEFI',
  UEFI_WITH_CSM = 'UEFI_WITH_CSM'
}

export enum ShareType {
  Public = 'Public',
  Group = 'Group',
  None = 'None'
}

export enum ImageUseFor {
  SLB = 'SLB',
  vrouter = 'vrouter'
}

export interface ImageSummary {
  total?: Maybe<Scalars['Int']>
  available?: Maybe<Scalars['Int']>
  destroyed?: Maybe<Scalars['Int']>
  exported: Scalars['Int']
}

export interface ExportImageFromBackupStorageResult {
  imageUrl?: Maybe<Scalars['String']>
  exportMd5Sum?: Maybe<Scalars['String']>
  success?: Maybe<Scalars['Boolean']>
}

export interface ImageList {
  list?: Maybe<Array<Image>>
  total: Scalars['Int']
  error?: Maybe<ActionError>
}

export interface ResourceStack {
  uuid: Scalars['String']
  name?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  createDate?: Maybe<Scalars['String']>
  lastOpDate?: Maybe<Scalars['String']>
  owner?: Maybe<Owner>
  version?: Maybe<Scalars['String']>
  type?: Maybe<Scalars['String']>
  templateContent?: Maybe<Scalars['String']>
  paramContent?: Maybe<Scalars['String']>
  status?: Maybe<ResourceStackStatus>
  reason?: Maybe<Scalars['String']>
  enableRollback?: Maybe<Scalars['Boolean']>
}

export enum ResourceStackStatus {
  Initial = 'Initial',
  Created = 'Created',
  Failed = 'Failed',
  Creating = 'Creating',
  Deleting = 'Deleting',
  Deleted = 'Deleted',
  Rollbacking = 'Rollbacking',
  Rollbacked = 'Rollbacked'
}

export interface QueryResourceStackResp {
  list?: Maybe<Array<ResourceStack>>
  total?: Maybe<Scalars['Float']>
}

export interface EventFromResourceStack {
  id: Scalars['String']
  description?: Maybe<Scalars['String']>
  createDate?: Maybe<Scalars['String']>
  lastOpDate?: Maybe<Scalars['String']>
  action?: Maybe<Scalars['String']>
  content?: Maybe<Scalars['String']>
  duration?: Maybe<Scalars['String']>
  resourceName?: Maybe<Scalars['String']>
  actionStatus?: Maybe<StackEventStatus>
  stackUuid?: Maybe<Scalars['String']>
}

export enum StackEventStatus {
  Start = 'Start',
  Finish = 'Finish',
  Failed = 'Failed',
  RollbackStart = 'RollbackStart',
  RollbackFinish = 'RollbackFinish',
  RollbackFailed = 'RollbackFailed'
}

export interface QueryEventFromResourceStackResp {
  list?: Maybe<Array<EventFromResourceStack>>
  total?: Maybe<Scalars['Float']>
}

export interface ResourceFromResourceStack {
  resourceType: Scalars['String']
  name: Scalars['String']
  uuid: Scalars['String']
  createDate?: Maybe<Scalars['String']>
}

export interface GetResourceFromResourceStackResp {
  list?: Maybe<Array<ResourceFromResourceStack>>
  total?: Maybe<Scalars['Float']>
}

export interface ActionsMap {
  resourceName?: Maybe<Scalars['String']>
  actionName?: Maybe<Scalars['String']>
  round?: Maybe<Scalars['Int']>
  actions?: Maybe<Scalars['String']>
  inDegree?: Maybe<Array<Scalars['String']>>
}

export interface ConditionsMap {
  uuid?: Maybe<Scalars['String']>
}

export interface PreviewResourceStruct {
  conditions: ConditionsMap
  actions: Array<ActionsMap>
}

export interface PreviewResult {
  preview?: Maybe<PreviewResourceStruct>
}

export interface Parameter {
  paramName: Scalars['String']
  type?: Maybe<Scalars['String']>
  defaultValue?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  noEcho?: Maybe<Scalars['Boolean']>
  label?: Maybe<Scalars['String']>
  constraintDescription?: Maybe<Scalars['String']>
  resourceType?: Maybe<Scalars['String']>
}

export interface CheckTemplateResp {
  parameters: Array<Parameter>
}

export interface GetLoginCaptchaResp {
  captcha?: Maybe<Scalars['String']>
  captchaUuid?: Maybe<Scalars['String']>
}

export interface GetTwoFactorAuthenticationSecretResp {
  uuid?: Maybe<Scalars['String']>
  secret?: Maybe<Scalars['String']>
  userUuid?: Maybe<Scalars['String']>
  userType?: Maybe<Scalars['String']>
  createDate?: Maybe<Scalars['String']>
  lastOpDate?: Maybe<Scalars['String']>
  status?: Maybe<TwoFactorAuthenticationSecretStatus>
}

export enum TwoFactorAuthenticationSecretStatus {
  NewCreated = 'NewCreated',
  Logined = 'Logined'
}

export interface LogOutResp {
  sessionId?: Maybe<Scalars['String']>
}

export interface ValidatePassword {
  deleteAble?: Maybe<Scalars['Boolean']>
}

export interface CephPrimaryStoragePool {
  uuid: Scalars['String']
  aliasName?: Maybe<Scalars['String']>
  availableCapacity?: Maybe<Scalars['Float']>
  createDate?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  lastOpDate?: Maybe<Scalars['String']>
  poolName?: Maybe<Scalars['String']>
  primaryStorageUuid?: Maybe<Scalars['String']>
  replicatedSize?: Maybe<Scalars['String']>
  totalCapacity?: Maybe<Scalars['Float']>
  type?: Maybe<Scalars['String']>
  usedCapacity?: Maybe<Scalars['Float']>
}

export interface CephPrimaryStoragePoolList {
  list?: Maybe<Array<CephPrimaryStoragePool>>
  total: Scalars['Float']
  error?: Maybe<ActionError>
}

export interface CephPrimaryStorageMon {
  createDate?: Maybe<Scalars['String']>
  lastOpDate?: Maybe<Scalars['String']>
  hostname?: Maybe<Scalars['String']>
  monAddr?: Maybe<Scalars['String']>
  monPort?: Maybe<Scalars['String']>
  monUuid?: Maybe<Scalars['String']>
  primaryStorageUuid?: Maybe<Scalars['String']>
  sshPassword?: Maybe<Scalars['String']>
  sshPort?: Maybe<Scalars['String']>
  sshUsername?: Maybe<Scalars['String']>
  status?: Maybe<Scalars['String']>
}

export interface PrimaryStorageSystemTag {
  nocephx?: Maybe<Scalars['Boolean']>
  thinProvision?: Maybe<Scalars['Boolean']>
  thinProvisionUuid?: Maybe<Scalars['String']>
  gatewayCidr?: Maybe<Scalars['String']>
  rootVolumePoolName?: Maybe<Scalars['String']>
  dataVolumePoolName?: Maybe<Scalars['String']>
  imageCachePoolName?: Maybe<Scalars['String']>
}

export interface SharedBlocks {
  uuid?: Maybe<Scalars['String']>
  name?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  createDate?: Maybe<Scalars['String']>
  lastOpDate?: Maybe<Scalars['String']>
  diskUuid?: Maybe<Scalars['String']>
  sharedBlockGroupUuid?: Maybe<Scalars['String']>
  state?: Maybe<Scalars['String']>
  status?: Maybe<Scalars['String']>
}

export interface PrimaryStorage {
  uuid: Scalars['String']
  name?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  createDate?: Maybe<Scalars['String']>
  lastOpDate?: Maybe<Scalars['String']>
  attachedClusterUuids?: Maybe<Array<Scalars['String']>>
  availableCapacity?: Maybe<Scalars['Float']>
  availablePhysicalCapacity?: Maybe<Scalars['Float']>
  fsid?: Maybe<Scalars['String']>
  mons?: Maybe<Array<CephPrimaryStorageMon>>
  mountPath?: Maybe<Scalars['String']>
  vCenterUuid?: Maybe<Scalars['String']>
  pools?: Maybe<Array<CephPrimaryStoragePool>>
  sharedBlockGroupType?: Maybe<SharedBlockGroupType>
  sharedBlocks?: Maybe<SharedBlocks>
  state?: Maybe<PrimaryStorageState>
  status?: Maybe<PrimaryStorageStatus>
  systemUsedCapacity?: Maybe<Scalars['Float']>
  totalCapacity?: Maybe<Scalars['Float']>
  totalPhysicalCapacity?: Maybe<Scalars['Float']>
  type?: Maybe<Scalars['String']>
  vmInstanceCount?: Maybe<Scalars['Int']>
  volumeCount?: Maybe<Scalars['Int']>
  baremetal2InstancesCount?: Maybe<Scalars['Int']>
  url?: Maybe<Scalars['String']>
  zoneUuid?: Maybe<Scalars['String']>
}

export enum SharedBlockGroupType {
  LvmVolumeGroupBasic = 'LvmVolumeGroupBasic'
}

export enum PrimaryStorageState {
  Enabled = 'Enabled',
  Disabled = 'Disabled',
  Maintenance = 'Maintenance',
  Deleting = 'Deleting'
}

export enum PrimaryStorageStatus {
  Connecting = 'Connecting',
  Connected = 'Connected',
  Disconnected = 'Disconnected'
}

export interface Expired {
  isExpired?: Maybe<Scalars['Boolean']>
  dayDifference?: Maybe<Scalars['Int']>
}

export interface PrimaryStorageVO {
  uuid: Scalars['String']
  name?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  createDate?: Maybe<Scalars['String']>
  lastOpDate?: Maybe<Scalars['String']>
  attachedClusterUuids?: Maybe<Array<Scalars['String']>>
  availableCapacity?: Maybe<Scalars['Float']>
  availablePhysicalCapacity?: Maybe<Scalars['Float']>
  fsid?: Maybe<Scalars['String']>
  mons?: Maybe<Array<CephPrimaryStorageMon>>
  mountPath?: Maybe<Scalars['String']>
  vCenterUuid?: Maybe<Scalars['String']>
  pools?: Maybe<Array<CephPrimaryStoragePool>>
  sharedBlockGroupType?: Maybe<SharedBlockGroupType>
  sharedBlocks?: Maybe<SharedBlocks>
  state?: Maybe<PrimaryStorageState>
  status?: Maybe<PrimaryStorageStatus>
  systemUsedCapacity?: Maybe<Scalars['Float']>
  totalCapacity?: Maybe<Scalars['Float']>
  totalPhysicalCapacity?: Maybe<Scalars['Float']>
  type?: Maybe<Scalars['String']>
  vmInstanceCount: Scalars['Int']
  volumeCount: Scalars['Int']
  baremetal2InstancesCount: Scalars['Int']
  url?: Maybe<Scalars['String']>
  zoneUuid?: Maybe<Scalars['String']>
  systemTag?: Maybe<PrimaryStorageSystemTag>
  zone?: Maybe<Zone>
  expired?: Maybe<Expired>
}

export interface PrimaryStorageQueryResp {
  list?: Maybe<Array<PrimaryStorageVO>>
  total?: Maybe<Scalars['Float']>
}

export interface PraimayStorageLabels {
  PrimaryStorageUuid: Scalars['String']
}

export interface PrimaryStorageMetricData {
  time: Scalars['Float']
  value?: Maybe<Scalars['Float']>
  type?: Maybe<Scalars['String']>
  metricName?: Maybe<Scalars['String']>
  labels: PraimayStorageLabels
}

export interface PrimaryStorageRelatedSummary {
  vmInstance: Scalars['Int']
  volume: Scalars['Int']
  cluster: Scalars['Int']
  baremetal2Cluster: Scalars['Int']
  host: Scalars['Int']
  sharedBlock: Scalars['Int']
}

export interface PrimaryStorageRelatedClusterSummary {
  vmCount: Scalars['Int']
  vmOnNetworkCount: Scalars['Int']
  vpcVrouterCount: Scalars['Int']
  volumeCount: Scalars['Int']
}

export interface PrimaryStorageRelatedBaremetal2ClusterSummary {
  baremetal2InstanceCount: Scalars['Int']
  volumeCount: Scalars['Int']
}

export interface TrashOnPrimaryStorage {
  resourceUuid: Scalars['String']
  resourceType: Scalars['String']
  trashType?: Maybe<TrashType>
}

export enum TrashType {
  MigrateVolume = 'MigrateVolume',
  MigrateImage = 'MigrateImage',
  MigrateVolumeSnapshot = 'MigrateVolumeSnapshot',
  RevertVolume = 'RevertVolume',
  VolumeSnapshot = 'VolumeSnapshot',
  ReimageVolume = 'ReimageVolume'
}

export interface TrashOnPrimaryStorageResp {
  list?: Maybe<Array<TrashOnPrimaryStorage>>
}

export interface TagOwner {
  uuid: Scalars['String']
  type: Scalars['String']
  name: Scalars['String']
}

export interface Tag {
  uuid: Scalars['String']
  name?: Maybe<Scalars['String']>
  ownerUuid?: Maybe<Scalars['String']>
  owner?: Maybe<TagOwner>
  ordinal?: Maybe<Scalars['String']>
  value?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  color?: Maybe<Scalars['String']>
  createDate?: Maybe<Scalars['String']>
  lastOpDate?: Maybe<Scalars['String']>
  type?: Maybe<Scalars['String']>
  count: ResourceCount
}

export interface ResourceCount {
  num?: Maybe<Scalars['Int']>
}

export interface TagRelatedSummary {
  host?: Maybe<Scalars['Int']>
  vm?: Maybe<Scalars['Int']>
  volume?: Maybe<Scalars['Int']>
  baremetalInstance?: Maybe<Scalars['Int']>
  baremetal2Instance?: Maybe<Scalars['Int']>
  monitorGroup?: Maybe<Scalars['Int']>
  monitorTemplate?: Maybe<Scalars['Int']>
}

export interface SystemTag {
  uuid: Scalars['String']
  resourceUuid?: Maybe<Scalars['String']>
  resourceType?: Maybe<Scalars['String']>
  tag?: Maybe<Scalars['String']>
  type?: Maybe<Scalars['String']>
  lastOpDate?: Maybe<Scalars['String']>
  createDate?: Maybe<Scalars['String']>
  inherent?: Maybe<Scalars['Boolean']>
}

export interface TagPattern {
  color?: Maybe<Scalars['String']>
  createDate?: Maybe<Scalars['String']>
  lastOpDate?: Maybe<Scalars['String']>
  name?: Maybe<Scalars['String']>
  type?: Maybe<Scalars['String']>
  uuid?: Maybe<Scalars['String']>
  value?: Maybe<Scalars['String']>
}

export interface UserTag {
  createDate?: Maybe<Scalars['String']>
  lastOpDate?: Maybe<Scalars['String']>
  resourceType?: Maybe<Scalars['String']>
  resourceUuid?: Maybe<Scalars['String']>
  tag?: Maybe<Scalars['String']>
  tagPattern?: Maybe<TagPattern>
  tagPatternUuid?: Maybe<Scalars['String']>
  type?: Maybe<Scalars['String']>
  uuid?: Maybe<Scalars['ID']>
}

export interface TagQueryResp {
  list?: Maybe<Array<Tag>>
  total?: Maybe<Scalars['Float']>
}

export interface Host {
  uuid: Scalars['ID']
  name?: Maybe<Scalars['String']>
  username?: Maybe<Scalars['String']>
  managementIp?: Maybe<Scalars['String']>
  hypervisorType?: Maybe<Scalars['String']>
  sshPort?: Maybe<Scalars['Int']>
  description?: Maybe<Scalars['String']>
  status?: Maybe<HostStatus>
  state?: Maybe<HostState>
  clusterUuid?: Maybe<Scalars['String']>
  zoneUuid?: Maybe<Scalars['String']>
  createDate?: Maybe<Scalars['String']>
  lastOpDate?: Maybe<Scalars['String']>
  availableCpuCapacity?: Maybe<Scalars['Float']>
  availableMemoryCapacity?: Maybe<Scalars['Float']>
  cpuNum?: Maybe<Scalars['Float']>
  cpuSockets?: Maybe<Scalars['Float']>
  totalCpuCapacity?: Maybe<Scalars['Float']>
  totalMemoryCapacity?: Maybe<Scalars['Float']>
  totalPhysicalMemory?: Maybe<Scalars['Float']>
  systemTags?: Maybe<Array<Scalars['String']>>
}

export enum HostStatus {
  Connecting = 'Connecting',
  Connected = 'Connected',
  Disconnected = 'Disconnected'
}

export enum HostState {
  Enabled = 'Enabled',
  Disabled = 'Disabled',
  PreMaintenance = 'PreMaintenance',
  Maintenance = 'Maintenance'
}

export interface LocalStorageHostDiskCapacity {
  availableCapacity?: Maybe<Scalars['Float']>
  availablePhysicalCapacity?: Maybe<Scalars['Float']>
  totalCapacity?: Maybe<Scalars['Float']>
  totalPhysicalCapacity?: Maybe<Scalars['Float']>
  hostUuid?: Maybe<Scalars['String']>
}

export interface HostIommu {
  state?: Maybe<Scalars['String']>
  status?: Maybe<Scalars['String']>
}

export interface HostSystemInfo {
  cpuModelName?: Maybe<Scalars['String']>
  hostCpuModelName?: Maybe<Scalars['String']>
  release?: Maybe<Scalars['String']>
  ept?: Maybe<Scalars['Boolean']>
  eptUuid?: Maybe<Scalars['String']>
  version?: Maybe<Scalars['String']>
  distribution?: Maybe<Scalars['String']>
}

export interface HostGlobalConfig {
  provisioningTotalMeory?: Maybe<Scalars['Float']>
  reservedMemory?: Maybe<Scalars['String']>
  availableCpuMemoryCapacity?: Maybe<Scalars['Float']>
}

export interface HostZWatchInfo {
  cpuAllIdleUtilization?: Maybe<Scalars['String']>
  memoryFreeInPercent?: Maybe<Scalars['String']>
}

export interface HostVO {
  uuid: Scalars['ID']
  name?: Maybe<Scalars['String']>
  username?: Maybe<Scalars['String']>
  managementIp?: Maybe<Scalars['String']>
  hypervisorType?: Maybe<Scalars['String']>
  sshPort?: Maybe<Scalars['Int']>
  description?: Maybe<Scalars['String']>
  status?: Maybe<HostStatus>
  state?: Maybe<HostState>
  clusterUuid?: Maybe<Scalars['String']>
  zoneUuid?: Maybe<Scalars['String']>
  createDate?: Maybe<Scalars['String']>
  lastOpDate?: Maybe<Scalars['String']>
  availableCpuCapacity?: Maybe<Scalars['Float']>
  availableMemoryCapacity?: Maybe<Scalars['Float']>
  cpuNum?: Maybe<Scalars['Float']>
  cpuSockets?: Maybe<Scalars['Float']>
  totalCpuCapacity?: Maybe<Scalars['Float']>
  totalMemoryCapacity?: Maybe<Scalars['Float']>
  totalPhysicalMemory?: Maybe<Scalars['Float']>
  systemTags?: Maybe<Array<Scalars['String']>>
  globalConifg?: Maybe<HostGlobalConfig>
  cluster?: Maybe<Cluster>
  tag?: Maybe<Array<Tag>>
  owner?: Maybe<AccountOwner>
  zone?: Maybe<Zone>
  localStorageHostDiskCapacity?: Maybe<LocalStorageHostDiskCapacity>
  hostSystemInfo?: Maybe<HostSystemInfo>
  hostIommu?: Maybe<HostIommu>
  hostZWatchInfo?: Maybe<HostZWatchInfo>
  relatedVmCount?: Maybe<Scalars['Int']>
  relatedVolumeCount?: Maybe<Scalars['Int']>
  extraIps?: Maybe<Scalars['String']>
}

export interface HostSummary {
  total?: Maybe<Scalars['Int']>
  enabled?: Maybe<Scalars['Int']>
  disabled?: Maybe<Scalars['Int']>
  maintenance?: Maybe<Scalars['Int']>
  other?: Maybe<Scalars['Int']>
  connected: Scalars['Int']
  disconnected: Scalars['Int']
}

export interface HostQueryResp {
  list?: Maybe<Array<HostVO>>
  total?: Maybe<Scalars['Float']>
}

export interface HostLabels {
  HostUuid: Scalars['String']
  CPUNum?: Maybe<Scalars['String']>
  NetworkDeviceLetter?: Maybe<Scalars['String']>
  DiskDeviceLetter?: Maybe<Scalars['String']>
}

export interface HostMetricData {
  time: Scalars['Float']
  value?: Maybe<Scalars['Float']>
  type?: Maybe<Scalars['String']>
  metricName?: Maybe<Scalars['String']>
  labels: HostLabels
}

export interface HostRelatedSummary {
  vm: Scalars['Int']
  scsiLun: Scalars['Int']
  physicalNic: Scalars['Int']
  gpu: Scalars['Int']
  vGpu: Scalars['Int']
  usb: Scalars['Int']
  pci: Scalars['Int']
}

export interface IpCapacityInProvisionNetwork {
  availableCapacity?: Maybe<Scalars['Float']>
  totalCapacity?: Maybe<Scalars['Float']>
  instanceUsedIpNumber?: Maybe<Scalars['Float']>
  gatewayUsedIpNumber?: Maybe<Scalars['Float']>
}

export interface ProvisionNetwork {
  name: Scalars['String']
  uuid: Scalars['ID']
  zoneUuid?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  dhcpInterface?: Maybe<Scalars['String']>
  dhcpRangeGateway?: Maybe<Scalars['String']>
  dhcpRangeEndIp?: Maybe<Scalars['String']>
  dhcpRangeNetworkCidr?: Maybe<Scalars['String']>
  dhcpRangeNetmask?: Maybe<Scalars['String']>
  dhcpRangeStartIp?: Maybe<Scalars['String']>
  state?: Maybe<Scalars['String']>
  createDate?: Maybe<Scalars['String']>
  lastOpDate?: Maybe<Scalars['String']>
  attachedClusterUuids?: Maybe<Array<Scalars['String']>>
  ipCapacity?: Maybe<IpCapacityInProvisionNetwork>
}

export interface QueryProvisionNetworkResp {
  list: Array<ProvisionNetwork>
  total?: Maybe<Scalars['Float']>
}

export interface CpuMemoryCapacity {
  totalCpu?: Maybe<Scalars['Int']>
  availableCpu?: Maybe<Scalars['Int']>
  physicalCpu?: Maybe<Scalars['Int']>
  totalMemory?: Maybe<Scalars['Float']>
  availableMemory?: Maybe<Scalars['Float']>
}

export interface Cluster {
  uuid: Scalars['ID']
  name: Scalars['String']
  description?: Maybe<Scalars['String']>
  type?: Maybe<Scalars['String']>
  vtepCidr?: Maybe<Scalars['String']>
  state?: Maybe<ClusterState>
  createDate?: Maybe<Scalars['String']>
  hypervisorType?: Maybe<Scalars['String']>
  lastOpDate?: Maybe<Scalars['String']>
  zoneUuid?: Maybe<Scalars['ID']>
  hostNum?: Maybe<Scalars['Int']>
  hostList?: Maybe<Array<Host>>
  isAttachL2network?: Maybe<Scalars['Boolean']>
  isAttachPrimaryStorage?: Maybe<Scalars['Boolean']>
  isMaintenanceOfAllHost?: Maybe<Scalars['Boolean']>
  isShowDrsTab?: Maybe<Scalars['Boolean']>
  isSupported?: Maybe<Scalars['Boolean']>
  vmInstanceList?: Maybe<Array<VmInstance>>
  psTypes?: Maybe<Array<Scalars['String']>>
  cpuMemoryCapacity?: Maybe<CpuMemoryCapacity>
  provisioningTotalMeory?: Maybe<Scalars['Float']>
  totalVm?: Maybe<Scalars['Int']>
  runningVm?: Maybe<Scalars['Int']>
  destroyedVm?: Maybe<Scalars['Int']>
  stoppedVm?: Maybe<Scalars['Int']>
  checkCpuModel?: Maybe<Scalars['String']>
  checkCpuModelId?: Maybe<Scalars['ID']>
  clusterKVMCpuModel?: Maybe<Scalars['String']>
  displayNetworkCidr?: Maybe<Scalars['String']>
  migrateNetworkCidr?: Maybe<Scalars['String']>
  zone?: Maybe<Zone>
  primaryStorageCount: Scalars['Int']
  l2NetworkCount?: Maybe<Scalars['Int']>
  vmInstanceCount?: Maybe<Scalars['Int']>
  volumeCount?: Maybe<Scalars['Int']>
  /** 裸金属设备数量 */
  baremetalChassisNum?: Maybe<Scalars['Int']>
  /** 是否已加载部署服务器 */
  isAttachBaremetalPxeServer?: Maybe<Scalars['Boolean']>
  /** 弹性裸金属节点（设备）数量 */
  baremetal2ChassisNum?: Maybe<Scalars['Int']>
  /** 弹性网关节点数量 */
  baremetal2GatewayNum?: Maybe<Scalars['Int']>
  architecture?: Maybe<Scalars['String']>
  vCenterUuid?: Maybe<Scalars['String']>
  vCenter?: Maybe<VCenter>
  provisionNetwork?: Maybe<ProvisionNetwork>
}

export enum ClusterState {
  Enabled = 'Enabled',
  Disabled = 'Disabled'
}

export interface Thresholds {
  operator?: Maybe<Scalars['String']>
  thresholdName?: Maybe<Scalars['String']>
  thresholdValue?: Maybe<Scalars['String']>
}

export interface DRS {
  uuid: Scalars['ID']
  name: Scalars['String']
  description?: Maybe<Scalars['String']>
  createDate?: Maybe<Scalars['String']>
  lastOpDate?: Maybe<Scalars['String']>
  automationLevel?: Maybe<Scalars['String']>
  balancedState?: Maybe<Scalars['String']>
  clusterUuid?: Maybe<Scalars['String']>
  state?: Maybe<ClusterState>
  thresholdDuration?: Maybe<Scalars['Int']>
  thresholds?: Maybe<Array<Thresholds>>
}

export interface DRSAdvice {
  uuid: Scalars['ID']
  adviceUuid?: Maybe<Scalars['String']>
  adviceGropUuid?: Maybe<Scalars['String']>
  drsUuid?: Maybe<Scalars['String']>
  createDate?: Maybe<Scalars['String']>
  endDate?: Maybe<Scalars['String']>
  status?: Maybe<Scalars['String']>
  vmUuid?: Maybe<Scalars['String']>
  vm?: Maybe<VmInstance>
  vmSourceHostUuid?: Maybe<Scalars['String']>
  vmSourceHost?: Maybe<Host>
  vmTargetHostUuid?: Maybe<Scalars['String']>
  vmTargetHost?: Maybe<Host>
  reason?: Maybe<Scalars['String']>
}

export interface VmMigrationActivity {
  uuid: Scalars['ID']
  vmUuid?: Maybe<Scalars['String']>
  vmSourceHostUuid?: Maybe<Scalars['String']>
  vmTargetHostUuid?: Maybe<Scalars['String']>
  adviceUuid?: Maybe<Scalars['String']>
  adviceGropUuid?: Maybe<Scalars['String']>
  drsUuid?: Maybe<Scalars['String']>
  createDate?: Maybe<Scalars['String']>
  endDate?: Maybe<Scalars['String']>
  status?: Maybe<Scalars['String']>
}

export interface L2NetworkInventory {
  uuid?: Maybe<Scalars['ID']>
  name?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  zoneUuid?: Maybe<Scalars['ID']>
  physicalInterface?: Maybe<Scalars['String']>
  type?: Maybe<Scalars['String']>
  attachedClusterUuids?: Maybe<Array<Scalars['String']>>
}

export interface QueryClusterResp {
  list?: Maybe<Array<Cluster>>
  total?: Maybe<Scalars['Float']>
}

export interface QueryClusterDRSResp {
  list?: Maybe<Array<DRS>>
  total?: Maybe<Scalars['Float']>
}

export interface QueryDRSAdviceResp {
  list?: Maybe<Array<DRSAdvice>>
  total?: Maybe<Scalars['Float']>
}

export interface QueryVmMigrationActivityResp {
  list?: Maybe<Array<VmMigrationActivity>>
  total?: Maybe<Scalars['Float']>
}

export interface CreateClusterInven {
  uuid?: Maybe<Scalars['ID']>
  name?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  type?: Maybe<Scalars['String']>
  state?: Maybe<ClusterState>
  createDate?: Maybe<Scalars['String']>
  hypervisorType?: Maybe<Scalars['String']>
  lastOpDate?: Maybe<Scalars['String']>
  zoneUuid?: Maybe<Scalars['ID']>
}

export interface ClusterRelatedSummary {
  vm: Scalars['Int']
  host: Scalars['Int']
  primaryStorage: Scalars['Int']
  iscsiServer: Scalars['Int']
  l2Network: Scalars['Int']
  physicalNic: Scalars['Int']
  gpu: Scalars['Int']
  vGpu: Scalars['Int']
  usb: Scalars['Int']
  /** 其他设备数量 */
  pci: Scalars['Int']
}

export interface Baremetal2ClusterRelatedSummary {
  gateway: Scalars['Int']
  primaryStorage: Scalars['Int']
  l2Network: Scalars['Int']
  baremetalNode: Scalars['Int']
}

export interface ClusterSummaryQueryResp {
  clusterCount: Scalars['Int']
  baremetalCount: Scalars['Int']
  baremetal2Count: Scalars['Int']
}

export interface ValidatInstanceOfferingUserConfigResp {
  valid: Scalars['Boolean']
  /** 错误内容 */
  error?: Maybe<Scalars['String']>
}

export interface InstanceOfferingSystemTags {
  volumeTotalBandwidth?: Maybe<Scalars['String']>
  volumeReadBandwidth?: Maybe<Scalars['String']>
  volumeWriteBandwidth?: Maybe<Scalars['String']>
  networkOutboundBandwidth?: Maybe<Scalars['String']>
  networkInboundBandwidth?: Maybe<Scalars['String']>
  instanceOfferingUserConfig?: Maybe<Scalars['String']>
  maxInstancePerHost?: Maybe<Scalars['String']>
  minimumCPUUsageHostAllocatorStrategyMode?: Maybe<Scalars['String']>
  minimumMemoryUsageHostAllocatorStrategyMode?: Maybe<Scalars['String']>
}

export interface InstanceOffering {
  uuid: Scalars['String']
  name: Scalars['String']
  description?: Maybe<Scalars['String']>
  cpuNum: Scalars['Int']
  cpuSpeed?: Maybe<Scalars['Int']>
  memorySize: Scalars['Float']
  shareType: ShareType
  allocatorStrategy: AllocatorStrategyType
  type?: Maybe<Scalars['String']>
  sortKey?: Maybe<Scalars['Int']>
  createDate: Scalars['String']
  lastOpDate?: Maybe<Scalars['String']>
  state: Scalars['String']
  toPublic?: Maybe<Scalars['Boolean']>
  systemTags: InstanceOfferingSystemTags
}

export enum AllocatorStrategyType {
  LeastVmPreferredHostAllocatorStrategy = 'LeastVmPreferredHostAllocatorStrategy',
  MinimumCPUUsageHostAllocatorStrategy = 'MinimumCPUUsageHostAllocatorStrategy',
  MinimumMemoryUsageHostAllocatorStrategy = 'MinimumMemoryUsageHostAllocatorStrategy',
  MaxInstancePerHostHostAllocatorStrategy = 'MaxInstancePerHostHostAllocatorStrategy',
  LastHostPreferredAllocatorStrategy = 'LastHostPreferredAllocatorStrategy',
  DefaultHostAllocatorStrategy = 'DefaultHostAllocatorStrategy'
}

export interface InstanceOfferingQueryResp {
  list?: Maybe<Array<InstanceOffering>>
  total?: Maybe<Scalars['Float']>
}

export interface InstanceOfferingActionResp {
  inventory?: Maybe<InstanceOffering>
  error?: Maybe<ActionError>
}

export interface VirtualRouterOffering {
  name: Scalars['String']
  uuid: Scalars['ID']
  cpuNum: Scalars['Int']
  cpuSpeed?: Maybe<Scalars['Int']>
  memorySize: Scalars['Float']
  type?: Maybe<Scalars['String']>
  /** 排序主键 */
  sortKey?: Maybe<Scalars['Int']>
  /** 分配策略 */
  allocatorStrategy?: Maybe<Scalars['String']>
  createDate: Scalars['String']
  lastOpDate: Scalars['String']
  state: Scalars['String']
  /** 区域UUID */
  zoneUuid: Scalars['String']
  isDefault?: Maybe<Scalars['Boolean']>
  /** 是否全局共享 */
  toPublic: Scalars['Boolean']
  shareType: ShareType
  description?: Maybe<Scalars['String']>
  /** 管理L3网络UUID */
  managementNetworkUuid?: Maybe<Scalars['String']>
  /** 管理L3网络 */
  managementNetwork?: Maybe<L3Network>
  /** 公有L3网络UUID */
  publicNetworkUuid: Scalars['String']
  /** 公有L3网络 */
  publicNetwork?: Maybe<L3Network>
  /** 镜像UUID */
  imageUuid?: Maybe<Scalars['String']>
  /** 镜像 */
  image?: Maybe<Image>
}

export interface VirtualRouterOfferingQueryResp {
  list?: Maybe<Array<VirtualRouterOffering>>
  total?: Maybe<Scalars['Float']>
}

export interface BackupDataFormImageStorage {
  name?: Maybe<Scalars['String']>
  version?: Maybe<Scalars['String']>
  createdTime: Scalars['String']
  md5?: Maybe<Scalars['String']>
  installPath?: Maybe<Scalars['String']>
  uuid: Scalars['ID']
}

export interface BackupDataFormImageStorageResp {
  list?: Maybe<Array<BackupDataFormImageStorage>>
  total?: Maybe<Scalars['Float']>
}

export interface IpCapacity {
  totalCapacity?: Maybe<Scalars['Float']>
  availableCapacity?: Maybe<Scalars['Float']>
  ipv4AvailableCapacity?: Maybe<Scalars['Float']>
  ipv4TotalCapacity?: Maybe<Scalars['Float']>
  ipv6AvailableCapacity?: Maybe<Scalars['Float']>
  ipv6TotalCapacity?: Maybe<Scalars['Float']>
  ipv4UsedIpAddressNumber?: Maybe<Scalars['Float']>
}

export interface CheckIpAvailabilityResult {
  available: Scalars['Boolean']
}

export interface GetFreeIpOfL3NetworkResult {
  ipv4List?: Maybe<Array<Scalars['String']>>
  ipv6List?: Maybe<Array<Scalars['String']>>
}

export interface IpRange {
  uuid: Scalars['String']
  name?: Maybe<Scalars['String']>
  ipRangeType?: Maybe<Scalars['String']>
  /** ip可用量 */
  ipCapacity?: Maybe<IpCapacity>
  l3NetworkUuid?: Maybe<Scalars['String']>
  gateway?: Maybe<Scalars['String']>
  netmask?: Maybe<Scalars['String']>
  networkCidr?: Maybe<Scalars['String']>
  prefixLen?: Maybe<Scalars['String']>
  addressMode?: Maybe<Scalars['String']>
  startIp?: Maybe<Scalars['String']>
  endIp?: Maybe<Scalars['String']>
  createDate?: Maybe<Scalars['String']>
  ipVersion?: Maybe<Scalars['Int']>
  shareType: ShareType
}

export interface IpRangeListResp {
  list: Array<IpRange>
  total?: Maybe<Scalars['Float']>
}

export interface IpRangeCountResp {
  ipv4Num: Scalars['Int']
  ipv6Num: Scalars['Int']
}

export interface IpStatistics {
  ip?: Maybe<Scalars['String']>
  vipUuid?: Maybe<Scalars['String']>
  vipName?: Maybe<Scalars['String']>
  vmInstanceUuid?: Maybe<Scalars['String']>
  vmInstanceName?: Maybe<Scalars['String']>
  vmInstanceType?: Maybe<Scalars['String']>
  vmDefaultIp?: Maybe<Scalars['String']>
  state?: Maybe<Scalars['String']>
  useFor?: Maybe<Scalars['String']>
  createDate?: Maybe<Scalars['String']>
  ownerName?: Maybe<Scalars['String']>
  resourceTypes?: Maybe<Array<Scalars['String']>>
}

export interface IError {
  code?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  details?: Maybe<Scalars['String']>
  cause?: Maybe<Scalars['Int']>
}

export interface GetL3NetworkIpStatisticResult {
  list?: Maybe<Array<IpStatistics>>
  total?: Maybe<Scalars['Int']>
  error?: Maybe<IError>
}

export interface SchedulerTrigger {
  uuid: Scalars['String']
  name?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  jobsUuid?: Maybe<Array<Scalars['String']>>
  /** 定时器类型 */
  schedulerType?: Maybe<SchedulerType>
  schedulerInterval?: Maybe<Scalars['Int']>
  repeatCount?: Maybe<Scalars['Int']>
  cron?: Maybe<Scalars['String']>
  startTime?: Maybe<Scalars['String']>
  stopTime?: Maybe<Scalars['String']>
  createDate?: Maybe<Scalars['String']>
  lastOpDate?: Maybe<Scalars['String']>
  state?: Maybe<Scalars['String']>
  owner?: Maybe<AccountInfo>
}

export enum SchedulerType {
  simple = 'simple',
  cron = 'cron'
}

export interface SchedulerTriggerList {
  list: Array<SchedulerTrigger>
  total: Scalars['Int']
  error?: Maybe<ActionError>
}

export interface AccountInfo {
  name: Scalars['String']
  uuid: Scalars['String']
  type: Scalars['String']
}

export interface SchedulerJob {
  /** 资源的UUID，唯一标示该资源 */
  uuid: Scalars['String']
  /** 资源名称 */
  name: Scalars['String']
  /** 资源的详细描述 */
  description?: Maybe<Scalars['String']>
  targetResourceUuid: Scalars['String']
  triggersUuid: Array<Scalars['String']>
  /** 启用状态 */
  state: SchedulerJobState
  /** 创建日期 */
  createDate: Scalars['String']
  lastOpDate: Scalars['String']
  jobData: Scalars['String']
  jobClassName: Scalars['String']
  /** 定时器 */
  schedulerTrigger?: Maybe<SchedulerTrigger>
  owner?: Maybe<AccountInfo>
  vmInstance?: Maybe<VmInstance>
  volume?: Maybe<Volume>
  localBackupStorage?: Maybe<Array<BackupStorage>>
  remoteBackupStorage?: Maybe<BackupStorage>
}

export enum SchedulerJobState {
  Enabled = 'Enabled',
  Disabled = 'Disabled'
}

export interface SchedulerJobList {
  list: Array<SchedulerJob>
  total: Scalars['Int']
  error?: Maybe<ActionError>
}

export interface VxlanPoolRelatedResource {
  vxlan: Scalars['Int']
  cluster: Scalars['Int']
}

export interface VniRange {
  uuid: Scalars['String']
  name: Scalars['String']
  startVni?: Maybe<Scalars['String']>
  endVni?: Maybe<Scalars['String']>
  createDate?: Maybe<Scalars['String']>
}

export interface AttachedVtepRefsType {
  vtepIp?: Maybe<Scalars['String']>
  uuid?: Maybe<Scalars['String']>
  port?: Maybe<Scalars['String']>
  type?: Maybe<Scalars['String']>
  createDate?: Maybe<Scalars['String']>
  hostUuid?: Maybe<Scalars['String']>
  poolUuid?: Maybe<Scalars['String']>
  host: Host
}

export interface AttachedVxlanNetworkRefsType {
  uuid?: Maybe<Scalars['String']>
  name?: Maybe<Scalars['String']>
  type?: Maybe<Scalars['String']>
  vni?: Maybe<Scalars['String']>
  createDate?: Maybe<Scalars['String']>
}

export interface VxlanPool {
  uuid: Scalars['String']
  name: Scalars['String']
  description?: Maybe<Scalars['String']>
  shareType: ShareType
  physicalInterface?: Maybe<Scalars['String']>
  attachedVxlanNetworkRefs?: Maybe<Array<AttachedVxlanNetworkRefsType>>
  type?: Maybe<Scalars['String']>
  zoneUuid?: Maybe<Scalars['String']>
  attachedClusterUuids?: Maybe<Array<Scalars['String']>>
  attachedCidr?: Maybe<Array<Scalars['String']>>
  attachedVtep?: Maybe<Array<AttachedVtepRefsType>>
  vlan?: Maybe<Scalars['Int']>
  createDate?: Maybe<Scalars['String']>
  lastOpDate?: Maybe<Scalars['String']>
  attachedVtepRefs?: Maybe<Array<AttachedVtepRefsType>>
}

export interface VxlanPoolQueryResp {
  list?: Maybe<Array<VxlanPool>>
  total?: Maybe<Scalars['Int']>
}

export interface VxlanPoolQueryVtepResp {
  list?: Maybe<Array<AttachedVtepRefsType>>
  total?: Maybe<Scalars['Int']>
}

export interface VniRangeResp {
  list?: Maybe<Array<VniRange>>
  total?: Maybe<Scalars['Int']>
}

export interface VCenterInL2Network {
  uuid?: Maybe<Scalars['String']>
  name?: Maybe<Scalars['String']>
}

export interface VCenterRef {
  vCenterUuid?: Maybe<Scalars['String']>
  vCenter?: Maybe<VCenterInL2Network>
}

export interface L2Network {
  uuid: Scalars['String']
  name: Scalars['String']
  description?: Maybe<Scalars['String']>
  poolUuid?: Maybe<Scalars['String']>
  zoneUuid?: Maybe<Scalars['String']>
  physicalInterface?: Maybe<Scalars['String']>
  type?: Maybe<l2NetworkType>
  vni?: Maybe<Scalars['String']>
  vlan?: Maybe<Scalars['String']>
  createDate?: Maybe<Scalars['String']>
  lastOpDate?: Maybe<Scalars['String']>
  enableSRIOV?: Maybe<Scalars['Boolean']>
  shareType: ShareType
  attachedClusterUuids?: Maybe<Array<Scalars['String']>>
  owner?: Maybe<AccountInfo>
  zone?: Maybe<Zone>
  clusters?: Maybe<Array<Cluster>>
  vxlanPool?: Maybe<VxlanPool>
  vCenterRef?: Maybe<VCenterRef>
}

export enum l2NetworkType {
  L2NoVlanNetwork = 'L2NoVlanNetwork',
  L2VlanNetwork = 'L2VlanNetwork',
  VxlanNetwork = 'VxlanNetwork',
  HardwareVxlanNetwork = 'HardwareVxlanNetwork',
  VxlanNetworkPool = 'VxlanNetworkPool'
}

export interface L2NetworkQueryResp {
  list?: Maybe<Array<L2Network>>
  total?: Maybe<Scalars['Float']>
}

export interface NetworkServiceProvider {
  attachedL2NetworkUuids?: Maybe<Array<Scalars['String']>>
  networkServiceTypes?: Maybe<Array<Scalars['String']>>
  name?: Maybe<Scalars['String']>
  uuid?: Maybe<Scalars['String']>
  createDate?: Maybe<Scalars['String']>
  lastOpDate?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  type?: Maybe<Scalars['String']>
}

export interface NetworkServices {
  l3NetworkUuid?: Maybe<Scalars['String']>
  networkServiceProviderUuid?: Maybe<Scalars['String']>
  networkServiceType?: Maybe<Scalars['String']>
  networkServiceProvider?: Maybe<NetworkServiceProvider>
}

export interface DhcpIp {
  ipv4?: Maybe<Scalars['String']>
  ipv6?: Maybe<Scalars['String']>
}

export interface L3Owner {
  uuid: Scalars['String']
  name: Scalars['String']
  type: Scalars['String']
}

export interface L3VpcVRouter {
  uuid: Scalars['String']
  name: Scalars['String']
}

export interface L3Network {
  uuid: Scalars['ID']
  /** name */
  name: Scalars['String']
  /** description */
  description?: Maybe<Scalars['String']>
  /** 网络类型 */
  type?: Maybe<Scalars['String']>
  hypervisorType?: Maybe<Scalars['String']>
  /** IP范围 */
  ipRanges?: Maybe<Array<IpRange>>
  /** 创建时间 */
  createDate?: Maybe<Scalars['String']>
  /** 最后操作时间 */
  lastOpDate?: Maybe<Scalars['String']>
  /** IP版本 */
  ipVersion?: Maybe<Scalars['Float']>
  /** 类别 */
  category?: Maybe<Scalars['String']>
  /** ip可用量 */
  ipCapacity?: Maybe<IpCapacity>
  /** DHCP服务IP */
  dhcpIp?: Maybe<DhcpIp>
  /** mtu */
  mtu?: Maybe<Scalars['Float']>
  /** 资源所有者 */
  owner?: Maybe<L3Owner>
  /** DNS */
  dns?: Maybe<Array<Scalars['String']>>
  /** 对应的二层网络 */
  l2Network?: Maybe<L2Network>
  /** 对应的二层网络的uuid */
  l2NetworkUuid?: Maybe<Scalars['String']>
  /** 私有网络接口ip */
  routerInterfaceIp?: Maybe<Scalars['String']>
  /** 三层网络类型判断 */
  networkTypeName?: Maybe<Scalars['String']>
  /** 三层网络类型判断,前端五种网络 */
  networkType?: Maybe<L3NetworkType>
  /** 是否为系统网络 */
  system?: Maybe<Scalars['Boolean']>
  /** 是否为流量网络 */
  mirrorNetwork?: Maybe<Scalars['Boolean']>
  /** 网络服务类型 */
  networkServices?: Maybe<Array<NetworkServices>>
  virtualRouterOffering?: Maybe<VirtualRouterOffering>
  virtualRouterOfferingUuid?: Maybe<Scalars['String']>
  vpcVRouter?: Maybe<L3VpcVRouter>
  shareType: ShareType
  /** zone uuid */
  zoneUuid?: Maybe<Scalars['ID']>
  /** l2Netwrok.enableSRIOV */
  enableSRIOV?: Maybe<Scalars['Boolean']>
}

export enum L3NetworkType {
  public = 'public',
  manage = 'manage',
  vpc = 'vpc',
  flat = 'flat',
  flow = 'flow'
}

export interface L3NetworkListResp {
  list: Array<L3Network>
  total: Scalars['Int']
  error?: Maybe<ActionError>
}

export interface Dns {
  l3NetworkUuid?: Maybe<Scalars['String']>
  dns?: Maybe<Scalars['String']>
}

export interface DnsListResp {
  list: Array<Dns>
  total: Scalars['Int']
}

export interface L3NetworkCountResp {
  total: Scalars['Int']
}

export interface PciDeviceSpec {
  uuid: Scalars['String']
  name: Scalars['String']
  description?: Maybe<Scalars['String']>
  vendorId?: Maybe<Scalars['String']>
  deviceId?: Maybe<Scalars['String']>
  subvendorId?: Maybe<Scalars['String']>
  subdeviceId?: Maybe<Scalars['String']>
  romContent?: Maybe<Scalars['String']>
  romVersion?: Maybe<Scalars['String']>
  romMd5sum?: Maybe<Scalars['String']>
  type?: Maybe<Scalars['String']>
  state?: Maybe<PciDeviceSpecState>
  isVirtual?: Maybe<Scalars['Boolean']>
  maxPartNum?: Maybe<Scalars['Float']>
  ramSize?: Maybe<Scalars['Boolean']>
  createDate?: Maybe<Scalars['String']>
  lastOpDate?: Maybe<Scalars['String']>
  shareType: ShareType
}

export enum PciDeviceSpecState {
  Enabled = 'Enabled',
  Disabled = 'Disabled'
}

export interface PciDeviceSpecList {
  list?: Maybe<Array<PciDeviceSpec>>
  total?: Maybe<Scalars['Float']>
}

export interface VGpuDeviceSpec {
  uuid: Scalars['String']
  name: Scalars['String']
  description?: Maybe<Scalars['String']>
  vendorId?: Maybe<Scalars['String']>
  deviceId?: Maybe<Scalars['String']>
  subvendorId?: Maybe<Scalars['String']>
  subdeviceId?: Maybe<Scalars['String']>
  romContent?: Maybe<Scalars['String']>
  romVersion?: Maybe<Scalars['String']>
  romMd5sum?: Maybe<Scalars['String']>
  type?: Maybe<Scalars['String']>
  state?: Maybe<PciDeviceSpecState>
  isVirtual?: Maybe<Scalars['Boolean']>
  maxPartNum?: Maybe<Scalars['Float']>
  ramSize?: Maybe<Scalars['Boolean']>
  createDate?: Maybe<Scalars['String']>
  lastOpDate?: Maybe<Scalars['String']>
  shareType: ShareType
  fbMemory?: Maybe<Scalars['String']>
  maxInstance?: Maybe<Scalars['String']>
  frameRateLimit?: Maybe<Scalars['String']>
  manufacturer?: Maybe<Scalars['String']>
  maximumResolution?: Maybe<Scalars['String']>
  subSystemId?: Maybe<Scalars['String']>
  gridLicense?: Maybe<Scalars['String']>
  deviceType: VGpuDeviceType
}

export enum VGpuDeviceType {
  PciDevice = 'PciDevice',
  MdevDevice = 'MdevDevice'
}

export interface VGpuDeviceSpecList {
  list?: Maybe<Array<VGpuDeviceSpec>>
  total?: Maybe<Scalars['Float']>
}

export interface PciDeviceMetaDataEntries {
  key: Scalars['String']
  value: Scalars['String']
  op: PciDeviceMetaDataOperator
}

export enum PciDeviceMetaDataOperator {
  Equal = 'Equal',
  Unequal = 'Unequal'
}

export interface PciDeviceMetaData {
  metaData: Scalars['String']
  metaDataEntries: Array<PciDeviceMetaDataEntries>
}

export interface HostNetworkInterface {
  carrierActive?: Maybe<Scalars['Boolean']>
  interfaceName?: Maybe<Scalars['String']>
  speed?: Maybe<Scalars['Float']>
  hostUuid?: Maybe<Scalars['String']>
}

export interface CanDirectRestore {
  canDirectRestore?: Maybe<Scalars['Boolean']>
  vmUuidList?: Maybe<Array<Scalars['String']>>
}

export interface VfAvailableNum {
  vfAvailableNum?: Maybe<Scalars['Int']>
  vfTotalNum?: Maybe<Scalars['Int']>
}

export interface MatchedPciDeviceOfferingRef {
  pciDeviceUuid: Scalars['String']
  pciDeviceOfferingUuid: Scalars['String']
}

export interface MdevSpecRefs {
  pciDeviceUuid: Scalars['String']
  mdevSpecUuid: Scalars['String']
  effective: Scalars['Boolean']
  createDate: Scalars['String']
  lastOpDate: Scalars['String']
}

export interface HostInPciDevice {
  uuid: Scalars['ID']
  name?: Maybe<Scalars['String']>
}

export interface PciDeviceSpecInPciDevice {
  uuid: Scalars['String']
  name: Scalars['String']
}

export interface PciDevice {
  uuid: Scalars['String']
  name: Scalars['String']
  description?: Maybe<Scalars['String']>
  hostUuid?: Maybe<Scalars['String']>
  parentUuid?: Maybe<Scalars['String']>
  vmInstanceUuid?: Maybe<Scalars['String']>
  pciSpecUuid?: Maybe<Scalars['String']>
  vendorId?: Maybe<Scalars['String']>
  deviceId?: Maybe<Scalars['String']>
  subvendorId?: Maybe<Scalars['String']>
  subdeviceId?: Maybe<Scalars['String']>
  pciDeviceAddress?: Maybe<Scalars['String']>
  createDate?: Maybe<Scalars['String']>
  lastOpDate?: Maybe<Scalars['String']>
  toPublic?: Maybe<Scalars['Boolean']>
  type?: Maybe<PciDeviceType>
  state?: Maybe<PciDeviceState>
  status?: Maybe<PciDeviceStatus>
  virtStatus?: Maybe<PciDeviceVirtStatus>
  metaData?: Maybe<PciDeviceMetaData>
  matchedPciDeviceOfferingRef?: Maybe<Array<MatchedPciDeviceOfferingRef>>
  mdevSpecRefs?: Maybe<Array<MdevSpecRefs>>
  physicalNicDeviceMaxPartNum?: Maybe<Scalars['Float']>
  host?: Maybe<HostInPciDevice>
  hostNetworkInterface?: Maybe<HostNetworkInterface>
  canDirectRestore?: Maybe<CanDirectRestore>
  vfAvailableNum?: Maybe<VfAvailableNum>
  vmInstance?: Maybe<VmInstance>
  pciDeviceSpec?: Maybe<PciDeviceSpecInPciDevice>
  shareType: ShareType
  gpuType?: Maybe<PciDeviceGpuType>
}

export enum PciDeviceType {
  GPU_Video_Controller = 'GPU_Video_Controller',
  GPU_Audio_Controller = 'GPU_Audio_Controller',
  GPU_USB_Controller = 'GPU_USB_Controller',
  GPU_Serial_Controller = 'GPU_Serial_Controller',
  Ethernet_Controller = 'Ethernet_Controller',
  Audio_Controller = 'Audio_Controller',
  USB_Controller = 'USB_Controller',
  Serial_Controller = 'Serial_Controller',
  Moxa_Device = 'Moxa_Device',
  PCI_Bridge = 'PCI_Bridge',
  Host_Bridge = 'Host_Bridge',
  Generic = 'Generic',
  Custom = 'Custom'
}

export enum PciDeviceState {
  Enabled = 'Enabled',
  Disabled = 'Disabled'
}

export enum PciDeviceStatus {
  Active = 'Active',
  Attached = 'Attached',
  System = 'System'
}

export enum PciDeviceVirtStatus {
  UNVIRTUALIZABLE = 'UNVIRTUALIZABLE',
  SRIOV_VIRTUALIZABLE = 'SRIOV_VIRTUALIZABLE',
  VFIO_MDEV_VIRTUALIZABLE = 'VFIO_MDEV_VIRTUALIZABLE',
  SRIOV_VIRTUALIZED = 'SRIOV_VIRTUALIZED',
  VFIO_MDEV_VIRTUALIZED = 'VFIO_MDEV_VIRTUALIZED',
  SRIOV_VIRTUAL = 'SRIOV_VIRTUAL',
  UNKNOWN = 'UNKNOWN'
}

export enum PciDeviceGpuType {
  DesktopGpu = 'DesktopGpu',
  ComputeGpu = 'ComputeGpu'
}

export interface PciDeviceList {
  list?: Maybe<Array<PciDevice>>
  total?: Maybe<Scalars['Float']>
}

export interface VGpuDevice {
  uuid: Scalars['String']
  name: Scalars['String']
  description?: Maybe<Scalars['String']>
  specUuid?: Maybe<Scalars['String']>
  specInfo?: Maybe<VGpuDeviceSpec>
  address?: Maybe<Scalars['String']>
  host?: Maybe<Host>
  hostUuid?: Maybe<Scalars['String']>
  parent?: Maybe<PciDevice>
  parentUuid?: Maybe<Scalars['String']>
  state?: Maybe<Scalars['String']>
  type?: Maybe<VGpuType>
  status?: Maybe<Scalars['String']>
  vmInstanceUuid?: Maybe<Scalars['String']>
  vmInstance?: Maybe<VmInstance>
  createDate?: Maybe<Scalars['String']>
}

export enum VGpuType {
  MdevDevice = 'MdevDevice',
  PciDevice = 'PciDevice'
}

export interface VGpuDeviceList {
  list?: Maybe<Array<VGpuDevice>>
  total?: Maybe<Scalars['Float']>
}

export interface CdRom {
  uuid: Scalars['String']
  vmInstanceUuid: Scalars['String']
  deviceId?: Maybe<Scalars['Int']>
  isoUuid?: Maybe<Scalars['String']>
  isoInstallPath?: Maybe<Scalars['String']>
  isoName?: Maybe<Scalars['String']>
  name?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  defaultflag?: Maybe<Scalars['Boolean']>
  createDate: Scalars['String']
  lastOpDate: Scalars['String']
}

export interface CdRomsQueryResp {
  list?: Maybe<Array<CdRom>>
  total?: Maybe<Scalars['Int']>
}

export interface MaxAmount {
  createAble?: Maybe<Scalars['Boolean']>
}

export interface VMCdRomConfig {
  category?: Maybe<Scalars['String']>
  defaultValue?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  name?: Maybe<Scalars['String']>
  value?: Maybe<Scalars['String']>
}

export interface UsedIp {
  uuid: Scalars['String']
  /** IP段UUID */
  ipRangeUuid?: Maybe<Scalars['String']>
  l3NetworkUuid?: Maybe<Scalars['String']>
  l3Network?: Maybe<L3Network>
  ipVersion?: Maybe<Scalars['Float']>
  ip?: Maybe<Scalars['String']>
  netmask?: Maybe<Scalars['String']>
  gateway?: Maybe<Scalars['String']>
  usedFor?: Maybe<Scalars['String']>
  ipInLong?: Maybe<Scalars['Float']>
  vmNicUuid?: Maybe<Scalars['String']>
  createDate?: Maybe<Scalars['String']>
  lastOpDate?: Maybe<Scalars['String']>
}

export interface VmNic {
  uuid: Scalars['String']
  vmInstanceUuid?: Maybe<Scalars['String']>
  l3NetworkUuid?: Maybe<Scalars['String']>
  networkUuid?: Maybe<Scalars['String']>
  ip?: Maybe<Scalars['String']>
  mac?: Maybe<Scalars['String']>
  netmask?: Maybe<Scalars['String']>
  gateway?: Maybe<Scalars['String']>
  metaData?: Maybe<Scalars['String']>
  ipVersion?: Maybe<Scalars['Int']>
  driverType?: Maybe<Scalars['String']>
  usedIps?: Maybe<Array<UsedIp>>
  deviceId?: Maybe<Scalars['Int']>
  type?: Maybe<Scalars['String']>
  createDate?: Maybe<Scalars['String']>
  lastOpDate?: Maybe<Scalars['String']>
  internalName?: Maybe<Scalars['String']>
  isPxe?: Maybe<Scalars['Boolean']>
  /** 入网带宽限速 */
  inboundBandwidth?: Maybe<Scalars['Float']>
  /** 出网带宽限速 */
  outboundBandwidth?: Maybe<Scalars['Float']>
  l3Network?: Maybe<L3NetworkInNic>
  vmInstance?: Maybe<VmInstance>
  isBindPortMirrorSession?: Maybe<Scalars['Boolean']>
}

export type L3NetworkInNic = L3Network | ProvisionNetwork

export interface VmNicListResp {
  list: Array<VmNic>
  total: Scalars['Float']
  error?: Maybe<ActionError>
}

export interface VmNicIp {
  name?: Maybe<Scalars['String']>
  ip?: Maybe<Scalars['String']>
  mac?: Maybe<Scalars['String']>
  isStatic?: Maybe<Scalars['Boolean']>
  /** vmNicIpUuid */
  vmNicIpUuid: Scalars['String']
  /** vmNicUuid */
  vmNicUuid: Scalars['String']
}

export interface VmNicIpListResp {
  list: Array<VmNicIp>
  total: Scalars['Float']
  error?: Maybe<ActionError>
}

export interface VipNetworkOwner {
  uuid: Scalars['String']
  name: Scalars['String']
  type: Scalars['String']
}

export interface VipNetworkQos {
  createDate?: Maybe<Scalars['String']>
  inboundBandwidth?: Maybe<Scalars['BigInt']>
  lastOpDate?: Maybe<Scalars['String']>
  outboundBandwidth?: Maybe<Scalars['BigInt']>
  port?: Maybe<Scalars['Int']>
  type?: Maybe<Scalars['String']>
  uuid?: Maybe<Scalars['String']>
  vipUuid?: Maybe<Scalars['String']>
}

export interface UseForService {
  name?: Maybe<Scalars['String']>
  uuid: Scalars['String']
  type: vipNetworkUseForType
}

export enum vipNetworkUseForType {
  Eip = 'Eip',
  PortForwarding = 'PortForwarding',
  IPsec = 'IPsec',
  LoadBalancer = 'LoadBalancer',
  SNAT = 'SNAT',
  SLB = 'SLB'
}

export interface VipNetwork {
  uuid: Scalars['String']
  name: Scalars['String']
  description?: Maybe<Scalars['String']>
  l3NetworkUuid?: Maybe<Scalars['String']>
  /** ip地址 */
  ip?: Maybe<Scalars['String']>
  state?: Maybe<VipNetworkState>
  /** 网关 */
  gateway?: Maybe<Scalars['String']>
  /** 子网掩码 */
  netmask?: Maybe<Scalars['String']>
  ipRangeUuid?: Maybe<Scalars['String']>
  prefixLen?: Maybe<Scalars['Float']>
  useFor?: Maybe<Scalars['String']>
  hypervisorType?: Maybe<Scalars['String']>
  useForService?: Maybe<Array<UseForService>>
  system?: Maybe<Scalars['Boolean']>
  createDate?: Maybe<Scalars['String']>
  lastOpDate?: Maybe<Scalars['String']>
  host?: Maybe<Host>
  l3Network: L3Network
  owner?: Maybe<VipNetworkOwner>
  qos?: Maybe<Array<VipNetworkQos>>
  ipVersion?: Maybe<VipNetworkIpVersion>
}

export enum VipNetworkState {
  Enabled = 'Enabled',
  Disabled = 'Disabled'
}

export enum VipNetworkIpVersion {
  IPv4 = 'IPv4',
  IPv6 = 'IPv6'
}

export interface VipNetworkListResp {
  list: Array<VipNetwork>
  total: Scalars['Float']
  error?: Maybe<ActionError>
}

export interface VipNetworkQosListResp {
  list: Array<VipNetworkQos>
  total: Scalars['Float']
  error?: Maybe<ActionError>
}

export interface VipNetworkSummary {
  defineTotal?: Maybe<Scalars['Int']>
  systemTotal?: Maybe<Scalars['Int']>
}

export interface VipNetworkLabels {
  VipUUID: Scalars['String']
}

export interface VipNetworkMetricData {
  time: Scalars['Float']
  value?: Maybe<Scalars['Float']>
  type?: Maybe<Scalars['String']>
  metricName?: Maybe<Scalars['String']>
  labels: VipNetworkLabels
}

export interface PortForwarding {
  uuid: Scalars['String']
  name: Scalars['String']
  description?: Maybe<Scalars['String']>
  vipIp?: Maybe<Scalars['String']>
  vipUuid?: Maybe<Scalars['String']>
  guestIp?: Maybe<Scalars['String']>
  protocolType?: Maybe<PortForwardingProtocolType>
  vipPortStart?: Maybe<Scalars['Int']>
  vipPortEnd?: Maybe<Scalars['Int']>
  privatePortStart?: Maybe<Scalars['Int']>
  privatePortEnd?: Maybe<Scalars['Int']>
  state?: Maybe<PortForwardingState>
  allowedCidr?: Maybe<Scalars['String']>
  owner?: Maybe<AccountInfo>
  vmNic?: Maybe<VmNic>
  vip?: Maybe<VipNetwork>
  createDate?: Maybe<Scalars['String']>
  lastOpDate?: Maybe<Scalars['String']>
  vmNicUuid?: Maybe<Scalars['String']>
}

export enum PortForwardingProtocolType {
  TCP = 'TCP',
  UDP = 'UDP'
}

export enum PortForwardingState {
  Enabled = 'Enabled',
  Disabled = 'Disabled'
}

export interface PortForwardingList {
  list: Array<PortForwarding>
  total: Scalars['Int']
  error?: Maybe<ActionError>
}

export interface VmNicCandidateList {
  list: Array<VmNic>
  error?: Maybe<ActionError>
}

export interface Usage {
  uuid: Scalars['String']
  affinityGroupUuid: Scalars['String']
  resourceUuid: Scalars['String']
  resourceType: Scalars['String']
  createDate: Scalars['String']
  lastOpDate: Scalars['String']
}

export interface AffinityGroup {
  /** 资源的UUID，唯一标示该资源 */
  uuid: Scalars['String']
  /** 资源名称 */
  name: Scalars['String']
  /** 资源的详细描述 */
  description?: Maybe<Scalars['String']>
  /** 亲和组策略 */
  policy: AffinityGroupPolicyType
  /** 亲和组分配算法的版本 */
  version: Scalars['String']
  /** 亲和组类型 */
  type: Scalars['String']
  /** 亲和组使用者标识 */
  appliance: Scalars['String']
  state?: Maybe<AffinityGroupState>
  affinityGroupUuid?: Maybe<Scalars['String']>
  createDate: Scalars['String']
  lastOpDate: Scalars['String']
  usages: Array<Usage>
  owner: AccountInfo
}

export enum AffinityGroupPolicyType {
  ANTISOFT = 'ANTISOFT',
  ANTIHARD = 'ANTIHARD'
}

export enum AffinityGroupState {
  Enabled = 'Enabled',
  Disabled = 'Disabled'
}

export interface AffinityGroupList {
  list: Array<AffinityGroup>
  total: Scalars['Int']
  error?: Maybe<ActionError>
}

export interface ToolsState {
  toolsState?: Maybe<GuestToolsState>
}

export enum GuestToolsState {
  Uninstall = 'Uninstall',
  IsRunning = 'IsRunning',
  Stopped = 'Stopped',
  Unsupport = 'Unsupport'
}

export interface VmOwner {
  uuid: Scalars['String']
  name: Scalars['String']
  type: Scalars['String']
  linkedAccountUuid?: Maybe<Scalars['String']>
}

export interface BootOrderResp {
  orders: Array<VmBootDevice>
}

export enum VmBootDevice {
  HardDisk = 'HardDisk',
  CdRom = 'CdRom',
  Network = 'Network'
}

export interface VmIso {
  uuid: Scalars['String']
  index: Scalars['Int']
}

export interface VmCapabilities {
  LiveMigration?: Maybe<Scalars['Boolean']>
  MemorySnapshot?: Maybe<Scalars['Boolean']>
  Reimage?: Maybe<Scalars['Boolean']>
  VolumeMigration?: Maybe<Scalars['Boolean']>
}

export interface RelatedResource {
  volume: Scalars['Int']
  vmNic: Scalars['Int']
  snapshot: Scalars['Int']
  alarm: Scalars['Int']
  schedulerJob: Scalars['Int']
  backupData: Scalars['Int']
}

export interface SecurityGroupInVminstance {
  name: Scalars['String']
  uuid: Scalars['String']
}

export interface EipInVminstance {
  name: Scalars['String']
  uuid: Scalars['String']
  vipIp?: Maybe<Scalars['String']>
}

export interface GpuDeivceSpecOnVmInstance {
  name: Scalars['String']
  uuid: Scalars['String']
  type: Scalars['String']
  isVirtual: Scalars['Boolean']
  deviceType?: Maybe<VGpuDeviceType>
}

export interface RequestConsoleAccess {
  hostname: Scalars['String']
  port: Scalars['String']
  token: Scalars['String']
}

export interface VmCpuPinning {
  vCPU: Scalars['String']
  pCPU: Scalars['String']
}

export interface StaticIpInVm {
  l3NetworkUuid: Scalars['String']
  ip: Scalars['String']
}

export interface VmInstanceSystemTag {
  isoList?: Maybe<Array<VmIso>>
  bootOrder?: Maybe<Array<Scalars['String']>>
  bootOrderOnce?: Maybe<Scalars['Boolean']>
  ha?: Maybe<Scalars['String']>
  sshkey?: Maybe<Scalars['String']>
  consolePassword?: Maybe<Scalars['String']>
  vmConsoleMode?: Maybe<Scalars['String']>
  bootMode?: Maybe<Scalars['String']>
  RDPEnable?: Maybe<Scalars['Boolean']>
  usbRedirect?: Maybe<Scalars['Boolean']>
  VDIMonitorNumber?: Maybe<Scalars['String']>
  userdata?: Maybe<Scalars['String']>
  qemuga?: Maybe<Scalars['String']>
  vmCpuPinningList?: Maybe<Array<VmCpuPinning>>
  antiSpoofing?: Maybe<Scalars['Boolean']>
  autoReleaseSpecReleatedPhysicalPciDevice?: Maybe<Scalars['Boolean']>
  autoReleaseSpecReleatedVirtualPciDevice?: Maybe<Scalars['Boolean']>
  vmPriority?: Maybe<Scalars['String']>
  GuestTools?: Maybe<Scalars['String']>
  haStickStragedy?: Maybe<Scalars['Boolean']>
  staticIp?: Maybe<Array<StaticIpInVm>>
}

export interface MaxCdRomNum {
  category: Scalars['String']
  name: Scalars['String']
  defaultValue: Scalars['String']
  value: Scalars['String']
  description?: Maybe<Scalars['String']>
}

export interface VmInstance {
  name: Scalars['String']
  uuid: Scalars['String']
  description?: Maybe<Scalars['String']>
  createDate?: Maybe<Scalars['String']>
  lastOpDate?: Maybe<Scalars['String']>
  affinityGroupUuid?: Maybe<Scalars['String']>
  cpuNum?: Maybe<Scalars['Int']>
  clusterUuid?: Maybe<Scalars['String']>
  hypervisorType?: Maybe<Scalars['String']>
  memorySize?: Maybe<Scalars['Float']>
  state?: Maybe<VmInstanceState>
  defaultL3NetworkUuid?: Maybe<Scalars['String']>
  instanceOfferingUuid: Scalars['String']
  instanceOffering?: Maybe<InstanceOffering>
  imageUuid?: Maybe<Scalars['String']>
  hostUuid?: Maybe<Scalars['String']>
  lastHostUuid?: Maybe<Scalars['String']>
  defaultL3Network?: Maybe<L3Network>
  eip?: Maybe<Array<EipInVminstance>>
  securityGroup?: Maybe<Array<SecurityGroupInVminstance>>
  platform?: Maybe<Scalars['String']>
  attachedShareableVolumeUuidList?: Maybe<Array<Scalars['String']>>
  rootVolumeUuid?: Maybe<Scalars['String']>
  zoneUuid?: Maybe<Scalars['String']>
  vmCdRoms?: Maybe<Array<CdRom>>
  allVolumes?: Maybe<Array<Volume>>
  cluster?: Maybe<Cluster>
  gpuDeviceSpec?: Maybe<Array<GpuDeivceSpecOnVmInstance>>
  image?: Maybe<Image>
  host?: Maybe<Host>
  lastHost?: Maybe<Host>
  primaryStorage?: Maybe<PrimaryStorage>
  owner?: Maybe<VmOwner>
  systemTag?: Maybe<VmInstanceSystemTag>
  tag?: Maybe<Array<Tag>>
  relatedResource?: Maybe<RelatedResource>
  vmNics?: Maybe<Array<VmNic>>
  metric?: Maybe<MetricData>
  healthStatus?: Maybe<Scalars['String']>
  portForwarding?: Maybe<Array<PortForwarding>>
  affinityGroup?: Maybe<AffinityGroup>
  maxCdRomNum?: Maybe<MaxCdRomNum>
  vCenter?: Maybe<VCenter>
  consoleAddress?: Maybe<Array<Scalars['String']>>
  volumeAttributeUserConfig?: Maybe<Scalars['String']>
  backupStatus?: Maybe<Scalars['String']>
  type?: Maybe<Scalars['String']>
  toolsState?: Maybe<GuestToolsState>
  capabilities?: Maybe<VmCapabilities>
  bootOrder?: Maybe<BootOrderResp>
}

export enum VmInstanceState {
  Created = 'Created',
  Starting = 'Starting',
  Running = 'Running',
  Stopping = 'Stopping',
  Stopped = 'Stopped',
  Rebooting = 'Rebooting',
  Destroying = 'Destroying',
  Destroyed = 'Destroyed',
  Migrating = 'Migrating',
  Expunging = 'Expunging',
  Pausing = 'Pausing',
  Paused = 'Paused',
  Resuming = 'Resuming',
  VolumeMigrating = 'VolumeMigrating',
  Error = 'Error',
  Unknown = 'Unknown'
}

export interface VmLabels {
  VMUuid?: Maybe<Scalars['String']>
  CPUNum?: Maybe<Scalars['String']>
  NetworkDeviceLetter?: Maybe<Scalars['String']>
  DiskDeviceLetter?: Maybe<Scalars['String']>
}

export interface VmInstanceMetricData {
  time: Scalars['Float']
  value?: Maybe<Scalars['Float']>
  type?: Maybe<Scalars['String']>
  metricName?: Maybe<Scalars['String']>
  labels?: Maybe<VmLabels>
}

export interface StorageMigrateVmInstancedepends {
  uuid: Scalars['String']
  isAttachedScsiLunDevice: Scalars['Boolean']
  hasUnavailableUsbDevice: Scalars['Boolean']
  hasPeripheralAttached: Scalars['Boolean']
}

export interface VmInstanceSummary {
  total?: Maybe<Scalars['Int']>
  available?: Maybe<Scalars['Int']>
  destroyed?: Maybe<Scalars['Int']>
  running?: Maybe<Scalars['Int']>
  stopped?: Maybe<Scalars['Int']>
  unknown?: Maybe<Scalars['Int']>
  other?: Maybe<Scalars['Int']>
}

export interface CdromConfigForVmCreate {
  maximumCdRomNum: Scalars['Int']
  vmDefaultCdRomNum: Scalars['Int']
}

export interface VmInstanceList {
  list?: Maybe<Array<VmInstance>>
  total: Scalars['Int']
  error?: Maybe<ActionError>
}

export interface GuestTool {
  version: Scalars['String']
  status: Scalars['String']
}

export interface VolumeCapabilities {
  MigrationInCurrentPrimaryStorage?: Maybe<Scalars['Boolean']>
  MigrationToOtherPrimaryStorage?: Maybe<Scalars['Boolean']>
}

export interface VolumeSystemTag {
  WWN?: Maybe<Scalars['String']>
  VirtioSCSI?: Maybe<Scalars['Boolean']>
  notSupportActualSize?: Maybe<Scalars['Boolean']>
  VolumeProvisioningStrategy?: Maybe<VolumeProvisioningStrategy>
  volumeAttributeUserConfig?: Maybe<Scalars['String']>
}

export enum VolumeProvisioningStrategy {
  ThinProvisioning = 'ThinProvisioning',
  ThickProvisioning = 'ThickProvisioning'
}

export interface VolumeBandwidth {
  volumeBandwidth?: Maybe<Scalars['Float']>
  volumeBandwidthRead?: Maybe<Scalars['Float']>
  volumeBandwidthWrite?: Maybe<Scalars['Float']>
  volumeBandwidthUpthreshold?: Maybe<Scalars['Float']>
  volumeBandwidthReadUpthreshold?: Maybe<Scalars['Float']>
  volumeBandwidthWriteUpthreshold?: Maybe<Scalars['Float']>
  volumeUuid?: Maybe<Scalars['String']>
}

export interface VolumeOwner {
  uuid: Scalars['String']
  name: Scalars['String']
  type: Scalars['String']
  linkedAccountUuid?: Maybe<Scalars['String']>
}

export interface Volume {
  uuid: Scalars['String']
  name: Scalars['String']
  description?: Maybe<Scalars['String']>
  primaryStorageUuid?: Maybe<Scalars['String']>
  vmInstanceUuid?: Maybe<Scalars['String']>
  installPath?: Maybe<Scalars['String']>
  type: VolumeType
  format?: Maybe<Scalars['String']>
  size: Scalars['Float']
  actualSize?: Maybe<Scalars['Float']>
  state: VolumeState
  vCenter?: Maybe<VCenter>
  vCenterUuid?: Maybe<Scalars['String']>
  status: VolumeStatus
  systemTag?: Maybe<VolumeSystemTag>
  diskOfferingUuid?: Maybe<Scalars['String']>
  rootImageUuid?: Maybe<Scalars['String']>
  createDate?: Maybe<Scalars['String']>
  lastOpDate?: Maybe<Scalars['String']>
  isShareable?: Maybe<Scalars['Boolean']>
  volumeQos?: Maybe<Scalars['String']>
  bandwidth?: Maybe<VolumeBandwidth>
  primaryStorage?: Maybe<PrimaryStorage>
  vmInstance?: Maybe<Array<VmInstance>>
  capabilities?: Maybe<VolumeCapabilities>
  tag?: Maybe<Array<Tag>>
  owner?: Maybe<VolumeOwner>
  mineTags?: Maybe<Array<Tag>>
  othersTags?: Maybe<Array<Tag>>
  backupStatus?: Maybe<Scalars['String']>
}

export enum VolumeType {
  Root = 'Root',
  Data = 'Data',
  Memory = 'Memory'
}

export enum VolumeState {
  Enabled = 'Enabled',
  Disabled = 'Disabled'
}

export enum VolumeStatus {
  Creating = 'Creating',
  Ready = 'Ready',
  NotInstantiated = 'NotInstantiated',
  Deleted = 'Deleted',
  Migrating = 'Migrating'
}

export interface VolumeSummary {
  total?: Maybe<Scalars['Int']>
  available?: Maybe<Scalars['Int']>
  destroyed?: Maybe<Scalars['Int']>
  notInstantiated?: Maybe<Scalars['Int']>
  enabled: Scalars['Int']
  disabled: Scalars['Int']
}

export interface VolumeList {
  total: Scalars['Float']
  list?: Maybe<Array<Volume>>
  error?: Maybe<ActionError>
}

export interface VolumeActionResp {
  actionId: Scalars['String']
  error?: Maybe<ActionError>
  result?: Maybe<Volume>
}

export interface QuerySharedResourceResult {
  type: Scalars['String']
  value: Scalars['Float']
}

export interface IAM2Attribute {
  uuid?: Maybe<Scalars['String']>
  name?: Maybe<Scalars['String']>
  type?: Maybe<Scalars['String']>
  value?: Maybe<Scalars['String']>
  virtualIDUuid?: Maybe<Scalars['String']>
}

export interface IAM2Organization {
  uuid: Scalars['String']
  name?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  state?: Maybe<Scalars['String']>
  attributes?: Maybe<Array<IAM2Attribute>>
  parentUuid?: Maybe<Scalars['String']>
  rootOrganizationUuid?: Maybe<Scalars['String']>
  srcType?: Maybe<Scalars['String']>
  createDate?: Maybe<Scalars['String']>
  lastOpDate?: Maybe<Scalars['String']>
}

export interface DepartmentHeadInfo {
  departmentHeadName?: Maybe<Scalars['String']>
  departmentHeadUuid?: Maybe<Scalars['String']>
  organizationSupervisorAttrUuid?: Maybe<Scalars['String']>
}

export interface IAM2OrganizationCountSummary {
  virtualTotalNumber?: Maybe<Scalars['Float']>
  virtualDirectNumber?: Maybe<Scalars['Float']>
}

export interface IAM2OrganizationVO {
  uuid: Scalars['String']
  name?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  state?: Maybe<Scalars['String']>
  attributes?: Maybe<Array<IAM2Attribute>>
  parentUuid?: Maybe<Scalars['String']>
  rootOrganizationUuid?: Maybe<Scalars['String']>
  srcType?: Maybe<Scalars['String']>
  createDate?: Maybe<Scalars['String']>
  lastOpDate?: Maybe<Scalars['String']>
  departmentHeadInfo?: Maybe<DepartmentHeadInfo>
  childOrgCount?: Maybe<Scalars['Int']>
  projectCount?: Maybe<Scalars['Int']>
  countSummary?: Maybe<IAM2OrganizationCountSummary>
}

export interface IAM2OrganizationResp {
  list?: Maybe<Array<IAM2OrganizationVO>>
  total?: Maybe<Scalars['Float']>
}

export interface BillingTableResource {
  spending?: Maybe<Scalars['Float']>
  volumeSize?: Maybe<Scalars['Float']>
  cpuNum?: Maybe<Scalars['Float']>
  memorySize?: Maybe<Scalars['Float']>
  resourceName?: Maybe<Scalars['String']>
  resourceUuid: Scalars['String']
  vmNicIp?: Maybe<Scalars['String']>
  vipIp?: Maybe<Scalars['String']>
  /** 云主机类型 */
  vmType?: Maybe<Scalars['String']>
  hypervisorType?: Maybe<Scalars['String']>
  /** 云盘格式 */
  format?: Maybe<Scalars['String']>
  applianceVmType?: Maybe<Scalars['String']>
  gpuType?: Maybe<Scalars['String']>
  pubIpVipBandwidthOutSpending?: Maybe<Scalars['String']>
  pubIpVipBandwidthInSpending?: Maybe<Scalars['String']>
  pubIpVmNicBandwidthOutSpending?: Maybe<Scalars['String']>
  pubIpVmNicBandwidthInSpending?: Maybe<Scalars['String']>
  startTime?: Maybe<Scalars['String']>
  endTime?: Maybe<Scalars['String']>
  bandwidthSize?: Maybe<Scalars['String']>
  isDelete?: Maybe<Scalars['Boolean']>
}

export interface BillingTableResourceQueryResp {
  list?: Maybe<Array<BillingTableResource>>
  total?: Maybe<Scalars['Float']>
}

export interface Billing {
  total?: Maybe<Scalars['Float']>
  uuid?: Maybe<Scalars['String']>
  accountUuid?: Maybe<Scalars['String']>
  name?: Maybe<Scalars['String']>
  VM?: Maybe<Scalars['Float']>
  cpuAndMemory?: Maybe<Scalars['Float']>
  rootVolume?: Maybe<Scalars['Float']>
  dataVolume?: Maybe<Scalars['Float']>
  gpu?: Maybe<Scalars['Float']>
  pubIpVipBandwidth?: Maybe<Scalars['Float']>
  pubIpVmNicBandwidth?: Maybe<Scalars['Float']>
  createDate?: Maybe<Scalars['String']>
  lastOpDate?: Maybe<Scalars['String']>
}

export interface OrganizationBilling {
  total?: Maybe<Scalars['Float']>
  uuid?: Maybe<Scalars['String']>
  accountUuid?: Maybe<Scalars['String']>
  name?: Maybe<Scalars['String']>
  VM?: Maybe<Scalars['Float']>
  cpuAndMemory?: Maybe<Scalars['Float']>
  rootVolume?: Maybe<Scalars['Float']>
  dataVolume?: Maybe<Scalars['Float']>
  gpu?: Maybe<Scalars['Float']>
  pubIpVipBandwidth?: Maybe<Scalars['Float']>
  pubIpVmNicBandwidth?: Maybe<Scalars['Float']>
  createDate?: Maybe<Scalars['String']>
  lastOpDate?: Maybe<Scalars['String']>
  subBilling?: Maybe<Scalars['Float']>
  directBilling?: Maybe<Scalars['Float']>
}

export interface BillingResourceSummary {
  cpuAndMemoryTotal?: Maybe<Scalars['Float']>
  rootVolumeTotal?: Maybe<Scalars['Float']>
  dataVolumeTotal?: Maybe<Scalars['Float']>
  gpuTotal?: Maybe<Scalars['Float']>
  pubIpVmNicTotal?: Maybe<Scalars['Float']>
  pubIpVipTotal?: Maybe<Scalars['Float']>
}

export interface BillingQueryResp {
  list?: Maybe<Array<Billing>>
  total?: Maybe<Scalars['Float']>
}

export interface BillingsPrice {
  createDate?: Maybe<Scalars['String']>
  dateInLong?: Maybe<Scalars['BigInt']>
  lastOpDate?: Maybe<Scalars['String']>
  endDateInLong?: Maybe<Scalars['String']>
  /** gpu 信息 */
  pciDeviceOfferingsInfo?: Maybe<PciDevice>
  pciDeviceOfferingUuid?: Maybe<Scalars['String']>
  price: Scalars['String']
  resourceName: BillingsPriceType
  resourceUnit?: Maybe<BillingsPriceUnitType>
  uuid: Scalars['String']
  tableUuid: Scalars['String']
  timeUnit?: Maybe<BillingsPriceTimeUnit>
  advancedParameterName?: Maybe<Scalars['String']>
  advancedParameter?: Maybe<Scalars['String']>
  networkboundBandwidthType?: Maybe<Scalars['String']>
  systemTags?: Maybe<Array<Scalars['String']>>
  pciDeviceOffering?: Maybe<PciDeviceOffering>
}

export enum BillingsPriceType {
  Cpu = 'Cpu',
  Memory = 'Memory',
  Gpu = 'Gpu',
  RootVolume = 'RootVolume',
  DataVolume = 'DataVolume',
  PubIpVmNicBandwidthOut = 'PubIpVmNicBandwidthOut',
  PubIpVmNicBandwidthIn = 'PubIpVmNicBandwidthIn',
  PubIpVipBandwidthOut = 'PubIpVipBandwidthOut',
  PubIpVipBandwidthIn = 'PubIpVipBandwidthIn'
}

export enum BillingsPriceUnitType {
  KILOBYTE = 'KILOBYTE',
  MEGABYTE = 'MEGABYTE',
  GIGABYTE = 'GIGABYTE',
  TERABYTE = 'TERABYTE'
}

export enum BillingsPriceTimeUnit {
  HOURS = 'HOURS',
  SECONDS = 'SECONDS',
  MINUTES = 'MINUTES',
  DAYS = 'DAYS',
  WEEKS = 'WEEKS',
  MONTHS = 'MONTHS'
}

export interface BillingsPriceTable {
  uuid: Scalars['String']
  billingSymbol: Scalars['String']
  name?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  createDate?: Maybe<Scalars['String']>
  lastOpDate?: Maybe<Scalars['String']>
  bindProjectNum?: Maybe<Scalars['Int']>
  bindAccountNum?: Maybe<Scalars['Int']>
  billingsPrices?: Maybe<Array<BillingsPrice>>
  isDefault?: Maybe<Scalars['Boolean']>
}

export interface BillingsPriceTableQueryResp {
  list?: Maybe<Array<BillingsPriceTable>>
  total?: Maybe<Scalars['Float']>
}

export interface BillingsPriceQueryResp {
  list?: Maybe<Array<BillingsPrice>>
  total?: Maybe<Scalars['Float']>
}

export interface ValidatBillingPriceUserConfigResp {
  valid: Scalars['Boolean']
  /** 错误内容 */
  error?: Maybe<Scalars['String']>
}

export interface AccountBillingsPriceTableRef {
  accountUuids?: Maybe<Array<Scalars['String']>>
  tableUuid?: Maybe<Scalars['String']>
}

export interface BillingsPricesBindProjectAndAccountSummary {
  bindProjectNum?: Maybe<Scalars['Int']>
  bindAccountNum?: Maybe<Scalars['Int']>
}

export interface BillingsPricesSummary {
  cpuTotal?: Maybe<Scalars['Int']>
  dataVolumeTotal?: Maybe<Scalars['Int']>
  gpuTotal?: Maybe<Scalars['Int']>
  memoryTotal?: Maybe<Scalars['Int']>
  pubIpVipBandTotal?: Maybe<Scalars['Int']>
  pubIpVmNicBandTotal?: Maybe<Scalars['Int']>
  rootVolumeTotal?: Maybe<Scalars['Int']>
}

export interface IAM2ProjectAttributes {
  name: Scalars['String']
  type?: Maybe<Scalars['String']>
  uuid?: Maybe<Scalars['String']>
  value?: Maybe<Scalars['String']>
}

export interface IAM2ProjectRetirePolicy {
  /** 截止时间 */
  deadline?: Maybe<Scalars['String']>
  /** 费用限制 */
  billingLimit?: Maybe<Scalars['String']>
  /** 回收动作 */
  ecoveryStrategy?: Maybe<Scalars['String']>
  /** 回收策略 */
  projectCycle?: Maybe<ProjectCycle>
  /** 回收策略Uuid */
  retirePolicyUuid?: Maybe<Scalars['String']>
}

export enum ProjectCycle {
  Unlimited = 'Unlimited',
  BillingRecovery = 'BillingRecovery',
  TimingRecovery = 'TimingRecovery'
}

export interface IAM2ProjectQuota {
  name: Scalars['String']
  total: Scalars['Float']
  used: Scalars['Float']
}

export interface IAM2Project {
  uuid: Scalars['String']
  name?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  linkedAccountUuid: Scalars['String']
  state?: Maybe<ProjectState>
  createDate?: Maybe<Scalars['String']>
  lastOpDate?: Maybe<Scalars['String']>
  attributes?: Maybe<Array<IAM2ProjectAttributes>>
  /** 成员数量 */
  virtualIDNum?: Maybe<Scalars['Float']>
  /** 成员组数量 */
  virtualIDGroupNum?: Maybe<Scalars['Float']>
  /** 角色数量 */
  roleNum?: Maybe<Scalars['Float']>
  /** 计费价目 */
  billingPrice?: Maybe<BillingsPriceTable>
  billing?: Maybe<Billing>
  zone?: Maybe<Zone>
  iam2Organization?: Maybe<IAM2Organization>
  projectAdmin?: Maybe<IAM2VirtualID>
  retirePolicy?: Maybe<IAM2ProjectRetirePolicy>
  quota?: Maybe<Array<IAM2ProjectQuota>>
  roleForVirtualID?: Maybe<Array<Role>>
  roleForVirtualGroup?: Maybe<Array<Role>>
}

export enum ProjectState {
  Enabled = 'Enabled',
  Disabled = 'Disabled',
  Retired = 'Retired',
  Deleted = 'Deleted'
}

export interface IAM2ProjectRelatedResource {
  /** 云主机数量 */
  vmInstance?: Maybe<Scalars['Float']>
  /** 云盘数量 */
  virtualRouter?: Maybe<Scalars['Float']>
}

export interface IAM2ProjectList {
  list?: Maybe<Array<IAM2Project>>
  total?: Maybe<Scalars['Float']>
}

export interface RoleStatement {
  actions?: Maybe<Array<Scalars['String']>>
  effect?: Maybe<Scalars['String']>
  name?: Maybe<Scalars['String']>
}

export interface RoleStatements {
  uuid: Scalars['String']
  statement?: Maybe<RoleStatement>
}

export interface Role {
  uuid: Scalars['String']
  name?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  state?: Maybe<RoleState>
  statements?: Maybe<Array<RoleStatements>>
  createDate: Scalars['String']
  lastOpDate: Scalars['String']
  virtualIdNum: Scalars['Float']
  iam2VirtualIDGroupNum: Scalars['Float']
  iam2Project?: Maybe<IAM2Project>
  roleType: UIRoleType
  type: RoleType
  uiPrivilege?: Maybe<Scalars['String']>
  systemRoleUuid?: Maybe<Scalars['String']>
}

export enum RoleState {
  Enabled = 'Enabled',
  Disabled = 'Disabled'
}

export enum UIRoleType {
  Platform = 'Platform',
  Project = 'Project'
}

export enum RoleType {
  System = 'System',
  Customized = 'Customized',
  Predefined = 'Predefined',
  CreatedBySystem = 'CreatedBySystem',
  PredefinedBySystem = 'PredefinedBySystem'
}

export interface RoleList {
  list?: Maybe<Array<Role>>
  total?: Maybe<Scalars['Float']>
}

export interface RoleUIPrivilege {
  systemRoles?: Maybe<Array<Role>>
  customRoles?: Maybe<Array<Role>>
  customUIPrivilege?: Maybe<Scalars['String']>
}

export interface IAM2VirtualIDGroup {
  uuid: Scalars['String']
  name?: Maybe<Scalars['String']>
  state?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  attributes?: Maybe<Array<IAM2Attribute>>
  createDate?: Maybe<Scalars['String']>
  lastOpDate?: Maybe<Scalars['String']>
}

export interface IAM2VirtualIDGroupVO {
  uuid: Scalars['String']
  name?: Maybe<Scalars['String']>
  state?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  attributes?: Maybe<Array<IAM2Attribute>>
  createDate?: Maybe<Scalars['String']>
  lastOpDate?: Maybe<Scalars['String']>
  virtualIDCount?: Maybe<Scalars['Int']>
  projectVirtualIDGroupRef?: Maybe<Array<IAM2Project>>
  platformRoles?: Maybe<Array<Role>>
  projectRoles?: Maybe<Array<Role>>
  projectUuidForRole?: Maybe<Scalars['String']>
}

export interface IAM2VirtualIDGroupResp {
  list?: Maybe<Array<IAM2VirtualIDGroupVO>>
  total?: Maybe<Scalars['Float']>
}

export interface CanAddToIAM2VirtualIDGroupResp {
  list?: Maybe<Array<IAM2VirtualIDGroupVO>>
  total?: Maybe<Scalars['Float']>
}

export interface IAM2VirtualID {
  uuid: Scalars['String']
  name?: Maybe<Scalars['String']>
  state?: Maybe<Scalars['String']>
  type?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  attributes?: Maybe<Array<IAM2Attribute>>
  createDate?: Maybe<Scalars['String']>
  lastOpDate?: Maybe<Scalars['String']>
}

export interface IAM2VirtualIDExtraInfo {
  phone?: Maybe<Scalars['String']>
  identifier?: Maybe<Scalars['String']>
  fullname?: Maybe<Scalars['String']>
  mail?: Maybe<Scalars['String']>
  phoneUuid?: Maybe<Scalars['String']>
  identifierUuid?: Maybe<Scalars['String']>
  fullnameUuid?: Maybe<Scalars['String']>
  mailUuid?: Maybe<Scalars['String']>
}

export interface VirtualIdIdentity {
  projectUuid?: Maybe<Scalars['String']>
  identity?: Maybe<Scalars['String']>
}

export interface VirtualIdRelatedZone {
  zoneUuidList?: Maybe<Array<Scalars['String']>>
  zoneList?: Maybe<Array<Zone>>
  allZones?: Maybe<Scalars['Boolean']>
}

export interface IAM2VirtualIDVO {
  uuid: Scalars['String']
  name?: Maybe<Scalars['String']>
  state?: Maybe<Scalars['String']>
  type?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  attributes?: Maybe<Array<IAM2Attribute>>
  createDate?: Maybe<Scalars['String']>
  lastOpDate?: Maybe<Scalars['String']>
  extraInfo?: Maybe<IAM2VirtualIDExtraInfo>
  projectVirtualIDRef?: Maybe<Array<IAM2Project>>
  organizationVirtualIDRef?: Maybe<Array<IAM2Organization>>
  platformRoles?: Maybe<Array<Role>>
  projectRoles?: Maybe<Array<Role>>
  projectRolesForVirtualID?: Maybe<Array<Role>>
  virtualIdIdentity?: Maybe<Array<VirtualIdIdentity>>
  relatedZone?: Maybe<VirtualIdRelatedZone>
  virtualIdGroup?: Maybe<Array<IAM2VirtualIDGroup>>
  supervisorOrgUuids?: Maybe<Array<Scalars['String']>>
}

export interface TwoFactorAuthentication {
  secret?: Maybe<Scalars['String']>
}

export interface IAM2VirtualIDResp {
  list?: Maybe<Array<IAM2VirtualIDVO>>
  total?: Maybe<Scalars['Float']>
  result?: Maybe<IAM2VirtualIDQueryType>
}

export enum IAM2VirtualIDQueryType {
  Normal = 'Normal',
  FilterPorject = 'FilterPorject',
  FilterByOrganization = 'FilterByOrganization',
  FilterByVirtualidGroup = 'FilterByVirtualidGroup',
  ProjectVirtualID = 'ProjectVirtualID'
}

export interface TwoFactorAuthenticationResp {
  list?: Maybe<Array<TwoFactorAuthentication>>
  total?: Maybe<Scalars['Float']>
}

export interface IAM2AttributeResp {
  list?: Maybe<Array<IAM2Attribute>>
  total?: Maybe<Scalars['Float']>
}

export interface GlobalConfig {
  category?: Maybe<Scalars['String']>
  defaultValue: Scalars['String']
  description?: Maybe<Scalars['String']>
  name: Scalars['String']
  value: Scalars['String']
  uuid?: Maybe<Scalars['String']>
}

export interface GlobalConfigList {
  list?: Maybe<Array<GlobalConfig>>
  total: Scalars['Float']
  error?: Maybe<ActionError>
}

export interface ResourceConfigInPage {
  category?: Maybe<Scalars['String']>
  defaultValue: Scalars['String']
  description?: Maybe<Scalars['String']>
  name: Scalars['String']
  value: Scalars['String']
  uuid: Scalars['String']
  resourceType?: Maybe<Scalars['String']>
  resourceUuid: Scalars['String']
  globalConfigValue: Scalars['String']
  isGlobalConfig: Scalars['Boolean']
}

export interface ResourceConfigList {
  list?: Maybe<Array<ResourceConfigInPage>>
}

export interface CustomAction {
  actionId: Scalars['String']
  jobResult?: Maybe<Scalars['String']>
  transit?: Maybe<Scalars['String']>
}

export interface NetflowCollector {
  uuid: Scalars['String']
  name: Scalars['String']
  description?: Maybe<Scalars['String']>
  flowMeterUuid: Scalars['String']
  server: Scalars['String']
  port: Scalars['Int']
  createDate: Scalars['String']
  lastOpDate: Scalars['String']
}

export interface NetflowNetworkRef {
  uuid: Scalars['String']
  vRouterUuid: Scalars['String']
  flowMeterUuid: Scalars['String']
  l3NetworkUuid: Scalars['String']
  createDate: Scalars['String']
  lastOpDate: Scalars['String']
}

export interface Netflow {
  uuid: Scalars['String']
  name: Scalars['String']
  description?: Maybe<Scalars['String']>
  /** 流的采样率 */
  sample?: Maybe<Scalars['Int']>
  /** 流发送间隔 */
  expireInterval?: Maybe<Scalars['Int']>
  /** 流量监控协议的版本 */
  version: Scalars['String']
  /** 流量监控协议 */
  type: Scalars['String']
  createDate?: Maybe<Scalars['String']>
  /** 最后一次修改时间 */
  lastOpDate?: Maybe<Scalars['String']>
  /** VPC路由器数量 */
  vRouterCount: Scalars['Int']
  /** 流量监控搜集器 */
  collectors: Array<NetflowCollector>
  /** 网络信息 */
  networkRefs: Array<NetflowNetworkRef>
}

export interface NetflowQueryResp {
  list?: Maybe<Array<Netflow>>
  total?: Maybe<Scalars['Float']>
}

export interface VpcVRouterNetwork {
  uuid: Scalars['ID']
  /** name */
  name: Scalars['String']
  /** description */
  description?: Maybe<Scalars['String']>
  /** 网络类型 */
  type?: Maybe<Scalars['String']>
  hypervisorType?: Maybe<Scalars['String']>
  /** IP范围 */
  ipRanges?: Maybe<Array<IpRange>>
  /** 创建时间 */
  createDate?: Maybe<Scalars['String']>
  /** 最后操作时间 */
  lastOpDate?: Maybe<Scalars['String']>
  /** IP版本 */
  ipVersion?: Maybe<Scalars['Float']>
  /** 类别 */
  category?: Maybe<Scalars['String']>
  /** ip可用量 */
  ipCapacity?: Maybe<IpCapacity>
  /** DHCP服务IP */
  dhcpIp?: Maybe<DhcpIp>
  /** mtu */
  mtu?: Maybe<Scalars['Float']>
  /** 资源所有者 */
  owner?: Maybe<L3Owner>
  /** DNS */
  dns?: Maybe<Array<Scalars['String']>>
  /** 对应的二层网络 */
  l2Network?: Maybe<L2Network>
  /** 对应的二层网络的uuid */
  l2NetworkUuid?: Maybe<Scalars['String']>
  /** 私有网络接口ip */
  routerInterfaceIp?: Maybe<Scalars['String']>
  /** 三层网络类型判断 */
  networkTypeName?: Maybe<Scalars['String']>
  networkType: Scalars['String']
  /** 是否为系统网络 */
  system?: Maybe<Scalars['Boolean']>
  /** 是否为流量网络 */
  mirrorNetwork?: Maybe<Scalars['Boolean']>
  /** 网络服务类型 */
  networkServices?: Maybe<Array<NetworkServices>>
  virtualRouterOffering?: Maybe<VirtualRouterOffering>
  virtualRouterOfferingUuid?: Maybe<Scalars['String']>
  vpcVRouter?: Maybe<L3VpcVRouter>
  shareType: ShareType
  /** zone uuid */
  zoneUuid?: Maybe<Scalars['ID']>
  /** l2Netwrok.enableSRIOV */
  enableSRIOV?: Maybe<Scalars['Boolean']>
  /** 查询开启流量监控的VPC网络 uuid(QueryVRouterFlowMeterNetwork) */
  refUuid: Scalars['String']
}

export interface VpcVRouterByNetflow {
  uuid: Scalars['String']
  name: Scalars['String']
  vmNics?: Maybe<Array<VmNic>>
  createDate?: Maybe<Scalars['String']>
  /** 包装后的网络信息 */
  vpcVRouterNetworks?: Maybe<Array<VpcVRouterNetwork>>
}

export interface VpcVRouterByNetflowQueryResp {
  list?: Maybe<Array<VpcVRouterByNetflow>>
  total?: Maybe<Scalars['Float']>
}

export interface DNS {
  vpcRouterUuid?: Maybe<Scalars['String']>
  dns?: Maybe<Scalars['String']>
  createDate?: Maybe<Scalars['String']>
  lastOpDate?: Maybe<Scalars['String']>
}

export interface VpcVRouterSystemTag {
  bootOrder?: Maybe<Array<Scalars['String']>>
  bootOrderOnce?: Maybe<Scalars['Boolean']>
  ha?: Maybe<Scalars['String']>
  sshkey?: Maybe<Scalars['String']>
  consolePassword?: Maybe<Scalars['String']>
  vmConsoleMode?: Maybe<Scalars['String']>
  bootMode?: Maybe<Scalars['String']>
  RDPEnable?: Maybe<Scalars['Boolean']>
  usbRedirect?: Maybe<Scalars['Boolean']>
  VDIMonitorNumber?: Maybe<Scalars['String']>
  userdata?: Maybe<Scalars['String']>
  qemuga?: Maybe<Scalars['String']>
  vmCpuPinning?: Maybe<Scalars['String']>
  antiSpoofing?: Maybe<Scalars['String']>
  autoReleaseSpecReleatedPhysicalPciDevice?: Maybe<Scalars['Boolean']>
  autoReleaseSpecReleatedVirtualPciDevice?: Maybe<Scalars['Boolean']>
  vmPriority?: Maybe<Scalars['String']>
  guestTools?: Maybe<Scalars['String']>
  haStickStragedy?: Maybe<Scalars['Boolean']>
}

export interface VdiPortInfo {
  vncPort: Scalars['Int']
  spicePort: Scalars['Int']
  spiceTlsPort: Scalars['Int']
}

export interface VmConsoleAddress {
  hostIp?: Maybe<Scalars['String']>
  port?: Maybe<Scalars['Int']>
  protocol?: Maybe<ProtocolEnum>
  vdiPortInfo?: Maybe<VdiPortInfo>
}

export enum ProtocolEnum {
  Vnc = 'Vnc',
  Spice = 'Spice',
  VncAndSpice = 'VncAndSpice'
}

export interface HaRef {
  uuid: Scalars['String']
  vpcHaRouterUuid: Scalars['String']
}

export interface VpcSummary {
  total: Scalars['Int']
  running: Scalars['Int']
  stopped: Scalars['Int']
  paused: Scalars['Int']
  unknown: Scalars['Int']
  other: Scalars['Int']
  available: Scalars['Int']
  destroyed: Scalars['Int']
}

export interface VpcRelatedSummary {
  vip: Scalars['Int']
  eip: Scalars['Int']
  ipsec: Scalars['Int']
  portForwarding: Scalars['Int']
  loadBalancer: Scalars['Int']
  ospf: Scalars['Int']
}

export interface Monitor {
  id: Scalars['String']
  vpcHaRouterUuid: Scalars['String']
  monitorIp: Scalars['String']
  createDate: Scalars['String']
  lastOpDate: Scalars['String']
}

export interface VrRef {
  uuid: Scalars['String']
  vpcHaRouterUuid: Scalars['String']
}

export interface Service {
  id: Scalars['Int']
  vpcHaRouterUuid: Scalars['String']
  networkServiceName: Scalars['String']
  networkServiceUuid: Scalars['String']
  createDate: Scalars['String']
  lastOpDate: Scalars['String']
}

export interface VPCUsedIp {
  vpcHaRouterUuid: Scalars['String']
  vipUuid: Scalars['String']
  l3NetworkUuid: Scalars['String']
  ip: Scalars['String']
  netmask: Scalars['String']
}

export interface VpcHaGroup {
  uuid: Scalars['String']
  name: Scalars['String']
  createDate: Scalars['String']
  lastOpDate: Scalars['String']
  monitors: Array<Monitor>
  vrRefs: Array<VrRef>
  services: Array<Service>
  usedIps: Array<VPCUsedIp>
  description?: Maybe<Scalars['String']>
  owner?: Maybe<CommonOwner>
  vip?: Maybe<VipNetwork>
}

export interface VpcVRouter {
  uuid: Scalars['String']
  name: Scalars['String']
  publicNetworkUuid?: Maybe<Scalars['String']>
  virtualRouterVips?: Maybe<Array<Scalars['String']>>
  applianceVmType?: Maybe<Scalars['String']>
  managementNetworkUuid?: Maybe<Scalars['String']>
  defaultRouteL3NetworkUuid?: Maybe<Scalars['String']>
  agentPort?: Maybe<Scalars['Int']>
  description?: Maybe<Scalars['String']>
  zoneUuid?: Maybe<Scalars['String']>
  clusterUuid?: Maybe<Scalars['String']>
  imageUuid?: Maybe<Scalars['String']>
  hostUuid?: Maybe<Scalars['String']>
  lastHostUuid?: Maybe<Scalars['String']>
  instanceOfferingUuid?: Maybe<Scalars['String']>
  rootVolumeUuid?: Maybe<Scalars['String']>
  platform?: Maybe<Scalars['String']>
  defaultL3NetworkUuid?: Maybe<Scalars['String']>
  type?: Maybe<Scalars['String']>
  hypervisorType?: Maybe<Scalars['String']>
  memorySize?: Maybe<Scalars['Float']>
  cpuNum?: Maybe<Scalars['Int']>
  cpuSpeed?: Maybe<Scalars['Float']>
  allocatorStrategy?: Maybe<Scalars['String']>
  createDate?: Maybe<Scalars['String']>
  lastOpDate?: Maybe<Scalars['String']>
  state?: Maybe<Scalars['String']>
  status?: Maybe<Scalars['String']>
  dns?: Maybe<Array<DNS>>
  haStatus?: Maybe<Scalars['String']>
  haRef?: Maybe<Array<HaRef>>
  haGroup?: Maybe<VpcHaGroup>
  vmNics?: Maybe<Array<VmNic>>
  allVolumes?: Maybe<Array<Volume>>
  image?: Maybe<Image>
  host?: Maybe<Host>
  lastHost?: Maybe<Host>
  owner?: Maybe<VmOwner>
  cluster?: Maybe<Cluster>
  systemTag?: Maybe<VpcVRouterSystemTag>
  capabilities?: Maybe<VmCapabilities>
  distributedRoutingEnabled?: Maybe<Scalars['Boolean']>
  SNATEnabled?: Maybe<Scalars['Boolean']>
  STSUuid?: Maybe<Scalars['String']>
  consoleAddress?: Maybe<VmConsoleAddress>
  netflow?: Maybe<Netflow>
  virtualRouterOffering?: Maybe<VirtualRouterOffering>
}

export interface VpcResponse {
  total?: Maybe<Scalars['Int']>
  list: Array<VpcVRouter>
}

export interface VpcVRouterDistributedRoutingConnections {
  sourceL2NetworkType: Scalars['String']
  destinationL2NetworkType: Scalars['String']
  sourceMac: Scalars['String']
  destinationMac: Scalars['String']
  sourceL2NetworkVni: Scalars['String']
  destinationL2NetworkVni: Scalars['String']
  lastOpDate: Scalars['String']
  status: Scalars['String']
}

export interface IVpcVRouterDistributedRoutingConnections {
  connections: VpcVRouterDistributedRoutingConnections
}

export interface VpcVRouterDistributedRoutingConnectionsResp {
  list: IVpcVRouterDistributedRoutingConnections
}

export interface VpcHaGroupResponse {
  total?: Maybe<Scalars['Int']>
  list: Array<VpcHaGroup>
}

export interface DiskOfferingSystemTags {
  volumeTotalBandwidth?: Maybe<Scalars['String']>
  volumeReadBandwidth?: Maybe<Scalars['String']>
  volumeWriteBandwidth?: Maybe<Scalars['String']>
  diskOfferingUserConfig?: Maybe<Scalars['String']>
}

export interface DiskOffering {
  uuid: Scalars['String']
  name: Scalars['String']
  description?: Maybe<Scalars['String']>
  diskSize: Scalars['Float']
  sortKey: Scalars['Int']
  state: Scalars['String']
  type: Scalars['String']
  createDate: Scalars['String']
  lastOpDate: Scalars['String']
  allocatorStrategy: Scalars['String']
  toPublic: Scalars['Boolean']
  systemTags: DiskOfferingSystemTags
  shareType: ShareType
}

export interface DiskOfferingQueryResp {
  list?: Maybe<Array<DiskOffering>>
  total?: Maybe<Scalars['Int']>
}

export interface ValidatDiskOfferingUserConfigResp {
  valid: Scalars['Boolean']
  /** 错误内容 */
  error?: Maybe<Scalars['String']>
}

export interface VolumeSnapshotGroupAvailability {
  revertState?: Maybe<RevertState>
  reason?: Maybe<Scalars['String']>
  /** uuid */
  uuid?: Maybe<Scalars['String']>
}

export enum RevertState {
  Available = 'Available',
  Unable = 'Unable'
}

export interface VolumeSnapshotGroupRef {
  volumeSnapshotGroupUuid?: Maybe<Scalars['String']>
  volumeSnapshotUuid?: Maybe<Scalars['String']>
  volumeName?: Maybe<Scalars['String']>
  volumeUuid?: Maybe<Scalars['String']>
}

export interface VolumeSnapshotGroup {
  /** uuid */
  uuid: Scalars['String']
  /** 名字 */
  name?: Maybe<Scalars['String']>
  volumeSnapshotRefs?: Maybe<Array<VolumeSnapshotGroupRef>>
  /** 简介 */
  description?: Maybe<Scalars['String']>
  /** 创建时间 */
  createDate?: Maybe<Scalars['String']>
  /** 最后操作时间 */
  lastOpDate?: Maybe<Scalars['String']>
  /** 快照数量 */
  snapshotCount?: Maybe<Scalars['String']>
  /** 云主机uuid */
  vmInstanceUuid?: Maybe<Scalars['String']>
  /** 云主机 */
  vmInstance?: Maybe<VmInstance>
  /** 总容量 */
  totalSize?: Maybe<Scalars['Float']>
  snapshotType?: Maybe<SnapshotType>
  /** 恢复状态 */
  snapshotGroupAvailability?: Maybe<VolumeSnapshotGroupAvailability>
}

export enum SnapshotType {
  Single = 'Single',
  Group = 'Group'
}

export interface VolumeSnapshot {
  uuid: Scalars['ID']
  /** name */
  name?: Maybe<Scalars['String']>
  /** description */
  description?: Maybe<Scalars['String']>
  /** volumeUuid */
  volumeUuid?: Maybe<Scalars['String']>
  /** size */
  size?: Maybe<Scalars['Float']>
  /** state */
  state?: Maybe<Scalars['String']>
  /** status */
  status?: Maybe<Scalars['String']>
  /** treeUuid */
  treeUuid?: Maybe<Scalars['String']>
  /** 云盘类型 */
  volumeType?: Maybe<Scalars['String']>
  /** type */
  type?: Maybe<Scalars['String']>
  /** primaryStorageInstallPath */
  primaryStorageInstallPath?: Maybe<Scalars['String']>
  /** 主存储Uuid */
  primaryStorageUuid?: Maybe<Scalars['String']>
  /** 快照组Uuid */
  groupUuid?: Maybe<Scalars['String']>
  /** format */
  format?: Maybe<Scalars['String']>
  /** parentUuid */
  parentUuid?: Maybe<Scalars['String']>
  createDate?: Maybe<Scalars['String']>
  lastOpDate?: Maybe<Scalars['String']>
  latest?: Maybe<Scalars['Boolean']>
  volume?: Maybe<Volume>
  snapshotType?: Maybe<SnapshotType>
  group?: Maybe<VolumeSnapshotGroup>
}

export interface VolumeSnapshotTree {
  /** uuid */
  uuid?: Maybe<Scalars['String']>
  /** volumeUuid */
  volumeUuid?: Maybe<Scalars['String']>
  /** tree */
  tree?: Maybe<Scalars['String']>
  /** isCurrent */
  current?: Maybe<Scalars['Boolean']>
}

export interface VolumeSnapshotListResp {
  list?: Maybe<Array<VolumeSnapshot>>
  total?: Maybe<Scalars['Float']>
}

export interface VolumeSnapshotTreeListResp {
  list: Array<VolumeSnapshotTree>
  total: Scalars['Float']
  error?: Maybe<ActionError>
}

export interface SnapshotGroupByVolume {
  volumeUuid?: Maybe<Scalars['String']>
  count?: Maybe<Scalars['Float']>
  size?: Maybe<Scalars['Float']>
  volume?: Maybe<Volume>
  vm?: Maybe<VmInstance>
}

export interface SnapshotGroupByVolumeList {
  list: Array<SnapshotGroupByVolume>
  total: Scalars['Float']
}

export interface MdevDeviceSpec {
  uuid: Scalars['String']
  name: Scalars['String']
  description?: Maybe<Scalars['String']>
  specification?: Maybe<Scalars['String']>
  type?: Maybe<Scalars['String']>
  state?: Maybe<Scalars['String']>
  createDate?: Maybe<Scalars['String']>
  lastOpDate?: Maybe<Scalars['String']>
}

export interface MdevDeviceSpecQueryResp {
  list?: Maybe<Array<MdevDeviceSpec>>
  total?: Maybe<Scalars['Float']>
}

export interface CertificateListenerRef {
  certificateUuid: Scalars['String']
  listenerUuid: Scalars['String']
  id: Scalars['Float']
  createDate?: Maybe<Scalars['String']>
  lastOpDate?: Maybe<Scalars['String']>
  listener?: Maybe<Listener>
}

export interface Certificate {
  name: Scalars['String']
  uuid: Scalars['String']
  certificate?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  createDate?: Maybe<Scalars['String']>
  lastOpDate?: Maybe<Scalars['String']>
  listeners?: Maybe<Array<CertificateListenerRef>>
}

export interface QueryCertificateResp {
  list?: Maybe<Array<Certificate>>
  total?: Maybe<Scalars['Float']>
}

export interface VmNicRef {
  id?: Maybe<Scalars['Int']>
  listenerUuid?: Maybe<Scalars['String']>
  vmNicUuid?: Maybe<Scalars['String']>
  status?: Maybe<Scalars['String']>
  createDate?: Maybe<Scalars['String']>
  lastOpDate?: Maybe<Scalars['String']>
}

export interface CertificateRef {
  id?: Maybe<Scalars['Int']>
  listenerUuid?: Maybe<Scalars['String']>
  certificateUuid?: Maybe<Scalars['String']>
  createDate?: Maybe<Scalars['String']>
  lastOpDate?: Maybe<Scalars['String']>
}

export interface ListenerSystemTag {
  balancerAlgorithm?: Maybe<Scalars['String']>
  connectionIdleTimeout?: Maybe<Scalars['Float']>
  healthyThreshold?: Maybe<Scalars['Float']>
  unhealthyThreshold?: Maybe<Scalars['Float']>
  healthCheckInterval?: Maybe<Scalars['Float']>
  maxConnection?: Maybe<Scalars['Float']>
  healthCheckTarget?: Maybe<Scalars['String']>
  healthCheckProtocol?: Maybe<Scalars['String']>
  healthCheckMethod?: Maybe<Scalars['String']>
  healthCheckURI?: Maybe<Scalars['String']>
  healthCheckHttpCode?: Maybe<Scalars['String']>
}

export interface ServerGroupRef {
  id: Scalars['String']
  listenerUuid: Scalars['String']
  serverGroupUuid: Scalars['String']
  createDate?: Maybe<Scalars['String']>
  lastOpDate?: Maybe<Scalars['String']>
}

export interface Listener {
  name: Scalars['String']
  uuid: Scalars['String']
  loadBalancerPort: Scalars['Int']
  description?: Maybe<Scalars['String']>
  loadBalancerUuid?: Maybe<Scalars['String']>
  instancePort?: Maybe<Scalars['Int']>
  protocol?: Maybe<Scalars['String']>
  createDate?: Maybe<Scalars['String']>
  lastOpDate?: Maybe<Scalars['String']>
  vmNicRefs?: Maybe<Array<VmNicRef>>
  certificateRefs?: Maybe<Array<CertificateRef>>
  owner?: Maybe<CommonOwner>
  loadBalancer?: Maybe<LoadBalancer>
  certificates?: Maybe<Array<Certificate>>
  systemTag?: Maybe<ListenerSystemTag>
  serverGroupRefs?: Maybe<Array<ServerGroupRef>>
}

export interface QueryListenerResp {
  list?: Maybe<Array<Listener>>
  total?: Maybe<Scalars['Float']>
}

export interface SlbOffering {
  uuid: Scalars['String']
  name: Scalars['String']
  description?: Maybe<Scalars['String']>
  cpuNum: Scalars['Float']
  cpuSpeed?: Maybe<Scalars['Float']>
  memorySize: Scalars['Float']
  state: Scalars['String']
  allocatorStrategy: AllocatorStrategyType
  type?: Maybe<Scalars['String']>
  sortKey?: Maybe<Scalars['Float']>
  imageUuid?: Maybe<Scalars['String']>
  image?: Maybe<Image>
  managementNetworkUuid?: Maybe<Scalars['String']>
  managementNetwork?: Maybe<L3Network>
  zoneUuid?: Maybe<Scalars['String']>
  shareType?: Maybe<ShareType>
  createDate?: Maybe<Scalars['String']>
  lastOpDate?: Maybe<Scalars['String']>
}

export interface SlbOfferingList {
  list?: Maybe<Array<SlbOffering>>
  total: Scalars['Float']
  error?: Maybe<ActionError>
}

export interface SlbGroupNetwork {
  createDate?: Maybe<Scalars['String']>
  lastOpDate?: Maybe<Scalars['String']>
  slbGroupUuid?: Maybe<Scalars['String']>
  l3NetworkUuid?: Maybe<Scalars['String']>
  type?: Maybe<Scalars['String']>
  l3NetworkCategory?: Maybe<Scalars['String']>
  l3NetworkType?: Maybe<Scalars['String']>
}

export interface SlbGroup {
  name: Scalars['String']
  uuid: Scalars['String']
  backendType?: Maybe<Scalars['String']>
  createDate?: Maybe<Scalars['String']>
  lastOpDate?: Maybe<Scalars['String']>
  deployType?: Maybe<Scalars['String']>
  lbs?: Maybe<Array<LoadBalancer>>
  slbOfferingUuid?: Maybe<Scalars['String']>
  slbOffering?: Maybe<SlbOffering>
  networks?: Maybe<Array<SlbGroupNetwork>>
  slbVms?: Maybe<Array<VpcVRouter>>
}

export interface LoadBalancer {
  name: Scalars['String']
  uuid: Scalars['String']
  description?: Maybe<Scalars['String']>
  state?: Maybe<State>
  vipUuid?: Maybe<Scalars['String']>
  vipNetwork?: Maybe<VipNetwork>
  type?: Maybe<Scalars['String']>
  createDate?: Maybe<Scalars['String']>
  lastOpDate?: Maybe<Scalars['String']>
  listeners?: Maybe<Array<Listener>>
  owner?: Maybe<CommonOwner>
  slbGroupUuid?: Maybe<Scalars['String']>
  slbGroup?: Maybe<SlbGroup>
}

export enum State {
  Enabled = 'Enabled',
  Disabled = 'Disabled'
}

export interface QueryLoadBalancerResp {
  list?: Maybe<Array<LoadBalancer>>
  total?: Maybe<Scalars['Float']>
}

export interface ListenerServerGroupRef {
  id: Scalars['Float']
  listenerUuid?: Maybe<Scalars['String']>
  listener?: Maybe<Listener>
  serverGroupUuid?: Maybe<Scalars['String']>
}

export interface ServerIP {
  id: Scalars['String']
  serverGroupUuid?: Maybe<Scalars['String']>
  ipAddress?: Maybe<Scalars['String']>
  weight?: Maybe<Scalars['Float']>
  status?: Maybe<Scalars['String']>
  createDate?: Maybe<Scalars['String']>
  lastOpDate?: Maybe<Scalars['String']>
}

export interface ServerGroupVmNicRef {
  id: Scalars['Float']
  serverGroupUuid?: Maybe<Scalars['String']>
  vmNicUuid?: Maybe<Scalars['String']>
  weight?: Maybe<Scalars['Float']>
  vmNic?: Maybe<VmNic>
  status?: Maybe<Scalars['String']>
  createDate?: Maybe<Scalars['String']>
  lastOpDate?: Maybe<Scalars['String']>
  owner: CommonOwner
}

export interface BackendServer {
  name?: Maybe<Scalars['String']>
  weight?: Maybe<Scalars['Float']>
  ipAddress?: Maybe<Scalars['String']>
  vmNic?: Maybe<VmNic>
  healthStatus?: Maybe<Scalars['String']>
  owner?: Maybe<CommonOwner>
  status?: Maybe<Scalars['String']>
}

export interface ServerGroup {
  name: Scalars['String']
  uuid: Scalars['String']
  loadBalancerUuid?: Maybe<Scalars['String']>
  loadBalancer?: Maybe<LoadBalancer>
  weight?: Maybe<Scalars['Float']>
  description?: Maybe<Scalars['String']>
  createDate?: Maybe<Scalars['String']>
  lastOpDate?: Maybe<Scalars['String']>
  listenerServerGroupRefs?: Maybe<Array<ListenerServerGroupRef>>
  vmNicRefs?: Maybe<Array<ServerGroupVmNicRef>>
  serverIps?: Maybe<Array<ServerIP>>
  owner?: Maybe<CommonOwner>
  unhealthyServerCount?: Maybe<Scalars['Float']>
}

export interface QueryServerGroupResp {
  list?: Maybe<Array<ServerGroup>>
  total?: Maybe<Scalars['Float']>
}

export interface QueryBackendServerResp {
  list?: Maybe<Array<BackendServer>>
  total?: Maybe<Scalars['Float']>
}

export interface EmailAddress {
  uuid: Scalars['String']
  emailAddress: Scalars['String']
  endpointUuid: Scalars['String']
  createDate: Scalars['String']
  lastOpDate: Scalars['String']
}

export interface Receiver {
  uuid: Scalars['String']
  type: Scalars['String']
  phoneNumber: Scalars['String']
  endpointUuid: Scalars['String']
  createDate: Scalars['String']
  lastOpDate: Scalars['String']
}

export interface QueryEndPointResp {
  list?: Maybe<Array<EndPoint>>
  total?: Maybe<Scalars['Int']>
}

export type EndPoint =
  | HttpEndPoint
  | EmailEndPoint
  | SmsEndPoint
  | DingTalkEndPoint
  | MicrosoftTeamsEndPoint

export interface HttpEndPoint extends BasicEndPoint {
  name: Scalars['String']
  uuid: Scalars['String']
  description?: Maybe<Scalars['String']>
  type?: Maybe<EndPointType>
  state?: Maybe<EndPointState>
  platformUuid?: Maybe<Scalars['String']>
  createDate?: Maybe<Scalars['String']>
  lastOpDate?: Maybe<Scalars['String']>
  topic?: Maybe<SNSTopic>
  url?: Maybe<Scalars['String']>
}

export interface BasicEndPoint {
  name: Scalars['String']
  uuid: Scalars['String']
  description?: Maybe<Scalars['String']>
  type?: Maybe<EndPointType>
  state?: Maybe<EndPointState>
  platformUuid?: Maybe<Scalars['String']>
  createDate?: Maybe<Scalars['String']>
  lastOpDate?: Maybe<Scalars['String']>
  topic?: Maybe<SNSTopic>
}

export enum EndPointType {
  Email = 'Email',
  DingTalk = 'DingTalk',
  SYSTEM_HTTP = 'SYSTEM_HTTP',
  HTTP = 'HTTP',
  AliyunSms = 'AliyunSms',
  MicrosoftTeams = 'MicrosoftTeams'
}

export enum EndPointState {
  Enabled = 'Enabled',
  Disabled = 'Disabled'
}

export interface SNSTopic {
  name?: Maybe<Scalars['String']>
  uuid?: Maybe<Scalars['String']>
  state?: Maybe<Scalars['String']>
  createDate?: Maybe<Scalars['String']>
}

export interface EmailEndPoint extends BasicEndPoint {
  name: Scalars['String']
  uuid: Scalars['String']
  description?: Maybe<Scalars['String']>
  type?: Maybe<EndPointType>
  state?: Maybe<EndPointState>
  platformUuid?: Maybe<Scalars['String']>
  createDate?: Maybe<Scalars['String']>
  lastOpDate?: Maybe<Scalars['String']>
  topic?: Maybe<SNSTopic>
  emailAddresses: Array<EmailAddress>
}

export interface SmsEndPoint extends BasicEndPoint {
  name: Scalars['String']
  uuid: Scalars['String']
  description?: Maybe<Scalars['String']>
  type?: Maybe<EndPointType>
  state?: Maybe<EndPointState>
  platformUuid?: Maybe<Scalars['String']>
  createDate?: Maybe<Scalars['String']>
  lastOpDate?: Maybe<Scalars['String']>
  topic?: Maybe<SNSTopic>
  receivers: Array<Receiver>
}

export interface DingTalkEndPoint extends BasicEndPoint {
  name: Scalars['String']
  uuid: Scalars['String']
  description?: Maybe<Scalars['String']>
  type?: Maybe<EndPointType>
  state?: Maybe<EndPointState>
  platformUuid?: Maybe<Scalars['String']>
  createDate?: Maybe<Scalars['String']>
  lastOpDate?: Maybe<Scalars['String']>
  topic?: Maybe<SNSTopic>
  atAll: Scalars['Boolean']
  atPersonPhoneNumbers: Array<Scalars['String']>
  url?: Maybe<Scalars['String']>
}

export interface MicrosoftTeamsEndPoint extends BasicEndPoint {
  name: Scalars['String']
  uuid: Scalars['String']
  description?: Maybe<Scalars['String']>
  type?: Maybe<EndPointType>
  state?: Maybe<EndPointState>
  platformUuid?: Maybe<Scalars['String']>
  createDate?: Maybe<Scalars['String']>
  lastOpDate?: Maybe<Scalars['String']>
  topic?: Maybe<SNSTopic>
  url?: Maybe<Scalars['String']>
}

export interface EndPointEmailAddress {
  uuid: Scalars['String']
  emailAddress?: Maybe<Scalars['String']>
  endpointUuid?: Maybe<Scalars['String']>
  createDate?: Maybe<Scalars['String']>
  lastOpDate?: Maybe<Scalars['String']>
}

export interface QueryEndPointEmailAddressResp {
  list?: Maybe<Array<EndPointEmailAddress>>
  total?: Maybe<Scalars['Int']>
}

export interface EndPointSmsAddress {
  uuid?: Maybe<Scalars['String']>
  phoneNumber?: Maybe<Scalars['String']>
  endpointUuid?: Maybe<Scalars['String']>
  createDate?: Maybe<Scalars['String']>
  lastOpDate?: Maybe<Scalars['String']>
}

export interface QueryEndPointSmsAddressList {
  list?: Maybe<Array<EndPointSmsAddress>>
  total?: Maybe<Scalars['Int']>
}

export interface AutoScalingGroupSystemTag {
  initialInstanceNumber?: Maybe<Scalars['String']>
  initializationInstanceCompleted?: Maybe<Scalars['String']>
  automaticallyRemoveUnhealthyInstance?: Maybe<Scalars['String']>
  vmInstanceHealthStrategy?: Maybe<Scalars['String']>
  vmNicLoadbalancerListenerHealthCheckGraceTimeSeconds?: Maybe<Scalars['String']>
}

export interface LoadBalancerListener {
  name?: Maybe<Scalars['String']>
  uuid?: Maybe<Scalars['String']>
  loadBalancerUuid?: Maybe<Scalars['String']>
}

export interface SecurityGroupInAutoScalingGroup {
  name?: Maybe<Scalars['String']>
  uuid?: Maybe<Scalars['String']>
}

export interface ScalingRule {
  adjustmentType?: Maybe<Scalars['String']>
  adjustmentValue?: Maybe<Scalars['String']>
  cooldown?: Maybe<Scalars['Float']>
  removalPolicy?: Maybe<Scalars['String']>
  ruleUuid?: Maybe<Scalars['String']>
  comparisonOperator?: Maybe<Scalars['String']>
  metricName?: Maybe<Scalars['String']>
  alarmUuid?: Maybe<Scalars['String']>
  period?: Maybe<Scalars['Float']>
  threshold?: Maybe<Scalars['Float']>
  repeatInterval?: Maybe<Scalars['Float']>
}

export interface AutoScalingGroupVmTemplate {
  vmInstanceName?: Maybe<Scalars['String']>
  vmInstanceOfferingUuid?: Maybe<Scalars['String']>
  vmInstanceOffering?: Maybe<InstanceOffering>
  uuid?: Maybe<Scalars['String']>
  vmInstanceDescription?: Maybe<Scalars['String']>
  name?: Maybe<Scalars['String']>
  imageUuid?: Maybe<Scalars['String']>
  image?: Maybe<Image>
  defaultL3NetworkUuid?: Maybe<Scalars['String']>
  l3Network?: Maybe<L3Network>
  dataDiskOfferingUuids?: Maybe<Array<Scalars['String']>>
  diskOfferings?: Maybe<Array<DiskOffering>>
  sshkey?: Maybe<Scalars['String']>
  userdata?: Maybe<Scalars['String']>
  userdataTagUuid?: Maybe<Scalars['String']>
  consolePassword?: Maybe<Scalars['String']>
  securityGroupUuid?: Maybe<Scalars['String']>
  securityGroup?: Maybe<SecurityGroupInAutoScalingGroup>
  affinityGroupUuid?: Maybe<Scalars['String']>
  affinityGroup?: Maybe<AffinityGroup>
  loadBalancerListenerUuids?: Maybe<Scalars['String']>
}

export interface AutoScalingGroup {
  name: Scalars['String']
  description?: Maybe<Scalars['String']>
  maxResourceSize?: Maybe<Scalars['Float']>
  minResourceSize?: Maybe<Scalars['Float']>
  state?: Maybe<AutoScalingGroupState>
  defaultCooldown?: Maybe<Scalars['Float']>
  attachedTemplates: Array<Scalars['String']>
  createDate?: Maybe<Scalars['String']>
  lastOpDate?: Maybe<Scalars['String']>
  scalingResourceType?: Maybe<Scalars['String']>
  vmInstanceUuidList?: Maybe<Array<Scalars['String']>>
  healthyVmInstanceNum?: Maybe<Scalars['Int']>
  totalVmInstanceNum?: Maybe<Scalars['Int']>
  uuid: Scalars['String']
  systemTags?: Maybe<AutoScalingGroupSystemTag>
  loadBalancerListeners?: Maybe<Array<LoadBalancerListener>>
  loadBalancer?: Maybe<LoadBalancer>
  vmTemplates?: Maybe<AutoScalingGroupVmTemplate>
  endPoints?: Maybe<Array<EndPoint>>
  addingNewInstanceRule?: Maybe<ScalingRule>
  removalInstanceRule?: Maybe<ScalingRule>
}

export enum AutoScalingGroupState {
  Enabled = 'Enabled',
  Disabled = 'Disabled',
  Deleting = 'Deleting'
}

export interface AutoScalingGroupResp {
  list: Array<AutoScalingGroup>
  total: Scalars['Float']
  error?: Maybe<ActionError>
}

export interface AutoScalingGroupActivity {
  activityAction?: Maybe<Scalars['String']>
  cause?: Maybe<Scalars['String']>
  createDate?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  endDate?: Maybe<Scalars['String']>
  lastOpDate?: Maybe<Scalars['String']>
  scalingGroupUuid?: Maybe<Scalars['String']>
  status?: Maybe<Scalars['String']>
  uuid: Scalars['String']
}

export interface AutoScalingGroupActivityResp {
  list: Array<AutoScalingGroupActivity>
  total: Scalars['Float']
}

export interface RemoteSecurityGroup {
  uuid: Scalars['String']
  name: Scalars['String']
}

export interface SecurityGroupRule {
  uuid: Scalars['String']
  securityGroupUuid?: Maybe<Scalars['String']>
  type?: Maybe<SecurityGroupRuleType>
  ipVersion?: Maybe<Scalars['Int']>
  startPort?: Maybe<Scalars['Int']>
  endPort?: Maybe<Scalars['Int']>
  protocol?: Maybe<SecurityGroupRuleProtocolType>
  state?: Maybe<SecurityGroupRuleState>
  allowedCidr?: Maybe<Scalars['String']>
  remoteSecurityGroupUuid?: Maybe<Scalars['String']>
  remoteSecurityGroup?: Maybe<RemoteSecurityGroup>
  createDate?: Maybe<Scalars['String']>
  lastOpDate?: Maybe<Scalars['String']>
}

export enum SecurityGroupRuleType {
  Ingress = 'Ingress',
  Egress = 'Egress'
}

export enum SecurityGroupRuleProtocolType {
  TCP = 'TCP',
  UDP = 'UDP',
  ICMP = 'ICMP',
  ALL = 'ALL'
}

export enum SecurityGroupRuleState {
  Enabled = 'Enabled',
  Disabled = 'Disabled'
}

export interface SecurityGroup {
  uuid: Scalars['String']
  name: Scalars['String']
  description?: Maybe<Scalars['String']>
  state?: Maybe<SecurityGroupState>
  ipVersion?: Maybe<Scalars['Int']>
  createDate?: Maybe<Scalars['String']>
  lastOpDate?: Maybe<Scalars['String']>
  attachedL3NetworkUuids?: Maybe<Array<Scalars['String']>>
  rules?: Maybe<Array<SecurityGroupRule>>
  owner?: Maybe<CommonOwner>
}

export enum SecurityGroupState {
  Enabled = 'Enabled',
  Disabled = 'Disabled'
}

export interface SecurityGroupList {
  list?: Maybe<Array<SecurityGroup>>
  total?: Maybe<Scalars['Int']>
}

export interface SecurityGroupRuleList {
  list?: Maybe<Array<SecurityGroupRule>>
  total?: Maybe<Scalars['Int']>
}

export interface RpGroup {
  uuid: Scalars['String']
  multicastRouterUuid?: Maybe<Scalars['String']>
  rpAddress?: Maybe<Scalars['String']>
  groupAddress?: Maybe<Scalars['String']>
  createDate?: Maybe<Scalars['String']>
  lastOpDate?: Maybe<Scalars['String']>
}

export interface VpcVr {
  uuid: Scalars['String']
  vpcRouterUuid: Scalars['String']
}

export interface MulticastRouter {
  uuid: Scalars['String']
  /** @deprecated 已弃用 */
  vpcRouterUuid?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  createDate?: Maybe<Scalars['String']>
  lastOpDate?: Maybe<Scalars['String']>
  state?: Maybe<Scalars['String']>
  rpGroups: Array<RpGroup>
  vpcVrs: Array<VpcVr>
}

export interface QueryMulticastRouterResp {
  list?: Maybe<Array<MulticastRouter>>
  total?: Maybe<Scalars['Float']>
}

export interface VpcMulticastRoute {
  sourceAddress: Scalars['String']
  groupAddress: Scalars['String']
  ingressInterfaces: Scalars['String']
  egressInterfaces: Scalars['String']
}

export interface QueryVpcMulticastRouteResp {
  list?: Maybe<Array<VpcMulticastRoute>>
  total?: Maybe<Scalars['Float']>
}

export interface VmRelatedResource {
  volume: Scalars['Int']
  nic: Scalars['Int']
  cdrom: Scalars['Int']
  lun: Scalars['Int']
  usb: Scalars['Int']
  gpu: Scalars['Int']
  vgpu: Scalars['Int']
  pci: Scalars['Int']
}

export interface ScsiLunVmInstanceRefInventory {
  id?: Maybe<Scalars['Float']>
  scsiLunUuid?: Maybe<Scalars['String']>
  vmInstanceUuid?: Maybe<Scalars['String']>
  deviceId?: Maybe<Scalars['Float']>
  attachMultipath?: Maybe<Scalars['Boolean']>
  createDate?: Maybe<Scalars['String']>
  lastOpDate?: Maybe<Scalars['String']>
}

export interface ScsiLunHostRefInventory {
  id?: Maybe<Scalars['Float']>
  scsiLunUuid?: Maybe<Scalars['String']>
  hostUuid?: Maybe<Scalars['String']>
  createDate?: Maybe<Scalars['String']>
  lastOpDate?: Maybe<Scalars['String']>
}

export interface ScsiLun {
  uuid: Scalars['String']
  name: Scalars['String']
  wwid?: Maybe<Scalars['String']>
  vendor?: Maybe<Scalars['String']>
  model?: Maybe<Scalars['String']>
  wwn?: Maybe<Scalars['String']>
  serial?: Maybe<Scalars['String']>
  type?: Maybe<Scalars['String']>
  path?: Maybe<Scalars['String']>
  state?: Maybe<Scalars['String']>
  size?: Maybe<Scalars['Float']>
  multipathDeviceUuid?: Maybe<Scalars['String']>
  scsiLunHostRefs?: Maybe<Array<ScsiLunHostRefInventory>>
  scsiLunVmInstanceRefs?: Maybe<Array<ScsiLunVmInstanceRefInventory>>
  source?: Maybe<Scalars['String']>
  createDate?: Maybe<Scalars['String']>
  lastOpDate?: Maybe<Scalars['String']>
}

export interface ScsiLunList {
  list?: Maybe<Array<ScsiLun>>
  total: Scalars['Float']
  error?: Maybe<ActionError>
}

export interface UsbDevice {
  uuid: Scalars['String']
  name: Scalars['String']
  description?: Maybe<Scalars['String']>
  hostUuid?: Maybe<Scalars['String']>
  host?: Maybe<Host>
  vmInstanceUuid?: Maybe<Scalars['String']>
  vmInstance?: Maybe<VmInstance>
  busNum?: Maybe<Scalars['String']>
  devNum?: Maybe<Scalars['String']>
  idVendor?: Maybe<Scalars['String']>
  idProduct?: Maybe<Scalars['String']>
  iManufacturer?: Maybe<Scalars['String']>
  iProduct?: Maybe<Scalars['String']>
  iSerial?: Maybe<Scalars['String']>
  usbVersion?: Maybe<Scalars['String']>
  attachType?: Maybe<Scalars['String']>
  createDate?: Maybe<Scalars['String']>
  lastOpDate?: Maybe<Scalars['String']>
  state?: Maybe<Scalars['String']>
}

export interface UsbDeviceQueryResp {
  list?: Maybe<Array<UsbDevice>>
  total?: Maybe<Scalars['Float']>
}

export interface VCenterVm {
  uuid: Scalars['String']
  name: Scalars['String']
  description: Scalars['String']
  instanceOfferingUuid: Scalars['String']
  imageUuid: Scalars['String']
  rootDiskOffering: Scalars['String']
  hostUuid: Scalars['String']
  dataDiskOfferingUuids: Scalars['String']
  clusterUuid: Scalars['String']
  primaryStorageUuidForRootVolume: Scalars['String']
  systemTags: Array<Scalars['String']>
  nicList: Array<Scalars['String']>
}

export interface VCenterVmActionResp {
  result?: Maybe<VCenterVm>
  error?: Maybe<ActionError>
}

export interface VCenterVmQueryResp {
  list?: Maybe<Array<VCenterVm>>
  total?: Maybe<Scalars['Float']>
}

export interface LabelType {
  Description?: Maybe<Scalars['String']>
  Severity?: Maybe<Scalars['String']>
  User?: Maybe<Scalars['String']>
  Target?: Maybe<Scalars['String']>
  Time?: Maybe<Scalars['String']>
}

export interface VcenterMessage {
  uuid?: Maybe<Scalars['String']>
  resourceName?: Maybe<Scalars['String']>
  labels?: Maybe<LabelType>
}

export interface VcenterMessageQueryResp {
  list?: Maybe<Array<VcenterMessage>>
  total?: Maybe<Scalars['Float']>
}

export interface Trash {
  uuid: Scalars['Int']
  createDate?: Maybe<Scalars['String']>
  resourceUuid?: Maybe<Scalars['String']>
  trashId: Scalars['Int']
  installPath?: Maybe<Scalars['String']>
  size?: Maybe<Scalars['Float']>
  /** BackupStorageVO | PrimaryStorageVO */
  storageType?: Maybe<Scalars['String']>
  trashType?: Maybe<Scalars['String']>
}

export interface TrashResp {
  list?: Maybe<Array<Trash>>
  total?: Maybe<Scalars['Float']>
}

export interface CephMon {
  uuid: Scalars['String']
  createDate?: Maybe<Scalars['String']>
  lastOpDate?: Maybe<Scalars['String']>
  backupStorageUuid?: Maybe<Scalars['String']>
  hostname?: Maybe<Scalars['String']>
  monAddr?: Maybe<Scalars['String']>
  monPort?: Maybe<Scalars['String']>
  monUuid: Scalars['String']
  primaryStorageUuid?: Maybe<Scalars['String']>
  sshPort?: Maybe<Scalars['Int']>
  sshPassword?: Maybe<Scalars['String']>
  sshUsername?: Maybe<Scalars['String']>
  status?: Maybe<MonStatus>
}

export enum MonStatus {
  Connecting = 'Connecting',
  Connected = 'Connected',
  Disconnected = 'Disconnected'
}

export interface MonsQueryResp {
  list?: Maybe<Array<CephMon>>
  total?: Maybe<Scalars['Float']>
}

export interface IscsiLun {
  uuid: Scalars['String']
  name: Scalars['String']
  wwid?: Maybe<Scalars['String']>
  vendor?: Maybe<Scalars['String']>
  model?: Maybe<Scalars['String']>
  wwn?: Maybe<Scalars['String']>
  serial?: Maybe<Scalars['String']>
  type?: Maybe<Scalars['String']>
  path?: Maybe<Scalars['String']>
  state?: Maybe<Scalars['String']>
  size?: Maybe<Scalars['Float']>
  multipathDeviceUuid?: Maybe<Scalars['String']>
  scsiLunHostRefs?: Maybe<Array<ScsiLunHostRefInventory>>
  scsiLunVmInstanceRefs?: Maybe<Array<ScsiLunVmInstanceRefInventory>>
  source?: Maybe<Scalars['String']>
  createDate?: Maybe<Scalars['String']>
  lastOpDate?: Maybe<Scalars['String']>
  iscsiTargetUuid?: Maybe<Scalars['String']>
  hctl?: Maybe<Scalars['String']>
}

export interface IscsiLunList {
  list?: Maybe<Array<IscsiLun>>
  total: Scalars['Float']
  error?: Maybe<ActionError>
}

export interface IscsiTargetInventory {
  iscsiServerUuid?: Maybe<Scalars['String']>
  uuid?: Maybe<Scalars['String']>
  iqn?: Maybe<Scalars['String']>
  state?: Maybe<Scalars['String']>
  iscsiLuns?: Maybe<Array<IscsiLun>>
  createDate?: Maybe<Scalars['String']>
  lastOpDate?: Maybe<Scalars['String']>
}

export interface IscsiServerClusterRefInventory {
  id?: Maybe<Scalars['Float']>
  iscsiServerUuid?: Maybe<Scalars['String']>
  clusterUuid?: Maybe<Scalars['String']>
  createDate?: Maybe<Scalars['String']>
  lastOpDate?: Maybe<Scalars['String']>
}

export interface IscsiServer {
  uuid: Scalars['String']
  name: Scalars['String']
  ip?: Maybe<Scalars['String']>
  port?: Maybe<Scalars['String']>
  chapUserName?: Maybe<Scalars['String']>
  state?: Maybe<Scalars['String']>
  iscsiTargets?: Maybe<Array<IscsiTargetInventory>>
  iscsiClusterRefs?: Maybe<Array<IscsiServerClusterRefInventory>>
  createDate?: Maybe<Scalars['String']>
  lastOpDate?: Maybe<Scalars['String']>
}

export interface IscsiServerList {
  list?: Maybe<Array<IscsiServer>>
  total: Scalars['Float']
  error?: Maybe<ActionError>
}

export interface IscsiServerRelateSummary {
  vmInstanceCount?: Maybe<Scalars['Float']>
  volumeCount?: Maybe<Scalars['Float']>
}

export interface FiberChannelLun {
  uuid: Scalars['String']
  name: Scalars['String']
  wwid?: Maybe<Scalars['String']>
  vendor?: Maybe<Scalars['String']>
  model?: Maybe<Scalars['String']>
  wwn?: Maybe<Scalars['String']>
  serial?: Maybe<Scalars['String']>
  type?: Maybe<Scalars['String']>
  path?: Maybe<Scalars['String']>
  state?: Maybe<Scalars['String']>
  size?: Maybe<Scalars['Float']>
  multipathDeviceUuid?: Maybe<Scalars['String']>
  scsiLunHostRefs?: Maybe<Array<ScsiLunHostRefInventory>>
  scsiLunVmInstanceRefs?: Maybe<Array<ScsiLunVmInstanceRefInventory>>
  source?: Maybe<Scalars['String']>
  createDate?: Maybe<Scalars['String']>
  lastOpDate?: Maybe<Scalars['String']>
  fiberChannelStorageUuid?: Maybe<Scalars['String']>
}

export interface FiberChannelLunList {
  list?: Maybe<Array<FiberChannelLun>>
  total: Scalars['Float']
  error?: Maybe<ActionError>
}

export interface FiberChannelStorage {
  uuid: Scalars['String']
  name: Scalars['String']
  wwnn?: Maybe<Scalars['String']>
  state?: Maybe<Scalars['String']>
  fiberChannelLuns?: Maybe<Array<FiberChannelLun>>
  createDate?: Maybe<Scalars['String']>
  lastOpDate?: Maybe<Scalars['String']>
}

export interface FiberChannelStorageList {
  list?: Maybe<Array<FiberChannelStorage>>
  total: Scalars['Float']
  error?: Maybe<ActionError>
}

export interface SharedBlock {
  uuid: Scalars['ID']
  name: Scalars['String']
  description?: Maybe<Scalars['String']>
  createDate?: Maybe<Scalars['String']>
  lastOpDate?: Maybe<Scalars['String']>
  diskUuid?: Maybe<Scalars['String']>
  sharedBlockGroupUuid?: Maybe<Scalars['String']>
  state?: Maybe<SharedBlockState>
  status?: Maybe<SharedBlockStatus>
  type?: Maybe<Scalars['String']>
}

export enum SharedBlockState {
  Enabled = 'Enabled',
  Disabled = 'Disabled',
  Maintenance = 'Maintenance',
  Deleting = 'Deleting'
}

export enum SharedBlockStatus {
  Connecting = 'Connecting',
  Connected = 'Connected',
  Disconnected = 'Disconnected'
}

export interface CandidateSharedBlock {
  uuid: Scalars['ID']
  /** 资源名称 */
  name: Scalars['String']
  /** 磁盘全局唯一表示 */
  wwid: Scalars['String']
  /** 磁盘WWN */
  wwn?: Maybe<Scalars['String']>
  /** 磁盘供应商 */
  vendor?: Maybe<Scalars['String']>
  /** SCSI设备HCTL */
  hctl?: Maybe<Scalars['String']>
  /** 磁盘型号 */
  model?: Maybe<Scalars['String']>
  /** 磁盘序列号 */
  serial?: Maybe<Scalars['String']>
  /** 设备类型 */
  type?: Maybe<Scalars['String']>
  /** 磁盘路径 */
  path?: Maybe<Scalars['String']>
  /** 磁盘启用状态 */
  state?: Maybe<Scalars['String']>
  /** 磁盘大小 */
  size?: Maybe<Scalars['String']>
  /** 创建时间 */
  createDate?: Maybe<Scalars['String']>
  /** 最后一次修改时间 */
  lastOpDate?: Maybe<Scalars['String']>
}

export interface SharedBlockResponse {
  list?: Maybe<Array<SharedBlock>>
  total?: Maybe<Scalars['Float']>
}

export interface CandidateSharedBlockResponse {
  list?: Maybe<Array<CandidateSharedBlock>>
  total?: Maybe<Scalars['Float']>
}

export interface VCenterCluster {
  uuid: Scalars['String']
  name?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  state?: Maybe<ClusterState>
  hypervisorType?: Maybe<Scalars['String']>
  zoneUuid?: Maybe<Scalars['String']>
  type?: Maybe<Scalars['String']>
  vCenterUuid?: Maybe<Scalars['String']>
  morval?: Maybe<Scalars['String']>
  dataCenterUuid?: Maybe<Scalars['String']>
  createDate?: Maybe<Scalars['String']>
  lastOpDate?: Maybe<Scalars['String']>
}

export interface VCenterClusterList {
  list?: Maybe<Array<VCenterCluster>>
  total: Scalars['Float']
  error?: Maybe<ActionError>
}

export interface VCenterPrimaryStorage {
  uuid: Scalars['String']
  name?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  zoneUuid?: Maybe<Scalars['String']>
  url?: Maybe<Scalars['String']>
  state?: Maybe<PrimaryStorageState>
  status?: Maybe<PrimaryStorageStatus>
  availableCapacity?: Maybe<Scalars['Float']>
  totalCapacity?: Maybe<Scalars['Float']>
  totalPhysicalCapacity?: Maybe<Scalars['Float']>
  availablePhysicalCapacity?: Maybe<Scalars['Float']>
  systemUsedCapacity?: Maybe<Scalars['Float']>
  mountPath?: Maybe<Scalars['String']>
  type?: Maybe<Scalars['String']>
  attachedClusterUuids?: Maybe<Array<Scalars['String']>>
  vCenterUuid?: Maybe<Scalars['String']>
  datastore?: Maybe<Scalars['String']>
  createDate?: Maybe<Scalars['String']>
  lastOpDate?: Maybe<Scalars['String']>
}

export interface VCenterPrimaryStorageList {
  list?: Maybe<Array<VCenterPrimaryStorage>>
  total: Scalars['Float']
  error?: Maybe<ActionError>
}

export interface VCenterBackupStorage {
  uuid: Scalars['String']
  name: Scalars['String']
  description?: Maybe<Scalars['String']>
  url?: Maybe<Scalars['String']>
  state?: Maybe<BackupStorageState>
  status?: Maybe<BackupStorageStatus>
  availableCapacity?: Maybe<Scalars['Float']>
  totalCapacity?: Maybe<Scalars['Float']>
  attachedZoneUuids?: Maybe<Array<Scalars['String']>>
  type?: Maybe<Scalars['String']>
  vCenterUuid?: Maybe<Scalars['String']>
  datastore?: Maybe<Scalars['String']>
  createDate?: Maybe<Scalars['String']>
  lastOpDate?: Maybe<Scalars['String']>
}

export enum BackupStorageStatus {
  Connecting = 'Connecting',
  Connected = 'Connected',
  Disconnected = 'Disconnected'
}

export interface VCenterBackupStorageList {
  list?: Maybe<Array<VCenterBackupStorage>>
  total: Scalars['Float']
  error?: Maybe<ActionError>
}

export interface VCenterResourcePoolUsageInventory {
  uuid: Scalars['String']
  vCenterResourcePoolUuid?: Maybe<Scalars['String']>
  resourceUuid?: Maybe<Scalars['String']>
  resourceType?: Maybe<Scalars['String']>
  createDate?: Maybe<Scalars['String']>
  lastOpDate?: Maybe<Scalars['String']>
}

export interface VCenterResourcePool {
  uuid: Scalars['String']
  vCenterClusterUuid?: Maybe<Scalars['String']>
  name?: Maybe<Scalars['String']>
  morVal?: Maybe<Scalars['String']>
  parentUuid?: Maybe<Scalars['String']>
  CPULimit?: Maybe<Scalars['Float']>
  CPUOverheadLimit?: Maybe<Scalars['Float']>
  CPUReservation?: Maybe<Scalars['Float']>
  CPUShares?: Maybe<Scalars['Float']>
  CPULevel?: Maybe<Scalars['String']>
  memoryLimit?: Maybe<Scalars['Float']>
  memoryOverheadLimit?: Maybe<Scalars['Float']>
  memoryReservation?: Maybe<Scalars['Float']>
  memoryShares?: Maybe<Scalars['Float']>
  memoryLevel?: Maybe<Scalars['String']>
  subResources?: Maybe<Array<VCenterResourcePoolUsageInventory>>
  createDate?: Maybe<Scalars['String']>
  lastOpDate?: Maybe<Scalars['String']>
  parentItemName?: Maybe<Scalars['String']>
  vmInResourcePool?: Maybe<Scalars['String']>
}

export interface VCenterResourcePoolList {
  list?: Maybe<Array<VCenterResourcePool>>
  total: Scalars['Float']
  error?: Maybe<ActionError>
}

export interface PciDeviceOffering {
  uuid: Scalars['String']
  type?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  name?: Maybe<Scalars['String']>
  vendorId?: Maybe<Scalars['String']>
  deviceId?: Maybe<Scalars['String']>
  subvendorId?: Maybe<Scalars['String']>
  subdeviceId?: Maybe<Scalars['String']>
  createDate?: Maybe<Scalars['String']>
  lastOpDate?: Maybe<Scalars['String']>
  ramSize?: Maybe<Scalars['Int']>
  gpuDevice?: Maybe<PciDevice>
}

export interface PciDeviceOfferingList {
  list?: Maybe<Array<PciDeviceOffering>>
  total?: Maybe<Scalars['Float']>
}

export interface Owners {
  uuid?: Maybe<Scalars['String']>
  type?: Maybe<Scalars['String']>
  name?: Maybe<Scalars['String']>
}

export interface ThirdpartyPlatform {
  uuid: Scalars['String']
  name?: Maybe<Scalars['String']>
  state?: Maybe<Scalars['String']>
  owner?: Maybe<Owners>
  type?: Maybe<Scalars['String']>
  url?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  createDate?: Maybe<Scalars['String']>
  lastSyncDate?: Maybe<Scalars['String']>
  template?: Maybe<Scalars['String']>
  lastOpDate?: Maybe<Scalars['String']>
}

export interface ThirdpartyPlatformQueryResp {
  list?: Maybe<Array<ThirdpartyPlatform>>
  total?: Maybe<Scalars['Float']>
}

export interface AlarmLabels {
  uuid: Scalars['String']
  key?: Maybe<Scalars['String']>
  operator?: Maybe<Scalars['String']>
  value?: Maybe<Scalars['String']>
}

export interface AlarmActions {
  alarmUuid?: Maybe<Scalars['String']>
  subscriptionUuid?: Maybe<Scalars['String']>
  actionType?: Maybe<Scalars['String']>
  actionUuid?: Maybe<Scalars['String']>
}

export interface ZWatchAlarmVO {
  uuid: Scalars['String']
  name?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  createDate?: Maybe<Scalars['String']>
  lastOpDate?: Maybe<Scalars['String']>
  comparisonOperator?: Maybe<Scalars['String']>
  period?: Maybe<Scalars['Float']>
  namespace?: Maybe<Scalars['String']>
  metricName?: Maybe<Scalars['String']>
  threshold?: Maybe<Scalars['Float']>
  emergencyLevel?: Maybe<EmergencyLevelEmergencyLevel>
  enableRecovery?: Maybe<Scalars['Boolean']>
  eventName?: Maybe<Scalars['String']>
  repeatCount?: Maybe<Scalars['Float']>
  repeatInterval?: Maybe<Scalars['Float']>
  status?: Maybe<AlarmStatus>
  state?: Maybe<AlarmState>
  labels?: Maybe<Array<AlarmLabels>>
  actions?: Maybe<Array<AlarmActions>>
  topicNum?: Maybe<Scalars['Int']>
  userTag?: Maybe<UserTag>
  owner?: Maybe<BasicOwner>
  platform?: Maybe<ThirdpartyPlatform>
  thirdpartyPlatformName?: Maybe<Scalars['String']>
}

export enum EmergencyLevelEmergencyLevel {
  Emergent = 'Emergent',
  Important = 'Important',
  Normal = 'Normal'
}

export enum AlarmStatus {
  OK = 'OK',
  Alarm = 'Alarm',
  InsufficientData = 'InsufficientData'
}

export enum AlarmState {
  Enabled = 'Enabled',
  Disabled = 'Disabled'
}

export interface ZWatchAlarmVoResp {
  list?: Maybe<Array<ZWatchAlarmVO>>
  total?: Maybe<Scalars['Float']>
}

export interface MetricLabel {
  VMUuid?: Maybe<Scalars['String']>
  BaremetalVMUuid?: Maybe<Scalars['String']>
  HostUuid?: Maybe<Scalars['String']>
  CPUNum?: Maybe<Scalars['String']>
  DiskDeviceLetter?: Maybe<Scalars['String']>
  NetworkDeviceLetter?: Maybe<Scalars['String']>
  MountPoint?: Maybe<Scalars['String']>
}

export interface MetricLabelResp {
  labels: Array<MetricLabel>
}

export interface Audit {
  requestUuid?: Maybe<Scalars['String']>
  responseUuid?: Maybe<Scalars['String']>
  apiName?: Maybe<Scalars['String']>
  operatorAccountUuid?: Maybe<Scalars['String']>
  operatorAccountName?: Maybe<Scalars['String']>
  isError?: Maybe<Scalars['Boolean']>
  error?: Maybe<Scalars['String']>
  reason?: Maybe<Scalars['String']>
  duration?: Maybe<Scalars['Float']>
  time?: Maybe<Scalars['Float']>
  createTime?: Maybe<Scalars['Float']>
  clientIp?: Maybe<Scalars['String']>
  clientBrowser?: Maybe<Scalars['String']>
  requestDump?: Maybe<Scalars['String']>
  responseDump?: Maybe<Scalars['String']>
  resourceType?: Maybe<Scalars['String']>
  /** 资源 UUID */
  resourceUuid?: Maybe<Scalars['String']>
}

export interface AuditResp {
  list?: Maybe<Array<Audit>>
  total?: Maybe<Scalars['Float']>
}

export interface CurrentTime {
  MillionSeconds: Scalars['Float']
  Seconds: Scalars['Float']
}

export interface GetCurrentTime {
  currentTime: CurrentTime
}

export interface AlarmData {
  accountUuid: Scalars['String']
  alarmName: Scalars['String']
  alarmStatus: Scalars['String']
  alarmUuid: Scalars['String']
  comparisonOperator: Scalars['String']
  context: Scalars['String']
  dataUuid: Scalars['String']
  emergencyLevel: Scalars['String']
  labels: Scalars['String']
  metricName: Scalars['String']
  metricValue: Scalars['String']
  namespace: Scalars['String']
  period: Scalars['String']
  readStatus: Scalars['String']
  resourceType: Scalars['String']
  resourceUuid: Scalars['String']
  threshold: Scalars['String']
  time: Scalars['String']
}

export interface AssignResourceAlarmData {
  Important: Scalars['Float']
  Emergent: Scalars['Float']
  Normal: Scalars['Float']
}

export interface ResourceInAlarmHistories {
  uuid?: Maybe<Scalars['String']>
  type?: Maybe<Scalars['String']>
  tagType?: Maybe<Scalars['String']>
  tags?: Maybe<Array<Tag>>
}

export interface AckDataInAlarmHistories {
  ackPeriod?: Maybe<Scalars['String']>
  ackDate?: Maybe<Scalars['String']>
  operatorAccountUuid?: Maybe<Scalars['String']>
  owner?: Maybe<Owner>
  resumeAlert?: Maybe<Scalars['Boolean']>
}

export interface AlarmHistories {
  accountUuid?: Maybe<Scalars['String']>
  alarmName?: Maybe<Scalars['String']>
  alarmStatus?: Maybe<Scalars['String']>
  alarmUuid?: Maybe<Scalars['String']>
  subscriptionUuid?: Maybe<Scalars['String']>
  comparisonOperator?: Maybe<Scalars['String']>
  context?: Maybe<Scalars['String']>
  dataUuid: Scalars['String']
  uuid: Scalars['String']
  emergencyLevel?: Maybe<EmergencyLevelEmergencyLevel>
  labels?: Maybe<Scalars['String']>
  error?: Maybe<Scalars['String']>
  canLink?: Maybe<Scalars['Boolean']>
  metricName?: Maybe<Scalars['String']>
  metricValue?: Maybe<Scalars['String']>
  name?: Maybe<Scalars['String']>
  namespace?: Maybe<Scalars['String']>
  period?: Maybe<Scalars['String']>
  readStatus?: Maybe<Scalars['String']>
  resourceUuid?: Maybe<Scalars['String']>
  resourceName?: Maybe<Scalars['String']>
  resourceType?: Maybe<Scalars['String']>
  threshold?: Maybe<Scalars['String']>
  time?: Maybe<Scalars['String']>
  times?: Maybe<Scalars['Float']>
  resource?: Maybe<ResourceInAlarmHistories>
  ackData?: Maybe<AckDataInAlarmHistories>
  /** 报警器类型 alarm | event */
  type?: Maybe<Scalars['String']>
}

export interface QueryAlarmHistoriesResp {
  list?: Maybe<Array<AlarmHistories>>
  total?: Maybe<Scalars['Float']>
}

export interface UpdateEventDataResp {
  success?: Maybe<Scalars['Boolean']>
}

export interface UpdateAlarmDataResp {
  success?: Maybe<Scalars['Boolean']>
}

export interface ThirdPartyAlerts {
  uuid: Scalars['String']
  alertTime?: Maybe<Scalars['String']>
  alertLevel: EmergencyLevelEmergencyLevel
  createDate?: Maybe<Scalars['String']>
  dataSource?: Maybe<Scalars['String']>
  message?: Maybe<Scalars['String']>
  metric?: Maybe<Scalars['String']>
  product?: Maybe<Scalars['String']>
  readStatus?: Maybe<Scalars['String']>
  service?: Maybe<Scalars['String']>
  sourceText?: Maybe<Scalars['String']>
  thirdpartyPlatformUuid?: Maybe<Scalars['String']>
  thirdpartyPlatform?: Maybe<ThirdpartyPlatform>
}

export interface QueryThirdPartyAlertsResp {
  list?: Maybe<Array<ThirdPartyAlerts>>
  total?: Maybe<Scalars['Float']>
}

export interface UpdateThirdpartyAlertsResp {
  success?: Maybe<Scalars['Boolean']>
}

export interface StackTemplate {
  uuid: Scalars['String']
  name: Scalars['String']
  description?: Maybe<Scalars['String']>
  type?: Maybe<Scalars['String']>
  version?: Maybe<Scalars['String']>
  state?: Maybe<Scalars['Boolean']>
  md5sum?: Maybe<Scalars['String']>
  content?: Maybe<Scalars['String']>
  createDate?: Maybe<Scalars['String']>
  lastOpDate?: Maybe<Scalars['String']>
  owner?: Maybe<Owner>
  isSystemTemplate?: Maybe<Scalars['Boolean']>
  shareType?: Maybe<ShareType>
}

export interface QueryStackTemplateResp {
  list?: Maybe<Array<StackTemplate>>
  total?: Maybe<Scalars['Float']>
}

export interface SNSTextTemplate {
  uuid: Scalars['String']
  name: Scalars['String']
  description?: Maybe<Scalars['String']>
  type?: Maybe<Scalars['String']>
  sign?: Maybe<Scalars['String']>
  applicationPlatformType?: Maybe<Scalars['String']>
  template?: Maybe<Scalars['String']>
  recoveryTemplate?: Maybe<Scalars['String']>
  defaultTemplate?: Maybe<Scalars['Boolean']>
  eventTemplateCode?: Maybe<Scalars['String']>
  eventTemplate?: Maybe<Scalars['String']>
  alarmTemplateCode?: Maybe<Scalars['String']>
  createDate?: Maybe<Scalars['String']>
  lastOpDate?: Maybe<Scalars['String']>
}

export interface AliyunSmsSNSTextTemplate {
  uuid: Scalars['String']
  name: Scalars['String']
  description?: Maybe<Scalars['String']>
  alarmTemplateCode?: Maybe<Scalars['String']>
  applicationPlatformType?: Maybe<Scalars['String']>
  eventTemplate?: Maybe<Scalars['String']>
  eventTemplateCode?: Maybe<Scalars['String']>
  sign?: Maybe<Scalars['String']>
  template?: Maybe<Scalars['String']>
  type?: Maybe<Scalars['String']>
  createDate?: Maybe<Scalars['String']>
  lastOpDate?: Maybe<Scalars['String']>
}

export interface QuerySNSTextTemplateResp {
  list?: Maybe<Array<SNSTextTemplate>>
  total?: Maybe<Scalars['Float']>
}

export interface MonitorTemplate {
  uuid: Scalars['String']
  name?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  createDate?: Maybe<Scalars['String']>
  lastOpDate?: Maybe<Scalars['String']>
  shareType: ShareType
  monitorGroupNum?: Maybe<Scalars['Float']>
  ruleTemplateNum?: Maybe<Scalars['Float']>
  tag?: Maybe<Array<Tag>>
}

export interface QueryMonitorTemplateResp {
  list?: Maybe<Array<MonitorTemplate>>
  total?: Maybe<Scalars['Float']>
}

export interface MonitorGroupResource {
  uuid?: Maybe<Scalars['String']>
  name?: Maybe<Scalars['String']>
  type?: Maybe<Scalars['String']>
  l3Network?: Maybe<L3Network>
}

export interface GroupAction {
  groupUuid?: Maybe<Scalars['String']>
  actionType: Scalars['String']
  actionUuid: Scalars['String']
}

export interface MonitorGroupInstance {
  uuid: Scalars['String']
  instanceUuid: Scalars['String']
  status?: Maybe<Scalars['String']>
  instance?: Maybe<MonitorGroupResource>
  groupUuid: Scalars['String']
  instanceResourceType: Scalars['String']
  accountUuid?: Maybe<Scalars['String']>
  createDate?: Maybe<Scalars['String']>
  lastOpDate?: Maybe<Scalars['String']>
}

export interface MonitorGroupInstanceList {
  list: Array<MonitorGroupInstance>
  total?: Maybe<Scalars['Int']>
  error?: Maybe<ActionError>
}

export interface InstanceStatistics {
  instanceTotal?: Maybe<Scalars['Int']>
  instanceTypeCount?: Maybe<Scalars['Int']>
  unhealthyInstanceCount?: Maybe<Scalars['Int']>
}

export interface MonitorGroup {
  /** 资源的UUID，唯一标示该资源 */
  uuid: Scalars['String']
  /** 资源名称 */
  name: Scalars['String']
  /** 资源的详细描述 */
  description?: Maybe<Scalars['String']>
  monitorTemplate?: Maybe<MonitorTemplate>
  resourceTypeCount?: Maybe<Scalars['Int']>
  totalResourceCount?: Maybe<Scalars['Int']>
  unhealthResourceCount?: Maybe<Scalars['Int']>
  instanceStatistics?: Maybe<InstanceStatistics>
  owner?: Maybe<AccountOwner>
  tag?: Maybe<Array<Tag>>
  createDate: Scalars['String']
  lastOpDate: Scalars['String']
  actions?: Maybe<Array<GroupAction>>
}

export interface MonitorGroupList {
  list: Array<MonitorGroup>
  total?: Maybe<Scalars['Int']>
  error?: Maybe<ActionError>
}

export interface MonitorGroupAddResourceList {
  list: Array<MonitorGroupResource>
  total?: Maybe<Scalars['Int']>
  error?: Maybe<ActionError>
}

export interface NotifyObject {
  actionUuid?: Maybe<Scalars['String']>
}

export interface ActiveAlarmStatus {
  ActiveAlarmStatus?: Maybe<Scalars['String']>
  state?: Maybe<Scalars['String']>
}

export interface OneClickAlarmTemplate {
  uuid?: Maybe<Scalars['String']>
  alarmName?: Maybe<Scalars['String']>
  state?: Maybe<Scalars['String']>
  repeatCount?: Maybe<Scalars['Int']>
  period?: Maybe<Scalars['Int']>
  repeatInterval?: Maybe<Scalars['Int']>
  threshold?: Maybe<Scalars['Float']>
  operatorAccountName?: Maybe<Scalars['String']>
  emergencyLevel?: Maybe<Scalars['String']>
  comparisonOperator?: Maybe<Scalars['String']>
  actions?: Maybe<Array<NotifyObject>>
  actionsName?: Maybe<Array<Scalars['String']>>
  metricName?: Maybe<Scalars['String']>
  namespace?: Maybe<Scalars['String']>
}

export interface OneClickAlarmResourceCountResp {
  vmTotal?: Maybe<Scalars['Int']>
  hostTotal?: Maybe<Scalars['Int']>
  vpcRouterTotal?: Maybe<Scalars['Int']>
}

export interface OneClickAlarm {
  uuid?: Maybe<Scalars['String']>
  namespace?: Maybe<Scalars['String']>
  status?: Maybe<Scalars['String']>
  oneClickAlarmTemplate?: Maybe<Array<OneClickAlarmTemplate>>
}

export interface ActiveAlarm {
  uuid: Scalars['String']
  alarmName?: Maybe<Scalars['String']>
  repeatCount?: Maybe<Scalars['Int']>
  period?: Maybe<Scalars['Int']>
  repeatInterval?: Maybe<Scalars['Int']>
  threshold?: Maybe<Scalars['Float']>
  operatorAccountName?: Maybe<Scalars['String']>
  emergencyLevel?: Maybe<Scalars['String']>
  comparisonOperator?: Maybe<Scalars['String']>
  metricName?: Maybe<Scalars['String']>
  namespace?: Maybe<Scalars['String']>
  state?: Maybe<Scalars['String']>
  actions?: Maybe<NotifyObject>
}

export interface OneClickAlarmResp {
  list?: Maybe<Array<OneClickAlarm>>
  total?: Maybe<Scalars['Float']>
}

export interface CapacityManagementSize {
  size?: Maybe<Scalars['Float']>
}

export interface CapacityManagementFullSize {
  total?: Maybe<Scalars['Float']>
  size?: Maybe<Scalars['Float']>
}

export interface CapacityManagementActualSize {
  actualSize?: Maybe<Scalars['Float']>
  size?: Maybe<Scalars['Float']>
}

export interface CapacityManagementFullActualSize {
  total?: Maybe<Scalars['Float']>
  actualSize?: Maybe<Scalars['Float']>
  size?: Maybe<Scalars['Float']>
}

export interface CapacityManagementPrimaryStorageInfo {
  total?: Maybe<Scalars['Int']>
  usedCapacity?: Maybe<Scalars['Float']>
  usedPhysicalCapacity?: Maybe<Scalars['Float']>
  availableCapacity?: Maybe<Scalars['Float']>
  availablePhysicalCapacity?: Maybe<Scalars['Float']>
  totalCapacity?: Maybe<Scalars['Float']>
  totalPhysicalCapacity?: Maybe<Scalars['Float']>
  systemUsedCapacity?: Maybe<Scalars['Float']>
}

export interface CapacityManagementVolumeTotalSizeInfo {
  Root?: Maybe<CapacityManagementActualSize>
  Data?: Maybe<CapacityManagementActualSize>
}

export interface CapacityManagementCapacityInfo {
  totalCapacity?: Maybe<Scalars['Float']>
  availableCapacity?: Maybe<Scalars['Float']>
  usedCapacity?: Maybe<Scalars['Float']>
}

export interface CapacityManagementBackupStoreInfo {
  total?: Maybe<Scalars['Float']>
  totalCapacity?: Maybe<Scalars['Float']>
  availableCapacity?: Maybe<Scalars['Float']>
  usedCapacity?: Maybe<Scalars['Float']>
  ImageStoreBackupStorage?: Maybe<CapacityManagementCapacityInfo>
  Ceph?: Maybe<CapacityManagementCapacityInfo>
}

export interface CapacityManagementSizeInBackupStoreInfo {
  ImageStoreBackupStorage?: Maybe<CapacityManagementActualSize>
  Ceph?: Maybe<CapacityManagementActualSize>
}

export interface CapacityManagementComputeNodeInfo {
  zstackSize?: Maybe<Scalars['Float']>
  otherSize?: Maybe<Scalars['Float']>
  totalSize?: Maybe<Scalars['Float']>
}

export interface CapacityManagementManagementNodeInfo {
  total?: Maybe<Scalars['Float']>
  used?: Maybe<Scalars['Float']>
  available?: Maybe<Scalars['Float']>
  log?: Maybe<Scalars['Float']>
  database?: Maybe<Scalars['Float']>
  databaseBackup?: Maybe<Scalars['Float']>
  monitor?: Maybe<Scalars['Float']>
  upgradeBackup?: Maybe<Scalars['Float']>
}

export interface CapacityManagementCard {
  zoneUuid?: Maybe<Scalars['String']>
  /** 主存储（Local/Ceph/SharedBlock）的存储信息 (总数、可用容量、可用物理容量、总容量、总物理容量) */
  primaryStorageInfo?: Maybe<CapacityManagementPrimaryStorageInfo>
  /** 根盘/云盘的容量/真实容量统计信息 */
  volumeTotalSizeInfo?: Maybe<CapacityManagementVolumeTotalSizeInfo>
  /** 镜像缓存大小 */
  imageCacheSizeInfo?: Maybe<CapacityManagementSize>
  /** 主存储（Local/Ceph/SharedBlock）中的 Trash 大小 */
  primaryStorageTrashInfo?: Maybe<CapacityManagementSize>
  /** 镜像服务器相关信息 */
  backupStoreInfo?: Maybe<CapacityManagementBackupStoreInfo>
  /** 获取镜像服务器中的镜像大小，按 ImageStore/Ceph 类型区分 */
  imageSizeInBackupStoreInfo?: Maybe<CapacityManagementSizeInBackupStoreInfo>
  /** 获取镜像服务器中的备份相关数据的大小 */
  backupSizeInBackupStoreInfo?: Maybe<CapacityManagementSize>
  /** 获取镜像服务器中 Trash 大小，根据 ImageStore/Ceph 类型区分 */
  backupStoreTrashSizeInfo?: Maybe<CapacityManagementSizeInBackupStoreInfo>
  /** 获取云主机（根盘）相关信息，总数、总大小、总实际大小 */
  vmInstanceInfo?: Maybe<CapacityManagementFullActualSize>
  /** 获取云盘相关信息，总数、总大小、总实际大小 */
  dataVolumeInfo?: Maybe<CapacityManagementFullActualSize>
  /** 获取镜像相关信息，总数、总大小、总实际大小 */
  imageInfo?: Maybe<CapacityManagementFullActualSize>
  /** 获取快照相关信息，总数、总大小 */
  snapshotInfo?: Maybe<CapacityManagementFullSize>
  /** 获取计算节点相关信息，zstack 占用大小、总大小 */
  computeNodeInfo?: Maybe<CapacityManagementComputeNodeInfo>
  /** 获取管理节点信息，总容量、总已用、管理节点日志、数据库、数据库备份、监控、升级备份大小 */
  managementNodeInfo?: Maybe<CapacityManagementManagementNodeInfo>
}

export interface CapacityManagementTopListHostDetail {
  uuid?: Maybe<Scalars['String']>
  usedCapacityPercentage?: Maybe<Scalars['Float']>
  usedCapacity?: Maybe<Scalars['Float']>
  freeCapacity?: Maybe<Scalars['Float']>
}

export interface CapacityManagementTopListHost {
  uuid?: Maybe<Scalars['String']>
  name?: Maybe<Scalars['String']>
  usedRate?: Maybe<Scalars['Float']>
  usedCapacity?: Maybe<Scalars['Float']>
  availableCapacity?: Maybe<Scalars['Float']>
  totalCapacity?: Maybe<Scalars['Float']>
  /** 根分区已用量 */
  rootMountPointUsed?: Maybe<Scalars['Float']>
  detail?: Maybe<CapacityManagementTopListHostDetail>
}

export interface CapacityManagementTopListHostDiskInfo {
  key?: Maybe<Scalars['String']>
  diskDeviceLetter?: Maybe<Scalars['String']>
  mountPoint?: Maybe<Scalars['String']>
  fSType?: Maybe<Scalars['String']>
  free?: Maybe<Scalars['Float']>
  used?: Maybe<Scalars['Float']>
  total?: Maybe<Scalars['Float']>
  percent?: Maybe<Scalars['Float']>
}

export interface CapacityManagementTopListPrimaryStorageDetail {
  uuid?: Maybe<Scalars['String']>
  totalPhysicalCapacity?: Maybe<Scalars['Float']>
  availablePhysicalCapacity?: Maybe<Scalars['Float']>
  usedPhysicalCapacity?: Maybe<Scalars['Float']>
  usedPhysicalCapacityPercentage?: Maybe<Scalars['Float']>
  rootVolumeSize?: Maybe<Scalars['Float']>
  dataVolumeSize?: Maybe<Scalars['Float']>
  imageCacheSize?: Maybe<Scalars['Float']>
  trashSize?: Maybe<Scalars['Float']>
  systemSize?: Maybe<Scalars['Float']>
}

export interface CapacityManagementTopListPrimaryStorage {
  uuid?: Maybe<Scalars['String']>
  name?: Maybe<Scalars['String']>
  detail?: Maybe<CapacityManagementTopListPrimaryStorageDetail>
}

export interface CapacityManagementTopListBackupStorageDetail {
  uuid?: Maybe<Scalars['String']>
  totalCapacity?: Maybe<Scalars['Float']>
  availableCapacity?: Maybe<Scalars['Float']>
  usedCapacity?: Maybe<Scalars['Float']>
  usedCapacityPercentage?: Maybe<Scalars['Float']>
  imageSize?: Maybe<Scalars['Float']>
  backupSize?: Maybe<Scalars['Float']>
  trashSize?: Maybe<Scalars['Float']>
}

export interface CapacityManagementTopListBackupStorage {
  uuid?: Maybe<Scalars['String']>
  name?: Maybe<Scalars['String']>
  type?: Maybe<Scalars['String']>
  detail?: Maybe<CapacityManagementTopListBackupStorageDetail>
}

export interface CapacityManagementTopListImage {
  uuid?: Maybe<Scalars['String']>
  name?: Maybe<Scalars['String']>
  actualSize?: Maybe<Scalars['Float']>
  size?: Maybe<Scalars['Float']>
  system?: Maybe<Scalars['Boolean']>
}

export interface CapacityManagementTopListVmInstance {
  uuid?: Maybe<Scalars['String']>
  name?: Maybe<Scalars['String']>
  actualSize?: Maybe<Scalars['Float']>
  size?: Maybe<Scalars['Float']>
}

export interface CapacityManagementTopListVolume {
  uuid?: Maybe<Scalars['String']>
  name?: Maybe<Scalars['String']>
  actualSize?: Maybe<Scalars['Float']>
  size?: Maybe<Scalars['Float']>
}

export interface CapacityManagementTopListSnapshotResource {
  uuid?: Maybe<Scalars['String']>
  resourceUuid?: Maybe<Scalars['String']>
  resourceName?: Maybe<Scalars['String']>
  resourceType?: Maybe<Scalars['String']>
}

export interface CapacityManagementTopListSnapshot {
  uuid?: Maybe<Scalars['String']>
  name?: Maybe<Scalars['String']>
  size?: Maybe<Scalars['Float']>
  volumeUuid?: Maybe<Scalars['String']>
  volumeType?: Maybe<Scalars['String']>
  resource?: Maybe<CapacityManagementTopListSnapshotResource>
}

export interface CapacityManagementDisconnectedResourceCount {
  host?: Maybe<Scalars['Float']>
  primaryStorage?: Maybe<Scalars['Float']>
  backupStorage?: Maybe<Scalars['Float']>
  primaryStorageNotInCluster?: Maybe<Scalars['Float']>
  total?: Maybe<Scalars['Float']>
}

export interface MetricRuleTemplate {
  uuid: Scalars['String']
  name?: Maybe<Scalars['String']>
  namespace?: Maybe<Scalars['String']>
  repeatCount?: Maybe<Scalars['Float']>
  repeatInterval?: Maybe<Scalars['Float']>
  /** 监控阈值 */
  threshold?: Maybe<Scalars['Float']>
  /** 持续时间 */
  period?: Maybe<Scalars['Float']>
  monitorTemplateUuid?: Maybe<Scalars['String']>
  metricName?: Maybe<Scalars['String']>
  enableRecovery?: Maybe<Scalars['Boolean']>
  emergencyLevel?: Maybe<EmergencyLevelEmergencyLevel>
  /** 操作符 */
  comparisonOperator?: Maybe<ComparisonOperator>
}

export enum ComparisonOperator {
  GreaterThanOrEqualTo = 'GreaterThanOrEqualTo',
  GreaterThan = 'GreaterThan',
  LessThan = 'LessThan',
  LessThanOrEqualTo = 'LessThanOrEqualTo'
}

export interface QueryMetricRuleTemplateResp {
  list?: Maybe<Array<MetricRuleTemplate>>
  total?: Maybe<Scalars['Float']>
}

export interface EventRuleTempalteLabel {
  key: Scalars['String']
  op?: Maybe<Scalars['String']>
  value?: Maybe<Scalars['String']>
}

export interface EventRuleTemplate {
  uuid: Scalars['String']
  name?: Maybe<Scalars['String']>
  namespace?: Maybe<Scalars['String']>
  monitorTemplateUuid?: Maybe<Scalars['String']>
  eventName?: Maybe<Scalars['String']>
  emergencyLevel?: Maybe<EmergencyLevelEmergencyLevel>
  labels?: Maybe<Array<EventRuleTempalteLabel>>
}

export interface QueryEventRuleTemplateResp {
  list?: Maybe<Array<EventRuleTemplate>>
  total?: Maybe<Scalars['Float']>
}

export interface VmInstancePerformance {
  name: Scalars['String']
  uuid: Scalars['String']
  description?: Maybe<Scalars['String']>
  createDate?: Maybe<Scalars['String']>
  lastOpDate?: Maybe<Scalars['String']>
  affinityGroupUuid?: Maybe<Scalars['String']>
  cpuNum?: Maybe<Scalars['Int']>
  clusterUuid?: Maybe<Scalars['String']>
  hypervisorType?: Maybe<Scalars['String']>
  memorySize?: Maybe<Scalars['Float']>
  state?: Maybe<VmInstanceState>
  defaultL3NetworkUuid?: Maybe<Scalars['String']>
  instanceOfferingUuid: Scalars['String']
  instanceOffering?: Maybe<InstanceOffering>
  imageUuid?: Maybe<Scalars['String']>
  hostUuid?: Maybe<Scalars['String']>
  lastHostUuid?: Maybe<Scalars['String']>
  defaultL3Network?: Maybe<L3Network>
  eip?: Maybe<Array<EipInVminstance>>
  securityGroup?: Maybe<Array<SecurityGroupInVminstance>>
  platform?: Maybe<Scalars['String']>
  attachedShareableVolumeUuidList?: Maybe<Array<Scalars['String']>>
  rootVolumeUuid?: Maybe<Scalars['String']>
  zoneUuid?: Maybe<Scalars['String']>
  vmCdRoms?: Maybe<Array<CdRom>>
  allVolumes?: Maybe<Array<Volume>>
  cluster?: Maybe<Cluster>
  gpuDeviceSpec?: Maybe<Array<GpuDeivceSpecOnVmInstance>>
  image?: Maybe<Image>
  host?: Maybe<Host>
  lastHost?: Maybe<Host>
  primaryStorage?: Maybe<PrimaryStorage>
  owner?: Maybe<CommonOwner>
  systemTag?: Maybe<VmInstanceSystemTag>
  tag?: Maybe<Array<Tag>>
  relatedResource?: Maybe<RelatedResource>
  vmNics?: Maybe<Array<VmNic>>
  metric?: Maybe<MetricData>
  healthStatus?: Maybe<Scalars['String']>
  portForwarding?: Maybe<Array<PortForwarding>>
  affinityGroup?: Maybe<AffinityGroup>
  maxCdRomNum?: Maybe<MaxCdRomNum>
  vCenter?: Maybe<VCenter>
  consoleAddress?: Maybe<Array<Scalars['String']>>
  volumeAttributeUserConfig?: Maybe<Scalars['String']>
  backupStatus?: Maybe<Scalars['String']>
  type?: Maybe<Scalars['String']>
  toolsState?: Maybe<GuestToolsState>
  capabilities?: Maybe<VmCapabilities>
  bootOrder?: Maybe<BootOrderResp>
  plugInState?: Maybe<VmInstancePlugInStateType>
  OperatingSystemCPUUsedUtilization?: Maybe<Scalars['String']>
  OperatingSystemMemoryUsedPercent?: Maybe<Scalars['String']>
  DiskUsedCapacityInPercent?: Maybe<Scalars['String']>
  CPUAverageUsedUtilization?: Maybe<Scalars['String']>
  MemoryUsedInPercent?: Maybe<Scalars['String']>
  DiskAllReadBytes?: Maybe<Scalars['String']>
  DiskAllWriteBytes?: Maybe<Scalars['String']>
  DiskAllReadOps?: Maybe<Scalars['String']>
  DiskAllWriteOps?: Maybe<Scalars['String']>
  NetworkAllInBytes?: Maybe<Scalars['String']>
  NetworkAllOutBytes?: Maybe<Scalars['String']>
  NetworkAllInPackets?: Maybe<Scalars['String']>
  NetworkAllOutPackets?: Maybe<Scalars['String']>
  NetworkAllInErrors?: Maybe<Scalars['String']>
  NetworkAllOutErrors?: Maybe<Scalars['String']>
}

export enum VmInstancePlugInStateType {
  Stopped = 'Stopped',
  IsRunning = 'IsRunning',
  UnInstall = 'UnInstall',
  UnSupport = 'UnSupport'
}

export interface VmInstancePerformanceQueryResp {
  list?: Maybe<Array<VmInstancePerformance>>
  total?: Maybe<Scalars['Float']>
}

export interface VpcVRouterPerformance {
  uuid: Scalars['String']
  name: Scalars['String']
  publicNetworkUuid?: Maybe<Scalars['String']>
  virtualRouterVips?: Maybe<Array<Scalars['String']>>
  applianceVmType?: Maybe<Scalars['String']>
  managementNetworkUuid?: Maybe<Scalars['String']>
  defaultRouteL3NetworkUuid?: Maybe<Scalars['String']>
  agentPort?: Maybe<Scalars['Int']>
  description?: Maybe<Scalars['String']>
  zoneUuid?: Maybe<Scalars['String']>
  clusterUuid?: Maybe<Scalars['String']>
  imageUuid?: Maybe<Scalars['String']>
  hostUuid?: Maybe<Scalars['String']>
  lastHostUuid?: Maybe<Scalars['String']>
  instanceOfferingUuid?: Maybe<Scalars['String']>
  rootVolumeUuid?: Maybe<Scalars['String']>
  platform?: Maybe<Scalars['String']>
  defaultL3NetworkUuid?: Maybe<Scalars['String']>
  type?: Maybe<Scalars['String']>
  hypervisorType?: Maybe<Scalars['String']>
  memorySize?: Maybe<Scalars['Float']>
  cpuNum?: Maybe<Scalars['Int']>
  cpuSpeed?: Maybe<Scalars['Float']>
  allocatorStrategy?: Maybe<Scalars['String']>
  createDate?: Maybe<Scalars['String']>
  lastOpDate?: Maybe<Scalars['String']>
  state?: Maybe<Scalars['String']>
  status?: Maybe<Scalars['String']>
  dns?: Maybe<Array<DNS>>
  haStatus?: Maybe<Scalars['String']>
  haRef?: Maybe<Array<HaRef>>
  haGroup?: Maybe<VpcHaGroup>
  vmNics?: Maybe<Array<VmNic>>
  allVolumes?: Maybe<Array<Volume>>
  image?: Maybe<Image>
  host?: Maybe<Host>
  lastHost?: Maybe<Host>
  owner?: Maybe<CommonOwner>
  cluster?: Maybe<Cluster>
  systemTag?: Maybe<VpcVRouterSystemTag>
  capabilities?: Maybe<VmCapabilities>
  distributedRoutingEnabled?: Maybe<Scalars['Boolean']>
  SNATEnabled?: Maybe<Scalars['Boolean']>
  STSUuid?: Maybe<Scalars['String']>
  consoleAddress?: Maybe<VmConsoleAddress>
  netflow?: Maybe<Netflow>
  virtualRouterOffering?: Maybe<VirtualRouterOffering>
  VRouterCPUUsedUtilization?: Maybe<Scalars['String']>
  VRouterMemoryUsedPercent?: Maybe<Scalars['String']>
  VRouterDiskUsedCapacityInPercent?: Maybe<Scalars['String']>
  CPUAverageUsedUtilization?: Maybe<Scalars['String']>
  MemoryUsedInPercent?: Maybe<Scalars['String']>
  DiskAllReadBytes?: Maybe<Scalars['String']>
  DiskAllWriteBytes?: Maybe<Scalars['String']>
  DiskAllReadOps?: Maybe<Scalars['String']>
  DiskAllWriteOps?: Maybe<Scalars['String']>
  NetworkAllInBytes?: Maybe<Scalars['String']>
  NetworkAllOutBytes?: Maybe<Scalars['String']>
  NetworkAllInPackets?: Maybe<Scalars['String']>
  NetworkAllOutPackets?: Maybe<Scalars['String']>
  NetworkAllInErrors?: Maybe<Scalars['String']>
  NetworkAllOutErrors?: Maybe<Scalars['String']>
}

export interface VpcVRouterPerformanceQueryResp {
  list?: Maybe<Array<VpcVRouterPerformance>>
  total?: Maybe<Scalars['Float']>
}

export interface HostPerformance {
  uuid: Scalars['ID']
  name?: Maybe<Scalars['String']>
  username?: Maybe<Scalars['String']>
  managementIp?: Maybe<Scalars['String']>
  hypervisorType?: Maybe<Scalars['String']>
  sshPort?: Maybe<Scalars['Int']>
  description?: Maybe<Scalars['String']>
  status?: Maybe<HostStatus>
  state?: Maybe<HostState>
  clusterUuid?: Maybe<Scalars['String']>
  zoneUuid?: Maybe<Scalars['String']>
  createDate?: Maybe<Scalars['String']>
  lastOpDate?: Maybe<Scalars['String']>
  availableCpuCapacity?: Maybe<Scalars['Float']>
  availableMemoryCapacity?: Maybe<Scalars['Float']>
  cpuNum?: Maybe<Scalars['Float']>
  cpuSockets?: Maybe<Scalars['Float']>
  totalCpuCapacity?: Maybe<Scalars['Float']>
  totalMemoryCapacity?: Maybe<Scalars['Float']>
  totalPhysicalMemory?: Maybe<Scalars['Float']>
  systemTags?: Maybe<Array<Scalars['String']>>
  CPUAllUsedUtilization?: Maybe<Scalars['String']>
  MemoryUsedInPercent?: Maybe<Scalars['String']>
  DiskAllReadBytes?: Maybe<Scalars['String']>
  DiskAllWriteBytes?: Maybe<Scalars['String']>
  DiskAllReadOps?: Maybe<Scalars['String']>
  DiskAllWriteOps?: Maybe<Scalars['String']>
  DiskAllUsedCapacityInPercent?: Maybe<Scalars['String']>
  DiskAllUsedCapacityInBytes?: Maybe<Scalars['String']>
  NetworkAllInBytes?: Maybe<Scalars['String']>
  NetworkAllOutBytes?: Maybe<Scalars['String']>
  NetworkAllInPackets?: Maybe<Scalars['String']>
  NetworkAllOutPackets?: Maybe<Scalars['String']>
  NetworkAllInErrors?: Maybe<Scalars['String']>
  NetworkAllOutErrors?: Maybe<Scalars['String']>
}

export interface HostPerformanceQueryResp {
  list?: Maybe<Array<HostPerformance>>
  total?: Maybe<Scalars['Float']>
}

export interface L3NetworkPerformance {
  uuid: Scalars['ID']
  /** name */
  name: Scalars['String']
  /** description */
  description?: Maybe<Scalars['String']>
  /** 网络类型 */
  type?: Maybe<Scalars['String']>
  hypervisorType?: Maybe<Scalars['String']>
  /** IP范围 */
  ipRanges?: Maybe<Array<IpRange>>
  /** 创建时间 */
  createDate?: Maybe<Scalars['String']>
  /** 最后操作时间 */
  lastOpDate?: Maybe<Scalars['String']>
  /** IP版本 */
  ipVersion?: Maybe<Scalars['Float']>
  /** 类别 */
  category?: Maybe<Scalars['String']>
  /** ip可用量 */
  ipCapacity?: Maybe<IpCapacity>
  /** DHCP服务IP */
  dhcpIp?: Maybe<DhcpIp>
  /** mtu */
  mtu?: Maybe<Scalars['Float']>
  /** 资源所有者 */
  owner?: Maybe<L3Owner>
  /** DNS */
  dns?: Maybe<Array<Scalars['String']>>
  /** 对应的二层网络 */
  l2Network?: Maybe<L2Network>
  /** 对应的二层网络的uuid */
  l2NetworkUuid?: Maybe<Scalars['String']>
  /** 私有网络接口ip */
  routerInterfaceIp?: Maybe<Scalars['String']>
  /** 三层网络类型判断 */
  networkTypeName?: Maybe<Scalars['String']>
  /** 三层网络类型判断,前端五种网络 */
  networkType?: Maybe<L3NetworkType>
  /** 是否为系统网络 */
  system?: Maybe<Scalars['Boolean']>
  /** 是否为流量网络 */
  mirrorNetwork?: Maybe<Scalars['Boolean']>
  /** 网络服务类型 */
  networkServices?: Maybe<Array<NetworkServices>>
  virtualRouterOffering?: Maybe<VirtualRouterOffering>
  virtualRouterOfferingUuid?: Maybe<Scalars['String']>
  vpcVRouter?: Maybe<L3VpcVRouter>
  shareType: ShareType
  /** zone uuid */
  zoneUuid?: Maybe<Scalars['ID']>
  /** l2Netwrok.enableSRIOV */
  enableSRIOV?: Maybe<Scalars['Boolean']>
  UsedIPCount?: Maybe<Scalars['String']>
  UsedIPInPercent?: Maybe<Scalars['String']>
  AvailableIPCount?: Maybe<Scalars['String']>
  AvailableIPInPercent?: Maybe<Scalars['String']>
}

export interface L3NetworkPerformanceQueryResp {
  list?: Maybe<Array<L3NetworkPerformance>>
  total?: Maybe<Scalars['Float']>
}

export interface BackupStoragePerformance {
  uuid: Scalars['String']
  name: Scalars['String']
  description?: Maybe<Scalars['String']>
  type: Scalars['String']
  vCenterUuid?: Maybe<Scalars['String']>
  vcenter?: Maybe<VCenter>
  hostname?: Maybe<Scalars['String']>
  username?: Maybe<Scalars['String']>
  sshPort?: Maybe<Scalars['Int']>
  availableCapacity?: Maybe<Scalars['Float']>
  totalCapacity?: Maybe<Scalars['Float']>
  url: Scalars['String']
  state?: Maybe<BackupStorageState>
  status: Scalars['String']
  createDate: Scalars['String']
  lastOpDate: Scalars['String']
  attachedZoneUuids?: Maybe<Array<Scalars['String']>>
  zone?: Maybe<Zone>
  mons?: Maybe<Array<CephBackupStorageMon>>
  fsid?: Maybe<Scalars['String']>
  poolName?: Maybe<Scalars['String']>
  dataNetwork?: Maybe<Scalars['String']>
  syncImageNetwork?: Maybe<Scalars['String']>
  poolAvailableCapacity?: Maybe<Scalars['Float']>
  poolUsedCapacity?: Maybe<Scalars['Float']>
  poolReplicatedSize?: Maybe<Scalars['Float']>
  ossBucketUuid?: Maybe<Scalars['String']>
  AvailableCapacityInPercent?: Maybe<Scalars['String']>
}

export interface BackupStoragePerformanceQueryResp {
  list?: Maybe<Array<BackupStoragePerformance>>
  total?: Maybe<Scalars['Float']>
}

export interface VipNetworkPerformance {
  uuid: Scalars['String']
  name: Scalars['String']
  description?: Maybe<Scalars['String']>
  l3NetworkUuid?: Maybe<Scalars['String']>
  /** ip地址 */
  ip?: Maybe<Scalars['String']>
  state?: Maybe<VipNetworkState>
  /** 网关 */
  gateway?: Maybe<Scalars['String']>
  /** 子网掩码 */
  netmask?: Maybe<Scalars['String']>
  ipRangeUuid?: Maybe<Scalars['String']>
  prefixLen?: Maybe<Scalars['Float']>
  useFor?: Maybe<Scalars['String']>
  hypervisorType?: Maybe<Scalars['String']>
  useForService?: Maybe<Array<UseForService>>
  system?: Maybe<Scalars['Boolean']>
  createDate?: Maybe<Scalars['String']>
  lastOpDate?: Maybe<Scalars['String']>
  host?: Maybe<Host>
  l3Network: L3Network
  owner?: Maybe<CommonOwner>
  qos?: Maybe<Array<VipNetworkQos>>
  ipVersion?: Maybe<VipNetworkIpVersion>
  VIPInBoundTrafficInBytes?: Maybe<Scalars['String']>
  VIPInBoundTrafficInPackages?: Maybe<Scalars['String']>
  VIPOutBoundTrafficInBytes?: Maybe<Scalars['String']>
  VIPOutBoundTrafficInPackages?: Maybe<Scalars['String']>
}

export interface VipNetworkPerformanceQueryResp {
  list?: Maybe<Array<VipNetworkPerformance>>
  total?: Maybe<Scalars['Float']>
}

export interface DataInNetworkTopology {
  uuid?: Maybe<Scalars['String']>
  vm?: Maybe<VmInstance>
  l3Netowrk?: Maybe<L3Network>
}

export interface NetworkTopology {
  name?: Maybe<Scalars['String']>
  uuid: Scalars['String']
  type?: Maybe<Scalars['String']>
  category?: Maybe<Scalars['String']>
  resourceType?: Maybe<Scalars['String']>
  vmCount?: Maybe<Scalars['Float']>
  data?: Maybe<DataInNetworkTopology>
}

export interface QueryNetworkTopologyResp {
  list: Array<NetworkTopology>
  total?: Maybe<Scalars['Float']>
}

export interface NetworkTopologyRelation {
  vmInstanceUuid: Scalars['String']
  l3NetworkUuid: Scalars['String']
}

export interface QueryNetworkTopologyRelationResp {
  list: Array<NetworkTopologyRelation>
  total?: Maybe<Scalars['Float']>
}

export interface QueryResourceAndRelationResp {
  resourceList: Array<NetworkTopology>
  relationList: Array<NetworkTopologyRelation>
  total?: Maybe<Scalars['Float']>
}

export interface ResourceInfo {
  uuid?: Maybe<Scalars['String']>
  name?: Maybe<Scalars['String']>
}

export interface SchedulerJobHistory {
  executeTime?: Maybe<Scalars['Int']>
  fireInstanceId?: Maybe<Scalars['String']>
  id?: Maybe<Scalars['Int']>
  jobType?: Maybe<Scalars['String']>
  requestDump?: Maybe<Scalars['String']>
  resultDump?: Maybe<Scalars['String']>
  schedulerJobUuid?: Maybe<Scalars['String']>
  startTime?: Maybe<Scalars['String']>
  success?: Maybe<Scalars['Boolean']>
  targetResourceUuid?: Maybe<Scalars['String']>
  triggerUuid?: Maybe<Scalars['String']>
  endTime?: Maybe<Scalars['String']>
  vmInstance?: Maybe<VmInstance>
  volume?: Maybe<Volume>
  resourceInfo?: Maybe<ResourceInfo>
}

export interface SchedulerJobHistoryGroupByFireInstanceId {
  executeTime?: Maybe<Scalars['Int']>
  fireInstanceId?: Maybe<Scalars['String']>
  id?: Maybe<Scalars['Int']>
  jobType?: Maybe<Scalars['String']>
  requestDump?: Maybe<Scalars['String']>
  resultDump?: Maybe<Scalars['String']>
  schedulerJobUuid?: Maybe<Scalars['String']>
  startTime?: Maybe<Scalars['String']>
  success?: Maybe<Scalars['Boolean']>
  targetResourceUuid?: Maybe<Scalars['String']>
  triggerUuid?: Maybe<Scalars['String']>
  endTime?: Maybe<Scalars['String']>
  vmInstance?: Maybe<VmInstance>
  volume?: Maybe<Volume>
  resourceInfo?: Maybe<ResourceInfo>
  resourceCount?: Maybe<Scalars['Int']>
  successCount?: Maybe<Scalars['Int']>
  failCount?: Maybe<Scalars['Int']>
  runningCount?: Maybe<Scalars['Int']>
  mode?: Maybe<BackupMode>
  schedulerName?: Maybe<Scalars['String']>
  schedulerJobGroupUuid?: Maybe<Scalars['String']>
}

export enum BackupMode {
  full = 'full',
  incremental = 'incremental',
  auto = 'auto'
}

export interface SchedulerJobHistoryList {
  list: Array<SchedulerJobHistory>
  total: Scalars['Int']
  error?: Maybe<ActionError>
}

export interface SchedulerJobHistoryGroupByFireInstanceIdList {
  list: Array<SchedulerJobHistoryGroupByFireInstanceId>
  total: Scalars['Int']
  error?: Maybe<ActionError>
}

export interface SchedulerReportResult {
  failureRecords: Array<Scalars['Int']>
  partialSuccessRecords: Array<Scalars['Int']>
  successRecords: Array<Scalars['Int']>
  waitingRecords: Array<Scalars['Int']>
}

export interface MissionOverviewStatistics {
  totalTaskCount?: Maybe<Scalars['Int']>
  vmTaskCount?: Maybe<Scalars['Int']>
  volumeTaskCount?: Maybe<Scalars['Int']>
  dateBaseCount?: Maybe<Scalars['Int']>
  enabledCount?: Maybe<Scalars['Int']>
  disabledCount?: Maybe<Scalars['Int']>
  backupingCount?: Maybe<Scalars['Int']>
  readyCount?: Maybe<Scalars['Int']>
}

export interface OverviewSchedulerJobHistory {
  id?: Maybe<Scalars['String']>
  uuid?: Maybe<Scalars['String']>
  resourceCount?: Maybe<Scalars['Int']>
  startTime?: Maybe<Scalars['Float']>
  mode?: Maybe<Scalars['String']>
  endTime?: Maybe<Scalars['String']>
  duration?: Maybe<Scalars['Int']>
  successCount?: Maybe<Scalars['Int']>
  failCount?: Maybe<Scalars['Int']>
  runningCount?: Maybe<Scalars['Int']>
  jobList?: Maybe<Array<SchedulerJobHistory>>
  fireInstanceId?: Maybe<Scalars['String']>
  schedulerJobGroupUuid?: Maybe<Scalars['String']>
  jobType?: Maybe<Scalars['String']>
  type?: Maybe<Scalars['String']>
}

export interface BackupResourceData {
  uuid: Scalars['ID']
  volumeUuid: Scalars['ID']
  /** 资源名称 */
  name: Scalars['String']
  /** 备份数量 */
  count?: Maybe<Scalars['Float']>
  /** 根云盘备份文件总大小 */
  size?: Maybe<Scalars['Float']>
}

export interface BackupDatabase {
  uuid: Scalars['ID']
  zoneUuid?: Maybe<Scalars['ID']>
  /** 资源名称 */
  name: Scalars['String']
  /** 本地备份服务器 */
  backupStorageName?: Maybe<Scalars['String']>
  /** 本地备份服务器Uuid */
  backupStorageUuid?: Maybe<Scalars['String']>
  localBackupStorage?: Maybe<Scalars['String']>
  version?: Maybe<Scalars['String']>
  /** 备份容量 */
  size?: Maybe<Scalars['Float']>
  /** 创建时间 */
  createDate?: Maybe<Scalars['String']>
  /** 备份服务器关联 */
  backupStorageRefs?: Maybe<Array<BackupStorageRef>>
  /** 是否同步到远端 */
  isRemoteSynced: BackupDataIsRemoteSynced
  /** 能否同步到远端 */
  canSync: BackupDataCanSync
  /** 是否同步到本地 */
  isLocalSynced: BackupDataIsLocalSynced
}

export enum BackupDataIsRemoteSynced {
  Yes = 'Yes',
  No = 'No'
}

export enum BackupDataCanSync {
  Yes = 'Yes',
  No = 'No'
}

export enum BackupDataIsLocalSynced {
  Yes = 'Yes',
  No = 'No'
}

export interface BackupData {
  /** 资源的UUID，唯一标示该资源 */
  uuid: Scalars['ID']
  /** 资源名称 */
  name: Scalars['String']
  zoneUuid: Scalars['String']
  vmSystemTags?: Maybe<Array<Scalars['String']>>
  metadata?: Maybe<Scalars['String']>
  vmDescription?: Maybe<Scalars['String']>
  metadataName?: Maybe<Scalars['String']>
  metadataDescription?: Maybe<Scalars['String']>
  volumeUuid?: Maybe<Scalars['String']>
  groupUuid?: Maybe<Scalars['String']>
  state?: Maybe<Scalars['String']>
  /** 备份数据类型: Root | Data */
  type?: Maybe<Scalars['String']>
  /** 备份服务器 */
  backupStorageName?: Maybe<Scalars['String']>
  /** 备份服务器Uuid */
  backupStorageUuid?: Maybe<Scalars['String']>
  /** 备份服务器关联 */
  backupStorageRefs?: Maybe<Array<BackupStorageRef>>
  /** 包含数据云盘 */
  hasDataVolume?: Maybe<Scalars['Boolean']>
  /** 根云盘备份文件大小 */
  backupSize?: Maybe<Scalars['Float']>
  /** 包含备份数据的云主机或者云盘大小 */
  size?: Maybe<Scalars['Float']>
  /** 云主机是否包含数据云盘 */
  isIncludeDataVolume?: Maybe<BackupResourceVmBackupType>
  /** 备份类型 */
  mode?: Maybe<Scalars['String']>
  /** 挂载云主机名字 */
  attachedVmName?: Maybe<Scalars['String']>
  backupType?: Maybe<BackupResourceFullBackupType>
  /** 创建时间 */
  createDate?: Maybe<Scalars['String']>
  /** 最后一次修改时间 */
  lastOpDate?: Maybe<Scalars['String']>
  rootAndData?: Maybe<Scalars['Boolean']>
  format?: Maybe<Scalars['String']>
  isShareable?: Maybe<Scalars['Boolean']>
  dataVolumeAllExisted?: Maybe<Scalars['Boolean']>
  lostData?: Maybe<Scalars['Boolean']>
  /** 磁盘带宽 */
  volumeBandWidth?: Maybe<Scalars['String']>
  isVirtioSCSI?: Maybe<Scalars['Boolean']>
  wwn?: Maybe<Scalars['String']>
  platform?: Maybe<Scalars['String']>
  cpuNum?: Maybe<Scalars['Float']>
  memorySize?: Maybe<Scalars['Float']>
  /** 真实容量 */
  actualSize?: Maybe<Scalars['Float']>
  defaultL3NetworkUuid?: Maybe<Scalars['String']>
  owner?: Maybe<AccountOwner>
  /** 是否同步到远端 */
  isRemoteSynced: BackupDataIsRemoteSynced
  /** 是否同步到本地 */
  isLocalSynced: BackupDataIsLocalSynced
  /** 能否同步到远端 */
  canSync: BackupDataCanSync
  l3NetworkList?: Maybe<Array<L3Network>>
  instanceOffering?: Maybe<InstanceOffering>
  vmInstance?: Maybe<VmInstance>
  volumeBackupVmInstance?: Maybe<VmInstance>
  primaryStorage?: Maybe<PrimaryStorage>
  cluster?: Maybe<Cluster>
  volume?: Maybe<Volume>
  dataVolumeList?: Maybe<Array<Volume>>
}

export enum BackupResourceVmBackupType {
  Include = 'Include',
  NotInclude = 'NotInclude'
}

export enum BackupResourceFullBackupType {
  Full = 'Full',
  Incremental = 'Incremental'
}

export interface BackupDataResponse {
  list?: Maybe<Array<BackupData>>
  total?: Maybe<Scalars['Float']>
}

export interface BackupDatabaseResponse {
  list?: Maybe<Array<BackupDatabase>>
  total?: Maybe<Scalars['Float']>
}

export interface BackupResourceDataResponse {
  list?: Maybe<Array<BackupResourceData>>
  total?: Maybe<Scalars['Float']>
}

export interface IAM2ProjectTemplateAttribute {
  name: Scalars['String']
  value: Scalars['String']
}

export interface IAM2ProjectTemplateQuota {
  key: Scalars['String']
  value?: Maybe<Scalars['Float']>
}

export interface IAM2ProjectTemplateProp {
  attributes: Array<IAM2ProjectTemplateAttribute>
  quota: Array<IAM2ProjectTemplateQuota>
}

export interface IAM2ProjectTemplate {
  uuid: Scalars['String']
  name?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  template?: Maybe<IAM2ProjectTemplateProp>
  value?: Maybe<Scalars['String']>
  virtualIDUuid?: Maybe<Scalars['String']>
  createDate: Scalars['String']
  lastOpDate: Scalars['String']
}

export interface IAM2ProjectTemplateList {
  list?: Maybe<Array<IAM2ProjectTemplate>>
  total?: Maybe<Scalars['Float']>
}

export interface ThirdPartyAuthVirtualIDSyncConfig {
  name?: Maybe<Scalars['String']>
  fullname?: Maybe<Scalars['String']>
  phone?: Maybe<Scalars['String']>
  mail?: Maybe<Scalars['String']>
  identifier?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
}

export interface ThirdPartyAuthOrgSyncConfig {
  name?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  strategy?: Maybe<Scalars['String']>
}

export interface ThirdPartyAuthUserDefinedSyncConifg {
  key?: Maybe<Scalars['String']>
  value?: Maybe<Scalars['String']>
}

export interface ThirdPartyAuthSystemTag {
  ldapCleanBindingFilter?: Maybe<Scalars['String']>
  ldapCleanBindingFilterUuid?: Maybe<Scalars['String']>
  ldapServerType?: Maybe<Scalars['String']>
  ldapServerTypeUuid?: Maybe<Scalars['String']>
  ldapUseAsLoginName?: Maybe<Scalars['String']>
  ldapUseAsLoginNameUuid?: Maybe<Scalars['String']>
  virtualIDSyncConfiguration?: Maybe<ThirdPartyAuthVirtualIDSyncConfig>
  virtualIDSyncConfigurationUuid?: Maybe<Scalars['String']>
  organizationSyncConfiguration?: Maybe<ThirdPartyAuthOrgSyncConfig>
  organizationSyncConfigurationUuid?: Maybe<Scalars['String']>
  standbyServerIP?: Maybe<Scalars['String']>
  standbyServerPort?: Maybe<Scalars['String']>
  ldapUrlsUuid?: Maybe<Scalars['String']>
  userDefinedSyncConifgProps?: Maybe<Array<ThirdPartyAuthUserDefinedSyncConifg>>
}

export interface ThirdPartyAuthResourceref {
  userCount?: Maybe<Scalars['Int']>
  orgCount?: Maybe<Scalars['Int']>
}

export interface ThirdPartyAuthResourceConfig {
  autoSync?: Maybe<Scalars['String']>
  autoSyncUuid?: Maybe<Scalars['String']>
  syncInterval?: Maybe<Scalars['String']>
  syncIntervalUuid?: Maybe<Scalars['String']>
}

export interface ThirdPartyAuthVO {
  uuid: Scalars['String']
  name?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  url?: Maybe<Scalars['String']>
  base?: Maybe<Scalars['String']>
  username?: Maybe<Scalars['String']>
  password?: Maybe<Scalars['String']>
  encryption?: Maybe<Scalars['String']>
  systemTags?: Maybe<Array<Scalars['String']>>
  createDate?: Maybe<Scalars['String']>
  lastOpDate?: Maybe<Scalars['String']>
  relatedSystemTag?: Maybe<ThirdPartyAuthSystemTag>
  bindResourceref?: Maybe<ThirdPartyAuthResourceref>
  resourceConfig?: Maybe<ThirdPartyAuthResourceConfig>
}

export interface ThirdPartyAuthResp {
  list?: Maybe<Array<ThirdPartyAuthVO>>
  total?: Maybe<Scalars['Float']>
}

export interface PriceTable {
  name: Scalars['String']
  uuid?: Maybe<Scalars['String']>
  createDate?: Maybe<Scalars['String']>
  lastOpDate?: Maybe<Scalars['String']>
}

export interface TicketHistoryOperationResult {
  code?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  details?: Maybe<Scalars['String']>
}

export interface RequestResults {
  requestName?: Maybe<Scalars['String']>
  failureTimes?: Maybe<Scalars['Int']>
  successTimes?: Maybe<Scalars['Int']>
  errors?: Maybe<Array<TicketHistoryOperationResult>>
  success?: Maybe<Array<TicketHistoryOperationResult>>
}

export interface OperationContext {
  requestResults?: Maybe<Array<RequestResults>>
}

export interface TicketAssignmentCurrentOperator {
  uuid?: Maybe<Scalars['String']>
  name?: Maybe<Scalars['String']>
}

export interface TicketArchiveIam2ProjectAndVirtualId {
  uuid?: Maybe<Scalars['String']>
  resourceName?: Maybe<Scalars['String']>
  resourceType?: Maybe<Scalars['String']>
}

export interface Usages {
  name: Scalars['String']
  total: Scalars['Float']
  used: Scalars['Float']
}

export interface TicketAssignmentApiBody {
  uuid?: Maybe<Scalars['String']>
  name?: Maybe<Scalars['String']>
  value?: Maybe<Scalars['String']>
  policy?: Maybe<Scalars['String']>
  identityUuid?: Maybe<Scalars['String']>
  cpuNum?: Maybe<Scalars['String']>
  size?: Maybe<Scalars['BigInt']>
  memorySize?: Maybe<Scalars['BigInt']>
  vmInstanceUuid?: Maybe<Scalars['String']>
  defaultL3NetworkUuid?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  imageUuid?: Maybe<Scalars['String']>
  instanceOfferingUuid?: Maybe<Scalars['String']>
  dataDiskOfferingUuids?: Maybe<Array<Scalars['String']>>
  hypervisorType?: Maybe<Scalars['String']>
  l3NetworkUuids?: Maybe<Array<Scalars['String']>>
  systemTags?: Maybe<Array<Scalars['String']>>
  l3NetworkUuid?: Maybe<Scalars['String']>
  executeTimes?: Maybe<Scalars['Int']>
  vmNicUuid?: Maybe<Scalars['String']>
  rootDiskOfferingUuid?: Maybe<Scalars['String']>
}

export interface TicketAssignmentRequest {
  apiBody?: Maybe<TicketAssignmentApiBody>
  apiName?: Maybe<Scalars['String']>
  requestName?: Maybe<Scalars['String']>
  executeTimes?: Maybe<Scalars['Float']>
  vmInstance?: Maybe<VmInstance>
  volume?: Maybe<Volume>
  network?: Maybe<L3Network>
  l3Networks?: Maybe<Array<L3Network>>
  instanceOffering?: Maybe<InstanceOffering>
  image?: Maybe<Image>
  dataDiskOffering?: Maybe<DiskOffering>
  rootDiskOffering?: Maybe<DiskOffering>
  affinityGroup?: Maybe<AffinityGroup>
  gpuDevices?: Maybe<Array<PciDevice>>
}

export interface TicketAccountSystemContext {
  projectUuid: Scalars['String']
  virtualIDUuid: Scalars['String']
}

export interface TicketAssignment {
  uuid: Scalars['String']
  name: Scalars['String']
  status: TicketStatus
  accountSystemType: Scalars['String']
  ticketUuid: Scalars['String']
  description?: Maybe<Scalars['String']>
  ticketTypeUuid: Scalars['String']
  accountSystemContext?: Maybe<TicketAccountSystemContext>
  comment?: Maybe<Scalars['String']>
  request?: Maybe<Array<TicketAssignmentRequest>>
  operationContextType?: Maybe<Scalars['String']>
  operationContext?: Maybe<OperationContext>
  flowCollectionUuid?: Maybe<Scalars['String']>
  operatorType?: Maybe<Scalars['String']>
  operatorUuid?: Maybe<Scalars['String']>
  currentFlowUuid?: Maybe<Scalars['String']>
  fromStatus?: Maybe<Scalars['String']>
  toStatus?: Maybe<Scalars['String']>
  lastOpDate?: Maybe<Scalars['String']>
  createDate?: Maybe<Scalars['String']>
  iam2Project?: Maybe<TicketArchiveIam2ProjectAndVirtualId>
  iam2VirtualId?: Maybe<TicketArchiveIam2ProjectAndVirtualId>
  ticketType?: Maybe<Scalars['String']>
  currentProcessor?: Maybe<TicketAssignmentCurrentOperator>
}

export enum TicketStatus {
  Pending = 'Pending',
  Cancelled = 'Cancelled',
  IntermediateApproved = 'IntermediateApproved',
  FinalApproved = 'FinalApproved',
  Rejected = 'Rejected'
}

export interface TicketAssignmentList {
  list?: Maybe<Array<TicketAssignment>>
  total?: Maybe<Scalars['Float']>
}

export interface TicketAssignmentAttributes {
  uuid?: Maybe<Scalars['String']>
  value?: Maybe<Scalars['String']>
  type?: Maybe<Scalars['String']>
  name?: Maybe<Scalars['String']>
}

export interface TicketAssignmentHistory {
  uuid?: Maybe<Scalars['String']>
  createDate?: Maybe<Scalars['String']>
  fromStatus?: Maybe<Scalars['String']>
  lastOpDate?: Maybe<Scalars['String']>
  operationContextType?: Maybe<Scalars['String']>
  operationContext?: Maybe<OperationContext>
  operatorType?: Maybe<Scalars['String']>
  operatorUuid?: Maybe<Scalars['String']>
  ticketUuid?: Maybe<Scalars['String']>
  toStatus?: Maybe<Scalars['String']>
  comment?: Maybe<Scalars['String']>
  sequence?: Maybe<Scalars['Int']>
  iam2VirtualId?: Maybe<TicketArchiveIam2ProjectAndVirtualId>
}

export interface TicketAssignmentDetailHistoryResp {
  list?: Maybe<Array<TicketAssignmentHistory>>
  total?: Maybe<Scalars['Float']>
}

export interface TicketAssignmentProjectAttributes {
  name?: Maybe<Scalars['String']>
  projectUuid?: Maybe<Scalars['String']>
  type?: Maybe<Scalars['String']>
  uuid?: Maybe<Scalars['String']>
  value?: Maybe<Scalars['String']>
}

export interface TicketAssignmentProjectAttributesResp {
  list?: Maybe<Array<TicketAssignmentProjectAttributes>>
  total?: Maybe<Scalars['Float']>
}

export interface TicketAssignmentQuota {
  usages?: Maybe<Array<Usages>>
}

export interface TicketFlow {
  name: Scalars['String']
  uuid: Scalars['String']
  collectionUuid?: Maybe<Scalars['String']>
  parentFlowUuid?: Maybe<Scalars['String']>
  flowContextType?: Maybe<Scalars['String']>
  flowContext?: Maybe<Scalars['String']>
  lastOpDate?: Maybe<Scalars['String']>
  createDate?: Maybe<Scalars['String']>
}

export interface TicketProcessApprover {
  name: Scalars['String']
  uuid: Scalars['String']
}

export interface ProjectAdminInfo {
  name: Scalars['String']
  uuid: Scalars['String']
}

export interface ExtraFlowsInfo {
  uuid: Scalars['String']
  valid: Scalars['Boolean']
  parentFlowUuid?: Maybe<Scalars['String']>
}

export interface TicketProcess {
  name: Scalars['String']
  uuid: Scalars['String']
  description?: Maybe<Scalars['String']>
  state?: Maybe<Scalars['String']>
  status?: Maybe<TicketFlowCollectionStatus>
  isDefault?: Maybe<Scalars['Boolean']>
  projectUuid?: Maybe<Scalars['String']>
  ticketTypeUuids?: Maybe<Array<Scalars['String']>>
  lastOpDate?: Maybe<Scalars['String']>
  createDate?: Maybe<Scalars['String']>
  project?: Maybe<IAM2Project>
  flows?: Maybe<Array<TicketFlow>>
  approvers?: Maybe<Array<TicketProcessApprover>>
  extraFlowsInfo?: Maybe<Array<ExtraFlowsInfo>>
}

export enum TicketFlowCollectionStatus {
  Valid = 'Valid',
  Invalid = 'Invalid'
}

export interface QueryTicketProcessResp {
  list?: Maybe<Array<TicketProcess>>
  total?: Maybe<Scalars['Float']>
}

export interface FromStatus {
  name: Scalars['String']
  ordinal: Scalars['Float']
}

export interface ToStatus {
  name: Scalars['String']
  ordinal: Scalars['Float']
}

export interface TicketApiBody {
  identityUuid: Scalars['String']
  name?: Maybe<Scalars['String']>
}

export interface ResourceNames {
  uuid: Scalars['String']
  resourceName: Scalars['String']
  resourceType: Scalars['String']
}

export interface IAM2TicketFlow {
  uuid: Scalars['String']
  valid?: Maybe<Scalars['Boolean']>
  approverUuid?: Maybe<Scalars['String']>
  collectionUuid?: Maybe<Scalars['String']>
  createDate?: Maybe<Scalars['String']>
  flowContext?: Maybe<Scalars['String']>
  flowContextType?: Maybe<Scalars['String']>
  lastOpDate?: Maybe<Scalars['String']>
  name?: Maybe<Scalars['String']>
}

export interface TicketOperator {
  name?: Maybe<Scalars['String']>
  uuid?: Maybe<Scalars['String']>
}

export interface Ticket {
  uuid: Scalars['String']
  name: Scalars['String']
  status: TicketStatus
  accountSystemType: Scalars['String']
  ticketUuid: Scalars['String']
  ticketTypeUuid: Scalars['String']
  accountSystemContext?: Maybe<TicketAccountSystemContext>
  comment?: Maybe<Scalars['String']>
  request?: Maybe<Array<TicketAssignmentRequest>>
  operationContextType?: Maybe<Scalars['String']>
  operationContext?: Maybe<Scalars['String']>
  flowCollectionUuid?: Maybe<Scalars['String']>
  operatorType?: Maybe<Scalars['String']>
  operatorUuid?: Maybe<Scalars['String']>
  fromStatus?: Maybe<Scalars['String']>
  toStatus?: Maybe<Scalars['String']>
  lastOpDate?: Maybe<Scalars['String']>
  createDate?: Maybe<Scalars['String']>
  iam2Project?: Maybe<TicketArchiveIam2ProjectAndVirtualId>
  iam2VirtualId?: Maybe<TicketArchiveIam2ProjectAndVirtualId>
  ticketType?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  currentProcessor?: Maybe<Scalars['String']>
  nextOperator?: Maybe<TicketOperator>
  lastOperator?: Maybe<TicketOperator>
}

export interface TicketQueryResp {
  list?: Maybe<Array<Ticket>>
  total?: Maybe<Scalars['Float']>
  error?: Maybe<ActionError>
}

export interface AccountQuatoInfo {
  name: Scalars['String']
  total: Scalars['Float']
  used: Scalars['Float']
}

export interface AccountQuatoInfoResp {
  usages?: Maybe<Array<AccountQuatoInfo>>
}

export interface TicketHistory {
  uuid?: Maybe<Scalars['String']>
  ticketUuid?: Maybe<Scalars['String']>
  operationContextType?: Maybe<Scalars['String']>
  comment?: Maybe<Scalars['String']>
  createDate?: Maybe<Scalars['String']>
  lastOpDate?: Maybe<Scalars['String']>
  operatorUuid?: Maybe<Scalars['String']>
  operatorType?: Maybe<Scalars['String']>
  fromStatus?: Maybe<FromStatus>
  toStatus?: Maybe<ToStatus>
}

export interface TicketDetailResp {
  list?: Maybe<Array<TicketHistory>>
  total?: Maybe<Scalars['Float']>
  error?: Maybe<ActionError>
}

export interface TicketRecord {
  uuid?: Maybe<Scalars['String']>
  ticketUuid?: Maybe<Scalars['String']>
  operationContextType?: Maybe<Scalars['String']>
  comment?: Maybe<Scalars['String']>
  createDate?: Maybe<Scalars['String']>
  lastOpDate?: Maybe<Scalars['String']>
  operatorUuid?: Maybe<Scalars['String']>
  operatorType?: Maybe<Scalars['String']>
  fromStatus?: Maybe<FromStatus>
  toStatus?: Maybe<ToStatus>
  iam2VirtualId?: Maybe<Scalars['String']>
}

export interface PreconfigurationTemplate {
  uuid: Scalars['String']
  name?: Maybe<Scalars['String']>
  state?: Maybe<PreconfigurationTemplateState>
  type?: Maybe<PreconfigurationTemplateType>
  description?: Maybe<Scalars['String']>
  content?: Maybe<Scalars['String']>
  distribution?: Maybe<Scalars['String']>
  isPredefined?: Maybe<Scalars['Boolean']>
  customParams?: Maybe<Array<Scalars['String']>>
  md5sum?: Maybe<Scalars['String']>
  owner?: Maybe<Owner>
  createDate?: Maybe<Scalars['String']>
  lastOpDate?: Maybe<Scalars['String']>
}

export enum PreconfigurationTemplateState {
  Enabled = 'Enabled',
  Disabled = 'Disabled'
}

export enum PreconfigurationTemplateType {
  kickstart = 'kickstart',
  preseed = 'preseed',
  autoyast = 'autoyast'
}

export interface PreconfigurationTemplateQueryResp {
  list?: Maybe<Array<PreconfigurationTemplate>>
  total?: Maybe<Scalars['Float']>
  error?: Maybe<ActionError>
}

export interface BaremetalPxeServer {
  uuid: Scalars['String']
  name?: Maybe<Scalars['String']>
  attachedClusterUuids?: Maybe<Array<Scalars['String']>>
  description?: Maybe<Scalars['String']>
  dhcpInterface?: Maybe<Scalars['String']>
  sshPort?: Maybe<Scalars['String']>
  dhcpRangeBegin?: Maybe<Scalars['String']>
  dhcpRangeEnd?: Maybe<Scalars['String']>
  state?: Maybe<Scalars['String']>
  status?: Maybe<Scalars['String']>
  storagePath?: Maybe<Scalars['String']>
  totalCapacity?: Maybe<Scalars['String']>
  availableCapacity?: Maybe<Scalars['String']>
  hostname?: Maybe<Scalars['String']>
  createDate?: Maybe<Scalars['String']>
  lastOpDate?: Maybe<Scalars['String']>
}

export interface BaremetalPxeServerQueryResp {
  list?: Maybe<Array<BaremetalPxeServer>>
  total?: Maybe<Scalars['Float']>
}

export interface BaremetalChassisHardwareInfo {
  uuid: Scalars['String']
  type: Scalars['String']
  content: Scalars['String']
  chassisUuid: Scalars['String']
  createDate: Scalars['String']
  lastOpDate: Scalars['String']
}

export interface BaremetalChassis {
  uuid: Scalars['String']
  name: Scalars['String']
  description?: Maybe<Scalars['String']>
  ipmiAddress: Scalars['String']
  ipmiPort?: Maybe<Scalars['Int']>
  ipmiUsername: Scalars['String']
  ipmiPassword?: Maybe<Scalars['String']>
  zoneUuid?: Maybe<Scalars['String']>
  clusterUuid: Scalars['String']
  cluster: Cluster
  pxeServerUuid?: Maybe<Scalars['String']>
  state?: Maybe<Scalars['String']>
  status?: Maybe<BaremetalChassisStatus>
  powerStatus: BaremetalChassisPowerStatusType
  hardwareInfos: Array<BaremetalChassisHardwareInfo>
  /** 裸金属实例 */
  baremetalInstance?: Maybe<BaremetalInstance>
  createDate: Scalars['String']
  lastOpDate: Scalars['String']
}

export enum BaremetalChassisStatus {
  HWInfoUnknown = 'HWInfoUnknown',
  PxeBooting = 'PxeBooting',
  PxeBootFailed = 'PxeBootFailed',
  Available = 'Available',
  Allocated = 'Allocated'
}

export enum BaremetalChassisPowerStatusType {
  Unknown = 'Unknown',
  PowerOn = 'PowerOn',
  PowerOff = 'PowerOff',
  Reboot = 'Reboot',
  Rebooting = 'Rebooting'
}

export interface BaremetalChassisQueryResp {
  list?: Maybe<Array<BaremetalChassis>>
  total?: Maybe<Scalars['Float']>
}

export interface BaremetalNic {
  uuid: Scalars['String']
  ip?: Maybe<Scalars['String']>
  mac?: Maybe<Scalars['String']>
  netmask?: Maybe<Scalars['String']>
  gateway?: Maybe<Scalars['String']>
  pxe?: Maybe<Scalars['Boolean']>
  baremetalInstanceUuid?: Maybe<Scalars['String']>
  l3NetworkUuid?: Maybe<Scalars['String']>
  l3Network?: Maybe<L3Network>
  createDate?: Maybe<Scalars['String']>
  lastOpDate?: Maybe<Scalars['String']>
}

export interface BaremetalDisk {
  uuid: Scalars['String']
  name?: Maybe<Scalars['String']>
  size?: Maybe<Scalars['String']>
}

export interface BaremetalInstanceConfigSummary {
  disk?: Maybe<Scalars['Float']>
  nic?: Maybe<Scalars['Float']>
}

export interface HardwareInfo {
  cpuNum?: Maybe<Scalars['Float']>
  memory?: Maybe<Scalars['Float']>
  cpuModel?: Maybe<Scalars['String']>
}

export interface BaremetalInstance {
  uuid: Scalars['String']
  name?: Maybe<Scalars['String']>
  state?: Maybe<BaremetalInstanceState>
  status?: Maybe<BaremetalInstanceStatus>
  description?: Maybe<Scalars['String']>
  templateUuid?: Maybe<Scalars['String']>
  platform?: Maybe<Scalars['String']>
  port?: Maybe<Scalars['Int']>
  managementIp?: Maybe<Scalars['String']>
  clusterUuid?: Maybe<Scalars['String']>
  cluster?: Maybe<Cluster>
  pxeServerUuid?: Maybe<Scalars['String']>
  baremetalPxeServer?: Maybe<BaremetalPxeServer>
  chassisUuid?: Maybe<Scalars['String']>
  baremetalChassis?: Maybe<BaremetalChassis>
  hardwareInfo?: Maybe<HardwareInfo>
  bmNics?: Maybe<Array<BaremetalNic>>
  tag?: Maybe<Array<Tag>>
  owner?: Maybe<CommonOwner>
  imageUuid?: Maybe<Scalars['String']>
  image?: Maybe<Image>
  zoneUuid?: Maybe<Scalars['String']>
  zone?: Maybe<Zone>
  createDate?: Maybe<Scalars['String']>
  lastOpDate?: Maybe<Scalars['String']>
}

export enum BaremetalInstanceState {
  Created = 'Created',
  Starting = 'Starting',
  Running = 'Running',
  Stopped = 'Stopped',
  Rebooting = 'Rebooting',
  Destroyed = 'Destroyed',
  UNKNOWN = 'UNKNOWN',
  Error = 'Error'
}

export enum BaremetalInstanceStatus {
  Unprovisioned = 'Unprovisioned',
  Provisioning = 'Provisioning',
  Provisioned = 'Provisioned'
}

export interface BaremetalInstanceList {
  list?: Maybe<Array<BaremetalInstance>>
  total?: Maybe<Scalars['Float']>
}

export interface BaremetalNicList {
  list?: Maybe<Array<BaremetalNic>>
  total?: Maybe<Scalars['Float']>
}

export interface BaremetalDiskList {
  list?: Maybe<Array<BaremetalDisk>>
  total?: Maybe<Scalars['Float']>
}

export interface BareMetal2ChassisOffering {
  uuid: Scalars['String']
  name: Scalars['String']
  description?: Maybe<Scalars['String']>
  memorySize?: Maybe<Scalars['Float']>
  cpuNum?: Maybe<Scalars['Float']>
  architecture?: Maybe<Scalars['String']>
  cpuModelName?: Maybe<Scalars['String']>
  state?: Maybe<Scalars['String']>
  createDate?: Maybe<Scalars['String']>
  lastOpDate?: Maybe<Scalars['String']>
}

export interface BareMetal2ChassisOfferingList {
  list?: Maybe<Array<BareMetal2ChassisOffering>>
  total: Scalars['Float']
  error?: Maybe<ActionError>
}

export interface ChassisDisks {
  uuid?: Maybe<Scalars['String']>
  name?: Maybe<Scalars['String']>
  chassisUuid?: Maybe<Scalars['String']>
  diskSize?: Maybe<Scalars['String']>
  type?: Maybe<Scalars['String']>
  createDate?: Maybe<Scalars['String']>
  lastOpDate?: Maybe<Scalars['String']>
}

export interface ChassisNics {
  uuid?: Maybe<Scalars['String']>
  chassisUuid?: Maybe<Scalars['String']>
  mac?: Maybe<Scalars['String']>
  name?: Maybe<Scalars['String']>
  speed?: Maybe<Scalars['String']>
  isProvisionNic?: Maybe<Scalars['Boolean']>
  createDate?: Maybe<Scalars['String']>
  lastOpDate?: Maybe<Scalars['String']>
}

export interface BareMetal2Chassis {
  uuid: Scalars['String']
  name?: Maybe<Scalars['String']>
  state?: Maybe<Scalars['String']>
  status?: Maybe<Baremetal2ChassisStatus>
  type?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  clusterUuid?: Maybe<Scalars['String']>
  bootMode?: Maybe<Scalars['String']>
  ipmiAddress?: Maybe<Scalars['String']>
  ipmiPort?: Maybe<Scalars['String']>
  ipmiUsername?: Maybe<Scalars['String']>
  chassisOfferingUuid?: Maybe<Scalars['String']>
  createDate?: Maybe<Scalars['String']>
  lastOpDate?: Maybe<Scalars['String']>
  chassisOffering?: Maybe<BareMetal2ChassisOffering>
  cluster?: Maybe<Cluster>
  chassisNics?: Maybe<Array<ChassisNics>>
  chassisDisks?: Maybe<Array<ChassisDisks>>
  powerStatus: Baremetal2ChassisPowerStatus
}

export enum Baremetal2ChassisStatus {
  WrongBootMode = 'WrongBootMode',
  WrongArchitecture = 'WrongArchitecture',
  HardwareInfoUnknown = 'HardwareInfoUnknown',
  IPxeBooting = 'IPxeBooting',
  IPxeBootFailed = 'IPxeBootFailed',
  Available = 'Available',
  Allocated = 'Allocated'
}

export enum Baremetal2ChassisPowerStatus {
  POWER_ON = 'POWER_ON',
  POWER_OFF = 'POWER_OFF',
  POWER_UNKNOWN = 'POWER_UNKNOWN'
}

export interface BareMetal2ChassisQueryResp {
  list?: Maybe<Array<BareMetal2Chassis>>
  total?: Maybe<Scalars['Float']>
  error?: Maybe<ActionError>
}

export interface BareMetal2ChassisNicQueryResp {
  list?: Maybe<Array<ChassisNics>>
  total?: Maybe<Scalars['Float']>
}

export interface GatewaySystemInfo {
  cpuModelName?: Maybe<Scalars['String']>
  release?: Maybe<Scalars['String']>
  version?: Maybe<Scalars['String']>
  distribution?: Maybe<Scalars['String']>
}

export interface BareMetal2Gateway {
  uuid: Scalars['String']
  name?: Maybe<Scalars['String']>
  username?: Maybe<Scalars['String']>
  totalMemoryCapacity?: Maybe<Scalars['Float']>
  gatewaySystemInfo?: Maybe<GatewaySystemInfo>
  sshPort?: Maybe<Scalars['String']>
  password?: Maybe<Scalars['String']>
  cpuNum?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  managementIp?: Maybe<Scalars['String']>
  clusterUuid?: Maybe<Scalars['String']>
  state?: Maybe<Scalars['String']>
  status?: Maybe<Scalars['String']>
  createDate?: Maybe<Scalars['String']>
  lastOpDate?: Maybe<Scalars['String']>
  cluster: Cluster
}

export interface BareMetal2GatewayQueryResp {
  list?: Maybe<Array<BareMetal2Gateway>>
  total?: Maybe<Scalars['Float']>
}

export interface ProvisionNic {
  createDate?: Maybe<Scalars['String']>
  ip?: Maybe<Scalars['String']>
  lastOpDate?: Maybe<Scalars['String']>
  mac?: Maybe<Scalars['String']>
  netmask?: Maybe<Scalars['String']>
  networkUuid?: Maybe<Scalars['String']>
  uuid?: Maybe<Scalars['String']>
}

export interface BareMetal2Instance {
  uuid: Scalars['String']
  name: Scalars['String']
  description?: Maybe<Scalars['String']>
  zoneUuid?: Maybe<Scalars['String']>
  zone?: Maybe<Zone>
  clusterUuid?: Maybe<Scalars['String']>
  imageUuid?: Maybe<Scalars['String']>
  hostUuid?: Maybe<Scalars['String']>
  lastHostUuid?: Maybe<Scalars['String']>
  instanceOfferingUuid?: Maybe<Scalars['String']>
  rootVolumeUuid?: Maybe<Scalars['String']>
  platform?: Maybe<Scalars['String']>
  defaultL3NetworkUuid?: Maybe<Scalars['String']>
  type?: Maybe<Scalars['String']>
  hypervisorType?: Maybe<Scalars['String']>
  memorySize?: Maybe<Scalars['Float']>
  cpuNum?: Maybe<Scalars['Float']>
  cpuSpeed?: Maybe<Scalars['Float']>
  allocatorStrategy?: Maybe<Scalars['String']>
  state?: Maybe<VmInstanceState>
  chassisUuid?: Maybe<Scalars['String']>
  lastChassisUuid?: Maybe<Scalars['String']>
  gatewayUuid?: Maybe<Scalars['String']>
  lastGatewayUuid?: Maybe<Scalars['String']>
  provisionNic?: Maybe<ProvisionNic>
  chassisOfferingUuid?: Maybe<Scalars['String']>
  gatewayAllocatorStrategy?: Maybe<Scalars['String']>
  autoReleaseChassisEvent?: Maybe<AutoReleaseChassisEvent>
  status?: Maybe<BareMetal2InstanceStatus>
  vmNics?: Maybe<Array<VmNic>>
  vmCdRoms?: Maybe<Array<CdRom>>
  allVolumes?: Maybe<Array<Volume>>
  tag?: Maybe<Array<Tag>>
  owner?: Maybe<AccountOwner>
  cluster?: Maybe<Cluster>
  bareMetal2Chassis?: Maybe<BareMetal2Chassis>
  createDate?: Maybe<Scalars['String']>
  lastOpDate?: Maybe<Scalars['String']>
  eip?: Maybe<Array<EipInVminstance>>
  bareMetal2ChassisOffering?: Maybe<BareMetal2ChassisOffering>
  bareMetal2Gateway?: Maybe<BareMetal2Gateway>
}

export enum AutoReleaseChassisEvent {
  enable = 'enable',
  disable = 'disable'
}

export enum BareMetal2InstanceStatus {
  Connecting = 'Connecting',
  Connected = 'Connected',
  Disconnected = 'Disconnected'
}

export interface BareMetal2InstanceList {
  list?: Maybe<Array<BareMetal2Instance>>
  total: Scalars['Float']
  error?: Maybe<ActionError>
}

export interface V2VConversionHostSystemTags {
  uuid?: Maybe<Scalars['String']>
  type?: Maybe<Scalars['String']>
  tag?: Maybe<Scalars['String']>
  resourceUuid?: Maybe<Scalars['String']>
  resourceType?: Maybe<Scalars['String']>
  inherent?: Maybe<Scalars['String']>
  createDate?: Maybe<Scalars['String']>
  lastOpDate?: Maybe<Scalars['String']>
}

export interface V2VConversionHostSystemTagsQueryResp {
  list?: Maybe<Array<V2VConversionHostSystemTags>>
  total?: Maybe<Scalars['Float']>
  error?: Maybe<ActionError>
}

export interface V2VConversionHostCpuMemoryCapacity {
  availableCpu?: Maybe<Scalars['Int']>
  availableMemory?: Maybe<Scalars['BigInt']>
  managedCpuNum?: Maybe<Scalars['Int']>
  resourceUuid?: Maybe<Scalars['String']>
  totalCpu?: Maybe<Scalars['Int']>
  totalMemory?: Maybe<Scalars['BigInt']>
}

export interface V2VConversionHostSystemTagsResp {
  list?: Maybe<Array<V2VConversionHostSystemTags>>
  total?: Maybe<Scalars['Float']>
  error?: Maybe<ActionError>
}

export interface V2VConversionHost {
  uuid: Scalars['String']
  name?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  type?: Maybe<Scalars['String']>
  state?: Maybe<V2VConversionHostState>
  hostUuid?: Maybe<Scalars['String']>
  storagePath?: Maybe<Scalars['String']>
  hostState?: Maybe<HostState>
  totalSize?: Maybe<Scalars['BigInt']>
  availableSize?: Maybe<Scalars['BigInt']>
  createDate?: Maybe<Scalars['String']>
  lastOpDate?: Maybe<Scalars['String']>
  hostStatus?: Maybe<Scalars['String']>
  cpuMemoryCapacity?: Maybe<V2VConversionHostCpuMemoryCapacity>
  systemTags?: Maybe<V2VConversionHostSystemTagsResp>
  inBandWidth?: Maybe<Scalars['String']>
  outBandWidth?: Maybe<Scalars['String']>
}

export enum V2VConversionHostState {
  Enabled = 'Enabled',
  Disabled = 'Disabled'
}

export interface V2VConversionHostQueryResp {
  list?: Maybe<Array<V2VConversionHost>>
  total?: Maybe<Scalars['Float']>
  error?: Maybe<ActionError>
}

export interface V2VConversionHostMetricData {
  time: Scalars['Float']
  value?: Maybe<Scalars['Float']>
  type?: Maybe<Scalars['String']>
  metricName?: Maybe<Scalars['String']>
}

export interface LocalBackupStorage {
  uuid: Scalars['String']
  name?: Maybe<Scalars['String']>
  state?: Maybe<BackupStorageState>
  status?: Maybe<BackupStorageStatus>
  type?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  url?: Maybe<Scalars['String']>
  hostname?: Maybe<Scalars['String']>
  cidr?: Maybe<Scalars['String']>
  username?: Maybe<Scalars['String']>
  sshPort?: Maybe<Scalars['Int']>
  totalCapacity?: Maybe<Scalars['BigInt']>
  availableCapacity?: Maybe<Scalars['BigInt']>
  createDate?: Maybe<Scalars['String']>
  lastOpDate?: Maybe<Scalars['String']>
  attachedZoneUuids?: Maybe<Array<Scalars['String']>>
}

export interface LocalBackupStorageSystemTags {
  uuid: Scalars['String']
  type?: Maybe<Scalars['String']>
  tag?: Maybe<Scalars['String']>
  resourceUuid?: Maybe<Scalars['String']>
  resourceType?: Maybe<Scalars['String']>
  inherent?: Maybe<Scalars['String']>
  createDate?: Maybe<Scalars['String']>
  lastOpDate?: Maybe<Scalars['String']>
}

export interface LocalBackupStorageQueryResp {
  list?: Maybe<Array<LocalBackupStorage>>
  total?: Maybe<Scalars['Float']>
  error?: Maybe<ActionError>
}

export interface ScanLocalBackupStorage {
  vmTotal?: Maybe<Scalars['Float']>
  volumeTotal?: Maybe<Scalars['Float']>
  dataBaseTotal?: Maybe<Scalars['Float']>
}

export interface LocalBackupStorageSystemTagsQueryResp {
  list?: Maybe<Array<LocalBackupStorageSystemTags>>
  total?: Maybe<Scalars['Float']>
  error?: Maybe<ActionError>
}

export interface TicketAssignmentFiledApiBody {
  uuid?: Maybe<Scalars['String']>
  name?: Maybe<Scalars['String']>
  value?: Maybe<Scalars['String']>
  policy?: Maybe<Scalars['String']>
  identityUuid?: Maybe<Scalars['String']>
  cpuNum?: Maybe<Scalars['String']>
  size?: Maybe<Scalars['BigInt']>
  memorySize?: Maybe<Scalars['BigInt']>
  vmInstanceUuid?: Maybe<Scalars['String']>
  defaultL3NetworkUuid?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  imageUuid?: Maybe<Scalars['String']>
  instanceOfferingUuid?: Maybe<Scalars['String']>
  dataDiskOfferingUuids?: Maybe<Array<Scalars['String']>>
  hypervisorType?: Maybe<Scalars['String']>
  l3NetworkUuids?: Maybe<Array<Scalars['String']>>
  systemTags?: Maybe<Array<Scalars['String']>>
  l3NetworkUuid?: Maybe<Scalars['String']>
  executeTimes?: Maybe<Scalars['Int']>
  vmNicUuid?: Maybe<Scalars['String']>
}

export interface TicketAssignmentFiledUsages {
  name: Scalars['String']
  total: Scalars['Float']
  used: Scalars['Float']
}

export interface TicketAssignmentFiledProjectAndVirtualId {
  uuid?: Maybe<Scalars['String']>
  resourceName?: Maybe<Scalars['String']>
  resourceType?: Maybe<Scalars['String']>
}

export interface TicketAssignmentFiledRequest {
  apiBody?: Maybe<TicketAssignmentFiledApiBody>
  apiName?: Maybe<Scalars['String']>
  executeTimes?: Maybe<Scalars['Float']>
}

export interface TicketAssignmentFiled {
  uuid: Scalars['String']
  accountUuid: Scalars['String']
  ticketTypeUuid: Scalars['String']
  ticketUuid: Scalars['String']
  description?: Maybe<Scalars['String']>
  name: Scalars['String']
  accountSystemType?: Maybe<Scalars['String']>
  flowCollectionUuid?: Maybe<Scalars['String']>
  status?: Maybe<TicketStatus>
  lastOpDate?: Maybe<Scalars['String']>
  createDate?: Maybe<Scalars['String']>
  iam2VirtualId?: Maybe<TicketAssignmentFiledProjectAndVirtualId>
  iam2Project?: Maybe<TicketAssignmentFiledProjectAndVirtualId>
  accountSystemContext?: Maybe<TicketAccountSystemContext>
  ticketType?: Maybe<Scalars['String']>
  request?: Maybe<Array<TicketAssignmentFiledRequest>>
}

export interface TicketFiledListQueryResp {
  list?: Maybe<Array<TicketAssignmentFiled>>
  total?: Maybe<Scalars['Float']>
  error?: Maybe<ActionError>
}

export interface TicketAssignmentFiledHistory {
  uuid?: Maybe<Scalars['String']>
  ticketUuid?: Maybe<Scalars['String']>
  ticketTypeUuid: Scalars['String']
  historyUuid?: Maybe<Scalars['String']>
  accountUuid?: Maybe<Scalars['String']>
  operationContextType?: Maybe<Scalars['String']>
  operationContext?: Maybe<OperationContext>
  comment?: Maybe<Scalars['String']>
  createDate?: Maybe<Scalars['String']>
  lastOpDate?: Maybe<Scalars['String']>
  operatorUuid?: Maybe<Scalars['String']>
  operatorType?: Maybe<Scalars['String']>
  iam2VirtualId?: Maybe<TicketAssignmentFiledProjectAndVirtualId>
  iam2Project?: Maybe<TicketAssignmentFiledProjectAndVirtualId>
  fromStatus?: Maybe<Scalars['String']>
  toStatus?: Maybe<Scalars['String']>
}

export interface TicketAssignmentFiledQueryResp {
  list?: Maybe<Array<TicketAssignmentFiledHistory>>
  total?: Maybe<Scalars['Float']>
  error?: Maybe<ActionError>
}

export interface TicketAssignmentFiledDetail {
  uuid: Scalars['String']
  accountUuid: Scalars['String']
  ticketTypeUuid: Scalars['String']
  ticketUuid: Scalars['String']
  description?: Maybe<Scalars['String']>
  name: Scalars['String']
  accountSystemType?: Maybe<Scalars['String']>
  flowCollectionUuid?: Maybe<Scalars['String']>
  status?: Maybe<TicketStatus>
  lastOpDate?: Maybe<Scalars['String']>
  createDate?: Maybe<Scalars['String']>
  iam2VirtualId?: Maybe<TicketAssignmentFiledProjectAndVirtualId>
  iam2Project?: Maybe<TicketAssignmentFiledProjectAndVirtualId>
  accountSystemContext?: Maybe<TicketAccountSystemContext>
  ticketType?: Maybe<Scalars['String']>
  request?: Maybe<Array<TicketAssignmentFiledRequest>>
  usage?: Maybe<Array<TicketAssignmentFiledUsages>>
}

export interface SchedulerJobGroupOwner {
  uuid: Scalars['String']
  name: Scalars['String']
  type: Scalars['String']
}

export interface SchedulerJobGroup {
  uuid: Scalars['String']
  name: Scalars['String']
  description?: Maybe<Scalars['String']>
  state?: Maybe<SchedulerJobGroupState>
  status?: Maybe<Scalars['String']>
  jobType?: Maybe<SchedulerJobGroupType>
  jobData?: Maybe<Scalars['String']>
  triggersUuid?: Maybe<Array<Scalars['String']>>
  schedulerTriggers?: Maybe<Array<SchedulerTrigger>>
  jobsUuid?: Maybe<Array<Scalars['String']>>
  localBackupStorage?: Maybe<Array<BackupStorage>>
  remoteBackupStorage?: Maybe<BackupStorage>
  owner?: Maybe<SchedulerJobGroupOwner>
  createDate?: Maybe<Scalars['String']>
  lastOpDate?: Maybe<Scalars['String']>
}

export enum SchedulerJobGroupState {
  Enabled = 'Enabled',
  Disabled = 'Disabled'
}

export enum SchedulerJobGroupType {
  startVm = 'startVm',
  stopVm = 'stopVm',
  rebootVm = 'rebootVm',
  volumeSnapshot = 'volumeSnapshot',
  volumeBackup = 'volumeBackup',
  rootVolumeBackup = 'rootVolumeBackup',
  vmBackup = 'vmBackup',
  databaseBackup = 'databaseBackup'
}

export interface SchedulerJobGroupList {
  list?: Maybe<Array<SchedulerJobGroup>>
  total: Scalars['Float']
  error?: Maybe<ActionError>
}

export interface RemoteBackupStorage {
  uuid: Scalars['String']
  name?: Maybe<Scalars['String']>
  state?: Maybe<BackupStorageState>
  status?: Maybe<BackupStorageStatus>
  type?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  url?: Maybe<Scalars['String']>
  hostname?: Maybe<Scalars['String']>
  username?: Maybe<Scalars['String']>
  sshPort?: Maybe<Scalars['Int']>
  totalCapacity?: Maybe<Scalars['BigInt']>
  availableCapacity?: Maybe<Scalars['BigInt']>
  createDate?: Maybe<Scalars['String']>
  lastOpDate?: Maybe<Scalars['String']>
  attachedZoneUuids?: Maybe<Array<Scalars['String']>>
  tag?: Maybe<Scalars['String']>
}

export interface RemoteBackupStorageQueryResp {
  list?: Maybe<Array<RemoteBackupStorage>>
  total?: Maybe<Scalars['Float']>
  error?: Maybe<ActionError>
}

export interface RemoteBackupStorageSystemTagsQueryResp {
  list?: Maybe<Array<SystemTag>>
  total?: Maybe<Scalars['Float']>
  error?: Maybe<ActionError>
}

export interface V2VVolume {
  name?: Maybe<Scalars['String']>
  size?: Maybe<Scalars['Float']>
}

export interface SrcVmInfo {
  volumes?: Maybe<Array<V2VVolume>>
}

export interface V2VFilterVolume {
  deviceId?: Maybe<Scalars['String']>
  skip?: Maybe<Scalars['Boolean']>
}

export interface V2VJobData {
  name?: Maybe<Scalars['String']>
  primaryStorageUuid?: Maybe<Scalars['String']>
  platform?: Maybe<Scalars['String']>
  pauseVm?: Maybe<Scalars['Boolean']>
  memorySize?: Maybe<Scalars['Float']>
  cpuNum?: Maybe<Scalars['Float']>
  clusterUuid?: Maybe<Scalars['String']>
  conversionHostUuid?: Maybe<Scalars['String']>
  convertStrategy?: Maybe<Scalars['String']>
  allocatorStrategy?: Maybe<Scalars['String']>
  volumeFilters?: Maybe<Array<V2VFilterVolume>>
  url?: Maybe<Scalars['String']>
  srcVmInfo?: Maybe<SrcVmInfo>
}

export interface V2VMigration {
  uuid: Scalars['String']
  name?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  jobName?: Maybe<Scalars['String']>
  jobResult?: Maybe<Scalars['String']>
  state?: Maybe<LongJobState>
  managementNodeUuid?: Maybe<Scalars['String']>
  executeTime?: Maybe<Scalars['Float']>
  createDate?: Maybe<Scalars['String']>
  originPlatfromType: OriginPlatfromType
  lastOpDate?: Maybe<Scalars['String']>
  originPrimaryStroage?: Maybe<PrimaryStorage>
  originCluster?: Maybe<Cluster>
  originZone?: Maybe<Zone>
  originVminstance?: Maybe<VmInstance>
  targetPrimaryStroage?: Maybe<PrimaryStorage>
  targetCluster?: Maybe<Cluster>
  targetZone?: Maybe<Zone>
  cpuNum?: Maybe<Scalars['Float']>
  memorySize?: Maybe<Scalars['Float']>
  size?: Maybe<Scalars['Float']>
  v2vConversionHost?: Maybe<V2VConversionHost>
  jobData?: Maybe<V2VJobData>
  progress?: Maybe<Scalars['Float']>
  apiId?: Maybe<Scalars['String']>
}

export enum LongJobState {
  Waiting = 'Waiting',
  Suspended = 'Suspended',
  Running = 'Running',
  Succeeded = 'Succeeded',
  Canceling = 'Canceling',
  Canceled = 'Canceled',
  Failed = 'Failed'
}

export enum OriginPlatfromType {
  VMware = 'VMware',
  KVM = 'KVM'
}

export interface V2VMigrationList {
  list?: Maybe<Array<V2VMigration>>
  total?: Maybe<Scalars['Float']>
}

export interface NicFromV2V {
  vmInstanceUuid: Scalars['String']
  mac?: Maybe<Scalars['String']>
  ip?: Maybe<Scalars['String']>
}

export interface VolumeFromV2V {
  vmInstanceUuid: Scalars['String']
  name: Scalars['String']
  type: Scalars['String']
  size: Scalars['Float']
  actualSize: Scalars['Float']
}

export interface VMFromV2V {
  uuid: Scalars['String']
  name?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  memorySize?: Maybe<Scalars['Float']>
  cpuNum?: Maybe<Scalars['Float']>
  vmNics?: Maybe<Array<NicFromV2V>>
  allVolumes?: Maybe<Array<VolumeFromV2V>>
}

export interface VMFromV2VList {
  list?: Maybe<Array<VMFromV2V>>
  total?: Maybe<Scalars['Float']>
}

export interface ConsoleProxyAgent {
  uuid: Scalars['String']
  managementIp?: Maybe<Scalars['String']>
  type?: Maybe<Scalars['String']>
  status?: Maybe<Scalars['String']>
  state?: Maybe<Scalars['String']>
  consoleProxyOverriddenIp?: Maybe<Scalars['String']>
  createDate?: Maybe<Scalars['String']>
}

export interface ConsoleProxyAgentQueryResp {
  list?: Maybe<Array<ConsoleProxyAgent>>
  total?: Maybe<Scalars['Int']>
}

export interface AccessKeyOwner {
  name: Scalars['String']
  type: Scalars['String']
  uuid: Scalars['String']
}

export interface HybridAccountInventory {
  name: Scalars['String']
  uuid: Scalars['String']
  owner?: Maybe<AccessKeyOwner>
  akey?: Maybe<Scalars['String']>
  hybridAccountId?: Maybe<Scalars['String']>
  hybridUserName?: Maybe<Scalars['String']>
  createDate?: Maybe<Scalars['String']>
  lastOpDate?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
}

export interface AccessKey {
  name?: Maybe<Scalars['String']>
  uuid: Scalars['String']
  owner?: Maybe<AccessKeyOwner>
  description?: Maybe<Scalars['String']>
  accountUuid?: Maybe<Scalars['String']>
  userUuid?: Maybe<Scalars['String']>
  AccessKeyID?: Maybe<Scalars['String']>
  AccessKeySecret?: Maybe<Scalars['String']>
  state?: Maybe<Scalars['String']>
  createDate?: Maybe<Scalars['String']>
}

export interface QueryAccessKeyResp {
  list?: Maybe<Array<AccessKey>>
  total?: Maybe<Scalars['Int']>
}

export interface QueryHybridKeySecretResult {
  list?: Maybe<Array<HybridAccountInventory>>
  total?: Maybe<Scalars['Int']>
}

export interface OperationApi {
  apiId: Scalars['String']
  taskId: Scalars['String']
  name?: Maybe<Scalars['String']>
  req?: Maybe<Scalars['String']>
  resp?: Maybe<Scalars['String']>
  status: OperationApiStatus
  createDate?: Maybe<Scalars['String']>
  lastOpDate?: Maybe<Scalars['String']>
}

export enum OperationApiStatus {
  Success = 'Success',
  Running = 'Running',
  Failed = 'Failed',
  Canceled = 'Canceled',
  Canceling = 'Canceling'
}

export interface OperationTask {
  taskId: Scalars['String']
  actionId: Scalars['String']
  status: OperationStatus
  createDate?: Maybe<Scalars['String']>
  lastOpDate?: Maybe<Scalars['String']>
  operationApis?: Maybe<Array<OperationApi>>
}

export enum OperationStatus {
  Success = 'Success',
  Running = 'Running',
  Failed = 'Failed',
  Exception = 'Exception',
  Canceled = 'Canceled',
  Canceling = 'Canceling',
  Timeout = 'Timeout'
}

export interface OperationLongjob {
  longJobUuid: Scalars['String']
  jobName: Scalars['String']
  clientJobUuid: Scalars['String']
  resourceType?: Maybe<Scalars['String']>
  progress?: Maybe<Scalars['Float']>
  state?: Maybe<OperationLongjobStatus>
  userId?: Maybe<Scalars['String']>
  createDate?: Maybe<Scalars['String']>
  lastOpDate?: Maybe<Scalars['String']>
  data?: Maybe<Scalars['String']>
}

export enum OperationLongjobStatus {
  RUNNING = 'RUNNING',
  SUCCESS = 'SUCCESS',
  FAILED = 'FAILED',
  CANCELED = 'CANCELED',
  CANCELING = 'CANCELING'
}

export interface QueryOperationLongjobResp {
  list?: Maybe<Array<OperationLongjob>>
  total?: Maybe<Scalars['Float']>
}

export interface OperationLog {
  actionId: Scalars['String']
  name: Scalars['String']
  status: OperationStatus
  userId: Scalars['String']
  loginIp?: Maybe<Scalars['String']>
  accountName?: Maybe<Scalars['String']>
  createDate?: Maybe<Scalars['String']>
  lastOpDate?: Maybe<Scalars['String']>
  operationTasks?: Maybe<Array<OperationTask>>
  longjobs?: Maybe<Array<OperationLongjob>>
}

export interface QueryOperationLogResp {
  list?: Maybe<Array<OperationLog>>
  total?: Maybe<Scalars['Float']>
}

export interface LogServer {
  id: Scalars['Int']
  uuid: Scalars['String']
  name: Scalars['String']
  hostname?: Maybe<Scalars['String']>
  port?: Maybe<Scalars['String']>
  facility?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  createDate?: Maybe<Scalars['String']>
  labelKey?: Maybe<Scalars['String']>
  labelValue?: Maybe<Scalars['String']>
  lastOpDate?: Maybe<Scalars['String']>
  resourceUuid?: Maybe<Scalars['String']>
  systemTags?: Maybe<Array<Scalars['String']>>
}

export interface LogServerQueryResp {
  list?: Maybe<Array<LogServer>>
  total?: Maybe<Scalars['Float']>
}

export interface EmailAccountInfo {
  name: Scalars['String']
  uuid: Scalars['String']
}

export interface EmailServerSetting {
  uuid: Scalars['String']
  name: Scalars['String']
  smtpPort: Scalars['Int']
  state: SNSApplicationPlatformState
  username: Scalars['String']
  createDate?: Maybe<Scalars['String']>
  lastOpDate?: Maybe<Scalars['String']>
  smtpServer?: Maybe<Scalars['String']>
  type?: Maybe<Scalars['String']>
  password?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  owner: EmailAccountInfo
  shareType?: Maybe<ShareType>
  toPublic?: Maybe<Scalars['Boolean']>
}

export enum SNSApplicationPlatformState {
  Enabled = 'Enabled',
  Disabled = 'Disabled'
}

export interface EmailServerSettingQueryResp {
  list?: Maybe<Array<EmailServerSetting>>
  total?: Maybe<Scalars['Float']>
  error?: Maybe<ActionError>
}

export interface IpBlackWhiteList {
  uuid: Scalars['String']
  name?: Maybe<Scalars['String']>
  rule?: Maybe<Scalars['String']>
  strategy?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  createDate?: Maybe<Scalars['String']>
  lastOpDate?: Maybe<Scalars['String']>
}

export interface IpBlackWhiteListQueryResp {
  list?: Maybe<Array<IpBlackWhiteList>>
  total?: Maybe<Scalars['Int']>
}

export interface AccountQuotaUsage {
  name: Scalars['String']
  total: Scalars['Float']
  used: Scalars['Float']
}

export interface AccountQuotaInfo {
  volumeNum?: Maybe<Scalars['Int']>
  usages?: Maybe<Array<AccountQuotaUsage>>
}

export interface AccountVO {
  uuid: Scalars['String']
  name?: Maybe<Scalars['String']>
  type?: Maybe<Scalars['String']>
  password?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  createDate?: Maybe<Scalars['String']>
  lastOpDate?: Maybe<Scalars['String']>
  vmNum?: Maybe<Scalars['Int']>
  accountQuotaInfo?: Maybe<AccountQuotaInfo>
  priceTable?: Maybe<PriceTable>
}

export interface AccountResp {
  list?: Maybe<Array<AccountVO>>
  total?: Maybe<Scalars['Float']>
  result?: Maybe<AccountQueryType>
}

export enum AccountQueryType {
  Normal = 'Normal',
  BillingPriceTable = 'BillingPriceTable',
  BillingPriceTableBindCandidate = 'BillingPriceTableBindCandidate'
}

export interface ManagementNode {
  dbStatus: Scalars['String']
  vip: Scalars['String']
  gwReachable: Scalars['Boolean']
  mnStatus: Scalars['String']
  ip: Scalars['String']
  ownsVip: Scalars['Boolean']
  peerReachable: Scalars['Boolean']
  slaveIoRunning: Scalars['Boolean']
  slaveSqlRuning: Scalars['Boolean']
  timeToSyncDB?: Maybe<Scalars['Float']>
  vipReachable: Scalars['Boolean']
}

export interface ManagementNodeQueryResp {
  list?: Maybe<Array<ManagementNode>>
  total?: Maybe<Scalars['Float']>
}

export interface ApplicationCenterAccount {
  uuid: Scalars['String']
  name?: Maybe<Scalars['String']>
  type?: Maybe<Scalars['String']>
  password?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  createDate?: Maybe<Scalars['String']>
  lastOpDate?: Maybe<Scalars['String']>
  tagUuid?: Maybe<Scalars['String']>
}

export interface ApplicationCenterIAM2Project {
  uuid: Scalars['String']
  name?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  linkedAccountUuid: Scalars['String']
  state?: Maybe<ProjectState>
  createDate?: Maybe<Scalars['String']>
  lastOpDate?: Maybe<Scalars['String']>
  attributes?: Maybe<Array<IAM2ProjectAttributes>>
  /** 成员数量 */
  virtualIDNum?: Maybe<Scalars['Float']>
  /** 成员组数量 */
  virtualIDGroupNum?: Maybe<Scalars['Float']>
  /** 角色数量 */
  roleNum?: Maybe<Scalars['Float']>
  /** 计费价目 */
  billingPrice?: Maybe<BillingsPriceTable>
  billing?: Maybe<Billing>
  zone?: Maybe<Zone>
  iam2Organization?: Maybe<IAM2Organization>
  projectAdmin?: Maybe<IAM2VirtualID>
  retirePolicy?: Maybe<IAM2ProjectRetirePolicy>
  quota?: Maybe<Array<IAM2ProjectQuota>>
  roleForVirtualID?: Maybe<Array<Role>>
  roleForVirtualGroup?: Maybe<Array<Role>>
  attributeUuid?: Maybe<Scalars['String']>
}

export interface ApplicationCenter {
  uuid: Scalars['String']
  name?: Maybe<Scalars['String']>
  url?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  category?: Maybe<ApplicationCenterCategory>
  recommendApp?: Maybe<RecommendAppgory>
  visibleAccess?: Maybe<VisibleAccess>
  logo?: Maybe<Scalars['String']>
  accounts?: Maybe<Array<ApplicationCenterAccount>>
  iam2Projects?: Maybe<Array<ApplicationCenterIAM2Project>>
}

export enum ApplicationCenterCategory {
  STORAGE = 'STORAGE',
  DB = 'DB',
  SECURITY = 'SECURITY',
  PaaS = 'PaaS',
  SaaS = 'SaaS',
  IaaS = 'IaaS'
}

export enum RecommendAppgory {
  XSKY = 'XSKY',
  RANCHER = 'RANCHER',
  ANHENG = 'ANHENG',
  CUSTOM = 'CUSTOM'
}

export enum VisibleAccess {
  ADMIN = 'ADMIN',
  CUOTOM = 'CUOTOM',
  ALL = 'ALL'
}

export interface ApplicationCenterQueryResp {
  list?: Maybe<Array<ApplicationCenter>>
  total?: Maybe<Scalars['Float']>
}

export interface LicenseInfo {
  uuid?: Maybe<Scalars['String']>
  licenseType: LicenseType
  licenseRequest: Scalars['String']
  expiredDate?: Maybe<Scalars['String']>
  issuedDate?: Maybe<Scalars['String']>
  user?: Maybe<Scalars['String']>
  hostNum?: Maybe<Scalars['Float']>
  availableHostNum?: Maybe<Scalars['Float']>
  cpuNum?: Maybe<Scalars['Float']>
  availableCpuNum?: Maybe<Scalars['Float']>
  vmNum?: Maybe<Scalars['Float']>
  availableVmNum?: Maybe<Scalars['Float']>
  expired?: Maybe<Scalars['Boolean']>
  managementNodeUuid?: Maybe<Scalars['String']>
}

export enum LicenseType {
  Trial = 'Trial',
  Paid = 'Paid',
  OEM = 'OEM',
  Expired = 'Expired',
  Free = 'Free',
  TrialExt = 'TrialExt',
  Hybrid = 'Hybrid',
  Community = 'Community',
  AddOn = 'AddOn',
  HybridTrialExt = 'HybridTrialExt'
}

export interface LicenseAddOn {
  uuid: Scalars['String']
  licenseType: LicenseType
  name?: Maybe<Scalars['String']>
  modules?: Maybe<Array<Scalars['String']>>
  hostNum?: Maybe<Scalars['Float']>
  availableHostNum?: Maybe<Scalars['Float']>
  cpuNum?: Maybe<Scalars['Float']>
  availableCpuNum?: Maybe<Scalars['Float']>
  vmNum?: Maybe<Scalars['Float']>
  availableVmNum?: Maybe<Scalars['Float']>
  expiredDate?: Maybe<Scalars['String']>
  issuedDate?: Maybe<Scalars['String']>
  expired?: Maybe<Scalars['Boolean']>
  managementNodeUuid?: Maybe<Scalars['String']>
}

export interface XskyLicense {
  uuid: Scalars['String']
  expireTime: Scalars['String']
  name?: Maybe<Scalars['String']>
}

export interface DualManagementNodeInfo {
  licenses?: Maybe<Array<LicenseInfo>>
  addOns?: Maybe<Array<LicenseAddOn>>
}

export interface LicenseInfoResp {
  uuid?: Maybe<Scalars['String']>
  licenseType: LicenseType
  licenseRequest: Scalars['String']
  expiredDate?: Maybe<Scalars['String']>
  issuedDate?: Maybe<Scalars['String']>
  user?: Maybe<Scalars['String']>
  hostNum?: Maybe<Scalars['Float']>
  availableHostNum?: Maybe<Scalars['Float']>
  cpuNum?: Maybe<Scalars['Float']>
  availableCpuNum?: Maybe<Scalars['Float']>
  vmNum?: Maybe<Scalars['Float']>
  availableVmNum?: Maybe<Scalars['Float']>
  expired?: Maybe<Scalars['Boolean']>
  managementNodeUuid?: Maybe<Scalars['String']>
  version?: Maybe<Scalars['String']>
  opensource?: Maybe<Scalars['Boolean']>
  hostNameList?: Maybe<Array<Scalars['String']>>
  isDualManagementNode?: Maybe<Scalars['Boolean']>
  dualManagementNodeInfo?: Maybe<DualManagementNodeInfo>
  statusList?: Maybe<Array<Scalars['String']>>
}

export interface LicenseExtraInfo {
  occupiedCpuNum?: Maybe<Scalars['Int']>
  occupiedHostNum?: Maybe<Scalars['Int']>
  occupiedVmNum?: Maybe<Scalars['Int']>
}

export interface LicenseAddOnWithOccupied {
  uuid: Scalars['String']
  licenseType: LicenseType
  name?: Maybe<Scalars['String']>
  modules?: Maybe<Array<Scalars['String']>>
  hostNum?: Maybe<Scalars['Float']>
  availableHostNum?: Maybe<Scalars['Float']>
  cpuNum?: Maybe<Scalars['Float']>
  availableCpuNum?: Maybe<Scalars['Float']>
  vmNum?: Maybe<Scalars['Float']>
  availableVmNum?: Maybe<Scalars['Float']>
  expiredDate?: Maybe<Scalars['String']>
  issuedDate?: Maybe<Scalars['String']>
  expired?: Maybe<Scalars['Boolean']>
  managementNodeUuid?: Maybe<Scalars['String']>
  occupiedCPUs?: Maybe<Scalars['Int']>
  occupiedHosts?: Maybe<Scalars['Int']>
  occupiedVMs?: Maybe<Scalars['Int']>
}

export interface LicenseAddOnResp {
  addOns: Array<LicenseAddOnWithOccupied>
  extraInfo: LicenseExtraInfo
}

export interface GlobalConfigTemplate {
  uuid: Scalars['String']
  name?: Maybe<Scalars['String']>
  type?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
}

export interface GlobalConfigTemplateList {
  list?: Maybe<Array<GlobalConfigTemplate>>
  total: Scalars['Float']
  error?: Maybe<ActionError>
}

export interface TemplateConfig {
  category: Scalars['String']
  defaultValue: Scalars['String']
  name: Scalars['String']
  value: Scalars['String']
  templateUuid: Scalars['String']
  uuid?: Maybe<Scalars['String']>
  globalConfig?: Maybe<GlobalConfig>
  globalConfigTemplate?: Maybe<GlobalConfigTemplate>
}

export interface TemplateConfigList {
  list?: Maybe<Array<TemplateConfig>>
  total: Scalars['Float']
  error?: Maybe<ActionError>
}

export interface CustomColumnsConfig {
  userId?: Maybe<Scalars['String']>
  customColumnConfig?: Maybe<Scalars['String']>
}

export interface ThemeConfig {
  themeMode?: Maybe<ThemeMode>
  themeColor?: Maybe<Scalars['String']>
  browserTitle?: Maybe<Scalars['String']>
  loginTitle?: Maybe<Scalars['String']>
  loginLogo?: Maybe<Scalars['String']>
  bannerLogo?: Maybe<Scalars['String']>
  bannerTitle?: Maybe<Scalars['String']>
  bannerFontSize?: Maybe<Scalars['String']>
  favicon?: Maybe<Scalars['String']>
  overviewTitle?: Maybe<Scalars['String']>
  overviewMode?: Maybe<Scalars['String']>
  overviewMonitorType?: Maybe<Scalars['String']>
}

export enum ThemeMode {
  light = 'light',
  dark = 'dark'
}

export interface ThemeConfigResponse {
  result: ThemeConfig
  error?: Maybe<ActionError>
}

export interface PortMirrorSession {
  uuid: Scalars['String']
  name: Scalars['String']
  description?: Maybe<Scalars['String']>
  internalId?: Maybe<Scalars['String']>
  srcEndPoint?: Maybe<Scalars['String']>
  srcVmNic?: Maybe<VmNic>
  dstEndPoint?: Maybe<Scalars['String']>
  dstVmNic?: Maybe<VmNic>
  portMirrorUuid?: Maybe<Scalars['String']>
  createDate?: Maybe<Scalars['String']>
  lastOpDate?: Maybe<Scalars['String']>
  status?: Maybe<PortMirrorSessionStatus>
  type?: Maybe<PortMirrorSessionType>
}

export enum PortMirrorSessionStatus {
  Created = 'Created',
  Active = 'Active',
  Inactive = 'Inactive'
}

export enum PortMirrorSessionType {
  Ingress = 'Ingress',
  Egress = 'Egress',
  Bidirection = 'Bidirection'
}

export interface PortMirrorSessionList {
  list: Array<PortMirrorSession>
  total: Scalars['Int']
  error?: Maybe<ActionError>
}

export interface PortMirror {
  uuid: Scalars['String']
  name: Scalars['String']
  description?: Maybe<Scalars['String']>
  mirrorNetworkUuid?: Maybe<Scalars['String']>
  createDate?: Maybe<Scalars['String']>
  lastOpDate?: Maybe<Scalars['String']>
  state?: Maybe<PortMirrorState>
  sessions?: Maybe<Array<PortMirrorSession>>
  flowNetwork: L3Network
}

export enum PortMirrorState {
  Enabled = 'Enabled',
  Disabled = 'Disabled'
}

export interface PortMirrorList {
  list: Array<PortMirror>
  total: Scalars['Int']
  error?: Maybe<ActionError>
}

export interface OSPFOwner {
  uuid: Scalars['String']
  name: Scalars['String']
  type: Scalars['String']
}

export interface OSPF {
  uuid: Scalars['String']
  /** 区域Id，区域标识 */
  areaId: Scalars['String']
  /** OSPF区域的认证方式 */
  authentication?: Maybe<Scalars['String']>
  /** 区域类型 */
  type?: Maybe<Scalars['String']>
  /** 认证方式为plaintext时的密码 */
  password?: Maybe<Scalars['String']>
  /** 流量监控协议的版本 */
  keyId?: Maybe<Scalars['Int']>
  owner?: Maybe<OSPFOwner>
  shareType?: Maybe<ShareType>
  createDate: Scalars['String']
  lastOpDate: Scalars['String']
}

export interface OSPFQueryResp {
  list?: Maybe<Array<OSPF>>
  total?: Maybe<Scalars['Float']>
}

export interface VRouterRouterIdResp {
  /** IP地址形式的ID */
  routerId: Scalars['String']
}

export interface VpcVRouterByOSPF {
  uuid: Scalars['String']
  name: Scalars['String']
  publicNetworkUuid?: Maybe<Scalars['String']>
  virtualRouterVips?: Maybe<Array<Scalars['String']>>
  applianceVmType?: Maybe<Scalars['String']>
  managementNetworkUuid?: Maybe<Scalars['String']>
  defaultRouteL3NetworkUuid?: Maybe<Scalars['String']>
  agentPort?: Maybe<Scalars['Int']>
  description?: Maybe<Scalars['String']>
  zoneUuid?: Maybe<Scalars['String']>
  clusterUuid?: Maybe<Scalars['String']>
  imageUuid?: Maybe<Scalars['String']>
  hostUuid?: Maybe<Scalars['String']>
  lastHostUuid?: Maybe<Scalars['String']>
  instanceOfferingUuid?: Maybe<Scalars['String']>
  rootVolumeUuid?: Maybe<Scalars['String']>
  platform?: Maybe<Scalars['String']>
  defaultL3NetworkUuid?: Maybe<Scalars['String']>
  type?: Maybe<Scalars['String']>
  hypervisorType?: Maybe<Scalars['String']>
  memorySize?: Maybe<Scalars['Float']>
  cpuNum?: Maybe<Scalars['Int']>
  cpuSpeed?: Maybe<Scalars['Float']>
  allocatorStrategy?: Maybe<Scalars['String']>
  createDate?: Maybe<Scalars['String']>
  lastOpDate?: Maybe<Scalars['String']>
  state?: Maybe<Scalars['String']>
  status?: Maybe<Scalars['String']>
  dns?: Maybe<Array<DNS>>
  haStatus?: Maybe<Scalars['String']>
  haRef?: Maybe<Array<HaRef>>
  haGroup?: Maybe<VpcHaGroup>
  vmNics?: Maybe<Array<VmNic>>
  allVolumes?: Maybe<Array<Volume>>
  image?: Maybe<Image>
  host?: Maybe<Host>
  lastHost?: Maybe<Host>
  owner?: Maybe<VmOwner>
  cluster?: Maybe<Cluster>
  systemTag?: Maybe<VpcVRouterSystemTag>
  capabilities?: Maybe<VmCapabilities>
  distributedRoutingEnabled?: Maybe<Scalars['Boolean']>
  SNATEnabled?: Maybe<Scalars['Boolean']>
  STSUuid?: Maybe<Scalars['String']>
  consoleAddress?: Maybe<VmConsoleAddress>
  netflow?: Maybe<Netflow>
  virtualRouterOffering?: Maybe<VirtualRouterOffering>
  /** 路由ID */
  routerId?: Maybe<Scalars['String']>
  /** 包装后的网络信息 */
  vpcVRouterNetworks?: Maybe<Array<VpcVRouterNetwork>>
}

export interface VpcVRouterByOSPFQueryResp {
  list?: Maybe<Array<VpcVRouterByOSPF>>
  total?: Maybe<Scalars['Float']>
}

export interface OSPFByVRouter {
  uuid: Scalars['String']
  /** 区域Id，区域标识 */
  areaId: Scalars['String']
  /** OSPF区域的认证方式 */
  authentication?: Maybe<Scalars['String']>
  /** 区域类型 */
  type?: Maybe<Scalars['String']>
  /** 认证方式为plaintext时的密码 */
  password?: Maybe<Scalars['String']>
  /** 流量监控协议的版本 */
  keyId?: Maybe<Scalars['Int']>
  owner?: Maybe<OSPFOwner>
  shareType?: Maybe<ShareType>
  createDate: Scalars['String']
  lastOpDate: Scalars['String']
  /** vpc路由器 */
  vRouter: VpcVRouter
  /** 包装后的网络信息 */
  vpcVRouterNetworks?: Maybe<Array<VpcVRouterNetwork>>
}

export interface OSPFByVRouterQueryResp {
  list?: Maybe<Array<OSPFByVRouter>>
  total?: Maybe<Scalars['Float']>
}

export interface VRouterOspfNeighbor {
  /** 邻居ID */
  id: Scalars['String']
  priority: Scalars['String']
  /** 邻居状态 */
  state: Scalars['String']
  deadTime: Scalars['String']
  /** 邻居地址 */
  neighborAddress: Scalars['String']
  /** 本地接口 */
  device: Scalars['String']
}

export interface VRouterOspfNeighborQueryResp {
  list?: Maybe<Array<VRouterOspfNeighbor>>
  total?: Maybe<Scalars['Float']>
}

export interface IPsecPeerCidr {
  uuid: Scalars['String']
  cidr?: Maybe<Scalars['String']>
  connectionUuid?: Maybe<Scalars['String']>
  createDate?: Maybe<Scalars['String']>
  lastOpDate?: Maybe<Scalars['String']>
}

export interface IPsecL3NetworkRef {
  uuid: Scalars['String']
  connectionUuid?: Maybe<Scalars['String']>
  l3NetworkUuid?: Maybe<Scalars['String']>
  createDate?: Maybe<Scalars['String']>
  lastOpDate?: Maybe<Scalars['String']>
}

export interface VipRef {
  uuid?: Maybe<Scalars['String']>
  name?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  ip?: Maybe<Scalars['String']>
  state?: Maybe<Scalars['String']>
  gateway?: Maybe<Scalars['String']>
  netmask?: Maybe<Scalars['String']>
  prefixLen?: Maybe<Scalars['String']>
  serviceProvider?: Maybe<Scalars['String']>
  peerL3NetworkUuids?: Maybe<Array<Scalars['String']>>
  l3NetworkUuid?: Maybe<Scalars['String']>
  useFor?: Maybe<Scalars['String']>
  system?: Maybe<Scalars['Boolean']>
  createDate?: Maybe<Scalars['String']>
  lastOpDate?: Maybe<Scalars['String']>
}

export interface IPsecConnection {
  uuid: Scalars['String']
  name?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  createDate?: Maybe<Scalars['String']>
  lastOpDate?: Maybe<Scalars['String']>
  authKey?: Maybe<Scalars['String']>
  authMode?: Maybe<Scalars['String']>
  ikeAuthAlgorithm?: Maybe<Scalars['String']>
  ikeDhGroup?: Maybe<Scalars['Float']>
  ikeEncryptionAlgorithm?: Maybe<Scalars['String']>
  l3NetworkRefs?: Maybe<Array<IPsecL3NetworkRef>>
  l3Networks?: Maybe<Array<L3Network>>
  /** 远端公网IP */
  peerAddress?: Maybe<Scalars['String']>
  peerCidrs?: Maybe<Array<IPsecPeerCidr>>
  pfs?: Maybe<Scalars['String']>
  policyAuthAlgorithm?: Maybe<Scalars['String']>
  policyEncryptionAlgorithm?: Maybe<Scalars['String']>
  policyMode?: Maybe<Scalars['String']>
  state?: Maybe<IPsecState>
  status?: Maybe<IPSecStatus>
  transformProtocol?: Maybe<Scalars['String']>
  vipUuid?: Maybe<Scalars['String']>
  vipRef?: Maybe<VipRef>
}

export enum IPsecState {
  Enabled = 'Enabled',
  Disabled = 'Disabled'
}

export enum IPSecStatus {
  Creating = 'Creating',
  Ready = 'Ready'
}

export interface IPsecConnectionList {
  list?: Maybe<Array<IPsecConnection>>
  total: Scalars['Int']
  error?: Maybe<ActionError>
}

export interface IPsecConnectionSummary {
  localCidrCount?: Maybe<Scalars['Int']>
  peerCidrCount?: Maybe<Scalars['Int']>
}

export interface IPsecPeerCidrListResp {
  list?: Maybe<Array<IPsecPeerCidr>>
  total: Scalars['Int']
  error?: Maybe<ActionError>
}

export interface Eip {
  uuid: Scalars['String']
  name: Scalars['String']
  description?: Maybe<Scalars['String']>
  guestIp?: Maybe<Scalars['String']>
  state?: Maybe<EipState>
  createDate?: Maybe<Scalars['String']>
  lastOpDate?: Maybe<Scalars['String']>
  vipIp?: Maybe<Scalars['String']>
  vipUuid: Scalars['String']
  vmNicUuid?: Maybe<Scalars['String']>
  vmInstance?: Maybe<VmInstance>
  vipNetwork?: Maybe<VipNetwork>
  owner?: Maybe<AccountOwner>
}

export enum EipState {
  Enabled = 'Enabled',
  Disabled = 'Disabled'
}

export interface EipListResp {
  list: Array<Eip>
  total: Scalars['Float']
  error?: Maybe<ActionError>
}

export interface FireWallIpSetTemplate {
  uuid: Scalars['String']
  name: Scalars['String']
  type?: Maybe<Scalars['String']>
  sourceValue?: Maybe<Scalars['String']>
  destValue?: Maybe<Scalars['String']>
  createDate?: Maybe<Scalars['String']>
  lastOpDate?: Maybe<Scalars['String']>
  accountUuid?: Maybe<Scalars['String']>
}

export interface QueryIpSetTemplateResp {
  list?: Maybe<Array<FireWallIpSetTemplate>>
  total?: Maybe<Scalars['Int']>
}

export interface FirewallRule {
  uuid: Scalars['String']
  /** 规则集uuid */
  ruleSetUuid: Scalars['String']
  /** 规则集 */
  ruleSet: FirewallRuleSet
  /** 行为类型 */
  action: ActionType
  /** 规则优先级 */
  ruleNumber: Scalars['Int']
  /** 是否为默认规则 */
  isDefault: Scalars['Boolean']
  /** 是否生效 */
  isApplied: Scalars['Boolean']
  /** 是否过期 */
  expired: Scalars['Boolean']
  /** 状态 */
  state: FirewallRuleState
  /** vpc防火墙uuid */
  vpcFirewallUuid?: Maybe<Scalars['String']>
  /** 协议 */
  protocol?: Maybe<Scalars['String']>
  /** 源端口 */
  sourcePort?: Maybe<Scalars['String']>
  /** 目标端口 */
  destPort?: Maybe<Scalars['String']>
  /** 源Ip */
  sourceIp?: Maybe<Scalars['String']>
  /** 目标Ip */
  destIp?: Maybe<Scalars['String']>
  /** 报文状态 */
  allowStates?: Maybe<Scalars['String']>
  tcpFlag?: Maybe<Scalars['String']>
  icmpTypeName?: Maybe<Scalars['String']>
  /** 是否开启日志 */
  enableLog?: Maybe<Scalars['Boolean']>
  description?: Maybe<Scalars['String']>
  createDate: Scalars['String']
  lastOpDate: Scalars['String']
}

export enum ActionType {
  drop = 'drop',
  reject = 'reject',
  accept = 'accept'
}

export enum FirewallRuleState {
  disable = 'disable',
  enable = 'enable'
}

export interface FirewallRuleQueryResp {
  list?: Maybe<Array<FirewallRule>>
  total?: Maybe<Scalars['Float']>
}

export interface CheckRuleNumber {
  available: Scalars['Boolean']
}

export interface FirewallRuleSetOwner {
  uuid: Scalars['String']
  name: Scalars['String']
  type: Scalars['String']
}

export interface FirewallRuleSet {
  uuid: Scalars['String']
  name: Scalars['String']
  /** 规则 */
  rules: Array<FirewallRule>
  /** 行为类型 */
  actionType?: Maybe<ActionType>
  /** 是否为默认规则集 */
  isDefault: Scalars['Boolean']
  /** 规则集编辑后是否更新配置 */
  isApplied: Scalars['Boolean']
  owner?: Maybe<FirewallRuleSetOwner>
  description?: Maybe<Scalars['String']>
  /** 是否存在关联网络 */
  hasRelateNetwork: Scalars['Boolean']
  createDate: Scalars['String']
  lastOpDate: Scalars['String']
}

export interface FirewallRuleSetQueryResp {
  list?: Maybe<Array<FirewallRuleSet>>
  total?: Maybe<Scalars['Float']>
}

export interface FireWallRuleTemplate {
  uuid: Scalars['String']
  name: Scalars['String']
  action?: Maybe<ActionType>
  protocol?: Maybe<ProtocolType>
  state?: Maybe<FirewallRuleState>
  ruleNumber?: Maybe<Scalars['Int']>
  destPort?: Maybe<Scalars['String']>
  sourcePort?: Maybe<Scalars['String']>
  sourceIp?: Maybe<Scalars['String']>
  destIp?: Maybe<Scalars['String']>
  allowStates?: Maybe<Scalars['String']>
  tcpFlag?: Maybe<Scalars['String']>
  icmpTypeName?: Maybe<Scalars['String']>
  enableLog?: Maybe<Scalars['Boolean']>
  isDefault?: Maybe<Scalars['Boolean']>
  description?: Maybe<Scalars['String']>
  createDate?: Maybe<Scalars['String']>
  lastOpDate?: Maybe<Scalars['String']>
  accountUuid?: Maybe<Scalars['String']>
}

export enum ProtocolType {
  TCP_UDP = 'TCP_UDP',
  ALL = 'ALL',
  AH = 'AH',
  DCCP = 'DCCP',
  DDP = 'DDP',
  EGP = 'EGP',
  EIGRP = 'EIGRP',
  ENCAP = 'ENCAP',
  ESP = 'ESP',
  ETHERIP = 'ETHERIP',
  FC = 'FC',
  GGP = 'GGP',
  GRE = 'GRE',
  HIP = 'HIP',
  HMP = 'HMP',
  ICMP = 'ICMP',
  IDPR_CMTP = 'IDPR_CMTP',
  IDRP = 'IDRP',
  IGMP = 'IGMP',
  IGP = 'IGP',
  IP = 'IP',
  IPCOMP = 'IPCOMP',
  IPENCAP = 'IPENCAP',
  IPIP = 'IPIP',
  ISIS = 'ISIS',
  MANET = 'MANET',
  MPLS_IN_IP = 'MPLS_IN_IP',
  OSPF = 'OSPF',
  PIM = 'PIM',
  PUP = 'PUP',
  RDP = 'RDP',
  ROHC = 'ROHC',
  RSPF = 'RSPF',
  RSVP = 'RSVP',
  SCTP = 'SCTP',
  SKIP = 'SKIP',
  ST = 'ST',
  TCP = 'TCP',
  UDP = 'UDP',
  UDPLITE = 'UDPLITE',
  VMTP = 'VMTP',
  VRRP = 'VRRP',
  WESP = 'WESP',
  VNS_IDP = 'VNS_IDP',
  XTP = 'XTP'
}

export interface QueryRuleTemplateResp {
  list?: Maybe<Array<FireWallRuleTemplate>>
  total?: Maybe<Scalars['Int']>
}

export interface FirewallRelateNetwork {
  /** l3网络uuid */
  uuid: Scalars['String']
  /** l3网络名称 */
  name: Scalars['String']
  /** l3网络名称 */
  l3Network?: Maybe<L3Network>
  ruleSetUuid: Scalars['String']
  ruleSetName: Scalars['String']
  vpcFirewallUuid: Scalars['String']
  vpcFirewallName: Scalars['String']
  id: Scalars['Float']
  /** 网络方向 */
  packetsForwardType: PacketsForwardType
  createDate: Scalars['String']
  lastOpDate: Scalars['String']
}

export enum PacketsForwardType {
  in = 'in',
  out = 'out',
  local = 'local'
}

export interface FirewallRelateNetworkQueryResp {
  list?: Maybe<Array<FirewallRelateNetwork>>
  total?: Maybe<Scalars['Float']>
}

export interface FireWallRuleSets {
  uuid: Scalars['String']
  name: Scalars['String']
  isDefault?: Maybe<Scalars['Boolean']>
  isApplied?: Maybe<Scalars['Boolean']>
  createDate?: Maybe<Scalars['String']>
  lastOpDate?: Maybe<Scalars['String']>
  actionType?: Maybe<Scalars['String']>
}

export interface FireWallRefs {
  id?: Maybe<Scalars['Int']>
  ruleSetUuid?: Maybe<Scalars['String']>
  l3NetworkUuid?: Maybe<Scalars['String']>
  createDate?: Maybe<Scalars['String']>
  lastOpDate?: Maybe<Scalars['String']>
  packetsForwardType?: Maybe<Scalars['String']>
}

export interface FireWall {
  uuid: Scalars['String']
  name: Scalars['String']
  description?: Maybe<Scalars['String']>
  ruleSets?: Maybe<Array<FireWallRuleSets>>
  refs?: Maybe<Array<FireWallRefs>>
  vpcVRouter?: Maybe<VpcVRouter>
  owner?: Maybe<Owner>
  createDate?: Maybe<Scalars['String']>
  lastOpDate?: Maybe<Scalars['String']>
}

export interface QueryFireWallResp {
  list?: Maybe<Array<FireWall>>
  total?: Maybe<Scalars['Int']>
}

export interface VmNicUsedIp {
  uuid: Scalars['String']
  ip?: Maybe<Scalars['String']>
  l3NetworkUuid?: Maybe<Scalars['String']>
  /** 静态网络 */
  isStatic?: Maybe<Scalars['String']>
  vmNicUuid?: Maybe<Scalars['String']>
  ipVersion?: Maybe<Scalars['Int']>
  createDate?: Maybe<Scalars['String']>
  lastOpDate?: Maybe<Scalars['String']>
  vmNic?: Maybe<VmNic>
}

export interface UsedIpListResp {
  list: Array<VmNicUsedIp>
  total: Scalars['Float']
  error?: Maybe<ActionError>
}

export interface VniRanges {
  startVni?: Maybe<Scalars['Float']>
  endVni?: Maybe<Scalars['Float']>
}

export interface AttachedVtepRefs {
  uuid: Scalars['String']
  createDate?: Maybe<Scalars['String']>
  lastOpDate?: Maybe<Scalars['String']>
  hostUuid?: Maybe<Scalars['String']>
  port?: Maybe<Scalars['Float']>
  poolUuid?: Maybe<Scalars['String']>
  type?: Maybe<Scalars['String']>
  vtepIp?: Maybe<Scalars['String']>
  zoneUuid?: Maybe<Scalars['String']>
}

export interface AttachedVxlanNetworkRefs {
  uuid: Scalars['String']
  name?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  createDate?: Maybe<Scalars['String']>
  lastOpDate?: Maybe<Scalars['String']>
  attachedClusterUuids?: Maybe<Array<Scalars['String']>>
  physicalInterface?: Maybe<Scalars['String']>
  poolUuid?: Maybe<Array<Scalars['String']>>
  type?: Maybe<Scalars['String']>
  vni?: Maybe<Scalars['Float']>
  zoneUuid?: Maybe<Scalars['String']>
}

export interface AttachedVniRanges {
  startVni?: Maybe<Scalars['Float']>
  endVni?: Maybe<Scalars['Float']>
  uuid: Scalars['String']
  name?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  createDate?: Maybe<Scalars['String']>
  l2NetworkUuid?: Maybe<Scalars['String']>
}

export interface VxlanPools {
  uuid: Scalars['String']
  name?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  createDate?: Maybe<Scalars['String']>
  lastOpDate?: Maybe<Scalars['String']>
  attachedVtepRefs?: Maybe<Array<AttachedVtepRefs>>
  attachedVxlanNetworkRefs?: Maybe<Array<AttachedVxlanNetworkRefs>>
  attachedVniRanges?: Maybe<Array<AttachedVniRanges>>
  physicalInterface?: Maybe<Scalars['String']>
  sdnControllerUuid?: Maybe<Scalars['String']>
  type?: Maybe<Scalars['String']>
  zoneUuid?: Maybe<Scalars['String']>
}

export interface SdnController {
  uuid: Scalars['String']
  name?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  createDate?: Maybe<Scalars['String']>
  lastOpDate?: Maybe<Scalars['String']>
  password?: Maybe<Scalars['String']>
  username?: Maybe<Scalars['String']>
  ip?: Maybe<Scalars['String']>
  vendorType?: Maybe<Scalars['String']>
  vniRanges?: Maybe<Array<VniRanges>>
  vxlanPools?: Maybe<Array<VxlanPools>>
  vdsUuid?: Maybe<Scalars['String']>
}

export interface SdnControllerList {
  list: Array<SdnController>
  total: Scalars['Float']
  error?: Maybe<ActionError>
}

export interface VRouterRouteEntry {
  uuid: Scalars['ID']
  routeTableUuid: Scalars['ID']
  type: VRouterRouteEntryType
  /** 下一跳 */
  target?: Maybe<Scalars['String']>
  destination: Scalars['String']
  /** 路由优先级 */
  distance: Scalars['Int']
  lastOpDate: Scalars['String']
  createDate: Scalars['String']
}

export enum VRouterRouteEntryType {
  UserStatic = 'UserStatic',
  UserBlackHole = 'UserBlackHole'
}

export interface AttachedRouterRef {
  routeTableUuid: Scalars['String']
  virtualRouterVmUuid: Scalars['String']
}

export interface VRouterRouteTable {
  name: Scalars['String']
  uuid: Scalars['ID']
  type?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  attachedRouterRefs?: Maybe<Array<AttachedRouterRef>>
  lastOpDate?: Maybe<Scalars['String']>
  createDate?: Maybe<Scalars['String']>
  routeEntries?: Maybe<Array<VRouterRouteEntry>>
  attachedRouterUuids?: Maybe<Array<Scalars['String']>>
}

export interface VRouterRouteTableListResp {
  list: Array<VRouterRouteTable>
  total: Scalars['Float']
  error?: Maybe<ActionError>
}

export interface VRouterRouteEntryListResp {
  list: Array<VRouterRouteEntry>
  total: Scalars['Float']
  error?: Maybe<ActionError>
}

export interface DataCenter {
  uuid: Scalars['String']
  description?: Maybe<Scalars['String']>
  createDate?: Maybe<Scalars['String']>
  lastOpDate?: Maybe<Scalars['String']>
  dcType?: Maybe<Scalars['String']>
  regionId?: Maybe<Scalars['String']>
  regionName?: Maybe<Scalars['String']>
}

export interface IdentityZone {
  uuid: Scalars['String']
  description?: Maybe<Scalars['String']>
  createDate?: Maybe<Scalars['String']>
  lastOpDate?: Maybe<Scalars['String']>
  DataCenter?: Maybe<DataCenter>
  dataCenterUuid?: Maybe<Scalars['String']>
  type?: Maybe<Scalars['String']>
  zoneId?: Maybe<Scalars['String']>
  zoneName?: Maybe<Scalars['String']>
}

export interface IdentityZoneResp {
  list?: Maybe<Array<IdentityZone>>
  total?: Maybe<Scalars['Float']>
}

export interface DashboardHomepageLayoutsConfig {
  userId?: Maybe<Scalars['String']>
  layoutConfig?: Maybe<Scalars['String']>
}

export interface DashboardWelcomeConfig {
  userId?: Maybe<Scalars['String']>
  welcomeConfig?: Maybe<Scalars['String']>
}

export interface UpdateWelcomeConfigResp {
  welcomeConfig?: Maybe<Scalars['String']>
}

export interface WidgetAlarmInfo {
  emergentCount?: Maybe<Scalars['Int']>
  importantCount?: Maybe<Scalars['Int']>
  normalCount?: Maybe<Scalars['Int']>
  latest4List?: Maybe<Array<AlarmHistories>>
  latest10List?: Maybe<Array<AlarmHistories>>
}

export interface WidgetUserInfo {
  accountNum?: Maybe<Scalars['Int']>
  projectNum?: Maybe<Scalars['Int']>
  platformTime?: Maybe<Scalars['Float']>
  projectName?: Maybe<Scalars['String']>
  userInProjectNum?: Maybe<Scalars['Int']>
  retirePolicy?: Maybe<IAM2ProjectRetirePolicy>
  identity?: Maybe<Scalars['String']>
  projectAdminName?: Maybe<Scalars['String']>
}

export interface SummaryUserInfo {
  platformAdminNum?: Maybe<Scalars['Int']>
  normalUserNum?: Maybe<Scalars['Int']>
  accountNum?: Maybe<Scalars['Float']>
  userNum?: Maybe<Scalars['Float']>
}

export interface WidgetResourceStateCount {
  total?: Maybe<Scalars['Int']>
  other?: Maybe<Scalars['Int']>
  running?: Maybe<Scalars['Int']>
  stopped?: Maybe<Scalars['Int']>
  connected?: Maybe<Scalars['Int']>
  disconnected?: Maybe<Scalars['Int']>
  ready?: Maybe<Scalars['Int']>
  attached?: Maybe<Scalars['Int']>
  notAttached?: Maybe<Scalars['Int']>
  idle?: Maybe<Scalars['Int']>
  enabled?: Maybe<Scalars['Int']>
  disabled?: Maybe<Scalars['Int']>
}

export interface WidgetMonitorTopItem {
  uuid?: Maybe<Scalars['String']>
  name?: Maybe<Scalars['String']>
  value?: Maybe<Scalars['String']>
}

export interface WidgetMonitorTop {
  list?: Maybe<Array<WidgetMonitorTopItem>>
  valueMax?: Maybe<Scalars['Float']>
}

export interface WidgetMonitorTopL3Network {
  uuid?: Maybe<Scalars['String']>
  name?: Maybe<Scalars['String']>
  value?: Maybe<Scalars['String']>
  l3Network?: Maybe<L3Network>
}

export interface WidgetMonitorL3NetworkTop {
  list?: Maybe<Array<WidgetMonitorTopL3Network>>
  valueMax?: Maybe<Scalars['Float']>
}

export interface Label {
  BackupStorageType?: Maybe<Scalars['String']>
  BackupStorageUuid?: Maybe<Scalars['String']>
}

export interface MetriData {
  time?: Maybe<Scalars['Int']>
  value?: Maybe<Scalars['Float']>
  labels?: Maybe<Label>
}

export interface ResourceData {
  totalCapacity?: Maybe<Scalars['Float']>
  usedCapacity?: Maybe<Scalars['Float']>
}

export interface MetriDataList {
  percentList?: Maybe<Array<MetriData>>
  capacityData?: Maybe<ResourceData>
}

export interface WidgetMonitorTrendItem {
  time?: Maybe<Scalars['Float']>
  value?: Maybe<Scalars['Float']>
  type?: Maybe<Scalars['String']>
}

export interface WidgetMonitorTrend {
  list?: Maybe<Array<WidgetMonitorTrendItem>>
  currentValue?: Maybe<Array<Scalars['Float']>>
}

export interface WidgetQuotaUsageItem {
  name?: Maybe<Scalars['String']>
  used?: Maybe<Scalars['Float']>
  total?: Maybe<Scalars['Float']>
}

export interface WidgetQuotaUsage {
  computing?: Maybe<Array<WidgetQuotaUsageItem>>
  storage?: Maybe<Array<WidgetQuotaUsageItem>>
  network?: Maybe<Array<WidgetQuotaUsageItem>>
  other?: Maybe<Array<WidgetQuotaUsageItem>>
}

export interface TagCloud {
  uuid: Scalars['String']
  name: Scalars['String']
  value?: Maybe<Scalars['Float']>
}

export interface SearchResource {
  resourceName?: Maybe<Scalars['String']>
  resourceType?: Maybe<Scalars['String']>
  uuid?: Maybe<Scalars['String']>
}

export interface SearchResourceResp {
  list?: Maybe<Array<SearchResource>>
  total?: Maybe<Scalars['Float']>
}

export interface ZsKvResult {
  key: Scalars['String']
  value: Scalars['String']
}

export interface Condition {
  key?: Maybe<Scalars['String']>
  value?: Maybe<Scalars['String']>
  values?: Maybe<Array<Scalars['String']>>
  op?: Maybe<Op>
}

export enum Op {
  eq = 'eq',
  ne = 'ne',
  gte = 'gte',
  gt = 'gt',
  lte = 'lte',
  lt = 'lt',
  like = 'like',
  notLike = 'notLike',
  is = 'is',
  not = 'not',
  in = 'in',
  notIn = 'notIn',
  has = 'has',
  notHas = 'notHas',
  query = 'query',
  getapi = 'getapi',
  and = 'and',
  or = 'or'
}

export interface IAM2AttributeInput {
  uuid?: Maybe<Scalars['String']>
  name?: Maybe<Scalars['String']>
  type?: Maybe<Scalars['String']>
  value?: Maybe<Scalars['String']>
  virtualIDUuid?: Maybe<Scalars['String']>
}

export interface Query {
  getTwoFactorAuthenticationState: GetTwoFactorAuthenticationStateResp
  validatePassword: ValidatePassword
  volume?: Maybe<Volume>
  volumeList: VolumeList
  getVolumeSummary: VolumeSummary
  tagList: TagQueryResp
  handleTagList: TagQueryResp
  getTagRelatedSummary: TagRelatedSummary
  ownerList: OwnerQueryResp
  ownerSummary: OwnerSummaryQueryResp
  shareTypeList: Array<ShareType>
  sharedResourceList: Array<QuerySharedResourceResult>
  primaryStorageList: PrimaryStorageQueryResp
  getTrashOnPrimaryStorage: TrashOnPrimaryStorageResp
  getPrimaryStorageRelatedSummary: PrimaryStorageRelatedSummary
  getPrimaryStorageRelatedClusterSummary: PrimaryStorageRelatedClusterSummary
  getPrimaryStorageRelatedBaremetal2ClusterSummary: PrimaryStorageRelatedBaremetal2ClusterSummary
  primaryStorageMetricDataList: Array<PrimaryStorageMetricData>
  zone?: Maybe<Zone>
  zoneList: ZoneResponse
  zoneRelatedSummary: ZoneRelatedSummary
  virtualIdList: IAM2VirtualIDResp
  twoFactorAuthenticationList: TwoFactorAuthenticationResp
  virtualIDAttributeList: IAM2AttributeResp
  vmInstanceList: VmInstanceList
  guestToolStatus: GuestTool
  vmInstance?: Maybe<VmInstance>
  getRequestConsoleAccess: RequestConsoleAccess
  vmMetricDataList: Array<Array<VmInstanceMetricData>>
  storageMigrateVmInstancedepends: StorageMigrateVmInstancedepends
  getMaxPCpuNum: Scalars['Int']
  getGuestToolsState: ToolsState
  getCdromConfigForVmCreate: CdromConfigForVmCreate
  getVmInstanceSummary: VmInstanceSummary
  cluster: Cluster
  clusterList: QueryClusterResp
  getCandidateClusterForVmSelectList: QueryClusterResp
  getClusterRelatedSummary: ClusterRelatedSummary
  getBaremetal2ClusterRelatedSummary: Baremetal2ClusterRelatedSummary
  clusterSummary: ClusterSummaryQueryResp
  queryClusterDRS: QueryClusterDRSResp
  queryDRSVmMigrationActivityList: QueryVmMigrationActivityResp
  queryDRSAdviceList: QueryDRSAdviceResp
  vCenterList: VCenterList
  getvCenterSummary: VCenterSummary
  image: Image
  imageList: ImageList
  imageSupportBootModeForBareMetal2Instance?: Maybe<ImageBootMode>
  getImageSummary: ImageSummary
  backupStorageTypes: Array<Scalars['String']>
  backupStorageList: BackupStorageList
  backupStorage: BackupStorage
  backupStorageMetricDataList: Array<BackupStorageMetricData>
  instanceOffering?: Maybe<InstanceOffering>
  instanceOfferingList: InstanceOfferingQueryResp
  validatInstanceOfferingUserConfig: ValidatInstanceOfferingUserConfigResp
  hostList: HostQueryResp
  getHostRelatedSummary: HostRelatedSummary
  hostMetricData: Array<Array<HostMetricData>>
  hostSummary: HostSummary
  affinityGroupList: AffinityGroupList
  portForwardingList: PortForwardingList
  vmNicCandidateList: VmNicCandidateList
  vmNicList: VmNicListResp
  vmNicIpList: VmNicIpListResp
  vmNic: Array<VmNic>
  getVmNicCount: VmNicListResp
  getVmAttachableL3Network: Array<L3Network>
  provisionNetworkList: QueryProvisionNetworkResp
  provisionNetwork: ProvisionNetwork
  l3NetworkList: L3NetworkListResp
  dnsList: DnsListResp
  l3Network: L3Network
  getL3NetworkCount: L3NetworkCountResp
  ipRangeList: IpRangeListResp
  ipRangeCount: IpRangeCountResp
  getFreeIpOfL3Network: GetFreeIpOfL3NetworkResult
  getFreeIpOfIpRange: GetFreeIpOfL3NetworkResult
  getFreeIp: GetFreeIpOfL3NetworkResult
  ipStatistics: GetL3NetworkIpStatisticResult
  diskOffering?: Maybe<DiskOffering>
  diskOfferingList: DiskOfferingQueryResp
  validatDiskOfferingUserConfig: ValidatDiskOfferingUserConfigResp
  cdrom?: Maybe<CdRom>
  cdromList: CdRomsQueryResp
  maxAmount: MaxAmount
  vmCdRoms: CdRomsQueryResp
  vmCdRomsConfig: VMCdRomConfig
  volumeSnapshotList: VolumeSnapshotListResp
  volumeSnapshot: VolumeSnapshot
  volumeSnapshotTree: VolumeSnapshotTreeListResp
  volumeSnapshotGroup: VolumeSnapshotGroup
  snapshotGroupByVolumeList: SnapshotGroupByVolumeList
  pciDeviceSpecList: PciDeviceSpecList
  pciDeviceSpec: PciDeviceSpec
  mdevDeviceSpecList: MdevDeviceSpecQueryResp
  vgpuDeviceSpecList: VGpuDeviceSpecList
  vgpuDeviceSpec: VGpuDeviceSpec
  autoScalingGroupList: AutoScalingGroupResp
  autoScalingGroup: AutoScalingGroup
  autoScalingGroupActivityList: AutoScalingGroupActivityResp
  securityGroupList: SecurityGroupList
  securityGroup: SecurityGroup
  securityGroupRuleList: SecurityGroupRuleList
  vipNetworkList: VipNetworkListResp
  vipNetworkMetricData: Array<VipNetworkMetricData>
  canCreateQos: Scalars['Boolean']
  getVipUsedPorts: Array<Scalars['String']>
  vipNetworkSummary: VipNetworkSummary
  vipNetworkQosList: VipNetworkQosListResp
  vpcList: VpcResponse
  vpc?: Maybe<VpcVRouter>
  vpcRelatedVmInstanceCount: Scalars['Int']
  getAttachableVpcL3NetworkList: L3NetworkListResp
  getVpcVRouterDistributedRoutingConnections: VpcVRouterDistributedRoutingConnectionsResp
  getVpcSummary: VpcSummary
  getVpcRelatedSummary: VpcRelatedSummary
  vpcHaGroupList: VpcHaGroupResponse
  vpcHaGroupRelatedVmCount: Scalars['Int']
  netflowList: NetflowQueryResp
  getVpcListByNetflow: VpcVRouterByNetflowQueryResp
  virtualRouterOfferingList: VirtualRouterOfferingQueryResp
  getDatabaseBackupFromImageStore: BackupDataFormImageStorageResp
  multicastRouterList: QueryMulticastRouterResp
  vpcMulticastRouteList: QueryVpcMulticastRouteResp
  vmRelatedResource: VmRelatedResource
  scsiLunList: ScsiLunList
  usbsDeviceList: UsbDeviceQueryResp
  queryUsbCandidates: UsbDeviceQueryResp
  pciDeviceList: PciDeviceList
  pciDevice: Array<PciDevice>
  vgpuDeviceList: VGpuDeviceList
  l2NetworkList: L2NetworkQueryResp
  l2NetworkListCount: L2NetworkQueryResp
  vcenterVms: VCenterVmQueryResp
  vcenterMessageList: VcenterMessageQueryResp
  cephPrimaryStoragePoolList: CephPrimaryStoragePoolList
  trashList: TrashResp
  monsList: MonsQueryResp
  iscsiServerList: IscsiServerList
  getIscsiServerSummary: IscsiServerRelateSummary
  iscsiLunList: IscsiLunList
  fiberChannelStorageList: FiberChannelStorageList
  sharedBlockList: SharedBlockResponse
  candidateSharedBlockList: CandidateSharedBlockResponse
  fiberChannelLunList: FiberChannelLunList
  vCenterClusterList: VCenterClusterList
  vCenterPrimaryStorageList: VCenterPrimaryStorageList
  vCenterBackupStorageList: VCenterBackupStorageList
  vCenterResourcePoolList: VCenterResourcePoolList
  pciDeviceOfferingList: PciDeviceOfferingList
  zwatchAlarmList: ZWatchAlarmVoResp
  metricLabelList: MetricLabelResp
  queryAuditList: AuditResp
  getCurrentTime: GetCurrentTime
  alarmData: Array<AlarmData>
  assignResourceAlarmData: AssignResourceAlarmData
  querySNSApplicationEndpointList: QueryEndPointResp
  queryEndpointEmailAddressList: QueryEndPointEmailAddressResp
  queryEndpointSmsAddressList: QueryEndPointSmsAddressList
  getAlarmHistoriesList: QueryAlarmHistoriesResp
  getAlarmHistories: AlarmHistories
  thirdPartyAlertsList: QueryThirdPartyAlertsResp
  thirdPartyAlert: ThirdPartyAlerts
  thirdpartyPlatformList: ThirdpartyPlatformQueryResp
  resourceStackList: QueryResourceStackResp
  previewResourceStack: PreviewResult
  queryEventFromResourceStackList: QueryEventFromResourceStackResp
  getResourceFromResourceStackList: GetResourceFromResourceStackResp
  checkTemplateParameters: CheckTemplateResp
  stackTemplateList: QueryStackTemplateResp
  snsTextTemplateList: QuerySNSTextTemplateResp
  aliyunSmsSNSTextTemplateList: QuerySNSTextTemplateResp
  monitorTemplateList: QueryMonitorTemplateResp
  monitorGroupList: MonitorGroupList
  monitorGroupInstanceList: MonitorGroupInstanceList
  queryResourceInstance: MonitorGroupAddResourceList
  getActiveAlarm: OneClickAlarmResp
  getOneClickAlarmResourceCount: OneClickAlarmResourceCountResp
  queryCapacityManagementCard: CapacityManagementCard
  queryCapacityManagementTopListHost: Array<CapacityManagementTopListHost>
  queryCapacityManagementTopListPrimaryStorage: Array<CapacityManagementTopListPrimaryStorage>
  queryCapacityManagementTopListBackupStorage: Array<CapacityManagementTopListBackupStorage>
  queryCapacityManagementTopListImage: Array<CapacityManagementTopListImage>
  queryCapacityManagementTopListVmInstance: Array<CapacityManagementTopListVmInstance>
  queryCapacityManagementTopListVolume: Array<CapacityManagementTopListVolume>
  queryCapacityManagementTopListSnapshot: Array<CapacityManagementTopListSnapshot>
  queryCapacityManagementTopListHostDiskInfo: Array<CapacityManagementTopListHostDiskInfo>
  queryCapacityManagementDisconnectedResourceCount: CapacityManagementDisconnectedResourceCount
  metricRuleTemplateList: QueryMetricRuleTemplateResp
  eventRuleTemplateList: QueryEventRuleTemplateResp
  vmInstancePerformances: VmInstancePerformanceQueryResp
  vpcVRouterPerformances: VpcVRouterPerformanceQueryResp
  hostPerformances: HostPerformanceQueryResp
  backupStoragePerformances: BackupStoragePerformanceQueryResp
  l3NetworkPerformances: L3NetworkPerformanceQueryResp
  vipNetworkPerformances: VipNetworkPerformanceQueryResp
  networkTopologyList: QueryNetworkTopologyResp
  networkTopologyRelation: QueryNetworkTopologyRelationResp
  networkTopologyVRouterRelation: QueryNetworkTopologyRelationResp
  getVmByL3NetworkUuid: QueryNetworkTopologyResp
  resourceAndRelationByType: QueryResourceAndRelationResp
  backupOverviewMissionOverviewStatistics: MissionOverviewStatistics
  getSchedulerReport: SchedulerReportResult
  getOverviewSchedulerJobHistory: Array<OverviewSchedulerJobHistory>
  backupDataList: BackupDataResponse
  getbackupDataRecoverLocalHostUuid?: Maybe<Scalars['String']>
  thinProvisionByPrimaryStorage: Scalars['Boolean']
  backupResourceDataList: BackupResourceDataResponse
  backupDatabaseList: BackupDatabaseResponse
  canScanDatabaseBackup: Scalars['Boolean']
  getConsoleLog: Scalars['String']
  exportDatabaseBackupFromBackupStorage: Scalars['String']
  iam2ProjectTemplateList: IAM2ProjectTemplateList
  iam2ProjectTemplate: IAM2ProjectTemplate
  organizationList: IAM2OrganizationResp
  thirdPartyAuthList: ThirdPartyAuthResp
  canAddtoVirtualIDGroupList: CanAddToIAM2VirtualIDGroupResp
  virtualIDGroupList: IAM2VirtualIDGroupResp
  iam2ProjectList: IAM2ProjectList
  getIAM2ProjectsOfVirtualID: IAM2ProjectList
  iam2Project: IAM2Project
  iam2ProjectRelatedResourceNum: IAM2ProjectRelatedResource
  iam2ProjectNum: Scalars['Float']
  roleList: RoleList
  role: Role
  uiPrivileges: RoleUIPrivilege
  ticketAssignmentByUuid: TicketAssignmentList
  ticketAssignmentList: TicketAssignmentList
  ticketAssignmentProjectAttributesList: TicketAssignmentProjectAttributesResp
  ticketAssignmentQuotaList: Array<Usages>
  ticketAssignmentHistoryDetail: TicketAssignmentDetailHistoryResp
  ticketProcessList: QueryTicketProcessResp
  getCreateTicketProcessAvailableTicketTypes: Array<Scalars['String']>
  getCreateTicketProcessProjectAdmin: Array<ProjectAdminInfo>
  queryTicketList: TicketQueryResp
  ticketDetail: TicketDetailResp
  getAccountQuatoInfo: AccountQuatoInfoResp
  ticketRecordList: TicketRecord
  preconfigurationTemplateList: PreconfigurationTemplateQueryResp
  baremetalInstanceList: BaremetalInstanceList
  baremetalInstance: BaremetalInstance
  getBaremetalInstanceConfigSummary: BaremetalInstanceConfigSummary
  baremetalNicList: BaremetalNicList
  baremetalDiskList: BaremetalDiskList
  baremetalPxeServerList: BaremetalPxeServerQueryResp
  baremetalChassisList: BaremetalChassisQueryResp
  bareMetal2ChassisOfferingList: BareMetal2ChassisOfferingList
  bareMetal2ChassisList: BareMetal2ChassisQueryResp
  bareMetal2ChassisNicList: BareMetal2ChassisNicQueryResp
  bareMetal2GatewayList: BareMetal2GatewayQueryResp
  bareMetal2InstanceList: BareMetal2InstanceList
  bareMetal2Instance: BareMetal2Instance
  bareMetal2InstanceNicList: VmNicListResp
  v2vConversionHostList: V2VConversionHostQueryResp
  v2vConversionHostSystemTagsList: V2VConversionHostSystemTagsQueryResp
  v2vConversionHostMetricData: Array<Array<V2VConversionHostMetricData>>
  v2vConversionHostCpuMemoryCapacity: V2VConversionHostCpuMemoryCapacity
  ticketAssignmentFiledList: TicketFiledListQueryResp
  ticketAssignmentFiledHistoryDetail: TicketAssignmentFiledQueryResp
  schedulerJobGroupList: SchedulerJobGroupList
  localBackupStorageList: LocalBackupStorageQueryResp
  localBackupStorageSystemTagsList: LocalBackupStorageSystemTagsQueryResp
  scanlocalBackupStorage: ScanLocalBackupStorage
  remoteBackupStorageList: RemoteBackupStorageQueryResp
  remoteBackupStorageSystemTagsList: RemoteBackupStorageSystemTagsQueryResp
  v2vMigrationList: V2VMigrationList
  v2vMigration: V2VMigration
  listVMsFromKVMHost: VMFromV2VList
  schedulerJobList: SchedulerJobList
  schedulerTriggerList: SchedulerTriggerList
  schedulerAvaliableTriggerList: SchedulerTriggerList
  schedulerDoneTriggerList: SchedulerTriggerList
  schedulerJobHistoryList: SchedulerJobHistoryList
  schedulerJobHistoryGroupByFireInstanceIdList: SchedulerJobHistoryGroupByFireInstanceIdList
  certificateList: QueryCertificateResp
  consoleProxylList: ConsoleProxyAgentQueryResp
  queryThirdpartyList: QueryHybridKeySecretResult
  accessKeyList: QueryAccessKeyResp
  operationLogList: QueryOperationLogResp
  operationLongjobList: QueryOperationLongjobResp
  logServerList: LogServerQueryResp
  test: LogServerQueryResp
  emailServerSettingList: EmailServerSettingQueryResp
  emailServerSetting?: Maybe<EmailServerSetting>
  ipblackwhiteList: IpBlackWhiteListQueryResp
  billingsPriceList: BillingsPriceQueryResp
  billingsPriceTableList: BillingsPriceTableQueryResp
  validatBillingsPriceUserConfig: ValidatBillingPriceUserConfigResp
  billingsPriceTableBillingSymbol: Scalars['String']
  accountBillingsPriceTableRef: AccountBillingsPriceTableRef
  billingsPricesSummary: BillingsPricesSummary
  billingsPricesBindProjectAndAccountSummary: BillingsPricesBindProjectAndAccountSummary
  billingEnable: Scalars['Boolean']
  accountList: AccountResp
  accountNum: Scalars['Float']
  managementNodeList: ManagementNodeQueryResp
  isDoubleManagementNode: Scalars['Boolean']
  billings: BillingQueryResp
  billingResources: BillingTableResourceQueryResp
  billingForOrganizationSummary: OrganizationBilling
  billingResourcesDetail: BillingTableResourceQueryResp
  billsDetailSummary: BillingResourceSummary
  applicationCentenrList: ApplicationCenterQueryResp
  resourceConfigList: ResourceConfigList
  globalConfig?: Maybe<GlobalConfig>
  getGlobalConfig?: Maybe<GlobalConfig>
  globalConfigList: GlobalConfigList
  getLicenseInfo: LicenseInfo
  getLicenseAddOns: Array<LicenseAddOn>
  getXskyLicense: Array<XskyLicense>
  getAboutLicenseInfo: LicenseInfoResp
  getAboutLicenseAddOns: LicenseAddOnResp
  globalConfigTemplateList: GlobalConfigTemplateList
  templateConfigList: TemplateConfigList
  queryCustomColumnConfig: CustomColumnsConfig
  getThemeConfig: ThemeConfigResponse
  portMirrorList: PortMirrorList
  ospfList: OSPFQueryResp
  getVpcListByOspf: VpcVRouterByOSPFQueryResp
  getOspfByVpcRouter: OSPFByVRouterQueryResp
  getVRouterRouterId: VRouterRouterIdResp
  getVRouterOspfNeighbor: VRouterOspfNeighborQueryResp
  ipsecConnectionList: IPsecConnectionList
  iPsecConnectionSummary: IPsecConnectionSummary
  /** 本地子网列表 */
  localCidrList: L3NetworkListResp
  /** 远端网络CIDR列表 */
  peerCidrList: IPsecPeerCidrListResp
  eipList: EipListResp
  loadBalancerList: QueryLoadBalancerResp
  serverGroupList: QueryServerGroupResp
  backendServerList: QueryBackendServerResp
  slbOfferingList: SlbOfferingList
  listenerList: QueryListenerResp
  portMirrorSessionList: PortMirrorSessionList
  getVmFromVMNics: VmNicListResp
  fireWallIpSetTemplateList: QueryIpSetTemplateResp
  firewallRuleSetList: FirewallRuleSetQueryResp
  firewallRuleList: FirewallRuleQueryResp
  fireWallRuleTemplateList: QueryRuleTemplateResp
  firewallRelateNetworkList: FirewallRelateNetworkQueryResp
  fireWallList: QueryFireWallResp
  queryFireWallByVpcUuid: QueryFireWallResp
  usedIpList: UsedIpListResp
  sdnControllerList: SdnControllerList
  vRouterRouteTableList: VRouterRouteTableListResp
  vRouterRouteEntryList: VRouterRouteEntryListResp
  vxlanPoolList: VxlanPoolQueryResp
  vxlanPoolRelatedResource: VxlanPoolRelatedResource
  vniRangeList: VniRangeResp
  vxlanPoolAttachedVtep: VxlanPoolQueryVtepResp
  metricData: Array<MetricData>
  metricDataList: Array<Array<MetricData>>
  metricLabelValueList: Array<MetricLabelValue>
  identityZoneList: IdentityZoneResp
  queryDashboardHomepageLayoutsConfig: DashboardHomepageLayoutsConfig
  queryWelcomeConfig: DashboardWelcomeConfig
  queryWidgetAlarmInfo: WidgetAlarmInfo
  queryWidgetUserInfo: WidgetUserInfo
  querySummaryUserInfo: SummaryUserInfo
  queryWidgetResourceStateCount: WidgetResourceStateCount
  queryWidgetMonitorTop: WidgetMonitorTop
  queryWidgetMonitorL3NetworkTop: WidgetMonitorL3NetworkTop
  getUsageStatisticsData: MetriDataList
  queryWidgetMonitorTrend: WidgetMonitorTrend
  queryWidgetQuotaUsage: WidgetQuotaUsage
  queryTagCloudInfo: Array<TagCloud>
  searchResource: SearchResourceResp
  zsKv: ZsKvResult
}

export interface QueryvalidatePasswordArgs {
  loginType: Scalars['String']
  password: Scalars['String']
  loginName: Scalars['String']
}

export interface QueryvolumeArgs {
  uuid: Scalars['String']
}

export interface QueryvolumeListArgs {
  conditions?: Maybe<Array<Condition>>
  extraConditions?: Maybe<Array<Condition>>
  limit?: Maybe<Scalars['Int']>
  start?: Maybe<Scalars['Int']>
  count?: Maybe<Scalars['Boolean']>
  groupBy?: Maybe<Scalars['String']>
  replyWithCount?: Maybe<Scalars['Boolean']>
  sortBy?: Maybe<Scalars['String']>
  sortDirection?: Maybe<SortDirectionValidValues>
  fields?: Maybe<Array<Scalars['String']>>
  type?: Maybe<VolumeQueryType>
}

export interface QuerygetVolumeSummaryArgs {
  conditions: Array<Condition>
}

export interface QuerytagListArgs {
  conditions?: Maybe<Array<Condition>>
  extraConditions?: Maybe<Array<Condition>>
  limit?: Maybe<Scalars['Int']>
  start?: Maybe<Scalars['Int']>
  count?: Maybe<Scalars['Boolean']>
  groupBy?: Maybe<Scalars['String']>
  replyWithCount?: Maybe<Scalars['Boolean']>
  sortBy?: Maybe<Scalars['String']>
  sortDirection?: Maybe<SortDirectionValidValues>
  fields?: Maybe<Array<Scalars['String']>>
  type?: Maybe<TagQueryType>
}

export interface QueryhandleTagListArgs {
  conditions?: Maybe<Array<Condition>>
  extraConditions?: Maybe<Array<Condition>>
  limit?: Maybe<Scalars['Int']>
  start?: Maybe<Scalars['Int']>
  count?: Maybe<Scalars['Boolean']>
  groupBy?: Maybe<Scalars['String']>
  replyWithCount?: Maybe<Scalars['Boolean']>
  sortBy?: Maybe<Scalars['String']>
  sortDirection?: Maybe<SortDirectionValidValues>
  fields?: Maybe<Array<Scalars['String']>>
  type?: Maybe<Scalars['String']>
}

export interface QuerygetTagRelatedSummaryArgs {
  uuid: Scalars['String']
}

export interface QueryownerListArgs {
  conditions?: Maybe<Array<Condition>>
  extraConditions?: Maybe<Array<Condition>>
  limit?: Maybe<Scalars['Int']>
  start?: Maybe<Scalars['Int']>
  count?: Maybe<Scalars['Boolean']>
  groupBy?: Maybe<Scalars['String']>
  replyWithCount?: Maybe<Scalars['Boolean']>
  sortBy?: Maybe<Scalars['String']>
  sortDirection?: Maybe<SortDirectionValidValues>
  fields?: Maybe<Array<Scalars['String']>>
  type: OwnerQueryType
}

export interface QueryownerSummaryArgs {
  conditions?: Maybe<Array<Condition>>
  extraConditions?: Maybe<Array<Condition>>
  limit?: Maybe<Scalars['Int']>
  start?: Maybe<Scalars['Int']>
  count?: Maybe<Scalars['Boolean']>
  groupBy?: Maybe<Scalars['String']>
  replyWithCount?: Maybe<Scalars['Boolean']>
  sortBy?: Maybe<Scalars['String']>
  sortDirection?: Maybe<SortDirectionValidValues>
  fields?: Maybe<Array<Scalars['String']>>
  type: OwnerSummaryType
}

export interface QueryshareTypeListArgs {
  uuids: Array<Scalars['String']>
}

export interface QuerysharedResourceListArgs {
  input: QuerySharedResourceInput
}

export interface QueryprimaryStorageListArgs {
  conditions?: Maybe<Array<Condition>>
  extraConditions?: Maybe<Array<Condition>>
  limit?: Maybe<Scalars['Int']>
  start?: Maybe<Scalars['Int']>
  count?: Maybe<Scalars['Boolean']>
  groupBy?: Maybe<Scalars['String']>
  replyWithCount?: Maybe<Scalars['Boolean']>
  sortBy?: Maybe<Scalars['String']>
  sortDirection?: Maybe<SortDirectionValidValues>
  fields?: Maybe<Array<Scalars['String']>>
  type?: Maybe<PrimaryStorageQueryType>
}

export interface QuerygetTrashOnPrimaryStorageArgs {
  uuid: Scalars['String']
}

export interface QuerygetPrimaryStorageRelatedSummaryArgs {
  uuid: Scalars['String']
}

export interface QuerygetPrimaryStorageRelatedClusterSummaryArgs {
  primaryStorageUuids: Array<Scalars['String']>
  clusterUuids: Array<Scalars['String']>
}

export interface QuerygetPrimaryStorageRelatedBaremetal2ClusterSummaryArgs {
  primaryStorageUuids: Array<Scalars['String']>
  clusterUuids: Array<Scalars['String']>
}

export interface QueryprimaryStorageMetricDataListArgs {
  uuid: Scalars['String']
  namespace: Scalars['String']
  metricName: Scalars['String']
  startTime?: Maybe<Scalars['Float']>
  endTime?: Maybe<Scalars['Float']>
  offsetAheadOfCurrentTime?: Maybe<Scalars['Int']>
  period?: Maybe<Scalars['Int']>
  labels?: Maybe<Array<Scalars['String']>>
  functions?: Maybe<Array<Scalars['String']>>
  systemTags?: Maybe<Scalars['String']>
  userTags?: Maybe<Array<Scalars['String']>>
  sessionId?: Maybe<Scalars['String']>
  accessKeyId?: Maybe<Scalars['String']>
  accessKeySecret?: Maybe<Scalars['String']>
  requestIp?: Maybe<Scalars['String']>
}

export interface QueryzoneArgs {
  uuid: Scalars['String']
}

export interface QueryzoneListArgs {
  conditions?: Maybe<Array<Condition>>
  extraConditions?: Maybe<Array<Condition>>
  limit?: Maybe<Scalars['Int']>
  start?: Maybe<Scalars['Int']>
  count?: Maybe<Scalars['Boolean']>
  groupBy?: Maybe<Scalars['String']>
  replyWithCount?: Maybe<Scalars['Boolean']>
  sortBy?: Maybe<Scalars['String']>
  sortDirection?: Maybe<SortDirectionValidValues>
  fields?: Maybe<Array<Scalars['String']>>
  type?: Maybe<Scalars['String']>
}

export interface QueryzoneRelatedSummaryArgs {
  uuid: Scalars['String']
}

export interface QueryvirtualIdListArgs {
  conditions?: Maybe<Array<Condition>>
  extraConditions?: Maybe<Array<Condition>>
  limit?: Maybe<Scalars['Int']>
  start?: Maybe<Scalars['Int']>
  count?: Maybe<Scalars['Boolean']>
  groupBy?: Maybe<Scalars['String']>
  replyWithCount?: Maybe<Scalars['Boolean']>
  sortBy?: Maybe<Scalars['String']>
  sortDirection?: Maybe<SortDirectionValidValues>
  fields?: Maybe<Array<Scalars['String']>>
  type?: Maybe<IAM2VirtualIDQueryType>
}

export interface QuerytwoFactorAuthenticationListArgs {
  conditions?: Maybe<Array<Condition>>
  extraConditions?: Maybe<Array<Condition>>
  limit?: Maybe<Scalars['Int']>
  start?: Maybe<Scalars['Int']>
  count?: Maybe<Scalars['Boolean']>
  groupBy?: Maybe<Scalars['String']>
  replyWithCount?: Maybe<Scalars['Boolean']>
  sortBy?: Maybe<Scalars['String']>
  sortDirection?: Maybe<SortDirectionValidValues>
  fields?: Maybe<Array<Scalars['String']>>
  type?: Maybe<IAM2VirtualIDQueryType>
}

export interface QueryvirtualIDAttributeListArgs {
  conditions?: Maybe<Array<Condition>>
  extraConditions?: Maybe<Array<Condition>>
  limit?: Maybe<Scalars['Int']>
  start?: Maybe<Scalars['Int']>
  count?: Maybe<Scalars['Boolean']>
  groupBy?: Maybe<Scalars['String']>
  replyWithCount?: Maybe<Scalars['Boolean']>
  sortBy?: Maybe<Scalars['String']>
  sortDirection?: Maybe<SortDirectionValidValues>
  fields?: Maybe<Array<Scalars['String']>>
  type?: Maybe<IAM2VirtualIDQueryType>
}

export interface QueryvmInstanceListArgs {
  conditions?: Maybe<Array<Condition>>
  extraConditions?: Maybe<Array<Condition>>
  limit?: Maybe<Scalars['Int']>
  start?: Maybe<Scalars['Int']>
  count?: Maybe<Scalars['Boolean']>
  groupBy?: Maybe<Scalars['String']>
  replyWithCount?: Maybe<Scalars['Boolean']>
  sortBy?: Maybe<Scalars['String']>
  sortDirection?: Maybe<SortDirectionValidValues>
  fields?: Maybe<Array<Scalars['String']>>
  type?: Maybe<VmQueryType>
}

export interface QueryguestToolStatusArgs {
  uuid: Scalars['String']
}

export interface QueryvmInstanceArgs {
  uuid: Scalars['String']
}

export interface QuerygetRequestConsoleAccessArgs {
  uuid: Scalars['String']
}

export interface QueryvmMetricDataListArgs {
  startTime: Scalars['Float']
  endTime: Scalars['Float']
  period: Scalars['Float']
  uuid: Scalars['String']
  metricNames: Array<Scalars['String']>
  namespace?: Maybe<Scalars['String']>
}

export interface QuerystorageMigrateVmInstancedependsArgs {
  uuid: Scalars['String']
}

export interface QuerygetMaxPCpuNumArgs {
  type: GetMaxPCpuNumForVmCreateType
  uuidList: Array<Scalars['String']>
}

export interface QuerygetGuestToolsStateArgs {
  hostUuid: Scalars['String']
  state: Scalars['String']
  platform: Scalars['String']
  uuid: Scalars['String']
}

export interface QuerygetVmInstanceSummaryArgs {
  conditions?: Maybe<Array<Condition>>
  extraConditions?: Maybe<Array<Condition>>
  limit?: Maybe<Scalars['Int']>
  start?: Maybe<Scalars['Int']>
  count?: Maybe<Scalars['Boolean']>
  groupBy?: Maybe<Scalars['String']>
  replyWithCount?: Maybe<Scalars['Boolean']>
  sortBy?: Maybe<Scalars['String']>
  sortDirection?: Maybe<SortDirectionValidValues>
  fields?: Maybe<Array<Scalars['String']>>
  type?: Maybe<Scalars['String']>
}

export interface QueryclusterArgs {
  uuid: Scalars['String']
}

export interface QueryclusterListArgs {
  conditions?: Maybe<Array<Condition>>
  extraConditions?: Maybe<Array<Condition>>
  limit?: Maybe<Scalars['Int']>
  start?: Maybe<Scalars['Int']>
  count?: Maybe<Scalars['Boolean']>
  groupBy?: Maybe<Scalars['String']>
  replyWithCount?: Maybe<Scalars['Boolean']>
  sortBy?: Maybe<Scalars['String']>
  sortDirection?: Maybe<SortDirectionValidValues>
  fields?: Maybe<Array<Scalars['String']>>
  type?: Maybe<ClusterQueryType>
}

export interface QuerygetCandidateClusterForVmSelectListArgs {
  conditions?: Maybe<Array<Condition>>
  extraConditions?: Maybe<Array<Condition>>
  limit?: Maybe<Scalars['Int']>
  start?: Maybe<Scalars['Int']>
  count?: Maybe<Scalars['Boolean']>
  groupBy?: Maybe<Scalars['String']>
  replyWithCount?: Maybe<Scalars['Boolean']>
  sortBy?: Maybe<Scalars['String']>
  sortDirection?: Maybe<SortDirectionValidValues>
  fields?: Maybe<Array<Scalars['String']>>
  type?: Maybe<ClusterQueryType>
}

export interface QuerygetClusterRelatedSummaryArgs {
  uuid: Scalars['String']
}

export interface QuerygetBaremetal2ClusterRelatedSummaryArgs {
  uuid: Scalars['String']
}

export interface QueryclusterSummaryArgs {
  conditions?: Maybe<Array<Condition>>
  extraConditions?: Maybe<Array<Condition>>
  limit?: Maybe<Scalars['Int']>
  start?: Maybe<Scalars['Int']>
  count?: Maybe<Scalars['Boolean']>
  groupBy?: Maybe<Scalars['String']>
  replyWithCount?: Maybe<Scalars['Boolean']>
  sortBy?: Maybe<Scalars['String']>
  sortDirection?: Maybe<SortDirectionValidValues>
  fields?: Maybe<Array<Scalars['String']>>
  type?: Maybe<ClusterQueryType>
}

export interface QueryqueryClusterDRSArgs {
  clusterUuid: Scalars['String']
}

export interface QueryqueryDRSVmMigrationActivityListArgs {
  conditions?: Maybe<Array<Condition>>
  extraConditions?: Maybe<Array<Condition>>
  limit?: Maybe<Scalars['Int']>
  start?: Maybe<Scalars['Int']>
  count?: Maybe<Scalars['Boolean']>
  groupBy?: Maybe<Scalars['String']>
  replyWithCount?: Maybe<Scalars['Boolean']>
  sortBy?: Maybe<Scalars['String']>
  sortDirection?: Maybe<SortDirectionValidValues>
  fields?: Maybe<Array<Scalars['String']>>
  type?: Maybe<ClusterQueryType>
}

export interface QueryqueryDRSAdviceListArgs {
  conditions?: Maybe<Array<Condition>>
  extraConditions?: Maybe<Array<Condition>>
  limit?: Maybe<Scalars['Int']>
  start?: Maybe<Scalars['Int']>
  count?: Maybe<Scalars['Boolean']>
  groupBy?: Maybe<Scalars['String']>
  replyWithCount?: Maybe<Scalars['Boolean']>
  sortBy?: Maybe<Scalars['String']>
  sortDirection?: Maybe<SortDirectionValidValues>
  fields?: Maybe<Array<Scalars['String']>>
  type?: Maybe<ClusterQueryType>
}

export interface QueryvCenterListArgs {
  conditions?: Maybe<Array<Condition>>
  extraConditions?: Maybe<Array<Condition>>
  limit?: Maybe<Scalars['Int']>
  start?: Maybe<Scalars['Int']>
  count?: Maybe<Scalars['Boolean']>
  groupBy?: Maybe<Scalars['String']>
  replyWithCount?: Maybe<Scalars['Boolean']>
  sortBy?: Maybe<Scalars['String']>
  sortDirection?: Maybe<SortDirectionValidValues>
  fields?: Maybe<Array<Scalars['String']>>
  type?: Maybe<Scalars['String']>
}

export interface QuerygetvCenterSummaryArgs {
  uuid: Scalars['String']
}

export interface QueryimageArgs {
  uuid: Scalars['String']
}

export interface QueryimageListArgs {
  conditions?: Maybe<Array<Condition>>
  extraConditions?: Maybe<Array<Condition>>
  limit?: Maybe<Scalars['Int']>
  start?: Maybe<Scalars['Int']>
  count?: Maybe<Scalars['Boolean']>
  groupBy?: Maybe<Scalars['String']>
  replyWithCount?: Maybe<Scalars['Boolean']>
  sortBy?: Maybe<Scalars['String']>
  sortDirection?: Maybe<SortDirectionValidValues>
  fields?: Maybe<Array<Scalars['String']>>
  type?: Maybe<ImageQueryType>
}

export interface QuerygetImageSummaryArgs {
  conditions: Array<Condition>
}

export interface QuerybackupStorageListArgs {
  conditions?: Maybe<Array<Condition>>
  extraConditions?: Maybe<Array<Condition>>
  limit?: Maybe<Scalars['Int']>
  start?: Maybe<Scalars['Int']>
  count?: Maybe<Scalars['Boolean']>
  groupBy?: Maybe<Scalars['String']>
  replyWithCount?: Maybe<Scalars['Boolean']>
  sortBy?: Maybe<Scalars['String']>
  sortDirection?: Maybe<SortDirectionValidValues>
  fields?: Maybe<Array<Scalars['String']>>
  type?: Maybe<BackupStorageQueryType>
}

export interface QuerybackupStorageArgs {
  uuid: Scalars['String']
}

export interface QuerybackupStorageMetricDataListArgs {
  labels?: Maybe<Array<Scalars['String']>>
  offsetAheadOfCurrentTime: Scalars['Float']
  period: Scalars['Float']
  metricName: Scalars['String']
  namespace: Scalars['String']
  uuid: Scalars['String']
}

export interface QueryinstanceOfferingArgs {
  uuid: Scalars['String']
}

export interface QueryinstanceOfferingListArgs {
  conditions?: Maybe<Array<Condition>>
  extraConditions?: Maybe<Array<Condition>>
  limit?: Maybe<Scalars['Int']>
  start?: Maybe<Scalars['Int']>
  count?: Maybe<Scalars['Boolean']>
  groupBy?: Maybe<Scalars['String']>
  replyWithCount?: Maybe<Scalars['Boolean']>
  sortBy?: Maybe<Scalars['String']>
  sortDirection?: Maybe<SortDirectionValidValues>
  fields?: Maybe<Array<Scalars['String']>>
  type?: Maybe<Scalars['String']>
}

export interface QueryvalidatInstanceOfferingUserConfigArgs {
  config: Scalars['String']
}

export interface QueryhostListArgs {
  conditions?: Maybe<Array<Condition>>
  extraConditions?: Maybe<Array<Condition>>
  limit?: Maybe<Scalars['Int']>
  start?: Maybe<Scalars['Int']>
  count?: Maybe<Scalars['Boolean']>
  groupBy?: Maybe<Scalars['String']>
  replyWithCount?: Maybe<Scalars['Boolean']>
  sortBy?: Maybe<Scalars['String']>
  sortDirection?: Maybe<SortDirectionValidValues>
  fields?: Maybe<Array<Scalars['String']>>
  type?: Maybe<HostQueryType>
}

export interface QuerygetHostRelatedSummaryArgs {
  uuid: Scalars['String']
}

export interface QueryhostMetricDataArgs {
  startTime: Scalars['Float']
  endTime: Scalars['Float']
  period: Scalars['Float']
  uuid: Scalars['String']
  metricNames: Array<Scalars['String']>
}

export interface QueryhostSummaryArgs {
  conditions?: Maybe<Array<Condition>>
}

export interface QueryaffinityGroupListArgs {
  conditions?: Maybe<Array<Condition>>
  extraConditions?: Maybe<Array<Condition>>
  limit?: Maybe<Scalars['Int']>
  start?: Maybe<Scalars['Int']>
  count?: Maybe<Scalars['Boolean']>
  groupBy?: Maybe<Scalars['String']>
  replyWithCount?: Maybe<Scalars['Boolean']>
  sortBy?: Maybe<Scalars['String']>
  sortDirection?: Maybe<SortDirectionValidValues>
  fields?: Maybe<Array<Scalars['String']>>
  type?: Maybe<AffinityGroupQueryType>
}

export interface QueryportForwardingListArgs {
  conditions?: Maybe<Array<Condition>>
  extraConditions?: Maybe<Array<Condition>>
  limit?: Maybe<Scalars['Int']>
  start?: Maybe<Scalars['Int']>
  count?: Maybe<Scalars['Boolean']>
  groupBy?: Maybe<Scalars['String']>
  replyWithCount?: Maybe<Scalars['Boolean']>
  sortBy?: Maybe<Scalars['String']>
  sortDirection?: Maybe<SortDirectionValidValues>
  fields?: Maybe<Array<Scalars['String']>>
  type?: Maybe<Scalars['String']>
}

export interface QueryvmNicCandidateListArgs {
  input: QueryVmNicListInput
}

export interface QueryvmNicListArgs {
  conditions?: Maybe<Array<Condition>>
  extraConditions?: Maybe<Array<Condition>>
  limit?: Maybe<Scalars['Int']>
  start?: Maybe<Scalars['Int']>
  count?: Maybe<Scalars['Boolean']>
  groupBy?: Maybe<Scalars['String']>
  replyWithCount?: Maybe<Scalars['Boolean']>
  sortBy?: Maybe<Scalars['String']>
  sortDirection?: Maybe<SortDirectionValidValues>
  fields?: Maybe<Array<Scalars['String']>>
  type?: Maybe<VmNicQueryType>
}

export interface QueryvmNicIpListArgs {
  conditions?: Maybe<Array<Condition>>
  extraConditions?: Maybe<Array<Condition>>
  limit?: Maybe<Scalars['Int']>
  start?: Maybe<Scalars['Int']>
  count?: Maybe<Scalars['Boolean']>
  groupBy?: Maybe<Scalars['String']>
  replyWithCount?: Maybe<Scalars['Boolean']>
  sortBy?: Maybe<Scalars['String']>
  sortDirection?: Maybe<SortDirectionValidValues>
  fields?: Maybe<Array<Scalars['String']>>
  type?: Maybe<Scalars['String']>
}

export interface QueryvmNicArgs {
  uuid: Scalars['String']
}

export interface QuerygetVmNicCountArgs {
  conditions?: Maybe<Array<Condition>>
  extraConditions?: Maybe<Array<Condition>>
  limit?: Maybe<Scalars['Int']>
  start?: Maybe<Scalars['Int']>
  count?: Maybe<Scalars['Boolean']>
  groupBy?: Maybe<Scalars['String']>
  replyWithCount?: Maybe<Scalars['Boolean']>
  sortBy?: Maybe<Scalars['String']>
  sortDirection?: Maybe<SortDirectionValidValues>
  fields?: Maybe<Array<Scalars['String']>>
  type?: Maybe<VmNicQueryType>
}

export interface QuerygetVmAttachableL3NetworkArgs {
  vmInstanceUuid: Scalars['String']
}

export interface QueryprovisionNetworkListArgs {
  conditions?: Maybe<Array<Condition>>
  extraConditions?: Maybe<Array<Condition>>
  limit?: Maybe<Scalars['Int']>
  start?: Maybe<Scalars['Int']>
  count?: Maybe<Scalars['Boolean']>
  groupBy?: Maybe<Scalars['String']>
  replyWithCount?: Maybe<Scalars['Boolean']>
  sortBy?: Maybe<Scalars['String']>
  sortDirection?: Maybe<SortDirectionValidValues>
  fields?: Maybe<Array<Scalars['String']>>
  type?: Maybe<Scalars['String']>
}

export interface QueryprovisionNetworkArgs {
  uuid: Scalars['String']
}

export interface Queryl3NetworkListArgs {
  conditions?: Maybe<Array<Condition>>
  extraConditions?: Maybe<Array<Condition>>
  limit?: Maybe<Scalars['Int']>
  start?: Maybe<Scalars['Int']>
  count?: Maybe<Scalars['Boolean']>
  groupBy?: Maybe<Scalars['String']>
  replyWithCount?: Maybe<Scalars['Boolean']>
  sortBy?: Maybe<Scalars['String']>
  sortDirection?: Maybe<SortDirectionValidValues>
  fields?: Maybe<Array<Scalars['String']>>
  type?: Maybe<L3NetworkQueryType>
}

export interface QuerydnsListArgs {
  conditions?: Maybe<Array<Condition>>
  extraConditions?: Maybe<Array<Condition>>
  limit?: Maybe<Scalars['Int']>
  start?: Maybe<Scalars['Int']>
  count?: Maybe<Scalars['Boolean']>
  groupBy?: Maybe<Scalars['String']>
  replyWithCount?: Maybe<Scalars['Boolean']>
  sortBy?: Maybe<Scalars['String']>
  sortDirection?: Maybe<SortDirectionValidValues>
  fields?: Maybe<Array<Scalars['String']>>
  type?: Maybe<L3NetworkQueryType>
}

export interface Queryl3NetworkArgs {
  uuid: Scalars['String']
}

export interface QuerygetL3NetworkCountArgs {
  conditions?: Maybe<Array<Condition>>
  extraConditions?: Maybe<Array<Condition>>
  limit?: Maybe<Scalars['Int']>
  start?: Maybe<Scalars['Int']>
  count?: Maybe<Scalars['Boolean']>
  groupBy?: Maybe<Scalars['String']>
  replyWithCount?: Maybe<Scalars['Boolean']>
  sortBy?: Maybe<Scalars['String']>
  sortDirection?: Maybe<SortDirectionValidValues>
  fields?: Maybe<Array<Scalars['String']>>
  type?: Maybe<L3NetworkQueryType>
}

export interface QueryipRangeListArgs {
  conditions?: Maybe<Array<Condition>>
  extraConditions?: Maybe<Array<Condition>>
  limit?: Maybe<Scalars['Int']>
  start?: Maybe<Scalars['Int']>
  count?: Maybe<Scalars['Boolean']>
  groupBy?: Maybe<Scalars['String']>
  replyWithCount?: Maybe<Scalars['Boolean']>
  sortBy?: Maybe<Scalars['String']>
  sortDirection?: Maybe<SortDirectionValidValues>
  fields?: Maybe<Array<Scalars['String']>>
  type?: Maybe<Scalars['String']>
}

export interface QueryipRangeCountArgs {
  l3NetworkUuid: Scalars['String']
}

export interface QuerygetFreeIpOfL3NetworkArgs {
  ipVersion?: Maybe<Scalars['Int']>
  l3NetworkUuid: Scalars['String']
}

export interface QuerygetFreeIpOfIpRangeArgs {
  ipVersion?: Maybe<Scalars['Int']>
  ipRangeUuid: Scalars['String']
}

export interface QuerygetFreeIpArgs {
  input: GetFreeIpInput
}

export interface QueryipStatisticsArgs {
  conditions?: Maybe<Array<Condition>>
  extraConditions?: Maybe<Array<Condition>>
  limit?: Maybe<Scalars['Int']>
  start?: Maybe<Scalars['Int']>
  count?: Maybe<Scalars['Boolean']>
  groupBy?: Maybe<Scalars['String']>
  replyWithCount?: Maybe<Scalars['Boolean']>
  sortBy?: Maybe<Scalars['String']>
  sortDirection?: Maybe<SortDirectionValidValues>
  fields?: Maybe<Array<Scalars['String']>>
  type?: Maybe<Scalars['String']>
}

export interface QuerydiskOfferingArgs {
  uuid: Scalars['String']
}

export interface QuerydiskOfferingListArgs {
  conditions?: Maybe<Array<Condition>>
  extraConditions?: Maybe<Array<Condition>>
  limit?: Maybe<Scalars['Int']>
  start?: Maybe<Scalars['Int']>
  count?: Maybe<Scalars['Boolean']>
  groupBy?: Maybe<Scalars['String']>
  replyWithCount?: Maybe<Scalars['Boolean']>
  sortBy?: Maybe<Scalars['String']>
  sortDirection?: Maybe<SortDirectionValidValues>
  fields?: Maybe<Array<Scalars['String']>>
  type?: Maybe<Scalars['String']>
}

export interface QueryvalidatDiskOfferingUserConfigArgs {
  config: Scalars['String']
}

export interface QuerycdromArgs {
  uuid: Scalars['String']
}

export interface QuerycdromListArgs {
  conditions?: Maybe<Array<Condition>>
  extraConditions?: Maybe<Array<Condition>>
  limit?: Maybe<Scalars['Int']>
  start?: Maybe<Scalars['Int']>
  count?: Maybe<Scalars['Boolean']>
  groupBy?: Maybe<Scalars['String']>
  replyWithCount?: Maybe<Scalars['Boolean']>
  sortBy?: Maybe<Scalars['String']>
  sortDirection?: Maybe<SortDirectionValidValues>
  fields?: Maybe<Array<Scalars['String']>>
  type?: Maybe<Scalars['String']>
}

export interface QuerymaxAmountArgs {
  vmInstanceUuid: Scalars['String']
}

export interface QueryvmCdRomsArgs {
  vmInstanceUuid: Scalars['String']
}

export interface QueryvolumeSnapshotListArgs {
  conditions?: Maybe<Array<Condition>>
  extraConditions?: Maybe<Array<Condition>>
  limit?: Maybe<Scalars['Int']>
  start?: Maybe<Scalars['Int']>
  count?: Maybe<Scalars['Boolean']>
  groupBy?: Maybe<Scalars['String']>
  replyWithCount?: Maybe<Scalars['Boolean']>
  sortBy?: Maybe<Scalars['String']>
  sortDirection?: Maybe<SortDirectionValidValues>
  fields?: Maybe<Array<Scalars['String']>>
  type?: Maybe<Scalars['String']>
}

export interface QueryvolumeSnapshotArgs {
  uuid: Scalars['String']
}

export interface QueryvolumeSnapshotTreeArgs {
  conditions?: Maybe<Array<Condition>>
  extraConditions?: Maybe<Array<Condition>>
  limit?: Maybe<Scalars['Int']>
  start?: Maybe<Scalars['Int']>
  count?: Maybe<Scalars['Boolean']>
  groupBy?: Maybe<Scalars['String']>
  replyWithCount?: Maybe<Scalars['Boolean']>
  sortBy?: Maybe<Scalars['String']>
  sortDirection?: Maybe<SortDirectionValidValues>
  fields?: Maybe<Array<Scalars['String']>>
  type?: Maybe<Scalars['String']>
}

export interface QueryvolumeSnapshotGroupArgs {
  uuid: Scalars['String']
}

export interface QuerysnapshotGroupByVolumeListArgs {
  conditions?: Maybe<Array<Condition>>
  extraConditions?: Maybe<Array<Condition>>
  limit?: Maybe<Scalars['Int']>
  start?: Maybe<Scalars['Int']>
  count?: Maybe<Scalars['Boolean']>
  groupBy?: Maybe<Scalars['String']>
  replyWithCount?: Maybe<Scalars['Boolean']>
  sortBy?: Maybe<Scalars['String']>
  sortDirection?: Maybe<SortDirectionValidValues>
  fields?: Maybe<Array<Scalars['String']>>
  type?: Maybe<SnapshotQueryType>
}

export interface QuerypciDeviceSpecListArgs {
  conditions?: Maybe<Array<Condition>>
  extraConditions?: Maybe<Array<Condition>>
  limit?: Maybe<Scalars['Int']>
  start?: Maybe<Scalars['Int']>
  count?: Maybe<Scalars['Boolean']>
  groupBy?: Maybe<Scalars['String']>
  replyWithCount?: Maybe<Scalars['Boolean']>
  sortBy?: Maybe<Scalars['String']>
  sortDirection?: Maybe<SortDirectionValidValues>
  fields?: Maybe<Array<Scalars['String']>>
  type?: Maybe<Scalars['String']>
}

export interface QuerypciDeviceSpecArgs {
  type: Scalars['String']
  uuid: Scalars['String']
}

export interface QuerymdevDeviceSpecListArgs {
  conditions?: Maybe<Array<Condition>>
  extraConditions?: Maybe<Array<Condition>>
  limit?: Maybe<Scalars['Int']>
  start?: Maybe<Scalars['Int']>
  count?: Maybe<Scalars['Boolean']>
  groupBy?: Maybe<Scalars['String']>
  replyWithCount?: Maybe<Scalars['Boolean']>
  sortBy?: Maybe<Scalars['String']>
  sortDirection?: Maybe<SortDirectionValidValues>
  fields?: Maybe<Array<Scalars['String']>>
  type?: Maybe<MdevDeviceSpecQueryType>
}

export interface QueryvgpuDeviceSpecListArgs {
  conditions?: Maybe<Array<Condition>>
  extraConditions?: Maybe<Array<Condition>>
  limit?: Maybe<Scalars['Int']>
  start?: Maybe<Scalars['Int']>
  count?: Maybe<Scalars['Boolean']>
  groupBy?: Maybe<Scalars['String']>
  replyWithCount?: Maybe<Scalars['Boolean']>
  sortBy?: Maybe<Scalars['String']>
  sortDirection?: Maybe<SortDirectionValidValues>
  fields?: Maybe<Array<Scalars['String']>>
  type?: Maybe<Scalars['String']>
}

export interface QueryvgpuDeviceSpecArgs {
  uuid: Scalars['String']
}

export interface QueryautoScalingGroupListArgs {
  conditions?: Maybe<Array<Condition>>
  extraConditions?: Maybe<Array<Condition>>
  limit?: Maybe<Scalars['Int']>
  start?: Maybe<Scalars['Int']>
  count?: Maybe<Scalars['Boolean']>
  groupBy?: Maybe<Scalars['String']>
  replyWithCount?: Maybe<Scalars['Boolean']>
  sortBy?: Maybe<Scalars['String']>
  sortDirection?: Maybe<SortDirectionValidValues>
  fields?: Maybe<Array<Scalars['String']>>
  type?: Maybe<Scalars['String']>
}

export interface QueryautoScalingGroupArgs {
  uuid: Scalars['String']
}

export interface QueryautoScalingGroupActivityListArgs {
  conditions?: Maybe<Array<Condition>>
  extraConditions?: Maybe<Array<Condition>>
  limit?: Maybe<Scalars['Int']>
  start?: Maybe<Scalars['Int']>
  count?: Maybe<Scalars['Boolean']>
  groupBy?: Maybe<Scalars['String']>
  replyWithCount?: Maybe<Scalars['Boolean']>
  sortBy?: Maybe<Scalars['String']>
  sortDirection?: Maybe<SortDirectionValidValues>
  fields?: Maybe<Array<Scalars['String']>>
  type?: Maybe<Scalars['String']>
}

export interface QuerysecurityGroupListArgs {
  conditions?: Maybe<Array<Condition>>
  extraConditions?: Maybe<Array<Condition>>
  limit?: Maybe<Scalars['Int']>
  start?: Maybe<Scalars['Int']>
  count?: Maybe<Scalars['Boolean']>
  groupBy?: Maybe<Scalars['String']>
  replyWithCount?: Maybe<Scalars['Boolean']>
  sortBy?: Maybe<Scalars['String']>
  sortDirection?: Maybe<SortDirectionValidValues>
  fields?: Maybe<Array<Scalars['String']>>
  type?: Maybe<Scalars['String']>
}

export interface QuerysecurityGroupArgs {
  uuid: Scalars['String']
}

export interface QuerysecurityGroupRuleListArgs {
  conditions?: Maybe<Array<Condition>>
  extraConditions?: Maybe<Array<Condition>>
  limit?: Maybe<Scalars['Int']>
  start?: Maybe<Scalars['Int']>
  count?: Maybe<Scalars['Boolean']>
  groupBy?: Maybe<Scalars['String']>
  replyWithCount?: Maybe<Scalars['Boolean']>
  sortBy?: Maybe<Scalars['String']>
  sortDirection?: Maybe<SortDirectionValidValues>
  fields?: Maybe<Array<Scalars['String']>>
  type?: Maybe<Scalars['String']>
}

export interface QueryvipNetworkListArgs {
  conditions?: Maybe<Array<Condition>>
  extraConditions?: Maybe<Array<Condition>>
  limit?: Maybe<Scalars['Int']>
  start?: Maybe<Scalars['Int']>
  count?: Maybe<Scalars['Boolean']>
  groupBy?: Maybe<Scalars['String']>
  replyWithCount?: Maybe<Scalars['Boolean']>
  sortBy?: Maybe<Scalars['String']>
  sortDirection?: Maybe<SortDirectionValidValues>
  fields?: Maybe<Array<Scalars['String']>>
  type?: Maybe<VipNetworkQueryType>
}

export interface QueryvipNetworkMetricDataArgs {
  uuid: Scalars['String']
  namespace: Scalars['String']
  metricName: Scalars['String']
  startTime?: Maybe<Scalars['Float']>
  endTime?: Maybe<Scalars['Float']>
  offsetAheadOfCurrentTime?: Maybe<Scalars['Int']>
  period?: Maybe<Scalars['Int']>
  labels?: Maybe<Array<Scalars['String']>>
  functions?: Maybe<Array<Scalars['String']>>
  systemTags?: Maybe<Scalars['String']>
  userTags?: Maybe<Array<Scalars['String']>>
  sessionId?: Maybe<Scalars['String']>
  accessKeyId?: Maybe<Scalars['String']>
  accessKeySecret?: Maybe<Scalars['String']>
  requestIp?: Maybe<Scalars['String']>
}

export interface QuerycanCreateQosArgs {
  l3NetworkUuid: Scalars['String']
}

export interface QuerygetVipUsedPortsArgs {
  protocol: Scalars['String']
  uuid: Scalars['String']
}

export interface QueryvipNetworkSummaryArgs {
  conditions?: Maybe<Array<Condition>>
  extraConditions?: Maybe<Array<Condition>>
  limit?: Maybe<Scalars['Int']>
  start?: Maybe<Scalars['Int']>
  count?: Maybe<Scalars['Boolean']>
  groupBy?: Maybe<Scalars['String']>
  replyWithCount?: Maybe<Scalars['Boolean']>
  sortBy?: Maybe<Scalars['String']>
  sortDirection?: Maybe<SortDirectionValidValues>
  fields?: Maybe<Array<Scalars['String']>>
  type?: Maybe<VipNetworkQueryType>
}

export interface QueryvipNetworkQosListArgs {
  conditions?: Maybe<Array<Condition>>
  extraConditions?: Maybe<Array<Condition>>
  limit?: Maybe<Scalars['Int']>
  start?: Maybe<Scalars['Int']>
  count?: Maybe<Scalars['Boolean']>
  groupBy?: Maybe<Scalars['String']>
  replyWithCount?: Maybe<Scalars['Boolean']>
  sortBy?: Maybe<Scalars['String']>
  sortDirection?: Maybe<SortDirectionValidValues>
  fields?: Maybe<Array<Scalars['String']>>
  type?: Maybe<Scalars['String']>
}

export interface QueryvpcListArgs {
  conditions?: Maybe<Array<Condition>>
  extraConditions?: Maybe<Array<Condition>>
  limit?: Maybe<Scalars['Int']>
  start?: Maybe<Scalars['Int']>
  count?: Maybe<Scalars['Boolean']>
  groupBy?: Maybe<Scalars['String']>
  replyWithCount?: Maybe<Scalars['Boolean']>
  sortBy?: Maybe<Scalars['String']>
  sortDirection?: Maybe<SortDirectionValidValues>
  fields?: Maybe<Array<Scalars['String']>>
  type?: Maybe<VpcQueryType>
}

export interface QueryvpcArgs {
  uuid: Scalars['String']
}

export interface QueryvpcRelatedVmInstanceCountArgs {
  uuids: Array<Scalars['String']>
}

export interface QuerygetAttachableVpcL3NetworkListArgs {
  uuid: Scalars['String']
}

export interface QuerygetVpcVRouterDistributedRoutingConnectionsArgs {
  uuid: Scalars['String']
}

export interface QuerygetVpcSummaryArgs {
  zoneUuid: Scalars['String']
}

export interface QuerygetVpcRelatedSummaryArgs {
  uuid: Scalars['String']
}

export interface QueryvpcHaGroupListArgs {
  conditions?: Maybe<Array<Condition>>
  extraConditions?: Maybe<Array<Condition>>
  limit?: Maybe<Scalars['Int']>
  start?: Maybe<Scalars['Int']>
  count?: Maybe<Scalars['Boolean']>
  groupBy?: Maybe<Scalars['String']>
  replyWithCount?: Maybe<Scalars['Boolean']>
  sortBy?: Maybe<Scalars['String']>
  sortDirection?: Maybe<SortDirectionValidValues>
  fields?: Maybe<Array<Scalars['String']>>
  type?: Maybe<VpcHaQueryType>
}

export interface QueryvpcHaGroupRelatedVmCountArgs {
  uuids: Array<Scalars['String']>
}

export interface QuerynetflowListArgs {
  conditions?: Maybe<Array<Condition>>
  extraConditions?: Maybe<Array<Condition>>
  limit?: Maybe<Scalars['Int']>
  start?: Maybe<Scalars['Int']>
  count?: Maybe<Scalars['Boolean']>
  groupBy?: Maybe<Scalars['String']>
  replyWithCount?: Maybe<Scalars['Boolean']>
  sortBy?: Maybe<Scalars['String']>
  sortDirection?: Maybe<SortDirectionValidValues>
  fields?: Maybe<Array<Scalars['String']>>
  type?: Maybe<Scalars['String']>
}

export interface QuerygetVpcListByNetflowArgs {
  conditions?: Maybe<Array<Condition>>
  extraConditions?: Maybe<Array<Condition>>
  limit?: Maybe<Scalars['Int']>
  start?: Maybe<Scalars['Int']>
  count?: Maybe<Scalars['Boolean']>
  groupBy?: Maybe<Scalars['String']>
  replyWithCount?: Maybe<Scalars['Boolean']>
  sortBy?: Maybe<Scalars['String']>
  sortDirection?: Maybe<SortDirectionValidValues>
  fields?: Maybe<Array<Scalars['String']>>
  type?: Maybe<Scalars['String']>
}

export interface QueryvirtualRouterOfferingListArgs {
  conditions?: Maybe<Array<Condition>>
  extraConditions?: Maybe<Array<Condition>>
  limit?: Maybe<Scalars['Int']>
  start?: Maybe<Scalars['Int']>
  count?: Maybe<Scalars['Boolean']>
  groupBy?: Maybe<Scalars['String']>
  replyWithCount?: Maybe<Scalars['Boolean']>
  sortBy?: Maybe<Scalars['String']>
  sortDirection?: Maybe<SortDirectionValidValues>
  fields?: Maybe<Array<Scalars['String']>>
  type?: Maybe<Scalars['String']>
}

export interface QuerygetDatabaseBackupFromImageStoreArgs {
  conditions?: Maybe<Array<Condition>>
  extraConditions?: Maybe<Array<Condition>>
  limit?: Maybe<Scalars['Int']>
  start?: Maybe<Scalars['Int']>
  count?: Maybe<Scalars['Boolean']>
  groupBy?: Maybe<Scalars['String']>
  replyWithCount?: Maybe<Scalars['Boolean']>
  sortBy?: Maybe<Scalars['String']>
  sortDirection?: Maybe<SortDirectionValidValues>
  fields?: Maybe<Array<Scalars['String']>>
  type?: Maybe<Scalars['String']>
}

export interface QuerymulticastRouterListArgs {
  conditions?: Maybe<Array<Condition>>
  extraConditions?: Maybe<Array<Condition>>
  limit?: Maybe<Scalars['Int']>
  start?: Maybe<Scalars['Int']>
  count?: Maybe<Scalars['Boolean']>
  groupBy?: Maybe<Scalars['String']>
  replyWithCount?: Maybe<Scalars['Boolean']>
  sortBy?: Maybe<Scalars['String']>
  sortDirection?: Maybe<SortDirectionValidValues>
  fields?: Maybe<Array<Scalars['String']>>
  type?: Maybe<Scalars['String']>
}

export interface QueryvpcMulticastRouteListArgs {
  uuid: Scalars['String']
}

export interface QueryvmRelatedResourceArgs {
  uuid: Scalars['String']
}

export interface QueryscsiLunListArgs {
  conditions?: Maybe<Array<Condition>>
  extraConditions?: Maybe<Array<Condition>>
  limit?: Maybe<Scalars['Int']>
  start?: Maybe<Scalars['Int']>
  count?: Maybe<Scalars['Boolean']>
  groupBy?: Maybe<Scalars['String']>
  replyWithCount?: Maybe<Scalars['Boolean']>
  sortBy?: Maybe<Scalars['String']>
  sortDirection?: Maybe<SortDirectionValidValues>
  fields?: Maybe<Array<Scalars['String']>>
  type?: Maybe<ScsiLunQueryType>
}

export interface QueryusbsDeviceListArgs {
  conditions?: Maybe<Array<Condition>>
  extraConditions?: Maybe<Array<Condition>>
  limit?: Maybe<Scalars['Int']>
  start?: Maybe<Scalars['Int']>
  count?: Maybe<Scalars['Boolean']>
  groupBy?: Maybe<Scalars['String']>
  replyWithCount?: Maybe<Scalars['Boolean']>
  sortBy?: Maybe<Scalars['String']>
  sortDirection?: Maybe<SortDirectionValidValues>
  fields?: Maybe<Array<Scalars['String']>>
  type?: Maybe<UsbDeviceQueryType>
}

export interface QueryqueryUsbCandidatesArgs {
  input: GetUsbDeviceCandidatesForAttachingVmInput
}

export interface QuerypciDeviceListArgs {
  conditions?: Maybe<Array<Condition>>
  extraConditions?: Maybe<Array<Condition>>
  limit?: Maybe<Scalars['Int']>
  start?: Maybe<Scalars['Int']>
  count?: Maybe<Scalars['Boolean']>
  groupBy?: Maybe<Scalars['String']>
  replyWithCount?: Maybe<Scalars['Boolean']>
  sortBy?: Maybe<Scalars['String']>
  sortDirection?: Maybe<SortDirectionValidValues>
  fields?: Maybe<Array<Scalars['String']>>
  type?: Maybe<Scalars['String']>
}

export interface QuerypciDeviceArgs {
  conditions?: Maybe<Array<Condition>>
  extraConditions?: Maybe<Array<Condition>>
  limit?: Maybe<Scalars['Int']>
  start?: Maybe<Scalars['Int']>
  count?: Maybe<Scalars['Boolean']>
  groupBy?: Maybe<Scalars['String']>
  replyWithCount?: Maybe<Scalars['Boolean']>
  sortBy?: Maybe<Scalars['String']>
  sortDirection?: Maybe<SortDirectionValidValues>
  fields?: Maybe<Array<Scalars['String']>>
  type?: Maybe<Scalars['String']>
}

export interface QueryvgpuDeviceListArgs {
  conditions?: Maybe<Array<Condition>>
  extraConditions?: Maybe<Array<Condition>>
  limit?: Maybe<Scalars['Int']>
  start?: Maybe<Scalars['Int']>
  count?: Maybe<Scalars['Boolean']>
  groupBy?: Maybe<Scalars['String']>
  replyWithCount?: Maybe<Scalars['Boolean']>
  sortBy?: Maybe<Scalars['String']>
  sortDirection?: Maybe<SortDirectionValidValues>
  fields?: Maybe<Array<Scalars['String']>>
  type?: Maybe<Scalars['String']>
}

export interface Queryl2NetworkListArgs {
  conditions?: Maybe<Array<Condition>>
  extraConditions?: Maybe<Array<Condition>>
  limit?: Maybe<Scalars['Int']>
  start?: Maybe<Scalars['Int']>
  count?: Maybe<Scalars['Boolean']>
  groupBy?: Maybe<Scalars['String']>
  replyWithCount?: Maybe<Scalars['Boolean']>
  sortBy?: Maybe<Scalars['String']>
  sortDirection?: Maybe<SortDirectionValidValues>
  fields?: Maybe<Array<Scalars['String']>>
  type?: Maybe<L2NetworkQueryType>
  isCount?: Maybe<Scalars['Boolean']>
}

export interface Queryl2NetworkListCountArgs {
  conditions?: Maybe<Array<Condition>>
  extraConditions?: Maybe<Array<Condition>>
  limit?: Maybe<Scalars['Int']>
  start?: Maybe<Scalars['Int']>
  count?: Maybe<Scalars['Boolean']>
  groupBy?: Maybe<Scalars['String']>
  replyWithCount?: Maybe<Scalars['Boolean']>
  sortBy?: Maybe<Scalars['String']>
  sortDirection?: Maybe<SortDirectionValidValues>
  fields?: Maybe<Array<Scalars['String']>>
  type?: Maybe<L2NetworkQueryType>
  isCount?: Maybe<Scalars['Boolean']>
}

export interface QueryvcenterVmsArgs {
  conditions?: Maybe<Array<Condition>>
  extraConditions?: Maybe<Array<Condition>>
  limit?: Maybe<Scalars['Int']>
  start?: Maybe<Scalars['Int']>
  count?: Maybe<Scalars['Boolean']>
  groupBy?: Maybe<Scalars['String']>
  replyWithCount?: Maybe<Scalars['Boolean']>
  sortBy?: Maybe<Scalars['String']>
  sortDirection?: Maybe<SortDirectionValidValues>
  fields?: Maybe<Array<Scalars['String']>>
  type?: Maybe<Scalars['String']>
}

export interface QueryvcenterMessageListArgs {
  conditions?: Maybe<Array<Condition>>
  extraConditions?: Maybe<Array<Condition>>
  limit?: Maybe<Scalars['Int']>
  start?: Maybe<Scalars['Int']>
  count?: Maybe<Scalars['Boolean']>
  groupBy?: Maybe<Scalars['String']>
  replyWithCount?: Maybe<Scalars['Boolean']>
  sortBy?: Maybe<Scalars['String']>
  sortDirection?: Maybe<SortDirectionValidValues>
  fields?: Maybe<Array<Scalars['String']>>
  type?: Maybe<VcenterMessageQueryType>
  startTime?: Maybe<Scalars['Float']>
  endTime?: Maybe<Scalars['Float']>
}

export interface QuerycephPrimaryStoragePoolListArgs {
  conditions?: Maybe<Array<Condition>>
  extraConditions?: Maybe<Array<Condition>>
  limit?: Maybe<Scalars['Int']>
  start?: Maybe<Scalars['Int']>
  count?: Maybe<Scalars['Boolean']>
  groupBy?: Maybe<Scalars['String']>
  replyWithCount?: Maybe<Scalars['Boolean']>
  sortBy?: Maybe<Scalars['String']>
  sortDirection?: Maybe<SortDirectionValidValues>
  fields?: Maybe<Array<Scalars['String']>>
  type?: Maybe<Scalars['String']>
}

export interface QuerytrashListArgs {
  conditions?: Maybe<Array<Condition>>
  extraConditions?: Maybe<Array<Condition>>
  limit?: Maybe<Scalars['Int']>
  start?: Maybe<Scalars['Int']>
  count?: Maybe<Scalars['Boolean']>
  groupBy?: Maybe<Scalars['String']>
  replyWithCount?: Maybe<Scalars['Boolean']>
  sortBy?: Maybe<Scalars['String']>
  sortDirection?: Maybe<SortDirectionValidValues>
  fields?: Maybe<Array<Scalars['String']>>
  type?: Maybe<TrashQueryType>
}

export interface QuerymonsListArgs {
  conditions?: Maybe<Array<Condition>>
  extraConditions?: Maybe<Array<Condition>>
  limit?: Maybe<Scalars['Int']>
  start?: Maybe<Scalars['Int']>
  count?: Maybe<Scalars['Boolean']>
  groupBy?: Maybe<Scalars['String']>
  replyWithCount?: Maybe<Scalars['Boolean']>
  sortBy?: Maybe<Scalars['String']>
  sortDirection?: Maybe<SortDirectionValidValues>
  fields?: Maybe<Array<Scalars['String']>>
  type?: Maybe<CephMonType>
}

export interface QueryiscsiServerListArgs {
  conditions?: Maybe<Array<Condition>>
  extraConditions?: Maybe<Array<Condition>>
  limit?: Maybe<Scalars['Int']>
  start?: Maybe<Scalars['Int']>
  count?: Maybe<Scalars['Boolean']>
  groupBy?: Maybe<Scalars['String']>
  replyWithCount?: Maybe<Scalars['Boolean']>
  sortBy?: Maybe<Scalars['String']>
  sortDirection?: Maybe<SortDirectionValidValues>
  fields?: Maybe<Array<Scalars['String']>>
  type?: Maybe<IscsiServerQueryType>
}

export interface QuerygetIscsiServerSummaryArgs {
  uuids: Array<Scalars['String']>
}

export interface QueryiscsiLunListArgs {
  conditions?: Maybe<Array<Condition>>
  extraConditions?: Maybe<Array<Condition>>
  limit?: Maybe<Scalars['Int']>
  start?: Maybe<Scalars['Int']>
  count?: Maybe<Scalars['Boolean']>
  groupBy?: Maybe<Scalars['String']>
  replyWithCount?: Maybe<Scalars['Boolean']>
  sortBy?: Maybe<Scalars['String']>
  sortDirection?: Maybe<SortDirectionValidValues>
  fields?: Maybe<Array<Scalars['String']>>
  type?: Maybe<Scalars['String']>
}

export interface QueryfiberChannelStorageListArgs {
  conditions?: Maybe<Array<Condition>>
  extraConditions?: Maybe<Array<Condition>>
  limit?: Maybe<Scalars['Int']>
  start?: Maybe<Scalars['Int']>
  count?: Maybe<Scalars['Boolean']>
  groupBy?: Maybe<Scalars['String']>
  replyWithCount?: Maybe<Scalars['Boolean']>
  sortBy?: Maybe<Scalars['String']>
  sortDirection?: Maybe<SortDirectionValidValues>
  fields?: Maybe<Array<Scalars['String']>>
  type?: Maybe<Scalars['String']>
}

export interface QuerysharedBlockListArgs {
  conditions?: Maybe<Array<Condition>>
  extraConditions?: Maybe<Array<Condition>>
  limit?: Maybe<Scalars['Int']>
  start?: Maybe<Scalars['Int']>
  count?: Maybe<Scalars['Boolean']>
  groupBy?: Maybe<Scalars['String']>
  replyWithCount?: Maybe<Scalars['Boolean']>
  sortBy?: Maybe<Scalars['String']>
  sortDirection?: Maybe<SortDirectionValidValues>
  fields?: Maybe<Array<Scalars['String']>>
  type?: Maybe<Scalars['String']>
}

export interface QuerycandidateSharedBlockListArgs {
  conditions?: Maybe<Array<Condition>>
  extraConditions?: Maybe<Array<Condition>>
  limit?: Maybe<Scalars['Int']>
  start?: Maybe<Scalars['Int']>
  count?: Maybe<Scalars['Boolean']>
  groupBy?: Maybe<Scalars['String']>
  replyWithCount?: Maybe<Scalars['Boolean']>
  sortBy?: Maybe<Scalars['String']>
  sortDirection?: Maybe<SortDirectionValidValues>
  fields?: Maybe<Array<Scalars['String']>>
  type?: Maybe<Scalars['String']>
}

export interface QueryfiberChannelLunListArgs {
  conditions?: Maybe<Array<Condition>>
  extraConditions?: Maybe<Array<Condition>>
  limit?: Maybe<Scalars['Int']>
  start?: Maybe<Scalars['Int']>
  count?: Maybe<Scalars['Boolean']>
  groupBy?: Maybe<Scalars['String']>
  replyWithCount?: Maybe<Scalars['Boolean']>
  sortBy?: Maybe<Scalars['String']>
  sortDirection?: Maybe<SortDirectionValidValues>
  fields?: Maybe<Array<Scalars['String']>>
  type?: Maybe<Scalars['String']>
}

export interface QueryvCenterClusterListArgs {
  conditions?: Maybe<Array<Condition>>
  extraConditions?: Maybe<Array<Condition>>
  limit?: Maybe<Scalars['Int']>
  start?: Maybe<Scalars['Int']>
  count?: Maybe<Scalars['Boolean']>
  groupBy?: Maybe<Scalars['String']>
  replyWithCount?: Maybe<Scalars['Boolean']>
  sortBy?: Maybe<Scalars['String']>
  sortDirection?: Maybe<SortDirectionValidValues>
  fields?: Maybe<Array<Scalars['String']>>
  type?: Maybe<Scalars['String']>
}

export interface QueryvCenterPrimaryStorageListArgs {
  conditions?: Maybe<Array<Condition>>
  extraConditions?: Maybe<Array<Condition>>
  limit?: Maybe<Scalars['Int']>
  start?: Maybe<Scalars['Int']>
  count?: Maybe<Scalars['Boolean']>
  groupBy?: Maybe<Scalars['String']>
  replyWithCount?: Maybe<Scalars['Boolean']>
  sortBy?: Maybe<Scalars['String']>
  sortDirection?: Maybe<SortDirectionValidValues>
  fields?: Maybe<Array<Scalars['String']>>
  type?: Maybe<Scalars['String']>
}

export interface QueryvCenterBackupStorageListArgs {
  conditions?: Maybe<Array<Condition>>
  extraConditions?: Maybe<Array<Condition>>
  limit?: Maybe<Scalars['Int']>
  start?: Maybe<Scalars['Int']>
  count?: Maybe<Scalars['Boolean']>
  groupBy?: Maybe<Scalars['String']>
  replyWithCount?: Maybe<Scalars['Boolean']>
  sortBy?: Maybe<Scalars['String']>
  sortDirection?: Maybe<SortDirectionValidValues>
  fields?: Maybe<Array<Scalars['String']>>
  type?: Maybe<Scalars['String']>
}

export interface QueryvCenterResourcePoolListArgs {
  conditions?: Maybe<Array<Condition>>
  extraConditions?: Maybe<Array<Condition>>
  limit?: Maybe<Scalars['Int']>
  start?: Maybe<Scalars['Int']>
  count?: Maybe<Scalars['Boolean']>
  groupBy?: Maybe<Scalars['String']>
  replyWithCount?: Maybe<Scalars['Boolean']>
  sortBy?: Maybe<Scalars['String']>
  sortDirection?: Maybe<SortDirectionValidValues>
  fields?: Maybe<Array<Scalars['String']>>
  type?: Maybe<Scalars['String']>
}

export interface QuerypciDeviceOfferingListArgs {
  conditions?: Maybe<Array<Condition>>
  extraConditions?: Maybe<Array<Condition>>
  limit?: Maybe<Scalars['Int']>
  start?: Maybe<Scalars['Int']>
  count?: Maybe<Scalars['Boolean']>
  groupBy?: Maybe<Scalars['String']>
  replyWithCount?: Maybe<Scalars['Boolean']>
  sortBy?: Maybe<Scalars['String']>
  sortDirection?: Maybe<SortDirectionValidValues>
  fields?: Maybe<Array<Scalars['String']>>
  type?: Maybe<Scalars['String']>
}

export interface QueryzwatchAlarmListArgs {
  conditions?: Maybe<Array<Condition>>
  extraConditions?: Maybe<Array<Condition>>
  limit?: Maybe<Scalars['Int']>
  start?: Maybe<Scalars['Int']>
  count?: Maybe<Scalars['Boolean']>
  groupBy?: Maybe<Scalars['String']>
  replyWithCount?: Maybe<Scalars['Boolean']>
  sortBy?: Maybe<Scalars['String']>
  sortDirection?: Maybe<SortDirectionValidValues>
  fields?: Maybe<Array<Scalars['String']>>
  type?: Maybe<ZWatchAlarmQueryType>
}

export interface QuerymetricLabelListArgs {
  namespace: Scalars['String']
  metricName: Scalars['String']
  labelNames: Array<Scalars['String']>
  filterLabels?: Maybe<Scalars['String']>
}

export interface QueryqueryAuditListArgs {
  conditions?: Maybe<Array<Condition>>
  extraConditions?: Maybe<Array<Condition>>
  limit?: Maybe<Scalars['Int']>
  start?: Maybe<Scalars['Int']>
  count?: Maybe<Scalars['Boolean']>
  groupBy?: Maybe<Scalars['String']>
  replyWithCount?: Maybe<Scalars['Boolean']>
  sortBy?: Maybe<Scalars['String']>
  sortDirection?: Maybe<SortDirectionValidValues>
  fields?: Maybe<Array<Scalars['String']>>
  type?: Maybe<Scalars['String']>
  startTime?: Maybe<Scalars['Float']>
  endTime?: Maybe<Scalars['Float']>
}

export interface QueryalarmDataArgs {
  conditions?: Maybe<Array<Condition>>
  extraConditions?: Maybe<Array<Condition>>
  limit?: Maybe<Scalars['Int']>
  start?: Maybe<Scalars['Int']>
  count?: Maybe<Scalars['Boolean']>
  groupBy?: Maybe<Scalars['String']>
  replyWithCount?: Maybe<Scalars['Boolean']>
  sortBy?: Maybe<Scalars['String']>
  sortDirection?: Maybe<SortDirectionValidValues>
  fields?: Maybe<Array<Scalars['String']>>
  type?: Maybe<Scalars['String']>
}

export interface QueryassignResourceAlarmDataArgs {
  startTime: Scalars['Float']
  endTime: Scalars['Float']
  conditions: Array<Condition>
}

export interface QueryquerySNSApplicationEndpointListArgs {
  conditions?: Maybe<Array<Condition>>
  extraConditions?: Maybe<Array<Condition>>
  limit?: Maybe<Scalars['Int']>
  start?: Maybe<Scalars['Int']>
  count?: Maybe<Scalars['Boolean']>
  groupBy?: Maybe<Scalars['String']>
  replyWithCount?: Maybe<Scalars['Boolean']>
  sortBy?: Maybe<Scalars['String']>
  sortDirection?: Maybe<SortDirectionValidValues>
  fields?: Maybe<Array<Scalars['String']>>
  type?: Maybe<Scalars['String']>
}

export interface QueryqueryEndpointEmailAddressListArgs {
  conditions?: Maybe<Array<Condition>>
  extraConditions?: Maybe<Array<Condition>>
  limit?: Maybe<Scalars['Int']>
  start?: Maybe<Scalars['Int']>
  count?: Maybe<Scalars['Boolean']>
  groupBy?: Maybe<Scalars['String']>
  replyWithCount?: Maybe<Scalars['Boolean']>
  sortBy?: Maybe<Scalars['String']>
  sortDirection?: Maybe<SortDirectionValidValues>
  fields?: Maybe<Array<Scalars['String']>>
  type?: Maybe<Scalars['String']>
}

export interface QueryqueryEndpointSmsAddressListArgs {
  conditions?: Maybe<Array<Condition>>
  extraConditions?: Maybe<Array<Condition>>
  limit?: Maybe<Scalars['Int']>
  start?: Maybe<Scalars['Int']>
  count?: Maybe<Scalars['Boolean']>
  groupBy?: Maybe<Scalars['String']>
  replyWithCount?: Maybe<Scalars['Boolean']>
  sortBy?: Maybe<Scalars['String']>
  sortDirection?: Maybe<SortDirectionValidValues>
  fields?: Maybe<Array<Scalars['String']>>
  type?: Maybe<Scalars['String']>
}

export interface QuerygetAlarmHistoriesListArgs {
  conditions?: Maybe<Array<Condition>>
  extraConditions?: Maybe<Array<Condition>>
  limit?: Maybe<Scalars['Int']>
  start?: Maybe<Scalars['Int']>
  count?: Maybe<Scalars['Boolean']>
  groupBy?: Maybe<Scalars['String']>
  replyWithCount?: Maybe<Scalars['Boolean']>
  sortBy?: Maybe<Scalars['String']>
  sortDirection?: Maybe<SortDirectionValidValues>
  fields?: Maybe<Array<Scalars['String']>>
  type?: Maybe<Scalars['String']>
  startTime?: Maybe<Scalars['Float']>
  endTime?: Maybe<Scalars['Float']>
  endpointUuid?: Maybe<Scalars['String']>
}

export interface QuerygetAlarmHistoriesArgs {
  uuid: Scalars['String']
}

export interface QuerythirdPartyAlertsListArgs {
  conditions?: Maybe<Array<Condition>>
  extraConditions?: Maybe<Array<Condition>>
  limit?: Maybe<Scalars['Int']>
  start?: Maybe<Scalars['Int']>
  count?: Maybe<Scalars['Boolean']>
  groupBy?: Maybe<Scalars['String']>
  replyWithCount?: Maybe<Scalars['Boolean']>
  sortBy?: Maybe<Scalars['String']>
  sortDirection?: Maybe<SortDirectionValidValues>
  fields?: Maybe<Array<Scalars['String']>>
  type?: Maybe<ThirdPartyAlertsQueryType>
}

export interface QuerythirdPartyAlertArgs {
  uuid: Scalars['String']
}

export interface QuerythirdpartyPlatformListArgs {
  conditions?: Maybe<Array<Condition>>
  extraConditions?: Maybe<Array<Condition>>
  limit?: Maybe<Scalars['Int']>
  start?: Maybe<Scalars['Int']>
  count?: Maybe<Scalars['Boolean']>
  groupBy?: Maybe<Scalars['String']>
  replyWithCount?: Maybe<Scalars['Boolean']>
  sortBy?: Maybe<Scalars['String']>
  sortDirection?: Maybe<SortDirectionValidValues>
  fields?: Maybe<Array<Scalars['String']>>
  type?: Maybe<Scalars['String']>
}

export interface QueryresourceStackListArgs {
  conditions?: Maybe<Array<Condition>>
  extraConditions?: Maybe<Array<Condition>>
  limit?: Maybe<Scalars['Int']>
  start?: Maybe<Scalars['Int']>
  count?: Maybe<Scalars['Boolean']>
  groupBy?: Maybe<Scalars['String']>
  replyWithCount?: Maybe<Scalars['Boolean']>
  sortBy?: Maybe<Scalars['String']>
  sortDirection?: Maybe<SortDirectionValidValues>
  fields?: Maybe<Array<Scalars['String']>>
  type?: Maybe<Scalars['String']>
}

export interface QuerypreviewResourceStackArgs {
  templateContent?: Maybe<Scalars['String']>
  parameters?: Maybe<Scalars['String']>
  uuid?: Maybe<Scalars['String']>
  type?: Maybe<Scalars['String']>
}

export interface QueryqueryEventFromResourceStackListArgs {
  conditions?: Maybe<Array<Condition>>
  extraConditions?: Maybe<Array<Condition>>
  limit?: Maybe<Scalars['Int']>
  start?: Maybe<Scalars['Int']>
  count?: Maybe<Scalars['Boolean']>
  groupBy?: Maybe<Scalars['String']>
  replyWithCount?: Maybe<Scalars['Boolean']>
  sortBy?: Maybe<Scalars['String']>
  sortDirection?: Maybe<SortDirectionValidValues>
  fields?: Maybe<Array<Scalars['String']>>
  type?: Maybe<Scalars['String']>
}

export interface QuerygetResourceFromResourceStackListArgs {
  uuid: Scalars['String']
}

export interface QuerycheckTemplateParametersArgs {
  uuid?: Maybe<Scalars['String']>
  templateContent?: Maybe<Scalars['String']>
  type?: Maybe<Scalars['String']>
}

export interface QuerystackTemplateListArgs {
  conditions?: Maybe<Array<Condition>>
  extraConditions?: Maybe<Array<Condition>>
  limit?: Maybe<Scalars['Int']>
  start?: Maybe<Scalars['Int']>
  count?: Maybe<Scalars['Boolean']>
  groupBy?: Maybe<Scalars['String']>
  replyWithCount?: Maybe<Scalars['Boolean']>
  sortBy?: Maybe<Scalars['String']>
  sortDirection?: Maybe<SortDirectionValidValues>
  fields?: Maybe<Array<Scalars['String']>>
  type?: Maybe<StackTemplateQueryType>
}

export interface QuerysnsTextTemplateListArgs {
  conditions?: Maybe<Array<Condition>>
  extraConditions?: Maybe<Array<Condition>>
  limit?: Maybe<Scalars['Int']>
  start?: Maybe<Scalars['Int']>
  count?: Maybe<Scalars['Boolean']>
  groupBy?: Maybe<Scalars['String']>
  replyWithCount?: Maybe<Scalars['Boolean']>
  sortBy?: Maybe<Scalars['String']>
  sortDirection?: Maybe<SortDirectionValidValues>
  fields?: Maybe<Array<Scalars['String']>>
  type?: Maybe<Scalars['String']>
}

export interface QueryaliyunSmsSNSTextTemplateListArgs {
  conditions?: Maybe<Array<Condition>>
  extraConditions?: Maybe<Array<Condition>>
  limit?: Maybe<Scalars['Int']>
  start?: Maybe<Scalars['Int']>
  count?: Maybe<Scalars['Boolean']>
  groupBy?: Maybe<Scalars['String']>
  replyWithCount?: Maybe<Scalars['Boolean']>
  sortBy?: Maybe<Scalars['String']>
  sortDirection?: Maybe<SortDirectionValidValues>
  fields?: Maybe<Array<Scalars['String']>>
  type?: Maybe<Scalars['String']>
}

export interface QuerymonitorTemplateListArgs {
  conditions?: Maybe<Array<Condition>>
  extraConditions?: Maybe<Array<Condition>>
  limit?: Maybe<Scalars['Int']>
  start?: Maybe<Scalars['Int']>
  count?: Maybe<Scalars['Boolean']>
  groupBy?: Maybe<Scalars['String']>
  replyWithCount?: Maybe<Scalars['Boolean']>
  sortBy?: Maybe<Scalars['String']>
  sortDirection?: Maybe<SortDirectionValidValues>
  fields?: Maybe<Array<Scalars['String']>>
  type?: Maybe<Scalars['String']>
}

export interface QuerymonitorGroupListArgs {
  conditions?: Maybe<Array<Condition>>
  extraConditions?: Maybe<Array<Condition>>
  limit?: Maybe<Scalars['Int']>
  start?: Maybe<Scalars['Int']>
  count?: Maybe<Scalars['Boolean']>
  groupBy?: Maybe<Scalars['String']>
  replyWithCount?: Maybe<Scalars['Boolean']>
  sortBy?: Maybe<Scalars['String']>
  sortDirection?: Maybe<SortDirectionValidValues>
  fields?: Maybe<Array<Scalars['String']>>
  type?: Maybe<Scalars['String']>
}

export interface QuerymonitorGroupInstanceListArgs {
  conditions?: Maybe<Array<Condition>>
  extraConditions?: Maybe<Array<Condition>>
  limit?: Maybe<Scalars['Int']>
  start?: Maybe<Scalars['Int']>
  count?: Maybe<Scalars['Boolean']>
  groupBy?: Maybe<Scalars['String']>
  replyWithCount?: Maybe<Scalars['Boolean']>
  sortBy?: Maybe<Scalars['String']>
  sortDirection?: Maybe<SortDirectionValidValues>
  fields?: Maybe<Array<Scalars['String']>>
  type?: Maybe<Scalars['String']>
}

export interface QueryqueryResourceInstanceArgs {
  conditions?: Maybe<Array<Condition>>
  extraConditions?: Maybe<Array<Condition>>
  limit?: Maybe<Scalars['Int']>
  start?: Maybe<Scalars['Int']>
  count?: Maybe<Scalars['Boolean']>
  groupBy?: Maybe<Scalars['String']>
  replyWithCount?: Maybe<Scalars['Boolean']>
  sortBy?: Maybe<Scalars['String']>
  sortDirection?: Maybe<SortDirectionValidValues>
  fields?: Maybe<Array<Scalars['String']>>
  type?: Maybe<Scalars['String']>
}

export interface QuerygetActiveAlarmArgs {
  accountUuid: Scalars['String']
}

export interface QuerygetOneClickAlarmResourceCountArgs {
  zoneUuid: Scalars['String']
}

export interface QueryqueryCapacityManagementCardArgs {
  zoneUuid: Scalars['String']
}

export interface QueryqueryCapacityManagementTopListHostArgs {
  zoneUuid: Scalars['String']
  sortBy: Scalars['String']
  sortDirection: Scalars['String']
}

export interface QueryqueryCapacityManagementTopListPrimaryStorageArgs {
  zoneUuid: Scalars['String']
  sortBy: Scalars['String']
  sortDirection: Scalars['String']
}

export interface QueryqueryCapacityManagementTopListBackupStorageArgs {
  zoneUuid: Scalars['String']
  sortBy: Scalars['String']
  sortDirection: Scalars['String']
}

export interface QueryqueryCapacityManagementTopListImageArgs {
  zoneUuid: Scalars['String']
  sortBy: Scalars['String']
  sortDirection: Scalars['String']
}

export interface QueryqueryCapacityManagementTopListVmInstanceArgs {
  zoneUuid: Scalars['String']
  sortBy: Scalars['String']
  sortDirection: Scalars['String']
}

export interface QueryqueryCapacityManagementTopListVolumeArgs {
  zoneUuid: Scalars['String']
  sortBy: Scalars['String']
  sortDirection: Scalars['String']
}

export interface QueryqueryCapacityManagementTopListSnapshotArgs {
  zoneUuid: Scalars['String']
  sortBy: Scalars['String']
  sortDirection: Scalars['String']
}

export interface QueryqueryCapacityManagementTopListHostDiskInfoArgs {
  uuid: Scalars['String']
}

export interface QueryqueryCapacityManagementDisconnectedResourceCountArgs {
  zoneUuid: Scalars['String']
}

export interface QuerymetricRuleTemplateListArgs {
  conditions?: Maybe<Array<Condition>>
  extraConditions?: Maybe<Array<Condition>>
  limit?: Maybe<Scalars['Int']>
  start?: Maybe<Scalars['Int']>
  count?: Maybe<Scalars['Boolean']>
  groupBy?: Maybe<Scalars['String']>
  replyWithCount?: Maybe<Scalars['Boolean']>
  sortBy?: Maybe<Scalars['String']>
  sortDirection?: Maybe<SortDirectionValidValues>
  fields?: Maybe<Array<Scalars['String']>>
  type?: Maybe<Scalars['String']>
}

export interface QueryeventRuleTemplateListArgs {
  conditions?: Maybe<Array<Condition>>
  extraConditions?: Maybe<Array<Condition>>
  limit?: Maybe<Scalars['Int']>
  start?: Maybe<Scalars['Int']>
  count?: Maybe<Scalars['Boolean']>
  groupBy?: Maybe<Scalars['String']>
  replyWithCount?: Maybe<Scalars['Boolean']>
  sortBy?: Maybe<Scalars['String']>
  sortDirection?: Maybe<SortDirectionValidValues>
  fields?: Maybe<Array<Scalars['String']>>
  type?: Maybe<Scalars['String']>
}

export interface QueryvmInstancePerformancesArgs {
  type?: Maybe<PerformanceType>
  metrics: Array<VmInstancePerformanceMetricType>
  startTime?: Maybe<Scalars['String']>
  endTime?: Maybe<Scalars['String']>
  thresholdNum?: Maybe<Scalars['String']>
  thresholdSymbol?: Maybe<PerformanceThresholdSymbolType>
  thresholdMetric?: Maybe<VmInstancePerformanceMetricType>
  conditions?: Maybe<Array<Condition>>
  extraConditions?: Maybe<Array<Condition>>
  limit?: Maybe<Scalars['Int']>
  start?: Maybe<Scalars['Int']>
  count?: Maybe<Scalars['Boolean']>
  groupBy?: Maybe<Scalars['String']>
  replyWithCount?: Maybe<Scalars['Boolean']>
  sortBy?: Maybe<Scalars['String']>
  sortDirection?: Maybe<SortDirectionValidValues>
  fields?: Maybe<Array<Scalars['String']>>
}

export interface QueryvpcVRouterPerformancesArgs {
  type?: Maybe<PerformanceType>
  metrics: Array<VmInstancePerformanceMetricType>
  startTime?: Maybe<Scalars['String']>
  endTime?: Maybe<Scalars['String']>
  thresholdNum?: Maybe<Scalars['String']>
  thresholdSymbol?: Maybe<PerformanceThresholdSymbolType>
  thresholdMetric?: Maybe<VmInstancePerformanceMetricType>
  conditions?: Maybe<Array<Condition>>
  extraConditions?: Maybe<Array<Condition>>
  limit?: Maybe<Scalars['Int']>
  start?: Maybe<Scalars['Int']>
  count?: Maybe<Scalars['Boolean']>
  groupBy?: Maybe<Scalars['String']>
  replyWithCount?: Maybe<Scalars['Boolean']>
  sortBy?: Maybe<Scalars['String']>
  sortDirection?: Maybe<SortDirectionValidValues>
  fields?: Maybe<Array<Scalars['String']>>
}

export interface QueryhostPerformancesArgs {
  type?: Maybe<PerformanceType>
  metrics: Array<HostPerformanceMetricType>
  startTime?: Maybe<Scalars['String']>
  endTime?: Maybe<Scalars['String']>
  thresholdNum?: Maybe<Scalars['String']>
  thresholdSymbol?: Maybe<PerformanceThresholdSymbolType>
  thresholdMetric?: Maybe<HostPerformanceMetricType>
  conditions?: Maybe<Array<Condition>>
  extraConditions?: Maybe<Array<Condition>>
  limit?: Maybe<Scalars['Int']>
  start?: Maybe<Scalars['Int']>
  count?: Maybe<Scalars['Boolean']>
  groupBy?: Maybe<Scalars['String']>
  replyWithCount?: Maybe<Scalars['Boolean']>
  sortBy?: Maybe<Scalars['String']>
  sortDirection?: Maybe<SortDirectionValidValues>
  fields?: Maybe<Array<Scalars['String']>>
}

export interface QuerybackupStoragePerformancesArgs {
  type?: Maybe<PerformanceType>
  metrics: Array<BackupStoragePerformanceMetricType>
  startTime?: Maybe<Scalars['String']>
  endTime?: Maybe<Scalars['String']>
  thresholdNum?: Maybe<Scalars['String']>
  thresholdSymbol?: Maybe<PerformanceThresholdSymbolType>
  thresholdMetric?: Maybe<BackupStoragePerformanceMetricType>
  conditions?: Maybe<Array<Condition>>
  extraConditions?: Maybe<Array<Condition>>
  limit?: Maybe<Scalars['Int']>
  start?: Maybe<Scalars['Int']>
  count?: Maybe<Scalars['Boolean']>
  groupBy?: Maybe<Scalars['String']>
  replyWithCount?: Maybe<Scalars['Boolean']>
  sortBy?: Maybe<Scalars['String']>
  sortDirection?: Maybe<SortDirectionValidValues>
  fields?: Maybe<Array<Scalars['String']>>
}

export interface Queryl3NetworkPerformancesArgs {
  type?: Maybe<PerformanceType>
  metrics: Array<L3NetworkPerformanceMetricType>
  startTime?: Maybe<Scalars['String']>
  endTime?: Maybe<Scalars['String']>
  thresholdNum?: Maybe<Scalars['String']>
  thresholdSymbol?: Maybe<PerformanceThresholdSymbolType>
  thresholdMetric?: Maybe<L3NetworkPerformanceMetricType>
  conditions?: Maybe<Array<Condition>>
  extraConditions?: Maybe<Array<Condition>>
  limit?: Maybe<Scalars['Int']>
  start?: Maybe<Scalars['Int']>
  count?: Maybe<Scalars['Boolean']>
  groupBy?: Maybe<Scalars['String']>
  replyWithCount?: Maybe<Scalars['Boolean']>
  sortBy?: Maybe<Scalars['String']>
  sortDirection?: Maybe<SortDirectionValidValues>
  fields?: Maybe<Array<Scalars['String']>>
}

export interface QueryvipNetworkPerformancesArgs {
  type?: Maybe<PerformanceType>
  metrics: Array<VipNetworkPerformanceMetricType>
  startTime?: Maybe<Scalars['String']>
  endTime?: Maybe<Scalars['String']>
  thresholdNum?: Maybe<Scalars['String']>
  thresholdSymbol?: Maybe<PerformanceThresholdSymbolType>
  thresholdMetric?: Maybe<VipNetworkPerformanceMetricType>
  conditions?: Maybe<Array<Condition>>
  extraConditions?: Maybe<Array<Condition>>
  limit?: Maybe<Scalars['Int']>
  start?: Maybe<Scalars['Int']>
  count?: Maybe<Scalars['Boolean']>
  groupBy?: Maybe<Scalars['String']>
  replyWithCount?: Maybe<Scalars['Boolean']>
  sortBy?: Maybe<Scalars['String']>
  sortDirection?: Maybe<SortDirectionValidValues>
  fields?: Maybe<Array<Scalars['String']>>
}

export interface QuerynetworkTopologyListArgs {
  conditions?: Maybe<Array<Condition>>
  extraConditions?: Maybe<Array<Condition>>
  limit?: Maybe<Scalars['Int']>
  start?: Maybe<Scalars['Int']>
  count?: Maybe<Scalars['Boolean']>
  groupBy?: Maybe<Scalars['String']>
  replyWithCount?: Maybe<Scalars['Boolean']>
  sortBy?: Maybe<Scalars['String']>
  sortDirection?: Maybe<SortDirectionValidValues>
  fields?: Maybe<Array<Scalars['String']>>
  type?: Maybe<Scalars['String']>
}

export interface QuerynetworkTopologyRelationArgs {
  vmUuids?: Maybe<Array<Scalars['String']>>
  l3NetworkUuids?: Maybe<Array<Scalars['String']>>
  zoneUuid?: Maybe<Scalars['String']>
}

export interface QuerynetworkTopologyVRouterRelationArgs {
  zoneUuid?: Maybe<Scalars['String']>
}

export interface QuerygetVmByL3NetworkUuidArgs {
  uuid: Scalars['String']
}

export interface QueryresourceAndRelationByTypeArgs {
  needInfo?: Maybe<Scalars['Boolean']>
  type: Scalars['String']
  uuids: Array<Scalars['String']>
}

export interface QuerygetSchedulerReportArgs {
  startTime?: Maybe<Scalars['Float']>
  intervalTimeUnit: Scalars['String']
  range: Scalars['Float']
  schedulerJobTypes: Array<Scalars['String']>
}

export interface QuerygetOverviewSchedulerJobHistoryArgs {
  minStartTime?: Maybe<Scalars['Float']>
  minId?: Maybe<Scalars['Int']>
  startTime: Scalars['String']
  endTime: Scalars['String']
  schedulerJobTypes: Array<Scalars['String']>
}

export interface QuerybackupDataListArgs {
  conditions?: Maybe<Array<Condition>>
  extraConditions?: Maybe<Array<Condition>>
  limit?: Maybe<Scalars['Int']>
  start?: Maybe<Scalars['Int']>
  count?: Maybe<Scalars['Boolean']>
  groupBy?: Maybe<Scalars['String']>
  replyWithCount?: Maybe<Scalars['Boolean']>
  sortBy?: Maybe<Scalars['String']>
  sortDirection?: Maybe<SortDirectionValidValues>
  fields?: Maybe<Array<Scalars['String']>>
  type?: Maybe<BackupResourceType>
}

export interface QuerygetbackupDataRecoverLocalHostUuidArgs {
  clusterUuid: Scalars['String']
  vmInstanceUuid: Scalars['String']
}

export interface QuerythinProvisionByPrimaryStorageArgs {
  primaryStorageUuid: Scalars['String']
}

export interface QuerybackupResourceDataListArgs {
  conditions?: Maybe<Array<Condition>>
  extraConditions?: Maybe<Array<Condition>>
  limit?: Maybe<Scalars['Int']>
  start?: Maybe<Scalars['Int']>
  count?: Maybe<Scalars['Boolean']>
  groupBy?: Maybe<Scalars['String']>
  replyWithCount?: Maybe<Scalars['Boolean']>
  sortBy?: Maybe<Scalars['String']>
  sortDirection?: Maybe<SortDirectionValidValues>
  fields?: Maybe<Array<Scalars['String']>>
  type?: Maybe<BackupResourceType>
}

export interface QuerybackupDatabaseListArgs {
  conditions?: Maybe<Array<Condition>>
  extraConditions?: Maybe<Array<Condition>>
  limit?: Maybe<Scalars['Int']>
  start?: Maybe<Scalars['Int']>
  count?: Maybe<Scalars['Boolean']>
  groupBy?: Maybe<Scalars['String']>
  replyWithCount?: Maybe<Scalars['Boolean']>
  sortBy?: Maybe<Scalars['String']>
  sortDirection?: Maybe<SortDirectionValidValues>
  fields?: Maybe<Array<Scalars['String']>>
  type?: Maybe<Scalars['String']>
}

export interface QuerygetConsoleLogArgs {
  first: Scalars['Boolean']
}

export interface QueryexportDatabaseBackupFromBackupStorageArgs {
  backupStorageUuid?: Maybe<Scalars['String']>
  uuid: Scalars['String']
}

export interface Queryiam2ProjectTemplateListArgs {
  conditions?: Maybe<Array<Condition>>
  extraConditions?: Maybe<Array<Condition>>
  limit?: Maybe<Scalars['Int']>
  start?: Maybe<Scalars['Int']>
  count?: Maybe<Scalars['Boolean']>
  groupBy?: Maybe<Scalars['String']>
  replyWithCount?: Maybe<Scalars['Boolean']>
  sortBy?: Maybe<Scalars['String']>
  sortDirection?: Maybe<SortDirectionValidValues>
  fields?: Maybe<Array<Scalars['String']>>
  type?: Maybe<Scalars['String']>
}

export interface Queryiam2ProjectTemplateArgs {
  uuid: Scalars['String']
}

export interface QueryorganizationListArgs {
  conditions?: Maybe<Array<Condition>>
  extraConditions?: Maybe<Array<Condition>>
  limit?: Maybe<Scalars['Int']>
  start?: Maybe<Scalars['Int']>
  count?: Maybe<Scalars['Boolean']>
  groupBy?: Maybe<Scalars['String']>
  replyWithCount?: Maybe<Scalars['Boolean']>
  sortBy?: Maybe<Scalars['String']>
  sortDirection?: Maybe<SortDirectionValidValues>
  fields?: Maybe<Array<Scalars['String']>>
  type?: Maybe<IAM2OrganizationQueryType>
}

export interface QuerythirdPartyAuthListArgs {
  conditions?: Maybe<Array<Condition>>
  extraConditions?: Maybe<Array<Condition>>
  limit?: Maybe<Scalars['Int']>
  start?: Maybe<Scalars['Int']>
  count?: Maybe<Scalars['Boolean']>
  groupBy?: Maybe<Scalars['String']>
  replyWithCount?: Maybe<Scalars['Boolean']>
  sortBy?: Maybe<Scalars['String']>
  sortDirection?: Maybe<SortDirectionValidValues>
  fields?: Maybe<Array<Scalars['String']>>
  type?: Maybe<Scalars['String']>
}

export interface QuerycanAddtoVirtualIDGroupListArgs {
  uuid: Scalars['String']
}

export interface QueryvirtualIDGroupListArgs {
  conditions?: Maybe<Array<Condition>>
  extraConditions?: Maybe<Array<Condition>>
  limit?: Maybe<Scalars['Int']>
  start?: Maybe<Scalars['Int']>
  count?: Maybe<Scalars['Boolean']>
  groupBy?: Maybe<Scalars['String']>
  replyWithCount?: Maybe<Scalars['Boolean']>
  sortBy?: Maybe<Scalars['String']>
  sortDirection?: Maybe<SortDirectionValidValues>
  fields?: Maybe<Array<Scalars['String']>>
  type?: Maybe<Scalars['String']>
}

export interface Queryiam2ProjectListArgs {
  conditions?: Maybe<Array<Condition>>
  extraConditions?: Maybe<Array<Condition>>
  limit?: Maybe<Scalars['Int']>
  start?: Maybe<Scalars['Int']>
  count?: Maybe<Scalars['Boolean']>
  groupBy?: Maybe<Scalars['String']>
  replyWithCount?: Maybe<Scalars['Boolean']>
  sortBy?: Maybe<Scalars['String']>
  sortDirection?: Maybe<SortDirectionValidValues>
  fields?: Maybe<Array<Scalars['String']>>
  type?: Maybe<Scalars['String']>
}

export interface Queryiam2ProjectArgs {
  uuid: Scalars['String']
}

export interface Queryiam2ProjectRelatedResourceNumArgs {
  uuids: Array<Scalars['String']>
}

export interface Queryiam2ProjectNumArgs {
  conditions?: Maybe<Array<Condition>>
  extraConditions?: Maybe<Array<Condition>>
  limit?: Maybe<Scalars['Int']>
  start?: Maybe<Scalars['Int']>
  count?: Maybe<Scalars['Boolean']>
  groupBy?: Maybe<Scalars['String']>
  replyWithCount?: Maybe<Scalars['Boolean']>
  sortBy?: Maybe<Scalars['String']>
  sortDirection?: Maybe<SortDirectionValidValues>
  fields?: Maybe<Array<Scalars['String']>>
  type?: Maybe<Scalars['String']>
}

export interface QueryroleListArgs {
  conditions?: Maybe<Array<Condition>>
  extraConditions?: Maybe<Array<Condition>>
  limit?: Maybe<Scalars['Int']>
  start?: Maybe<Scalars['Int']>
  count?: Maybe<Scalars['Boolean']>
  groupBy?: Maybe<Scalars['String']>
  replyWithCount?: Maybe<Scalars['Boolean']>
  sortBy?: Maybe<Scalars['String']>
  sortDirection?: Maybe<SortDirectionValidValues>
  fields?: Maybe<Array<Scalars['String']>>
  type?: Maybe<Scalars['String']>
}

export interface QueryroleArgs {
  uuid: Scalars['String']
}

export interface QueryuiPrivilegesArgs {
  loginType: Scalars['String']
  targetAccountUuid: Scalars['String']
  virtualIDUuid: Scalars['String']
}

export interface QueryticketAssignmentByUuidArgs {
  conditions?: Maybe<Array<Condition>>
  extraConditions?: Maybe<Array<Condition>>
  limit?: Maybe<Scalars['Int']>
  start?: Maybe<Scalars['Int']>
  count?: Maybe<Scalars['Boolean']>
  groupBy?: Maybe<Scalars['String']>
  replyWithCount?: Maybe<Scalars['Boolean']>
  sortBy?: Maybe<Scalars['String']>
  sortDirection?: Maybe<SortDirectionValidValues>
  fields?: Maybe<Array<Scalars['String']>>
  type?: Maybe<Scalars['String']>
}

export interface QueryticketAssignmentListArgs {
  conditions?: Maybe<Array<Condition>>
  extraConditions?: Maybe<Array<Condition>>
  limit?: Maybe<Scalars['Int']>
  start?: Maybe<Scalars['Int']>
  count?: Maybe<Scalars['Boolean']>
  groupBy?: Maybe<Scalars['String']>
  replyWithCount?: Maybe<Scalars['Boolean']>
  sortBy?: Maybe<Scalars['String']>
  sortDirection?: Maybe<SortDirectionValidValues>
  fields?: Maybe<Array<Scalars['String']>>
  type?: Maybe<Scalars['String']>
}

export interface QueryticketAssignmentProjectAttributesListArgs {
  projectUuid: Scalars['String']
}

export interface QueryticketAssignmentQuotaListArgs {
  uuid: Scalars['String']
}

export interface QueryticketAssignmentHistoryDetailArgs {
  ticketUuid: Scalars['String']
}

export interface QueryticketProcessListArgs {
  conditions?: Maybe<Array<Condition>>
  extraConditions?: Maybe<Array<Condition>>
  limit?: Maybe<Scalars['Int']>
  start?: Maybe<Scalars['Int']>
  count?: Maybe<Scalars['Boolean']>
  groupBy?: Maybe<Scalars['String']>
  replyWithCount?: Maybe<Scalars['Boolean']>
  sortBy?: Maybe<Scalars['String']>
  sortDirection?: Maybe<SortDirectionValidValues>
  fields?: Maybe<Array<Scalars['String']>>
  type?: Maybe<Scalars['String']>
}

export interface QuerygetCreateTicketProcessAvailableTicketTypesArgs {
  projectUuid: Scalars['String']
}

export interface QuerygetCreateTicketProcessProjectAdminArgs {
  projectUuid: Scalars['String']
}

export interface QueryqueryTicketListArgs {
  conditions?: Maybe<Array<Condition>>
  extraConditions?: Maybe<Array<Condition>>
  limit?: Maybe<Scalars['Int']>
  start?: Maybe<Scalars['Int']>
  count?: Maybe<Scalars['Boolean']>
  groupBy?: Maybe<Scalars['String']>
  replyWithCount?: Maybe<Scalars['Boolean']>
  sortBy?: Maybe<Scalars['String']>
  sortDirection?: Maybe<SortDirectionValidValues>
  fields?: Maybe<Array<Scalars['String']>>
  type?: Maybe<Scalars['String']>
  ticketQueryType?: Maybe<TicketQueryType>
}

export interface QuerygetAccountQuatoInfoArgs {
  accountUuid: Scalars['String']
}

export interface QuerypreconfigurationTemplateListArgs {
  conditions?: Maybe<Array<Condition>>
  extraConditions?: Maybe<Array<Condition>>
  limit?: Maybe<Scalars['Int']>
  start?: Maybe<Scalars['Int']>
  count?: Maybe<Scalars['Boolean']>
  groupBy?: Maybe<Scalars['String']>
  replyWithCount?: Maybe<Scalars['Boolean']>
  sortBy?: Maybe<Scalars['String']>
  sortDirection?: Maybe<SortDirectionValidValues>
  fields?: Maybe<Array<Scalars['String']>>
  type?: Maybe<Scalars['String']>
}

export interface QuerybaremetalInstanceListArgs {
  conditions?: Maybe<Array<Condition>>
  extraConditions?: Maybe<Array<Condition>>
  limit?: Maybe<Scalars['Int']>
  start?: Maybe<Scalars['Int']>
  count?: Maybe<Scalars['Boolean']>
  groupBy?: Maybe<Scalars['String']>
  replyWithCount?: Maybe<Scalars['Boolean']>
  sortBy?: Maybe<Scalars['String']>
  sortDirection?: Maybe<SortDirectionValidValues>
  fields?: Maybe<Array<Scalars['String']>>
  type?: Maybe<Scalars['String']>
}

export interface QuerybaremetalInstanceArgs {
  uuid: Scalars['String']
}

export interface QuerygetBaremetalInstanceConfigSummaryArgs {
  chassisUuid: Scalars['String']
  uuid: Scalars['String']
}

export interface QuerybaremetalNicListArgs {
  conditions?: Maybe<Array<Condition>>
  extraConditions?: Maybe<Array<Condition>>
  limit?: Maybe<Scalars['Int']>
  start?: Maybe<Scalars['Int']>
  count?: Maybe<Scalars['Boolean']>
  groupBy?: Maybe<Scalars['String']>
  replyWithCount?: Maybe<Scalars['Boolean']>
  sortBy?: Maybe<Scalars['String']>
  sortDirection?: Maybe<SortDirectionValidValues>
  fields?: Maybe<Array<Scalars['String']>>
  type?: Maybe<Scalars['String']>
}

export interface QuerybaremetalDiskListArgs {
  conditions?: Maybe<Array<Condition>>
  extraConditions?: Maybe<Array<Condition>>
  limit?: Maybe<Scalars['Int']>
  start?: Maybe<Scalars['Int']>
  count?: Maybe<Scalars['Boolean']>
  groupBy?: Maybe<Scalars['String']>
  replyWithCount?: Maybe<Scalars['Boolean']>
  sortBy?: Maybe<Scalars['String']>
  sortDirection?: Maybe<SortDirectionValidValues>
  fields?: Maybe<Array<Scalars['String']>>
  type?: Maybe<Scalars['String']>
}

export interface QuerybaremetalPxeServerListArgs {
  conditions?: Maybe<Array<Condition>>
  extraConditions?: Maybe<Array<Condition>>
  limit?: Maybe<Scalars['Int']>
  start?: Maybe<Scalars['Int']>
  count?: Maybe<Scalars['Boolean']>
  groupBy?: Maybe<Scalars['String']>
  replyWithCount?: Maybe<Scalars['Boolean']>
  sortBy?: Maybe<Scalars['String']>
  sortDirection?: Maybe<SortDirectionValidValues>
  fields?: Maybe<Array<Scalars['String']>>
  type?: Maybe<BaremetalPxeServerQueryType>
}

export interface QuerybaremetalChassisListArgs {
  conditions?: Maybe<Array<Condition>>
  extraConditions?: Maybe<Array<Condition>>
  limit?: Maybe<Scalars['Int']>
  start?: Maybe<Scalars['Int']>
  count?: Maybe<Scalars['Boolean']>
  groupBy?: Maybe<Scalars['String']>
  replyWithCount?: Maybe<Scalars['Boolean']>
  sortBy?: Maybe<Scalars['String']>
  sortDirection?: Maybe<SortDirectionValidValues>
  fields?: Maybe<Array<Scalars['String']>>
  type?: Maybe<Scalars['String']>
}

export interface QuerybareMetal2ChassisOfferingListArgs {
  conditions?: Maybe<Array<Condition>>
  extraConditions?: Maybe<Array<Condition>>
  limit?: Maybe<Scalars['Int']>
  start?: Maybe<Scalars['Int']>
  count?: Maybe<Scalars['Boolean']>
  groupBy?: Maybe<Scalars['String']>
  replyWithCount?: Maybe<Scalars['Boolean']>
  sortBy?: Maybe<Scalars['String']>
  sortDirection?: Maybe<SortDirectionValidValues>
  fields?: Maybe<Array<Scalars['String']>>
  type?: Maybe<BareMetal2ChassisOfferingQueryType>
}

export interface QuerybareMetal2ChassisListArgs {
  conditions?: Maybe<Array<Condition>>
  extraConditions?: Maybe<Array<Condition>>
  limit?: Maybe<Scalars['Int']>
  start?: Maybe<Scalars['Int']>
  count?: Maybe<Scalars['Boolean']>
  groupBy?: Maybe<Scalars['String']>
  replyWithCount?: Maybe<Scalars['Boolean']>
  sortBy?: Maybe<Scalars['String']>
  sortDirection?: Maybe<SortDirectionValidValues>
  fields?: Maybe<Array<Scalars['String']>>
  type?: Maybe<BareMetal2ChassisQueryType>
}

export interface QuerybareMetal2ChassisNicListArgs {
  conditions?: Maybe<Array<Condition>>
  extraConditions?: Maybe<Array<Condition>>
  limit?: Maybe<Scalars['Int']>
  start?: Maybe<Scalars['Int']>
  count?: Maybe<Scalars['Boolean']>
  groupBy?: Maybe<Scalars['String']>
  replyWithCount?: Maybe<Scalars['Boolean']>
  sortBy?: Maybe<Scalars['String']>
  sortDirection?: Maybe<SortDirectionValidValues>
  fields?: Maybe<Array<Scalars['String']>>
  type?: Maybe<BareMetal2ChassisQueryType>
}

export interface QuerybareMetal2GatewayListArgs {
  conditions?: Maybe<Array<Condition>>
  extraConditions?: Maybe<Array<Condition>>
  limit?: Maybe<Scalars['Int']>
  start?: Maybe<Scalars['Int']>
  count?: Maybe<Scalars['Boolean']>
  groupBy?: Maybe<Scalars['String']>
  replyWithCount?: Maybe<Scalars['Boolean']>
  sortBy?: Maybe<Scalars['String']>
  sortDirection?: Maybe<SortDirectionValidValues>
  fields?: Maybe<Array<Scalars['String']>>
  type?: Maybe<BareMetal2GatewayQueryType>
}

export interface QuerybareMetal2InstanceListArgs {
  conditions?: Maybe<Array<Condition>>
  extraConditions?: Maybe<Array<Condition>>
  limit?: Maybe<Scalars['Int']>
  start?: Maybe<Scalars['Int']>
  count?: Maybe<Scalars['Boolean']>
  groupBy?: Maybe<Scalars['String']>
  replyWithCount?: Maybe<Scalars['Boolean']>
  sortBy?: Maybe<Scalars['String']>
  sortDirection?: Maybe<SortDirectionValidValues>
  fields?: Maybe<Array<Scalars['String']>>
  type?: Maybe<BareMetal2InstanceQueryType>
}

export interface QuerybareMetal2InstanceArgs {
  uuid: Scalars['String']
}

export interface QuerybareMetal2InstanceNicListArgs {
  conditions?: Maybe<Array<Condition>>
  extraConditions?: Maybe<Array<Condition>>
  limit?: Maybe<Scalars['Int']>
  start?: Maybe<Scalars['Int']>
  count?: Maybe<Scalars['Boolean']>
  groupBy?: Maybe<Scalars['String']>
  replyWithCount?: Maybe<Scalars['Boolean']>
  sortBy?: Maybe<Scalars['String']>
  sortDirection?: Maybe<SortDirectionValidValues>
  fields?: Maybe<Array<Scalars['String']>>
  type?: Maybe<BareMetal2InstanceQueryType>
}

export interface Queryv2vConversionHostListArgs {
  conditions?: Maybe<Array<Condition>>
  extraConditions?: Maybe<Array<Condition>>
  limit?: Maybe<Scalars['Int']>
  start?: Maybe<Scalars['Int']>
  count?: Maybe<Scalars['Boolean']>
  groupBy?: Maybe<Scalars['String']>
  replyWithCount?: Maybe<Scalars['Boolean']>
  sortBy?: Maybe<Scalars['String']>
  sortDirection?: Maybe<SortDirectionValidValues>
  fields?: Maybe<Array<Scalars['String']>>
  type?: Maybe<Scalars['String']>
}

export interface Queryv2vConversionHostSystemTagsListArgs {
  conditions?: Maybe<Array<Condition>>
  extraConditions?: Maybe<Array<Condition>>
  limit?: Maybe<Scalars['Int']>
  start?: Maybe<Scalars['Int']>
  count?: Maybe<Scalars['Boolean']>
  groupBy?: Maybe<Scalars['String']>
  replyWithCount?: Maybe<Scalars['Boolean']>
  sortBy?: Maybe<Scalars['String']>
  sortDirection?: Maybe<SortDirectionValidValues>
  fields?: Maybe<Array<Scalars['String']>>
  type?: Maybe<Scalars['String']>
}

export interface Queryv2vConversionHostMetricDataArgs {
  startTime: Scalars['Float']
  endTime: Scalars['Float']
  period: Scalars['Float']
  uuid: Scalars['String']
  metricNames: Array<Scalars['String']>
}

export interface Queryv2vConversionHostCpuMemoryCapacityArgs {
  hostUuid: Scalars['String']
}

export interface QueryticketAssignmentFiledListArgs {
  conditions?: Maybe<Array<Condition>>
  extraConditions?: Maybe<Array<Condition>>
  limit?: Maybe<Scalars['Int']>
  start?: Maybe<Scalars['Int']>
  count?: Maybe<Scalars['Boolean']>
  groupBy?: Maybe<Scalars['String']>
  replyWithCount?: Maybe<Scalars['Boolean']>
  sortBy?: Maybe<Scalars['String']>
  sortDirection?: Maybe<SortDirectionValidValues>
  fields?: Maybe<Array<Scalars['String']>>
  type?: Maybe<Scalars['String']>
}

export interface QueryticketAssignmentFiledHistoryDetailArgs {
  conditions?: Maybe<Array<Condition>>
  extraConditions?: Maybe<Array<Condition>>
  limit?: Maybe<Scalars['Int']>
  start?: Maybe<Scalars['Int']>
  count?: Maybe<Scalars['Boolean']>
  groupBy?: Maybe<Scalars['String']>
  replyWithCount?: Maybe<Scalars['Boolean']>
  sortBy?: Maybe<Scalars['String']>
  sortDirection?: Maybe<SortDirectionValidValues>
  fields?: Maybe<Array<Scalars['String']>>
  type?: Maybe<Scalars['String']>
}

export interface QueryschedulerJobGroupListArgs {
  conditions?: Maybe<Array<Condition>>
  extraConditions?: Maybe<Array<Condition>>
  limit?: Maybe<Scalars['Int']>
  start?: Maybe<Scalars['Int']>
  count?: Maybe<Scalars['Boolean']>
  groupBy?: Maybe<Scalars['String']>
  replyWithCount?: Maybe<Scalars['Boolean']>
  sortBy?: Maybe<Scalars['String']>
  sortDirection?: Maybe<SortDirectionValidValues>
  fields?: Maybe<Array<Scalars['String']>>
  type?: Maybe<SchedulerJobGroupQueryType>
}

export interface QuerylocalBackupStorageListArgs {
  conditions?: Maybe<Array<Condition>>
  extraConditions?: Maybe<Array<Condition>>
  limit?: Maybe<Scalars['Int']>
  start?: Maybe<Scalars['Int']>
  count?: Maybe<Scalars['Boolean']>
  groupBy?: Maybe<Scalars['String']>
  replyWithCount?: Maybe<Scalars['Boolean']>
  sortBy?: Maybe<Scalars['String']>
  sortDirection?: Maybe<SortDirectionValidValues>
  fields?: Maybe<Array<Scalars['String']>>
  type?: Maybe<Scalars['String']>
}

export interface QuerylocalBackupStorageSystemTagsListArgs {
  conditions?: Maybe<Array<Condition>>
  extraConditions?: Maybe<Array<Condition>>
  limit?: Maybe<Scalars['Int']>
  start?: Maybe<Scalars['Int']>
  count?: Maybe<Scalars['Boolean']>
  groupBy?: Maybe<Scalars['String']>
  replyWithCount?: Maybe<Scalars['Boolean']>
  sortBy?: Maybe<Scalars['String']>
  sortDirection?: Maybe<SortDirectionValidValues>
  fields?: Maybe<Array<Scalars['String']>>
  type?: Maybe<Scalars['String']>
}

export interface QueryscanlocalBackupStorageArgs {
  zoneUuid: Scalars['String']
  backupStorageUuid: Scalars['String']
}

export interface QueryremoteBackupStorageListArgs {
  conditions?: Maybe<Array<Condition>>
  extraConditions?: Maybe<Array<Condition>>
  limit?: Maybe<Scalars['Int']>
  start?: Maybe<Scalars['Int']>
  count?: Maybe<Scalars['Boolean']>
  groupBy?: Maybe<Scalars['String']>
  replyWithCount?: Maybe<Scalars['Boolean']>
  sortBy?: Maybe<Scalars['String']>
  sortDirection?: Maybe<SortDirectionValidValues>
  fields?: Maybe<Array<Scalars['String']>>
  type?: Maybe<Scalars['String']>
}

export interface QueryremoteBackupStorageSystemTagsListArgs {
  conditions?: Maybe<Array<Condition>>
  extraConditions?: Maybe<Array<Condition>>
  limit?: Maybe<Scalars['Int']>
  start?: Maybe<Scalars['Int']>
  count?: Maybe<Scalars['Boolean']>
  groupBy?: Maybe<Scalars['String']>
  replyWithCount?: Maybe<Scalars['Boolean']>
  sortBy?: Maybe<Scalars['String']>
  sortDirection?: Maybe<SortDirectionValidValues>
  fields?: Maybe<Array<Scalars['String']>>
  type?: Maybe<Scalars['String']>
}

export interface Queryv2vMigrationListArgs {
  conditions?: Maybe<Array<Condition>>
  extraConditions?: Maybe<Array<Condition>>
  limit?: Maybe<Scalars['Int']>
  start?: Maybe<Scalars['Int']>
  count?: Maybe<Scalars['Boolean']>
  groupBy?: Maybe<Scalars['String']>
  replyWithCount?: Maybe<Scalars['Boolean']>
  sortBy?: Maybe<Scalars['String']>
  sortDirection?: Maybe<SortDirectionValidValues>
  fields?: Maybe<Array<Scalars['String']>>
  type?: Maybe<Scalars['String']>
}

export interface Queryv2vMigrationArgs {
  uuid: Scalars['String']
}

export interface QuerylistVMsFromKVMHostArgs {
  conditions?: Maybe<Array<Condition>>
  extraConditions?: Maybe<Array<Condition>>
  limit?: Maybe<Scalars['Int']>
  start?: Maybe<Scalars['Int']>
  count?: Maybe<Scalars['Boolean']>
  groupBy?: Maybe<Scalars['String']>
  replyWithCount?: Maybe<Scalars['Boolean']>
  sortBy?: Maybe<Scalars['String']>
  sortDirection?: Maybe<SortDirectionValidValues>
  fields?: Maybe<Array<Scalars['String']>>
  type?: Maybe<Scalars['String']>
}

export interface QueryschedulerJobListArgs {
  conditions?: Maybe<Array<Condition>>
  extraConditions?: Maybe<Array<Condition>>
  limit?: Maybe<Scalars['Int']>
  start?: Maybe<Scalars['Int']>
  count?: Maybe<Scalars['Boolean']>
  groupBy?: Maybe<Scalars['String']>
  replyWithCount?: Maybe<Scalars['Boolean']>
  sortBy?: Maybe<Scalars['String']>
  sortDirection?: Maybe<SortDirectionValidValues>
  fields?: Maybe<Array<Scalars['String']>>
  type?: Maybe<SchedulerJobQueryType>
}

export interface QueryschedulerTriggerListArgs {
  conditions?: Maybe<Array<Condition>>
  extraConditions?: Maybe<Array<Condition>>
  limit?: Maybe<Scalars['Int']>
  start?: Maybe<Scalars['Int']>
  count?: Maybe<Scalars['Boolean']>
  groupBy?: Maybe<Scalars['String']>
  replyWithCount?: Maybe<Scalars['Boolean']>
  sortBy?: Maybe<Scalars['String']>
  sortDirection?: Maybe<SortDirectionValidValues>
  fields?: Maybe<Array<Scalars['String']>>
  type?: Maybe<Scalars['String']>
}

export interface QueryschedulerAvaliableTriggerListArgs {
  conditions?: Maybe<Array<Condition>>
  extraConditions?: Maybe<Array<Condition>>
  limit?: Maybe<Scalars['Int']>
  start?: Maybe<Scalars['Int']>
  count?: Maybe<Scalars['Boolean']>
  groupBy?: Maybe<Scalars['String']>
  replyWithCount?: Maybe<Scalars['Boolean']>
  sortBy?: Maybe<Scalars['String']>
  sortDirection?: Maybe<SortDirectionValidValues>
  fields?: Maybe<Array<Scalars['String']>>
  type?: Maybe<Scalars['String']>
}

export interface QueryschedulerDoneTriggerListArgs {
  conditions?: Maybe<Array<Condition>>
  extraConditions?: Maybe<Array<Condition>>
  limit?: Maybe<Scalars['Int']>
  start?: Maybe<Scalars['Int']>
  count?: Maybe<Scalars['Boolean']>
  groupBy?: Maybe<Scalars['String']>
  replyWithCount?: Maybe<Scalars['Boolean']>
  sortBy?: Maybe<Scalars['String']>
  sortDirection?: Maybe<SortDirectionValidValues>
  fields?: Maybe<Array<Scalars['String']>>
  type?: Maybe<Scalars['String']>
}

export interface QueryschedulerJobHistoryListArgs {
  conditions?: Maybe<Array<Condition>>
  extraConditions?: Maybe<Array<Condition>>
  limit?: Maybe<Scalars['Int']>
  start?: Maybe<Scalars['Int']>
  count?: Maybe<Scalars['Boolean']>
  groupBy?: Maybe<Scalars['String']>
  replyWithCount?: Maybe<Scalars['Boolean']>
  sortBy?: Maybe<Scalars['String']>
  sortDirection?: Maybe<SortDirectionValidValues>
  fields?: Maybe<Array<Scalars['String']>>
  type?: Maybe<SchedulerJobHistoryQueryType>
}

export interface QueryschedulerJobHistoryGroupByFireInstanceIdListArgs {
  conditions?: Maybe<Array<Condition>>
  extraConditions?: Maybe<Array<Condition>>
  limit?: Maybe<Scalars['Int']>
  start?: Maybe<Scalars['Int']>
  count?: Maybe<Scalars['Boolean']>
  groupBy?: Maybe<Scalars['String']>
  replyWithCount?: Maybe<Scalars['Boolean']>
  sortBy?: Maybe<Scalars['String']>
  sortDirection?: Maybe<SortDirectionValidValues>
  fields?: Maybe<Array<Scalars['String']>>
  type?: Maybe<SchedulerJobHistoryGroupByFireInstanceIdQueryType>
}

export interface QuerycertificateListArgs {
  conditions?: Maybe<Array<Condition>>
  extraConditions?: Maybe<Array<Condition>>
  limit?: Maybe<Scalars['Int']>
  start?: Maybe<Scalars['Int']>
  count?: Maybe<Scalars['Boolean']>
  groupBy?: Maybe<Scalars['String']>
  replyWithCount?: Maybe<Scalars['Boolean']>
  sortBy?: Maybe<Scalars['String']>
  sortDirection?: Maybe<SortDirectionValidValues>
  fields?: Maybe<Array<Scalars['String']>>
  type?: Maybe<Scalars['String']>
}

export interface QueryconsoleProxylListArgs {
  conditions?: Maybe<Array<Condition>>
  extraConditions?: Maybe<Array<Condition>>
  limit?: Maybe<Scalars['Int']>
  start?: Maybe<Scalars['Int']>
  count?: Maybe<Scalars['Boolean']>
  groupBy?: Maybe<Scalars['String']>
  replyWithCount?: Maybe<Scalars['Boolean']>
  sortBy?: Maybe<Scalars['String']>
  sortDirection?: Maybe<SortDirectionValidValues>
  fields?: Maybe<Array<Scalars['String']>>
  type?: Maybe<Scalars['String']>
}

export interface QueryqueryThirdpartyListArgs {
  conditions?: Maybe<Array<Condition>>
  extraConditions?: Maybe<Array<Condition>>
  limit?: Maybe<Scalars['Int']>
  start?: Maybe<Scalars['Int']>
  count?: Maybe<Scalars['Boolean']>
  groupBy?: Maybe<Scalars['String']>
  replyWithCount?: Maybe<Scalars['Boolean']>
  sortBy?: Maybe<Scalars['String']>
  sortDirection?: Maybe<SortDirectionValidValues>
  fields?: Maybe<Array<Scalars['String']>>
  type?: Maybe<Scalars['String']>
}

export interface QueryaccessKeyListArgs {
  conditions?: Maybe<Array<Condition>>
  extraConditions?: Maybe<Array<Condition>>
  limit?: Maybe<Scalars['Int']>
  start?: Maybe<Scalars['Int']>
  count?: Maybe<Scalars['Boolean']>
  groupBy?: Maybe<Scalars['String']>
  replyWithCount?: Maybe<Scalars['Boolean']>
  sortBy?: Maybe<Scalars['String']>
  sortDirection?: Maybe<SortDirectionValidValues>
  fields?: Maybe<Array<Scalars['String']>>
  type?: Maybe<Scalars['String']>
}

export interface QueryoperationLogListArgs {
  conditions?: Maybe<Array<Condition>>
  extraConditions?: Maybe<Array<Condition>>
  limit?: Maybe<Scalars['Int']>
  start?: Maybe<Scalars['Int']>
  count?: Maybe<Scalars['Boolean']>
  groupBy?: Maybe<Scalars['String']>
  replyWithCount?: Maybe<Scalars['Boolean']>
  sortBy?: Maybe<Scalars['String']>
  sortDirection?: Maybe<SortDirectionValidValues>
  fields?: Maybe<Array<Scalars['String']>>
  type?: Maybe<Scalars['String']>
}

export interface QueryoperationLongjobListArgs {
  conditions?: Maybe<Array<Condition>>
  extraConditions?: Maybe<Array<Condition>>
  limit?: Maybe<Scalars['Int']>
  start?: Maybe<Scalars['Int']>
  count?: Maybe<Scalars['Boolean']>
  groupBy?: Maybe<Scalars['String']>
  replyWithCount?: Maybe<Scalars['Boolean']>
  sortBy?: Maybe<Scalars['String']>
  sortDirection?: Maybe<SortDirectionValidValues>
  fields?: Maybe<Array<Scalars['String']>>
  type?: Maybe<Scalars['String']>
}

export interface QueryemailServerSettingListArgs {
  conditions?: Maybe<Array<Condition>>
  extraConditions?: Maybe<Array<Condition>>
  limit?: Maybe<Scalars['Int']>
  start?: Maybe<Scalars['Int']>
  count?: Maybe<Scalars['Boolean']>
  groupBy?: Maybe<Scalars['String']>
  replyWithCount?: Maybe<Scalars['Boolean']>
  sortBy?: Maybe<Scalars['String']>
  sortDirection?: Maybe<SortDirectionValidValues>
  fields?: Maybe<Array<Scalars['String']>>
  type?: Maybe<Scalars['String']>
}

export interface QueryemailServerSettingArgs {
  uuid: Scalars['String']
}

export interface QueryipblackwhiteListArgs {
  conditions?: Maybe<Array<Condition>>
  extraConditions?: Maybe<Array<Condition>>
  limit?: Maybe<Scalars['Int']>
  start?: Maybe<Scalars['Int']>
  count?: Maybe<Scalars['Boolean']>
  groupBy?: Maybe<Scalars['String']>
  replyWithCount?: Maybe<Scalars['Boolean']>
  sortBy?: Maybe<Scalars['String']>
  sortDirection?: Maybe<SortDirectionValidValues>
  fields?: Maybe<Array<Scalars['String']>>
  type?: Maybe<Scalars['String']>
}

export interface QuerybillingsPriceListArgs {
  conditions?: Maybe<Array<Condition>>
  extraConditions?: Maybe<Array<Condition>>
  limit?: Maybe<Scalars['Int']>
  start?: Maybe<Scalars['Int']>
  count?: Maybe<Scalars['Boolean']>
  groupBy?: Maybe<Scalars['String']>
  replyWithCount?: Maybe<Scalars['Boolean']>
  sortBy?: Maybe<Scalars['String']>
  sortDirection?: Maybe<SortDirectionValidValues>
  fields?: Maybe<Array<Scalars['String']>>
  type?: Maybe<Scalars['String']>
}

export interface QuerybillingsPriceTableListArgs {
  conditions?: Maybe<Array<Condition>>
  extraConditions?: Maybe<Array<Condition>>
  limit?: Maybe<Scalars['Int']>
  start?: Maybe<Scalars['Int']>
  count?: Maybe<Scalars['Boolean']>
  groupBy?: Maybe<Scalars['String']>
  replyWithCount?: Maybe<Scalars['Boolean']>
  sortBy?: Maybe<Scalars['String']>
  sortDirection?: Maybe<SortDirectionValidValues>
  fields?: Maybe<Array<Scalars['String']>>
  type?: Maybe<Scalars['String']>
}

export interface QueryvalidatBillingsPriceUserConfigArgs {
  config: Scalars['String']
}

export interface QueryaccountBillingsPriceTableRefArgs {
  uuid: Scalars['String']
}

export interface QuerybillingsPricesSummaryArgs {
  uuid: Scalars['String']
}

export interface QuerybillingsPricesBindProjectAndAccountSummaryArgs {
  uuid: Scalars['String']
}

export interface QueryaccountListArgs {
  conditions?: Maybe<Array<Condition>>
  extraConditions?: Maybe<Array<Condition>>
  limit?: Maybe<Scalars['Int']>
  start?: Maybe<Scalars['Int']>
  count?: Maybe<Scalars['Boolean']>
  groupBy?: Maybe<Scalars['String']>
  replyWithCount?: Maybe<Scalars['Boolean']>
  sortBy?: Maybe<Scalars['String']>
  sortDirection?: Maybe<SortDirectionValidValues>
  fields?: Maybe<Array<Scalars['String']>>
  type?: Maybe<AccountQueryType>
}

export interface QueryaccountNumArgs {
  conditions?: Maybe<Array<Condition>>
  extraConditions?: Maybe<Array<Condition>>
  limit?: Maybe<Scalars['Int']>
  start?: Maybe<Scalars['Int']>
  count?: Maybe<Scalars['Boolean']>
  groupBy?: Maybe<Scalars['String']>
  replyWithCount?: Maybe<Scalars['Boolean']>
  sortBy?: Maybe<Scalars['String']>
  sortDirection?: Maybe<SortDirectionValidValues>
  fields?: Maybe<Array<Scalars['String']>>
  type?: Maybe<AccountQueryType>
}

export interface QuerybillingsArgs {
  conditions?: Maybe<Array<Condition>>
  extraConditions?: Maybe<Array<Condition>>
  limit?: Maybe<Scalars['Int']>
  start?: Maybe<Scalars['Int']>
  count?: Maybe<Scalars['Boolean']>
  groupBy?: Maybe<Scalars['String']>
  replyWithCount?: Maybe<Scalars['Boolean']>
  sortBy?: Maybe<Scalars['String']>
  sortDirection?: Maybe<SortDirectionValidValues>
  fields?: Maybe<Array<Scalars['String']>>
  type?: Maybe<BillingTableType>
}

export interface QuerybillingResourcesArgs {
  conditions?: Maybe<Array<Condition>>
  extraConditions?: Maybe<Array<Condition>>
  limit?: Maybe<Scalars['Int']>
  start?: Maybe<Scalars['Int']>
  count?: Maybe<Scalars['Boolean']>
  groupBy?: Maybe<Scalars['String']>
  replyWithCount?: Maybe<Scalars['Boolean']>
  sortBy?: Maybe<Scalars['String']>
  sortDirection?: Maybe<SortDirectionValidValues>
  fields?: Maybe<Array<Scalars['String']>>
  type?: Maybe<BillingTableResourceType>
}

export interface QuerybillingForOrganizationSummaryArgs {
  conditions?: Maybe<Array<Condition>>
  extraConditions?: Maybe<Array<Condition>>
  limit?: Maybe<Scalars['Int']>
  start?: Maybe<Scalars['Int']>
  count?: Maybe<Scalars['Boolean']>
  groupBy?: Maybe<Scalars['String']>
  replyWithCount?: Maybe<Scalars['Boolean']>
  sortBy?: Maybe<Scalars['String']>
  sortDirection?: Maybe<SortDirectionValidValues>
  fields?: Maybe<Array<Scalars['String']>>
  type?: Maybe<Scalars['String']>
}

export interface QuerybillingResourcesDetailArgs {
  conditions?: Maybe<Array<Condition>>
  extraConditions?: Maybe<Array<Condition>>
  limit?: Maybe<Scalars['Int']>
  start?: Maybe<Scalars['Int']>
  count?: Maybe<Scalars['Boolean']>
  groupBy?: Maybe<Scalars['String']>
  replyWithCount?: Maybe<Scalars['Boolean']>
  sortBy?: Maybe<Scalars['String']>
  sortDirection?: Maybe<SortDirectionValidValues>
  fields?: Maybe<Array<Scalars['String']>>
  type?: Maybe<BillingTableResourceType>
}

export interface QuerybillsDetailSummaryArgs {
  conditions?: Maybe<Array<Condition>>
  extraConditions?: Maybe<Array<Condition>>
  limit?: Maybe<Scalars['Int']>
  start?: Maybe<Scalars['Int']>
  count?: Maybe<Scalars['Boolean']>
  groupBy?: Maybe<Scalars['String']>
  replyWithCount?: Maybe<Scalars['Boolean']>
  sortBy?: Maybe<Scalars['String']>
  sortDirection?: Maybe<SortDirectionValidValues>
  fields?: Maybe<Array<Scalars['String']>>
  type?: Maybe<Scalars['String']>
}

export interface QueryresourceConfigListArgs {
  conditions?: Maybe<Array<Condition>>
  extraConditions?: Maybe<Array<Condition>>
  limit?: Maybe<Scalars['Int']>
  start?: Maybe<Scalars['Int']>
  count?: Maybe<Scalars['Boolean']>
  groupBy?: Maybe<Scalars['String']>
  replyWithCount?: Maybe<Scalars['Boolean']>
  sortBy?: Maybe<Scalars['String']>
  sortDirection?: Maybe<SortDirectionValidValues>
  fields?: Maybe<Array<Scalars['String']>>
  type?: Maybe<Scalars['String']>
}

export interface QueryglobalConfigArgs {
  name: Scalars['String']
  category: Scalars['String']
}

export interface QuerygetGlobalConfigArgs {
  name: Scalars['String']
  category: Scalars['String']
}

export interface QueryglobalConfigListArgs {
  conditions?: Maybe<Array<Condition>>
  extraConditions?: Maybe<Array<Condition>>
  limit?: Maybe<Scalars['Int']>
  start?: Maybe<Scalars['Int']>
  count?: Maybe<Scalars['Boolean']>
  groupBy?: Maybe<Scalars['String']>
  replyWithCount?: Maybe<Scalars['Boolean']>
  sortBy?: Maybe<Scalars['String']>
  sortDirection?: Maybe<SortDirectionValidValues>
  fields?: Maybe<Array<Scalars['String']>>
  type?: Maybe<GlobalConfigQueryType>
}

export interface QueryglobalConfigTemplateListArgs {
  conditions?: Maybe<Array<Condition>>
  extraConditions?: Maybe<Array<Condition>>
  limit?: Maybe<Scalars['Int']>
  start?: Maybe<Scalars['Int']>
  count?: Maybe<Scalars['Boolean']>
  groupBy?: Maybe<Scalars['String']>
  replyWithCount?: Maybe<Scalars['Boolean']>
  sortBy?: Maybe<Scalars['String']>
  sortDirection?: Maybe<SortDirectionValidValues>
  fields?: Maybe<Array<Scalars['String']>>
  type?: Maybe<Scalars['String']>
}

export interface QuerytemplateConfigListArgs {
  conditions?: Maybe<Array<Condition>>
  extraConditions?: Maybe<Array<Condition>>
  limit?: Maybe<Scalars['Int']>
  start?: Maybe<Scalars['Int']>
  count?: Maybe<Scalars['Boolean']>
  groupBy?: Maybe<Scalars['String']>
  replyWithCount?: Maybe<Scalars['Boolean']>
  sortBy?: Maybe<Scalars['String']>
  sortDirection?: Maybe<SortDirectionValidValues>
  fields?: Maybe<Array<Scalars['String']>>
  type?: Maybe<Scalars['String']>
}

export interface QueryportMirrorListArgs {
  conditions?: Maybe<Array<Condition>>
  extraConditions?: Maybe<Array<Condition>>
  limit?: Maybe<Scalars['Int']>
  start?: Maybe<Scalars['Int']>
  count?: Maybe<Scalars['Boolean']>
  groupBy?: Maybe<Scalars['String']>
  replyWithCount?: Maybe<Scalars['Boolean']>
  sortBy?: Maybe<Scalars['String']>
  sortDirection?: Maybe<SortDirectionValidValues>
  fields?: Maybe<Array<Scalars['String']>>
  type?: Maybe<Scalars['String']>
}

export interface QueryospfListArgs {
  conditions?: Maybe<Array<Condition>>
  extraConditions?: Maybe<Array<Condition>>
  limit?: Maybe<Scalars['Int']>
  start?: Maybe<Scalars['Int']>
  count?: Maybe<Scalars['Boolean']>
  groupBy?: Maybe<Scalars['String']>
  replyWithCount?: Maybe<Scalars['Boolean']>
  sortBy?: Maybe<Scalars['String']>
  sortDirection?: Maybe<SortDirectionValidValues>
  fields?: Maybe<Array<Scalars['String']>>
  type?: Maybe<Scalars['String']>
}

export interface QuerygetVpcListByOspfArgs {
  conditions?: Maybe<Array<Condition>>
  extraConditions?: Maybe<Array<Condition>>
  limit?: Maybe<Scalars['Int']>
  start?: Maybe<Scalars['Int']>
  count?: Maybe<Scalars['Boolean']>
  groupBy?: Maybe<Scalars['String']>
  replyWithCount?: Maybe<Scalars['Boolean']>
  sortBy?: Maybe<Scalars['String']>
  sortDirection?: Maybe<SortDirectionValidValues>
  fields?: Maybe<Array<Scalars['String']>>
  type?: Maybe<Scalars['String']>
}

export interface QuerygetOspfByVpcRouterArgs {
  conditions?: Maybe<Array<Condition>>
  extraConditions?: Maybe<Array<Condition>>
  limit?: Maybe<Scalars['Int']>
  start?: Maybe<Scalars['Int']>
  count?: Maybe<Scalars['Boolean']>
  groupBy?: Maybe<Scalars['String']>
  replyWithCount?: Maybe<Scalars['Boolean']>
  sortBy?: Maybe<Scalars['String']>
  sortDirection?: Maybe<SortDirectionValidValues>
  fields?: Maybe<Array<Scalars['String']>>
  type?: Maybe<Scalars['String']>
}

export interface QuerygetVRouterRouterIdArgs {
  vRouterUuid: Scalars['String']
}

export interface QuerygetVRouterOspfNeighborArgs {
  conditions?: Maybe<Array<Condition>>
  extraConditions?: Maybe<Array<Condition>>
  limit?: Maybe<Scalars['Int']>
  start?: Maybe<Scalars['Int']>
  count?: Maybe<Scalars['Boolean']>
  groupBy?: Maybe<Scalars['String']>
  replyWithCount?: Maybe<Scalars['Boolean']>
  sortBy?: Maybe<Scalars['String']>
  sortDirection?: Maybe<SortDirectionValidValues>
  fields?: Maybe<Array<Scalars['String']>>
  type?: Maybe<Scalars['String']>
}

export interface QueryipsecConnectionListArgs {
  conditions?: Maybe<Array<Condition>>
  extraConditions?: Maybe<Array<Condition>>
  limit?: Maybe<Scalars['Int']>
  start?: Maybe<Scalars['Int']>
  count?: Maybe<Scalars['Boolean']>
  groupBy?: Maybe<Scalars['String']>
  replyWithCount?: Maybe<Scalars['Boolean']>
  sortBy?: Maybe<Scalars['String']>
  sortDirection?: Maybe<SortDirectionValidValues>
  fields?: Maybe<Array<Scalars['String']>>
  type?: Maybe<Scalars['String']>
}

export interface QueryiPsecConnectionSummaryArgs {
  iPsecConnectionUuid: Scalars['String']
}

export interface QuerylocalCidrListArgs {
  conditions?: Maybe<Array<Condition>>
  extraConditions?: Maybe<Array<Condition>>
  limit?: Maybe<Scalars['Int']>
  start?: Maybe<Scalars['Int']>
  count?: Maybe<Scalars['Boolean']>
  groupBy?: Maybe<Scalars['String']>
  replyWithCount?: Maybe<Scalars['Boolean']>
  sortBy?: Maybe<Scalars['String']>
  sortDirection?: Maybe<SortDirectionValidValues>
  fields?: Maybe<Array<Scalars['String']>>
  type?: Maybe<Scalars['String']>
}

export interface QuerypeerCidrListArgs {
  conditions?: Maybe<Array<Condition>>
  extraConditions?: Maybe<Array<Condition>>
  limit?: Maybe<Scalars['Int']>
  start?: Maybe<Scalars['Int']>
  count?: Maybe<Scalars['Boolean']>
  groupBy?: Maybe<Scalars['String']>
  replyWithCount?: Maybe<Scalars['Boolean']>
  sortBy?: Maybe<Scalars['String']>
  sortDirection?: Maybe<SortDirectionValidValues>
  fields?: Maybe<Array<Scalars['String']>>
  type?: Maybe<Scalars['String']>
}

export interface QueryeipListArgs {
  conditions?: Maybe<Array<Condition>>
  extraConditions?: Maybe<Array<Condition>>
  limit?: Maybe<Scalars['Int']>
  start?: Maybe<Scalars['Int']>
  count?: Maybe<Scalars['Boolean']>
  groupBy?: Maybe<Scalars['String']>
  replyWithCount?: Maybe<Scalars['Boolean']>
  sortBy?: Maybe<Scalars['String']>
  sortDirection?: Maybe<SortDirectionValidValues>
  fields?: Maybe<Array<Scalars['String']>>
  type?: Maybe<EipQueryType>
}

export interface QueryloadBalancerListArgs {
  conditions?: Maybe<Array<Condition>>
  extraConditions?: Maybe<Array<Condition>>
  limit?: Maybe<Scalars['Int']>
  start?: Maybe<Scalars['Int']>
  count?: Maybe<Scalars['Boolean']>
  groupBy?: Maybe<Scalars['String']>
  replyWithCount?: Maybe<Scalars['Boolean']>
  sortBy?: Maybe<Scalars['String']>
  sortDirection?: Maybe<SortDirectionValidValues>
  fields?: Maybe<Array<Scalars['String']>>
  type?: Maybe<Scalars['String']>
}

export interface QueryserverGroupListArgs {
  conditions?: Maybe<Array<Condition>>
  extraConditions?: Maybe<Array<Condition>>
  limit?: Maybe<Scalars['Int']>
  start?: Maybe<Scalars['Int']>
  count?: Maybe<Scalars['Boolean']>
  groupBy?: Maybe<Scalars['String']>
  replyWithCount?: Maybe<Scalars['Boolean']>
  sortBy?: Maybe<Scalars['String']>
  sortDirection?: Maybe<SortDirectionValidValues>
  fields?: Maybe<Array<Scalars['String']>>
  type?: Maybe<ServerGroupQueryType>
}

export interface QuerybackendServerListArgs {
  conditions?: Maybe<Array<Condition>>
  extraConditions?: Maybe<Array<Condition>>
  limit?: Maybe<Scalars['Int']>
  start?: Maybe<Scalars['Int']>
  count?: Maybe<Scalars['Boolean']>
  groupBy?: Maybe<Scalars['String']>
  replyWithCount?: Maybe<Scalars['Boolean']>
  sortBy?: Maybe<Scalars['String']>
  sortDirection?: Maybe<SortDirectionValidValues>
  fields?: Maybe<Array<Scalars['String']>>
  type?: Maybe<Scalars['String']>
}

export interface QueryslbOfferingListArgs {
  conditions?: Maybe<Array<Condition>>
  extraConditions?: Maybe<Array<Condition>>
  limit?: Maybe<Scalars['Int']>
  start?: Maybe<Scalars['Int']>
  count?: Maybe<Scalars['Boolean']>
  groupBy?: Maybe<Scalars['String']>
  replyWithCount?: Maybe<Scalars['Boolean']>
  sortBy?: Maybe<Scalars['String']>
  sortDirection?: Maybe<SortDirectionValidValues>
  fields?: Maybe<Array<Scalars['String']>>
  type?: Maybe<SlbOfferingQueryType>
}

export interface QuerylistenerListArgs {
  conditions?: Maybe<Array<Condition>>
  extraConditions?: Maybe<Array<Condition>>
  limit?: Maybe<Scalars['Int']>
  start?: Maybe<Scalars['Int']>
  count?: Maybe<Scalars['Boolean']>
  groupBy?: Maybe<Scalars['String']>
  replyWithCount?: Maybe<Scalars['Boolean']>
  sortBy?: Maybe<Scalars['String']>
  sortDirection?: Maybe<SortDirectionValidValues>
  fields?: Maybe<Array<Scalars['String']>>
  type?: Maybe<Scalars['String']>
}

export interface QueryportMirrorSessionListArgs {
  conditions?: Maybe<Array<Condition>>
  extraConditions?: Maybe<Array<Condition>>
  limit?: Maybe<Scalars['Int']>
  start?: Maybe<Scalars['Int']>
  count?: Maybe<Scalars['Boolean']>
  groupBy?: Maybe<Scalars['String']>
  replyWithCount?: Maybe<Scalars['Boolean']>
  sortBy?: Maybe<Scalars['String']>
  sortDirection?: Maybe<SortDirectionValidValues>
  fields?: Maybe<Array<Scalars['String']>>
  type?: Maybe<Scalars['String']>
}

export interface QuerygetVmFromVMNicsArgs {
  conditions?: Maybe<Array<Condition>>
  extraConditions?: Maybe<Array<Condition>>
  limit?: Maybe<Scalars['Int']>
  start?: Maybe<Scalars['Int']>
  count?: Maybe<Scalars['Boolean']>
  groupBy?: Maybe<Scalars['String']>
  replyWithCount?: Maybe<Scalars['Boolean']>
  sortBy?: Maybe<Scalars['String']>
  sortDirection?: Maybe<SortDirectionValidValues>
  fields?: Maybe<Array<Scalars['String']>>
  type?: Maybe<Scalars['String']>
}

export interface QueryfireWallIpSetTemplateListArgs {
  conditions?: Maybe<Array<Condition>>
  extraConditions?: Maybe<Array<Condition>>
  limit?: Maybe<Scalars['Int']>
  start?: Maybe<Scalars['Int']>
  count?: Maybe<Scalars['Boolean']>
  groupBy?: Maybe<Scalars['String']>
  replyWithCount?: Maybe<Scalars['Boolean']>
  sortBy?: Maybe<Scalars['String']>
  sortDirection?: Maybe<SortDirectionValidValues>
  fields?: Maybe<Array<Scalars['String']>>
  type?: Maybe<Scalars['String']>
}

export interface QueryfirewallRuleSetListArgs {
  conditions?: Maybe<Array<Condition>>
  extraConditions?: Maybe<Array<Condition>>
  limit?: Maybe<Scalars['Int']>
  start?: Maybe<Scalars['Int']>
  count?: Maybe<Scalars['Boolean']>
  groupBy?: Maybe<Scalars['String']>
  replyWithCount?: Maybe<Scalars['Boolean']>
  sortBy?: Maybe<Scalars['String']>
  sortDirection?: Maybe<SortDirectionValidValues>
  fields?: Maybe<Array<Scalars['String']>>
  type?: Maybe<FirewallRuleSetQueryType>
}

export interface QueryfirewallRuleListArgs {
  conditions?: Maybe<Array<Condition>>
  extraConditions?: Maybe<Array<Condition>>
  limit?: Maybe<Scalars['Int']>
  start?: Maybe<Scalars['Int']>
  count?: Maybe<Scalars['Boolean']>
  groupBy?: Maybe<Scalars['String']>
  replyWithCount?: Maybe<Scalars['Boolean']>
  sortBy?: Maybe<Scalars['String']>
  sortDirection?: Maybe<SortDirectionValidValues>
  fields?: Maybe<Array<Scalars['String']>>
  type?: Maybe<FirewallRuleQueryType>
}

export interface QueryfireWallRuleTemplateListArgs {
  conditions?: Maybe<Array<Condition>>
  extraConditions?: Maybe<Array<Condition>>
  limit?: Maybe<Scalars['Int']>
  start?: Maybe<Scalars['Int']>
  count?: Maybe<Scalars['Boolean']>
  groupBy?: Maybe<Scalars['String']>
  replyWithCount?: Maybe<Scalars['Boolean']>
  sortBy?: Maybe<Scalars['String']>
  sortDirection?: Maybe<SortDirectionValidValues>
  fields?: Maybe<Array<Scalars['String']>>
  type?: Maybe<Scalars['String']>
}

export interface QueryfirewallRelateNetworkListArgs {
  conditions?: Maybe<Array<Condition>>
  extraConditions?: Maybe<Array<Condition>>
  limit?: Maybe<Scalars['Int']>
  start?: Maybe<Scalars['Int']>
  count?: Maybe<Scalars['Boolean']>
  groupBy?: Maybe<Scalars['String']>
  replyWithCount?: Maybe<Scalars['Boolean']>
  sortBy?: Maybe<Scalars['String']>
  sortDirection?: Maybe<SortDirectionValidValues>
  fields?: Maybe<Array<Scalars['String']>>
  type?: Maybe<Scalars['String']>
}

export interface QueryfireWallListArgs {
  conditions?: Maybe<Array<Condition>>
  extraConditions?: Maybe<Array<Condition>>
  limit?: Maybe<Scalars['Int']>
  start?: Maybe<Scalars['Int']>
  count?: Maybe<Scalars['Boolean']>
  groupBy?: Maybe<Scalars['String']>
  replyWithCount?: Maybe<Scalars['Boolean']>
  sortBy?: Maybe<Scalars['String']>
  sortDirection?: Maybe<SortDirectionValidValues>
  fields?: Maybe<Array<Scalars['String']>>
  type?: Maybe<Scalars['String']>
}

export interface QueryqueryFireWallByVpcUuidArgs {
  vpcUuid: Scalars['String']
}

export interface QueryusedIpListArgs {
  conditions?: Maybe<Array<Condition>>
  extraConditions?: Maybe<Array<Condition>>
  limit?: Maybe<Scalars['Int']>
  start?: Maybe<Scalars['Int']>
  count?: Maybe<Scalars['Boolean']>
  groupBy?: Maybe<Scalars['String']>
  replyWithCount?: Maybe<Scalars['Boolean']>
  sortBy?: Maybe<Scalars['String']>
  sortDirection?: Maybe<SortDirectionValidValues>
  fields?: Maybe<Array<Scalars['String']>>
  type?: Maybe<UsedIpQueryType>
}

export interface QuerysdnControllerListArgs {
  conditions?: Maybe<Array<Condition>>
  extraConditions?: Maybe<Array<Condition>>
  limit?: Maybe<Scalars['Int']>
  start?: Maybe<Scalars['Int']>
  count?: Maybe<Scalars['Boolean']>
  groupBy?: Maybe<Scalars['String']>
  replyWithCount?: Maybe<Scalars['Boolean']>
  sortBy?: Maybe<Scalars['String']>
  sortDirection?: Maybe<SortDirectionValidValues>
  fields?: Maybe<Array<Scalars['String']>>
  type?: Maybe<Scalars['String']>
}

export interface QueryvRouterRouteTableListArgs {
  conditions?: Maybe<Array<Condition>>
  extraConditions?: Maybe<Array<Condition>>
  limit?: Maybe<Scalars['Int']>
  start?: Maybe<Scalars['Int']>
  count?: Maybe<Scalars['Boolean']>
  groupBy?: Maybe<Scalars['String']>
  replyWithCount?: Maybe<Scalars['Boolean']>
  sortBy?: Maybe<Scalars['String']>
  sortDirection?: Maybe<SortDirectionValidValues>
  fields?: Maybe<Array<Scalars['String']>>
  type?: Maybe<Scalars['String']>
}

export interface QueryvRouterRouteEntryListArgs {
  conditions?: Maybe<Array<Condition>>
  extraConditions?: Maybe<Array<Condition>>
  limit?: Maybe<Scalars['Int']>
  start?: Maybe<Scalars['Int']>
  count?: Maybe<Scalars['Boolean']>
  groupBy?: Maybe<Scalars['String']>
  replyWithCount?: Maybe<Scalars['Boolean']>
  sortBy?: Maybe<Scalars['String']>
  sortDirection?: Maybe<SortDirectionValidValues>
  fields?: Maybe<Array<Scalars['String']>>
  type?: Maybe<Scalars['String']>
}

export interface QueryvxlanPoolListArgs {
  conditions?: Maybe<Array<Condition>>
  extraConditions?: Maybe<Array<Condition>>
  limit?: Maybe<Scalars['Int']>
  start?: Maybe<Scalars['Int']>
  count?: Maybe<Scalars['Boolean']>
  groupBy?: Maybe<Scalars['String']>
  replyWithCount?: Maybe<Scalars['Boolean']>
  sortBy?: Maybe<Scalars['String']>
  sortDirection?: Maybe<SortDirectionValidValues>
  fields?: Maybe<Array<Scalars['String']>>
  type?: Maybe<Scalars['String']>
}

export interface QueryvxlanPoolRelatedResourceArgs {
  uuid: Scalars['String']
}

export interface QueryvniRangeListArgs {
  conditions?: Maybe<Array<Condition>>
  extraConditions?: Maybe<Array<Condition>>
  limit?: Maybe<Scalars['Int']>
  start?: Maybe<Scalars['Int']>
  count?: Maybe<Scalars['Boolean']>
  groupBy?: Maybe<Scalars['String']>
  replyWithCount?: Maybe<Scalars['Boolean']>
  sortBy?: Maybe<Scalars['String']>
  sortDirection?: Maybe<SortDirectionValidValues>
  fields?: Maybe<Array<Scalars['String']>>
  type?: Maybe<Scalars['String']>
}

export interface QueryvxlanPoolAttachedVtepArgs {
  conditions?: Maybe<Array<Condition>>
  extraConditions?: Maybe<Array<Condition>>
  limit?: Maybe<Scalars['Int']>
  start?: Maybe<Scalars['Int']>
  count?: Maybe<Scalars['Boolean']>
  groupBy?: Maybe<Scalars['String']>
  replyWithCount?: Maybe<Scalars['Boolean']>
  sortBy?: Maybe<Scalars['String']>
  sortDirection?: Maybe<SortDirectionValidValues>
  fields?: Maybe<Array<Scalars['String']>>
  type?: Maybe<Scalars['String']>
}

export interface QuerymetricDataArgs {
  namespace: Scalars['String']
  startTime: Scalars['Float']
  endTime: Scalars['Float']
  period: Scalars['Float']
  metricName: Scalars['String']
  conditions?: Maybe<Array<Condition>>
}

export interface QuerymetricDataListArgs {
  namespace: Scalars['String']
  startTime: Scalars['Float']
  endTime: Scalars['Float']
  period: Scalars['Float']
  metricList: Array<MetricItemInput>
}

export interface QuerymetricLabelValueListArgs {
  namespace: Scalars['String']
  metricName: Scalars['String']
  labelName: Scalars['String']
  filterLabels?: Maybe<Scalars['String']>
  startTime?: Maybe<Scalars['Float']>
  endTime?: Maybe<Scalars['Float']>
}

export interface QueryidentityZoneListArgs {
  conditions?: Maybe<Array<Condition>>
  extraConditions?: Maybe<Array<Condition>>
  limit?: Maybe<Scalars['Int']>
  start?: Maybe<Scalars['Int']>
  count?: Maybe<Scalars['Boolean']>
  groupBy?: Maybe<Scalars['String']>
  replyWithCount?: Maybe<Scalars['Boolean']>
  sortBy?: Maybe<Scalars['String']>
  sortDirection?: Maybe<SortDirectionValidValues>
  fields?: Maybe<Array<Scalars['String']>>
  type?: Maybe<Scalars['String']>
}

export interface QueryqueryWidgetAlarmInfoArgs {
  conditions?: Maybe<Array<Scalars['String']>>
}

export interface QueryqueryWidgetUserInfoArgs {
  queryType?: Maybe<QueryWidgetUserInfoType>
  accountUuid?: Maybe<Scalars['String']>
  projectUuid?: Maybe<Scalars['String']>
  zoneUuid?: Maybe<Scalars['String']>
}

export interface QueryquerySummaryUserInfoArgs {
  type?: Maybe<QuerySummaryUserInfoType>
}

export interface QueryqueryWidgetResourceStateCountArgs {
  conditions?: Maybe<Array<Condition>>
  extraConditions?: Maybe<Array<Condition>>
  limit?: Maybe<Scalars['Int']>
  start?: Maybe<Scalars['Int']>
  count?: Maybe<Scalars['Boolean']>
  groupBy?: Maybe<Scalars['String']>
  replyWithCount?: Maybe<Scalars['Boolean']>
  sortBy?: Maybe<Scalars['String']>
  sortDirection?: Maybe<SortDirectionValidValues>
  fields?: Maybe<Array<Scalars['String']>>
  type?: Maybe<Scalars['String']>
  hypervisorType?: Maybe<Scalars['String']>
}

export interface QueryqueryWidgetMonitorTopArgs {
  zoneUuid?: Maybe<Scalars['String']>
  limit: Scalars['Int']
  namespace: Scalars['String']
  metricName: Scalars['String']
  hypervisorType?: Maybe<Scalars['String']>
}

export interface QueryqueryWidgetMonitorL3NetworkTopArgs {
  zoneUuid?: Maybe<Scalars['String']>
  limit: Scalars['Int']
  namespace: Scalars['String']
  metricName: Scalars['String']
  hypervisorType?: Maybe<Scalars['String']>
}

export interface QuerygetUsageStatisticsDataArgs {
  hypervisorType?: Maybe<Scalars['String']>
  currentIdentity?: Maybe<Scalars['String']>
  accountUuid?: Maybe<Scalars['String']>
  resourceKey?: Maybe<Scalars['String']>
  zoneUuid?: Maybe<Scalars['String']>
  zoneKey?: Maybe<Scalars['String']>
  offsetAheadOfCurrentTime: Scalars['Float']
  metricName?: Maybe<Scalars['String']>
  namespace?: Maybe<Scalars['String']>
  value: Scalars['String']
}

export interface QueryqueryWidgetMonitorTrendArgs {
  zoneUuid?: Maybe<Scalars['String']>
  offset: Scalars['Int']
  namespace: Scalars['String']
  metricNameList: Array<Scalars['String']>
  calculateType: Scalars['String']
  hypervisorType?: Maybe<Scalars['String']>
}

export interface QueryqueryWidgetQuotaUsageArgs {
  uuid?: Maybe<Scalars['String']>
}

export interface QueryqueryTagCloudInfoArgs {
  resourceType: Scalars['String']
  zoneUuid?: Maybe<Scalars['String']>
  hypervisorType?: Maybe<Scalars['String']>
}

export interface QuerysearchResourceArgs {
  keyword?: Maybe<Scalars['String']>
  zoneUuid?: Maybe<Scalars['String']>
}

export interface QueryzsKvArgs {
  key: Scalars['String']
}

export enum SortDirectionValidValues {
  asc = 'asc',
  desc = 'desc'
}

export enum VolumeQueryType {
  NORMAL = 'NORMAL',
  GET_VM_ATTACHABLE_DATA_VOLUME = 'GET_VM_ATTACHABLE_DATA_VOLUME',
  GET_VOLUME_BY_ACCOUNT = 'GET_VOLUME_BY_ACCOUNT',
  GET_VOLUME_BY_VMINSTANCE_UUID = 'GET_VOLUME_BY_VMINSTANCE_UUID',
  GetVolumeBySchedulerJobGroup = 'GetVolumeBySchedulerJobGroup',
  GetBackupJobAttachableVolume = 'GetBackupJobAttachableVolume',
  GetTagAttachableVolume = 'GetTagAttachableVolume'
}

export enum TagQueryType {
  NORMAL = 'NORMAL',
  GetTagWhenCreateResource = 'GetTagWhenCreateResource'
}

export type OwnerQueryResp = AccountOwnerQueryResp | ProjectOwnerQueryResp

export interface AccountOwnerQueryResp {
  list?: Maybe<Array<AccountOwner>>
  total?: Maybe<Scalars['Float']>
  type: OwnerQueryType
}

export enum OwnerQueryType {
  Account = 'Account',
  Project = 'Project',
  AccountCandidate = 'AccountCandidate',
  ProjectCandidate = 'ProjectCandidate',
  AccountOwner = 'AccountOwner',
  ProjectOwner = 'ProjectOwner',
  AllAccount = 'AllAccount',
  AllProject = 'AllProject'
}

export interface ProjectOwnerQueryResp {
  list?: Maybe<Array<ProjectOwner>>
  total?: Maybe<Scalars['Float']>
  type: OwnerQueryType
}

export enum OwnerSummaryType {
  Normal = 'Normal',
  Candidate = 'Candidate',
  ChangeOwner = 'ChangeOwner',
  All = 'All'
}

export interface QuerySharedResourceInput {
  accountUuid: Scalars['String']
  resourceTypeList: Array<Scalars['String']>
}

export enum PrimaryStorageQueryType {
  Normal = 'Normal',
  Zstack = 'Zstack',
  CreateVmForRootVolumeCandidate = 'CreateVmForRootVolumeCandidate',
  CreateVmForDataVolumeCandidate = 'CreateVmForDataVolumeCandidate',
  CreatevCenterVolumeVmCandidate = 'CreatevCenterVolumeVmCandidate',
  CreatevCenterVolumeImageVmCandidate = 'CreatevCenterVolumeImageVmCandidate',
  StorageMigrateVm = 'StorageMigrateVm',
  ClusterAttachablePs = 'ClusterAttachablePs',
  GetPrimaryStorageCandidatesForVolumeMigration = 'GetPrimaryStorageCandidatesForVolumeMigration',
  CreateDataVolumeByVolumeImageGetCandidatePrimaryStorage = 'CreateDataVolumeByVolumeImageGetCandidatePrimaryStorage',
  vCenterPrimaryStorageList = 'vCenterPrimaryStorageList',
  RecoverRootVolumeBackupCandidate = 'RecoverRootVolumeBackupCandidate',
  RecoverDataVolumeBackupCandidate = 'RecoverDataVolumeBackupCandidate'
}

export enum VmQueryType {
  Normal = 'Normal',
  vCenterVolumeCreateCandidate = 'vCenterVolumeCreateCandidate',
  vCenterVolumeAttachCandidate = 'vCenterVolumeAttachCandidate',
  eipAttachCandidate = 'eipAttachCandidate',
  vCenter = 'vCenter',
  GetVmBySchedulerJobGroup = 'GetVmBySchedulerJobGroup',
  GetBackupJobAttachableVM = 'GetBackupJobAttachableVM',
  GetVmForPortForwardingAttachVmNic = 'GetVmForPortForwardingAttachVmNic',
  GetAffinityGroupAttachableVM = 'GetAffinityGroupAttachableVM',
  GetDataVolumeAttachableVm = 'GetDataVolumeAttachableVm',
  GetVmCandidatesForAttachingScsiLun = 'GetVmCandidatesForAttachingScsiLun',
  GetVmCandidatesForDetachScsiLun = 'GetVmCandidatesForDetachScsiLun',
  GetVmCandidatesForPortMirror = 'GetVmCandidatesForPortMirror',
  Account = 'Account'
}

export enum GetMaxPCpuNumForVmCreateType {
  Zone = 'Zone',
  L2Network = 'L2Network'
}

export enum ClusterQueryType {
  Normal = 'Normal',
  CreateVmCandidate = 'CreateVmCandidate',
  ClusterAttachableL2Network = 'ClusterAttachableL2Network',
  PsAttachableCluster = 'PsAttachableCluster',
  ISCSIServerAttachableCluster = 'ISCSIServerAttachableCluster',
  GetClusterByISCSIServer = 'GetClusterByISCSIServer',
  vCenterClusterList = 'vCenterClusterList',
  vCenterNetworkAttachClusterList = 'vCenterNetworkAttachClusterList',
  BaremetalPxeserviceAttachableCluster = 'BaremetalPxeserviceAttachableCluster',
  BareMetal2GatewayCanChangedCluster = 'BareMetal2GatewayCanChangedCluster',
  BaremetalPxeserviceDetachableCluster = 'BaremetalPxeserviceDetachableCluster'
}

export enum ImageQueryType {
  NORMAL = 'NORMAL',
  GET_CANDIDATE_ISO_FOR_ATTACHING_VM = 'GET_CANDIDATE_ISO_FOR_ATTACHING_VM',
  GET_DETACHABLE_ISO_FROM_VM = 'GET_DETACHABLE_ISO_FROM_VM',
  GET_IMAGE_CANDIDATES_FOR_VM_TO_CHANGE = 'GET_IMAGE_CANDIDATES_FOR_VM_TO_CHANGE',
  GET_IMAGE_CANDIDATES_FOR_AUTO_SCALING_GROUP = 'GET_IMAGE_CANDIDATES_FOR_AUTO_SCALING_GROUP',
  SHARED_RESOURCE = 'SHARED_RESOURCE',
  MINE_RESOURCE = 'MINE_RESOURCE'
}

export enum BackupStorageQueryType {
  Normal = 'Normal',
  CreateImageCandidate = 'CreateImageCandidate',
  MigrateImageCandidate = 'MigrateImageCandidate',
  vCenterBackupStorageList = 'vCenterBackupStorageList'
}

export enum HostQueryType {
  Normal = 'Normal',
  CreateVmCandidate = 'CreateVmCandidate',
  StartingVmCandidate = 'StartingVmCandidate',
  GetVmMigrationCandidateHosts = 'GetVmMigrationCandidateHosts',
  LocalStorageGetVolumeMigratableHosts = 'LocalStorageGetVolumeMigratableHosts',
  vCenterHostList = 'vCenterHostList',
  RecoverRootVolumeBackupCandidate = 'RecoverRootVolumeBackupCandidate'
}

export enum AffinityGroupQueryType {
  Normal = 'Normal',
  GetCandidateAffinityGroupForVmAttaching = 'GetCandidateAffinityGroupForVmAttaching'
}

export interface QueryVmNicListInput {
  ruleUuid: Scalars['String']
}

export enum VmNicQueryType {
  GetPortForwardingAttachableVmNics = 'GetPortForwardingAttachableVmNics',
  CandidateVmNicForSecurityGroup = 'CandidateVmNicForSecurityGroup',
  CandidateVmNicForAttachEip = 'CandidateVmNicForAttachEip',
  VmNicInSecurityGroup = 'VmNicInSecurityGroup',
  PortMirrorCandidateVmNics = 'PortMirrorCandidateVmNics'
}

export enum L3NetworkQueryType {
  ZSTACK = 'ZSTACK',
  CREATE_VM_CANDIDATE = 'CREATE_VM_CANDIDATE',
  CREATE_VIP_CANDIDATE = 'CREATE_VIP_CANDIDATE',
  CREATE_EIP_CANDIDATE = 'CREATE_EIP_CANDIDATE',
  QueryVpcNetwork = 'QueryVpcNetwork',
  CreateIPsecCandidate = 'CreateIPsecCandidate',
  CreateAutoScalingGroupCandidate = 'CreateAutoScalingGroupCandidate',
  CreateVirtualRouterOfferingManageNetwork = 'CreateVirtualRouterOfferingManageNetwork',
  CreateVirtualRouterOfferingL3Network = 'CreateVirtualRouterOfferingL3Network',
  NetFlowAddVpcRouterCandidate = 'NetFlowAddVpcRouterCandidate',
  OspfAddVpcRouterCandidate = 'OspfAddVpcRouterCandidate',
  VpcFirewallBindL3Network = 'VpcFirewallBindL3Network',
  AttachVmNicCandiate = 'AttachVmNicCandiate',
  Shared_Resource_Flat_Network = 'Shared_Resource_Flat_Network',
  Shared_Resource_Public_Network = 'Shared_Resource_Public_Network',
  Shared_Resource_VPC_Network = 'Shared_Resource_VPC_Network',
  Mine_Resource_Network = 'Mine_Resource_Network',
  IpsecConnectionLocalCidrAttachCandidate = 'IpsecConnectionLocalCidrAttachCandidate',
  RecoverRootVolumeBackupCandidate = 'RecoverRootVolumeBackupCandidate',
  Shared_Resource_Network = 'Shared_Resource_Network'
}

export interface GetFreeIpInput {
  l3NetworkUuid?: Maybe<Scalars['String']>
  ipRangeUuid?: Maybe<Scalars['String']>
  ipVersion?: Maybe<Scalars['Int']>
}

export enum SnapshotQueryType {
  VM = 'VM',
  VOLUME = 'VOLUME'
}

export enum MdevDeviceSpecQueryType {
  Normal = 'Normal',
  GetMdevDeviceCandidatesForGenerate = 'GetMdevDeviceCandidatesForGenerate'
}

export enum VipNetworkQueryType {
  NORMAL = 'NORMAL',
  SYSTEM = 'SYSTEM',
  QUERY_VPCROUTER = 'QUERY_VPCROUTER',
  QUERY_PORTFORWARDING = 'QUERY_PORTFORWARDING',
  QUERY_EIP = 'QUERY_EIP',
  QUERY_LOADBALANCER = 'QUERY_LOADBALANCER',
  QUERY_IPSEC = 'QUERY_IPSEC',
  QUERY_NOT_ATTACH_EIP = 'QUERY_NOT_ATTACH_EIP'
}

export enum VpcQueryType {
  Normal = 'Normal',
  RouteTableVpc = 'RouteTableVpc',
  AttachedRouterTableVpc = 'AttachedRouterTableVpc',
  NetflowVpc = 'NetflowVpc',
  VpcFirewall = 'VpcFirewall',
  L2Network = 'L2Network',
  Account = 'Account'
}

export enum VpcHaQueryType {
  Normal = 'Normal',
  ByZone = 'ByZone'
}

export enum ScsiLunQueryType {
  Normal = 'Normal',
  GetScsiLunCandidatesForAttachingVm = 'GetScsiLunCandidatesForAttachingVm',
  GetSharedBlockCandidate = 'GetSharedBlockCandidate'
}

export enum UsbDeviceQueryType {
  Normal = 'Normal',
  AttachableUsb = 'AttachableUsb'
}

export interface GetUsbDeviceCandidatesForAttachingVmInput {
  vmInstanceUuid: Scalars['String']
  attachType?: Maybe<Scalars['String']>
  systemTags?: Maybe<Array<Scalars['String']>>
  userTags?: Maybe<Array<Scalars['String']>>
}

export enum L2NetworkQueryType {
  Normal = 'Normal',
  Admin = 'Admin',
  Mine = 'Mine',
  Share = 'Share',
  ClusterAttachableL2network = 'ClusterAttachableL2network',
  BaremetalClusterAttachableL2network = 'BaremetalClusterAttachableL2network',
  L2NetworkInZone = 'L2NetworkInZone',
  SharedResource = 'SharedResource',
  CreateL3DefaultCandidate = 'CreateL3DefaultCandidate',
  CreateL3AllCandidate = 'CreateL3AllCandidate',
  AttachedVxlanNetwork = 'AttachedVxlanNetwork'
}

export enum VcenterMessageQueryType {
  Normal = 'Normal'
}

export enum TrashQueryType {
  PrimaryStorage = 'PrimaryStorage',
  BackupStorage = 'BackupStorage'
}

export enum CephMonType {
  PrimaryStorage = 'PrimaryStorage',
  BackupStorage = 'BackupStorage'
}

export enum IscsiServerQueryType {
  NORMAL = 'NORMAL',
  GET_CLUSTER_ATTACHABLE_ISCSI_SERVER = 'GET_CLUSTER_ATTACHABLE_ISCSI_SERVER'
}

export enum ZWatchAlarmQueryType {
  Resource = 'Resource',
  Event = 'Event',
  Thirdparty = 'Thirdparty',
  MonitorGroupResource = 'MonitorGroupResource',
  MonitorGroupEvent = 'MonitorGroupEvent',
  ZwatchEndpoint = 'ZwatchEndpoint'
}

export enum ThirdPartyAlertsQueryType {
  Normal = 'Normal',
  AlarmRecord = 'AlarmRecord',
  EndpointRecord = 'EndpointRecord'
}

export enum StackTemplateQueryType {
  Custom = 'Custom',
  Example = 'Example',
  Normal = 'Normal',
  Self = 'Self',
  Share = 'Share'
}

export enum PerformanceType {
  VmInstance = 'VmInstance',
  Router = 'Router',
  Host = 'Host',
  BackupStorage = 'BackupStorage',
  L3Network = 'L3Network',
  Vip = 'Vip'
}

export enum VmInstancePerformanceMetricType {
  VRouterCPUUsedUtilization = 'VRouterCPUUsedUtilization',
  VRouterMemoryUsedPercent = 'VRouterMemoryUsedPercent',
  VRouterDiskUsedCapacityInPercent = 'VRouterDiskUsedCapacityInPercent',
  OperatingSystemCPUUsedUtilization = 'OperatingSystemCPUUsedUtilization',
  OperatingSystemMemoryUsedPercent = 'OperatingSystemMemoryUsedPercent',
  DiskUsedCapacityInPercent = 'DiskUsedCapacityInPercent',
  CPUAverageUsedUtilization = 'CPUAverageUsedUtilization',
  MemoryUsedInPercent = 'MemoryUsedInPercent',
  DiskAllReadBytes = 'DiskAllReadBytes',
  DiskAllWriteBytes = 'DiskAllWriteBytes',
  DiskAllReadOps = 'DiskAllReadOps',
  DiskAllWriteOps = 'DiskAllWriteOps',
  NetworkAllInBytes = 'NetworkAllInBytes',
  NetworkAllOutBytes = 'NetworkAllOutBytes',
  NetworkAllInPackets = 'NetworkAllInPackets',
  NetworkAllOutPackets = 'NetworkAllOutPackets',
  NetworkAllInErrors = 'NetworkAllInErrors',
  NetworkAllOutErrors = 'NetworkAllOutErrors'
}

export enum PerformanceThresholdSymbolType {
  GreaterEqual = 'GreaterEqual',
  LessEqual = 'LessEqual'
}

export enum HostPerformanceMetricType {
  CPUAllUsedUtilization = 'CPUAllUsedUtilization',
  MemoryUsedInPercent = 'MemoryUsedInPercent',
  DiskAllReadBytes = 'DiskAllReadBytes',
  DiskAllWriteBytes = 'DiskAllWriteBytes',
  DiskAllReadOps = 'DiskAllReadOps',
  DiskAllWriteOps = 'DiskAllWriteOps',
  DiskAllUsedCapacityInPercent = 'DiskAllUsedCapacityInPercent',
  DiskAllUsedCapacityInBytes = 'DiskAllUsedCapacityInBytes',
  NetworkAllInBytes = 'NetworkAllInBytes',
  NetworkAllOutBytes = 'NetworkAllOutBytes',
  NetworkAllInPackets = 'NetworkAllInPackets',
  NetworkAllOutPackets = 'NetworkAllOutPackets',
  NetworkAllInErrors = 'NetworkAllInErrors',
  NetworkAllOutErrors = 'NetworkAllOutErrors'
}

export enum BackupStoragePerformanceMetricType {
  AvailableCapacityInPercent = 'AvailableCapacityInPercent'
}

export enum L3NetworkPerformanceMetricType {
  UsedIPCount = 'UsedIPCount',
  UsedIPInPercent = 'UsedIPInPercent',
  AvailableIPCount = 'AvailableIPCount',
  AvailableIPInPercent = 'AvailableIPInPercent'
}

export enum VipNetworkPerformanceMetricType {
  VIPInBoundTrafficInBytes = 'VIPInBoundTrafficInBytes',
  VIPInBoundTrafficInPackages = 'VIPInBoundTrafficInPackages',
  VIPOutBoundTrafficInBytes = 'VIPOutBoundTrafficInBytes',
  VIPOutBoundTrafficInPackages = 'VIPOutBoundTrafficInPackages'
}

export enum BackupResourceType {
  VmInstance = 'VmInstance',
  Volume = 'Volume',
  Database = 'Database',
  ForVmInstanceDetail = 'ForVmInstanceDetail',
  ForVolumeDetail = 'ForVolumeDetail'
}

export enum IAM2OrganizationQueryType {
  Normal = 'Normal',
  FilterTopOrg = 'FilterTopOrg',
  FilterByProject = 'FilterByProject',
  FilterByChangeSuperiorDepartment = 'FilterByChangeSuperiorDepartment'
}

export enum TicketQueryType {
  TicketSubmitted = 'TicketSubmitted',
  TicketHandled = 'TicketHandled'
}

export enum BaremetalPxeServerQueryType {
  Normal = 'Normal',
  ClusterAttachablePxeServer = 'ClusterAttachablePxeServer'
}

export enum BareMetal2ChassisOfferingQueryType {
  NORMAL = 'NORMAL',
  GetAvailableChassisOfferingForCreateInstance = 'GetAvailableChassisOfferingForCreateInstance',
  GetAvailableChassisOfferingForStartInstance = 'GetAvailableChassisOfferingForStartInstance'
}

export enum BareMetal2ChassisQueryType {
  NORMAL = 'NORMAL',
  GetAvailableBareMetal2ChassisForStartInstance = 'GetAvailableBareMetal2ChassisForStartInstance'
}

export enum BareMetal2GatewayQueryType {
  Normal = 'Normal'
}

export enum BareMetal2InstanceQueryType {
  NORMAL = 'NORMAL',
  EIPATTACHCANDIDATE = 'EIPATTACHCANDIDATE'
}

export enum SchedulerJobGroupQueryType {
  NORMAL = 'NORMAL'
}

export enum SchedulerJobQueryType {
  Normal = 'Normal',
  DatabaseBackupJob = 'DatabaseBackupJob',
  GetCandidateForScheduler = 'GetCandidateForScheduler'
}

export enum SchedulerJobHistoryQueryType {
  NORMAL = 'NORMAL'
}

export enum SchedulerJobHistoryGroupByFireInstanceIdQueryType {
  NORMAL = 'NORMAL',
  OVERVIEW = 'OVERVIEW'
}

export enum BillingTableType {
  Normal = 'Normal',
  Iam2projectTable = 'Iam2projectTable',
  AccountTable = 'AccountTable',
  OrganizationTable = 'OrganizationTable',
  OrganizationDirectIam2projectTable = 'OrganizationDirectIam2projectTable',
  KVMTable = 'KVMTable',
  VCenterTable = 'VCenterTable'
}

export enum BillingTableResourceType {
  Cpu = 'Cpu',
  Memory = 'Memory',
  Gpu = 'Gpu',
  RootVolume = 'RootVolume',
  DataVolume = 'DataVolume',
  PubIpVmNicBandwidthOut = 'PubIpVmNicBandwidthOut',
  PubIpVmNicBandwidthIn = 'PubIpVmNicBandwidthIn',
  PubIpVipBandwidthOut = 'PubIpVipBandwidthOut',
  PubIpVipBandwidthIn = 'PubIpVipBandwidthIn'
}

export enum GlobalConfigQueryType {
  Normal = 'Normal',
  Basic = 'Basic',
  Advance = 'Advance'
}

export enum EipQueryType {
  Normal = 'Normal',
  SelectEipByCreateVm = 'SelectEipByCreateVm'
}

export enum ServerGroupQueryType {
  Normal = 'Normal',
  AddListenerCandidate = 'AddListenerCandidate'
}

export enum SlbOfferingQueryType {
  NORMAL = 'NORMAL'
}

export enum FirewallRuleSetQueryType {
  Default = 'Default',
  NoDefautlSearch = 'NoDefautlSearch',
  FirewallDetailsAttachRuleSet = 'FirewallDetailsAttachRuleSet',
  FirewallDetailsRule = 'FirewallDetailsRule',
  GetDefaultRuleSet = 'GetDefaultRuleSet'
}

export enum FirewallRuleQueryType {
  Default = 'Default',
  FirewallDetailsRule = 'FirewallDetailsRule'
}

export enum UsedIpQueryType {
  Normal = 'Normal',
  CandidateVmNicForAttachEip = 'CandidateVmNicForAttachEip'
}

export interface MetricItemInput {
  metricName: Scalars['String']
  conditions?: Maybe<Array<Condition>>
}

export enum QueryWidgetUserInfoType {
  Admin = 'Admin',
  Project = 'Project',
  Account = 'Account'
}

export enum QuerySummaryUserInfoType {
  IAM2 = 'IAM2',
  IAM1 = 'IAM1'
}

export interface Mutation {
  loginByAccount: LoginResp
  loginIAM2VirtualID: LoginResp
  loginIAM2Project: LoginResp
  loginIAM2VirtualIDWithLdap: LoginResp
  loginIAM2Platform: LoginResp
  getLoginCaptcha: GetLoginCaptchaResp
  refreshCaptcha: GetLoginCaptchaResp
  getTwoFactorAuthenticationSecret: GetTwoFactorAuthenticationSecretResp
  logOut: LogOutResp
  attachDataVolumeToVm: ActionResult
  changeVolumeState: ActionResult
  setVolumeQos: ActionResult
  deleteVolumeQos: ActionResult
  resizeDataVolume: ActionResult
  deleteDataVolume: ActionResult
  expungeDataVolume: ActionResult
  recoverDataVolume: ActionResult
  primaryStorageMigrateVolume: ActionResult
  createDataVolume: ActionResult
  syncVolumeSize: ActionResult
  updateVolume: ActionResult
  setVirtioSCSIInput: ActionResult
  createDataVolumeFromVolumeTemplate: ActionResult
  deleteTag: ActionResult
  createTag: ActionResult
  detachTag: ActionResult
  attachTag: ActionResult
  updateTag: ActionResult
  changeResourceOwner: ActionResult
  revokeResourceSharing: ActionResult
  shareResource: ActionResult
  shareResourceToProject: ActionResult
  revokeResourceFromProject: ActionResult
  shareResourceToGroup: ActionResult
  enablePrimaryStorageList: ActionResult
  disablePrimaryStorageList: ActionResult
  deletePrimaryStorageList: ActionResult
  updatePrimaryStorage: ActionResult
  reconnectPrimaryStorageList: ActionResult
  maintainPrimaryStorageList: ActionResult
  attachPrimaryStorageToCluster: ActionResult
  detachPrimaryStorageFromCluster: ActionResult
  updateStorageNetworkCidr: ActionResult
  updatePrimaryStorageThinProvision: ActionResult
  updatePrimaryStorageCephx: ActionResult
  createLocalStoragePrimaryStorage: ActionResult
  createNfsPrimaryStorage: ActionResult
  createSharedMountPointPrimaryStorage: ActionResult
  createCephPrimaryStorage: ActionResult
  createSharedBlockGroupPrimaryStorage: ActionResult
  createEbsPrimaryStorage: ActionResult
  createNasPrimaryStorage: ActionResult
  attachBackupStorageToZone: ActionResult
  changeZoneState: ActionResult
  createZone: ActionResult
  deleteZone: ActionResult
  detachBackupStorageFromZone: ActionResult
  updateZone: ActionResult
  deleteIAM2VirtualIDs: ActionResult
  updateIAM2VirtualID: ActionResult
  updateIAM2VirtualIDAttribute: ActionResult
  changeToLocalUser: ActionResult
  addAttributesToIAM2VirtualID: ActionResult
  removeAttributesToIAM2VirtualID: ActionResult
  detailUpdateIAM2VirtualID: ActionResult
  virtualIDEditorVirtualIDGroup: ActionResult
  addIAM2VirtualIDsToGroup: ActionResult
  removeIAM2VirtualIDsFromGroup: ActionResult
  virtualIDEditorPlatformRole: ActionResult
  virtualIDEditorRole: ActionResult
  virtualIDSettingZone: ActionResult
  iam2VirtualIDJoinProject: ActionResult
  iam2VirtualIDJoinOrganization: ActionResult
  checkIAM2VirtualIDConfigFile: ActionResult
  createIAM2VirtualID: ActionResult
  createIAM2VirtualIDFromConfigFile: ActionResult
  addVCenter: ActionResult
  deleteVCenter: ActionResult
  syncVCenter: ActionResult
  updateVCenter: ActionResult
  attachL2NetworkToCluster: ActionResult
  detachL2NetworkFromCluster: ActionResult
  createCluster: ActionResult
  enableCluster: ActionResult
  disableCluster: ActionResult
  deleteCluster: ActionResult
  updateCluster: ActionResult
  updateClusterDisplayNetworkCidr: ActionResult
  updateClusterHostCpuModel: ActionResult
  updateClusterVmInstanceCpuModel: ActionResult
  updateClusterMigrateNetworkCidr: ActionResult
  createClusterDRS: ActionResult
  updateClusterDRS: ActionResult
  executeDRSScheduling: ActionResult
  applyDRSAdvice: ActionResult
  addImage: CustomAction
  changeImageState: ActionResult
  deleteImage: ActionResult
  expungeImage: ActionResult
  recoverImage: ActionResult
  exportImage: ActionResult
  deleteExportedImage: ActionResult
  updateImage: ActionResult
  setImageBootMode: ActionResult
  shareImageToPublic: ActionResult
  revokeImageFromPublic: ActionResult
  syncImageSize: ActionResult
  syncImageFromImageStoreBackupStorage: ActionResult
  setImageQga: ActionResult
  backupStorageMigrateImage: ActionResult
  createVolumeTemplate: ActionResult
  setBaremetal2InstanceImage: ActionResult
  changeBackupStorageState: ActionResult
  reconnectBackupStorage: ActionResult
  deleteBackupStorage: ActionResult
  updateImageStoreBackupStorage: ActionResult
  updateSftpBackupStorage: ActionResult
  updateAliyunEbsBackupStorage: ActionResult
  updateCephBackupStorage: ActionResult
  createBSTag: ActionResult
  deleteBSTag: ActionResult
  updateBSTag: ActionResult
  reclaimSpaceFromImageStore: ActionResult
  addImageStoreBackupStorage: ActionResult
  addCephBackupStorage: ActionResult
  addAliyunEbsBackupStorage: ActionResult
  addSftpBackupStorage: ActionResult
  shareInstanceOfferingToPublic: InstanceOfferingActionResp
  revokeInstanceOfferingShareingFromPublic: InstanceOfferingActionResp
  changeInstanceOfferingState: ActionResult
  deleteInstanceOffering: ActionResult
  createInstanceOffering: ActionResult
  updateInstanceOffering: ActionResult
  changeInstanceOffering: ActionResult
  addKvmHost: ActionResult
  addXDragonHost: ActionResult
  addKVMHostFromConfigFile: ActionResult
  enableHosts: ActionResult
  disableHosts: ActionResult
  maintenanceHosts: ActionResult
  updateHost: ActionResult
  updateKVMHost: ActionResult
  deleteHosts: ActionResult
  closeHostIommu: ActionResult
  openHostIommu: ActionResult
  reconnectHosts: ActionResult
  setHostEptSupport: ActionResult
  checkKVMHostConfigFile: ActionSendResp
  startVmInstance: ActionResult
  stopVmInstance: ActionResult
  updateVmInstance: ActionResult
  pauseVmInstance: ActionResult
  recoverVmInstance: ActionResult
  resumeVmInstance: ActionResult
  rebootVmInstance: ActionResult
  poweroffVmInstance: ActionResult
  setVmInstanceGpuOffering: ActionResult
  resizeRootVolume: ActionResult
  changeVmImage: ActionResult
  detachDataVolumeFromVm: ActionResult
  attachIsoToVmInstance: ActionResult
  detachIsoFromVmInstance: ActionResult
  removeHaStickStragedy: ActionResult
  setHaStickStragedy: ActionResult
  updateVmPriority: ActionResult
  setVmConsoleMode: ActionResult
  deleteVmInstance: ActionResult
  setVmRDP: ActionResult
  setVmUsbRedirect: ActionResult
  changeVmPassword: ActionResult
  addVmToAffinityGroup: ActionResult
  removeVmFromAffinityGroup: ActionResult
  storageMigrateVmInstance: ActionResult
  expungeVmInstance: ActionResult
  deleteVmSshKey: ActionResult
  setVmSshKey: ActionResult
  deleteVmConsolePassword: ActionResult
  setVmConsolePassword: ActionResult
  reimageVmInstance: ActionResult
  startVmFromHost: ActionResult
  setVmBootOrder: ActionResult
  deleteVmInstanceHaLevel: ActionResult
  localStorageMigrateVolume: ActionResult
  migrateVm: ActionResult
  cloneVmInstance: ActionResult
  setVmHaLevel: ActionResult
  setVmQga: ActionResult
  setVmCleanTraffic: ActionResult
  setVmBootMode: ActionResult
  openConsoleAccess: ActionResult
  setVmMonitorNumber: ActionResult
  updateVmInstanceCPUPinning: ActionResult
  createVmInstance: ActionResult
  attachGuestToolsIsoToVm: ActionResult
  createAffinityGroup: ActionResult
  deleteAffinityGroup: ActionResult
  updateAffinityGroup: ActionResult
  changeAffinityGroupState: ActionResult
  attachVmInAffinityGroup: ActionResult
  detachVmFromAffinityGroup: ActionResult
  createPortForwarding: ActionResult
  updatePortForwarding: ActionResult
  deletePortForwarding: ActionResult
  attachPortForwarding: ActionResult
  detachPortForwarding: ActionResult
  attachL3NetworkToVmNic: ActionResult
  changeVmNicType: ActionResult
  deleteNicQos: ActionResult
  deleteVmStaticIp: ActionResult
  updateVmNicDriver: ActionResult
  setNicQos: ActionResult
  setVmStaticIp: ActionResult
  updateVmNicMac: ActionResult
  createBareMetal2ProvisionNetwork: ActionResult
  deleteBareMetal2ProvisionNetwork: ActionResult
  updateBareMetal2ProvisionNetwork: ActionResult
  changeProvisionNetwork: ActionResult
  checkIpAvailability: CheckIpAvailabilityResult
  addIpRange: ActionResult
  addIpRangeByCidr: ActionResult
  deleteIpRange: ActionResult
  addDnsToL3Network: ActionResult
  removeDnsFromL3Network: ActionResult
  deleteL3Network: ActionResult
  setL3NetworkMtu: ActionResult
  updateL3Network: ActionResult
  createL3Network: ActionResult
  attachVpcRouterToL3Network: ActionResult
  detachL3NetworkFromVm: ActionResult
  detachNicFromVm: ActionResult
  createDiskOffering: ActionResult
  deleteDiskOffering: ActionResult
  changeDiskOfferingState: ActionResult
  updateDiskOffering: ActionResult
  shareDiskOfferingToPublic: ActionResult
  revokeDiskOfferingFromPublic: ActionResult
  deleteCdRoms: ActionResult
  setVmInstanceDefaultCdRom: ActionResult
  createVmCdRom: ActionResult
  createVolumeSnapshot: ActionResult
  deleteVolumeSnapshot: ActionResult
  revertVolumeFromSnapshot: ActionResult
  ungroupVolumeSnapshotGroup: ActionResult
  updateVolumeSnapshot: ActionResult
  enablePciDeviceSpec: ActionResult
  disablePciDeviceSpec: ActionResult
  setPciDeviceSpecRom: ActionResult
  enableMdevDeviceSpec: ActionResult
  disableMdevDeviceSpec: ActionResult
  enableVGpuDeviceSpec: ActionResult
  disableVGpuDeviceSpec: ActionResult
  createListener: ActionResult
  changeAutoScalingGroupState: ActionResult
  updateAlarm: ActionResult
  updateAddingNewInstanceRule: ActionResult
  updateRemovalInstanceRule: ActionResult
  createAutoScalingGroup: ActionResult
  deleteAutoScalingGroup: ActionResult
  updateAutoScalingGroup: ActionResult
  updateAutoScalingVmTemplate: ActionResult
  changeSecurityGroupState: ActionResult
  deleteSecurityGroup: ActionResult
  attachSecurityGroupToL3Network: ActionResult
  detachSecurityGroupFromL3Network: ActionResult
  addSecurityGroupRule: ActionResult
  deleteSecurityGroupRule: ActionResult
  addVmNicToSecurityGroup: ActionResult
  deleteVmNicFromSecurityGroup: ActionResult
  createSecurityGroup: ActionResult
  updateSecurityGroup: ActionResult
  createVipNetwork: ActionResult
  addVipNetworkQos: ActionResult
  deleteVipNetwork: ActionResult
  deleteVipNetworkQos: ActionResult
  updateVipNetwork: ActionResult
  deleteFlowMeters: ActionResult
  updateFlowMeters: ActionResult
  addVRouterNetworksToFlowMeter: ActionResult
  createFlowMeter: ActionResult
  updateFlowCollectors: ActionResult
  removeVRouterNetworksFromFlowMeter: ActionResult
  deleteVpcConsolePassword: ActionResult
  setVpcConsolePassword: ActionResult
  startVpc: ActionResult
  stopVpc: ActionResult
  rebootVpc: ActionResult
  reconnectVpc: ActionResult
  createVpc: ActionResult
  addDnsToVpc: ActionResult
  removeDnsFromVpc: ActionResult
  deleteVpc: ActionResult
  setVpcHaStickStragedy: ActionResult
  removeVpcHaStickStragedy: ActionResult
  coldMigrateVpc: ActionResult
  migrateVpc: ActionResult
  updateVpc: ActionResult
  setVpcVRouterDistributedRoutingEnabled: ActionResult
  setVpcVRouterNetworkServiceState: ActionResult
  openSts: ActionResult
  closeSts: ActionResult
  updateVpcDefaultNetwork: ActionResult
  createMulticastRouter: ActionResult
  deleteMulticastRouter: ActionResult
  changeMulticastRouterState: ActionResult
  addRendezvousPointToMulticastRouter: ActionResult
  removeRendezvousPointFromMulticastRouter: ActionResult
  deleteVpcHaGroup: ActionResult
  createVpcHaGroup: ActionResult
  addVpcToHaGroup: ActionResult
  updateVpcHaGroup: ActionResult
  changeVpcHaGroupMonitorIps: ActionResult
  shareVirtualRouterOfferingToPublic: ActionResult
  updateVirtualRouterOfferings: ActionResult
  deleteVirtualRouterOfferings: ActionResult
  createVirtualRouterOffering: ActionResult
  revokeVirtualRouterOfferingSharingFromPublic: ActionResult
  changeVirtualRouterOfferingState: ActionResult
  checkScsiLunClusterStatus: ActionResult
  attachScsiLunToVmInstances: ActionResult
  detachScsiLunFromVmInstance: ActionResult
  updateUsb: ActionSendResp
  attachUsbDeviceToVm: ActionResult
  detachUsbDeviceToVm: ActionResult
  updateUsbDevice: ActionResult
  attachPciDeviceToVm: ActionResult
  detachPciDeviceFromVm: ActionResult
  generateSriovPciDevices: ActionResult
  unGenerateSriovPciDevice: ActionResult
  updatePciDevice: ActionResult
  attachMdevDeviceToVm: ActionResult
  detachMdevDeviceFromVm: ActionResult
  generateMdevDevice: ActionResult
  unGenerateMdevDevice: ActionResult
  attachVGpuToVmInstance: ActionResult
  detachVGpuFromVmInstance: ActionResult
  updateVGPUDevice: ActionResult
  deleteL2Networks: ActionResult
  revokeL2NetworkToPublic: ActionResult
  shareL2NetworkToPublic: ActionResult
  updateL2Network: ActionResult
  setL2NetworkSrIov: ActionResult
  createL2Network: ActionResult
  updateVCenterVm: VCenterVmActionResp
  deleteVCenterVm: ActionSendResp
  expungeVCenterVm: ActionSendResp
  createVCenterNetwork: ActionResult
  addCephPrimaryStoragePool: ActionResult
  updateCephPrimaryStoragePool: ActionResult
  deleteCephPrimaryStoragePoolList: ActionResult
  cleanUpTrashList: ActionResult
  addCephMon: ActionResult
  updateCephMon: ActionResult
  deleteCephMonList: ActionResult
  addIscsiServer: ActionResult
  updateIscsiServers: ActionResult
  deleteIscsiServers: ActionResult
  refreshIscsiServers: ActionResult
  attachIscsiServerToClusters: ActionResult
  detachIscsiServerFromClusters: ActionResult
  refreshFiberChannelStorages: ActionResult
  addSharedBlockToSharedBlockGroup: ActionResult
  refreshSharedblockDeviceCapacity: ActionResult
  createAlarm: ActionResult
  subscribeEvent: ActionResult
  enableAlarms: ActionResult
  deleteAlarms: ActionResult
  disableAlarms: ActionResult
  unsubscribeEvent: ActionResult
  updateAlarmLabel: ActionResult
  addActionToAlarm: ActionResult
  updateSubscribeEvent: ActionResult
  removeActionFromAlarm: ActionResult
  addActionToEventSubscription: ActionResult
  removeActionFromEventSubscription: ActionResult
  addSNSDingTalkAtPerson: ActionResult
  addEmailAddress: ActionResult
  addSmsReceiver: ActionResult
  changeSNSApplicationEndpoint: ActionResult
  createSNSTopic: ActionResult
  subscribeSNSTopic: ActionResult
  createDingTalkEndpoint: ActionResult
  createEmailEndpoint: ActionResult
  createHttpEndpoint: ActionResult
  createAliyunSmsEndpoint: ActionResult
  createSNSMicrosoftTeamsEndpoint: ActionResult
  unubscribeSNSTopic: ActionResult
  deleteSNSTopic: ActionResult
  deleteSNSApplicationEndpoint: ActionResult
  deleteEmailAddressToEndpoint: ActionResult
  removeSNSDingTalkAtPerson: ActionResult
  modifyDingTalkAtPerson: ActionResult
  removeSmsReceiver: ActionResult
  updateSNSApplicationEndpoint: ActionResult
  updateEmailAddressToEndpoint: ActionResult
  validateAliyunSmsEndpoint: ActionResult
  addAlarmToEndpoint: ActionResult
  removeAlarmFromEndpoint: ActionResult
  updateSmsReceiver: ActionResult
  updateAllAlarmHistoriesAsRead: ActionResult
  updateEventDataAsRead: UpdateEventDataResp
  updateAlarmDataAsRead: UpdateAlarmDataResp
  ackAlarmData: ActionResult
  updateAlertDataAck: ActionResult
  updateThirdpartyAlertsAsRead: UpdateThirdpartyAlertsResp
  deleteThirdpartyPlatform: ActionResult
  createThirdpartyPlatform: ActionResult
  updateThirdpartyPlatform: ActionResult
  createResourceStack: ActionResult
  updateResourceStack: ActionResult
  deleteResourceStack: ActionResult
  addStackTemplate: ActionResult
  deleteStackTemplate: ActionResult
  updateStackTemplate: ActionResult
  enabledStackTemplate: ActionResult
  disabledStackTemplate: ActionResult
  createSNSTextTemplate: ActionResult
  createAliyunSmsSNSTextTemplate: ActionResult
  deleteSNSTextTemplate: ActionResult
  updateSNSTextTemplate: ActionResult
  updateAliyunSmsSNSTextTemplate: ActionResult
  createMonitorTemplate: ActionResult
  cloneMonitorTemplate: ActionResult
  deleteMonitorTemplate: ActionResult
  applyMonitorTemplateToMonitorGroupInMonitorTemplate: ActionResult
  createMonitorGroup: ActionResult
  deleteMonitorGroup: ActionResult
  updateMonitorGroup: ActionResult
  revokeMonitorTemplateFromMonitorGroup: ActionResult
  applyMonitorTemplateToMonitorGroup: ActionResult
  addInstanceToMonitorGroup: ActionResult
  removeInstanceFromMonitorGroup: ActionResult
  changeActiveAlarmState: ActionResult
  addMetricRuleTemplate: ActionResult
  deleteMetricRuleTemplate: ActionResult
  updateMetricRuleTemplate: ActionResult
  addEventRuleTemplate: ActionResult
  deleteEventRuleTemplate: ActionResult
  updateEventRuleTemplate: ActionResult
  scanDatabaseBackups: ActionResult
  syncBackupToRemote: ActionResult
  deleteBackupDataList: ActionResult
  createBackupData: ActionResult
  syncBackupDataToLocal: ActionResult
  exportDatabaseBackupUrl: ActionResult
  recoverDatabaseBackup: ActionResult
  recoverBackupData: ActionResult
  syncDatabaseBackupToRemote: ActionResult
  /** 删除备份数据库 */
  deleteDatabaseBackupDataList: ActionResult
  deleteIAM2ProjectTemplate: ActionResult
  createIAM2ProjectTemplate: ActionResult
  updateIAM2ProjectTemplate: ActionResult
  deleteIAM2Organizations: ActionResult
  updateIAM2Organization: ActionResult
  addIAM2VirtualIDsToOrganization: ActionResult
  setOrganizationSupervisor: ActionResult
  removeIAM2VirtualIDsFromOrganization: ActionResult
  createIAM2Organization: ActionResult
  deleteThirdPartyAuths: ActionResult
  updateThirdPartyAuth: ActionResult
  updateThirdPartyAuthConfigInfo: ActionResult
  syncThirdPartyAuth: ActionResult
  testConnectionThirdParty: ActionResult
  settingAutoSyncThirdPartyAuth: ActionResult
  updateThirdPartyAuthMappingInfo: ActionResult
  testThirdPartyAuthSyncRules: ActionResult
  addThirdPartyAuth: ActionResult
  addThirdPartyAuthSyncRules: ActionResult
  addGroupsToProject: ActionResult
  addGroupsToProjects: ActionResult
  addIAM2VirtualIDRoleGroups: ActionResult
  addIAM2VirtualIDsToGroupMainView: ActionResult
  deleteVirtualIDGroups: ActionResult
  modifyGroupRole: ActionResult
  removeGroupFromProjects: ActionResult
  removeIAM2VirtualIDFromGroups: ActionResult
  removeIAM2VirtualIDRoleGroups: ActionResult
  updateIAM2VirtualIDGroup: ActionResult
  userAddToGroups: ActionResult
  createIAM2VirtualIDGroup: ActionResult
  enableIAM2Project: ActionResult
  disableIAM2Project: ActionResult
  stopAllResourcesInIAM2Project: ActionResult
  recoverIAM2Project: ActionResult
  addIAM2VirtualIDsToProject: ActionResult
  removeIAM2VirtualIDsFromProjects: ActionResult
  setIAM2ProjectIAM2Organization: ActionResult
  detachIAM2VirtualIDsFromProject: ActionResult
  changeAccountPriceTableBinding: ActionResult
  createIAM2ProjectTemplateFromProject: ActionResult
  deleteIAM2Project: ActionResult
  expungeIAM2Project: ActionResult
  updateIAM2Project: ActionResult
  updateIAM2ProjectQuota: ActionResult
  updateIAM2ProjectRetirePolicy: ActionResult
  recoverRetiredIAM2Project: ActionResult
  createIAM2Project: ActionResult
  setIAM2ProjectAdmin: ActionResult
  updateIAM2VirtualIDRoleInIAM2Project: ActionResult
  addRolesToIAM2VirtualID: ActionResult
  removeRolesFromIAM2VirtualID: ActionResult
  createRole: ActionResult
  deleteRole: ActionResult
  updateRole: ActionResult
  updateRoleUIPrivilege: ActionResult
  passAdvancedTicket: ActionResult
  passTicket: ActionResult
  rejectTicket: ActionResult
  changeTicketProcessState: ActionResult
  deleteTicketProcess: ActionResult
  updateTicketProcess: ActionResult
  updateTicketProcessTicketTypes: ActionResult
  createTicketProcess: ActionResult
  ceateTicket: ActionResult
  deleteTicket: ActionResult
  reopenTicket: ActionResult
  cancelTicket: ActionResult
  updateTicket: ActionResult
  addPreconfigurationTemplate: ActionResult
  changePreconfigurationTemplateState: ActionResult
  deletePreConfigurationTemplate: ActionResult
  updatePreconfigurationTemplate: ActionResult
  startBaremetalInstance: ActionResult
  stopBaremetalInstance: ActionResult
  rebootBaremetalInstance: ActionResult
  recoverBaremetalInstance: ActionResult
  expungeBaremetalInstance: ActionResult
  deleteBaremetalInstance: ActionResult
  updateBaremetalInstance: ActionResult
  openBaremetalInstanceConsole: ActionResult
  createBaremetalInstance: ActionResult
  stopBaremetalPxeServer: ActionResult
  startBaremetalPxeServer: ActionResult
  reconnectBaremetalPxeServer: ActionResult
  deleteBaremetalPxeServer: ActionResult
  createBaremetalPxeServer: ActionResult
  updateBaremetalPxeServer: ActionResult
  attachBaremetalPxeServer: ActionResult
  detachBaremetalPxeServer: ActionResult
  inspectBaremetalChassis: ActionResult
  createBaremetalChassis: ActionResult
  batchCreateBaremetalChassis: ActionResult
  deleteBaremetalChassis: ActionResult
  updateBaremetalChassis: ActionResult
  addBareMetal2Chassis: ActionResult
  addBareMetal2ChassisFromConfigFile: ActionResult
  changeBareMetal2ChassisState: ActionResult
  deleteBareMetal2Chassis: ActionResult
  inspectBareMetal2Chassis: ActionResult
  powerOffBareMetal2Chassis: ActionResult
  powerOnBareMetal2Chassis: ActionResult
  powerResetBareMetal2Chassis: ActionResult
  updateBareMetal2Chassis: ActionResult
  updateBareMetal2IpmiChassis: ActionResult
  checkBareMetal2ConfigFile: ActionSendResp
  createBareMetal2Gateway: ActionResult
  attachBareMetal2GatewayToCluster: ActionResult
  changeBareMetal2GatewayCluster: ActionResult
  deleteBareMetal2Gateway: ActionResult
  changeBareMetal2GatewayState: ActionResult
  updateBareMetal2Gateway: ActionResult
  reconnectBareMetal2Gateway: ActionResult
  startBareMetal2Instance: ActionResult
  createBareMetal2Instance: ActionResult
  deleteBareMetal2Instance: ActionResult
  updateBareMetal2Instance: ActionResult
  changeBareMetal2InstancePassword: ActionResult
  reconnectBareMetal2Instance: ActionResult
  addV2VConversionHost: ActionResult
  cancelV2VConversionHostBandWidth: ActionResult
  changeV2VConversionHostState: ActionResult
  deleteV2VConversionHost: ActionResult
  disableV2VConversionHostState: ActionResult
  enableV2VConversionHostState: ActionResult
  updateV2VConversionHostBandWidth: ActionResult
  updateV2VConversionHost: ActionResult
  addResourceToBackupJob: ActionResult
  deleteDatabaseBackupJob: ActionResult
  deleteResourceBackupJob: ActionResult
  removeResourceFromBackupJob: ActionResult
  updateResourceBackupJobStrategy: ActionResult
  updateSchedulerJobGroup: ActionResult
  createResourceBackupJob: ActionResult
  createDatabaseBackupJob: ActionResult
  scanDataLocalBackupStorage: ActionResult
  addLocalBackupStorageByCreate: ActionResult
  addLocalBackupStorageBySelect: ActionResult
  changeLocalBackupStorageState: ActionResult
  cleanUpTrashOnLocalBackupStorage: ActionResult
  deleteLocalBackupStorage: ActionResult
  modifyLocalBackupStorageInfoImageType: ActionResult
  modifyLocalBackupStorageInfoSftpType: ActionResult
  reclaimSpaceFromLocalBackupStorage: ActionResult
  reconnectLocalBackupStorage: ActionResult
  scanDataBaseLocalBackupStorage: ActionResult
  scanVMLocalBackupStorage: ActionResult
  scanVolumeLocalBackupStorage: ActionResult
  modifyLocalBackupStorage: ActionResult
  changeRemoteBackupStorageState: ActionResult
  addRemoteBackupStorage: ActionResult
  deleteRemoteBackupStorage: ActionResult
  modifyRemoteBackupStorageInfoImageType: ActionResult
  modifyRemoteBackupStorageInfoSftpType: ActionResult
  reclaimSpaceFromRemoteStorage: ActionResult
  reconnectRemoteBackupStorage: ActionResult
  modifyRemoteBackupStorage: ActionResult
  createV2VMigration: ActionResult
  rerunV2VMigration: ActionResult
  deleteV2VMigration: ActionResult
  updateV2VMigration: ActionResult
  changeSchedulerJobState: ActionResult
  createSchedulerJob: ActionResult
  deleteSchedulerJob: ActionResult
  addSchedulerJobToSchedulerTrigger: ActionResult
  removeSchedulerJobFromSchedulerTrigger: ActionResult
  updateSchedulerJob: ActionResult
  createSchedulerTrigger: ActionResult
  deleteSchedulerTrigger: ActionResult
  runSchedulerTrigger: ActionResult
  updateSchedulerTrigger: ActionResult
  createCertificate: ActionResult
  deleteCertificate: ActionResult
  updateCertificate: ActionResult
  reconnectConsoleProxy: ActionResult
  updateConsoleProxy: ActionResult
  createAccessKey: ActionResult
  changeAccessKeyState: ActionResult
  deleteAccessKey: ActionResult
  deleteHybridKeySecret: ActionResult
  createHybridKeySecret: ActionResult
  updateHybridKeySecret: ActionResult
  cancelLongjob: ActionResult
  createLogServer: ActionResult
  deleteLogServer: ActionResult
  updateLogServer: ActionResult
  testLogServer: ActionResult
  createSNSEmailServer: ActionResult
  deleteSNSEmailServer: ActionResult
  updateSNSEmailServer: ActionResult
  validateSNSEmailServer: ActionResult
  disableEmailServerSettings: ActionResult
  enableEmailServerSettings: ActionResult
  createIpBlackWhiteList: ActionResult
  deleteIpBlackWhiteList: ActionResult
  updateIpBlackWhiteList: ActionResult
  createBillingsPriceTable: ActionResult
  updateBillingsPrice: ActionResult
  deleteBillingsPrice: ActionResult
  deleteBillingsPriceTable: ActionResult
  updateBillingsPriceTable: ActionResult
  bindAccountToBillingsPriceTable: ActionResult
  createAccount: ActionResult
  deleteAccounts: ActionResult
  updateAccount: ActionResult
  attachPriceTableToAccount: ActionResult
  detachPriceTableFromAccount: ActionResult
  attachRoleToAccount: ActionResult
  detachRoleFromAccount: ActionResult
  updateAccountQuota: ActionResult
  changeAccountBillingsPriceTable: ActionResult
  createApplicationCenter: ActionResult
  deleteApplicationCenter: ActionResult
  updateApplicationCenter: ActionResult
  generateToken: Scalars['String']
  deleteResourceConfig: ActionResult
  updateResourceConfig: ActionResult
  updateGlobalConfig: ActionResult
  resetGlobalConfig: ActionResult
  reloadLicense: ActionResult
  deleteLicense: ActionResult
  updateLicense: ActionResult
  applyTemplateConfig: ActionResult
  resetTemplateConfig: ActionResult
  updateTemplateConfig: ActionResult
  updateCustomColumns: ActionResult
  updateThemeConfig: ActionResult
  resetThemeConfig: ActionResult
  createPortMirror: ActionResult
  changePortMirrorState: ActionResult
  updatePortMirror: ActionResult
  deletePortMirror: ActionResult
  createPortMirrorSession: ActionResult
  deletePortMirrorSession: ActionResult
  deleteVRouterOspfAreas: ActionResult
  updateVRouterOspfAreas: ActionResult
  addVRouterNetworksToOspfArea: ActionResult
  createVRouterOspfArea: ActionResult
  setVRouterRouterId: ActionResult
  removeVRouterNetworksFromOspfArea: ActionResult
  addRemoteCidrsToIPsec: ActionResult
  attachL3NetworkToIPsec: ActionResult
  createIPsec: ActionSendResp
  deleteIpsec: ActionResult
  detachL3NetworkFromIPsec: ActionResult
  removeRemoteCidrsFromIPsec: ActionResult
  updateIPsecConnection: ActionResult
  attachEipToVm: ActionResult
  createEip: ActionResult
  deleteEips: ActionResult
  detachEipToVm: ActionResult
  updateEip: ActionResult
  deleteLoadBalancer: ActionResult
  createLoadBalancer: ActionResult
  updateLoadBalancer: ActionResult
  changeSlbOfferingState: ActionResult
  createSlbOffering: ActionResult
  updateSlbOffering: ActionResult
  addBackendServerToServerGroup: ActionResult
  addServerGroupToLoadBalancerListener: ActionResult
  createServerGroup: ActionResult
  deleteServerGroup: ActionResult
  removeBackendServerFromServerGroup: ActionResult
  removeServerGroupFromLoadBalancerListener: ActionResult
  setWeight: ActionResult
  updateServerGroup: ActionResult
  deleteListener: ActionResult
  updateListener: ActionResult
  changeListener: ActionResult
  addCertificateToListener: ActionResult
  removeCertificateFromListener: ActionResult
  createFirewallIpSetTemplate: ActionResult
  deleteFirewallIpSetTemplate: ActionResult
  updateFirewallIpSetTemplate: ActionResult
  applyRuleSetChanges: ActionResult
  createFirewallRuleSet: ActionResult
  deleteFirewallRuleSet: ActionResult
  updateFirewallRuleSet: ActionResult
  createFirewallRule: ActionResult
  deleteFirewallRule: ActionResult
  updateFirewallRule: ActionResult
  changeFirewallRuleState: ActionResult
  checkRuleNumber: CheckRuleNumber
  createFirewallRuleTemplate: ActionResult
  deleteFirewallRuleTemplate: ActionResult
  updateFirewallRuleTemplate: ActionResult
  attachFirewallRuleSetToL3: ActionResult
  detachFirewallRuleSetFromL3: ActionResult
  createVpcFirewall: ActionResult
  deleteFirewall: ActionResult
  updateVpcFirewall: ActionResult
  deleteSdnControllerList: ActionResult
  updateSdnController: ActionResult
  addSdnController: ActionResult
  attachVRouterRouteTableToVRouter: ActionResult
  createVRouterRouteTable: ActionResult
  createVRouterRouteEntry: ActionResult
  deleteVRouterRouteTable: ActionResult
  detachVRouterRouteTableFromVRouter: ActionResult
  updateVRouterRouteTable: ActionResult
  deleteVRouterRouteEntry: ActionResult
  createVxlanPool: ActionResult
  createVniRange: ActionResult
  deleteVniRange: ActionResult
  updateVniRange: ActionResult
  updateHomepageLayoutConfig: ActionResult
  updateWelcomeConfig: UpdateWelcomeConfigResp
  updateZsKv: ZsKvResult
}

export interface MutationloginByAccountArgs {
  input: LoginByAccountInput
}

export interface MutationloginIAM2VirtualIDArgs {
  input: LoginIAM2VirtualIDInput
}

export interface MutationloginIAM2ProjectArgs {
  input: LoginIAM2ProjectInput
}

export interface MutationloginIAM2VirtualIDWithLdapArgs {
  input: LoginIAM2VirtualIDWithLdapInput
}

export interface MutationgetLoginCaptchaArgs {
  input: GetLoginCaptchaPayload
}

export interface MutationrefreshCaptchaArgs {
  captchaUuid: Scalars['String']
}

export interface MutationgetTwoFactorAuthenticationSecretArgs {
  input: GetTwoFactorAuthenticationSecretPayload
}

export interface MutationlogOutArgs {
  input: LogOutInput
}

export interface MutationattachDataVolumeToVmArgs {
  input: AttachDataVolumeToVmInput
}

export interface MutationchangeVolumeStateArgs {
  input: ChangeVolumeStateInput
}

export interface MutationsetVolumeQosArgs {
  input: SetVolumeQosInput
}

export interface MutationdeleteVolumeQosArgs {
  input: DeleteVolumeQosInput
}

export interface MutationresizeDataVolumeArgs {
  input: ResizeDataVolumeInput
}

export interface MutationdeleteDataVolumeArgs {
  input: DeleteDataVolumeInput
}

export interface MutationexpungeDataVolumeArgs {
  input: ExpungeDataVolumeInput
}

export interface MutationrecoverDataVolumeArgs {
  input: RecoverDataVolumeInput
}

export interface MutationprimaryStorageMigrateVolumeArgs {
  input: PrimaryStorageMigrateVolumeInput
}

export interface MutationcreateDataVolumeArgs {
  input: CreateDataVolumeInput
}

export interface MutationsyncVolumeSizeArgs {
  input: SyncVolumeSizeInput
}

export interface MutationupdateVolumeArgs {
  input: UpdateVolumeActionInput
}

export interface MutationsetVirtioSCSIInputArgs {
  input: SetVolumeVirtioSCSIInput
}

export interface MutationcreateDataVolumeFromVolumeTemplateArgs {
  input: CreateDataVolumeFromVolumeTemplateInput
}

export interface MutationdeleteTagArgs {
  input: DeleteTagInput
}

export interface MutationcreateTagArgs {
  input: CreateTagInput
}

export interface MutationdetachTagArgs {
  input: DetachTagInput
}

export interface MutationattachTagArgs {
  input: AttachTagInput
}

export interface MutationupdateTagArgs {
  input: UpdateTagInput
}

export interface MutationchangeResourceOwnerArgs {
  input: ChangeResourceOwnerInput
}

export interface MutationrevokeResourceSharingArgs {
  input: RevokeResourceSharingInput
}

export interface MutationshareResourceArgs {
  input: ShareResourceInput
}

export interface MutationshareResourceToProjectArgs {
  input: ShareResourceToProjectInput
}

export interface MutationrevokeResourceFromProjectArgs {
  input: RevokeResourceFromProjectInput
}

export interface MutationshareResourceToGroupArgs {
  input: ShareResourceToGroupInput
}

export interface MutationenablePrimaryStorageListArgs {
  input: EnablePrimaryStorageInput
}

export interface MutationdisablePrimaryStorageListArgs {
  input: DisablePrimaryStorageInput
}

export interface MutationdeletePrimaryStorageListArgs {
  input: DeletePrimaryStorageListInput
}

export interface MutationupdatePrimaryStorageArgs {
  input: UpdatePrimaryStorageInput
}

export interface MutationreconnectPrimaryStorageListArgs {
  input: ReconnectPrimaryStorageInput
}

export interface MutationmaintainPrimaryStorageListArgs {
  input: MaintainPrimaryStorageInput
}

export interface MutationattachPrimaryStorageToClusterArgs {
  input: AttachPrimaryStorageToClusterInput
}

export interface MutationdetachPrimaryStorageFromClusterArgs {
  input: DetachPrimaryStorageFromClusterInput
}

export interface MutationupdateStorageNetworkCidrArgs {
  input: UpdateStorageNetworkCidrInput
}

export interface MutationupdatePrimaryStorageThinProvisionArgs {
  input: UpdatePrimaryStorageThinProvisionInput
}

export interface MutationupdatePrimaryStorageCephxArgs {
  input: UpdatePrimaryStorageCephxInput
}

export interface MutationcreateLocalStoragePrimaryStorageArgs {
  input: CreateLocalPrimaryStorageInput
}

export interface MutationcreateNfsPrimaryStorageArgs {
  input: CreateNFSPrimaryStorageInput
}

export interface MutationcreateSharedMountPointPrimaryStorageArgs {
  input: CreateSharedMountPointPrimaryStorageInput
}

export interface MutationcreateCephPrimaryStorageArgs {
  input: CreateCephPrimaryStorageInput
}

export interface MutationcreateSharedBlockGroupPrimaryStorageArgs {
  input: CreateSharedBlockGroupPrimaryStorageInput
}

export interface MutationcreateEbsPrimaryStorageArgs {
  input: CreateEbsPrimaryStorageInput
}

export interface MutationcreateNasPrimaryStorageArgs {
  input: CreateNasPrimaryStorageInput
}

export interface MutationattachBackupStorageToZoneArgs {
  input: AttachBackupStorageToZoneInput
}

export interface MutationchangeZoneStateArgs {
  input: ChangeZoneStateInput
}

export interface MutationcreateZoneArgs {
  input: CreateZoneInput
}

export interface MutationdeleteZoneArgs {
  input: DeleteZoneInput
}

export interface MutationdetachBackupStorageFromZoneArgs {
  input: DetachBackupStorageFromZoneInput
}

export interface MutationupdateZoneArgs {
  input: UpdateZoneInput
}

export interface MutationdeleteIAM2VirtualIDsArgs {
  input: DeleteIAM2VirtualIDInput
}

export interface MutationupdateIAM2VirtualIDArgs {
  input: UpdateIAM2VirtualIDInput
}

export interface MutationupdateIAM2VirtualIDAttributeArgs {
  input: UpdateIAM2VirtualIDAttributeInput
}

export interface MutationchangeToLocalUserArgs {
  input: ChangeToLocalUserInput
}

export interface MutationaddAttributesToIAM2VirtualIDArgs {
  input: AddIAM2VirtualIDAttributeInput
}

export interface MutationremoveAttributesToIAM2VirtualIDArgs {
  input: RemoveAttributesFromIAM2VirtualIDInput
}

export interface MutationdetailUpdateIAM2VirtualIDArgs {
  input: DetaiUpdateIAM2VirtualIDInput
}

export interface MutationvirtualIDEditorVirtualIDGroupArgs {
  input: VirtualIDEditorVirtualIDGroupInput
}

export interface MutationaddIAM2VirtualIDsToGroupArgs {
  input: AddIAM2VirtualIDsToGroupInput
}

export interface MutationremoveIAM2VirtualIDsFromGroupArgs {
  input: RemoveIAM2VirtualIDsToGroupInput
}

export interface MutationvirtualIDEditorPlatformRoleArgs {
  input: VirtualIDEditorPlatformRoleInput
}

export interface MutationvirtualIDEditorRoleArgs {
  input: VirtualIDEditorRoleInput
}

export interface MutationvirtualIDSettingZoneArgs {
  input: VirtualIDSettingZoneInput
}

export interface Mutationiam2VirtualIDJoinProjectArgs {
  input: IAM2VirtualIDJoinProjectInput
}

export interface Mutationiam2VirtualIDJoinOrganizationArgs {
  input: IAM2VirtualIDJoinOrganizationInput
}

export interface MutationcheckIAM2VirtualIDConfigFileArgs {
  input: CheckIAM2VirtualIDConfigFileInput
}

export interface MutationcreateIAM2VirtualIDArgs {
  input: CreateIAM2VirtualIDInput
}

export interface MutationcreateIAM2VirtualIDFromConfigFileArgs {
  input: CreateIAM2VirtualIDFromConfigFileInput
}

export interface MutationaddVCenterArgs {
  input: AddVCenterInput
}

export interface MutationdeleteVCenterArgs {
  input: DeleteVCenterInput
}

export interface MutationsyncVCenterArgs {
  input: SyncVCenterInput
}

export interface MutationupdateVCenterArgs {
  input: UpdateVCenterInput
}

export interface MutationattachL2NetworkToClusterArgs {
  input: AttachOrDetachL2NetworksFromClusterActionInput
}

export interface MutationdetachL2NetworkFromClusterArgs {
  input: AttachOrDetachL2NetworksFromClusterActionInput
}

export interface MutationcreateClusterArgs {
  input: CreateClusterInput
}

export interface MutationenableClusterArgs {
  input: ChangeClusterStateInput
}

export interface MutationdisableClusterArgs {
  input: ChangeClusterStateInput
}

export interface MutationdeleteClusterArgs {
  input: DeleteClusterInput
}

export interface MutationupdateClusterArgs {
  input: UpdateClusterInput
}

export interface MutationupdateClusterDisplayNetworkCidrArgs {
  input: UpdateClusterDisplayNetworkCidrInput
}

export interface MutationupdateClusterHostCpuModelArgs {
  input: UpdateClusterHostCpuModelInput
}

export interface MutationupdateClusterVmInstanceCpuModelArgs {
  input: UpdateClusterVmInstanceCpuModelInput
}

export interface MutationupdateClusterMigrateNetworkCidrArgs {
  input: UpdateClusterMigrateNetworkCidrInput
}

export interface MutationcreateClusterDRSArgs {
  input: CreateClusterDRSInput
}

export interface MutationupdateClusterDRSArgs {
  input: UpdateClusterDRSInput
}

export interface MutationexecuteDRSSchedulingArgs {
  input: ExecuteDRSSchedulingInput
}

export interface MutationapplyDRSAdviceArgs {
  input: ApplyDRSAdviceListInput
}

export interface MutationaddImageArgs {
  input: AddImageInput
}

export interface MutationchangeImageStateArgs {
  input: ChangeImageStateInput
}

export interface MutationdeleteImageArgs {
  input: DeleteImageInput
}

export interface MutationexpungeImageArgs {
  input: ExpungeImageInput
}

export interface MutationrecoverImageArgs {
  input: RecoverImageInput
}

export interface MutationexportImageArgs {
  input: ExportImageInput
}

export interface MutationdeleteExportedImageArgs {
  input: DeleteExportedImageInput
}

export interface MutationupdateImageArgs {
  input: UpdateImageInput
}

export interface MutationsetImageBootModeArgs {
  input: SetImageBootModeInput
}

export interface MutationshareImageToPublicArgs {
  input: ShareImageToPublicInput
}

export interface MutationrevokeImageFromPublicArgs {
  input: RevokeImageFromPublicInput
}

export interface MutationsyncImageSizeArgs {
  input: SyncImageSizeInput
}

export interface MutationsyncImageFromImageStoreBackupStorageArgs {
  input: SyncImageFromImageStoreBackupStorageInput
}

export interface MutationsetImageQgaArgs {
  input: SetImageQgaInput
}

export interface MutationbackupStorageMigrateImageArgs {
  input: BackupStorageMigrateImageInput
}

export interface MutationcreateVolumeTemplateArgs {
  input: CreateVolumeTemplateInput
}

export interface MutationsetBaremetal2InstanceImageArgs {
  input: SetBaremetal2InstanceImageInput
}

export interface MutationchangeBackupStorageStateArgs {
  input: ChangeBackupStorageStateInput
}

export interface MutationreconnectBackupStorageArgs {
  input: ReconnectBackupStorageInput
}

export interface MutationdeleteBackupStorageArgs {
  input: DeleteBackupStorageInput
}

export interface MutationupdateImageStoreBackupStorageArgs {
  input: UpdateImageStoreBackupStorageInput
}

export interface MutationupdateSftpBackupStorageArgs {
  input: UpdateSftpBackupStorageInput
}

export interface MutationupdateAliyunEbsBackupStorageArgs {
  input: UpdateAliyunEbsBackupStorageInput
}

export interface MutationupdateCephBackupStorageArgs {
  input: UpdateCephBackupStorageInput
}

export interface MutationcreateBSTagArgs {
  input: CreateBSSystemTagInput
}

export interface MutationdeleteBSTagArgs {
  input: DeleteBSSystemTagInput
}

export interface MutationupdateBSTagArgs {
  input: UpdateBSSystemTagInput
}

export interface MutationreclaimSpaceFromImageStoreArgs {
  input: ReclaimSpaceFromImageStoreInput
}

export interface MutationaddImageStoreBackupStorageArgs {
  input: AddImageStoreBackupStorageInput
}

export interface MutationaddCephBackupStorageArgs {
  input: AddCephBackupStorageInput
}

export interface MutationaddAliyunEbsBackupStorageArgs {
  input: AddAliyunEbsBackupStorageInput
}

export interface MutationaddSftpBackupStorageArgs {
  input: AddSftpBackupStorageInput
}

export interface MutationshareInstanceOfferingToPublicArgs {
  input: ShareInstanceOfferingToPublicInput
}

export interface MutationrevokeInstanceOfferingShareingFromPublicArgs {
  input: RevokeInstanceOfferingSharingFromPublicInput
}

export interface MutationchangeInstanceOfferingStateArgs {
  input: ChangeInstanceOfferingStateInput
}

export interface MutationdeleteInstanceOfferingArgs {
  input: DeleteInstanceOfferingInput
}

export interface MutationcreateInstanceOfferingArgs {
  input: CreateInstanceOfferingInput
}

export interface MutationupdateInstanceOfferingArgs {
  input: UpdateInstanceOfferingInput
}

export interface MutationchangeInstanceOfferingArgs {
  input: ChangeInstanceOfferingInput
}

export interface MutationaddKvmHostArgs {
  input: AddKVMHostInput
}

export interface MutationaddXDragonHostArgs {
  input: AddXDragonHostInput
}

export interface MutationaddKVMHostFromConfigFileArgs {
  input: AddKVMHostFromConfigFileInput
}

export interface MutationenableHostsArgs {
  input: EnableHostInput
}

export interface MutationdisableHostsArgs {
  input: DisableHostInput
}

export interface MutationmaintenanceHostsArgs {
  input: MaintenanceHostInput
}

export interface MutationupdateHostArgs {
  input: UpdateHostInput
}

export interface MutationupdateKVMHostArgs {
  input: UpdateKVMHostInput
}

export interface MutationdeleteHostsArgs {
  input: DeleteHostInput
}

export interface MutationcloseHostIommuArgs {
  input: CloseHostIommuInput
}

export interface MutationopenHostIommuArgs {
  input: OpenHostIommuInput
}

export interface MutationreconnectHostsArgs {
  input: ReconnectHostInput
}

export interface MutationsetHostEptSupportArgs {
  input: SetHostEptSupportInput
}

export interface MutationcheckKVMHostConfigFileArgs {
  baremetalChassisInfo: Scalars['String']
}

export interface MutationstartVmInstanceArgs {
  input: StartVmInstanceInput
}

export interface MutationstopVmInstanceArgs {
  input: StopVmInstanceInput
}

export interface MutationupdateVmInstanceArgs {
  input: UpdateVmInstanceInput
}

export interface MutationpauseVmInstanceArgs {
  input: PauseVmInstanceInput
}

export interface MutationrecoverVmInstanceArgs {
  input: RecoverVmInstanceInput
}

export interface MutationresumeVmInstanceArgs {
  input: ResumeVmInstanceInput
}

export interface MutationrebootVmInstanceArgs {
  input: RebootVmInstanceInput
}

export interface MutationpoweroffVmInstanceArgs {
  input: PoweroffVmInstanceInput
}

export interface MutationsetVmInstanceGpuOfferingArgs {
  input: SetVmInstanceGpuDeviceSpecInput
}

export interface MutationresizeRootVolumeArgs {
  input: ResizeRootVolumeInput
}

export interface MutationchangeVmImageArgs {
  input: ChangeVmImageInput
}

export interface MutationdetachDataVolumeFromVmArgs {
  input: DetachDataVolumeFromVmInput
}

export interface MutationattachIsoToVmInstanceArgs {
  input: AttachIsoToVmInstanceInput
}

export interface MutationdetachIsoFromVmInstanceArgs {
  input: DetachIsoFromVmInstanceInput
}

export interface MutationremoveHaStickStragedyArgs {
  input: RemoveHaStickStragedyActionInput
}

export interface MutationsetHaStickStragedyArgs {
  input: SetHaStickStragedyActionInput
}

export interface MutationupdateVmPriorityArgs {
  input: UpdateVmPriorityInput
}

export interface MutationsetVmConsoleModeArgs {
  input: SetVmConsoleModeInput
}

export interface MutationdeleteVmInstanceArgs {
  input: DeleteVmInstanceInput
}

export interface MutationsetVmRDPArgs {
  input: SetVmRDPInput
}

export interface MutationsetVmUsbRedirectArgs {
  input: SetVmUsbRedirectInput
}

export interface MutationchangeVmPasswordArgs {
  input: ChangeVmPasswordInput
}

export interface MutationaddVmToAffinityGroupArgs {
  input: AddVmToAffinityGroupInput
}

export interface MutationremoveVmFromAffinityGroupArgs {
  input: RemoveVmFromAffinityGroupInput
}

export interface MutationstorageMigrateVmInstanceArgs {
  input: StorageMigrateVmInstanceInput
}

export interface MutationexpungeVmInstanceArgs {
  input: ExpungeVmInstanceInput
}

export interface MutationdeleteVmSshKeyArgs {
  input: DeleteVmSshKeyInput
}

export interface MutationsetVmSshKeyArgs {
  input: SetVmSshKeyInput
}

export interface MutationdeleteVmConsolePasswordArgs {
  input: DeleteVmConsolePasswordInput
}

export interface MutationsetVmConsolePasswordArgs {
  input: SetVmConsolePasswordInput
}

export interface MutationreimageVmInstanceArgs {
  input: ReimageVmInstanceInput
}

export interface MutationstartVmFromHostArgs {
  input: StartVmInstanceFromHostInput
}

export interface MutationsetVmBootOrderArgs {
  input: SetVmBootOrderInput
}

export interface MutationdeleteVmInstanceHaLevelArgs {
  input: DeleteVmHaLevelInput
}

export interface MutationlocalStorageMigrateVolumeArgs {
  input: LocalStorageMigrateVolumeInput
}

export interface MutationmigrateVmArgs {
  input: MigrateVmInput
}

export interface MutationcloneVmInstanceArgs {
  input: CloneVmInstanceInput
}

export interface MutationsetVmHaLevelArgs {
  input: SetVmHaLevelInput
}

export interface MutationsetVmQgaArgs {
  input: SetVmQgaInput
}

export interface MutationsetVmCleanTrafficArgs {
  input: SetVmCleanTrafficInput
}

export interface MutationsetVmBootModeArgs {
  input: SetVmBootModeInput
}

export interface MutationopenConsoleAccessArgs {
  input: OpenConsoleInput
}

export interface MutationsetVmMonitorNumberArgs {
  input: SetVmMonitorNumberInput
}

export interface MutationupdateVmInstanceCPUPinningArgs {
  input: UpdateVmInstanceCPUPinningInput
}

export interface MutationcreateVmInstanceArgs {
  input: CreateVmInstanceInput
}

export interface MutationattachGuestToolsIsoToVmArgs {
  input: AttachGuestToolsIsoToVmInput
}

export interface MutationcreateAffinityGroupArgs {
  input: CreateAffinityGroupInput
}

export interface MutationdeleteAffinityGroupArgs {
  input: DeleteAffinityGroupInput
}

export interface MutationupdateAffinityGroupArgs {
  input: UpdateAffinityGroupInput
}

export interface MutationchangeAffinityGroupStateArgs {
  input: ChangeAffinityGroupStateInput
}

export interface MutationattachVmInAffinityGroupArgs {
  input: AttachVmInAffinityGroupInput
}

export interface MutationdetachVmFromAffinityGroupArgs {
  input: DetachVmFromAffinityGroupInput
}

export interface MutationcreatePortForwardingArgs {
  input: CreatePortForwardingInput
}

export interface MutationupdatePortForwardingArgs {
  input: UpdatePortForwardingInput
}

export interface MutationdeletePortForwardingArgs {
  input: DeletePortForwardingInput
}

export interface MutationattachPortForwardingArgs {
  input: AttachPortForwardingInput
}

export interface MutationdetachPortForwardingArgs {
  input: DetachPortForwardingInput
}

export interface MutationattachL3NetworkToVmNicArgs {
  input: AttachL3NetworkToVmNicInput
}

export interface MutationchangeVmNicTypeArgs {
  input: ChangeVmNicTypeInput
}

export interface MutationdeleteNicQosArgs {
  input: DeleteNicQosInput
}

export interface MutationdeleteVmStaticIpArgs {
  input: DeleteVmStaticIpInput
}

export interface MutationupdateVmNicDriverArgs {
  input: UpdateVmNicDriverInput
}

export interface MutationsetNicQosArgs {
  input: SetNicQosInput
}

export interface MutationsetVmStaticIpArgs {
  input: SetVmStaticIpInput
}

export interface MutationupdateVmNicMacArgs {
  input: UpdateVmNicMacInput
}

export interface MutationcreateBareMetal2ProvisionNetworkArgs {
  input: CreateBareMetal2ProvisionNetworkInput
}

export interface MutationdeleteBareMetal2ProvisionNetworkArgs {
  input: DeleteBareMetal2ProvisionNetworkInput
}

export interface MutationupdateBareMetal2ProvisionNetworkArgs {
  input: UpdateBareMetal2ProvisionNetworkInput
}

export interface MutationchangeProvisionNetworkArgs {
  input: ChangeProvisionNetworkToClusterInput
}

export interface MutationcheckIpAvailabilityArgs {
  input: CheckIpAvailabilityParam
}

export interface MutationaddIpRangeArgs {
  input: AddIpRangeInput
}

export interface MutationaddIpRangeByCidrArgs {
  input: AddIpRangeByCidrInput
}

export interface MutationdeleteIpRangeArgs {
  input: DeleteIpRangeInput
}

export interface MutationaddDnsToL3NetworkArgs {
  input: AddDnsToL3NetworkInput
}

export interface MutationremoveDnsFromL3NetworkArgs {
  input: RemoveDnsFromL3NetworkInput
}

export interface MutationdeleteL3NetworkArgs {
  input: DeleteL3NetworkInput
}

export interface MutationsetL3NetworkMtuArgs {
  input: SetL3NetworkMtuInput
}

export interface MutationupdateL3NetworkArgs {
  input: UpdateL3NetworkInput
}

export interface MutationcreateL3NetworkArgs {
  input: CreateL3NetworkInput
}

export interface MutationattachVpcRouterToL3NetworkArgs {
  input: AttachVpcRouterToL3NetworkInput
}

export interface MutationdetachL3NetworkFromVmArgs {
  input: DetachL3NetworkFromVmInput
}

export interface MutationdetachNicFromVmArgs {
  input: DetachL3NetworkFromVmInput
}

export interface MutationcreateDiskOfferingArgs {
  input: CreateDiskOfferingInput
}

export interface MutationdeleteDiskOfferingArgs {
  input: DeleteDiskOfferingInput
}

export interface MutationchangeDiskOfferingStateArgs {
  input: ChangeDiskOfferingStateInput
}

export interface MutationupdateDiskOfferingArgs {
  input: UpdateDiskOfferingInput
}

export interface MutationshareDiskOfferingToPublicArgs {
  input: ShareDiskOfferingToPublicInput
}

export interface MutationrevokeDiskOfferingFromPublicArgs {
  input: RevokeDiskOfferingFromPublicInput
}

export interface MutationdeleteCdRomsArgs {
  input: DeleteCdRomInput
}

export interface MutationsetVmInstanceDefaultCdRomArgs {
  input: SetVmInstanceDefaultCdRomInput
}

export interface MutationcreateVmCdRomArgs {
  input: CreateVmCdRomInput
}

export interface MutationcreateVolumeSnapshotArgs {
  input: CreateVolumeSnapshotInput
}

export interface MutationdeleteVolumeSnapshotArgs {
  input: DeleteVolumeSnapshotInput
}

export interface MutationrevertVolumeFromSnapshotArgs {
  input: RevertVolumeFromSnapshotInput
}

export interface MutationungroupVolumeSnapshotGroupArgs {
  input: UngroupVolumeSnapshotGroupInput
}

export interface MutationupdateVolumeSnapshotArgs {
  input: UpdateVolumeSnapshotInput
}

export interface MutationenablePciDeviceSpecArgs {
  input: UpdatePciDeviceSpecInput
}

export interface MutationdisablePciDeviceSpecArgs {
  input: UpdatePciDeviceSpecInput
}

export interface MutationsetPciDeviceSpecRomArgs {
  input: UpdatePciDeviceSpecRomInput
}

export interface MutationenableMdevDeviceSpecArgs {
  input: UpdateMdevDeviceSpecInput
}

export interface MutationdisableMdevDeviceSpecArgs {
  input: UpdateMdevDeviceSpecInput
}

export interface MutationenableVGpuDeviceSpecArgs {
  input: UpdateVGpuDeviceSpecInput
}

export interface MutationdisableVGpuDeviceSpecArgs {
  input: UpdateVGpuDeviceSpecInput
}

export interface MutationcreateListenerArgs {
  input: CreateListenerInput
}

export interface MutationchangeAutoScalingGroupStateArgs {
  input: ChangeAutoScalingGroupStateInput
}

export interface MutationupdateAlarmArgs {
  input: UpdateAlarmInput
}

export interface MutationupdateAddingNewInstanceRuleArgs {
  input: UpdateScalingRuleInput
}

export interface MutationupdateRemovalInstanceRuleArgs {
  input: UpdateScalingRemovalRuleInput
}

export interface MutationcreateAutoScalingGroupArgs {
  input: CreateAutoScalingGroupActionInput
}

export interface MutationdeleteAutoScalingGroupArgs {
  input: DeleteAutoScalingGroupActionInput
}

export interface MutationupdateAutoScalingGroupArgs {
  input: UpdateAutoScalingGroupInput
}

export interface MutationupdateAutoScalingVmTemplateArgs {
  input: UpdateAutoScalingVmTemplateInput
}

export interface MutationchangeSecurityGroupStateArgs {
  input: ChangeSecurityGroupStateInput
}

export interface MutationdeleteSecurityGroupArgs {
  input: DeleteSecurityGroupInput
}

export interface MutationattachSecurityGroupToL3NetworkArgs {
  input: AttachSecurityGroupToL3NetworkInput
}

export interface MutationdetachSecurityGroupFromL3NetworkArgs {
  input: DetachSecurityGroupFromL3NetworkInput
}

export interface MutationaddSecurityGroupRuleArgs {
  input: AddSecurityGroupRuleInput
}

export interface MutationdeleteSecurityGroupRuleArgs {
  input: DeleteSecurityGroupRuleInput
}

export interface MutationaddVmNicToSecurityGroupArgs {
  input: AddVmNicToSecurityGroupInput
}

export interface MutationdeleteVmNicFromSecurityGroupArgs {
  input: DeleteVmNicFromSecurityGroupInput
}

export interface MutationcreateSecurityGroupArgs {
  input: CreateSecurityGroupInput
}

export interface MutationupdateSecurityGroupArgs {
  input: UpdateSecurityGroupInput
}

export interface MutationcreateVipNetworkArgs {
  input: CreateVipNetworkActionInput
}

export interface MutationaddVipNetworkQosArgs {
  input: AddVipNetworkQosActionInput
}

export interface MutationdeleteVipNetworkArgs {
  input: DeleteVipNetworkActionInput
}

export interface MutationdeleteVipNetworkQosArgs {
  input: DeleteVipNetworkQosActionInput
}

export interface MutationupdateVipNetworkArgs {
  input: UpdateVipNetworkActionInput
}

export interface MutationdeleteFlowMetersArgs {
  input: DeleteFlowMeterInput
}

export interface MutationupdateFlowMetersArgs {
  input: UpdateFlowMeterInput
}

export interface MutationaddVRouterNetworksToFlowMeterArgs {
  input: AddVRouterNetworksToFlowMeterInput
}

export interface MutationcreateFlowMeterArgs {
  input: CreateFlowMeterInput
}

export interface MutationupdateFlowCollectorsArgs {
  input: UpdateFlowCollectorInput
}

export interface MutationremoveVRouterNetworksFromFlowMeterArgs {
  input: RemoveVRouterNetworksFromFlowMeterInput
}

export interface MutationdeleteVpcConsolePasswordArgs {
  input: DeleteVpcConsolePasswordInput
}

export interface MutationsetVpcConsolePasswordArgs {
  input: SetVpcConsolePasswordInput
}

export interface MutationstartVpcArgs {
  input: StartVpcInput
}

export interface MutationstopVpcArgs {
  input: StopVpcInput
}

export interface MutationrebootVpcArgs {
  input: RebootVpcInput
}

export interface MutationreconnectVpcArgs {
  input: ReconnectVpcInput
}

export interface MutationcreateVpcArgs {
  input: CreateVpcInput
}

export interface MutationaddDnsToVpcArgs {
  input: AddDnsToVpcInput
}

export interface MutationremoveDnsFromVpcArgs {
  input: RemoveDnsFromVpcInput
}

export interface MutationdeleteVpcArgs {
  input: DeleteVpcInput
}

export interface MutationsetVpcHaStickStragedyArgs {
  input: SetVpcHaStickStragedyActionInput
}

export interface MutationremoveVpcHaStickStragedyArgs {
  input: RemoveVpcHaStickStragedyActionInput
}

export interface MutationcoldMigrateVpcArgs {
  input: ColdMigrateVpcInput
}

export interface MutationmigrateVpcArgs {
  input: MigrateVpcInput
}

export interface MutationupdateVpcArgs {
  input: UpdateVpcInput
}

export interface MutationsetVpcVRouterDistributedRoutingEnabledArgs {
  input: SetVpcVRouterDistributedRoutingEnabledInput
}

export interface MutationsetVpcVRouterNetworkServiceStateArgs {
  input: SetVpcVRouterNetworkServiceStateInput
}

export interface MutationopenStsArgs {
  input: OpenStsInput
}

export interface MutationcloseStsArgs {
  input: CloseStsInput
}

export interface MutationupdateVpcDefaultNetworkArgs {
  input: UpdateVpcDefaultNetworkInput
}

export interface MutationcreateMulticastRouterArgs {
  input: CreateMulticastRouterInput
}

export interface MutationdeleteMulticastRouterArgs {
  input: DeleteMulticastRouterInput
}

export interface MutationchangeMulticastRouterStateArgs {
  input: ChangeMulticastRouterStateInput
}

export interface MutationaddRendezvousPointToMulticastRouterArgs {
  input: AddRendezvousPointToMulticastRouterInput
}

export interface MutationremoveRendezvousPointFromMulticastRouterArgs {
  input: RemoveRendezvousPointFromMulticastRouterInput
}

export interface MutationdeleteVpcHaGroupArgs {
  input: DeleteVpcHaGroupInput
}

export interface MutationcreateVpcHaGroupArgs {
  input: CreateVpcHaGroupInput
}

export interface MutationaddVpcToHaGroupArgs {
  input: AddVpcToHaGroupInput
}

export interface MutationupdateVpcHaGroupArgs {
  input: UpdateVpcHaGroupInput
}

export interface MutationchangeVpcHaGroupMonitorIpsArgs {
  input: ChangeVpcHaGroupMonitorIpsInput
}

export interface MutationshareVirtualRouterOfferingToPublicArgs {
  input: ShareVirtualRouterOfferingToPublicInput
}

export interface MutationupdateVirtualRouterOfferingsArgs {
  input: UpdateVirtualRouterOfferingInput
}

export interface MutationdeleteVirtualRouterOfferingsArgs {
  input: DeleteVirtualRouterOfferingInput
}

export interface MutationcreateVirtualRouterOfferingArgs {
  input: CreateVirtualRouterOfferingInput
}

export interface MutationrevokeVirtualRouterOfferingSharingFromPublicArgs {
  input: RevokeVirtualRouterOfferingSharingFromPublicInput
}

export interface MutationchangeVirtualRouterOfferingStateArgs {
  input: ChangeVirtualRouterOfferingStateInput
}

export interface MutationcheckScsiLunClusterStatusArgs {
  input: CheckScsiLunClusterStatusInput
}

export interface MutationattachScsiLunToVmInstancesArgs {
  input: AttachScsiLunToVmInstanceInput
}

export interface MutationdetachScsiLunFromVmInstanceArgs {
  input: DetachScsiLunFromVmInstanceInput
}

export interface MutationupdateUsbArgs {
  input: UpdateUsbInput
}

export interface MutationattachUsbDeviceToVmArgs {
  input: AttachUsbDeviceToVmInput
}

export interface MutationdetachUsbDeviceToVmArgs {
  input: DetachUsbDeviceToVmInput
}

export interface MutationupdateUsbDeviceArgs {
  input: UpdateUsbDeviceInput
}

export interface MutationattachPciDeviceToVmArgs {
  input: AttachPciDeviceToVMInput
}

export interface MutationdetachPciDeviceFromVmArgs {
  input: DetachPciDeviceFromVMInput
}

export interface MutationgenerateSriovPciDevicesArgs {
  input: GenerateSriovPciDeviceInput
}

export interface MutationunGenerateSriovPciDeviceArgs {
  input: UnGenerateSriovPciDeviceInput
}

export interface MutationupdatePciDeviceArgs {
  input: UpdatePciDeviceInput
}

export interface MutationattachMdevDeviceToVmArgs {
  input: AttachMdevDeviceToVMInput
}

export interface MutationdetachMdevDeviceFromVmArgs {
  input: DetachMdevDeviceFromVMInput
}

export interface MutationgenerateMdevDeviceArgs {
  input: GenerateMdevDeviceInput
}

export interface MutationunGenerateMdevDeviceArgs {
  input: UnGenerateMdevDeviceInput
}

export interface MutationattachVGpuToVmInstanceArgs {
  input: AttachVGpuToVmInstanceInput
}

export interface MutationdetachVGpuFromVmInstanceArgs {
  input: DetachVGpuFromVmInstanceInput
}

export interface MutationupdateVGPUDeviceArgs {
  input: UpdateVGPUDeviceInput
}

export interface MutationdeleteL2NetworksArgs {
  input: DeleteL2NetworkActionInput
}

export interface MutationrevokeL2NetworkToPublicArgs {
  input: ShareL2NetworkToPublicActionInput
}

export interface MutationshareL2NetworkToPublicArgs {
  input: ShareL2NetworkToPublicActionInput
}

export interface MutationupdateL2NetworkArgs {
  input: UpdateL2NetworkActionInput
}

export interface MutationsetL2NetworkSrIovArgs {
  input: SetL2NetworkSrIovActionInput
}

export interface MutationcreateL2NetworkArgs {
  input: CreateL2NetworkActionInput
}

export interface MutationupdateVCenterVmArgs {
  input: UpdateVCenterVmInput
}

export interface MutationdeleteVCenterVmArgs {
  input: DeleteVCenterVmInput
}

export interface MutationexpungeVCenterVmArgs {
  input: ExpungeVCenterVmInput
}

export interface MutationcreateVCenterNetworkArgs {
  input: CreateVCenterNetworkInput
}

export interface MutationaddCephPrimaryStoragePoolArgs {
  input: AddCephPrimaryStoragePoolInput
}

export interface MutationupdateCephPrimaryStoragePoolArgs {
  input: UpdateCephPrimaryStoragePoolInput
}

export interface MutationdeleteCephPrimaryStoragePoolListArgs {
  input: DeleteCephPrimaryStoragePoolListInput
}

export interface MutationcleanUpTrashListArgs {
  input: CleanUpTrashListInput
}

export interface MutationaddCephMonArgs {
  input: AddCephMonInput
}

export interface MutationupdateCephMonArgs {
  input: UpdateCephMonInput
}

export interface MutationdeleteCephMonListArgs {
  input: DeleteCephMonListInput
}

export interface MutationaddIscsiServerArgs {
  input: AddIscsiServerInput
}

export interface MutationupdateIscsiServersArgs {
  input: UpdateIscsiServerInput
}

export interface MutationdeleteIscsiServersArgs {
  input: DeleteIscsiServerInput
}

export interface MutationrefreshIscsiServersArgs {
  input: RefreshIscsiServerInput
}

export interface MutationattachIscsiServerToClustersArgs {
  input: AttachIscsiServerToClusterInput
}

export interface MutationdetachIscsiServerFromClustersArgs {
  input: DetachIscsiServerFromClusterInput
}

export interface MutationrefreshFiberChannelStoragesArgs {
  input: RefreshFiberChannelStorageInput
}

export interface MutationaddSharedBlockToSharedBlockGroupArgs {
  input: AddSharedBlockToSharedBlockGroupInput
}

export interface MutationrefreshSharedblockDeviceCapacityArgs {
  input: RefreshSharedblockDeviceCapacityInput
}

export interface MutationcreateAlarmArgs {
  input: CreateAlarmInput
}

export interface MutationsubscribeEventArgs {
  input: SubscribeEventInput
}

export interface MutationenableAlarmsArgs {
  input: EnableZWatchAlarmInput
}

export interface MutationdeleteAlarmsArgs {
  input: DeleteZWatchAlarmInput
}

export interface MutationdisableAlarmsArgs {
  input: DisableZWatchAlarmInput
}

export interface MutationunsubscribeEventArgs {
  input: UnsubscribeEventInput
}

export interface MutationupdateAlarmLabelArgs {
  input: UpdateAlarmLabelInput
}

export interface MutationaddActionToAlarmArgs {
  input: AddActionToAlarmInput
}

export interface MutationupdateSubscribeEventArgs {
  input: UpdateSubscribeEventInput
}

export interface MutationremoveActionFromAlarmArgs {
  input: RemoveActionFromAlarmInput
}

export interface MutationaddActionToEventSubscriptionArgs {
  input: AddActionToEventSubscriptionInput
}

export interface MutationremoveActionFromEventSubscriptionArgs {
  input: RemoveActionFromEventSubscriptionInput
}

export interface MutationaddSNSDingTalkAtPersonArgs {
  input: AddSNSDingTalkAtPersonInput
}

export interface MutationaddEmailAddressArgs {
  input: AddEmailAddressToEndpointInput
}

export interface MutationaddSmsReceiverArgs {
  input: AddSmsReceiverInput
}

export interface MutationchangeSNSApplicationEndpointArgs {
  input: ChangeEndpointInput
}

export interface MutationcreateDingTalkEndpointArgs {
  input: CreateDingTalkEndpointInput
}

export interface MutationcreateEmailEndpointArgs {
  input: CreateEmailEndpointInput
}

export interface MutationcreateHttpEndpointArgs {
  input: CreateHttpEndpointInput
}

export interface MutationcreateAliyunSmsEndpointArgs {
  input: CreateAliyunSmsEndpointInput
}

export interface MutationcreateSNSMicrosoftTeamsEndpointArgs {
  input: CreateSNSMicrosoftTeamsEndpointInput
}

export interface MutationdeleteSNSApplicationEndpointArgs {
  input: DeleteEndpointInput
}

export interface MutationdeleteEmailAddressToEndpointArgs {
  input: DeleteEmailAddressToEndpointInput
}

export interface MutationremoveSNSDingTalkAtPersonArgs {
  input: RemoveSNSDingTalkAtPersonInput
}

export interface MutationmodifyDingTalkAtPersonArgs {
  input: ModifyDingTalkAtPersonInput
}

export interface MutationremoveSmsReceiverArgs {
  input: RemoveSmsReceiverInput
}

export interface MutationupdateSNSApplicationEndpointArgs {
  input: UpdateEndpointInput
}

export interface MutationupdateEmailAddressToEndpointArgs {
  input: UpdateEmailAddressToEndpointInput
}

export interface MutationvalidateAliyunSmsEndpointArgs {
  input: ValidateAliyunSmsEndpointInput
}

export interface MutationaddAlarmToEndpointArgs {
  input: AddAlarmToEndPointInput
}

export interface MutationremoveAlarmFromEndpointArgs {
  input: RemoveAlarmFromEndPointInput
}

export interface MutationupdateSmsReceiverArgs {
  input: UpdateSmsReceiverInput
}

export interface MutationupdateAllAlarmHistoriesAsReadArgs {
  input: UpdateAllAlarmHistoriesAsReadInput
}

export interface MutationupdateEventDataAsReadArgs {
  input: UpdateEventDataInput
}

export interface MutationupdateAlarmDataAsReadArgs {
  input: UpdateAlarmDataInput
}

export interface MutationackAlarmDataArgs {
  input: AckAlarmDataInput
}

export interface MutationupdateAlertDataAckArgs {
  input: UpdateAlertDataAckInput
}

export interface MutationupdateThirdpartyAlertsAsReadArgs {
  input: UpdateThirdpartyAlertsInput
}

export interface MutationdeleteThirdpartyPlatformArgs {
  input: DeleteThirdpartyPlatformInput
}

export interface MutationcreateThirdpartyPlatformArgs {
  input: CreateThirdpartyPlatformInput
}

export interface MutationupdateThirdpartyPlatformArgs {
  input: UpdateThirdpartyPlatformInput
}

export interface MutationcreateResourceStackArgs {
  input: CreateResourceStackInput
}

export interface MutationupdateResourceStackArgs {
  input: UpdateResourceStackInput
}

export interface MutationdeleteResourceStackArgs {
  input: DeleteResourceStackInput
}

export interface MutationaddStackTemplateArgs {
  input: AddStackTemplateInput
}

export interface MutationdeleteStackTemplateArgs {
  input: DeleteStackTemplateInput
}

export interface MutationupdateStackTemplateArgs {
  input: UpdateStackTemplateInput
}

export interface MutationenabledStackTemplateArgs {
  input: EnabledStackTemplateInput
}

export interface MutationdisabledStackTemplateArgs {
  input: DisabledStackTemplateInput
}

export interface MutationcreateSNSTextTemplateArgs {
  input: CreateSNSTextTemplateInput
}

export interface MutationcreateAliyunSmsSNSTextTemplateArgs {
  input: CreateAliyunSmsSNSTextTemplateInput
}

export interface MutationdeleteSNSTextTemplateArgs {
  input: DeleteSNSTextTemplateInput
}

export interface MutationupdateSNSTextTemplateArgs {
  input: UpdateSNSTextTemplateInput
}

export interface MutationupdateAliyunSmsSNSTextTemplateArgs {
  input: UpdateAliyunSmsSNSTextTemplateInput
}

export interface MutationcreateMonitorTemplateArgs {
  input: CreateMonitorTemplateInput
}

export interface MutationcloneMonitorTemplateArgs {
  input: CloneMonitorTemplateInput
}

export interface MutationdeleteMonitorTemplateArgs {
  input: DeleteMonitorTemplateInput
}

export interface MutationapplyMonitorTemplateToMonitorGroupInMonitorTemplateArgs {
  input: ApplyMonitorTemplateToMonitorGroupInMonitorTemplateInput
}

export interface MutationcreateMonitorGroupArgs {
  input: CreateMonitorGroupInput
}

export interface MutationdeleteMonitorGroupArgs {
  input: DeleteMonitorGroupInput
}

export interface MutationupdateMonitorGroupArgs {
  input: UpdateMonitorGroupInput
}

export interface MutationrevokeMonitorTemplateFromMonitorGroupArgs {
  input: RevokeMonitorTemplateFromMonitorGroupInput
}

export interface MutationapplyMonitorTemplateToMonitorGroupArgs {
  input: ApplyMonitorTemplateToMonitorGroupInput
}

export interface MutationaddInstanceToMonitorGroupArgs {
  input: AddInstanceToMonitorGroupInput
}

export interface MutationremoveInstanceFromMonitorGroupArgs {
  input: RemoveInstanceFromMonitorGroupInput
}

export interface MutationchangeActiveAlarmStateArgs {
  input: ChangeActiveAlarmStateInput
}

export interface MutationaddMetricRuleTemplateArgs {
  input: AddMetricRuleTemplateInput
}

export interface MutationdeleteMetricRuleTemplateArgs {
  input: DeleteMetricRuleTemplateInput
}

export interface MutationupdateMetricRuleTemplateArgs {
  input: UpdateMetricRuleTemplateInput
}

export interface MutationaddEventRuleTemplateArgs {
  input: AddEventRuleTemplateInput
}

export interface MutationdeleteEventRuleTemplateArgs {
  input: DeleteEventRuleTemplateInput
}

export interface MutationupdateEventRuleTemplateArgs {
  input: UpdateEventRuleTemplateActionInput
}

export interface MutationscanDatabaseBackupsArgs {
  input: ScanDatabaseBackupActionInput
}

export interface MutationsyncBackupToRemoteArgs {
  input: SyncBackupDataToRemoteInput
}

export interface MutationdeleteBackupDataListArgs {
  input: DeleteBackupDataListInput
}

export interface MutationcreateBackupDataArgs {
  input: CreateBackupInput
}

export interface MutationsyncBackupDataToLocalArgs {
  input: SyncBackupDataToLocalInput
}

export interface MutationexportDatabaseBackupUrlArgs {
  input: ExportBackupDatabaseUrlListInput
}

export interface MutationrecoverDatabaseBackupArgs {
  input: RecoverDatabaseBackupActionInput
}

export interface MutationrecoverBackupDataArgs {
  input: RecoverBackupInput
}

export interface MutationsyncDatabaseBackupToRemoteArgs {
  input: SyncDatabaseBackupToRemoteInput
}

export interface MutationdeleteDatabaseBackupDataListArgs {
  input: DeleteDatabaseBackupDataListInput
}

export interface MutationdeleteIAM2ProjectTemplateArgs {
  input: DeleteIAM2ProjectTemplateInput
}

export interface MutationcreateIAM2ProjectTemplateArgs {
  input: CreateIAM2ProjectTemplateInput
}

export interface MutationupdateIAM2ProjectTemplateArgs {
  input: UpdateIAM2ProjectTemplateInput
}

export interface MutationdeleteIAM2OrganizationsArgs {
  input: DeleteIAM2OrganizationInput
}

export interface MutationupdateIAM2OrganizationArgs {
  input: UpdateIAM2OrganizationInput
}

export interface MutationaddIAM2VirtualIDsToOrganizationArgs {
  input: AddIAM2VirtualIDsToOrganizationInput
}

export interface MutationsetOrganizationSupervisorArgs {
  input: SetOrganizationSupervisorInput
}

export interface MutationremoveIAM2VirtualIDsFromOrganizationArgs {
  input: RemoveIAM2VirtualIDsFromOrganizationInput
}

export interface MutationcreateIAM2OrganizationArgs {
  input: CreateIAM2OrganizationInput
}

export interface MutationdeleteThirdPartyAuthsArgs {
  input: DeleteThirdPartyAuthInput
}

export interface MutationupdateThirdPartyAuthArgs {
  input: UpdateThirdPartyAuthInput
}

export interface MutationupdateThirdPartyAuthConfigInfoArgs {
  input: UpdateThirdPartyAuthConfigInfoInput
}

export interface MutationsyncThirdPartyAuthArgs {
  input: SyncThirdPartyAuthInput
}

export interface MutationtestConnectionThirdPartyArgs {
  input: TestConnectionThirdPartyAuthInput
}

export interface MutationsettingAutoSyncThirdPartyAuthArgs {
  input: SettingAutoSyncThirdPartyAuthInput
}

export interface MutationupdateThirdPartyAuthMappingInfoArgs {
  input: UpdateThirdPartyAuthMappingInfoInput
}

export interface MutationtestThirdPartyAuthSyncRulesArgs {
  input: TestThirdPartyAuthSyncRulesInput
}

export interface MutationaddThirdPartyAuthArgs {
  input: AddThirdPartyAuthInput
}

export interface MutationaddThirdPartyAuthSyncRulesArgs {
  input: AddThirdPartyAuthSyncRulesInput
}

export interface MutationaddGroupsToProjectArgs {
  input: AddGroupsToProjectInput
}

export interface MutationaddGroupsToProjectsArgs {
  input: AddGroupsToProjectsInput
}

export interface MutationaddIAM2VirtualIDRoleGroupsArgs {
  input: AddIAM2VirtualIDGroupRoleInput
}

export interface MutationaddIAM2VirtualIDsToGroupMainViewArgs {
  input: AddIAM2VirtualIDsToGroupMainViewInput
}

export interface MutationdeleteVirtualIDGroupsArgs {
  input: DeleteIAM2VirtualIDGroupInput
}

export interface MutationmodifyGroupRoleArgs {
  input: ModifyGroupRoleInput
}

export interface MutationremoveGroupFromProjectsArgs {
  input: RemoveGroupFromProjectsInput
}

export interface MutationremoveIAM2VirtualIDFromGroupsArgs {
  input: RemoveIAM2VirtualIDFromGroupsInput
}

export interface MutationremoveIAM2VirtualIDRoleGroupsArgs {
  input: RemoveIAM2VirtualIDGroupRoleInput
}

export interface MutationupdateIAM2VirtualIDGroupArgs {
  input: UpdateIAM2VirtualIDGroupInput
}

export interface MutationuserAddToGroupsArgs {
  input: UserAddToGroupsInput
}

export interface MutationcreateIAM2VirtualIDGroupArgs {
  input: CreateIAM2VirtualIDGroupInput
}

export interface MutationenableIAM2ProjectArgs {
  input: ChangeIAM2ProjectStateInput
}

export interface MutationdisableIAM2ProjectArgs {
  input: ChangeIAM2ProjectStateInput
}

export interface MutationstopAllResourcesInIAM2ProjectArgs {
  input: ChangeIAM2ProjectStateInput
}

export interface MutationrecoverIAM2ProjectArgs {
  input: ReoverIAM2ProjectInput
}

export interface MutationaddIAM2VirtualIDsToProjectArgs {
  input: AddIAM2VirtualIDsToProjectInput
}

export interface MutationremoveIAM2VirtualIDsFromProjectsArgs {
  input: RemoveIAM2VirtualIDsFromProjectsInput
}

export interface MutationsetIAM2ProjectIAM2OrganizationArgs {
  input: SetIAM2ProjectIAM2OrganizationInput
}

export interface MutationdetachIAM2VirtualIDsFromProjectArgs {
  input: DetachIAM2ProjectFromIAM2OrganizationInput
}

export interface MutationchangeAccountPriceTableBindingArgs {
  input: ChangeAccountPriceTableBindingInput
}

export interface MutationcreateIAM2ProjectTemplateFromProjectArgs {
  input: CreateIAM2ProjectTemplateFromProjectInput
}

export interface MutationdeleteIAM2ProjectArgs {
  input: DeleteIAM2ProjectInput
}

export interface MutationexpungeIAM2ProjectArgs {
  input: ExpungeIAM2ProjectInput
}

export interface MutationupdateIAM2ProjectArgs {
  input: UpdateIAM2ProjectInput
}

export interface MutationupdateIAM2ProjectQuotaArgs {
  input: UpdateIAM2ProjectQuotaInput
}

export interface MutationupdateIAM2ProjectRetirePolicyArgs {
  input: UpdateIAM2ProjectRetirePolicyInput
}

export interface MutationrecoverRetiredIAM2ProjectArgs {
  input: ReoverRetiredIAM2ProjectInput
}

export interface MutationcreateIAM2ProjectArgs {
  input: CreateIAM2ProjectInput
}

export interface MutationsetIAM2ProjectAdminArgs {
  input: SetIAM2ProjectAdminInput
}

export interface MutationupdateIAM2VirtualIDRoleInIAM2ProjectArgs {
  input: UpdateIAM2VirtualIDRoleInIAM2ProjectInput
}

export interface MutationaddRolesToIAM2VirtualIDArgs {
  input: AddRolesToIAM2VirtualIDInput
}

export interface MutationremoveRolesFromIAM2VirtualIDArgs {
  input: RemoveRolesToIAM2VirtualIDInput
}

export interface MutationcreateRoleArgs {
  input: CreateRoleInput
}

export interface MutationdeleteRoleArgs {
  input: DeleteRoleInput
}

export interface MutationupdateRoleArgs {
  input: UpdateRoleInput
}

export interface MutationupdateRoleUIPrivilegeArgs {
  input: UpdateRoleUIPrivilegeInput
}

export interface MutationpassAdvancedTicketArgs {
  input: PassAdvanceTicketInput
}

export interface MutationpassTicketArgs {
  input: PassTicketInput
}

export interface MutationrejectTicketArgs {
  input: RejectTicketInput
}

export interface MutationchangeTicketProcessStateArgs {
  input: ChangeTicketProcessStateInput
}

export interface MutationdeleteTicketProcessArgs {
  input: DeleteTicketProcessInput
}

export interface MutationupdateTicketProcessArgs {
  input: UpdateTicketProcessInput
}

export interface MutationupdateTicketProcessTicketTypesArgs {
  input: UpdateTicketProcessTicketTypesInput
}

export interface MutationcreateTicketProcessArgs {
  input: CreateTicketProcessInput
}

export interface MutationceateTicketArgs {
  input: CreateTicketInput
}

export interface MutationdeleteTicketArgs {
  input: DeleteTicketInput
}

export interface MutationreopenTicketArgs {
  input: ReopenTicketInput
}

export interface MutationcancelTicketArgs {
  input: CancelTicketInput
}

export interface MutationupdateTicketArgs {
  input: UpdateTicketInput
}

export interface MutationaddPreconfigurationTemplateArgs {
  input: AddPreconfigurationTemplateInput
}

export interface MutationchangePreconfigurationTemplateStateArgs {
  input: ChangePreconfigurationTemplateStateInput
}

export interface MutationdeletePreConfigurationTemplateArgs {
  input: DeletePreconfigurationTemplateInput
}

export interface MutationupdatePreconfigurationTemplateArgs {
  input: UpdatePreconfigurationTemplateInput
}

export interface MutationstartBaremetalInstanceArgs {
  input: StartBaremetalInstanceInput
}

export interface MutationstopBaremetalInstanceArgs {
  input: StopBaremetalInstanceInput
}

export interface MutationrebootBaremetalInstanceArgs {
  input: RebootBaremetalInstanceInput
}

export interface MutationrecoverBaremetalInstanceArgs {
  input: RecoverBaremetalInstanceInput
}

export interface MutationexpungeBaremetalInstanceArgs {
  input: ExpungeBaremetalInstanceInput
}

export interface MutationdeleteBaremetalInstanceArgs {
  input: DeleteBaremetalInstanceInput
}

export interface MutationupdateBaremetalInstanceArgs {
  input: UpdateBaremetalInstanceInput
}

export interface MutationopenBaremetalInstanceConsoleArgs {
  input: OpenBaremetalInstanceConsoleInput
}

export interface MutationcreateBaremetalInstanceArgs {
  input: CreateBaremetalInstanceInput
}

export interface MutationstopBaremetalPxeServerArgs {
  input: StopBaremetalPxeServerInput
}

export interface MutationstartBaremetalPxeServerArgs {
  input: StartBaremetalPxeServerInput
}

export interface MutationreconnectBaremetalPxeServerArgs {
  input: ReconnectBaremetalPxeServerInput
}

export interface MutationdeleteBaremetalPxeServerArgs {
  input: DeleteBaremetalPxeServerInput
}

export interface MutationcreateBaremetalPxeServerArgs {
  input: CreateBaremetalPxeServerInput
}

export interface MutationupdateBaremetalPxeServerArgs {
  input: UpdateBaremetalPxeServerInput
}

export interface MutationattachBaremetalPxeServerArgs {
  input: AttachBaremetalPxeServerInput
}

export interface MutationdetachBaremetalPxeServerArgs {
  input: DetachBaremetalPxeServerInput
}

export interface MutationinspectBaremetalChassisArgs {
  input: InspectBaremetalChassisInput
}

export interface MutationcreateBaremetalChassisArgs {
  input: CreateBaremetalChassisInput
}

export interface MutationbatchCreateBaremetalChassisArgs {
  input: BatchCreateBaremetalChassisInput
}

export interface MutationdeleteBaremetalChassisArgs {
  input: DeleteBaremetalChassisInput
}

export interface MutationupdateBaremetalChassisArgs {
  input: UpdateBaremetalChassisInput
}

export interface MutationaddBareMetal2ChassisArgs {
  input: AddBareMetal2IpmiChassisInput
}

export interface MutationaddBareMetal2ChassisFromConfigFileArgs {
  input: AddBareMetal2ChassisFromConfigFileInput
}

export interface MutationchangeBareMetal2ChassisStateArgs {
  input: ChangeBareMetal2ChassisStateInput
}

export interface MutationdeleteBareMetal2ChassisArgs {
  input: DeleteBareMetal2ChassisInput
}

export interface MutationinspectBareMetal2ChassisArgs {
  input: InspectBareMetal2ChassisInput
}

export interface MutationpowerOffBareMetal2ChassisArgs {
  input: PowerOffBareMetal2ChassisInput
}

export interface MutationpowerOnBareMetal2ChassisArgs {
  input: PowerOnBareMetal2ChassisInput
}

export interface MutationpowerResetBareMetal2ChassisArgs {
  input: PowerResetBareMetal2ChassisInput
}

export interface MutationupdateBareMetal2ChassisArgs {
  input: UpdateBareMetal2ChassisInput
}

export interface MutationupdateBareMetal2IpmiChassisArgs {
  input: UpdateBareMetal2IpmiChassisInput
}

export interface MutationcheckBareMetal2ConfigFileArgs {
  chassisInfo: Scalars['String']
}

export interface MutationcreateBareMetal2GatewayArgs {
  input: CreateBareMetal2GatewayInput
}

export interface MutationattachBareMetal2GatewayToClusterArgs {
  input: AttachBareMetal2GatewayToClusterInput
}

export interface MutationchangeBareMetal2GatewayClusterArgs {
  input: ChangeBareMetal2GatewayClusterInput
}

export interface MutationdeleteBareMetal2GatewayArgs {
  input: DeleteBareMetal2GatewayInput
}

export interface MutationchangeBareMetal2GatewayStateArgs {
  input: ChangeBareMetal2GatewayStateInput
}

export interface MutationupdateBareMetal2GatewayArgs {
  input: UpdateBareMetal2GatewayInput
}

export interface MutationreconnectBareMetal2GatewayArgs {
  input: ReconnectBareMetal2GatewayInput
}

export interface MutationstartBareMetal2InstanceArgs {
  input: StartBareMetal2InstanceInput
}

export interface MutationcreateBareMetal2InstanceArgs {
  input: CreateBareMetal2InstanceInput
}

export interface MutationdeleteBareMetal2InstanceArgs {
  input: DeleteBareMetal2InstanceInput
}

export interface MutationupdateBareMetal2InstanceArgs {
  input: UpdateBareMetal2InstanceInput
}

export interface MutationchangeBareMetal2InstancePasswordArgs {
  input: ChangeBareMetal2InstancePasswordInput
}

export interface MutationreconnectBareMetal2InstanceArgs {
  input: ReconnectBareMetal2InstanceInput
}

export interface MutationaddV2VConversionHostArgs {
  input: AddV2VConversionHostInput
}

export interface MutationcancelV2VConversionHostBandWidthArgs {
  input: CancelV2VConversionHostBandWidthInput
}

export interface MutationchangeV2VConversionHostStateArgs {
  input: ChangeV2VConversionHostStateInput
}

export interface MutationdeleteV2VConversionHostArgs {
  input: DeleteV2VConversionHostInput
}

export interface MutationdisableV2VConversionHostStateArgs {
  input: DisableV2VConversionHostInput
}

export interface MutationenableV2VConversionHostStateArgs {
  input: EnableV2VConversionHostInput
}

export interface MutationupdateV2VConversionHostBandWidthArgs {
  input: UpdateV2VConversionHostBandWidthInput
}

export interface MutationupdateV2VConversionHostArgs {
  input: UpdateV2VConversionHostInput
}

export interface MutationaddResourceToBackupJobArgs {
  input: AddResourceToBackupJobInput
}

export interface MutationdeleteDatabaseBackupJobArgs {
  input: DeleteDatabaseBackupJobInput
}

export interface MutationdeleteResourceBackupJobArgs {
  input: DeleteResourceBackupJobInput
}

export interface MutationremoveResourceFromBackupJobArgs {
  input: RemoveResourceFromBackupJobInput
}

export interface MutationupdateResourceBackupJobStrategyArgs {
  input: UpdateResourceBackupJobStrategyInput
}

export interface MutationupdateSchedulerJobGroupArgs {
  input: UpdateSchedulerJobGroupInput
}

export interface MutationcreateResourceBackupJobArgs {
  input: CreateResourceBackupJobInput
}

export interface MutationcreateDatabaseBackupJobArgs {
  input: CreateDatabaseBackupJobInput
}

export interface MutationscanDataLocalBackupStorageArgs {
  input: ScanDataLocalBackupStorageInput
}

export interface MutationaddLocalBackupStorageByCreateArgs {
  input: AddLocalBackupStorageByCreateInput
}

export interface MutationaddLocalBackupStorageBySelectArgs {
  input: AddLocalBackupStorageBySelectInput
}

export interface MutationchangeLocalBackupStorageStateArgs {
  input: ChangeLocalBackupStorageStateInput
}

export interface MutationcleanUpTrashOnLocalBackupStorageArgs {
  input: CleanUpTrashOnLocalBackupStorageInput
}

export interface MutationdeleteLocalBackupStorageArgs {
  input: DeleteLocalBackupStorageInput
}

export interface MutationmodifyLocalBackupStorageInfoImageTypeArgs {
  input: ModifyLocalBackupStorageInfoImageTypeInput
}

export interface MutationmodifyLocalBackupStorageInfoSftpTypeArgs {
  input: ModifyLocalBackupStorageInfoSftpTypeInput
}

export interface MutationreclaimSpaceFromLocalBackupStorageArgs {
  input: ReclaimSpaceFromLocalBackupStorageInput
}

export interface MutationreconnectLocalBackupStorageArgs {
  input: ReconnectLocalBackupStorageInput
}

export interface MutationscanDataBaseLocalBackupStorageArgs {
  input: ScanDataBaseLocalBackupStorageInput
}

export interface MutationscanVMLocalBackupStorageArgs {
  input: ScanVMLocalBackupStorageInput
}

export interface MutationscanVolumeLocalBackupStorageArgs {
  input: ScanVolumeLocalBackupStorageInput
}

export interface MutationmodifyLocalBackupStorageArgs {
  input: UpdateLocalBackupStorageInput
}

export interface MutationchangeRemoteBackupStorageStateArgs {
  input: ChangeRemoteBackupStorageStateInput
}

export interface MutationaddRemoteBackupStorageArgs {
  input: AddRemoteBackupStorageInput
}

export interface MutationdeleteRemoteBackupStorageArgs {
  input: DeleteRemoteBackupStorageInput
}

export interface MutationmodifyRemoteBackupStorageInfoImageTypeArgs {
  input: ModifyRemoteBackupStorageInfoImageTypeInput
}

export interface MutationmodifyRemoteBackupStorageInfoSftpTypeArgs {
  input: ModifyRemoteBackupStorageInfoSftpTypeInput
}

export interface MutationreclaimSpaceFromRemoteStorageArgs {
  input: ReclaimSpaceFromRemoteStorageInput
}

export interface MutationreconnectRemoteBackupStorageArgs {
  input: ReconnectRemoteBackupStorageInput
}

export interface MutationmodifyRemoteBackupStorageArgs {
  input: UpdateRemoteBackupStorageInput
}

export interface MutationcreateV2VMigrationArgs {
  input: CreateV2VMigrationInput
}

export interface MutationrerunV2VMigrationArgs {
  input: RerunV2VMigrationInput
}

export interface MutationdeleteV2VMigrationArgs {
  input: DeleteV2VMigrationInput
}

export interface MutationupdateV2VMigrationArgs {
  input: UpdateV2VMigrationInput
}

export interface MutationchangeSchedulerJobStateArgs {
  input: ChangeSchedulerJobStateInput
}

export interface MutationcreateSchedulerJobArgs {
  input: CreateSchedulerJobInput
}

export interface MutationdeleteSchedulerJobArgs {
  input: DeleteSchedulerJobInput
}

export interface MutationaddSchedulerJobToSchedulerTriggerArgs {
  input: AddSchedulerJobToSchedulerTriggerInput
}

export interface MutationremoveSchedulerJobFromSchedulerTriggerArgs {
  input: RemoveSchedulerJobFromSchedulerTriggerInput
}

export interface MutationupdateSchedulerJobArgs {
  input: UpdateSchedulerJobInput
}

export interface MutationcreateSchedulerTriggerArgs {
  input: CreateSchedulerTriggerInput
}

export interface MutationdeleteSchedulerTriggerArgs {
  input: DeleteSchedulerTriggerInput
}

export interface MutationrunSchedulerTriggerArgs {
  input: RunSchedulerTriggerInput
}

export interface MutationupdateSchedulerTriggerArgs {
  input: UpdateSchedulerTriggerInput
}

export interface MutationcreateCertificateArgs {
  input: CreateCertificateInput
}

export interface MutationdeleteCertificateArgs {
  input: DeleteCertificateInput
}

export interface MutationupdateCertificateArgs {
  input: UpdateCertificateInput
}

export interface MutationreconnectConsoleProxyArgs {
  input: ReconnectConsoleProxyInput
}

export interface MutationupdateConsoleProxyArgs {
  input: UpdateConsoleProxyInput
}

export interface MutationcreateAccessKeyArgs {
  input: CreateAccessKeyInput
}

export interface MutationchangeAccessKeyStateArgs {
  input: ChangeAccessKeyStateInput
}

export interface MutationdeleteAccessKeyArgs {
  input: DeleteAccessKeyInput
}

export interface MutationdeleteHybridKeySecretArgs {
  input: DeleteHybridKeySecretInput
}

export interface MutationcreateHybridKeySecretArgs {
  input: CreateHybridKeySecretInput
}

export interface MutationupdateHybridKeySecretArgs {
  input: UpdateHybridKeySecretInput
}

export interface MutationcancelLongjobArgs {
  input: CancelLongjobInput
}

export interface MutationcreateLogServerArgs {
  input: CreateLogServerInput
}

export interface MutationdeleteLogServerArgs {
  input: DeleteLogServerInput
}

export interface MutationupdateLogServerArgs {
  input: UpdateLogServerInput
}

export interface MutationtestLogServerArgs {
  input: TestLogServerInput
}

export interface MutationcreateSNSEmailServerArgs {
  input: CreateSNSEmailPlatformInput
}

export interface MutationdeleteSNSEmailServerArgs {
  input: DeleteSNSEmailPlatformInput
}

export interface MutationupdateSNSEmailServerArgs {
  input: UpdateSNSEmailPlatformInput
}

export interface MutationvalidateSNSEmailServerArgs {
  input: ValidateSNSEmailPlatformInput
}

export interface MutationdisableEmailServerSettingsArgs {
  input: DisableEmailServerInput
}

export interface MutationenableEmailServerSettingsArgs {
  input: EnableEmailServerInput
}

export interface MutationcreateIpBlackWhiteListArgs {
  input: CreateIpBlackWhiteListInput
}

export interface MutationdeleteIpBlackWhiteListArgs {
  input: DeleteIpBlackWhiteListInput
}

export interface MutationupdateIpBlackWhiteListArgs {
  input: UpdateIpBlackWhiteListInput
}

export interface MutationcreateBillingsPriceTableArgs {
  input: CreateBillingsPriceTableActionInput
}

export interface MutationupdateBillingsPriceArgs {
  input: UpdateBillingPriceActionInput
}

export interface MutationdeleteBillingsPriceArgs {
  input: DeleteBillingsPriceActionInput
}

export interface MutationdeleteBillingsPriceTableArgs {
  input: DeleteBillingsPriceTableActionInput
}

export interface MutationupdateBillingsPriceTableArgs {
  input: UpdateBillingsPriceTableActionInput
}

export interface MutationbindAccountToBillingsPriceTableArgs {
  input: BindAccountToBillingsPriceTableActionInput
}

export interface MutationcreateAccountArgs {
  input: CreateAccountInput
}

export interface MutationdeleteAccountsArgs {
  input: DeleteAccountInput
}

export interface MutationupdateAccountArgs {
  input: UpdateAccountInput
}

export interface MutationattachPriceTableToAccountArgs {
  input: AttachPriceTableToAccountInput
}

export interface MutationdetachPriceTableFromAccountArgs {
  input: DetachPriceTableFromAccountInput
}

export interface MutationattachRoleToAccountArgs {
  input: AttachRoleToAccountInput
}

export interface MutationdetachRoleFromAccountArgs {
  input: DetachRoleFromAccountInput
}

export interface MutationupdateAccountQuotaArgs {
  input: UpdateAccountQuotaInput
}

export interface MutationchangeAccountBillingsPriceTableArgs {
  input: ChangeAccountBillingsPriceTableInput
}

export interface MutationcreateApplicationCenterArgs {
  input: CreateApplicationCenterInput
}

export interface MutationdeleteApplicationCenterArgs {
  input: DeleteApplicationCenterInput
}

export interface MutationupdateApplicationCenterArgs {
  input: UpdateApplicationCenterInput
}

export interface MutationgenerateTokenArgs {
  input: GenerateTokenInput
}

export interface MutationdeleteResourceConfigArgs {
  input: DeleteResourceConfigInput
}

export interface MutationupdateResourceConfigArgs {
  input: UpdateResourceConfigInput
}

export interface MutationupdateGlobalConfigArgs {
  input: UpdateGlobalConfigInput
}

export interface MutationresetGlobalConfigArgs {
  input: ResetGlobalConfigInput
}

export interface MutationreloadLicenseArgs {
  input: ReloadLicenseInput
}

export interface MutationdeleteLicenseArgs {
  input: DeleteLicenseInput
}

export interface MutationupdateLicenseArgs {
  input: UpdateLicenseInput
}

export interface MutationapplyTemplateConfigArgs {
  input: ApplyTemplateConfigInput
}

export interface MutationresetTemplateConfigArgs {
  input: ResetTemplateConfigInput
}

export interface MutationupdateTemplateConfigArgs {
  input: UpdateTemplateConfigInput
}

export interface MutationupdateCustomColumnsArgs {
  input: UpdateCustomColumnsInput
}

export interface MutationupdateThemeConfigArgs {
  input: UpdateThemeConfigInput
}

export interface MutationresetThemeConfigArgs {
  input: ResetThemeConfigInput
}

export interface MutationcreatePortMirrorArgs {
  input: CreatePortMirrorInput
}

export interface MutationchangePortMirrorStateArgs {
  input: ChangePortMirrorStateInput
}

export interface MutationupdatePortMirrorArgs {
  input: UpdatePortMirrorInput
}

export interface MutationdeletePortMirrorArgs {
  input: DeletePortMirrorInput
}

export interface MutationcreatePortMirrorSessionArgs {
  input: CreatePortMirrorSessionInput
}

export interface MutationdeletePortMirrorSessionArgs {
  input: DeletePortMirrorSessionInput
}

export interface MutationdeleteVRouterOspfAreasArgs {
  input: DeleteVRouterOspfAreaInput
}

export interface MutationupdateVRouterOspfAreasArgs {
  input: UpdateVRouterOspfAreaInput
}

export interface MutationaddVRouterNetworksToOspfAreaArgs {
  input: AddVRouterNetworksToOspfAreaInput
}

export interface MutationcreateVRouterOspfAreaArgs {
  input: CreateVRouterOspfAreaInput
}

export interface MutationsetVRouterRouterIdArgs {
  input: SetVRouterRouterIdInput
}

export interface MutationremoveVRouterNetworksFromOspfAreaArgs {
  input: RemoveVRouterNetworksFromOspfAreaInput
}

export interface MutationaddRemoteCidrsToIPsecArgs {
  input: AddOrRemoveCidrIPsecConnectionActionInput
}

export interface MutationattachL3NetworkToIPsecArgs {
  input: AttachOrDetachL3NetworkFromIPsecActionInput
}

export interface MutationcreateIPsecArgs {
  input: CreateIPsecActionActionInput
}

export interface MutationdeleteIpsecArgs {
  input: DeleteIPsecConnectionActionInput
}

export interface MutationdetachL3NetworkFromIPsecArgs {
  input: AttachOrDetachL3NetworkFromIPsecActionInput
}

export interface MutationremoveRemoteCidrsFromIPsecArgs {
  input: AddOrRemoveCidrIPsecConnectionActionInput
}

export interface MutationupdateIPsecConnectionArgs {
  input: UpdateIPsecConnectionActionInput
}

export interface MutationattachEipToVmArgs {
  input: AttachEipToVmActionInput
}

export interface MutationcreateEipArgs {
  input: CreateEipActionInput
}

export interface MutationdeleteEipsArgs {
  input: DeleteEipActionInput
}

export interface MutationdetachEipToVmArgs {
  input: DetachEipToVmActionInput
}

export interface MutationupdateEipArgs {
  input: UpdateEipActionInput
}

export interface MutationdeleteLoadBalancerArgs {
  input: DeleteLoadBalancerInput
}

export interface MutationcreateLoadBalancerArgs {
  input: CreateLoadBalancerInput
}

export interface MutationupdateLoadBalancerArgs {
  input: UpdateLoadBalancerInput
}

export interface MutationchangeSlbOfferingStateArgs {
  input: ChangeSlbOfferingStateInput
}

export interface MutationcreateSlbOfferingArgs {
  input: CreateSlbOfferingInput
}

export interface MutationupdateSlbOfferingArgs {
  input: UpdateSlbOfferingInput
}

export interface MutationaddBackendServerToServerGroupArgs {
  input: AddBackendServerToServerGroupInput
}

export interface MutationaddServerGroupToLoadBalancerListenerArgs {
  input: AddServerGroupToLoadBalancerListenerInput
}

export interface MutationcreateServerGroupArgs {
  input: CreateServerGroupInput
}

export interface MutationdeleteServerGroupArgs {
  input: DeleteServerGroupInput
}

export interface MutationremoveBackendServerFromServerGroupArgs {
  input: RemoveBackendServerFromServerGroupInput
}

export interface MutationremoveServerGroupFromLoadBalancerListenerArgs {
  input: RemoveServerGroupFromLoadBalancerListenerInput
}

export interface MutationsetWeightArgs {
  input: SetWeightInput
}

export interface MutationupdateServerGroupArgs {
  input: UpdateServerGroupInput
}

export interface MutationdeleteListenerArgs {
  input: DeleteListenerInput
}

export interface MutationupdateListenerArgs {
  input: UpdateListenerInput
}

export interface MutationchangeListenerArgs {
  input: ChangeListenerInput
}

export interface MutationaddCertificateToListenerArgs {
  input: AddCertificateToListenerInput
}

export interface MutationremoveCertificateFromListenerArgs {
  input: RemoveCertificateFromListenerInput
}

export interface MutationcreateFirewallIpSetTemplateArgs {
  input: CreateFirewallIpSetTemplateInput
}

export interface MutationdeleteFirewallIpSetTemplateArgs {
  input: DeleteFirewallIpSetTemplateInput
}

export interface MutationupdateFirewallIpSetTemplateArgs {
  input: UpdateFirewallIpSetTemplateInput
}

export interface MutationapplyRuleSetChangesArgs {
  input: ApplyRuleSetChangesInput
}

export interface MutationcreateFirewallRuleSetArgs {
  input: CreateFirewallRuleSetInput
}

export interface MutationdeleteFirewallRuleSetArgs {
  input: DeleteFirewallRuleSetInput
}

export interface MutationupdateFirewallRuleSetArgs {
  input: UpdateFirewallRuleSetInput
}

export interface MutationcreateFirewallRuleArgs {
  input: CreateFirewallRuleInput
}

export interface MutationdeleteFirewallRuleArgs {
  input: DeleteFirewallRuleInput
}

export interface MutationupdateFirewallRuleArgs {
  input: UpdateFirewallRuleInput
}

export interface MutationchangeFirewallRuleStateArgs {
  input: ChangeFirewallRuleStateInput
}

export interface MutationcheckRuleNumberArgs {
  input: CheckRuleNumberParam
}

export interface MutationcreateFirewallRuleTemplateArgs {
  input: CreateFirewallRuleTemplateInput
}

export interface MutationdeleteFirewallRuleTemplateArgs {
  input: DeleteFirewallRuleTemplateInput
}

export interface MutationupdateFirewallRuleTemplateArgs {
  input: UpdateFirewallRuleTemplateInput
}

export interface MutationattachFirewallRuleSetToL3Args {
  input: AttachFirewallRuleSetToL3Input
}

export interface MutationdetachFirewallRuleSetFromL3Args {
  input: DetachFirewallRuleSetFromL3Input
}

export interface MutationcreateVpcFirewallArgs {
  input: CreateVpcFirewallInput
}

export interface MutationdeleteFirewallArgs {
  input: DeleteFirewallInput
}

export interface MutationupdateVpcFirewallArgs {
  input: UpdateVpcFirewallInput
}

export interface MutationdeleteSdnControllerListArgs {
  input: RemoveSdnControllerListInput
}

export interface MutationupdateSdnControllerArgs {
  input: UpdateSdnControllerInput
}

export interface MutationaddSdnControllerArgs {
  input: AddSdnControllerInput
}

export interface MutationattachVRouterRouteTableToVRouterArgs {
  input: AttachOrDetachVRouterRouteTableToVRouterActionInput
}

export interface MutationcreateVRouterRouteTableArgs {
  input: CreateVRouterRouteTableActionInput
}

export interface MutationcreateVRouterRouteEntryArgs {
  input: CreateVRouterRouteEntryActionInput
}

export interface MutationdeleteVRouterRouteTableArgs {
  input: DeleteVRouterRouteTableActionInput
}

export interface MutationdetachVRouterRouteTableFromVRouterArgs {
  input: AttachOrDetachVRouterRouteTableToVRouterActionInput
}

export interface MutationupdateVRouterRouteTableArgs {
  input: UpdateVRouterRouteTableActionInput
}

export interface MutationdeleteVRouterRouteEntryArgs {
  input: DeleteVRouterRouteEntryActionInput
}

export interface MutationcreateVxlanPoolArgs {
  input: CreateVxlanPoolInput
}

export interface MutationcreateVniRangeArgs {
  input: CreateVniRangeInput
}

export interface MutationdeleteVniRangeArgs {
  input: DeleteVniRangeInput
}

export interface MutationupdateVniRangeArgs {
  input: UpdateVniRangeInput
}

export interface MutationupdateHomepageLayoutConfigArgs {
  input: UpdateHomepageLayoutConfigInput
}

export interface MutationupdateWelcomeConfigArgs {
  input: UpdateWelcomeConfigInput
}

export interface MutationupdateZsKvArgs {
  value: Scalars['String']
  key: Scalars['String']
}

export interface LoginByAccountInput {
  accountName: Scalars['String']
  password: Scalars['String']
  captchaUuid?: Maybe<Scalars['String']>
  verifyCode?: Maybe<Scalars['String']>
  systemTags?: Maybe<Array<Scalars['String']>>
  clientInfo?: Maybe<ClientInfo>
}

export interface ClientInfo {
  clientIp?: Maybe<Scalars['String']>
  clientBrowser?: Maybe<Scalars['String']>
}

export interface LoginIAM2VirtualIDInput {
  name: Scalars['String']
  password: Scalars['String']
  captchaUuid?: Maybe<Scalars['String']>
  verifyCode?: Maybe<Scalars['String']>
  systemTags?: Maybe<Array<Scalars['String']>>
  clientInfo?: Maybe<ClientInfo>
}

export interface LoginIAM2ProjectInput {
  projectName: Scalars['String']
  projectUuid?: Maybe<Scalars['String']>
  clientInfo?: Maybe<ClientInfo>
}

export interface LoginIAM2VirtualIDWithLdapInput {
  uid: Scalars['String']
  password: Scalars['String']
  captchaUuid?: Maybe<Scalars['String']>
  verifyCode?: Maybe<Scalars['String']>
  systemTags?: Maybe<Array<Scalars['String']>>
}

export interface GetLoginCaptchaPayload {
  resourceName: Scalars['String']
  loginType: Scalars['String']
  captchaUuid?: Maybe<Scalars['String']>
}

export interface GetTwoFactorAuthenticationSecretPayload {
  name: Scalars['String']
  password: Scalars['String']
  type: Scalars['String']
  captchaUuid?: Maybe<Scalars['String']>
  verifyCode?: Maybe<Scalars['String']>
}

export interface LogOutInput {
  sessionUuid?: Maybe<Scalars['String']>
  clientInfo?: Maybe<ClientInfo>
}

export interface AttachDataVolumeToVmInput {
  payload: Array<AttachDataVolumeToVmPayload>
  action: ActionInput
}

export interface AttachDataVolumeToVmPayload {
  vmInstanceUuid: Scalars['String']
  volumeUuid: Scalars['String']
}

export interface ActionInput {
  /** 唯一性ID，前端传入，维护 mutation 和 subscription 关系 */
  actionId?: Maybe<Scalars['String']>
  name: Scalars['String']
  /** 子任务数量 */
  total?: Maybe<Scalars['Int']>
}

export interface ChangeVolumeStateInput {
  payload: Array<ChangeVolumeStatePayload>
  action: ActionInput
}

export interface ChangeVolumeStatePayload {
  uuid: Scalars['String']
  stateEvent: VolumeStateEvent
}

export enum VolumeStateEvent {
  enable = 'enable',
  disable = 'disable'
}

export interface SetVolumeQosInput {
  payload: Array<SetVolumeQosPayload>
  action: ActionInput
}

export interface SetVolumeQosPayload {
  uuid: Scalars['String']
  volumeBandwidth: Scalars['Float']
  mode?: Maybe<VolumeQosMode>
}

export enum VolumeQosMode {
  total = 'total',
  read = 'read',
  write = 'write',
  all = 'all'
}

export interface DeleteVolumeQosInput {
  payload: Array<DeleteVolumeQosPayload>
  action: ActionInput
}

export interface DeleteVolumeQosPayload {
  uuid: Scalars['String']
  mode?: Maybe<VolumeQosMode>
}

export interface ResizeDataVolumeInput {
  payload: Array<ResizeDataVolumePayload>
  action: ActionInput
}

export interface ResizeDataVolumePayload {
  uuid: Scalars['String']
  size: Scalars['Float']
}

export interface DeleteDataVolumeInput {
  payload: Array<DeleteDataVolumePayload>
  action: ActionInput
}

export interface DeleteDataVolumePayload {
  uuid: Scalars['String']
}

export interface ExpungeDataVolumeInput {
  payload: Array<ExpungeDataVolumePayload>
  action: ActionInput
}

export interface ExpungeDataVolumePayload {
  uuid: Scalars['String']
}

export interface RecoverDataVolumeInput {
  payload: Array<RecoverDataVolumePayload>
  action: ActionInput
}

export interface RecoverDataVolumePayload {
  uuid: Scalars['String']
}

export interface PrimaryStorageMigrateVolumeInput {
  payload: PrimaryStorageMigrateVolumePayload
  action: ActionInput
}

export interface PrimaryStorageMigrateVolumePayload {
  volumeUuid: Scalars['String']
  dstPrimaryStorageUuid: Scalars['String']
}

export interface CreateDataVolumeInput {
  payload: CreateDataVolumePayload
  action: ActionInput
}

export interface CreateDataVolumePayload {
  name: Scalars['String']
  diskOfferingUuids: Array<Scalars['String']>
  vmInstanceUuid?: Maybe<Scalars['String']>
  tagUuids?: Maybe<Array<Scalars['String']>>
  description?: Maybe<Scalars['String']>
  primaryStorageUuid?: Maybe<Scalars['String']>
  systemTags?: Maybe<Array<Scalars['String']>>
}

export interface SyncVolumeSizeInput {
  payload: Array<SyncVolumeSizePayload>
  action: ActionInput
}

export interface SyncVolumeSizePayload {
  uuid: Scalars['String']
}

export interface UpdateVolumeActionInput {
  payload: UpdateVolumeInput
  action: ActionInput
}

export interface UpdateVolumeInput {
  uuid: Scalars['String']
  name?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  systemTags?: Maybe<Array<Scalars['String']>>
}

export interface SetVolumeVirtioSCSIInput {
  payload: SetVolumeVirtioSCSIPayload
  action: ActionInput
}

export interface SetVolumeVirtioSCSIPayload {
  uuid: Scalars['String']
  state: Scalars['Boolean']
}

export interface CreateDataVolumeFromVolumeTemplateInput {
  payload: CreateDataVolumeFromVolumeTemplatePayload
  action: ActionInput
}

export interface CreateDataVolumeFromVolumeTemplatePayload {
  name: Scalars['String']
  imageUuid: Scalars['String']
  vmInstanceUuid?: Maybe<Scalars['String']>
  tagUuids?: Maybe<Array<Scalars['String']>>
  description?: Maybe<Scalars['String']>
  primaryStorageUuid: Scalars['String']
  hostUuid?: Maybe<Scalars['String']>
  systemTags?: Maybe<Array<Scalars['String']>>
}

export interface DeleteTagInput {
  payload: Array<DeleteTagPayload>
  action: ActionInput
}

export interface DeleteTagPayload {
  uuid: Scalars['String']
}

export interface CreateTagInput {
  payload: CreateTagPayload
  action: ActionInput
}

export interface CreateTagPayload {
  name: Scalars['String']
  value: Scalars['String']
  color?: Maybe<Scalars['String']>
}

export interface DetachTagInput {
  payload: Array<DetachTagPayload>
  action: ActionInput
}

export interface DetachTagPayload {
  tagUuid: Scalars['String']
  resourceUuids: Array<Scalars['String']>
}

export interface AttachTagInput {
  payload: Array<AttachTagPayload>
  action: ActionInput
}

export interface AttachTagPayload {
  tagUuid: Scalars['String']
  resourceUuids: Array<Scalars['String']>
}

export interface UpdateTagInput {
  payload: UpdateTagPayload
  action: ActionInput
}

export interface UpdateTagPayload {
  name?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  color?: Maybe<Scalars['String']>
  uuid: Scalars['String']
}

export interface ChangeResourceOwnerInput {
  payload: Array<ChangeResourceOwnerPayload>
  action: ActionInput
}

export interface ChangeResourceOwnerPayload {
  accountUuid: Scalars['String']
  resourceUuid: Scalars['String']
}

export interface RevokeResourceSharingInput {
  payload: RevokeResourceSharingPayload
  action: ActionInput
}

export interface RevokeResourceSharingPayload {
  resourceUuids: Array<Scalars['String']>
  accountUuids?: Maybe<Array<Scalars['String']>>
  toPublic?: Maybe<Scalars['Boolean']>
  all?: Maybe<Scalars['Boolean']>
}

export interface ShareResourceInput {
  payload: ShareResourcePayload
  action: ActionInput
}

export interface ShareResourcePayload {
  resourceUuids: Array<Scalars['String']>
  accountUuids?: Maybe<Array<Scalars['String']>>
  toPublic?: Maybe<Scalars['Boolean']>
}

export interface ShareResourceToProjectInput {
  payload: ShareResourceToProjectPayload
  action: ActionInput
}

export interface ShareResourceToProjectPayload {
  resourceUuids: Array<Scalars['String']>
  projectUuids: Array<Scalars['String']>
  toPublic?: Maybe<Scalars['Boolean']>
}

export interface RevokeResourceFromProjectInput {
  payload: RevokeResourceFromProjectPayload
  action: ActionInput
}

export interface RevokeResourceFromProjectPayload {
  resourceUuids: Array<Scalars['String']>
  projectUuids: Array<Scalars['String']>
  toPublic?: Maybe<Scalars['Boolean']>
  all?: Maybe<Scalars['Boolean']>
}

export interface ShareResourceToGroupInput {
  payload: ShareResourceToGroupPayload
  action: ActionInput
}

export interface ShareResourceToGroupPayload {
  resourceUuids: Array<Scalars['String']>
  accountUuids?: Maybe<Array<Scalars['String']>>
}

export interface EnablePrimaryStorageInput {
  payload: Array<EnablePrimaryStoragePayload>
  action: ActionInput
}

export interface EnablePrimaryStoragePayload {
  uuid: Scalars['String']
}

export interface DisablePrimaryStorageInput {
  payload: Array<DisablePrimaryStoragePayload>
  action: ActionInput
}

export interface DisablePrimaryStoragePayload {
  uuid: Scalars['String']
}

export interface DeletePrimaryStorageListInput {
  payload: Array<DeletePrimaryStoragePayload>
  action: ActionInput
}

export interface DeletePrimaryStoragePayload {
  uuid: Scalars['String']
}

export interface UpdatePrimaryStorageInput {
  payload: UpdatePrimaryStoragePayload
  action: ActionInput
}

export interface UpdatePrimaryStoragePayload {
  uuid: Scalars['String']
  name?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
}

export interface ReconnectPrimaryStorageInput {
  payload: Array<ReconnectPrimaryStoragePayload>
  action: ActionInput
}

export interface ReconnectPrimaryStoragePayload {
  uuid: Scalars['String']
}

export interface MaintainPrimaryStorageInput {
  payload: Array<MaintainPrimaryStoragePayload>
  action: ActionInput
}

export interface MaintainPrimaryStoragePayload {
  uuid: Scalars['String']
}

export interface AttachPrimaryStorageToClusterInput {
  payload: Array<AttachPrimaryStorageToClusterPayload>
  action: ActionInput
}

export interface AttachPrimaryStorageToClusterPayload {
  primaryStorageUuid: Scalars['String']
  clusterUuid: Scalars['String']
}

export interface DetachPrimaryStorageFromClusterInput {
  payload: Array<DetachPrimaryStorageFromClusterPayload>
  action: ActionInput
}

export interface DetachPrimaryStorageFromClusterPayload {
  primaryStorageUuid: Scalars['String']
  clusterUuid: Scalars['String']
}

export interface UpdateStorageNetworkCidrInput {
  payload: UpdateStorageNetworkCidrPayload
  action: ActionInput
}

export interface UpdateStorageNetworkCidrPayload {
  uuid: Scalars['String']
  cidr: Scalars['String']
}

export interface UpdatePrimaryStorageThinProvisionInput {
  payload: UpdatePrimaryStorageThinProvisionPayload
  action: ActionInput
}

export interface UpdatePrimaryStorageThinProvisionPayload {
  uuid: Scalars['String']
  provisionUuid?: Maybe<Scalars['String']>
  value: Scalars['String']
}

export interface UpdatePrimaryStorageCephxInput {
  payload: UpdatePrimaryStorageCephxPayload
  action: ActionInput
}

export interface UpdatePrimaryStorageCephxPayload {
  uuid: Scalars['String']
  cephx: Scalars['Boolean']
  cephxReconnect?: Maybe<Scalars['Boolean']>
}

export interface CreateLocalPrimaryStorageInput {
  payload: CreateLocalPrimaryStorageInputPayload
  action: ActionInput
}

export interface CreateLocalPrimaryStorageInputPayload {
  name: Scalars['String']
  description?: Maybe<Scalars['String']>
  url: Scalars['String']
  clusterUuid?: Maybe<Scalars['String']>
  type?: Maybe<Scalars['String']>
  zoneUuid: Scalars['String']
  systemTags?: Maybe<Array<Scalars['String']>>
}

export interface CreateNFSPrimaryStorageInput {
  payload: CreateNFSPrimaryStoragePayload
  action: ActionInput
}

export interface CreateNFSPrimaryStoragePayload {
  name: Scalars['String']
  description?: Maybe<Scalars['String']>
  type?: Maybe<Scalars['String']>
  url: Scalars['String']
  clusterUuid?: Maybe<Scalars['String']>
  zoneUuid?: Maybe<Scalars['String']>
  /** 存储网络 | 挂载参数 */
  systemTags?: Maybe<Array<Scalars['String']>>
}

export interface CreateSharedMountPointPrimaryStorageInput {
  payload: CreateSharedMountPointPrimaryStorageInputParam
  action: ActionInput
}

export interface CreateSharedMountPointPrimaryStorageInputParam {
  name: Scalars['String']
  description?: Maybe<Scalars['String']>
  type?: Maybe<Scalars['String']>
  url: Scalars['String']
  clusterUuid?: Maybe<Scalars['String']>
  zoneUuid?: Maybe<Scalars['String']>
  /** 存储网络 | 挂载参数 */
  systemTags?: Maybe<Array<Scalars['String']>>
}

export interface CreateCephPrimaryStorageInput {
  payload: CreateCephPrimaryStoragePayload
  action: ActionInput
}

export interface CreateCephPrimaryStoragePayload {
  name: Scalars['String']
  description?: Maybe<Scalars['String']>
  type?: Maybe<Scalars['String']>
  clusterUuid?: Maybe<Scalars['String']>
  zoneUuid?: Maybe<Scalars['String']>
  monUrls: Array<Scalars['String']>
  rootVolumePoolName?: Maybe<Scalars['String']>
  dataVolumePoolName?: Maybe<Scalars['String']>
  imageCachePoolName?: Maybe<Scalars['String']>
  /** 存储网络 | 关闭 Cephx */
  systemTags?: Maybe<Array<Scalars['String']>>
}

export interface CreateSharedBlockGroupPrimaryStorageInput {
  payload: CreateSharedBlockGroupPrimaryStoragePayload
  action: ActionInput
}

export interface CreateSharedBlockGroupPrimaryStoragePayload {
  name?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  type?: Maybe<Scalars['String']>
  clusterUuid?: Maybe<Scalars['String']>
  zoneUuid: Scalars['String']
  diskUuids: Array<Scalars['String']>
  /** 存储网络 | 厚置备 | 清理块设备 */
  systemTags?: Maybe<Array<Scalars['String']>>
}

export interface CreateEbsPrimaryStorageInput {
  payload: CreateEbsPrimaryStorageInputParam
  action: ActionInput
}

export interface CreateEbsPrimaryStorageInputParam {
  name: Scalars['String']
  description?: Maybe<Scalars['String']>
  url: Scalars['String']
  clusterUuid?: Maybe<Scalars['String']>
  zoneUuid: Scalars['String']
  tdcConfigContent: Scalars['String']
  identityZoneUuid?: Maybe<Scalars['String']>
  defaultIoType?: Maybe<Scalars['String']>
  type?: Maybe<Scalars['String']>
  systemTags?: Maybe<Array<Scalars['String']>>
}

export interface CreateNasPrimaryStorageInput {
  payload: CreateNasPrimaryStorageInputParam
  action: ActionInput
}

export interface CreateNasPrimaryStorageInputParam {
  name: Scalars['String']
  description?: Maybe<Scalars['String']>
  url: Scalars['String']
  nasUuid: Scalars['String']
  accessGroupUuid: Scalars['String']
  clusterUuid?: Maybe<Scalars['String']>
  zoneUuid: Scalars['String']
  type?: Maybe<Scalars['String']>
  systemTags?: Maybe<Array<Scalars['String']>>
}

export interface AttachBackupStorageToZoneInput {
  payload: Array<AttachBackupStorageToZonePayload>
  action: ActionInput
}

export interface AttachBackupStorageToZonePayload {
  zoneUuid: Scalars['String']
  backupStorageUuid: Scalars['String']
}

export interface ChangeZoneStateInput {
  payload: Array<ChangeZoneStatePayload>
  action: ActionInput
}

export interface ChangeZoneStatePayload {
  uuid: Scalars['String']
  stateEvent: ZoneStateEvent
}

export enum ZoneStateEvent {
  disable = 'disable',
  enable = 'enable'
}

export interface CreateZoneInput {
  payload: CreateZonePayload
  action: ActionInput
}

export interface CreateZonePayload {
  name: Scalars['String']
  description?: Maybe<Scalars['String']>
}

export interface DeleteZoneInput {
  payload: Array<DeleteZonePayload>
  action: ActionInput
}

export interface DeleteZonePayload {
  uuid: Scalars['String']
}

export interface DetachBackupStorageFromZoneInput {
  payload: Array<DetachBackupStorageFromZonePayload>
  action: ActionInput
}

export interface DetachBackupStorageFromZonePayload {
  zoneUuid: Scalars['String']
  backupStorageUuid: Scalars['String']
}

export interface UpdateZoneInput {
  payload: UpdateZonePayload
  action: ActionInput
}

export interface UpdateZonePayload {
  uuid: Scalars['String']
  name?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
}

export interface DeleteIAM2VirtualIDInput {
  payload: Array<DeleteIAM2VirtualIDPayload>
  action: ActionInput
}

export interface DeleteIAM2VirtualIDPayload {
  uuid: Scalars['String']
}

export interface UpdateIAM2VirtualIDInput {
  payload: UpdateIAM2VirtualIDPayload
  action: ActionInput
}

export interface UpdateIAM2VirtualIDPayload {
  uuid: Scalars['String']
  name?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  password?: Maybe<Scalars['String']>
  oldPassword?: Maybe<Scalars['String']>
}

export interface UpdateIAM2VirtualIDAttributeInput {
  payload: Array<UpdateIAM2VirtualIDAttributePayload>
  action: ActionInput
}

export interface UpdateIAM2VirtualIDAttributePayload {
  uuid: Scalars['String']
  value: Scalars['String']
}

export interface ChangeToLocalUserInput {
  payload: Array<ChangeToLocalUserPayload>
  action: ActionInput
}

export interface ChangeToLocalUserPayload {
  uuid: Scalars['String']
}

export interface AddIAM2VirtualIDAttributeInput {
  payload: AddIAM2VirtualIDAttributePayload
  action: ActionInput
}

export interface AddIAM2VirtualIDAttributePayload {
  uuid: Scalars['String']
  attributes: Array<IAM2AttributeInput>
}

export interface RemoveAttributesFromIAM2VirtualIDInput {
  payload: RemoveAttributesFromIAM2VirtualIDPayload
  action: ActionInput
}

export interface RemoveAttributesFromIAM2VirtualIDPayload {
  uuid: Scalars['String']
  attributeUuids: Array<Scalars['String']>
}

export interface DetaiUpdateIAM2VirtualIDInput {
  payload: DetailUpdateIAM2VirtualIDPayload
  action: ActionInput
}

export interface DetailUpdateIAM2VirtualIDPayload {
  uuid?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  fullnameUuid?: Maybe<Scalars['String']>
  fullname?: Maybe<Scalars['String']>
}

export interface VirtualIDEditorVirtualIDGroupInput {
  payload: VirtualIDEditorVirtualIDGroupPayload
  action: ActionInput
}

export interface VirtualIDEditorVirtualIDGroupPayload {
  virtualIDUuids: Array<Scalars['String']>
  addGroupUuids?: Maybe<Array<Scalars['String']>>
  removeGroupUuids?: Maybe<Array<Scalars['String']>>
}

export interface AddIAM2VirtualIDsToGroupInput {
  payload: AddIAM2VirtualIDsToGroupPayload
  action: ActionInput
}

export interface AddIAM2VirtualIDsToGroupPayload {
  virtualIDUuids: Array<Scalars['String']>
  addGroupUuids?: Maybe<Array<Scalars['String']>>
}

export interface RemoveIAM2VirtualIDsToGroupInput {
  payload: RemoveIAM2VirtualIDsToGroupPayload
  action: ActionInput
}

export interface RemoveIAM2VirtualIDsToGroupPayload {
  virtualIDUuids: Array<Scalars['String']>
  removeGroupUuids?: Maybe<Array<Scalars['String']>>
}

export interface VirtualIDEditorPlatformRoleInput {
  payload: VirtualIDEditorPlatformRolePayload
  action: ActionInput
}

export interface VirtualIDEditorPlatformRolePayload {
  virtualIDUuid?: Maybe<Scalars['String']>
  addRoleUuids?: Maybe<Array<Scalars['String']>>
  removeRoleUuids?: Maybe<Array<Scalars['String']>>
  addAttributes: Array<IAM2AttributeInput>
  removeAttributeUuids: Array<Scalars['String']>
}

export interface VirtualIDEditorRoleInput {
  payload: VirtualIDEditorRolePayload
  action: ActionInput
}

export interface VirtualIDEditorRolePayload {
  virtualIDUuid?: Maybe<Scalars['String']>
  projectUuid?: Maybe<Scalars['String']>
  addRoleUuids?: Maybe<Array<Scalars['String']>>
  removeRoleUuids?: Maybe<Array<Scalars['String']>>
}

export interface VirtualIDSettingZoneInput {
  payload: Array<VirtualIDSettingZonePayload>
  action: ActionInput
}

export interface VirtualIDSettingZonePayload {
  uuid: Scalars['String']
  addAttributes: Array<IAM2AttributeInput>
  removeAttributeUuids: Array<Scalars['String']>
}

export interface IAM2VirtualIDJoinProjectInput {
  payload: Array<IAM2VirtualIDJoinProjectPayload>
  action: ActionInput
}

export interface IAM2VirtualIDJoinProjectPayload {
  virtualIDUuids: Array<Scalars['String']>
  projectUuid?: Maybe<Scalars['String']>
  roleUuids?: Maybe<Array<Scalars['String']>>
}

export interface IAM2VirtualIDJoinOrganizationInput {
  payload: IAM2VirtualIDJoinOrganizationPayload
  action: ActionInput
}

export interface IAM2VirtualIDJoinOrganizationPayload {
  uuids: Array<Scalars['String']>
  organizationUuids?: Maybe<Array<Scalars['String']>>
}

export interface CheckIAM2VirtualIDConfigFileInput {
  payload: CheckIAM2VirtualIDConfigFilePayload
  action: ActionInput
}

export interface CheckIAM2VirtualIDConfigFilePayload {
  virtualIDInfos: Scalars['String']
}

export interface CreateIAM2VirtualIDInput {
  payload: CreateIAM2VirtualIDPayload
  action: ActionInput
}

export interface CreateIAM2VirtualIDPayload {
  name: Scalars['String']
  description?: Maybe<Scalars['String']>
  password: Scalars['String']
  attributes: Array<IAM2AttributeInput>
  directDepartmentUuids?: Maybe<Array<Scalars['String']>>
  platformRoleUuids?: Maybe<Array<Scalars['String']>>
  isAllZone?: Maybe<Scalars['Boolean']>
  zoneUuids?: Maybe<Array<Scalars['String']>>
  projectInfoList?: Maybe<Array<IProjectInfoParams>>
}

export interface IProjectInfoParams {
  projectUuid?: Maybe<Scalars['String']>
  roleUuids?: Maybe<Array<Scalars['String']>>
}

export interface CreateIAM2VirtualIDFromConfigFileInput {
  payload: Array<CreateIAM2VirtualIDFromConfigFilePayload>
  action: ActionInput
}

export interface CreateIAM2VirtualIDFromConfigFilePayload {
  virtualIDInfos: Scalars['String']
}

export interface AddVCenterInput {
  payload: Array<AddVCenterPayload>
  action: ActionInput
}

export interface AddVCenterPayload {
  name: Scalars['String']
  description?: Maybe<Scalars['String']>
  domainName: Scalars['String']
  port: Scalars['Float']
  username: Scalars['String']
  password: Scalars['String']
  https: Scalars['Boolean']
  zoneUuid: Scalars['String']
}

export interface DeleteVCenterInput {
  payload: Array<DeleteVCenterPayload>
  action: ActionInput
}

export interface DeleteVCenterPayload {
  uuid: Scalars['String']
}

export interface SyncVCenterInput {
  payload: Array<SyncVCenterPayload>
  action: ActionInput
}

export interface SyncVCenterPayload {
  uuid: Scalars['String']
}

export interface UpdateVCenterInput {
  payload: Array<UpdateVCenterPayload>
  action: ActionInput
}

export interface UpdateVCenterPayload {
  uuid: Scalars['String']
  name?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  username?: Maybe<Scalars['String']>
  password?: Maybe<Scalars['String']>
  domainName?: Maybe<Scalars['String']>
  port?: Maybe<Scalars['Float']>
}

export interface AttachOrDetachL2NetworksFromClusterActionInput {
  payload: Array<AttachOrDetachL2NetworkFromClusterInput>
  action: ActionInput
}

export interface AttachOrDetachL2NetworkFromClusterInput {
  l2NetworkUuid: Scalars['String']
  clusterUuid: Scalars['String']
  systemTags?: Maybe<Array<Scalars['String']>>
}

export interface CreateClusterInput {
  payload: CreateClusterPayload
  action: ActionInput
}

export interface CreateClusterPayload {
  name: Scalars['String']
  description?: Maybe<Scalars['String']>
  displayNetworkCidr?: Maybe<Scalars['String']>
  migrateNetworkCidr?: Maybe<Scalars['String']>
  hypervisorType: Scalars['String']
  type?: Maybe<Scalars['String']>
  zoneUuid: Scalars['String']
  checkCpuModel?: Maybe<Scalars['String']>
  cpuModel?: Maybe<Scalars['String']>
  /** CPU架构 */
  architecture?: Maybe<Scalars['String']>
  /** 创建弹性裸金属集群需要的部署网络 */
  provisionNetworkUuid?: Maybe<Scalars['String']>
}

export interface ChangeClusterStateInput {
  payload: Array<ChangeClusterStatePayload>
  action: ActionInput
}

export interface ChangeClusterStatePayload {
  uuid: Scalars['String']
}

export interface DeleteClusterInput {
  payload: Array<DeleteClusterStatePayload>
  action: ActionInput
}

export interface DeleteClusterStatePayload {
  uuid: Scalars['String']
}

export interface UpdateClusterInput {
  payload: UpdateClusterPayload
  action: ActionInput
}

export interface UpdateClusterPayload {
  uuid: Scalars['String']
  name: Scalars['String']
  description?: Maybe<Scalars['String']>
}

export interface UpdateClusterDisplayNetworkCidrInput {
  payload: UpdateClusterDisplayNetworkCidrPayload
  action: ActionInput
}

export interface UpdateClusterDisplayNetworkCidrPayload {
  uuid: Scalars['String']
  cidr: Scalars['String']
}

export interface UpdateClusterHostCpuModelInput {
  payload: UpdateClusterHostCpuModelPayload
  action: ActionInput
}

export interface UpdateClusterHostCpuModelPayload {
  uuid: Scalars['String']
  tagId?: Maybe<Scalars['String']>
  value: Scalars['String']
}

export interface UpdateClusterVmInstanceCpuModelInput {
  payload: UpdateClusterVmInstanceCpuModelPayload
  action: ActionInput
}

export interface UpdateClusterVmInstanceCpuModelPayload {
  uuid: Scalars['String']
  tag: Scalars['String']
}

export interface UpdateClusterMigrateNetworkCidrInput {
  payload: UpdateClusterMigrateNetworkCidrPayload
  action: ActionInput
}

export interface UpdateClusterMigrateNetworkCidrPayload {
  uuid: Scalars['String']
  cidr: Scalars['String']
}

export interface CreateClusterDRSInput {
  payload: CreateClusterDRSPayload
  action: ActionInput
}

export interface CreateClusterDRSPayload {
  clusterUuid: Scalars['String']
  name: Scalars['String']
  automationLevel: Scalars['String']
  defaultEnable?: Maybe<Scalars['Boolean']>
  thresholds: Array<ThresholdsInput>
  thresholdDuration: Scalars['Int']
}

export interface ThresholdsInput {
  operator?: Maybe<Scalars['String']>
  thresholdName?: Maybe<Scalars['String']>
  thresholdValue?: Maybe<Scalars['String']>
}

export interface UpdateClusterDRSInput {
  payload: UpdateClusterDRSPayload
  action: ActionInput
}

export interface UpdateClusterDRSPayload {
  uuid: Scalars['String']
  name: Scalars['String']
  automationLevel: Scalars['String']
  defaultEnable?: Maybe<Scalars['Boolean']>
  thresholdDuration: Scalars['Int']
  thresholds: Array<ThresholdsInput>
}

export interface ExecuteDRSSchedulingInput {
  payload: ExecuteDRSSchedulingPayload
  action: ActionInput
}

export interface ExecuteDRSSchedulingPayload {
  uuid: Scalars['String']
}

export interface ApplyDRSAdviceListInput {
  payload: Array<ApplyDRSAdvicePayload>
  action: ActionInput
}

export interface ApplyDRSAdvicePayload {
  adviceUuid: Scalars['String']
}

export interface AddImageInput {
  payload: AddImagePayload
  action: ActionInput
}

export interface AddImagePayload {
  name: Scalars['String']
  description: Scalars['String']
  url: Scalars['String']
  mediaType: ImageMediaType
  system?: Maybe<Scalars['Boolean']>
  format: Scalars['String']
  platform?: Maybe<ImagePlatform>
  backupStorageUuids: Array<Scalars['String']>
  systemTags?: Maybe<Array<Scalars['String']>>
}

export interface ChangeImageStateInput {
  payload: Array<ChangeImageStatePayload>
  action: ActionInput
}

export interface ChangeImageStatePayload {
  uuid: Scalars['String']
  stateEvent: ImageStateEvent
}

export enum ImageStateEvent {
  enable = 'enable',
  disable = 'disable'
}

export interface DeleteImageInput {
  payload: Array<DeleteImagePayload>
  action: ActionInput
}

export interface DeleteImagePayload {
  uuid: Scalars['String']
}

export interface ExpungeImageInput {
  payload: Array<ExpungeImagePayload>
  action: ActionInput
}

export interface ExpungeImagePayload {
  imageUuid: Scalars['String']
  backupStorageUuids: Array<Scalars['String']>
}

export interface RecoverImageInput {
  payload: Array<RecoverImagePayload>
  action: ActionInput
}

export interface RecoverImagePayload {
  imageUuid: Scalars['String']
  backupStorageUuids: Array<Scalars['String']>
}

export interface ExportImageInput {
  payload: ExportImagePayload
  action: ActionInput
}

export interface ExportImagePayload {
  imageUuid: Scalars['String']
  backupStorageUuid: Scalars['String']
}

export interface DeleteExportedImageInput {
  payload: Array<DeleteExportedImagePayload>
  action: ActionInput
}

export interface DeleteExportedImagePayload {
  imageUuid: Scalars['String']
  backupStorageUuid: Scalars['String']
}

export interface UpdateImageInput {
  payload: Array<UpdateImagePayload>
  action: ActionInput
}

export interface UpdateImagePayload {
  uuid: Scalars['String']
  name?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  platform?: Maybe<ImagePlatform>
  format?: Maybe<Scalars['String']>
  mediaType?: Maybe<Scalars['String']>
}

export interface SetImageBootModeInput {
  payload: Array<SetImageBootModePayload>
  action: ActionInput
}

export interface SetImageBootModePayload {
  uuid: Scalars['String']
  bootMode: ImageBootMode
}

export interface ShareImageToPublicInput {
  payload: Array<ShareImageToPublicPayload>
  action: ActionInput
}

export interface ShareImageToPublicPayload {
  resourceUuids: Array<Scalars['String']>
}

export interface RevokeImageFromPublicInput {
  payload: Array<RevokeImageFromPublicPayload>
  action: ActionInput
}

export interface RevokeImageFromPublicPayload {
  resourceUuids: Array<Scalars['String']>
}

export interface SyncImageSizeInput {
  payload: SyncImageSizePayload
  action: ActionInput
}

export interface SyncImageSizePayload {
  uuid: Scalars['String']
}

export interface SyncImageFromImageStoreBackupStorageInput {
  payload: Array<SyncImageFromImageStoreBackupStoragePayload>
  action: ActionInput
}

export interface SyncImageFromImageStoreBackupStoragePayload {
  uuid: Scalars['String']
  srcBackupStorageUuid: Scalars['String']
  dstBackupStorageUuid: Scalars['String']
  name: Scalars['String']
  description?: Maybe<Scalars['String']>
}

export interface SetImageQgaInput {
  payload: SetImageQgaPayload
  action: ActionInput
}

export interface SetImageQgaPayload {
  uuid: Scalars['String']
  enable: Scalars['Boolean']
}

export interface BackupStorageMigrateImageInput {
  payload: BackupStorageMigrateImagePayload
  action: ActionInput
}

export interface BackupStorageMigrateImagePayload {
  imageUuid: Scalars['String']
  srcBackupStorageUuid: Scalars['String']
  dstBackupStorageUuid: Scalars['String']
}

export interface CreateVolumeTemplateInput {
  payload: CreateVolumeTemplateInputParam
  action: ActionInput
}

export interface CreateVolumeTemplateInputParam {
  vmUuid?: Maybe<Scalars['String']>
  volumeUuid: Scalars['String']
  name: Scalars['String']
  description?: Maybe<Scalars['String']>
  isSystem?: Maybe<Scalars['Boolean']>
  backupStorageUuids: Array<Scalars['String']>
  platform?: Maybe<ImagePlatform>
}

export interface SetBaremetal2InstanceImageInput {
  payload: SetBaremetal2InstanceImagePayload
  action: ActionInput
}

export interface SetBaremetal2InstanceImagePayload {
  uuid: Scalars['String']
  enable: Scalars['Boolean']
}

export interface ChangeBackupStorageStateInput {
  payload: Array<ChangeBackupStorageStatePayload>
  action: ActionInput
}

export interface ChangeBackupStorageStatePayload {
  uuid: Scalars['String']
  stateEvent: BackupStorageStateEvent
}

export enum BackupStorageStateEvent {
  enable = 'enable',
  disable = 'disable'
}

export interface ReconnectBackupStorageInput {
  payload: Array<ReconnectBackupStoragePayload>
  action: ActionInput
}

export interface ReconnectBackupStoragePayload {
  uuid: Scalars['String']
}

export interface DeleteBackupStorageInput {
  payload: Array<DeleteBackupStoragePayload>
  action: ActionInput
}

export interface DeleteBackupStoragePayload {
  uuid: Scalars['String']
}

export interface UpdateImageStoreBackupStorageInput {
  payload: UpdateImageStoreBackupStoragePayload
  action: ActionInput
}

export interface UpdateImageStoreBackupStoragePayload {
  username?: Maybe<Scalars['String']>
  password?: Maybe<Scalars['String']>
  hostname?: Maybe<Scalars['String']>
  sshPort?: Maybe<Scalars['Int']>
  uuid: Scalars['String']
  name?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  systemTags?: Maybe<Array<Scalars['String']>>
}

export interface UpdateSftpBackupStorageInput {
  payload: UpdateSftpBackupStoragePayload
  action: ActionInput
}

export interface UpdateSftpBackupStoragePayload {
  username?: Maybe<Scalars['String']>
  password?: Maybe<Scalars['String']>
  hostname?: Maybe<Scalars['String']>
  sshPort?: Maybe<Scalars['Int']>
  uuid: Scalars['String']
  name?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  systemTags?: Maybe<Array<Scalars['String']>>
}

export interface UpdateAliyunEbsBackupStorageInput {
  payload: UpdateAliyunEbsBackupStoragePayload
  action: ActionInput
}

export interface UpdateAliyunEbsBackupStoragePayload {
  uuid: Scalars['String']
  name?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  systemTags?: Maybe<Array<Scalars['String']>>
}

export interface UpdateCephBackupStorageInput {
  payload: UpdateCephBackupStoragePayload
  action: ActionInput
}

export interface UpdateCephBackupStoragePayload {
  uuid: Scalars['String']
  name?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  systemTags?: Maybe<Array<Scalars['String']>>
}

export interface CreateBSSystemTagInput {
  payload: CreateBSSystemTagPayload
  action: ActionInput
}

export interface CreateBSSystemTagPayload {
  resourceType: Scalars['String']
  resourceUuid: Scalars['String']
  tag: Scalars['String']
}

export interface DeleteBSSystemTagInput {
  payload: DeleteBSSystemTagPayload
  action: ActionInput
}

export interface DeleteBSSystemTagPayload {
  resourceUuid: Scalars['String']
  oldTag: Scalars['String']
}

export interface UpdateBSSystemTagInput {
  payload: UpdateBSSystemTagPayload
  action: ActionInput
}

export interface UpdateBSSystemTagPayload {
  resourceUuid: Scalars['String']
  oldTag: Scalars['String']
  tag: Scalars['String']
}

export interface ReclaimSpaceFromImageStoreInput {
  payload: Array<ReclaimSpaceFromImageStorePayload>
  action: ActionInput
}

export interface ReclaimSpaceFromImageStorePayload {
  uuid: Scalars['String']
}

export interface AddImageStoreBackupStorageInput {
  payload: AddImageStoreBackupStoragePayload
  action: ActionInput
}

export interface AddImageStoreBackupStoragePayload {
  zoneUuid: Scalars['String']
  hostname: Scalars['String']
  username: Scalars['String']
  password: Scalars['String']
  sshPort: Scalars['Int']
  url: Scalars['String']
  name: Scalars['String']
  description?: Maybe<Scalars['String']>
  type?: Maybe<Scalars['String']>
  importImages?: Maybe<Scalars['Boolean']>
  dataNetwork?: Maybe<Scalars['String']>
  syncImageNetwork?: Maybe<Scalars['String']>
  systemTags?: Maybe<Array<Scalars['String']>>
}

export interface AddCephBackupStorageInput {
  payload: AddCephBackupStoragePayload
  action: ActionInput
}

export interface AddCephBackupStoragePayload {
  zoneUuid: Scalars['String']
  monUrls: Array<Scalars['String']>
  name: Scalars['String']
  poolName?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  type?: Maybe<Scalars['String']>
  dataNetwork?: Maybe<Scalars['String']>
  systemTags?: Maybe<Array<Scalars['String']>>
}

export interface AddAliyunEbsBackupStorageInput {
  payload: AddAliyunEbsBackupStoragePayload
  action: ActionInput
}

export interface AddAliyunEbsBackupStoragePayload {
  zoneUuid: Scalars['String']
  name: Scalars['String']
  description?: Maybe<Scalars['String']>
  type?: Maybe<Scalars['String']>
  url: Scalars['String']
  ossBucketUuid: Scalars['String']
  dataNetwork?: Maybe<Scalars['String']>
  systemTags?: Maybe<Array<Scalars['String']>>
}

export interface AddSftpBackupStorageInput {
  payload: AddSftpBackupStoragePayload
  action: ActionInput
}

export interface AddSftpBackupStoragePayload {
  zoneUuid: Scalars['String']
  hostname: Scalars['String']
  username: Scalars['String']
  password: Scalars['String']
  sshPort: Scalars['Int']
  url: Scalars['String']
  name: Scalars['String']
  description?: Maybe<Scalars['String']>
  type?: Maybe<Scalars['String']>
  dataNetwork?: Maybe<Scalars['String']>
  systemTags?: Maybe<Array<Scalars['String']>>
}

export interface ShareInstanceOfferingToPublicInput {
  resourceUuids: Array<Scalars['String']>
}

export interface RevokeInstanceOfferingSharingFromPublicInput {
  resourceUuids: Array<Scalars['String']>
}

export interface ChangeInstanceOfferingStateInput {
  payload: Array<ChangeInstanceOfferingStatePayload>
  action: ActionInput
}

export interface ChangeInstanceOfferingStatePayload {
  uuid: Scalars['String']
  stateEvent: Scalars['String']
}

export interface DeleteInstanceOfferingInput {
  payload: Array<DeleteInstanceOfferingPayload>
  action: ActionInput
}

export interface DeleteInstanceOfferingPayload {
  uuid: Scalars['String']
}

export interface CreateInstanceOfferingInput {
  payload: CreateInstanceOfferingPayload
  action: ActionInput
}

export interface CreateInstanceOfferingPayload {
  name: Scalars['String']
  description?: Maybe<Scalars['String']>
  cpuNum: Scalars['Int']
  memorySize: Scalars['Float']
  maxNum?: Maybe<Scalars['Int']>
  strategyPattern?: Maybe<Scalars['String']>
  allocatorStrategy?: Maybe<Scalars['String']>
  volumeTotalBandwidth?: Maybe<Scalars['String']>
  volumeReadBandwidth?: Maybe<Scalars['String']>
  volumeWriteBandwidth?: Maybe<Scalars['String']>
  instanceOfferingUserConfig?: Maybe<Scalars['String']>
  networkOutboundBandwidth?: Maybe<Scalars['String']>
  networkInboundBandwidth?: Maybe<Scalars['String']>
}

export interface UpdateInstanceOfferingInput {
  payload: UpdateInstanceOfferingPayload
  action: ActionInput
}

export interface UpdateInstanceOfferingPayload {
  uuid: Scalars['String']
  maxNum?: Maybe<Scalars['Int']>
  name?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  allocatorStrategy?: Maybe<Scalars['String']>
  strategyPattern?: Maybe<Scalars['String']>
}

export interface ChangeInstanceOfferingInput {
  payload: Array<ChangeInstanceOfferingPayload>
  action: ActionInput
}

export interface ChangeInstanceOfferingPayload {
  vmInstanceUuid: Scalars['String']
  instanceOfferingUuid: Scalars['String']
}

export interface AddKVMHostInput {
  payload: Array<AddKVMHostPayload>
  action: ActionInput
}

export interface AddKVMHostPayload {
  username: Scalars['String']
  password: Scalars['String']
  sshPort?: Maybe<Scalars['Int']>
  name: Scalars['String']
  description?: Maybe<Scalars['String']>
  managementIp?: Maybe<Scalars['String']>
  clusterUuid?: Maybe<Scalars['String']>
  tagUuids?: Maybe<Array<Scalars['String']>>
  systemTags?: Maybe<Array<Scalars['String']>>
}

export interface AddXDragonHostInput {
  payload: Array<AddXDragonHostPayload>
  action: ActionInput
}

export interface AddXDragonHostPayload {
  name: Scalars['String']
  username: Scalars['String']
  password: Scalars['String']
  managementIp?: Maybe<Scalars['String']>
  sshPort?: Maybe<Scalars['Int']>
  description?: Maybe<Scalars['String']>
  clusterUuid?: Maybe<Scalars['String']>
  cpuNum?: Maybe<Scalars['Float']>
  cpuSockets?: Maybe<Scalars['Float']>
  totalPhysicalMemory?: Maybe<Scalars['Float']>
  tagUuids?: Maybe<Array<Scalars['String']>>
  systemTags?: Maybe<Array<Scalars['String']>>
}

export interface AddKVMHostFromConfigFileInput {
  payload: AddKVMHostFromConfigFilePayload
  action: ActionInput
}

export interface AddKVMHostFromConfigFilePayload {
  hostInfo: Scalars['String']
}

export interface EnableHostInput {
  payload: Array<EnableHostPayload>
  action: ActionInput
}

export interface EnableHostPayload {
  uuid: Scalars['String']
}

export interface DisableHostInput {
  payload: Array<DisableHostPayload>
  action: ActionInput
}

export interface DisableHostPayload {
  uuid: Scalars['String']
}

export interface MaintenanceHostInput {
  payload: Array<MaintenanceHostPayload>
  action: ActionInput
}

export interface MaintenanceHostPayload {
  uuid: Scalars['String']
}

export interface UpdateHostInput {
  payload: UpdateHostPayload
  action: ActionInput
}

export interface UpdateHostPayload {
  uuid: Scalars['String']
  name?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
}

export interface UpdateKVMHostInput {
  payload: UpdateKVMHostPayload
  action: ActionInput
}

export interface UpdateKVMHostPayload {
  uuid: Scalars['String']
  sshPort?: Maybe<Scalars['Int']>
  username?: Maybe<Scalars['String']>
  password?: Maybe<Scalars['String']>
  managementIp?: Maybe<Scalars['String']>
}

export interface DeleteHostInput {
  payload: Array<DeleteHostPayload>
  action: ActionInput
}

export interface DeleteHostPayload {
  uuid: Scalars['String']
}

export interface CloseHostIommuInput {
  payload: CloseHostIommuPayload
  action: ActionInput
}

export interface CloseHostIommuPayload {
  uuid: Scalars['String']
}

export interface OpenHostIommuInput {
  payload: OpenHostIommuPayload
  action: ActionInput
}

export interface OpenHostIommuPayload {
  uuid: Scalars['String']
}

export interface ReconnectHostInput {
  payload: Array<ReconnectHostPayload>
  action: ActionInput
}

export interface ReconnectHostPayload {
  uuid: Scalars['String']
}

export interface SetHostEptSupportInput {
  payload: SetHostEptSupportPayload
  action: ActionInput
}

export interface SetHostEptSupportPayload {
  uuid: Scalars['String']
  eptUuid: Scalars['String']
}

export interface StartVmInstanceInput {
  payload: Array<StartVmInstancePayload>
  action: ActionInput
}

export interface StartVmInstancePayload {
  uuid: Scalars['String']
}

export interface StopVmInstanceInput {
  payload: Array<StopVmInstancePayload>
  action: ActionInput
}

export interface StopVmInstancePayload {
  uuid: Scalars['String']
  stopHA?: Maybe<Scalars['Boolean']>
}

export interface UpdateVmInstanceInput {
  payload: UpdateVmInstancePayload
  action: ActionInput
}

export interface UpdateVmInstancePayload {
  uuid: Scalars['String']
  name?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  state?: Maybe<Scalars['String']>
  defaultL3NetworkUuid?: Maybe<Scalars['String']>
  cpuNum?: Maybe<Scalars['Float']>
  memorySize?: Maybe<Scalars['Float']>
  platform?: Maybe<Scalars['String']>
}

export interface PauseVmInstanceInput {
  payload: Array<PauseVmInstancePayload>
  action: ActionInput
}

export interface PauseVmInstancePayload {
  uuid: Scalars['String']
}

export interface RecoverVmInstanceInput {
  payload: Array<RecoverVmInstancePayload>
  action: ActionInput
}

export interface RecoverVmInstancePayload {
  uuid: Scalars['String']
  startVm: Scalars['Boolean']
}

export interface ResumeVmInstanceInput {
  payload: Array<ResumeVmInstancePayload>
  action: ActionInput
}

export interface ResumeVmInstancePayload {
  uuid: Scalars['String']
}

export interface RebootVmInstanceInput {
  payload: Array<RebootVmInstancePayload>
  action: ActionInput
}

export interface RebootVmInstancePayload {
  uuid: Scalars['String']
}

export interface PoweroffVmInstanceInput {
  payload: Array<PoweroffVmInstancePayload>
  action: ActionInput
}

export interface PoweroffVmInstancePayload {
  uuid: Scalars['String']
  stopHA?: Maybe<Scalars['Boolean']>
}

export interface SetVmInstanceGpuDeviceSpecInput {
  payload: Array<SetGpuDeviceSpecPayload>
  action: ActionInput
}

export interface SetGpuDeviceSpecPayload {
  vmUuid: Scalars['String']
  newValue?: Maybe<GpuDeivceSpecOnVmInstanceInput>
  oldValue?: Maybe<GpuDeivceSpecOnVmInstanceInput>
  type: Scalars['String']
  autoReleaseSpec: Scalars['Boolean']
}

export interface GpuDeivceSpecOnVmInstanceInput {
  uuid: Scalars['String']
  isVirtual: Scalars['Boolean']
  type: VGpuDeviceType
}

export interface ResizeRootVolumeInput {
  payload: Array<ResizeRootVolumePayload>
  action: ActionInput
}

export interface ResizeRootVolumePayload {
  uuid: Scalars['String']
  size: Scalars['Float']
}

export interface ChangeVmImageInput {
  payload: Array<ChangeVmImagePayload>
  action: ActionInput
}

export interface ChangeVmImagePayload {
  vmInstanceUuid: Scalars['String']
  imageUuid: Scalars['String']
}

export interface DetachDataVolumeFromVmInput {
  payload: Array<DetachDataVolumeFromVmPayload>
  action: ActionInput
}

export interface DetachDataVolumeFromVmPayload {
  vmUuid: Scalars['String']
  uuid: Scalars['String']
}

export interface AttachIsoToVmInstanceInput {
  payload: Array<AttachIsoToVmInstancePayload>
  action: ActionInput
}

export interface AttachIsoToVmInstancePayload {
  vmInstanceUuid: Scalars['String']
  isoUuid: Scalars['String']
  systemTags?: Maybe<Array<Scalars['String']>>
}

export interface DetachIsoFromVmInstanceInput {
  payload: Array<DetachIsoFromVmInstancePayload>
  action: ActionInput
}

export interface DetachIsoFromVmInstancePayload {
  vmInstanceUuid: Scalars['String']
  isoUuid: Scalars['String']
}

export interface RemoveHaStickStragedyActionInput {
  payload: Array<RemoveHaStickStragedyPayload>
  action: ActionInput
}

export interface RemoveHaStickStragedyPayload {
  vmInstanceUuid: Scalars['String']
  clusterUuid: Scalars['String']
}

export interface SetHaStickStragedyActionInput {
  payload: Array<SetHaStickStragedyPayload>
  action: ActionInput
}

export interface SetHaStickStragedyPayload {
  uuid: Scalars['String']
}

export interface UpdateVmPriorityInput {
  payload: Array<UpdateVmPriorityPayload>
  action: ActionInput
}

export interface UpdateVmPriorityPayload {
  uuid: Scalars['String']
  priority: Scalars['String']
}

export interface SetVmConsoleModeInput {
  payload: Array<SetVmConsoleModePayload>
  action: ActionInput
}

export interface SetVmConsoleModePayload {
  uuid: Scalars['String']
  mode: Scalars['String']
}

export interface DeleteVmInstanceInput {
  payload: Array<DeleteVmInstancePayload>
  action: ActionInput
}

export interface DeleteVmInstancePayload {
  uuid: Scalars['String']
  deleteVolume: Scalars['Boolean']
}

export interface SetVmRDPInput {
  payload: Array<SetVmRDPPayload>
  action: ActionInput
}

export interface SetVmRDPPayload {
  uuid: Scalars['String']
  enable: Scalars['Boolean']
}

export interface SetVmUsbRedirectInput {
  payload: Array<SetVmUsbRedirectPayload>
  action: ActionInput
}

export interface SetVmUsbRedirectPayload {
  uuid: Scalars['String']
  enable: Scalars['Boolean']
}

export interface ChangeVmPasswordInput {
  payload: ChangeVmPasswordPayload
  action: ActionInput
}

export interface ChangeVmPasswordPayload {
  uuid: Scalars['String']
  account: Scalars['String']
  password: Scalars['String']
}

export interface AddVmToAffinityGroupInput {
  payload: AddVmToAffinityGroupPayload
  action: ActionInput
}

export interface AddVmToAffinityGroupPayload {
  uuid: Scalars['String']
  affinityGroupUuid: Scalars['String']
}

export interface RemoveVmFromAffinityGroupInput {
  payload: RemoveVmFromAffinityGroupPayload
  action: ActionInput
}

export interface RemoveVmFromAffinityGroupPayload {
  uuid: Scalars['String']
  affinityGroupUuid: Scalars['String']
}

export interface StorageMigrateVmInstanceInput {
  payload: StorageMigratePayload
  action: ActionInput
}

export interface StorageMigratePayload {
  vmInstanceUuid: Scalars['String']
  dstPrimaryStorageUuid: Scalars['String']
  withDataVolumes?: Maybe<Scalars['Boolean']>
  withSnapshots?: Maybe<Scalars['Boolean']>
}

export interface ExpungeVmInstanceInput {
  payload: Array<ExpungeVmInstancePayload>
  action: ActionInput
}

export interface ExpungeVmInstancePayload {
  uuid: Scalars['String']
}

export interface DeleteVmSshKeyInput {
  payload: DeleteVmSshKeyPayload
  action: ActionInput
}

export interface DeleteVmSshKeyPayload {
  uuid: Scalars['String']
}

export interface SetVmSshKeyInput {
  payload: SetVmSshKeyPayload
  action: ActionInput
}

export interface SetVmSshKeyPayload {
  uuid: Scalars['String']
  SshKey: Scalars['String']
}

export interface DeleteVmConsolePasswordInput {
  payload: DeleteVmConsolePasswordPayload
  action: ActionInput
}

export interface DeleteVmConsolePasswordPayload {
  uuid: Scalars['String']
}

export interface SetVmConsolePasswordInput {
  payload: SetVmConsolePasswordPayload
  action: ActionInput
}

export interface SetVmConsolePasswordPayload {
  uuid: Scalars['String']
  consolePassword: Scalars['String']
}

export interface ReimageVmInstanceInput {
  payload: ReimageVmInstancePayload
  action: ActionInput
}

export interface ReimageVmInstancePayload {
  vmInstanceUuid: Scalars['String']
}

export interface StartVmInstanceFromHostInput {
  payload: StartVmInstanceFromHostPayload
  action: ActionInput
}

export interface StartVmInstanceFromHostPayload {
  uuid: Scalars['String']
  hostUuid: Scalars['String']
}

export interface SetVmBootOrderInput {
  payload: Array<SetVmBootOrderPayload>
  action: ActionInput
}

export interface SetVmBootOrderPayload {
  uuid: Scalars['String']
  bootOrder: Array<Scalars['String']>
  systemTags: Array<Scalars['String']>
}

export interface DeleteVmHaLevelInput {
  payload: Array<DeleteVmHaLevelPayload>
  action: ActionInput
}

export interface DeleteVmHaLevelPayload {
  uuid: Scalars['String']
}

export interface LocalStorageMigrateVolumeInput {
  payload: LocalStorageMigrateVolumePayload
  action: ActionInput
}

export interface LocalStorageMigrateVolumePayload {
  volumeUuid: Scalars['String']
  destHostUuid: Scalars['String']
}

export interface MigrateVmInput {
  payload: MigrateVmPayload
  action: ActionInput
}

export interface MigrateVmPayload {
  vmInstanceUuid: Scalars['String']
  hostUuid: Scalars['String']
  strategy?: Maybe<Scalars['String']>
}

export interface CloneVmInstanceInput {
  payload: Array<CloneVmInstancePayload>
  action: ActionInput
}

export interface CloneVmInstancePayload {
  vmInstanceUuid: Scalars['String']
  count: Scalars['Int']
  name: Scalars['String']
  names?: Maybe<Array<Scalars['String']>>
  strategy?: Maybe<Scalars['String']>
  primaryStorageUuidForRootVolume?: Maybe<Scalars['String']>
  primaryStorageUuidForDataVolume?: Maybe<Scalars['String']>
  full?: Maybe<Scalars['Boolean']>
  rootVolumeSystemTags?: Maybe<Array<Scalars['String']>>
  dataVolumeSystemTags?: Maybe<Array<Scalars['String']>>
  systemTags?: Maybe<Array<Scalars['String']>>
}

export interface SetVmHaLevelInput {
  payload: Array<SetVmHaLevelPayload>
  action: ActionInput
}

export interface SetVmHaLevelPayload {
  uuid: Scalars['String']
  level: Scalars['String']
}

export interface SetVmQgaInput {
  payload: Array<SetVmQgaPayload>
  action: ActionInput
}

export interface SetVmQgaPayload {
  uuid: Scalars['String']
  enable: Scalars['Boolean']
}

export interface SetVmCleanTrafficInput {
  payload: Array<SetVmCleanTrafficPayload>
  action: ActionInput
}

export interface SetVmCleanTrafficPayload {
  uuid: Scalars['String']
  enable: Scalars['Boolean']
}

export interface SetVmBootModeInput {
  payload: Array<SetVmBootModePayload>
  action: ActionInput
}

export interface SetVmBootModePayload {
  uuid: Scalars['String']
  bootMode: Scalars['String']
}

export interface OpenConsoleInput {
  payload: Array<OpenConsolePayload>
  action: ActionInput
}

export interface OpenConsolePayload {
  vmInstanceUuid: Scalars['String']
}

export interface SetVmMonitorNumberInput {
  payload: Array<SetVmMonitorNumberPayload>
  action: ActionInput
}

export interface SetVmMonitorNumberPayload {
  uuid: Scalars['String']
  monitorNumber: Scalars['Int']
}

export interface UpdateVmInstanceCPUPinningInput {
  payload: UpdateVmInstanceCPUPinningPayload
  action: ActionInput
}

export interface UpdateVmInstanceCPUPinningPayload {
  uuid: Scalars['String']
  value: Scalars['String']
}

export interface CreateVmInstanceInput {
  payload: CreateVmInstancePayload
  action: ActionInput
}

export interface CreateVmInstancePayload {
  count?: Maybe<Scalars['Int']>
  name: Scalars['String']
  description?: Maybe<Scalars['String']>
  imageUuid: Scalars['String']
  bootMode?: Maybe<Scalars['String']>
  platform?: Maybe<Scalars['String']>
  cpuNum?: Maybe<Scalars['Int']>
  memorySize?: Maybe<Scalars['Float']>
  rootDiskSize?: Maybe<Scalars['Float']>
  dataDiskSize?: Maybe<Scalars['Float']>
  volumeReadBandwidth?: Maybe<Scalars['Float']>
  volumeWriteBandwidth?: Maybe<Scalars['Float']>
  volumeBandwidth?: Maybe<Scalars['Float']>
  networkOutboundBandwidth?: Maybe<Scalars['Float']>
  networkInboundBandwidth?: Maybe<Scalars['Float']>
  virtioSCSI?: Maybe<Scalars['Boolean']>
  instanceOfferingUuid?: Maybe<Scalars['String']>
  defaultL3NetworkUuid: Scalars['String']
  tagUuids?: Maybe<Array<Scalars['String']>>
  vmNicConfig: Array<VmNicConfig>
  rootDiskOfferingUuid?: Maybe<Scalars['String']>
  consolePassword?: Maybe<Scalars['String']>
  sshkey?: Maybe<Scalars['String']>
  ha?: Maybe<Scalars['String']>
  vmPriority?: Maybe<Scalars['String']>
  affinityGroupUuid?: Maybe<Scalars['String']>
  userData?: Maybe<Scalars['String']>
  rootUsername?: Maybe<Scalars['String']>
  rootPassword?: Maybe<Scalars['String']>
  rootPrimaryStorageUuid?: Maybe<Scalars['String']>
  dataPrimaryStorageUuid?: Maybe<Scalars['String']>
  gpuDeviceSpec?: Maybe<GpuDeviceSpecInVmCreate>
  vgpuDevice?: Maybe<VGpuDeviceInVmCreate>
  gpuDeviceUuidList?: Maybe<Array<Scalars['String']>>
  autoReleaseGpuDevice?: Maybe<Scalars['Boolean']>
  cdromList?: Maybe<Array<Cdrom>>
  usbRedirect?: Maybe<Scalars['Boolean']>
  dataDiskOfferingUuids?: Maybe<Array<Scalars['String']>>
  vtoPCPUBindList?: Maybe<Array<VtoPCPUBind>>
  thinProvisionForDataPrimaryStorage?: Maybe<VolumeProvisioningStrategy>
  thinProvisionForPrimaryStorage?: Maybe<VolumeProvisioningStrategy>
  thinProvisionForRootPrimaryStorage?: Maybe<VolumeProvisioningStrategy>
  rootPoolName?: Maybe<Scalars['String']>
  dataPoolName?: Maybe<Scalars['String']>
  consoleMode?: Maybe<Scalars['String']>
  antiSpoofing?: Maybe<Scalars['Boolean']>
  hostname?: Maybe<Scalars['String']>
  clusterUuid?: Maybe<Scalars['String']>
  hostUuid?: Maybe<Scalars['String']>
}

export interface VmNicConfig {
  l3NetworkUuid?: Maybe<Scalars['String']>
  ipv4StaticIp?: Maybe<Scalars['String']>
  ipv6StaticIp?: Maybe<Scalars['String']>
  customMac?: Maybe<Scalars['String']>
  securityGroupList?: Maybe<Array<Scalars['String']>>
  eipList?: Maybe<Array<Scalars['String']>>
  enableSRIOV?: Maybe<Scalars['Boolean']>
}

export interface GpuDeviceSpecInVmCreate {
  uuid: Scalars['String']
  type?: Maybe<Scalars['String']>
  isVirtual?: Maybe<Scalars['Boolean']>
}

export interface VGpuDeviceInVmCreate {
  uuid: Scalars['String']
  type?: Maybe<VGpuType>
}

export interface Cdrom {
  cdRom: Scalars['String']
  isoUuid?: Maybe<Scalars['String']>
}

export interface VtoPCPUBind {
  vCPU: Scalars['String']
  pCPU: Scalars['String']
}

export interface AttachGuestToolsIsoToVmInput {
  payload: AttachGuestToolsIsoToVmPayload
  action: ActionInput
}

export interface AttachGuestToolsIsoToVmPayload {
  uuid: Scalars['String']
}

export interface CreateAffinityGroupInput {
  payload: CreateAffinityGroupPayload
  action: ActionInput
}

export interface CreateAffinityGroupPayload {
  name: Scalars['String']
  description?: Maybe<Scalars['String']>
  policy: Scalars['String']
}

export interface DeleteAffinityGroupInput {
  payload: Array<DeleteAffinityGroupPayload>
  action: ActionInput
}

export interface DeleteAffinityGroupPayload {
  uuid: Scalars['String']
}

export interface UpdateAffinityGroupInput {
  payload: UpdateAffinityGroupPayload
  action: ActionInput
}

export interface UpdateAffinityGroupPayload {
  uuid: Scalars['String']
  name?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
}

export interface ChangeAffinityGroupStateInput {
  payload: Array<ChangeAffinityGroupStatePayload>
  action: ActionInput
}

export interface ChangeAffinityGroupStatePayload {
  uuid: Scalars['String']
  stateEvent: AffinityGroupStateEvent
}

export enum AffinityGroupStateEvent {
  enable = 'enable',
  disable = 'disable'
}

export interface AttachVmInAffinityGroupInput {
  payload: AttachVmInAffinityGroupPayload
  action: ActionInput
}

export interface AttachVmInAffinityGroupPayload {
  uuid: Scalars['String']
  affinityGroupUuid: Scalars['String']
}

export interface DetachVmFromAffinityGroupInput {
  payload: DetachVmFromAffinityGroupPayload
  action: ActionInput
}

export interface DetachVmFromAffinityGroupPayload {
  uuid: Scalars['String']
  affinityGroupUuid: Scalars['String']
}

export interface CreatePortForwardingInput {
  payload: CreatePortForwardingPayload
  action: ActionInput
}

export interface CreatePortForwardingPayload {
  vipUuid?: Maybe<Scalars['String']>
  vipPortStart: Scalars['Int']
  vipPortEnd?: Maybe<Scalars['Int']>
  privatePortStart?: Maybe<Scalars['Int']>
  privatePortEnd?: Maybe<Scalars['Int']>
  protocolType: Scalars['String']
  vmNicUuid?: Maybe<Scalars['String']>
  allowedCidr?: Maybe<Scalars['String']>
  name: Scalars['String']
  description?: Maybe<Scalars['String']>
  resourceUuid?: Maybe<Scalars['String']>
  newVipParams?: Maybe<NewVipParams>
}

export interface NewVipParams {
  name?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  ipRangeUuid?: Maybe<Scalars['String']>
  l3NetworkUuid: Scalars['String']
  requiredIp?: Maybe<Scalars['String']>
}

export interface UpdatePortForwardingInput {
  payload: Array<UpdatePortForwardingPayload>
  action: ActionInput
}

export interface UpdatePortForwardingPayload {
  uuid: Scalars['String']
  name?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
}

export interface DeletePortForwardingInput {
  payload: Array<DeletePortForwardingPayload>
  action: ActionInput
}

export interface DeletePortForwardingPayload {
  uuid: Scalars['String']
}

export interface AttachPortForwardingInput {
  payload: AttachPortForwardingPayload
  action: ActionInput
}

export interface AttachPortForwardingPayload {
  ruleUuid: Scalars['String']
  vmNicUuid: Scalars['String']
}

export interface DetachPortForwardingInput {
  payload: DetachPortForwardingPayload
  action: ActionInput
}

export interface DetachPortForwardingPayload {
  uuid: Scalars['String']
}

export interface AttachL3NetworkToVmNicInput {
  payload: AttachL3NetworkToVmNicPayload
  action: ActionInput
}

export interface AttachL3NetworkToVmNicPayload {
  /** 当前网卡的uuid */
  vmInstanceUuid: Scalars['String']
  /** 三层网的uuid */
  l3NetworkUuid: Scalars['String']
  /** ip4 */
  staticIpv4?: Maybe<Scalars['String']>
  /** ip6 */
  staticIpv6?: Maybe<Scalars['String']>
  /** 自定义网卡MAC地址 */
  customMac?: Maybe<Scalars['String']>
  isDefault?: Maybe<Scalars['Boolean']>
  isBaremetal2Instance?: Maybe<Scalars['Boolean']>
  enableSRIOV?: Maybe<Scalars['Boolean']>
}

export interface ChangeVmNicTypeInput {
  payload: ChangeVmNicTypePayload
  action: ActionInput
}

export interface ChangeVmNicTypePayload {
  vmNicUuid: Scalars['String']
  vmNicType: Scalars['String']
}

export interface DeleteNicQosInput {
  payload: DeleteNicQosPayload
  action: ActionInput
}

export interface DeleteNicQosPayload {
  /** 网卡的uuid */
  uuid: Scalars['String']
}

export interface DeleteVmStaticIpInput {
  payload: DeleteVmStaticIpPayload
  action: ActionInput
}

export interface DeleteVmStaticIpPayload {
  /** 当前vm的uuid */
  vmInstanceUuid: Scalars['String']
  /** 三层网的uuid */
  l3NetworkUuid: Scalars['String']
}

export interface UpdateVmNicDriverInput {
  payload: UpdateVmNicDriverPayload
  action: ActionInput
}

export interface UpdateVmNicDriverPayload {
  vmInstanceUuid: Scalars['String']
  vmNicUuid: Scalars['String']
  driverType: Scalars['String']
}

export interface SetNicQosInput {
  payload: SetNicQosPayload
  action: ActionInput
}

export interface SetNicQosPayload {
  /** 网卡的uuid */
  uuid: Scalars['String']
  /** 上行带宽 */
  outboundBandwidth?: Maybe<Scalars['Float']>
  /** 下行带宽 */
  inboundBandwidth?: Maybe<Scalars['Float']>
}

export interface SetVmStaticIpInput {
  payload: SetVmStaticIpPayload
  action: ActionInput
}

export interface SetVmStaticIpPayload {
  /** 当前vm的uuid */
  vmInstanceUuid: Scalars['String']
  /** 三层网的uuid */
  l3NetworkUuid: Scalars['String']
  /** ip */
  ip?: Maybe<Scalars['String']>
  /** ip6 */
  ip6?: Maybe<Scalars['String']>
}

export interface UpdateVmNicMacInput {
  payload: UpdateVmNicMacPayload
  action: ActionInput
}

export interface UpdateVmNicMacPayload {
  /** 网卡Uuid */
  vmNicUuid: Scalars['String']
  /** mac地址 */
  mac: Scalars['String']
}

export interface CreateBareMetal2ProvisionNetworkInput {
  payload: Array<CreateBareMetal2ProvisionNetworkPayload>
  action: ActionInput
}

export interface CreateBareMetal2ProvisionNetworkPayload {
  name: Scalars['String']
  description?: Maybe<Scalars['String']>
  zoneUuid?: Maybe<Scalars['String']>
  dhcpInterface?: Maybe<Scalars['String']>
  endIp?: Maybe<Scalars['String']>
  netmask?: Maybe<Scalars['String']>
  startIp?: Maybe<Scalars['String']>
  gateway?: Maybe<Scalars['String']>
  state?: Maybe<Scalars['String']>
  resourceUuid?: Maybe<Scalars['String']>
  systemTags?: Maybe<Array<Scalars['String']>>
}

export interface DeleteBareMetal2ProvisionNetworkInput {
  payload: Array<DeleteBareMetal2ProvisionNetworkPayload>
  action: ActionInput
}

export interface DeleteBareMetal2ProvisionNetworkPayload {
  uuid: Scalars['String']
}

export interface UpdateBareMetal2ProvisionNetworkInput {
  payload: UpdateBareMetal2ProvisionNetworkPayload
  action: ActionInput
}

export interface UpdateBareMetal2ProvisionNetworkPayload {
  uuid: Scalars['String']
  name?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
}

export interface ChangeProvisionNetworkToClusterInput {
  payload: ChangeProvisionNetworkToClusterPayload
  action: ActionInput
}

export interface ChangeProvisionNetworkToClusterPayload {
  clusterUuid: Scalars['String']
  oldNetworkUuid?: Maybe<Scalars['String']>
  newNetworkUuid: Scalars['String']
}

export interface CheckIpAvailabilityParam {
  l3NetworkUuid: Scalars['String']
  ip: Scalars['String']
}

export interface AddIpRangeInput {
  payload: Array<AddIpRangePayload>
  action: ActionInput
}

export interface AddIpRangePayload {
  name: Scalars['String']
  l3NetworkUuid: Scalars['String']
  netmask?: Maybe<Scalars['String']>
  prefixLen?: Maybe<Scalars['Int']>
  addressMode?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  startIp: Scalars['String']
  endIp: Scalars['String']
  gateway?: Maybe<Scalars['String']>
  ipRangeType?: Maybe<Scalars['String']>
  ipVersion: Scalars['Int']
  resourceUuid?: Maybe<Scalars['String']>
  tagUuids?: Maybe<Array<Scalars['String']>>
  systemTags?: Maybe<Array<Scalars['String']>>
  userTags?: Maybe<Array<Scalars['String']>>
}

export interface AddIpRangeByCidrInput {
  payload: Array<AddIpRangeByCidrPayload>
  action: ActionInput
}

export interface AddIpRangeByCidrPayload {
  name: Scalars['String']
  l3NetworkUuid: Scalars['String']
  description?: Maybe<Scalars['String']>
  networkCidr: Scalars['String']
  gateway?: Maybe<Scalars['String']>
  ipRangeType?: Maybe<Scalars['String']>
  ipVersion: Scalars['Int']
  addressMode?: Maybe<Scalars['String']>
  resourceUuid?: Maybe<Scalars['String']>
  tagUuids?: Maybe<Array<Scalars['String']>>
  systemTags?: Maybe<Array<Scalars['String']>>
  userTags?: Maybe<Array<Scalars['String']>>
}

export interface DeleteIpRangeInput {
  payload: Array<DeleteIpRangePayload>
  action: ActionInput
}

export interface DeleteIpRangePayload {
  uuid: Scalars['String']
}

export interface AddDnsToL3NetworkInput {
  payload: Array<AddDnsToL3NetworkPayload>
  action: ActionInput
}

export interface AddDnsToL3NetworkPayload {
  l3NetworkUuid?: Maybe<Scalars['String']>
  dns?: Maybe<Scalars['String']>
}

export interface RemoveDnsFromL3NetworkInput {
  payload: Array<RemoveDnsFromL3NetworkPayload>
  action: ActionInput
}

export interface RemoveDnsFromL3NetworkPayload {
  l3NetworkUuid?: Maybe<Scalars['String']>
  dns?: Maybe<Scalars['String']>
}

export interface DeleteL3NetworkInput {
  payload: Array<DeleteL3NetworkPayload>
  action: ActionInput
}

export interface DeleteL3NetworkPayload {
  uuid: Scalars['String']
}

export interface SetL3NetworkMtuInput {
  payload: Array<SetL3NetworkMtuPayload>
  action: ActionInput
}

export interface SetL3NetworkMtuPayload {
  l3NetworkUuid: Scalars['String']
  mtu: Scalars['Float']
}

export interface UpdateL3NetworkInput {
  payload: UpdateL3NetworkPayload
  action: ActionInput
}

export interface UpdateL3NetworkPayload {
  uuid: Scalars['String']
  name?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
}

export interface CreateL3NetworkInput {
  payload: CreateL3NetworkInputParam
  action: ActionInput
}

export interface CreateL3NetworkInputParam {
  name: Scalars['String']
  l2NetworkUuid: Scalars['String']
  description?: Maybe<Scalars['String']>
  type?: Maybe<Scalars['String']>
  category?: Maybe<Scalars['String']>
  system?: Maybe<Scalars['Boolean']>
  dnsDomain?: Maybe<Scalars['String']>
  resourceUuid?: Maybe<Scalars['String']>
  tagUuids?: Maybe<Array<Scalars['String']>>
  systemTags?: Maybe<Array<Scalars['String']>>
  userTags?: Maybe<Array<Scalars['String']>>
  netmask?: Maybe<Scalars['String']>
  prefixLen?: Maybe<Scalars['Int']>
  addressMode?: Maybe<Scalars['String']>
  startIp?: Maybe<Scalars['String']>
  endIp?: Maybe<Scalars['String']>
  gateway?: Maybe<Scalars['String']>
  ipRangeType?: Maybe<Scalars['String']>
  ipVersion?: Maybe<Scalars['Int']>
  networkCidr?: Maybe<Scalars['String']>
  /** DHCP服务IP */
  dhcpIp?: Maybe<Scalars['String']>
  /** DHCP服务是否开启 */
  dhcpService?: Maybe<Scalars['Boolean']>
  /** 用于区别创建时的类型，判断应该挂载哪些网络服务 */
  showNetworkServiceType?: Maybe<Scalars['String']>
  dns?: Maybe<Scalars['String']>
  virtualRouterOfferingUuid?: Maybe<Scalars['String']>
  vpcVRouterUuid?: Maybe<Scalars['String']>
  routerInterfaceIp?: Maybe<Scalars['String']>
}

export interface AttachVpcRouterToL3NetworkInput {
  payload: Array<AttachVpcRouterToL3NetworkPayload>
  action: ActionInput
}

export interface AttachVpcRouterToL3NetworkPayload {
  l3NetworkUuid?: Maybe<Scalars['String']>
  vmInstanceUuid?: Maybe<Scalars['String']>
}

export interface DetachL3NetworkFromVmInput {
  payload: Array<DetachL3NetworkFromVmPayload>
  action: ActionInput
}

export interface DetachL3NetworkFromVmPayload {
  /** l3Network.uuid */
  uuid?: Maybe<Scalars['String']>
  /** vmNic.uuid */
  vmNicUuid?: Maybe<Scalars['String']>
}

export interface CreateDiskOfferingInput {
  payload: CreateDiskOfferingPayload
  action: ActionInput
}

export interface CreateDiskOfferingPayload {
  name: Scalars['String']
  description?: Maybe<Scalars['String']>
  diskSize: Scalars['Float']
  volumeTotalBandwidth?: Maybe<Scalars['String']>
  volumeReadBandwidth?: Maybe<Scalars['String']>
  volumeWriteBandwidth?: Maybe<Scalars['String']>
  diskOfferingUserConfig?: Maybe<Scalars['String']>
}

export interface DeleteDiskOfferingInput {
  payload: Array<DeleteDiskOfferingPayload>
  action: ActionInput
}

export interface DeleteDiskOfferingPayload {
  uuid: Scalars['String']
}

export interface ChangeDiskOfferingStateInput {
  payload: Array<ChangeDiskOfferingStatePayload>
  action: ActionInput
}

export interface ChangeDiskOfferingStatePayload {
  uuid: Scalars['String']
  stateEvent: Scalars['String']
}

export interface UpdateDiskOfferingInput {
  payload: Array<UpdateDiskOfferingPayload>
  action: ActionInput
}

export interface UpdateDiskOfferingPayload {
  uuid: Scalars['String']
  name?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
}

export interface ShareDiskOfferingToPublicInput {
  payload: Array<ShareDiskOfferingToPublicPayload>
  action: ActionInput
}

export interface ShareDiskOfferingToPublicPayload {
  resourceUuids: Array<Scalars['String']>
}

export interface RevokeDiskOfferingFromPublicInput {
  payload: Array<RevokeDiskOfferingFromPublicPayload>
  action: ActionInput
}

export interface RevokeDiskOfferingFromPublicPayload {
  resourceUuids: Array<Scalars['String']>
}

export interface DeleteCdRomInput {
  payload: Array<DeleteCdRomPayload>
  action: ActionInput
}

export interface DeleteCdRomPayload {
  uuid: Scalars['String']
}

export interface SetVmInstanceDefaultCdRomInput {
  payload: SetVmInstanceDefaultCdRomPayload
  action: ActionInput
}

export interface SetVmInstanceDefaultCdRomPayload {
  uuid: Scalars['String']
  vmInstanceUuid: Scalars['String']
}

export interface CreateVmCdRomInput {
  payload: Array<CreateVmCdRomPayload>
  action: ActionInput
}

export interface CreateVmCdRomPayload {
  name: Scalars['String']
  vmInstanceUuid: Scalars['String']
  isoUuid?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  resourceUuid?: Maybe<Scalars['String']>
}

export interface CreateVolumeSnapshotInput {
  payload: CreateVolumeSnapshotPayload
  action: ActionInput
}

export interface CreateVolumeSnapshotPayload {
  /** uuid */
  volumeUuid?: Maybe<Scalars['String']>
  /** 快照名 */
  name: Scalars['String']
  /** 描述 */
  description?: Maybe<Scalars['String']>
  type: SnapshotType
}

export interface DeleteVolumeSnapshotInput {
  payload: DeleteVolumeSnapshotPayload
  action: ActionInput
}

export interface DeleteVolumeSnapshotPayload {
  uuids: Array<Scalars['String']>
}

export interface RevertVolumeFromSnapshotInput {
  payload: RevertVolumeFromSnapshotPayload
  action: ActionInput
}

export interface RevertVolumeFromSnapshotPayload {
  uuid: Scalars['String']
  vmUuid?: Maybe<Scalars['String']>
  type: SnapshotType
  isStartVm?: Maybe<Scalars['Boolean']>
}

export interface UngroupVolumeSnapshotGroupInput {
  payload: UngroupVolumeSnapshotGroupPayload
  action: ActionInput
}

export interface UngroupVolumeSnapshotGroupPayload {
  uuid: Scalars['String']
}

export interface UpdateVolumeSnapshotInput {
  payload: UpdateVolumeSnapshotPayload
  action: ActionInput
}

export interface UpdateVolumeSnapshotPayload {
  uuid: Scalars['String']
  name?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  type: SnapshotType
}

export interface UpdatePciDeviceSpecInput {
  payload: Array<UpdatePciDeviceSpecPayload>
  action: ActionInput
}

export interface UpdatePciDeviceSpecPayload {
  uuid: Scalars['String']
}

export interface UpdatePciDeviceSpecRomInput {
  payload: Array<UpdatePciDeviceSpecRomPayload>
  action: ActionInput
}

export interface UpdatePciDeviceSpecRomPayload {
  uuid: Scalars['String']
  type: UpdatePciDeviceSpecRomType
  romVersion?: Maybe<Scalars['String']>
  romContent?: Maybe<Scalars['String']>
}

export enum UpdatePciDeviceSpecRomType {
  Update = 'Update',
  Delete = 'Delete'
}

export interface UpdateMdevDeviceSpecInput {
  payload: Array<UpdateMdevDeviceSpecPayload>
  action: ActionInput
}

export interface UpdateMdevDeviceSpecPayload {
  uuid: Scalars['String']
}

export interface UpdateVGpuDeviceSpecInput {
  payload: Array<UpdateVGpuDeviceSpecPayload>
  action: ActionInput
}

export interface UpdateVGpuDeviceSpecPayload {
  uuid: Scalars['String']
  deviceType: VGpuDeviceType
}

export interface CreateListenerInput {
  payload: CreateListenerPayload
  action: ActionInput
}

export interface CreateListenerPayload {
  name: Scalars['String']
  loadBalancerPort: Scalars['Int']
  loadBalancerUuid?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  instancePort?: Maybe<Scalars['Int']>
  protocol?: Maybe<LoadBalancerProtocol>
  certificateUuid?: Maybe<Scalars['String']>
  resourceUuid?: Maybe<Scalars['String']>
  healthCheckProtocol?: Maybe<HealthCheckProtocol>
  healthCheckMethod?: Maybe<HealthCheckMethod>
  healthCheckURI?: Maybe<Scalars['String']>
  healthCheckHttpCode?: Maybe<Scalars['String']>
  aclStatus?: Maybe<LoadBalancerAclStatus>
  aclUuids?: Maybe<Array<Scalars['String']>>
  aclType?: Maybe<LoadBalancerAclType>
  tagUuids?: Maybe<Array<Scalars['String']>>
  systemTags?: Maybe<Array<Scalars['String']>>
  serverGroupUuids?: Maybe<Array<Scalars['String']>>
}

export enum LoadBalancerProtocol {
  TCP = 'TCP',
  HTTP = 'HTTP',
  HTTPS = 'HTTPS',
  UDP = 'UDP'
}

export enum HealthCheckProtocol {
  TCP = 'TCP',
  HTTP = 'HTTP',
  UDP = 'UDP'
}

export enum HealthCheckMethod {
  GET = 'GET',
  HEAD = 'HEAD'
}

export enum LoadBalancerAclStatus {
  enable = 'enable',
  disable = 'disable'
}

export enum LoadBalancerAclType {
  white = 'white',
  black = 'black'
}

export interface ChangeAutoScalingGroupStateInput {
  payload: Array<ChangeAutoScalingGroupStatePayload>
  action: ActionInput
}

export interface ChangeAutoScalingGroupStatePayload {
  uuid: Scalars['String']
  stateEvent: AutoScalingGroupStateEvent
}

export enum AutoScalingGroupStateEvent {
  enable = 'enable',
  disable = 'disable'
}

export interface UpdateAlarmInput {
  payload: Array<UpdateAlarmPayload>
  action: ActionInput
}

export interface UpdateAlarmPayload {
  uuid: Scalars['String']
  name?: Maybe<Scalars['String']>
  actions?: Maybe<Array<ZwatchAlarmActionsInput>>
  description?: Maybe<Scalars['String']>
  /** 阈值比较符 */
  comparisonOperator?: Maybe<ComparisonOperator>
  /** 阈值 */
  threshold?: Maybe<Scalars['Float']>
  /** 冷却时间 */
  repeatInterval?: Maybe<Scalars['Float']>
  /** 持续时间 */
  period?: Maybe<Scalars['Float']>
  /** 报警重复次数 */
  repeatCount?: Maybe<Scalars['Float']>
  /** 开启恢复通知 */
  enableRecovery?: Maybe<Scalars['Boolean']>
  /** 报警等级 */
  emergencyLevel?: Maybe<Scalars['String']>
}

export interface ZwatchAlarmActionsInput {
  alarmUuid?: Maybe<Scalars['String']>
  actionType: Scalars['String']
  actionUuid: Scalars['String']
}

export interface UpdateScalingRuleInput {
  payload: UpdateScalingAddRulePayload
  action: ActionInput
}

export interface UpdateScalingAddRulePayload {
  updateRulePayload?: Maybe<UpdateAddRulePayload>
  updateAlarmPayload?: Maybe<UpdateAlarmPayload>
}

export interface UpdateAddRulePayload {
  uuid: Scalars['String']
  adjustmentValue?: Maybe<Scalars['Float']>
  cooldown?: Maybe<Scalars['Float']>
}

export interface UpdateScalingRemovalRuleInput {
  payload: UpdateScalingRemovalRulePayload
  action: ActionInput
}

export interface UpdateScalingRemovalRulePayload {
  updateRulePayload?: Maybe<UpdateRemovalRulePayload>
  updateAlarmPayload?: Maybe<UpdateAlarmPayload>
}

export interface UpdateRemovalRulePayload {
  uuid: Scalars['String']
  adjustmentValue?: Maybe<Scalars['Float']>
  cooldown?: Maybe<Scalars['Float']>
  removalPolicy?: Maybe<Scalars['String']>
}

export interface CreateAutoScalingGroupActionInput {
  payload: CreateAutoScalingGroupInputParam
  action: ActionInput
}

export interface CreateAutoScalingGroupInputParam {
  name: Scalars['String']
  scalingResourceType: Scalars['String']
  minResourceSize: Scalars['Float']
  maxResourceSize: Scalars['Float']
  defaultCooldown: Scalars['Float']
  removalPolicy: Scalars['String']
  description?: Maybe<Scalars['String']>
  defaultEnable?: Maybe<Scalars['Boolean']>
  resourceUuid?: Maybe<Scalars['String']>
  autoScalingSystemTags?: Maybe<Array<Scalars['String']>>
  vmInstanceName?: Maybe<Scalars['String']>
  vmInstanceDescription?: Maybe<Scalars['String']>
  vmInstanceOfferingUuid?: Maybe<Scalars['String']>
  imageUuid?: Maybe<Scalars['String']>
  l3NetworkUuids?: Maybe<Array<Scalars['String']>>
  dataDiskOfferingUuids?: Maybe<Array<Scalars['String']>>
  vmTemplateSystemTags?: Maybe<Array<Scalars['String']>>
  defaultL3NetworkUuid?: Maybe<Scalars['String']>
  userData?: Maybe<Scalars['String']>
  strategy?: Maybe<Scalars['String']>
  type?: Maybe<Scalars['String']>
  cooldown_add?: Maybe<Scalars['Float']>
  adjustmentType?: Maybe<Scalars['String']>
  adjustmentValue_add?: Maybe<Scalars['Float']>
  namespace?: Maybe<Scalars['String']>
  metricName?: Maybe<Scalars['String']>
  period_add?: Maybe<Scalars['Float']>
  threshold_add?: Maybe<Scalars['Float']>
  repeatInterval_add?: Maybe<Scalars['Float']>
  comparisonOperator_add?: Maybe<Scalars['String']>
  period_remove?: Maybe<Scalars['Float']>
  threshold_remove?: Maybe<Scalars['Float']>
  repeatInterval_remove?: Maybe<Scalars['Float']>
  comparisonOperator_remove?: Maybe<Scalars['String']>
  actions?: Maybe<Array<AutoScalingGroupActions>>
  labels?: Maybe<Array<AutoScalingGroupLabels>>
  cooldown_remove?: Maybe<Scalars['Float']>
  adjustmentValue_remove?: Maybe<Scalars['Float']>
}

export interface AutoScalingGroupActions {
  actionType?: Maybe<Scalars['String']>
  actionUuid?: Maybe<Scalars['String']>
}

export interface AutoScalingGroupLabels {
  key?: Maybe<Scalars['String']>
  op?: Maybe<Scalars['String']>
  value?: Maybe<Scalars['String']>
}

export interface DeleteAutoScalingGroupActionInput {
  payload: Array<DeleteAutoScalingGroupInputParam>
  action: ActionInput
}

export interface DeleteAutoScalingGroupInputParam {
  uuid: Scalars['String']
  templateUuid?: Maybe<Scalars['String']>
}

export interface UpdateAutoScalingGroupInput {
  payload: UpdateAutoScalingGroupPayload
  action: ActionInput
}

export interface UpdateAutoScalingGroupPayload {
  uuid: Scalars['String']
  name?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
}

export interface UpdateAutoScalingVmTemplateInput {
  payload: UpdateAutoScalingVmTemplatePayload
  action: ActionInput
}

export interface UpdateAutoScalingVmTemplatePayload {
  uuid: Scalars['String']
  userdata?: Maybe<Scalars['String']>
  imageUuid?: Maybe<Scalars['String']>
}

export interface ChangeSecurityGroupStateInput {
  payload: Array<ChangeSecurityGroupStatePayload>
  action: ActionInput
}

export interface ChangeSecurityGroupStatePayload {
  uuid: Scalars['String']
  stateEvent: SecurityGroupStateEvent
}

export enum SecurityGroupStateEvent {
  enable = 'enable',
  disable = 'disable'
}

export interface DeleteSecurityGroupInput {
  payload: Array<DeleteSecurityGroupPayload>
  action: ActionInput
}

export interface DeleteSecurityGroupPayload {
  uuid: Scalars['String']
}

export interface AttachSecurityGroupToL3NetworkInput {
  payload: Array<AttachSecurityGroupToL3NetworkPayload>
  action: ActionInput
}

export interface AttachSecurityGroupToL3NetworkPayload {
  l3NetworkUuid: Scalars['String']
  securityGroupUuid: Scalars['String']
}

export interface DetachSecurityGroupFromL3NetworkInput {
  payload: Array<DetachSecurityGroupFromL3NetworkPayload>
  action: ActionInput
}

export interface DetachSecurityGroupFromL3NetworkPayload {
  l3NetworkUuid: Scalars['String']
  securityGroupUuid: Scalars['String']
}

export interface AddSecurityGroupRuleInput {
  payload: Array<AddSecurityGroupRulePayload>
  action: ActionInput
}

export interface AddSecurityGroupRulePayload {
  type?: Maybe<SecurityGroupRuleType>
  ipVersion?: Maybe<Scalars['Int']>
  startPort?: Maybe<Scalars['Int']>
  endPort?: Maybe<Scalars['Int']>
  protocol?: Maybe<SecurityGroupRuleProtocolType>
  allowedCidr?: Maybe<Scalars['String']>
  securityGroupUuid: Scalars['String']
  remoteSecurityGroupUuids?: Maybe<Array<Scalars['String']>>
}

export interface DeleteSecurityGroupRuleInput {
  payload: Array<DeleteSecurityGroupRulePayload>
  action: ActionInput
}

export interface DeleteSecurityGroupRulePayload {
  ruleUuids: Array<Scalars['String']>
}

export interface AddVmNicToSecurityGroupInput {
  payload: Array<AddVmNicToSecurityGroupPayload>
  action: ActionInput
}

export interface AddVmNicToSecurityGroupPayload {
  vmNicUuids: Array<Scalars['String']>
  securityGroupUuid: Scalars['String']
}

export interface DeleteVmNicFromSecurityGroupInput {
  payload: Array<DeleteVmNicFromSecurityGroupPayload>
  action: ActionInput
}

export interface DeleteVmNicFromSecurityGroupPayload {
  vmNicUuids: Array<Scalars['String']>
  securityGroupUuid: Scalars['String']
}

export interface CreateSecurityGroupInput {
  payload: CreateSecurityGroupPayload
  action: ActionInput
}

export interface CreateSecurityGroupPayload {
  name: Scalars['String']
  description?: Maybe<Scalars['String']>
  l3NetworkUuids: Array<Scalars['String']>
  rules?: Maybe<Array<AddRuleParam>>
  vmNicUuids?: Maybe<Array<Scalars['String']>>
}

export interface AddRuleParam {
  type?: Maybe<SecurityGroupRuleType>
  ipVersion?: Maybe<Scalars['Int']>
  startPort?: Maybe<Scalars['Int']>
  endPort?: Maybe<Scalars['Int']>
  protocol?: Maybe<SecurityGroupRuleProtocolType>
  allowedCidr?: Maybe<Scalars['String']>
  remoteSecurityGroupUuids?: Maybe<Array<Scalars['String']>>
}

export interface UpdateSecurityGroupInput {
  payload: Array<UpdateSecurityGroupPayload>
  action: ActionInput
}

export interface UpdateSecurityGroupPayload {
  uuid: Scalars['String']
  name: Scalars['String']
  description: Scalars['String']
}

export interface CreateVipNetworkActionInput {
  payload: CreateVipNetworkInput
  action: ActionInput
}

export interface CreateVipNetworkInput {
  name: Scalars['String']
  description?: Maybe<Scalars['String']>
  l3NetworkUuid?: Maybe<Scalars['String']>
  requiredIp?: Maybe<Scalars['String']>
  ipRangeUuid?: Maybe<Scalars['String']>
  qos?: Maybe<Array<VipNetworkQosInput>>
}

export interface VipNetworkQosInput {
  inboundBandwidth?: Maybe<Scalars['BigInt']>
  outboundBandwidth?: Maybe<Scalars['BigInt']>
  port?: Maybe<Scalars['Int']>
}

export interface AddVipNetworkQosActionInput {
  payload: Array<VipNetworkOnlyQosInput>
  action: ActionInput
}

export interface VipNetworkOnlyQosInput {
  inboundBandwidth?: Maybe<Scalars['BigInt']>
  outboundBandwidth?: Maybe<Scalars['BigInt']>
  port?: Maybe<Scalars['Int']>
  vipUuid: Scalars['String']
}

export interface DeleteVipNetworkActionInput {
  payload: Array<DeleteVipNetworkInput>
  action: ActionInput
}

export interface DeleteVipNetworkInput {
  uuid: Scalars['String']
}

export interface DeleteVipNetworkQosActionInput {
  payload: Array<DeleteVipNetworkQosInput>
  action: ActionInput
}

export interface DeleteVipNetworkQosInput {
  vipUuid: Scalars['String']
  port: Scalars['Int']
}

export interface UpdateVipNetworkActionInput {
  payload: UpdateVipNetworkInput
  action: ActionInput
}

export interface UpdateVipNetworkInput {
  name: Scalars['String']
  description?: Maybe<Scalars['String']>
  l3NetworkUuid?: Maybe<Scalars['String']>
  requiredIp?: Maybe<Scalars['String']>
  ipRangeUuid?: Maybe<Scalars['String']>
  uuid: Scalars['String']
}

export interface DeleteFlowMeterInput {
  payload: Array<DeleteFlowMeterPayload>
  action: ActionInput
}

export interface DeleteFlowMeterPayload {
  uuid: Scalars['String']
}

export interface UpdateFlowMeterInput {
  payload: Array<UpdateFlowMeterPayload>
  action: ActionInput
}

export interface UpdateFlowMeterPayload {
  uuid: Scalars['String']
  /** 流量监控协议的版本 */
  version?: Maybe<Scalars['String']>
  /** 流的采样率 */
  sample?: Maybe<Scalars['Int']>
  name?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  /** 流发送间隔 */
  expireInterval?: Maybe<Scalars['Int']>
  /** 系统标签 */
  systemTags?: Maybe<Array<Scalars['String']>>
  /** 用户标签 */
  userTags?: Maybe<Array<Scalars['String']>>
}

export interface AddVRouterNetworksToFlowMeterInput {
  payload: AddVRouterNetworksToFlowMeterPayload
  action: ActionInput
}

export interface AddVRouterNetworksToFlowMeterPayload {
  /** VPC路由器uuid */
  vRouterUuid: Scalars['String']
  /** 网络 uuids */
  l3NetworkUuids: Array<Scalars['String']>
  /** 流量监控资源 uuids */
  flowMeterUuid?: Maybe<Scalars['String']>
}

export interface CreateFlowMeterInput {
  payload: CreateFlowMeterPayload
  action: ActionInput
}

export interface CreateFlowMeterPayload {
  /** 流量监控协议的版本 */
  version?: Maybe<Scalars['String']>
  /** 流的采样率 */
  sample?: Maybe<Scalars['Int']>
  name?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  /** 流发送间隔 */
  expireInterval: Scalars['Int']
  /** 资源 UUID */
  resourceUuid?: Maybe<Scalars['String']>
  /** 搜集器的ip地址 */
  server: Scalars['String']
  /** 搜集器服务的UDP端 */
  port: Scalars['Int']
  /** 路由配置 */
  routerConfig?: Maybe<Array<AddVRouterNetworksToFlowMeterPayload>>
  /** 标签UUID列表 */
  tagUuids?: Maybe<Array<Scalars['String']>>
  /** 系统标签 */
  systemTags?: Maybe<Array<Scalars['String']>>
  /** 用户标签 */
  userTags?: Maybe<Array<Scalars['String']>>
}

export interface UpdateFlowCollectorInput {
  payload: Array<UpdateFlowCollectorPayload>
  action: ActionInput
}

export interface UpdateFlowCollectorPayload {
  uuid: Scalars['String']
  /** 搜集器的IP */
  server?: Maybe<Scalars['String']>
  /** UDP端口 */
  port?: Maybe<Scalars['Float']>
  /** 系统标签 */
  systemTags?: Maybe<Array<Scalars['String']>>
  /** 用户标签 */
  userTags?: Maybe<Array<Scalars['String']>>
}

export interface RemoveVRouterNetworksFromFlowMeterInput {
  payload: Array<RemoveVRouterNetworksFromFlowMeterPayload>
  action: ActionInput
}

export interface RemoveVRouterNetworksFromFlowMeterPayload {
  /** 网络区域表中的uuid */
  uuid: Scalars['String']
}

export interface DeleteVpcConsolePasswordInput {
  payload: DeleteVpcConsolePasswordPayload
  action: ActionInput
}

export interface DeleteVpcConsolePasswordPayload {
  uuid: Scalars['String']
}

export interface SetVpcConsolePasswordInput {
  payload: SetVpcConsolePasswordPayload
  action: ActionInput
}

export interface SetVpcConsolePasswordPayload {
  uuid: Scalars['String']
  consolePassword: Scalars['String']
}

export interface StartVpcInput {
  payload: Array<StartVpcPayload>
  action: ActionInput
}

export interface StartVpcPayload {
  uuid: Scalars['String']
}

export interface StopVpcInput {
  payload: Array<StopVpcPayload>
  action: ActionInput
}

export interface StopVpcPayload {
  uuid: Scalars['String']
}

export interface RebootVpcInput {
  payload: Array<RebootVpcPayload>
  action: ActionInput
}

export interface RebootVpcPayload {
  uuid: Scalars['String']
}

export interface ReconnectVpcInput {
  payload: Array<ReconnectVpcPayload>
  action: ActionInput
}

export interface ReconnectVpcPayload {
  vmInstanceUuid: Scalars['String']
}

export interface CreateVpcInput {
  payload: CreateVpcPayload
  action: ActionInput
}

export interface CreateVpcPayload {
  name: Scalars['String']
  virtualRouterOfferingUuid: Scalars['String']
  description?: Maybe<Scalars['String']>
  resourceUuid?: Maybe<Scalars['String']>
  dns?: Maybe<Scalars['String']>
  systemTags?: Maybe<CreateVpcVRouterSystemTag>
}

export interface CreateVpcVRouterSystemTag {
  haUuid?: Maybe<Scalars['String']>
  ipv4?: Maybe<StaticVip>
  ipv6?: Maybe<StaticVip>
  clusterUuid?: Maybe<Scalars['String']>
}

export interface StaticVip {
  L3UUID: Scalars['String']
  IP: Scalars['String']
}

export interface AddDnsToVpcInput {
  payload: Array<AddDnsToVpcPayload>
  action: ActionInput
}

export interface AddDnsToVpcPayload {
  uuid: Scalars['String']
  dns: Scalars['String']
  resourceUuid?: Maybe<Scalars['String']>
}

export interface RemoveDnsFromVpcInput {
  payload: Array<RemoveDnsFromVpcPayload>
  action: ActionInput
}

export interface RemoveDnsFromVpcPayload {
  uuid: Scalars['String']
  dns: Scalars['String']
}

export interface DeleteVpcInput {
  payload: Array<DeleteVpcPayload>
  action: ActionInput
}

export interface DeleteVpcPayload {
  uuid: Scalars['String']
  deleteVolume: Scalars['Boolean']
}

export interface SetVpcHaStickStragedyActionInput {
  payload: Array<SetVpcHaStickStragedyPayload>
  action: ActionInput
}

export interface SetVpcHaStickStragedyPayload {
  uuid: Scalars['String']
}

export interface RemoveVpcHaStickStragedyActionInput {
  payload: Array<RemoveVpcHaStickStragedyPayload>
  action: ActionInput
}

export interface RemoveVpcHaStickStragedyPayload {
  vmInstanceUuid: Scalars['String']
  clusterUuid: Scalars['String']
}

export interface ColdMigrateVpcInput {
  payload: ColdMigrateVpcPayload
  action: ActionInput
}

export interface ColdMigrateVpcPayload {
  volumeUuid: Scalars['String']
  destHostUuid: Scalars['String']
}

export interface MigrateVpcInput {
  payload: MigrateVpcPayload
  action: ActionInput
}

export interface MigrateVpcPayload {
  vmInstanceUuid: Scalars['String']
  hostUuid: Scalars['String']
  strategy?: Maybe<Scalars['String']>
}

export interface UpdateVpcInput {
  payload: UpdateVpcPayload
  action: ActionInput
}

export interface UpdateVpcPayload {
  uuid: Scalars['String']
  name?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  cpuNum?: Maybe<Scalars['Float']>
  memorySize?: Maybe<Scalars['Float']>
  platform?: Maybe<Scalars['String']>
  defaultL3NetworkUuid?: Maybe<Scalars['String']>
}

export interface SetVpcVRouterDistributedRoutingEnabledInput {
  payload: SetVpcVRouterDistributedRoutingEnabledPayload
  action: ActionInput
}

export interface SetVpcVRouterDistributedRoutingEnabledPayload {
  uuid: Scalars['String']
  stateEvent: StateEvent
}

export enum StateEvent {
  enable = 'enable',
  disable = 'disable'
}

export interface SetVpcVRouterNetworkServiceStateInput {
  payload: SetVpcVRouterNetworkServiceStatePayload
  action: ActionInput
}

export interface SetVpcVRouterNetworkServiceStatePayload {
  uuid: Scalars['String']
  networkService: NetworkServiceEnum
  state: StateEvent
}

export enum NetworkServiceEnum {
  SNAT = 'SNAT'
}

export interface OpenStsInput {
  payload: Array<OpenStsPayload>
  action: ActionInput
}

export interface OpenStsPayload {
  name: Scalars['String']
  vRouterUuid: Scalars['String']
  description?: Maybe<Scalars['String']>
  type?: Maybe<PolicyRouteType>
  tagUuids?: Maybe<Array<Scalars['String']>>
}

export enum PolicyRouteType {
  User = 'User',
  EgressWhereComeFrom = 'EgressWhereComeFrom'
}

export interface CloseStsInput {
  payload: Array<CloseStsPayload>
  action: ActionInput
}

export interface CloseStsPayload {
  uuid: Scalars['String']
  /** 仅用于更新前端缓存 */
  vRouterUuid: Scalars['String']
}

export interface UpdateVpcDefaultNetworkInput {
  payload: UpdateVpcDefaultNetworkPayload
  action: ActionInput
}

export interface UpdateVpcDefaultNetworkPayload {
  vmInstanceUuid: Scalars['String']
  defaultRouteL3NetworkUuid?: Maybe<Scalars['String']>
}

export interface CreateMulticastRouterInput {
  payload: CreateMulticastRouterPayload
  action: ActionInput
}

export interface CreateMulticastRouterPayload {
  vpcRouterVmUuid: Scalars['String']
  description?: Maybe<Scalars['String']>
  resourceUuid?: Maybe<Scalars['String']>
  tagUuids?: Maybe<Array<Scalars['String']>>
}

export interface DeleteMulticastRouterInput {
  payload: Array<DeleteMulticastRouterPayload>
  action: ActionInput
}

export interface DeleteMulticastRouterPayload {
  uuid: Scalars['String']
}

export interface ChangeMulticastRouterStateInput {
  payload: Array<ChangeMulticastRouterStatePayload>
  action: ActionInput
}

export interface ChangeMulticastRouterStatePayload {
  uuid: Scalars['String']
  stateEvent: StateEvent
}

export interface AddRendezvousPointToMulticastRouterInput {
  payload: AddRendezvousPointToMulticastRouterPayload
  action: ActionInput
}

export interface AddRendezvousPointToMulticastRouterPayload {
  uuid: Scalars['String']
  rpAddress: Scalars['String']
  groupAddress: Scalars['String']
  resourceUuid?: Maybe<Scalars['String']>
  tagUuids?: Maybe<Array<Scalars['String']>>
}

export interface RemoveRendezvousPointFromMulticastRouterInput {
  payload: RemoveRendezvousPointFromMulticastRouterPayload
  action: ActionInput
}

export interface RemoveRendezvousPointFromMulticastRouterPayload {
  uuid: Scalars['String']
  rpAddresses: Array<Scalars['String']>
  groupAddresses: Array<Scalars['String']>
}

export interface DeleteVpcHaGroupInput {
  payload: Array<DeleteVpcHaGroupPayload>
  action: ActionInput
}

export interface DeleteVpcHaGroupPayload {
  uuid: Scalars['String']
}

export interface CreateVpcHaGroupInput {
  payload: CreateVpcHaGroupPayload
  action: ActionInput
}

export interface CreateVpcHaGroupPayload {
  name: Scalars['String']
  description?: Maybe<Scalars['String']>
  monitorIps?: Maybe<Array<Scalars['String']>>
  addVpcMethod?: Maybe<Scalars['String']>
  createVpcPayload?: Maybe<CreateVpcPayload>
  instanceOfferingUuid?: Maybe<Scalars['String']>
  importedVpc?: Maybe<ImportedVpc>
}

export interface ImportedVpc {
  name: Scalars['String']
  uuid: Scalars['String']
  description?: Maybe<Scalars['String']>
}

export interface AddVpcToHaGroupInput {
  payload: AddVpcToHaGroupPayload
  action: ActionInput
}

export interface AddVpcToHaGroupPayload {
  haGroupUuid: Scalars['String']
  attachedRouterNum: Scalars['Int']
  addVpcMethod?: Maybe<Scalars['String']>
  createVpcPayload?: Maybe<CreateVpcPayload>
  instanceOfferingUuid?: Maybe<Scalars['String']>
  importedVpc?: Maybe<ImportedVpc>
}

export interface UpdateVpcHaGroupInput {
  payload: UpdateVpcHaGroupPayload
  action: ActionInput
}

export interface UpdateVpcHaGroupPayload {
  uuid: Scalars['String']
  name?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
}

export interface ChangeVpcHaGroupMonitorIpsInput {
  payload: ChangeVpcHaGroupMonitorIpsPayload
  action: ActionInput
}

export interface ChangeVpcHaGroupMonitorIpsPayload {
  uuid: Scalars['String']
  monitorIps?: Maybe<Array<Scalars['String']>>
}

export interface ShareVirtualRouterOfferingToPublicInput {
  payload: Array<ShareVirtualRouterOfferingToPublicServicePayload>
  action: ActionInput
}

export interface ShareVirtualRouterOfferingToPublicServicePayload {
  uuid: Scalars['String']
}

export interface UpdateVirtualRouterOfferingInput {
  payload: Array<UpdateVirtualRouterOfferingPayload>
  action: ActionInput
}

export interface UpdateVirtualRouterOfferingPayload {
  uuid: Scalars['String']
  name?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  /** 系统标签 */
  systemTags?: Maybe<Array<Scalars['String']>>
  /** 用户标签 */
  userTags?: Maybe<Array<Scalars['String']>>
}

export interface DeleteVirtualRouterOfferingInput {
  payload: Array<DeleteVirtualRouterOfferingPayload>
  action: ActionInput
}

export interface DeleteVirtualRouterOfferingPayload {
  uuid: Scalars['String']
}

export interface CreateVirtualRouterOfferingInput {
  payload: Array<CreateVirtualRouterOfferingPayload>
  action: ActionInput
}

export interface CreateVirtualRouterOfferingPayload {
  name: Scalars['String']
  cpuNum: Scalars['Int']
  memorySize: Scalars['Float']
  type?: Maybe<Scalars['String']>
  /** 排序主键 */
  sortKey?: Maybe<Scalars['Int']>
  /** 分配策略 */
  allocatorStrategy?: Maybe<Scalars['String']>
  /** 区域UUID */
  zoneUuid: Scalars['String']
  isDefault?: Maybe<Scalars['Boolean']>
  description?: Maybe<Scalars['String']>
  /** 管理L3网络UUID */
  managementNetworkUuid: Scalars['String']
  /** 公有L3网络UUID */
  publicNetworkUuid: Scalars['String']
  /** 镜像UUID */
  imageUuid: Scalars['String']
}

export interface RevokeVirtualRouterOfferingSharingFromPublicInput {
  payload: Array<RevokeVirtualRouterOfferingSharingFromPublicPayload>
  action: ActionInput
}

export interface RevokeVirtualRouterOfferingSharingFromPublicPayload {
  uuid: Scalars['String']
}

export interface ChangeVirtualRouterOfferingStateInput {
  payload: Array<ChangeVirtualRouterOfferingStatePayload>
  action: ActionInput
}

export interface ChangeVirtualRouterOfferingStatePayload {
  uuid: Scalars['String']
  stateEvent: Scalars['String']
}

export interface CheckScsiLunClusterStatusInput {
  payload: Array<CheckScsiLunClusterStatusPayload>
  action: ActionInput
}

export interface CheckScsiLunClusterStatusPayload {
  uuid: Scalars['String']
  /** 集群UUID */
  clusterUuid: Scalars['String']
}

export interface AttachScsiLunToVmInstanceInput {
  payload: Array<AttachScsiLunToVmInstancePayload>
  action: ActionInput
}

export interface AttachScsiLunToVmInstancePayload {
  /** SCSI LUN的UUID，唯一标示该资源 */
  uuid: Scalars['String']
  /** 云主机UUID */
  vmInstanceUuid: Scalars['String']
  /** 关闭自动加载多路径设备 */
  disableMultiPathAttach?: Maybe<Scalars['Boolean']>
}

export interface DetachScsiLunFromVmInstanceInput {
  payload: Array<DetachScsiLunFromVmInstancePayload>
  action: ActionInput
}

export interface DetachScsiLunFromVmInstancePayload {
  /** 资源的UUID，唯一标示该资源 */
  uuid: Scalars['String']
  /** 云主机UUID */
  vmInstanceUuid: Scalars['String']
}

export interface UpdateUsbInput {
  uuids: Array<Scalars['String']>
  name?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  state?: Maybe<UsbDeviceState>
}

export enum UsbDeviceState {
  Enabled = 'Enabled',
  Disabled = 'Disabled'
}

export interface AttachUsbDeviceToVmInput {
  payload: Array<AttachUsbDeviceToVmPayload>
  action: ActionInput
}

export interface AttachUsbDeviceToVmPayload {
  usbDeviceUuid: Scalars['String']
  vmInstanceUuid: Scalars['String']
  attachType?: Maybe<Scalars['String']>
}

export interface DetachUsbDeviceToVmInput {
  payload: Array<DetachUsbDeviceToVmPayload>
  action: ActionInput
}

export interface DetachUsbDeviceToVmPayload {
  usbDeviceUuid: Scalars['String']
}

export interface UpdateUsbDeviceInput {
  payload: Array<UpdateUsbDevicePayload>
  action: ActionInput
}

export interface UpdateUsbDevicePayload {
  uuid: Scalars['String']
  name?: Maybe<Scalars['String']>
  state?: Maybe<UsbDeviceState>
}

export interface AttachPciDeviceToVMInput {
  payload: Array<AttachPciDeviceToVMPayload>
  action: ActionInput
}

export interface AttachPciDeviceToVMPayload {
  pciDeviceUuid: Scalars['String']
  vmInstanceUuid: Scalars['String']
}

export interface DetachPciDeviceFromVMInput {
  payload: Array<DetachPciDeviceFromVMPayload>
  action: ActionInput
}

export interface DetachPciDeviceFromVMPayload {
  pciDeviceUuid: Scalars['String']
  vmInstanceUuid: Scalars['String']
}

export interface GenerateSriovPciDeviceInput {
  payload: GenerateSriovPciDevicePayload
  action: ActionInput
}

export interface GenerateSriovPciDevicePayload {
  pciDeviceUuid: Scalars['String']
  virtPartNum: Scalars['Float']
}

export interface UnGenerateSriovPciDeviceInput {
  payload: UnGenerateSriovPciDevicePayload
  action: ActionInput
}

export interface UnGenerateSriovPciDevicePayload {
  pciDeviceUuid: Scalars['String']
}

export interface UpdatePciDeviceInput {
  payload: Array<UpdatePciDevicePayload>
  action: ActionInput
}

export interface UpdatePciDevicePayload {
  uuid: Scalars['String']
  state: PciDeviceState
}

export interface AttachMdevDeviceToVMInput {
  payload: AttachMdevDeviceToVMPayload
  action: ActionInput
}

export interface AttachMdevDeviceToVMPayload {
  mdevDeviceUuid: Scalars['String']
  vmInstanceUuid: Scalars['String']
}

export interface DetachMdevDeviceFromVMInput {
  payload: DetachMdevDeviceFromVMPayload
  action: ActionInput
}

export interface DetachMdevDeviceFromVMPayload {
  mdevDeviceUuid: Scalars['String']
  vmInstanceUuid: Scalars['String']
}

export interface GenerateMdevDeviceInput {
  payload: GenerateMdevDevicePayload
  action: ActionInput
}

export interface GenerateMdevDevicePayload {
  pciDeviceUuid: Scalars['String']
  mdevSpecUuid: Scalars['String']
}

export interface UnGenerateMdevDeviceInput {
  payload: UnGenerateMdevDevicePayload
  action: ActionInput
}

export interface UnGenerateMdevDevicePayload {
  pciDeviceUuid: Scalars['String']
}

export interface AttachVGpuToVmInstanceInput {
  payload: Array<AttachVGpuToVmInstancePayload>
  action: ActionInput
}

export interface AttachVGpuToVmInstancePayload {
  vGpuDeviceUuid: Scalars['String']
  vmInstanceUuid: Scalars['String']
  type: VGpuType
}

export interface DetachVGpuFromVmInstanceInput {
  payload: Array<DetachVGpuFromVmInstancePayload>
  action: ActionInput
}

export interface DetachVGpuFromVmInstancePayload {
  vGpuDeviceUuid: Scalars['String']
  vmInstanceUuid: Scalars['String']
  type: VGpuType
}

export interface UpdateVGPUDeviceInput {
  payload: Array<UpdateVGPUDevicePayload>
  action: ActionInput
}

export interface UpdateVGPUDevicePayload {
  uuid: Scalars['String']
  state: PciDeviceState
  isMdevDevice?: Maybe<Scalars['Boolean']>
}

export interface DeleteL2NetworkActionInput {
  payload: Array<DeleteL2NetworkInput>
  action: ActionInput
}

export interface DeleteL2NetworkInput {
  uuid: Scalars['String']
}

export interface ShareL2NetworkToPublicActionInput {
  payload: Array<ShareL2NetworkToPublicPrarm>
  action: ActionInput
}

export interface ShareL2NetworkToPublicPrarm {
  uuid: Scalars['String']
}

export interface UpdateL2NetworkActionInput {
  payload: UpdateL2NetworkInput
  action: ActionInput
}

export interface UpdateL2NetworkInput {
  uuid: Scalars['String']
  name?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  systemTags?: Maybe<Array<Scalars['String']>>
}

export interface SetL2NetworkSrIovActionInput {
  payload: SetL2NetworkSrIovInput
  action: ActionInput
}

export interface SetL2NetworkSrIovInput {
  uuid: Scalars['String']
  enable: Scalars['Boolean']
}

export interface CreateL2NetworkActionInput {
  payload: CreateL2NetworkInput
  action: ActionInput
}

export interface CreateL2NetworkInput {
  name: Scalars['String']
  description?: Maybe<Scalars['String']>
  type?: Maybe<Scalars['String']>
  zoneUuid?: Maybe<Scalars['String']>
  physicalInterface?: Maybe<Scalars['String']>
  cidr?: Maybe<Scalars['String']>
  clusterUuid?: Maybe<Scalars['String']>
  vlan?: Maybe<Scalars['Float']>
  vni?: Maybe<Scalars['Float']>
  poolUuid?: Maybe<Scalars['String']>
  resourceUuid?: Maybe<Scalars['String']>
  userTags?: Maybe<Array<Scalars['String']>>
  systemTags?: Maybe<Array<Scalars['String']>>
  startVni?: Maybe<Scalars['Float']>
  endVni?: Maybe<Scalars['Float']>
  l2NetworkUuid?: Maybe<Scalars['String']>
}

export interface UpdateVCenterVmInput {
  name?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  uuid: Scalars['String']
}

export interface DeleteVCenterVmInput {
  uuid: Scalars['String']
}

export interface ExpungeVCenterVmInput {
  uuid: Scalars['String']
}

export interface CreateVCenterNetworkInput {
  payload: CreateVCenterNetworkPayload
  action: ActionInput
}

export interface CreateVCenterNetworkPayload {
  name: Scalars['String']
  zoneUuid: Scalars['String']
  description?: Maybe<Scalars['String']>
  /** L2网络类型 */
  l2NetworkType?: Maybe<Scalars['String']>
  vlan?: Maybe<Scalars['Float']>
  physicalInterface?: Maybe<Scalars['String']>
  clusterUuid?: Maybe<Scalars['String']>
  category?: Maybe<Scalars['String']>
  type?: Maybe<Scalars['String']>
  system?: Maybe<Scalars['Boolean']>
  /** DHCP服务是否开启 */
  dhcpService?: Maybe<Scalars['Boolean']>
  systemTags?: Maybe<Array<Scalars['String']>>
  showNetworkServiceType?: Maybe<Scalars['String']>
  netmask?: Maybe<Scalars['String']>
  prefixLen?: Maybe<Scalars['Int']>
  addressMode?: Maybe<Scalars['String']>
  startIp?: Maybe<Scalars['String']>
  endIp?: Maybe<Scalars['String']>
  gateway?: Maybe<Scalars['String']>
  ipRangeType?: Maybe<Scalars['String']>
  ipVersion: Scalars['Int']
  networkCidr?: Maybe<Scalars['String']>
  dns?: Maybe<Scalars['String']>
  vpcVRouterUuid?: Maybe<Scalars['String']>
  driverType?: Maybe<Scalars['String']>
}

export interface AddCephPrimaryStoragePoolInput {
  payload: AddCephPrimaryStoragePoolPayload
  action: ActionInput
}

export interface AddCephPrimaryStoragePoolPayload {
  primaryStorageUuid: Scalars['String']
  poolName: Scalars['String']
  aliasName?: Maybe<Scalars['String']>
  isCreate?: Maybe<Scalars['Boolean']>
  type: CephPrimaryStoragePoolType
}

export enum CephPrimaryStoragePoolType {
  Root = 'Root',
  Data = 'Data',
  ImageCache = 'ImageCache',
  BackupStorage = 'BackupStorage'
}

export interface UpdateCephPrimaryStoragePoolInput {
  payload: UpdateCephPrimaryStoragePoolPayload
  action: ActionInput
}

export interface UpdateCephPrimaryStoragePoolPayload {
  uuid: Scalars['String']
  aliasName?: Maybe<Scalars['String']>
}

export interface DeleteCephPrimaryStoragePoolListInput {
  payload: Array<DeleteCephPrimaryStoragePoolPayload>
  action: ActionInput
}

export interface DeleteCephPrimaryStoragePoolPayload {
  uuid: Scalars['String']
}

export interface CleanUpTrashListInput {
  payload: Array<CleanUpTrashPayload>
  action: ActionInput
}

export interface CleanUpTrashPayload {
  uuid: Scalars['String']
  trashId?: Maybe<Scalars['Int']>
  type: TrashQueryType
}

export interface AddCephMonInput {
  payload: AddCephMonPayload
  action: ActionInput
}

export interface AddCephMonPayload {
  uuid: Scalars['String']
  monUrls: Array<Scalars['String']>
  type: CephMonType
}

export interface UpdateCephMonInput {
  payload: UpdateCephMonPayload
  action: ActionInput
}

export interface UpdateCephMonPayload {
  monUuid: Scalars['String']
  sshUsername?: Maybe<Scalars['String']>
  sshPassword?: Maybe<Scalars['String']>
  sshPort?: Maybe<Scalars['Float']>
  monPort?: Maybe<Scalars['Float']>
  type: CephMonType
}

export interface DeleteCephMonListInput {
  payload: Array<DeleteCephMonPayload>
  action: ActionInput
}

export interface DeleteCephMonPayload {
  uuid: Scalars['String']
  monHostnames: Array<Scalars['String']>
  type: CephMonType
}

export interface AddIscsiServerInput {
  payload: AddIscsiServerPayload
  action: ActionInput
}

export interface AddIscsiServerPayload {
  name: Scalars['String']
  ip: Scalars['String']
  port: Scalars['Float']
  chapUserName?: Maybe<Scalars['String']>
  chapUserPassword?: Maybe<Scalars['String']>
  clusterUuid?: Maybe<Scalars['String']>
}

export interface UpdateIscsiServerInput {
  payload: Array<UpdateIscsiServerPayload>
  action: ActionInput
}

export interface UpdateIscsiServerPayload {
  uuid: Scalars['String']
  /** 资源名称 */
  state?: Maybe<Scalars['String']>
  /** 启用状态 */
  name?: Maybe<Scalars['String']>
  /** CHAP用户名 */
  chapUserName?: Maybe<Scalars['String']>
  /** CHAP密码 */
  chapUserPassword?: Maybe<Scalars['String']>
}

export interface DeleteIscsiServerInput {
  payload: Array<DeleteIscsiServerPayload>
  action: ActionInput
}

export interface DeleteIscsiServerPayload {
  uuid: Scalars['String']
}

export interface RefreshIscsiServerInput {
  payload: Array<RefreshIscsiServerPayload>
  action: ActionInput
}

export interface RefreshIscsiServerPayload {
  /** iSCSI服务器的的UUID */
  uuid: Scalars['String']
}

export interface AttachIscsiServerToClusterInput {
  payload: Array<AttachIscsiServerToClusterPayload>
  action: ActionInput
}

export interface AttachIscsiServerToClusterPayload {
  /** iSCSI服务器的的UUID */
  uuid: Scalars['String']
  /** 	集群UUID */
  clusterUuid: Scalars['String']
}

export interface DetachIscsiServerFromClusterInput {
  payload: Array<DetachIscsiServerFromClusterPayload>
  action: ActionInput
}

export interface DetachIscsiServerFromClusterPayload {
  /** iSCSI服务器的的UUID */
  uuid: Scalars['String']
  /** 	集群UUID */
  clusterUuid: Scalars['String']
}

export interface RefreshFiberChannelStorageInput {
  payload: Array<RefreshFiberChannelStoragePayload>
  action: ActionInput
}

export interface RefreshFiberChannelStoragePayload {
  /** 区域UUID */
  zoneUuid: Scalars['String']
}

export interface AddSharedBlockToSharedBlockGroupInput {
  payload: Array<AddSharedBlockToSharedBlockGroupPayload>
  action: ActionInput
}

export interface AddSharedBlockToSharedBlockGroupPayload {
  uuid: Scalars['String']
  diskUuid: Scalars['String']
  systemTags?: Maybe<Array<Scalars['String']>>
}

export interface RefreshSharedblockDeviceCapacityInput {
  payload: Array<RefreshSharedblockDeviceCapacityPayload>
  action: ActionInput
}

export interface RefreshSharedblockDeviceCapacityPayload {
  uuid: Scalars['String']
  sharedBlockGroupUuid: Scalars['String']
}

export interface CreateAlarmInput {
  payload: CreateAlarmPayload
  action: ActionInput
}

export interface CreateAlarmPayload {
  name: Scalars['String']
  description?: Maybe<Scalars['String']>
  actions?: Maybe<Array<AlarmActionsInput>>
  /** 阈值比较符 */
  comparisonOperator: ComparisonOperator
  /** 开启恢复通知 */
  enableRecovery?: Maybe<Scalars['Boolean']>
  /** 报警等级 */
  emergencyLevel?: Maybe<Scalars['String']>
  /** 监控项名 */
  metricName: Scalars['String']
  /** 名字空间 */
  namespace: Scalars['String']
  /** 标签列表 */
  labels?: Maybe<Array<AlarmLabelsInput>>
  /** 阈值持续时间 */
  period?: Maybe<Scalars['Int']>
  /** 阈值 */
  threshold: Scalars['Float']
  /** 报警重复时间 */
  repeatInterval?: Maybe<Scalars['Int']>
  /** 报警重复次数 */
  repeatCount?: Maybe<Scalars['Int']>
  resourceUuid?: Maybe<Scalars['String']>
  /** 报警器类型 */
  type?: Maybe<Scalars['String']>
}

export interface AlarmActionsInput {
  alarmUuid?: Maybe<Scalars['String']>
  actionType: Scalars['String']
  actionUuid: Scalars['String']
}

export interface AlarmLabelsInput {
  key: Scalars['String']
  op: Scalars['String']
  value: Scalars['String']
}

export interface SubscribeEventInput {
  payload: SubscribeEventPayload
  action: ActionInput
}

export interface SubscribeEventPayload {
  name?: Maybe<Scalars['String']>
  actions?: Maybe<Array<AlarmActionsInput>>
  /** 开启恢复通知 */
  enableRecovery?: Maybe<Scalars['Boolean']>
  /** 报警等级 */
  emergencyLevel?: Maybe<Scalars['String']>
  /** 名字空间 */
  namespace: Scalars['String']
  /** 标签列表 */
  labels?: Maybe<Array<AlarmLabelsInput>>
  eventName?: Maybe<Scalars['String']>
  resourceUuid?: Maybe<Scalars['String']>
}

export interface EnableZWatchAlarmInput {
  payload: Array<EnableZWatchAlarmPayload>
  action: ActionInput
}

export interface EnableZWatchAlarmPayload {
  uuid: Scalars['String']
}

export interface DeleteZWatchAlarmInput {
  payload: Array<DeleteZWatchAlarmPayload>
  action: ActionInput
}

export interface DeleteZWatchAlarmPayload {
  uuid: Scalars['String']
}

export interface DisableZWatchAlarmInput {
  payload: Array<DisableZWatchAlarmPayload>
  action: ActionInput
}

export interface DisableZWatchAlarmPayload {
  uuid: Scalars['String']
}

export interface UnsubscribeEventInput {
  payload: Array<UnsubscribeEventPayload>
  action: ActionInput
}

export interface UnsubscribeEventPayload {
  uuid: Scalars['String']
}

export interface UpdateAlarmLabelInput {
  payload: Array<UpdateAlarmLabelPayload>
  action: ActionInput
}

export interface UpdateAlarmLabelPayload {
  uuid: Scalars['String']
  key: Scalars['String']
  operator: Scalars['String']
  value: Scalars['String']
}

export interface AddActionToAlarmInput {
  payload: Array<AddActionToAlarmPayload>
  action: ActionInput
}

export interface AddActionToAlarmPayload {
  alarmUuid: Scalars['String']
  actionUuid: Scalars['String']
  actionType?: Maybe<Scalars['String']>
}

export interface UpdateSubscribeEventInput {
  payload: Array<UpdateSubscribeEventPayload>
  action: ActionInput
}

export interface UpdateSubscribeEventPayload {
  uuid: Scalars['String']
  name?: Maybe<Scalars['String']>
  /** 报警等级 */
  emergencyLevel?: Maybe<Scalars['String']>
}

export interface RemoveActionFromAlarmInput {
  payload: Array<RemoveActionFromAlarmPayload>
  action: ActionInput
}

export interface RemoveActionFromAlarmPayload {
  alarmUuid: Scalars['String']
  actionUuid: Scalars['String']
}

export interface AddActionToEventSubscriptionInput {
  payload: Array<AddActionToEventSubscriptionPayload>
  action: ActionInput
}

export interface AddActionToEventSubscriptionPayload {
  subscriptionUuid: Scalars['String']
  actionUuid: Scalars['String']
  actionType?: Maybe<Scalars['String']>
}

export interface RemoveActionFromEventSubscriptionInput {
  payload: Array<RemoveActionFromEventSubscriptionPayload>
  action: ActionInput
}

export interface RemoveActionFromEventSubscriptionPayload {
  subscriptionUuid: Scalars['String']
  actionUuid: Scalars['String']
}

export interface AddSNSDingTalkAtPersonInput {
  payload: Array<AddSNSDingTalkAtPersonPayload>
  action: ActionInput
}

export interface AddSNSDingTalkAtPersonPayload {
  phoneNumber: Scalars['String']
  endpointUuid: Scalars['String']
}

export interface AddEmailAddressToEndpointInput {
  payload: Array<AddEmailAddressToEndpointPayload>
  action: ActionInput
}

export interface AddEmailAddressToEndpointPayload {
  emailAddress: Scalars['String']
  endpointUuid: Scalars['String']
}

export interface AddSmsReceiverInput {
  payload: Array<AddSmsReceiverPayload>
  action: ActionInput
}

export interface AddSmsReceiverPayload {
  phoneNumber: Scalars['String']
  endpointUuid: Scalars['String']
  /** 现阶段只有一个选项,所以非必填 */
  type?: Maybe<SmsReceiverType>
}

export enum SmsReceiverType {
  AliyunSms = 'AliyunSms'
}

export interface ChangeEndpointInput {
  payload: Array<ChangeEndpointStatePayload>
  action: ActionInput
}

export interface ChangeEndpointStatePayload {
  uuid: Scalars['String']
  stateEvent: StateEvent
}

export interface CreateDingTalkEndpointInput {
  payload: Array<CreateDingTalkEndpointPayload>
  action: ActionInput
}

export interface CreateDingTalkEndpointPayload {
  url: Scalars['String']
  name: Scalars['String']
  description?: Maybe<Scalars['String']>
  atAll?: Maybe<Scalars['Boolean']>
  atPersonPhoneNumbers?: Maybe<Array<Scalars['String']>>
}

export interface CreateEmailEndpointInput {
  payload: Array<CreateEmailEndpointPayload>
  action: ActionInput
}

export interface CreateEmailEndpointPayload {
  email?: Maybe<Scalars['String']>
  name: Scalars['String']
  emails?: Maybe<Array<Scalars['String']>>
  description?: Maybe<Scalars['String']>
  platformUuid?: Maybe<Scalars['String']>
}

export interface CreateHttpEndpointInput {
  payload: Array<CreateHttpEndpointPayload>
  action: ActionInput
}

export interface CreateHttpEndpointPayload {
  url: Scalars['String']
  name: Scalars['String']
  description?: Maybe<Scalars['String']>
  username?: Maybe<Scalars['String']>
  password?: Maybe<Scalars['String']>
}

export interface CreateAliyunSmsEndpointInput {
  payload: Array<CreateAliyunSmsEndpointPayload>
  action: ActionInput
}

export interface CreateAliyunSmsEndpointPayload {
  accessKeyUuid: Scalars['String']
  name: Scalars['String']
  description?: Maybe<Scalars['String']>
  receivers?: Maybe<Array<Scalars['String']>>
}

export interface CreateSNSMicrosoftTeamsEndpointInput {
  payload: Array<CreateSNSMicrosoftTeamsEndpointPayload>
  action: ActionInput
}

export interface CreateSNSMicrosoftTeamsEndpointPayload {
  url: Scalars['String']
  name: Scalars['String']
  description?: Maybe<Scalars['String']>
}

export interface DeleteEndpointInput {
  payload: Array<DeleteEndpointPayload>
  action: ActionInput
}

export interface DeleteEndpointPayload {
  uuid: Scalars['String']
  topicUuid?: Maybe<Scalars['String']>
}

export interface DeleteEmailAddressToEndpointInput {
  payload: Array<DeleteEmailAddressToEndpointPayload>
  action: ActionInput
}

export interface DeleteEmailAddressToEndpointPayload {
  emailAddressUuid: Scalars['String']
  endpointUuid: Scalars['String']
  emailAddress: Scalars['String']
}

export interface RemoveSNSDingTalkAtPersonInput {
  payload: Array<RemoveSNSDingTalkAtPersonPayload>
  action: ActionInput
}

export interface RemoveSNSDingTalkAtPersonPayload {
  phoneNumber: Scalars['String']
  endpointUuid: Scalars['String']
}

export interface ModifyDingTalkAtPersonInput {
  payload: ModifyDingTalkAtPersonPayload
  action: ActionInput
}

export interface ModifyDingTalkAtPersonPayload {
  oldPhoneNumbers: Array<Scalars['String']>
  phoneNumbers: Array<Scalars['String']>
  endpointUuid: Scalars['String']
}

export interface RemoveSmsReceiverInput {
  payload: Array<RemoveSmsReceiverPayload>
  action: ActionInput
}

export interface RemoveSmsReceiverPayload {
  phoneNumber: Scalars['String']
  endpointUuid: Scalars['String']
}

export interface UpdateEndpointInput {
  payload: UpdateEndpointPayload
  action: ActionInput
}

export interface UpdateEndpointPayload {
  uuid: Scalars['String']
  name?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
}

export interface UpdateEmailAddressToEndpointInput {
  payload: Array<UpdateEmailAddressToEndpointPayload>
  action: ActionInput
}

export interface UpdateEmailAddressToEndpointPayload {
  emailAddressUuid: Scalars['String']
  endpointUuid: Scalars['String']
  emailAddress: Scalars['String']
}

export interface ValidateAliyunSmsEndpointInput {
  payload: Array<ValidateAliyunSmsEndpointPayload>
  action: ActionInput
}

export interface ValidateAliyunSmsEndpointPayload {
  uuid: Scalars['String']
  phoneNumbers: Array<Scalars['String']>
}

export interface AddAlarmToEndPointInput {
  payload: Array<AddAlarmToEndPointPayload>
  action: ActionInput
}

export interface AddAlarmToEndPointPayload {
  alarmUuid?: Maybe<Scalars['String']>
  subscriptionUuid?: Maybe<Scalars['String']>
  actionUuid: Scalars['String']
  actionType: Scalars['String']
  type: ZWatchAlarmQueryType
}

export interface RemoveAlarmFromEndPointInput {
  payload: Array<RemoveAlarmFromEndPointPayload>
  action: ActionInput
}

export interface RemoveAlarmFromEndPointPayload {
  alarmUuid?: Maybe<Scalars['String']>
  subscriptionUuid?: Maybe<Scalars['String']>
  actionUuid: Scalars['String']
  type: ZWatchAlarmQueryType
}

export interface UpdateSmsReceiverInput {
  payload: Array<UpdateSmsReceiverPayload>
  action: ActionInput
}

export interface UpdateSmsReceiverPayload {
  oldPhoneNumber: Scalars['String']
  phoneNumber: Scalars['String']
  endpointUuid: Scalars['String']
}

export interface UpdateAllAlarmHistoriesAsReadInput {
  payload?: Maybe<UpdateAllAlarmHistoriesAsReadPayload>
  action: ActionInput
}

export interface UpdateAllAlarmHistoriesAsReadPayload {
  updateMode?: Maybe<Scalars['String']>
  readStatus?: Maybe<Scalars['String']>
}

export interface UpdateEventDataInput {
  payload: Array<UpdateEventDataPayload>
}

export interface UpdateEventDataPayload {
  dataUuid: Scalars['String']
  updateMode?: Maybe<Scalars['String']>
  readStatus?: Maybe<Scalars['String']>
}

export interface UpdateAlarmDataInput {
  payload: Array<UpdateAlarmDataPayload>
}

export interface UpdateAlarmDataPayload {
  dataUuid: Scalars['String']
  updateMode?: Maybe<Scalars['String']>
  readStatus?: Maybe<Scalars['String']>
}

export interface AckAlarmDataInput {
  payload: AckAlarmDataPayload
  action: ActionInput
}

export interface AckAlarmDataPayload {
  dataUuid: Scalars['String']
  type: Scalars['String']
  ackPeriodSec: Scalars['Float']
  resourceUuid?: Maybe<Scalars['String']>
  /** 资源报警uuid */
  alarmUuid?: Maybe<Scalars['String']>
  /** 事件报警uuid */
  subscriptionUuid?: Maybe<Scalars['String']>
}

export interface UpdateAlertDataAckInput {
  payload: Array<UpdateAlertDataAckPayload>
  action: ActionInput
}

export interface UpdateAlertDataAckPayload {
  dataUuid: Scalars['String']
  resumeAlert?: Maybe<Scalars['Boolean']>
}

export interface UpdateThirdpartyAlertsInput {
  payload: Array<UpdateThirdpartyAlertsPayload>
}

export interface UpdateThirdpartyAlertsPayload {
  uuid: Scalars['String']
  updateReadStatus?: Maybe<Scalars['String']>
}

export interface DeleteThirdpartyPlatformInput {
  payload: Array<DeleteThirdpartyPlatformPayload>
  action: ActionInput
}

export interface DeleteThirdpartyPlatformPayload {
  uuid: Scalars['String']
}

export interface CreateThirdpartyPlatformInput {
  payload: CreateThirdpartyPlatformPayload
  action: ActionInput
}

export interface CreateThirdpartyPlatformPayload {
  name: Scalars['String']
  type: Scalars['String']
  url: Scalars['String']
  template: Scalars['String']
  description?: Maybe<Scalars['String']>
  resourceUuid?: Maybe<Scalars['String']>
}

export interface UpdateThirdpartyPlatformInput {
  payload: Array<UpdateThirdpartyPlatformPayload>
  action: ActionInput
}

export interface UpdateThirdpartyPlatformPayload {
  uuid: Scalars['String']
  name?: Maybe<Scalars['String']>
  stateEvent?: Maybe<Scalars['String']>
  template?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
}

export interface CreateResourceStackInput {
  payload: CreateResourceStackPayload
  action: ActionInput
}

export interface CreateResourceStackPayload {
  name: Scalars['String']
  description?: Maybe<Scalars['String']>
  /** 堆栈创建失败是否回滚，默认回滚 */
  rollback?: Maybe<Scalars['Boolean']>
  /** 堆栈内容，json字符串。与参数templateUuid二选一 */
  templateContent?: Maybe<Scalars['String']>
  /** 堆栈内容，json字符串。与参数templateContent二选一 */
  templateUuid?: Maybe<Scalars['String']>
  /** 参数列表，json字符串 */
  parameters?: Maybe<Scalars['String']>
  /** 资源的唯一UUID */
  resourceUuid?: Maybe<Scalars['String']>
  /** 堆栈版本，默认为zstack */
  type?: Maybe<Scalars['String']>
  timeout?: Maybe<Scalars['Float']>
}

export interface UpdateResourceStackInput {
  payload: UpdateResourceStackPayload
  action: ActionInput
}

export interface UpdateResourceStackPayload {
  uuid: Scalars['String']
  name?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  /** 堆栈创建失败是否回滚，默认回滚 */
  rollback?: Maybe<Scalars['Boolean']>
  /** 堆栈内容，json字符串。与参数templateUuid二选一 */
  templateContent?: Maybe<Scalars['String']>
  /** 参数列表，json字符串 */
  parameters?: Maybe<Scalars['String']>
}

export interface DeleteResourceStackInput {
  payload: Array<DeleteResourceStackStatePayload>
  action: ActionInput
}

export interface DeleteResourceStackStatePayload {
  uuid: Scalars['String']
}

export interface AddStackTemplateInput {
  payload: AddStackTemplatePayload
  action: ActionInput
}

export interface AddStackTemplatePayload {
  name: Scalars['String']
  templateContent: Scalars['String']
  description?: Maybe<Scalars['String']>
  /** 目前仅有zstack一种类型,可不传 */
  type?: Maybe<Scalars['String']>
}

export interface DeleteStackTemplateInput {
  payload: Array<DeleteStackTemplatePayload>
  action: ActionInput
}

export interface DeleteStackTemplatePayload {
  uuid: Scalars['String']
}

export interface UpdateStackTemplateInput {
  payload: UpdateStackTemplatePayload
  action: ActionInput
}

export interface UpdateStackTemplatePayload {
  uuid: Scalars['String']
  name?: Maybe<Scalars['String']>
  templateContent?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  state?: Maybe<Scalars['Boolean']>
}

export interface EnabledStackTemplateInput {
  payload: Array<EnabledStackTemplatePayload>
  action: ActionInput
}

export interface EnabledStackTemplatePayload {
  uuid: Scalars['String']
}

export interface DisabledStackTemplateInput {
  payload: Array<DisabledStackTemplatePayload>
  action: ActionInput
}

export interface DisabledStackTemplatePayload {
  uuid: Scalars['String']
}

export interface CreateSNSTextTemplateInput {
  payload: CreateSNSTextTemplatePayload
  action: ActionInput
}

export interface CreateSNSTextTemplatePayload {
  name: Scalars['String']
  type?: Maybe<Scalars['String']>
  applicationPlatformType: Scalars['String']
  template: Scalars['String']
  recoveryTemplate?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  defaultTemplate?: Maybe<Scalars['Boolean']>
}

export interface CreateAliyunSmsSNSTextTemplateInput {
  payload: CreateAliyunSmsSNSTextTemplatePayload
  action: ActionInput
}

export interface CreateAliyunSmsSNSTextTemplatePayload {
  name: Scalars['String']
  sign: Scalars['String']
  alarmTemplateCode: Scalars['String']
  eventTemplateCode: Scalars['String']
  applicationPlatformType: Scalars['String']
  template: Scalars['String']
  description?: Maybe<Scalars['String']>
  eventTemplate?: Maybe<Scalars['String']>
  recoveryTemplate?: Maybe<Scalars['String']>
  defaultTemplate?: Maybe<Scalars['Boolean']>
}

export interface DeleteSNSTextTemplateInput {
  payload: Array<DeleteSNSTextTemplatePayload>
  action: ActionInput
}

export interface DeleteSNSTextTemplatePayload {
  uuid: Scalars['String']
}

export interface UpdateSNSTextTemplateInput {
  payload: UpdateSNSTextTemplatePayload
  action: ActionInput
}

export interface UpdateSNSTextTemplatePayload {
  uuid: Scalars['String']
  name?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  template?: Maybe<Scalars['String']>
  recoveryTemplate?: Maybe<Scalars['String']>
  defaultTemplate?: Maybe<Scalars['Boolean']>
}

export interface UpdateAliyunSmsSNSTextTemplateInput {
  payload: UpdateAliyunSmsSNSTextTemplatePayload
  action: ActionInput
}

export interface UpdateAliyunSmsSNSTextTemplatePayload {
  uuid: Scalars['String']
  name?: Maybe<Scalars['String']>
  sign?: Maybe<Scalars['String']>
  alarmTemplateCode?: Maybe<Scalars['String']>
  eventTemplateCode?: Maybe<Scalars['String']>
  template?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  eventTemplate?: Maybe<Scalars['String']>
  recoveryTemplate?: Maybe<Scalars['String']>
  defaultTemplate?: Maybe<Scalars['Boolean']>
}

export interface CreateMonitorTemplateInput {
  payload: Array<CreateMonitorTemplatePayload>
  action: ActionInput
}

export interface CreateMonitorTemplatePayload {
  name: Scalars['String']
  description?: Maybe<Scalars['String']>
  metricRuleTemplates?: Maybe<Array<MetricRuleTemplateInput>>
  eventRuleTemplates?: Maybe<Array<EventRuleTemplateInput>>
  systemTags?: Maybe<Array<Scalars['String']>>
}

export interface MetricRuleTemplateInput {
  emergencyLevel: Scalars['String']
  metricName: Scalars['String']
  labels?: Maybe<Array<Scalars['String']>>
  namespace: Scalars['String']
  comparisonOperator: Scalars['String']
  period?: Maybe<Scalars['Int']>
  repeatInterval: Scalars['Float']
  repeatCount: Scalars['Float']
  threshold: Scalars['Float']
}

export interface EventRuleTemplateInput {
  emergencyLevel: EmergencyLevelEmergencyLevel
  eventName: Scalars['String']
  labels?: Maybe<Array<EventLable>>
  namespace: Scalars['String']
}

export interface EventLable {
  key: Scalars['String']
  op: Scalars['String']
  value: Scalars['String']
}

export interface CloneMonitorTemplateInput {
  payload: Array<CloneMonitorTemplatePayload>
  action: ActionInput
}

export interface CloneMonitorTemplatePayload {
  name: Scalars['String']
  description?: Maybe<Scalars['String']>
  uuid: Scalars['String']
}

export interface DeleteMonitorTemplateInput {
  payload: Array<DeleteMonitorTemplatePayload>
  action: ActionInput
}

export interface DeleteMonitorTemplatePayload {
  uuid: Scalars['String']
}

export interface ApplyMonitorTemplateToMonitorGroupInMonitorTemplateInput {
  payload: Array<ApplyMonitorTemplateToMonitorGroupInMonitorTemplatePayload>
  action: ActionInput
}

export interface ApplyMonitorTemplateToMonitorGroupInMonitorTemplatePayload {
  templateUuid: Scalars['String']
  groupUuid: Scalars['String']
}

export interface CreateMonitorGroupInput {
  payload: CreateMonitorGroupPayload
  action: ActionInput
}

export interface CreateMonitorGroupPayload {
  name: Scalars['String']
  description?: Maybe<Scalars['String']>
  instanceUuids: Array<Scalars['String']>
  monitorTemplate?: Maybe<Scalars['String']>
  zwatchEndpoint?: Maybe<Scalars['String']>
  actions?: Maybe<Array<GroupActionsInput>>
}

export interface GroupActionsInput {
  groupUuid?: Maybe<Scalars['String']>
  actionType: Scalars['String']
  actionUuid: Scalars['String']
}

export interface DeleteMonitorGroupInput {
  payload: Array<DeleteMonitorGroupPayload>
  action: ActionInput
}

export interface DeleteMonitorGroupPayload {
  uuid: Scalars['String']
}

export interface UpdateMonitorGroupInput {
  payload: UpdateMonitorGroupPayload
  action: ActionInput
}

export interface UpdateMonitorGroupPayload {
  uuid: Scalars['String']
  name?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  actions?: Maybe<Array<GroupActionsInput>>
}

export interface RevokeMonitorTemplateFromMonitorGroupInput {
  payload: Array<RevokeMonitorTemplateFromMonitorGroupPayload>
  action: ActionInput
}

export interface RevokeMonitorTemplateFromMonitorGroupPayload {
  templateUuid: Scalars['String']
  groupUuid: Scalars['String']
}

export interface ApplyMonitorTemplateToMonitorGroupInput {
  payload: Array<ApplyMonitorTemplateToMonitorGroupPayload>
  action: ActionInput
}

export interface ApplyMonitorTemplateToMonitorGroupPayload {
  templateUuid: Scalars['String']
  groupUuid: Scalars['String']
}

export interface AddInstanceToMonitorGroupInput {
  payload: Array<AddInstanceToMonitorGroupPayload>
  action: ActionInput
}

export interface AddInstanceToMonitorGroupPayload {
  groupUuid: Scalars['String']
  instanceUuid: Scalars['String']
}

export interface RemoveInstanceFromMonitorGroupInput {
  payload: Array<RemoveInstanceFromMonitorGroupPayload>
  action: ActionInput
}

export interface RemoveInstanceFromMonitorGroupPayload {
  groupUuid: Scalars['String']
  instanceUuid: Scalars['String']
}

export interface ChangeActiveAlarmStateInput {
  payload: ChangeActiveAlarmStatePayload
  action: ActionInput
}

export interface ChangeActiveAlarmStatePayload {
  namespace: Scalars['String']
  stateEvent: Scalars['String']
}

export interface AddMetricRuleTemplateInput {
  payload: Array<AddMetricRuleTemplatePayload>
  action: ActionInput
}

export interface AddMetricRuleTemplatePayload {
  emergencyLevel: EmergencyLevelEmergencyLevel
  metricName: Scalars['String']
  labels?: Maybe<Array<Scalars['String']>>
  namespace: Scalars['String']
  comparisonOperator: Scalars['String']
  period?: Maybe<Scalars['Float']>
  repeatInterval?: Maybe<Scalars['Float']>
  repeatCount?: Maybe<Scalars['Float']>
  threshold: Scalars['Float']
  monitorTemplateUuid: Scalars['String']
  name: Scalars['String']
}

export interface DeleteMetricRuleTemplateInput {
  payload: Array<DeleteMetricRuleTemplatePayload>
  action: ActionInput
}

export interface DeleteMetricRuleTemplatePayload {
  uuid: Scalars['String']
}

export interface UpdateMetricRuleTemplateInput {
  payload: Array<UpdateMetricRuleTemplatePayload>
  action: ActionInput
}

export interface UpdateMetricRuleTemplatePayload {
  uuid: Scalars['String']
  emergencyLevel: EmergencyLevelEmergencyLevel
  metricName: Scalars['String']
  labels?: Maybe<Array<Scalars['String']>>
  namespace: Scalars['String']
  comparisonOperator: Scalars['String']
  period?: Maybe<Scalars['Float']>
  repeatInterval?: Maybe<Scalars['Float']>
  repeatCount?: Maybe<Scalars['Float']>
  threshold: Scalars['Float']
  monitorTemplateUuid: Scalars['String']
  name: Scalars['String']
}

export interface AddEventRuleTemplateInput {
  payload: Array<AddEventRuleTemplatePayload>
  action: ActionInput
}

export interface AddEventRuleTemplatePayload {
  emergencyLevel: EmergencyLevelEmergencyLevel
  eventName: Scalars['String']
  labels?: Maybe<Array<EventLableInput>>
  namespace: Scalars['String']
  monitorTemplateUuid: Scalars['String']
  name: Scalars['String']
}

export interface EventLableInput {
  key: Scalars['String']
  op: Scalars['String']
  value: Scalars['String']
}

export interface DeleteEventRuleTemplateInput {
  payload: Array<DeleteEventRuleTemplatePayload>
  action: ActionInput
}

export interface DeleteEventRuleTemplatePayload {
  uuid: Scalars['String']
}

export interface UpdateEventRuleTemplateActionInput {
  payload: Array<UpdateEventRuleTemplateActionPayload>
  action: ActionInput
}

export interface UpdateEventRuleTemplateActionPayload {
  uuid: Scalars['String']
  emergencyLevel: EmergencyLevelEmergencyLevel
  eventName: Scalars['String']
  labels?: Maybe<Array<EventLableInput>>
  namespace: Scalars['String']
  monitorTemplateUuid: Scalars['String']
  name: Scalars['String']
}

export interface ScanDatabaseBackupActionInput {
  payload: Array<ScanDatabaseBackupInput>
  action: ActionInput
}

export interface ScanDatabaseBackupInput {
  uuid?: Maybe<Scalars['String']>
}

export interface SyncBackupDataToRemoteInput {
  payload: Array<SyncBackupFromImageStoreBackupStoragePayload>
  action: ActionInput
}

export interface SyncBackupFromImageStoreBackupStoragePayload {
  /** 卷备份的UUID，和下面的groupUuid 2选1传过来 */
  uuid?: Maybe<Scalars['String']>
  /** 根云盘 UUID */
  groupUuid?: Maybe<Scalars['String']>
  /** 源镜像服务器 UUID */
  srcBackupStorageUuid: Scalars['String']
  /** 备份数据类型: Root | Data */
  type?: Maybe<Scalars['String']>
}

export interface DeleteBackupDataListInput {
  payload: Array<DeleteBackupDataPayload>
  action: ActionInput
}

export interface DeleteBackupDataPayload {
  /** 卷备份的UUID，和下面的groupUuid 2选1传过来 */
  uuid?: Maybe<Scalars['String']>
  /** 根云盘 UUID */
  groupUuid?: Maybe<Scalars['String']>
  /** 源镜像服务器 UUIDs */
  backupStorageUuids?: Maybe<Array<Scalars['String']>>
  /** 备份数据类型: Root | Data */
  type?: Maybe<Scalars['String']>
  bsUuid?: Maybe<Scalars['String']>
  remote: Scalars['Boolean']
  whole: Scalars['Boolean']
  backupType?: Maybe<BackupResourceType>
}

export interface CreateBackupInput {
  payload: CreateBackupPayload
  action: ActionInput
}

export interface CreateBackupPayload {
  /** 资源名称 */
  name: Scalars['String']
  /** 云盘UUID */
  volumeUuid: Scalars['String']
  /** 全量备份 */
  mode?: Maybe<Scalars['String']>
  /** 同时备份已加载的云盘 */
  backupWithDataVolume?: Maybe<Scalars['Boolean']>
  /** 本地备份服务器UUID */
  backupStorageUuid: Scalars['String']
  /** 同步到远端备份服务器 */
  sync?: Maybe<Scalars['Boolean']>
  /** 远端备份服务器UUID */
  remoteBackupStorageUuid?: Maybe<Scalars['String']>
}

export interface SyncBackupDataToLocalInput {
  payload: Array<SyncBackupDataToLocalPayload>
  action: ActionInput
}

export interface SyncBackupDataToLocalPayload {
  /** 卷备份的UUID，和下面的groupUuid 2选1传过来 */
  uuid?: Maybe<Scalars['String']>
  /** 根云盘 UUID */
  groupUuid?: Maybe<Scalars['String']>
  /** 源镜像服务器 UUID */
  srcBackupStorageUuid: Scalars['String']
  /** 备份数据类型: Root | Data */
  type?: Maybe<Scalars['String']>
  backupType?: Maybe<BackupResourceType>
}

export interface ExportBackupDatabaseUrlListInput {
  payload: ExportBackupDatabaseUrlPayload
  action: ActionInput
}

export interface ExportBackupDatabaseUrlPayload {
  uuid: Scalars['String']
  backupStorageUuid?: Maybe<Scalars['String']>
}

export interface RecoverDatabaseBackupActionInput {
  payload: RecoverDatabaseBackupInput
  action: ActionInput
}

export interface RecoverDatabaseBackupInput {
  uuid?: Maybe<Scalars['String']>
  backupInstallPath?: Maybe<Scalars['String']>
  backupStorageUrl?: Maybe<Scalars['String']>
  mysqlRootPassword: Scalars['String']
}

export interface RecoverBackupInput {
  payload: RecoverBackupPayload
  action: ActionInput
}

export interface RecoverBackupPayload {
  name?: Maybe<Scalars['String']>
  uuid?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  policyType: BackupPolicyType
  defaultL3NetworkUuid?: Maybe<Scalars['String']>
  instanceOfferingUuid?: Maybe<Scalars['String']>
  primaryStorageUuidForRootVolume?: Maybe<Scalars['String']>
  hostUuid?: Maybe<Scalars['String']>
  vmInstanceUuid?: Maybe<Scalars['String']>
  primaryStorageUuid?: Maybe<Scalars['String']>
  zoneUuid?: Maybe<Scalars['String']>
  thinProvision?: Maybe<BackupProvisionType>
  withVolume?: Maybe<Scalars['Boolean']>
  virtioSCSI?: Maybe<Scalars['Boolean']>
  l3NetworkUuids?: Maybe<Array<Scalars['String']>>
  systemTags?: Maybe<Array<Scalars['String']>>
  dataVolumeSystemTags?: Maybe<Array<Scalars['String']>>
  rootVolumeSystemTags?: Maybe<Array<Scalars['String']>>
  type: BackupResourceType
}

export enum BackupPolicyType {
  New = 'New',
  Overlap = 'Overlap'
}

export enum BackupProvisionType {
  ThickProvision = 'ThickProvision',
  ThinProvision = 'ThinProvision'
}

export interface SyncDatabaseBackupToRemoteInput {
  payload: Array<SyncDatabaseBackupToRemotePayload>
  action: ActionInput
}

export interface SyncDatabaseBackupToRemotePayload {
  uuid: Scalars['String']
  /** 源镜像服务器 UUID */
  srcBackupStorageUuid: Scalars['String']
}

export interface DeleteDatabaseBackupDataListInput {
  payload: Array<DeleteDatabaseBackupDataPayload>
  action: ActionInput
}

export interface DeleteDatabaseBackupDataPayload {
  uuid: Scalars['String']
  bsUuid?: Maybe<Scalars['String']>
  backupStorageUuids?: Maybe<Array<Scalars['String']>>
  remote?: Maybe<Scalars['Boolean']>
}

export interface DeleteIAM2ProjectTemplateInput {
  payload: Array<DeleteIAM2ProjectTemplatePayload>
  action: ActionInput
}

export interface DeleteIAM2ProjectTemplatePayload {
  uuid: Scalars['String']
}

export interface CreateIAM2ProjectTemplateInput {
  payload: CreateIAM2ProjectTemplatePayload
  action: ActionInput
}

export interface CreateIAM2ProjectTemplatePayload {
  name: Scalars['String']
  description?: Maybe<Scalars['String']>
  quota: Array<IAM2ProjectTemplateQuotaInput>
}

export interface IAM2ProjectTemplateQuotaInput {
  key: Scalars['String']
  value?: Maybe<Scalars['Float']>
}

export interface UpdateIAM2ProjectTemplateInput {
  payload: UpdateIAM2ProjectTemplatePayload
  action: ActionInput
}

export interface UpdateIAM2ProjectTemplatePayload {
  uuid: Scalars['String']
  name?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  quota?: Maybe<Array<IAM2ProjectTemplateQuotaInput>>
}

export interface DeleteIAM2OrganizationInput {
  payload: Array<DeleteIAM2OrganizationPayload>
  action: ActionInput
}

export interface DeleteIAM2OrganizationPayload {
  uuid: Scalars['String']
}

export interface UpdateIAM2OrganizationInput {
  payload: Array<UpdateIAM2OrganizationPayload>
  action: ActionInput
}

export interface UpdateIAM2OrganizationPayload {
  uuid: Scalars['String']
  name?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  parentUuid?: Maybe<Scalars['String']>
}

export interface AddIAM2VirtualIDsToOrganizationInput {
  payload: Array<AddIAM2VirtualIDsToOrganizationPayload>
  action: ActionInput
}

export interface AddIAM2VirtualIDsToOrganizationPayload {
  organizationUuid: Scalars['String']
  virtualIDUuids: Array<Scalars['String']>
}

export interface SetOrganizationSupervisorInput {
  payload: Array<SetOrganizationSupervisorPayload>
  action: ActionInput
}

export interface SetOrganizationSupervisorPayload {
  uuid: Scalars['String']
  virtualIDUuid: Scalars['String']
}

export interface RemoveIAM2VirtualIDsFromOrganizationInput {
  payload: Array<RemoveIAM2VirtualIDsFromOrganizationPayload>
  action: ActionInput
}

export interface RemoveIAM2VirtualIDsFromOrganizationPayload {
  organizationUuid: Scalars['String']
  virtualIDUuids: Array<Scalars['String']>
}

export interface CreateIAM2OrganizationInput {
  payload: CreateIAM2OrganizationPayload
  action: ActionInput
}

export interface CreateIAM2OrganizationPayload {
  name: Scalars['String']
  description?: Maybe<Scalars['String']>
  type: Scalars['String']
  parentUuid?: Maybe<Scalars['String']>
  attributes?: Maybe<Array<IAM2AttributeInput>>
}

export interface DeleteThirdPartyAuthInput {
  payload: Array<DeleteThirdPartyAuthPayload>
  action: ActionInput
}

export interface DeleteThirdPartyAuthPayload {
  uuid: Scalars['String']
}

export interface UpdateThirdPartyAuthInput {
  payload: UpdateThirdPartyAuthPayload
  action: ActionInput
}

export interface UpdateThirdPartyAuthPayload {
  ldapServerUuid: Scalars['String']
  name?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  url?: Maybe<Scalars['String']>
  base?: Maybe<Scalars['String']>
  username?: Maybe<Scalars['String']>
  password?: Maybe<Scalars['String']>
  encryption?: Maybe<Scalars['String']>
  systemTags?: Maybe<Array<Scalars['String']>>
}

export interface UpdateThirdPartyAuthConfigInfoInput {
  payload: UpdateThirdPartyAuthConfigInfoPayload
  action: ActionInput
}

export interface UpdateThirdPartyAuthConfigInfoPayload {
  name?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  url?: Maybe<Scalars['String']>
  base?: Maybe<Scalars['String']>
  username?: Maybe<Scalars['String']>
  password?: Maybe<Scalars['String']>
  encryption?: Maybe<Scalars['String']>
  ldapServerUuid: Scalars['String']
  ldapServerTypeUuid?: Maybe<Scalars['String']>
  ldapCleanBindingFilterUuid?: Maybe<Scalars['String']>
  ldapUrlsUuid?: Maybe<Scalars['String']>
  tagList?: Maybe<Array<Scalars['String']>>
}

export interface SyncThirdPartyAuthInput {
  payload: SyncThirdPartyAuthPayload
  action: ActionInput
}

export interface SyncThirdPartyAuthPayload {
  uuid: Scalars['String']
}

export interface TestConnectionThirdPartyAuthInput {
  payload: TestConnectionThirdPartyAuthPayload
  action: ActionInput
}

export interface TestConnectionThirdPartyAuthPayload {
  uuid?: Maybe<Scalars['String']>
  name?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  username?: Maybe<Scalars['String']>
  url?: Maybe<Scalars['String']>
  encryption?: Maybe<Scalars['String']>
  base?: Maybe<Scalars['String']>
  password?: Maybe<Scalars['String']>
  scope?: Maybe<Scalars['String']>
  ldapFilter?: Maybe<Scalars['String']>
  systemTags?: Maybe<Array<Scalars['String']>>
}

export interface SettingAutoSyncThirdPartyAuthInput {
  payload: SettingAutoSyncThirdPartyAuthPayload
  action: ActionInput
}

export interface SettingAutoSyncThirdPartyAuthPayload {
  resourceUuid: Scalars['String']
  autoSync?: Maybe<Scalars['String']>
  syncInterval?: Maybe<Scalars['String']>
}

export interface UpdateThirdPartyAuthMappingInfoInput {
  payload: UpdateThirdPartyAuthMappingInfoPayload
  action: ActionInput
}

export interface UpdateThirdPartyAuthMappingInfoPayload {
  ldapServerUuid: Scalars['String']
  ldapUseAsLoginName?: Maybe<Scalars['String']>
  ldapUseAsLoginNameUuid?: Maybe<Scalars['String']>
  organizationSyncConfiguration?: Maybe<Scalars['String']>
  organizationSyncConfigurationUuid?: Maybe<Scalars['String']>
  virtualIDSyncConfiguration?: Maybe<Scalars['String']>
  virtualIDSyncConfigurationUuid?: Maybe<Scalars['String']>
}

export interface TestThirdPartyAuthSyncRulesInput {
  payload: TestThirdPartyAuthSyncRulesPayload
  action: ActionInput
}

export interface TestThirdPartyAuthSyncRulesPayload {
  resourceUuid?: Maybe<Scalars['String']>
  tagList?: Maybe<Array<Scalars['String']>>
}

export interface AddThirdPartyAuthInput {
  payload: AddThirdPartyAuthPayload
  action: ActionInput
}

export interface AddThirdPartyAuthPayload {
  name: Scalars['String']
  description?: Maybe<Scalars['String']>
  url: Scalars['String']
  base: Scalars['String']
  username: Scalars['String']
  password: Scalars['String']
  encryption: Scalars['String']
  scope: Scalars['String']
  systemTags?: Maybe<Array<Scalars['String']>>
  tagList?: Maybe<Array<Scalars['String']>>
}

export interface AddThirdPartyAuthSyncRulesInput {
  payload: AddThirdPartyAuthSyncRulesPayload
  action: ActionInput
}

export interface AddThirdPartyAuthSyncRulesPayload {
  resourceUuid?: Maybe<Scalars['String']>
  tagList?: Maybe<Array<Scalars['String']>>
}

export interface AddGroupsToProjectInput {
  payload: Array<AddGroupsToProjectPayload>
  action: ActionInput
}

export interface AddGroupsToProjectPayload {
  projectUuid: Scalars['String']
  groupRoles: Array<GroupRoles>
}

export interface GroupRoles {
  groupUuids: Array<Scalars['String']>
  roleUuids?: Maybe<Array<Scalars['String']>>
}

export interface AddGroupsToProjectsInput {
  payload: Array<AddGroupsToProjectsPayload>
  action: ActionInput
}

export interface AddGroupsToProjectsPayload {
  projectRoles: Array<ProjectRoles>
}

export interface ProjectRoles {
  projectUuid: Scalars['String']
  groupUuids: Array<Scalars['String']>
  roleUuids?: Maybe<Array<Scalars['String']>>
}

export interface AddIAM2VirtualIDGroupRoleInput {
  payload: Array<AddIAM2VirtualIDGroupRolePayload>
  action: ActionInput
}

export interface AddIAM2VirtualIDGroupRolePayload {
  roleUuids?: Maybe<Array<Scalars['String']>>
  projectUuid?: Maybe<Scalars['String']>
  groupUuid?: Maybe<Scalars['String']>
}

export interface AddIAM2VirtualIDsToGroupMainViewInput {
  payload: Array<AddIAM2VirtualIDsToGroupMainViewPayload>
  action: ActionInput
}

export interface AddIAM2VirtualIDsToGroupMainViewPayload {
  virtualIDUuids: Array<Scalars['String']>
  groupUuid?: Maybe<Scalars['String']>
}

export interface DeleteIAM2VirtualIDGroupInput {
  payload: Array<DeleteIAM2VirtualIDGroupPayload>
  action: ActionInput
}

export interface DeleteIAM2VirtualIDGroupPayload {
  uuid: Scalars['String']
}

export interface ModifyGroupRoleInput {
  payload: Array<ModifyGroupRolePayload>
  action: ActionInput
}

export interface ModifyGroupRolePayload {
  addRoleUuids: Array<Scalars['String']>
  removeRoleUuids: Array<Scalars['String']>
  groupUuid: Scalars['String']
  projectUuid: Scalars['String']
}

export interface RemoveGroupFromProjectsInput {
  payload: Array<RemoveGroupFromProjectsPayload>
  action: ActionInput
}

export interface RemoveGroupFromProjectsPayload {
  projectUuids?: Maybe<Array<Scalars['String']>>
  groupUuids?: Maybe<Array<Scalars['String']>>
}

export interface RemoveIAM2VirtualIDFromGroupsInput {
  payload: Array<RemoveIAM2VirtualIDFromGroupsPayload>
  action: ActionInput
}

export interface RemoveIAM2VirtualIDFromGroupsPayload {
  virtualIDUuid: Array<Scalars['String']>
  groupUuid?: Maybe<Scalars['String']>
}

export interface RemoveIAM2VirtualIDGroupRoleInput {
  payload: Array<RemoveIAM2VirtualIDGroupRolePayload>
  action: ActionInput
}

export interface RemoveIAM2VirtualIDGroupRolePayload {
  roleUuids: Array<Scalars['String']>
  groupUuid?: Maybe<Scalars['String']>
}

export interface UpdateIAM2VirtualIDGroupInput {
  payload: UpdateIAM2VirtualIDGroupPayload
  action: ActionInput
}

export interface UpdateIAM2VirtualIDGroupPayload {
  uuid: Scalars['String']
  name?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
}

export interface UserAddToGroupsInput {
  payload: Array<UserAddToGroupsPayload>
  action: ActionInput
}

export interface UserAddToGroupsPayload {
  virtualIDUuids: Array<Scalars['String']>
  groupUuid?: Maybe<Scalars['String']>
}

export interface CreateIAM2VirtualIDGroupInput {
  payload: CreateIAM2VirtualIDGroupPayload
  action: ActionInput
}

export interface CreateIAM2VirtualIDGroupPayload {
  name: Scalars['String']
  description?: Maybe<Scalars['String']>
  userUuidList?: Maybe<Array<Scalars['String']>>
  projectInfoList?: Maybe<Array<GroupCreateProjectParams>>
}

export interface GroupCreateProjectParams {
  projectUuid?: Maybe<Scalars['String']>
  roleUuids?: Maybe<Array<Scalars['String']>>
  name?: Maybe<Array<Scalars['String']>>
  value?: Maybe<Array<Scalars['String']>>
}

export interface ChangeIAM2ProjectStateInput {
  payload: Array<ChangeIAM2ProjectStatePayload>
  action: ActionInput
}

export interface ChangeIAM2ProjectStatePayload {
  uuid: Scalars['String']
}

export interface ReoverIAM2ProjectInput {
  payload: ReoverIAM2ProjectPayload
  action: ActionInput
}

export interface ReoverIAM2ProjectPayload {
  uuid: Scalars['String']
  retirePolicyUuid?: Maybe<Scalars['String']>
  attribute?: Maybe<IAM2ProjectAttributesInput>
}

export interface IAM2ProjectAttributesInput {
  name: Scalars['String']
  value?: Maybe<Scalars['String']>
}

export interface AddIAM2VirtualIDsToProjectInput {
  payload: Array<AddIAM2VirtualIDsToProjectPayload>
  action: ActionInput
}

export interface AddIAM2VirtualIDsToProjectPayload {
  projectUuid: Scalars['String']
  virtualIDUuids: Array<Scalars['String']>
  roleUuids?: Maybe<Array<Scalars['String']>>
}

export interface RemoveIAM2VirtualIDsFromProjectsInput {
  payload: Array<RemoveIAM2VirtualIDsFromProjectsPayload>
  action: ActionInput
}

export interface RemoveIAM2VirtualIDsFromProjectsPayload {
  projectUuids: Array<Scalars['String']>
  virtualIDUuids: Array<Scalars['String']>
}

export interface SetIAM2ProjectIAM2OrganizationInput {
  payload: Array<SetIAM2ProjectIAM2OrganizationPayload>
  action: ActionInput
}

export interface SetIAM2ProjectIAM2OrganizationPayload {
  organizationUuid?: Maybe<Scalars['String']>
  oldOrganizationUuid?: Maybe<Scalars['String']>
  projectUuid?: Maybe<Scalars['String']>
}

export interface DetachIAM2ProjectFromIAM2OrganizationInput {
  projectUuid: Scalars['String']
  action: ActionInput
}

export interface ChangeAccountPriceTableBindingInput {
  payload: Array<ChangeAccountPriceTableBindingPayload>
  action: ActionInput
}

export interface ChangeAccountPriceTableBindingPayload {
  tableUuid: Scalars['String']
  uuid: Scalars['String']
}

export interface CreateIAM2ProjectTemplateFromProjectInput {
  payload: CreateIAM2ProjectTemplateFromProjectPayload
  action: ActionInput
}

export interface CreateIAM2ProjectTemplateFromProjectPayload {
  name: Scalars['String']
  description?: Maybe<Scalars['String']>
  projectUuid: Scalars['String']
}

export interface DeleteIAM2ProjectInput {
  payload: Array<DeleteIAM2ProjectPayload>
  action: ActionInput
}

export interface DeleteIAM2ProjectPayload {
  uuid: Scalars['String']
}

export interface ExpungeIAM2ProjectInput {
  payload: Array<ExpungeIAM2ProjectPayload>
  action: ActionInput
}

export interface ExpungeIAM2ProjectPayload {
  uuid: Scalars['String']
}

export interface UpdateIAM2ProjectInput {
  payload: UpdateIAM2ProjectPayload
  action: ActionInput
}

export interface UpdateIAM2ProjectPayload {
  uuid: Scalars['String']
  name?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
}

export interface UpdateIAM2ProjectQuotaInput {
  payload: Array<UpdateIAM2ProjectQuotaPayload>
  action: ActionInput
}

export interface UpdateIAM2ProjectQuotaPayload {
  uuid: Scalars['String']
  identityUuid: Scalars['String']
  name: Scalars['String']
  value: Scalars['Float']
}

export interface UpdateIAM2ProjectRetirePolicyInput {
  payload: Array<UpdateIAM2ProjectRetirePolicyload>
  action: ActionInput
}

export interface UpdateIAM2ProjectRetirePolicyload {
  uuid: Scalars['String']
  retirePolicyUuid?: Maybe<Scalars['String']>
  attribute?: Maybe<IAM2ProjectAttributesInput>
}

export interface ReoverRetiredIAM2ProjectInput {
  payload: ReoverRetiredIAM2ProjectPayload
  action: ActionInput
}

export interface ReoverRetiredIAM2ProjectPayload {
  uuid: Scalars['String']
  retirePolicyUuid?: Maybe<Scalars['String']>
  attribute?: Maybe<IAM2ProjectAttributesInput>
}

export interface CreateIAM2ProjectInput {
  payload: CreateIAM2ProjectPayload
  action: ActionInput
}

export interface CreateIAM2ProjectPayload {
  /** 项目添加方式 */
  createType: CreateIAM2ProjectType
  name?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  attributes?: Maybe<Array<CreateIAM2ProjectAttribute>>
  /** 项目成员 */
  virtualIDUuids?: Maybe<Array<Scalars['String']>>
  /** 项目负责人 */
  projectAdminUuid?: Maybe<Scalars['String']>
  /** 配额方式 */
  quotaType?: Maybe<CreateIAM2ProjectQuotaType>
  quota?: Maybe<Array<CreateIAM2ProjectQuota>>
  /** 部门 */
  iam2OrganizationUuid?: Maybe<Scalars['String']>
  /** 计费价目 */
  priceTableUuid?: Maybe<Scalars['String']>
  /** 脚本内容 */
  script?: Maybe<Scalars['String']>
  /** 项目模版 */
  templateUuid?: Maybe<Scalars['String']>
}

export enum CreateIAM2ProjectType {
  Input = 'Input',
  Script = 'Script'
}

export interface CreateIAM2ProjectAttribute {
  name: Scalars['String']
  value: Scalars['String']
}

export enum CreateIAM2ProjectQuotaType {
  Custom = 'Custom',
  Template = 'Template'
}

export interface CreateIAM2ProjectQuota {
  name: Scalars['String']
  value: Scalars['Float']
}

export interface SetIAM2ProjectAdminInput {
  payload: Array<SetIAM2ProjectAdminPayload>
  action: ActionInput
}

export interface SetIAM2ProjectAdminPayload {
  oldIAM2VirtualIdUuid?: Maybe<Scalars['String']>
  newIAM2VirtualIdUuid: Scalars['String']
  isIAM2ProjectVirtualId: Scalars['Boolean']
  iam2ProjectUuid: Scalars['String']
}

export interface UpdateIAM2VirtualIDRoleInIAM2ProjectInput {
  payload: Array<UpdateIAM2VirtualIDRoleInIAM2ProjectPayload>
  action: ActionInput
}

export interface UpdateIAM2VirtualIDRoleInIAM2ProjectPayload {
  projectUuid: Scalars['String']
  virtualIDUuid: Scalars['String']
  oldRoleUuids: Array<Scalars['String']>
  newRoleUuids: Array<Scalars['String']>
}

export interface AddRolesToIAM2VirtualIDInput {
  payload: Array<AddRolesToIAM2VirtualIDPayload>
  action: ActionInput
}

export interface AddRolesToIAM2VirtualIDPayload {
  virtualIDUuid: Scalars['String']
  roleUuids: Array<Scalars['String']>
}

export interface RemoveRolesToIAM2VirtualIDInput {
  payload: Array<RemoveRolesToIAM2VirtualIDPayload>
  action: ActionInput
}

export interface RemoveRolesToIAM2VirtualIDPayload {
  virtualIDUuid: Scalars['String']
  roleUuids: Array<Scalars['String']>
}

export interface CreateRoleInput {
  payload: CreateRolePayload
  action: ActionInput
}

export interface CreateRolePayload {
  name: Scalars['String']
  description?: Maybe<Scalars['String']>
  type?: Maybe<Scalars['String']>
  systemRole?: Maybe<Scalars['String']>
  statements?: Maybe<Array<RoleStatementsInput>>
  uiPrivilege?: Maybe<Array<RoleUIPrivilegeInput>>
}

export interface RoleStatementsInput {
  name: Scalars['String']
  effect: Scalars['String']
  actions: Array<Scalars['String']>
}

export interface RoleUIPrivilegeInput {
  resourceType: Scalars['String']
  effect: Scalars['String']
  views: Array<Scalars['String']>
  actions: Array<Scalars['String']>
}

export interface DeleteRoleInput {
  payload: Array<DeleteRolePayload>
  action: ActionInput
}

export interface DeleteRolePayload {
  uuid: Scalars['String']
}

export interface UpdateRoleInput {
  payload: UpdateRolePayload
  action: ActionInput
}

export interface UpdateRolePayload {
  uuid: Scalars['String']
  name?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  statements?: Maybe<Array<RoleStatementInput>>
}

export interface RoleStatementInput {
  name?: Maybe<Scalars['String']>
  effect?: Maybe<Scalars['String']>
  actions?: Maybe<Array<Scalars['String']>>
}

export interface UpdateRoleUIPrivilegeInput {
  payload: UpdateRoleUIPrivilegePayload
  action: ActionInput
}

export interface UpdateRoleUIPrivilegePayload {
  uuid: Scalars['String']
  uiPrivilege?: Maybe<Array<RoleUIPrivilegeInput>>
}

export interface PassAdvanceTicketInput {
  payload: PassAdvanceTicketPayload
  action: ActionInput
}

export interface PassAdvanceTicketPayload {
  uuid: Scalars['String']
  comment?: Maybe<Scalars['String']>
  oldRequests: Scalars['String']
  newRequests: Scalars['String']
}

export interface PassTicketInput {
  payload: Array<PassTicketPayload>
  action: ActionInput
}

export interface PassTicketPayload {
  uuid: Scalars['String']
  comment?: Maybe<Scalars['String']>
}

export interface RejectTicketInput {
  payload: Array<RejectTicketPayload>
  action: ActionInput
}

export interface RejectTicketPayload {
  uuid: Scalars['String']
  comment?: Maybe<Scalars['String']>
}

export interface ChangeTicketProcessStateInput {
  payload: Array<ChangeTicketProcessStatePayload>
  action: ActionInput
}

export interface ChangeTicketProcessStatePayload {
  uuid: Scalars['String']
  stateEvent: StateEvent
}

export interface DeleteTicketProcessInput {
  payload: Array<DeleteTicketProcessPayload>
  action: ActionInput
}

export interface DeleteTicketProcessPayload {
  uuid: Scalars['String']
}

export interface UpdateTicketProcessInput {
  payload: UpdateTicketProcessPayload
  action: ActionInput
}

export interface UpdateTicketProcessPayload {
  uuid: Scalars['String']
  name?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  flows?: Maybe<Array<UpdateTicketProcessFlow>>
  needAddTicketTypeUuids?: Maybe<Array<Scalars['String']>>
  needRemoveTicketTypeUuids?: Maybe<Array<Scalars['String']>>
}

export interface UpdateTicketProcessFlow {
  name: Scalars['String']
  approverUuid: Scalars['String']
  approverTitle: Scalars['String']
}

export interface UpdateTicketProcessTicketTypesInput {
  payload: UpdateTicketProcessTicketTypesPayload
  action: ActionInput
}

export interface UpdateTicketProcessTicketTypesPayload {
  uuid: Scalars['String']
  deletedTypeUuids?: Maybe<Array<Scalars['String']>>
  addedTypeUuids?: Maybe<Array<Scalars['String']>>
}

export interface CreateTicketProcessInput {
  payload: Array<CreateTicketProcessPayload>
  action: ActionInput
}

export interface CreateTicketProcessPayload {
  name: Scalars['String']
  description?: Maybe<Scalars['String']>
  projectUuid: Scalars['String']
  ticketTypeUuids: Array<Scalars['String']>
  flows: Array<CreateTicketProcessFlow>
}

export interface CreateTicketProcessFlow {
  name: Scalars['String']
  approverTitle: Scalars['String']
  approverUuid: Scalars['String']
}

export interface CreateTicketInput {
  payload: CreateTicketPayload
  action: ActionInput
}

export interface CreateTicketPayload {
  name: Scalars['String']
  description?: Maybe<Scalars['String']>
  resourceUuid?: Maybe<Scalars['String']>
  systemTags?: Maybe<Array<Scalars['String']>>
  userTags?: Maybe<Array<Scalars['String']>>
  requests: Scalars['String']
  flowCollectionUuid?: Maybe<Scalars['String']>
  accountSystemType: Scalars['String']
  accountSystemContext: AccountSystemContextInput
  tagUuids?: Maybe<Scalars['String']>
  sessionId?: Maybe<Scalars['String']>
  accessKeyId?: Maybe<Scalars['String']>
  accessKeySecret?: Maybe<Scalars['String']>
  requestIp?: Maybe<Scalars['String']>
}

export interface AccountSystemContextInput {
  projectUuid: Scalars['String']
  virtualIDUuid: Scalars['String']
}

export interface DeleteTicketInput {
  payload: Array<DeleteTicketPayload>
  action: ActionInput
}

export interface DeleteTicketPayload {
  uuid: Scalars['String']
  deleteMode?: Maybe<Scalars['String']>
  sessionId?: Maybe<Scalars['String']>
  accessKeyId?: Maybe<Scalars['String']>
  accessKeySecret?: Maybe<Scalars['String']>
  requestIp?: Maybe<Scalars['String']>
  systemTags?: Maybe<Array<Scalars['String']>>
  userTags?: Maybe<Array<Scalars['String']>>
}

export interface ReopenTicketInput {
  payload: ReopenTicketPayload
  action: ActionInput
}

export interface ReopenTicketPayload {
  uuid: Scalars['String']
  statusEvent: Scalars['String']
  comment?: Maybe<Scalars['String']>
  systemTags?: Maybe<Array<Scalars['String']>>
  userTags?: Maybe<Array<Scalars['String']>>
  sessionId?: Maybe<Scalars['String']>
  accessKeyId?: Maybe<Scalars['String']>
  accessKeySecret?: Maybe<Scalars['String']>
  requestIp?: Maybe<Scalars['String']>
}

export interface CancelTicketInput {
  payload: Array<CancelTicketPayload>
  action: ActionInput
}

export interface CancelTicketPayload {
  uuid: Scalars['String']
  statusEvent?: Maybe<TicketStatus>
  comment?: Maybe<Scalars['String']>
  systemTags?: Maybe<Array<Scalars['String']>>
  userTags?: Maybe<Array<Scalars['String']>>
  sessionId?: Maybe<Scalars['String']>
  accessKeyId?: Maybe<Scalars['String']>
  accessKeySecret?: Maybe<Scalars['String']>
  requestIp?: Maybe<Scalars['String']>
}

export interface UpdateTicketInput {
  payload: UpdateTicketPayload
  action: ActionInput
}

export interface UpdateTicketPayload {
  uuid: Scalars['String']
  requests: Scalars['String']
}

export interface AddPreconfigurationTemplateInput {
  payload: Array<AddPreconfigurationTemplatePayload>
  action: ActionInput
}

export interface AddPreconfigurationTemplatePayload {
  name: Scalars['String']
  distribution: Scalars['String']
  type: Scalars['String']
  content: Scalars['String']
  description?: Maybe<Scalars['String']>
}

export interface ChangePreconfigurationTemplateStateInput {
  payload: Array<ChangePreconfigurationTemplateStatePayload>
  action: ActionInput
}

export interface ChangePreconfigurationTemplateStatePayload {
  uuid: Scalars['String']
  stateEvent: Scalars['String']
}

export interface DeletePreconfigurationTemplateInput {
  payload: Array<DeletePreconfigurationTemplatePayload>
  action: ActionInput
}

export interface DeletePreconfigurationTemplatePayload {
  uuid: Scalars['String']
}

export interface UpdatePreconfigurationTemplateInput {
  payload: Array<UpdatePreconfigurationTemplatePayload>
  action: ActionInput
}

export interface UpdatePreconfigurationTemplatePayload {
  uuid: Scalars['String']
  name?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
}

export interface StartBaremetalInstanceInput {
  payload: Array<StartBaremetalInstancePayload>
  action: ActionInput
}

export interface StartBaremetalInstancePayload {
  uuid: Scalars['String']
  pxeBoot: Scalars['Boolean']
}

export interface StopBaremetalInstanceInput {
  payload: Array<StopBaremetalInstancePayload>
  action: ActionInput
}

export interface StopBaremetalInstancePayload {
  uuid: Scalars['String']
}

export interface RebootBaremetalInstanceInput {
  payload: Array<RebootBaremetalInstancePayload>
  action: ActionInput
}

export interface RebootBaremetalInstancePayload {
  uuid: Scalars['String']
  pxeBoot: Scalars['Boolean']
}

export interface RecoverBaremetalInstanceInput {
  payload: Array<RecoverBaremetalInstancePayload>
  action: ActionInput
}

export interface RecoverBaremetalInstancePayload {
  uuid: Scalars['String']
}

export interface ExpungeBaremetalInstanceInput {
  payload: Array<ExpungeBaremetalInstancePayload>
  action: ActionInput
}

export interface ExpungeBaremetalInstancePayload {
  uuid: Scalars['String']
}

export interface DeleteBaremetalInstanceInput {
  payload: Array<DeleteBaremetalInstancePayload>
  action: ActionInput
}

export interface DeleteBaremetalInstancePayload {
  uuid: Scalars['String']
}

export interface UpdateBaremetalInstanceInput {
  payload: Array<UpdateBaremetalInstancePayload>
  action: ActionInput
}

export interface UpdateBaremetalInstancePayload {
  uuid: Scalars['String']
  name?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
}

export interface OpenBaremetalInstanceConsoleInput {
  payload: Array<OpenBaremetalInstanceConsolePayload>
  action: ActionInput
}

export interface OpenBaremetalInstanceConsolePayload {
  uuid: Scalars['String']
}

export interface CreateBaremetalInstanceInput {
  payload: Array<CreateBaremetalInstancePayload>
  action: ActionInput
}

export interface CreateBaremetalInstancePayload {
  resourceUuid: Scalars['String']
  name: Scalars['String']
  description?: Maybe<Scalars['String']>
  chassisUuid: Scalars['String']
  imageUuid: Scalars['String']
  templateUuid?: Maybe<Scalars['String']>
  username?: Maybe<Scalars['String']>
  password: Scalars['String']
  nicCfgs?: Maybe<Array<CreateBaremetalInstanceNicConfig>>
  bondingCfgs?: Maybe<Array<CreateBaremetalInstanceBondConfig>>
  customConfigurations?: Maybe<Array<CreateBaremetalInstanceCustomConfig>>
  strategy?: Maybe<Scalars['String']>
  systemTags?: Maybe<Array<Scalars['String']>>
}

export interface CreateBaremetalInstanceNicConfig {
  mac: Scalars['String']
  l3NetworkUuid: Scalars['String']
  ip?: Maybe<Scalars['String']>
}

export interface CreateBaremetalInstanceBondConfig {
  name: Scalars['String']
  mode: Scalars['Float']
  l3NetworkUuid: Scalars['String']
  slaves: Array<Scalars['String']>
  ip?: Maybe<Scalars['String']>
}

export interface CreateBaremetalInstanceCustomConfig {
  key: Scalars['String']
  value: Scalars['String']
}

export interface StopBaremetalPxeServerInput {
  payload: Array<StopBaremetalPxeServerPayload>
  action: ActionInput
}

export interface StopBaremetalPxeServerPayload {
  uuid: Scalars['String']
}

export interface StartBaremetalPxeServerInput {
  payload: Array<StartBaremetalPxeServerPayload>
  action: ActionInput
}

export interface StartBaremetalPxeServerPayload {
  uuid: Scalars['String']
}

export interface ReconnectBaremetalPxeServerInput {
  payload: Array<ReconnectBaremetalPxeServerPayload>
  action: ActionInput
}

export interface ReconnectBaremetalPxeServerPayload {
  uuid: Scalars['String']
}

export interface DeleteBaremetalPxeServerInput {
  payload: Array<DeleteBaremetalPxeServerPayload>
  action: ActionInput
}

export interface DeleteBaremetalPxeServerPayload {
  uuid: Scalars['String']
}

export interface CreateBaremetalPxeServerInput {
  payload: CreateBaremetalPxeServerPayload
  action: ActionInput
}

export interface CreateBaremetalPxeServerPayload {
  zoneUuid: Scalars['String']
  name: Scalars['String']
  description?: Maybe<Scalars['String']>
  dhcpInterface: Scalars['String']
  storagePath: Scalars['String']
  sshPort: Scalars['Int']
  sshUsername: Scalars['String']
  sshPassword: Scalars['String']
  dhcpRangeBegin?: Maybe<Scalars['String']>
  dhcpRangeEnd?: Maybe<Scalars['String']>
  clusterUuid: Array<Scalars['String']>
  hostname: Scalars['String']
}

export interface UpdateBaremetalPxeServerInput {
  payload: Array<UpdateBaremetalPxeServerPayload>
  action: ActionInput
}

export interface UpdateBaremetalPxeServerPayload {
  uuid: Scalars['String']
  name: Scalars['String']
  description?: Maybe<Scalars['String']>
}

export interface AttachBaremetalPxeServerInput {
  payload: Array<AttachBaremetalPxeServerPayload>
  action: ActionInput
}

export interface AttachBaremetalPxeServerPayload {
  pxeServerUuid: Scalars['String']
  clusterUuid: Scalars['String']
}

export interface DetachBaremetalPxeServerInput {
  payload: Array<DetachBaremetalPxeServerPayload>
  action: ActionInput
}

export interface DetachBaremetalPxeServerPayload {
  pxeServerUuid: Scalars['String']
  clusterUuid: Scalars['String']
}

export interface InspectBaremetalChassisInput {
  payload: Array<InspectBaremetalChassisPayload>
  action: ActionInput
}

export interface InspectBaremetalChassisPayload {
  uuid: Scalars['String']
}

export interface CreateBaremetalChassisInput {
  payload: Array<CreateBaremetalChassisPayload>
  action: ActionInput
}

export interface CreateBaremetalChassisPayload {
  name: Scalars['String']
  description?: Maybe<Scalars['String']>
  ipmiAddress: Scalars['String']
  ipmiPort?: Maybe<Scalars['Int']>
  ipmiUsername: Scalars['String']
  ipmiPassword: Scalars['String']
  clusterUuid: Scalars['String']
  restartAfterAdding: Scalars['Boolean']
}

export interface BatchCreateBaremetalChassisInput {
  payload: BatchCreateBaremetalChassisPayload
  action: ActionInput
}

export interface BatchCreateBaremetalChassisPayload {
  baremetalChassisInfo: Scalars['String']
}

export interface DeleteBaremetalChassisInput {
  payload: Array<DeleteBaremetalChassisPayload>
  action: ActionInput
}

export interface DeleteBaremetalChassisPayload {
  uuid: Scalars['String']
}

export interface UpdateBaremetalChassisInput {
  payload: Array<UpdateBaremetalChassisPayload>
  action: ActionInput
}

export interface UpdateBaremetalChassisPayload {
  uuid: Scalars['String']
  name?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  ipmiAddress?: Maybe<Scalars['String']>
  ipmiPort?: Maybe<Scalars['Int']>
  ipmiUsername?: Maybe<Scalars['String']>
  ipmiPassword?: Maybe<Scalars['String']>
  stateEvent?: Maybe<Scalars['String']>
  powerStatus?: Maybe<BaremetalChassisPowerStatusType>
}

export interface AddBareMetal2IpmiChassisInput {
  payload: Array<AddBareMetal2IpmiChassisPayload>
  action: ActionInput
}

export interface AddBareMetal2IpmiChassisPayload {
  ipmiAddress: Scalars['String']
  ipmiStartIp?: Maybe<Scalars['String']>
  ipmiEndIp?: Maybe<Scalars['String']>
  ipmiPort?: Maybe<Scalars['Int']>
  ipmiUsername: Scalars['String']
  ipmiPassword: Scalars['String']
  name: Scalars['String']
  clusterUuid: Scalars['String']
  description?: Maybe<Scalars['String']>
  getHarewareInfo?: Maybe<Scalars['Boolean']>
}

export interface AddBareMetal2ChassisFromConfigFileInput {
  payload: AddBareMetal2ChassisFromConfigFilePayload
  action: ActionInput
}

export interface AddBareMetal2ChassisFromConfigFilePayload {
  chassisInfo: Scalars['String']
}

export interface ChangeBareMetal2ChassisStateInput {
  payload: Array<ChangeBareMetal2ChassisStatePayload>
  action: ActionInput
}

export interface ChangeBareMetal2ChassisStatePayload {
  uuid: Scalars['String']
  stateEvent: Scalars['String']
}

export interface DeleteBareMetal2ChassisInput {
  payload: Array<DeleteBareMetal2ChassisPayload>
  action: ActionInput
}

export interface DeleteBareMetal2ChassisPayload {
  uuid: Scalars['String']
}

export interface InspectBareMetal2ChassisInput {
  payload: Array<InspectBareMetal2ChassisPayload>
  action: ActionInput
}

export interface InspectBareMetal2ChassisPayload {
  uuid: Scalars['String']
}

export interface PowerOffBareMetal2ChassisInput {
  payload: Array<PowerOffBareMetal2ChassisPayload>
  action: ActionInput
}

export interface PowerOffBareMetal2ChassisPayload {
  uuid: Scalars['String']
}

export interface PowerOnBareMetal2ChassisInput {
  payload: Array<PowerOnBareMetal2ChassisPayload>
  action: ActionInput
}

export interface PowerOnBareMetal2ChassisPayload {
  uuid: Scalars['String']
}

export interface PowerResetBareMetal2ChassisInput {
  payload: Array<PowerResetBareMetal2ChassisPayload>
  action: ActionInput
}

export interface PowerResetBareMetal2ChassisPayload {
  uuid: Scalars['String']
}

export interface UpdateBareMetal2ChassisInput {
  payload: Array<UpdateBareMetal2ChassisPayload>
  action: ActionInput
}

export interface UpdateBareMetal2ChassisPayload {
  uuid: Scalars['String']
  name?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
}

export interface UpdateBareMetal2IpmiChassisInput {
  payload: Array<UpdateBareMetal2IpmiChassisPayload>
  action: ActionInput
}

export interface UpdateBareMetal2IpmiChassisPayload {
  uuid: Scalars['String']
  name?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
}

export interface CreateBareMetal2GatewayInput {
  payload: CreateBareMetal2GatewayPayload
  action: ActionInput
}

export interface CreateBareMetal2GatewayPayload {
  password: Scalars['String']
  name: Scalars['String']
  username?: Maybe<Scalars['String']>
  sshPort: Scalars['Int']
  description?: Maybe<Scalars['String']>
  managementIp?: Maybe<Scalars['String']>
  clusterUuid: Scalars['String']
}

export interface AttachBareMetal2GatewayToClusterInput {
  payload: AttachBareMetal2GatewayToClusterPayload
  action: ActionInput
}

export interface AttachBareMetal2GatewayToClusterPayload {
  gatewayUuid: Scalars['String']
  clusterUuid: Scalars['String']
}

export interface ChangeBareMetal2GatewayClusterInput {
  payload: Array<ChangeBareMetal2GatewayClusterPayload>
  action: ActionInput
}

export interface ChangeBareMetal2GatewayClusterPayload {
  gatewayUuid: Scalars['String']
  clusterUuid: Scalars['String']
}

export interface DeleteBareMetal2GatewayInput {
  payload: Array<DeleteBareMetal2GatewayPayload>
  action: ActionInput
}

export interface DeleteBareMetal2GatewayPayload {
  uuid: Scalars['String']
}

export interface ChangeBareMetal2GatewayStateInput {
  payload: Array<ChangeBareMetal2GatewayStatePayload>
  action: ActionInput
}

export interface ChangeBareMetal2GatewayStatePayload {
  uuid: Scalars['String']
  stateEvent: Scalars['String']
}

export interface UpdateBareMetal2GatewayInput {
  payload: UpdateBareMetal2GatewayPayload
  action: ActionInput
}

export interface UpdateBareMetal2GatewayPayload {
  sshPort?: Maybe<Scalars['Int']>
  username?: Maybe<Scalars['String']>
  uuid?: Maybe<Scalars['String']>
  clusterUuid?: Maybe<Scalars['String']>
  name?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  password?: Maybe<Scalars['String']>
  managementIp?: Maybe<Scalars['String']>
}

export interface ReconnectBareMetal2GatewayInput {
  payload: Array<ReconnectBareMetal2GatewayPayload>
  action: ActionInput
}

export interface ReconnectBareMetal2GatewayPayload {
  uuid: Scalars['String']
}

export interface StartBareMetal2InstanceInput {
  payload: Array<StartBareMetal2InstancePayload>
  action: ActionInput
}

export interface StartBareMetal2InstancePayload {
  uuid: Scalars['String']
  chassisUuid?: Maybe<Scalars['String']>
  chassisOfferingUuid?: Maybe<Scalars['String']>
}

export interface CreateBareMetal2InstanceInput {
  payload: Array<CreateBareMetal2InstancePayload>
  action: ActionInput
}

export interface CreateBareMetal2InstancePayload {
  name: Scalars['String']
  imageUuid: Scalars['String']
  description?: Maybe<Scalars['String']>
  zoneUuid?: Maybe<Scalars['String']>
  clusterUuid?: Maybe<Scalars['String']>
  gatewayUuid?: Maybe<Scalars['String']>
  chassisUuid?: Maybe<Scalars['String']>
  chassisOfferingUuid?: Maybe<Scalars['String']>
  primaryStorageUuidForRootVolume?: Maybe<Scalars['String']>
  primaryStorageUuidForDataVolume?: Maybe<Scalars['String']>
  dataDiskOfferingUuids?: Maybe<Array<Scalars['String']>>
  rootVolumeSystemTags?: Maybe<Array<Scalars['String']>>
  dataVolumeSystemTags?: Maybe<Array<Scalars['String']>>
  gatewayAllocatorStrategy?: Maybe<Scalars['String']>
  tagUuids?: Maybe<Array<Scalars['String']>>
  systemTags?: Maybe<Array<Scalars['String']>>
}

export interface DeleteBareMetal2InstanceInput {
  payload: Array<DeleteBareMetal2InstancePayload>
  action: ActionInput
}

export interface DeleteBareMetal2InstancePayload {
  uuid: Scalars['String']
  state?: Maybe<VmInstanceState>
  deleteVolume?: Maybe<Scalars['Boolean']>
}

export interface UpdateBareMetal2InstanceInput {
  payload: Array<UpdateBareMetal2InstancePayload>
  action: ActionInput
}

export interface UpdateBareMetal2InstancePayload {
  uuid: Scalars['String']
  name?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  state?: Maybe<Scalars['String']>
  defaultL3NetworkUuid?: Maybe<Scalars['String']>
  chassisOfferingUuid?: Maybe<Scalars['String']>
  autoReleaseChassisEvent?: Maybe<AutoReleaseChassisEvent>
}

export interface ChangeBareMetal2InstancePasswordInput {
  payload: Array<ChangeBareMetal2InstancePasswordPayload>
  action: ActionInput
}

export interface ChangeBareMetal2InstancePasswordPayload {
  uuid: Scalars['String']
  password: Scalars['String']
  username: Scalars['String']
}

export interface ReconnectBareMetal2InstanceInput {
  payload: Array<ReconnectBareMetal2InstancePayload>
  action: ActionInput
}

export interface ReconnectBareMetal2InstancePayload {
  uuid: Scalars['String']
}

export interface AddV2VConversionHostInput {
  payload: Array<AddV2VConversionHostPayload>
  action: ActionInput
}

export interface AddV2VConversionHostPayload {
  name: Scalars['String']
  type: Scalars['String']
  hostUuid: Scalars['String']
  storagePath: Scalars['String']
  systemTags?: Maybe<Array<Scalars['String']>>
  description?: Maybe<Scalars['String']>
}

export interface CancelV2VConversionHostBandWidthInput {
  payload: Array<CancelV2VConversionHostBandWidthPayload>
  action: ActionInput
}

export interface CancelV2VConversionHostBandWidthPayload {
  uuid: Scalars['String']
  networkOutboundBandwidth: Scalars['String']
  networkInboundBandwidth: Scalars['String']
}

export interface ChangeV2VConversionHostStateInput {
  payload: Array<ChangeV2VConversionHostStatePayload>
  action: ActionInput
}

export interface ChangeV2VConversionHostStatePayload {
  uuid: Scalars['String']
  stateEvent: Scalars['String']
}

export interface DeleteV2VConversionHostInput {
  payload: Array<DeleteV2VConversionHostPayload>
  action: ActionInput
}

export interface DeleteV2VConversionHostPayload {
  uuid: Scalars['String']
  deleteMode?: Maybe<Scalars['String']>
}

export interface DisableV2VConversionHostInput {
  payload: Array<DisableV2VConversionHostPayload>
  action: ActionInput
}

export interface DisableV2VConversionHostPayload {
  uuid: Scalars['String']
}

export interface EnableV2VConversionHostInput {
  payload: Array<EnableV2VConversionHostPayload>
  action: ActionInput
}

export interface EnableV2VConversionHostPayload {
  uuid: Scalars['String']
}

export interface UpdateV2VConversionHostBandWidthInput {
  payload: Array<UpdateV2VConversionHostBandWidthPayload>
  action: ActionInput
}

export interface UpdateV2VConversionHostBandWidthPayload {
  uuid: Scalars['String']
  networkOutboundBandwidth: Scalars['String']
  networkInboundBandwidth: Scalars['String']
  newNetworkOutboundBandwidth: Scalars['Float']
  newNetworkInboundBandwidth: Scalars['Float']
}

export interface UpdateV2VConversionHostInput {
  payload: Array<UpdateV2VConversionHostPayload>
  action: ActionInput
}

export interface UpdateV2VConversionHostPayload {
  uuid: Scalars['String']
  name?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
}

export interface AddResourceToBackupJobInput {
  payload: Array<AddResourceToBackupJobPayload>
  action: ActionInput
}

export interface AddResourceToBackupJobPayload {
  uuid: Scalars['String']
  resourceUuids: Array<Scalars['String']>
}

export interface DeleteDatabaseBackupJobInput {
  payload: Array<DeleteDatabaseBackupJobPayload>
  action: ActionInput
}

export interface DeleteDatabaseBackupJobPayload {
  uuid: Scalars['String']
  triggersUuid?: Maybe<Array<Scalars['String']>>
}

export interface DeleteResourceBackupJobInput {
  payload: Array<DeleteResourceBackupJobPayload>
  action: ActionInput
}

export interface DeleteResourceBackupJobPayload {
  uuid: Scalars['String']
  triggersUuid?: Maybe<Array<Scalars['String']>>
}

export interface RemoveResourceFromBackupJobInput {
  payload: Array<RemoveResourceFromBackupJobPayload>
  action: ActionInput
}

export interface RemoveResourceFromBackupJobPayload {
  uuid: Scalars['String']
  resourceUuids: Array<Scalars['String']>
}

export interface UpdateResourceBackupJobStrategyInput {
  payload: Array<UpdateResourceBackupJobStrategyPayload>
  action: ActionInput
}

export interface UpdateResourceBackupJobStrategyPayload {
  uuid: Scalars['String']
  parameters?: Maybe<Parameters>
  incrementalTriggers?: Maybe<Array<UpdateSchedulerTrigger>>
  fullTrigger?: Maybe<UpdateSchedulerTrigger>
}

export interface Parameters {
  snapshotMaxNumber?: Maybe<Scalars['String']>
  retentionType?: Maybe<Scalars['String']>
  retentionValue?: Maybe<Scalars['String']>
  backupStorageUuids?: Maybe<Scalars['String']>
  remoteBackupStorageUuid?: Maybe<Scalars['String']>
  fullBackupTriggerUuid?: Maybe<Scalars['String']>
  networkWriteBandwidth?: Maybe<Scalars['String']>
  networkReadBandwidth?: Maybe<Scalars['String']>
  volumeReadBandwidth?: Maybe<Scalars['String']>
  volumeWriteBandwidth?: Maybe<Scalars['String']>
}

export interface UpdateSchedulerTrigger {
  name: Scalars['String']
  schedulerInterval?: Maybe<Scalars['Float']>
  repeatCount?: Maybe<Scalars['Float']>
  startTime?: Maybe<Scalars['Float']>
  schedulerType: SchedulerType
  cron?: Maybe<Scalars['String']>
}

export interface UpdateSchedulerJobGroupInput {
  payload: Array<UpdateSchedulerJobGroupPayload>
  action: ActionInput
}

export interface UpdateSchedulerJobGroupPayload {
  uuid: Scalars['String']
  name?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  state?: Maybe<SchedulerJobGroupState>
  parameters?: Maybe<Parameters>
}

export interface CreateResourceBackupJobInput {
  payload: CreateResourceBackupJobPayload
  action: ActionInput
}

export interface CreateResourceBackupJobPayload {
  name: Scalars['String']
  description?: Maybe<Scalars['String']>
  parameters?: Maybe<Parameters>
  type: SchedulerJobType
  triggerList: Array<ResourceSchedulerTrigger>
  fullTriggerList?: Maybe<Array<ResourceSchedulerTrigger>>
  targetResourceUuids: Array<Scalars['String']>
  triggerNow?: Maybe<Scalars['Boolean']>
}

export enum SchedulerJobType {
  startVm = 'startVm',
  stopVm = 'stopVm',
  rebootVm = 'rebootVm',
  volumeSnapshot = 'volumeSnapshot',
  volumeBackup = 'volumeBackup',
  rootVolumeBackup = 'rootVolumeBackup',
  vmBackup = 'vmBackup',
  databaseBackup = 'databaseBackup',
  localRaidSelfTest = 'localRaidSelfTest'
}

export interface ResourceSchedulerTrigger {
  schedulerInterval?: Maybe<Scalars['Float']>
  repeatCount?: Maybe<Scalars['Float']>
  startTime?: Maybe<Scalars['Float']>
  schedulerType: SchedulerType
  cron?: Maybe<Scalars['String']>
}

export interface CreateDatabaseBackupJobInput {
  payload: CreateDatabaseBackupJobPayload
  action: ActionInput
}

export interface CreateDatabaseBackupJobPayload {
  name: Scalars['String']
  description?: Maybe<Scalars['String']>
  parameters?: Maybe<Parameters>
  type?: Maybe<SchedulerJobType>
  triggerList: Array<DatabaseSchedulerTrigger>
  targetResourceUuids?: Maybe<Array<Scalars['String']>>
  triggerNow?: Maybe<Scalars['Boolean']>
}

export interface DatabaseSchedulerTrigger {
  schedulerInterval?: Maybe<Scalars['Float']>
  repeatCount?: Maybe<Scalars['Float']>
  startTime?: Maybe<Scalars['Float']>
  schedulerType: SchedulerType
  cron?: Maybe<Scalars['String']>
}

export interface ScanDataLocalBackupStorageInput {
  payload: Array<ScanDataLocalBackupStoragePayload>
  action: ActionInput
}

export interface ScanDataLocalBackupStoragePayload {
  uuid: Scalars['String']
  currentZoneUuid: Scalars['String']
}

export interface AddLocalBackupStorageByCreateInput {
  payload: AddLocalBackupStorageByCreatePayload
  action: ActionInput
}

export interface AddLocalBackupStorageByCreatePayload {
  addMode?: Maybe<Scalars['String']>
  cidr?: Maybe<Scalars['String']>
  imageStoreUuid?: Maybe<Scalars['String']>
  zoneUuid?: Maybe<Scalars['String']>
  scanBackup?: Maybe<Scalars['Boolean']>
  hostname?: Maybe<Scalars['String']>
  username?: Maybe<Scalars['String']>
  password?: Maybe<Scalars['String']>
  url?: Maybe<Scalars['String']>
  name?: Maybe<Scalars['String']>
  sshPort?: Maybe<Scalars['Int']>
  description?: Maybe<Scalars['String']>
  type?: Maybe<Scalars['String']>
}

export interface AddLocalBackupStorageBySelectInput {
  payload: AddLocalBackupStorageBySelectPayload
  action: ActionInput
}

export interface AddLocalBackupStorageBySelectPayload {
  addMode?: Maybe<Scalars['String']>
  cidr?: Maybe<Scalars['String']>
  imageStoreUuid?: Maybe<Scalars['String']>
  zoneUuid?: Maybe<Scalars['String']>
  scanBackup?: Maybe<Scalars['Boolean']>
  hostname?: Maybe<Scalars['String']>
  username?: Maybe<Scalars['String']>
  password?: Maybe<Scalars['String']>
  url?: Maybe<Scalars['String']>
  name?: Maybe<Scalars['String']>
  sshPort?: Maybe<Scalars['Int']>
  description?: Maybe<Scalars['String']>
  type?: Maybe<Scalars['String']>
}

export interface ChangeLocalBackupStorageStateInput {
  payload: Array<ChangeLocalBackupStorageStatePayload>
  action: ActionInput
}

export interface ChangeLocalBackupStorageStatePayload {
  uuid: Scalars['String']
  stateEvent: Scalars['String']
}

export interface CleanUpTrashOnLocalBackupStorageInput {
  payload: Array<CleanUpTrashOnLocalBackupStoragePayload>
  action: ActionInput
}

export interface CleanUpTrashOnLocalBackupStoragePayload {
  uuid: Scalars['String']
}

export interface DeleteLocalBackupStorageInput {
  payload: Array<DeleteLocalBackupStoragePayload>
  action: ActionInput
}

export interface DeleteLocalBackupStoragePayload {
  uuid: Scalars['String']
}

export interface ModifyLocalBackupStorageInfoImageTypeInput {
  payload: Array<ModifyLocalBackupStorageInfoImageTypePayload>
  action: ActionInput
}

export interface ModifyLocalBackupStorageInfoImageTypePayload {
  uuid: Scalars['String']
  username?: Maybe<Scalars['String']>
  password?: Maybe<Scalars['String']>
  hostname?: Maybe<Scalars['String']>
  sshPort?: Maybe<Scalars['String']>
  name?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  systemTags?: Maybe<Array<Scalars['String']>>
  userTags?: Maybe<Array<Scalars['String']>>
  sessionId?: Maybe<Scalars['String']>
  accessKeyId?: Maybe<Scalars['String']>
  accessKeySecret?: Maybe<Scalars['String']>
  requestIp?: Maybe<Scalars['String']>
}

export interface ModifyLocalBackupStorageInfoSftpTypeInput {
  payload: Array<ModifyLocalBackupStorageInfoSftpTypePayload>
  action: ActionInput
}

export interface ModifyLocalBackupStorageInfoSftpTypePayload {
  uuid: Scalars['String']
  username?: Maybe<Scalars['String']>
  password?: Maybe<Scalars['String']>
  hostname?: Maybe<Scalars['String']>
  sshPort?: Maybe<Scalars['String']>
  name?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  systemTags?: Maybe<Array<Scalars['String']>>
  userTags?: Maybe<Array<Scalars['String']>>
  sessionId?: Maybe<Scalars['String']>
  accessKeyId?: Maybe<Scalars['String']>
  accessKeySecret?: Maybe<Scalars['String']>
  requestIp?: Maybe<Scalars['String']>
}

export interface ReclaimSpaceFromLocalBackupStorageInput {
  payload: Array<ReclaimSpaceFromLocalBackupStoragePayload>
  action: ActionInput
}

export interface ReclaimSpaceFromLocalBackupStoragePayload {
  uuid: Scalars['String']
}

export interface ReconnectLocalBackupStorageInput {
  payload: Array<ReconnectLocalBackupStoragePayload>
  action: ActionInput
}

export interface ReconnectLocalBackupStoragePayload {
  uuid: Scalars['String']
}

export interface ScanDataBaseLocalBackupStorageInput {
  payload: Array<ScanDataBaseLocalBackupStoragePayload>
  action: ActionInput
}

export interface ScanDataBaseLocalBackupStoragePayload {
  uuid: Scalars['String']
}

export interface ScanVMLocalBackupStorageInput {
  payload: Array<ScanVMLocalBackupStoragePayload>
  action: ActionInput
}

export interface ScanVMLocalBackupStoragePayload {
  uuid: Scalars['String']
}

export interface ScanVolumeLocalBackupStorageInput {
  payload: Array<ScanVolumeLocalBackupStoragePayload>
  action: ActionInput
}

export interface ScanVolumeLocalBackupStoragePayload {
  uuid: Scalars['String']
}

export interface UpdateLocalBackupStorageInput {
  payload: Array<UpdateLocalBackupStoragePayload>
  action: ActionInput
}

export interface UpdateLocalBackupStoragePayload {
  uuid: Scalars['String']
  description?: Maybe<Scalars['String']>
  name?: Maybe<Scalars['String']>
}

export interface ChangeRemoteBackupStorageStateInput {
  payload: Array<ChangeRemoteBackupStorageStatePayload>
  action: ActionInput
}

export interface ChangeRemoteBackupStorageStatePayload {
  uuid: Scalars['String']
  stateEvent: Scalars['String']
}

export interface AddRemoteBackupStorageInput {
  payload: AddRemoteBackupStoragePayload
  action: ActionInput
}

export interface AddRemoteBackupStoragePayload {
  hostname: Scalars['String']
  username: Scalars['String']
  password: Scalars['String']
  sshPort?: Maybe<Scalars['Int']>
  url: Scalars['String']
  name: Scalars['String']
  description?: Maybe<Scalars['String']>
  type?: Maybe<Scalars['String']>
  zoneUuid?: Maybe<Scalars['String']>
}

export interface DeleteRemoteBackupStorageInput {
  payload: Array<DeleteRemoteBackupStoragePayload>
  action: ActionInput
}

export interface DeleteRemoteBackupStoragePayload {
  uuid: Scalars['String']
}

export interface ModifyRemoteBackupStorageInfoImageTypeInput {
  payload: Array<ModifyRemoteBackupStorageInfoImageTypePayload>
  action: ActionInput
}

export interface ModifyRemoteBackupStorageInfoImageTypePayload {
  uuid: Scalars['String']
  username?: Maybe<Scalars['String']>
  password?: Maybe<Scalars['String']>
  hostname?: Maybe<Scalars['String']>
  sshPort?: Maybe<Scalars['Int']>
  name?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  systemTags?: Maybe<Array<Scalars['String']>>
  userTags?: Maybe<Array<Scalars['String']>>
  sessionId?: Maybe<Scalars['String']>
  accessKeyId?: Maybe<Scalars['String']>
  accessKeySecret?: Maybe<Scalars['String']>
  requestIp?: Maybe<Scalars['String']>
}

export interface ModifyRemoteBackupStorageInfoSftpTypeInput {
  payload: Array<ModifyRemoteBackupStorageInfoSftpTypePayload>
  action: ActionInput
}

export interface ModifyRemoteBackupStorageInfoSftpTypePayload {
  uuid: Scalars['String']
  username?: Maybe<Scalars['String']>
  password?: Maybe<Scalars['String']>
  hostname?: Maybe<Scalars['String']>
  sshPort?: Maybe<Scalars['Int']>
  name?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  systemTags?: Maybe<Array<Scalars['String']>>
  userTags?: Maybe<Array<Scalars['String']>>
  sessionId?: Maybe<Scalars['String']>
  accessKeyId?: Maybe<Scalars['String']>
  accessKeySecret?: Maybe<Scalars['String']>
  requestIp?: Maybe<Scalars['String']>
}

export interface ReclaimSpaceFromRemoteStorageInput {
  payload: Array<ReclaimSpaceFromRemoteStoragePayload>
  action: ActionInput
}

export interface ReclaimSpaceFromRemoteStoragePayload {
  uuid: Scalars['String']
}

export interface ReconnectRemoteBackupStorageInput {
  payload: Array<ReconnectRemoteBackupStoragePayload>
  action: ActionInput
}

export interface ReconnectRemoteBackupStoragePayload {
  uuid: Scalars['String']
}

export interface UpdateRemoteBackupStorageInput {
  payload: Array<UpdateRemoteBackupStoragePayload>
  action: ActionInput
}

export interface UpdateRemoteBackupStoragePayload {
  uuid: Scalars['String']
  description?: Maybe<Scalars['String']>
  name?: Maybe<Scalars['String']>
}

export interface CreateV2VMigrationInput {
  payload: CreateV2VMigrationPayload
  action: ActionInput
}

export interface CreateV2VMigrationPayload {
  longJobName?: Maybe<Scalars['String']>
  longJobDescription?: Maybe<Scalars['String']>
  url: Scalars['String']
  volumeFilters?: Maybe<Array<CreateV2VVolumeInput>>
  sshPrivKey?: Maybe<Scalars['String']>
  name: Scalars['String']
  conversionHostUuid?: Maybe<Scalars['String']>
  cpuNum: Scalars['Float']
  convertStrategy?: Maybe<Scalars['String']>
  memorySize: Scalars['Float']
  clusterUuid?: Maybe<Scalars['String']>
  primaryStorageUuid: Scalars['String']
  l3NetworkUuids: Array<Scalars['String']>
  defaultL3NetworkUuid?: Maybe<Scalars['String']>
  platform?: Maybe<Scalars['String']>
  strategy?: Maybe<Scalars['String']>
  pauseVm?: Maybe<Scalars['Boolean']>
  systemTags?: Maybe<Array<Scalars['String']>>
}

export interface CreateV2VVolumeInput {
  deviceId?: Maybe<Scalars['String']>
  displayName?: Maybe<Scalars['String']>
  skip?: Maybe<Scalars['Boolean']>
}

export interface RerunV2VMigrationInput {
  payload: Array<RerunV2VMigrationPayload>
  action: ActionInput
}

export interface RerunV2VMigrationPayload {
  uuid: Scalars['String']
}

export interface DeleteV2VMigrationInput {
  payload: Array<DeleteV2VMigrationPayload>
  action: ActionInput
}

export interface DeleteV2VMigrationPayload {
  uuid: Scalars['String']
  state: LongJobState
}

export interface UpdateV2VMigrationInput {
  payload: Array<UpdateV2VMigrationPayload>
  action: ActionInput
}

export interface UpdateV2VMigrationPayload {
  uuid: Scalars['String']
  name?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
}

export interface ChangeSchedulerJobStateInput {
  payload: Array<ChangeSchedulerJobStatePayload>
  action: ActionInput
}

export interface ChangeSchedulerJobStatePayload {
  uuid: Scalars['String']
  stateEvent: SchedulerJobStateEvent
}

export enum SchedulerJobStateEvent {
  enable = 'enable',
  disable = 'disable'
}

export interface CreateSchedulerJobInput {
  payload: CreateSchedulerJobPayload
  action: ActionInput
}

export interface CreateSchedulerJobPayload {
  name: Scalars['String']
  description?: Maybe<Scalars['String']>
  targetResourceUuid: Scalars['String']
  type: Scalars['String']
  schedulerTriggerUuid?: Maybe<Scalars['String']>
  parameters?: Maybe<Parameters>
}

export interface DeleteSchedulerJobInput {
  payload: Array<DeleteSchedulerJobPayload>
  action: ActionInput
}

export interface DeleteSchedulerJobPayload {
  uuid: Scalars['String']
}

export interface AddSchedulerJobToSchedulerTriggerInput {
  payload: Array<AddSchedulerJobToSchedulerTriggerPayload>
  action: ActionInput
}

export interface AddSchedulerJobToSchedulerTriggerPayload {
  schedulerJobUuid: Scalars['String']
  schedulerTriggerUuid: Scalars['String']
}

export interface RemoveSchedulerJobFromSchedulerTriggerInput {
  payload: Array<RemoveSchedulerJobFromSchedulerTriggerPayload>
  action: ActionInput
}

export interface RemoveSchedulerJobFromSchedulerTriggerPayload {
  schedulerJobUuid: Scalars['String']
  schedulerTriggerUuid: Scalars['String']
}

export interface UpdateSchedulerJobInput {
  payload: UpdateSchedulerJobPayload
  action: ActionInput
}

export interface UpdateSchedulerJobPayload {
  uuid: Scalars['String']
  name?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
}

export interface CreateSchedulerTriggerInput {
  payload: CreateSchedulerTriggerPayload
  action: ActionInput
}

export interface CreateSchedulerTriggerPayload {
  name: Scalars['String']
  description?: Maybe<Scalars['String']>
  schedulerInterval?: Maybe<Scalars['Int']>
  repeatCount?: Maybe<Scalars['Int']>
  startTime?: Maybe<Scalars['Float']>
  schedulerType?: Maybe<SchedulerType>
  cron?: Maybe<Scalars['String']>
  resourceUuid?: Maybe<Scalars['String']>
}

export interface DeleteSchedulerTriggerInput {
  payload: Array<DeleteSchedulerTriggerPayload>
  action: ActionInput
}

export interface DeleteSchedulerTriggerPayload {
  uuid: Scalars['String']
}

export interface RunSchedulerTriggerInput {
  payload: Array<RunSchedulerTriggerPayload>
  action: ActionInput
}

export interface RunSchedulerTriggerPayload {
  uuid: Scalars['String']
  jobUuids?: Maybe<Array<Scalars['String']>>
}

export interface UpdateSchedulerTriggerInput {
  payload: UpdateSchedulerTriggerPayload
  action: ActionInput
}

export interface UpdateSchedulerTriggerPayload {
  uuid: Scalars['String']
  name?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  schedulerInterval?: Maybe<Scalars['Int']>
  repeatCount?: Maybe<Scalars['Int']>
  startTime?: Maybe<Scalars['Float']>
}

export interface CreateCertificateInput {
  payload: Array<CreateCertificatePayload>
  action: ActionInput
}

export interface CreateCertificatePayload {
  name: Scalars['String']
  certificate: Scalars['String']
}

export interface DeleteCertificateInput {
  payload: Array<DeleteCertificatePayload>
  action: ActionInput
}

export interface DeleteCertificatePayload {
  uuids: Array<Scalars['String']>
}

export interface UpdateCertificateInput {
  payload: UpdateCertificatePayload
  action: ActionInput
}

export interface UpdateCertificatePayload {
  uuid: Scalars['String']
  name?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
}

export interface ReconnectConsoleProxyInput {
  payload: ReconnectConsoleProxyPayload
  action: ActionInput
}

export interface ReconnectConsoleProxyPayload {
  agentUuids?: Maybe<Array<Scalars['String']>>
}

export interface UpdateConsoleProxyInput {
  payload: Array<UpdateConsoleProxyPayload>
  action: ActionInput
}

export interface UpdateConsoleProxyPayload {
  uuid: Scalars['String']
  consoleProxyOverriddenIp: Scalars['String']
}

export interface CreateAccessKeyInput {
  payload: CreateAccessKeyPayload
  action: ActionInput
}

export interface CreateAccessKeyPayload {
  name: Scalars['String']
}

export interface ChangeAccessKeyStateInput {
  payload: Array<ChangeAccessKeyStatePayload>
  action: ActionInput
}

export interface ChangeAccessKeyStatePayload {
  uuid: Scalars['String']
  stateEvent: Scalars['String']
}

export interface DeleteAccessKeyInput {
  payload: Array<DeleteAccessKeyPayload>
  action: ActionInput
}

export interface DeleteAccessKeyPayload {
  uuid: Scalars['String']
}

export interface DeleteHybridKeySecretInput {
  payload: Array<DeleteHybridKeySecretPayload>
  action: ActionInput
}

export interface DeleteHybridKeySecretPayload {
  uuid: Scalars['String']
}

export interface CreateHybridKeySecretInput {
  payload: CreateHybridKeySecretPayload
  action: ActionInput
}

export interface CreateHybridKeySecretPayload {
  name: Scalars['String']
  description?: Maybe<Scalars['String']>
  key: Scalars['String']
  secret: Scalars['String']
  type: Scalars['String']
}

export interface UpdateHybridKeySecretInput {
  payload: UpdateHybridKeySecretPayload
  action: ActionInput
}

export interface UpdateHybridKeySecretPayload {
  name?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  uuid: Scalars['String']
}

export interface CancelLongjobInput {
  payload: Array<CancelLongjobPayload>
  action: ActionInput
}

export interface CancelLongjobPayload {
  uuid: Scalars['String']
}

export interface CreateLogServerInput {
  payload: CreateLogServerPayload
  action: ActionInput
}

export interface CreateLogServerPayload {
  name: Scalars['String']
  type: Scalars['String']
  configuration: Scalars['String']
  description?: Maybe<Scalars['String']>
  systemTags?: Maybe<Array<Scalars['String']>>
}

export interface DeleteLogServerInput {
  payload: Array<DeleteLogServerPayload>
  action: ActionInput
}

export interface DeleteLogServerPayload {
  configId: Scalars['String']
}

export interface UpdateLogServerInput {
  payload: UpdateLogServerPayload
  action: ActionInput
}

export interface UpdateLogServerPayload {
  configId: Scalars['String']
  name: Scalars['String']
  description?: Maybe<Scalars['String']>
}

export interface TestLogServerInput {
  payload: Array<TestLogServerPayload>
  action: ActionInput
}

export interface TestLogServerPayload {
  name: Scalars['String']
  type: Scalars['String']
  configuration: Scalars['String']
  systemTags: Array<Scalars['String']>
}

export interface CreateSNSEmailPlatformInput {
  payload: CreateSNSEmailPlatformPayload
  action: ActionInput
}

export interface CreateSNSEmailPlatformPayload {
  smtpPort: Scalars['Int']
  name: Scalars['String']
  smtpServer: Scalars['String']
  password?: Maybe<Scalars['String']>
  username?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  resourceUuid?: Maybe<Scalars['String']>
  encryptType?: Maybe<Scalars['String']>
  systemTags?: Maybe<Array<Scalars['String']>>
  configuration?: Maybe<Array<Scalars['String']>>
}

export interface DeleteSNSEmailPlatformInput {
  payload: Array<DeleteSNSEmailPlatformPayload>
  action: ActionInput
}

export interface DeleteSNSEmailPlatformPayload {
  uuid: Scalars['String']
}

export interface UpdateSNSEmailPlatformInput {
  payload: Array<UpdateSNSEmailPlatformPayload>
  action: ActionInput
}

export interface UpdateSNSEmailPlatformPayload {
  uuid: Scalars['String']
  name?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  systemTags?: Maybe<Array<Scalars['String']>>
  userTags?: Maybe<Array<Scalars['String']>>
  sessionId?: Maybe<Scalars['String']>
  accessKeyId?: Maybe<Scalars['String']>
  accessKeySecret?: Maybe<Scalars['String']>
  requestIp?: Maybe<Scalars['String']>
}

export interface ValidateSNSEmailPlatformInput {
  payload: Array<ValidateSNSEmailPlatformPayload>
  action: ActionInput
}

export interface ValidateSNSEmailPlatformPayload {
  uuid: Scalars['String']
  systemTags?: Maybe<Array<Scalars['String']>>
  userTags?: Maybe<Array<Scalars['String']>>
  sessionId?: Maybe<Scalars['String']>
  accessKeyId?: Maybe<Scalars['String']>
  accessKeySecret?: Maybe<Scalars['String']>
  requestIp?: Maybe<Scalars['String']>
}

export interface DisableEmailServerInput {
  payload: Array<DisableEmailServerPayload>
  action: ActionInput
}

export interface DisableEmailServerPayload {
  uuid: Scalars['String']
}

export interface EnableEmailServerInput {
  payload: Array<EnableEmailServerPayload>
  action: ActionInput
}

export interface EnableEmailServerPayload {
  uuid: Scalars['String']
}

export interface CreateIpBlackWhiteListInput {
  payload: Array<CreateIpBlackWhiteListPayload>
  action: ActionInput
}

export interface CreateIpBlackWhiteListPayload {
  name: Scalars['String']
  description?: Maybe<Scalars['String']>
  rule: Scalars['String']
  controlStrategy: Scalars['String']
}

export interface DeleteIpBlackWhiteListInput {
  payload: Array<DeleteIpBlackWhiteListPayload>
  action: ActionInput
}

export interface DeleteIpBlackWhiteListPayload {
  uuid: Scalars['String']
}

export interface UpdateIpBlackWhiteListInput {
  payload: Array<UpdateIpBlackWhiteListPayload>
  action: ActionInput
}

export interface UpdateIpBlackWhiteListPayload {
  uuid: Scalars['String']
  name?: Maybe<Scalars['String']>
  rule?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
}

export interface CreateBillingsPriceTableActionInput {
  payload: CreateBillingsPriceTableInput
  action: ActionInput
}

export interface CreateBillingsPriceTableInput {
  name: Scalars['String']
  description?: Maybe<Scalars['String']>
  billingsPrices?: Maybe<Array<CreateBillingsPriceInput>>
}

export interface CreateBillingsPriceInput {
  resourceName: BillingsPriceType
  resourceUnit?: Maybe<BillingsPriceUnitType>
  timeUnit?: Maybe<BillingsPriceTimeUnit>
  price?: Maybe<Scalars['String']>
  systemTags?: Maybe<Array<Scalars['String']>>
}

export interface UpdateBillingPriceActionInput {
  payload: UpdateBillingsPriceInput
  action: ActionInput
}

export interface UpdateBillingsPriceInput {
  updateBillingsPrices?: Maybe<Array<CreateBillingsPriceInput>>
  deleteUuids?: Maybe<Array<Scalars['String']>>
  tableUuid: Scalars['String']
}

export interface DeleteBillingsPriceActionInput {
  payload: Array<DeleteBillingsPriceInput>
  action: ActionInput
}

export interface DeleteBillingsPriceInput {
  uuid: Scalars['String']
  tableUuid: Scalars['String']
}

export interface DeleteBillingsPriceTableActionInput {
  payload: Array<DeleteBillingsPriceTableInput>
  action: ActionInput
}

export interface DeleteBillingsPriceTableInput {
  uuid: Scalars['String']
}

export interface UpdateBillingsPriceTableActionInput {
  payload: UpdateBillingsPriceTableInput
  action: ActionInput
}

export interface UpdateBillingsPriceTableInput {
  uuid: Scalars['String']
  name: Scalars['String']
  description?: Maybe<Scalars['String']>
}

export interface BindAccountToBillingsPriceTableActionInput {
  payload: Array<BindAccountToBillingsPriceTableInput>
  action: ActionInput
}

export interface BindAccountToBillingsPriceTableInput {
  uuid: Scalars['String']
  accountUuid: Scalars['String']
}

export interface CreateAccountInput {
  payload: Array<CreateAccountPayload>
  action: ActionInput
}

export interface CreateAccountPayload {
  name: Scalars['String']
  description?: Maybe<Scalars['String']>
  password: Scalars['String']
  type?: Maybe<Scalars['String']>
  tableUuid?: Maybe<Scalars['String']>
}

export interface DeleteAccountInput {
  payload: Array<DeleteAccountPayload>
  action: ActionInput
}

export interface DeleteAccountPayload {
  uuid: Scalars['String']
}

export interface UpdateAccountInput {
  payload: Array<UpdateAccountPayload>
  action: ActionInput
}

export interface UpdateAccountPayload {
  uuid: Scalars['String']
  name?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  password?: Maybe<Scalars['String']>
  oldPassword?: Maybe<Scalars['String']>
}

export interface AttachPriceTableToAccountInput {
  payload: Array<AttachPriceTableToAccountPayload>
  action: ActionInput
}

export interface AttachPriceTableToAccountPayload {
  accountUuid: Scalars['String']
  tableUuid: Scalars['String']
}

export interface DetachPriceTableFromAccountInput {
  payload: Array<DetachPriceTableFromAccountPayload>
  action: ActionInput
}

export interface DetachPriceTableFromAccountPayload {
  accountUuid: Scalars['String']
  tableUuid: Scalars['String']
}

export interface AttachRoleToAccountInput {
  payload: Array<AttachRoleToAccountPayload>
  action: ActionInput
}

export interface AttachRoleToAccountPayload {
  accountUuid: Scalars['String']
  roleUuid: Scalars['String']
}

export interface DetachRoleFromAccountInput {
  payload: Array<DetachRoleFromAccountPayload>
  action: ActionInput
}

export interface DetachRoleFromAccountPayload {
  accountUuid: Scalars['String']
  roleUuid: Scalars['String']
}

export interface UpdateAccountQuotaInput {
  payload: Array<UpdateAccountQuotaPayload>
  action: ActionInput
}

export interface UpdateAccountQuotaPayload {
  identityUuid: Scalars['String']
  name: Scalars['String']
  value: Scalars['Float']
}

export interface ChangeAccountBillingsPriceTableInput {
  payload: Array<ChangeAccountBillingsPriceTablePayload>
  action: ActionInput
}

export interface ChangeAccountBillingsPriceTablePayload {
  accountUuid: Scalars['String']
  tableUuid: Scalars['String']
}

export interface CreateApplicationCenterInput {
  payload: CreateApplicationCenterPayload
  action: ActionInput
}

export interface CreateApplicationCenterPayload {
  name?: Maybe<Scalars['String']>
  url?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  category?: Maybe<ApplicationCenterCategory>
  recommendApp?: Maybe<RecommendAppgory>
  visibleAccess?: Maybe<VisibleAccess>
  accountUuids?: Maybe<Array<Scalars['String']>>
  iam2ProjectUUids?: Maybe<Array<Scalars['String']>>
}

export interface DeleteApplicationCenterInput {
  payload: Array<DeleteApplicationCenterPayload>
  action: ActionInput
}

export interface DeleteApplicationCenterPayload {
  uuid: Scalars['String']
}

export interface UpdateApplicationCenterInput {
  payload: UpdateApplicationCenterPayload
  action: ActionInput
}

export interface UpdateApplicationCenterPayload {
  uuid?: Maybe<Scalars['String']>
  name?: Maybe<Scalars['String']>
  url?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  category?: Maybe<ApplicationCenterCategory>
  recommendApp?: Maybe<RecommendAppgory>
  visibleAccess?: Maybe<VisibleAccess>
  oldSharedAccountTagUuids?: Maybe<Array<Scalars['String']>>
  oldSharedIam2Projects?: Maybe<Array<OldSharedIam2ProjectInApplicationCenter>>
  accountUuids?: Maybe<Array<Scalars['String']>>
  iam2ProjectUUids?: Maybe<Array<Scalars['String']>>
}

export interface OldSharedIam2ProjectInApplicationCenter {
  uuid?: Maybe<Scalars['String']>
  attributeUuid?: Maybe<Scalars['String']>
}

export interface GenerateTokenInput {
  accountName: Scalars['String']
}

export interface DeleteResourceConfigInput {
  payload: DeleteResourceConfigPayload
  action: ActionInput
}

export interface DeleteResourceConfigPayload {
  name: Scalars['String']
  category: Scalars['String']
  resourceUuid: Scalars['String']
}

export interface UpdateResourceConfigInput {
  payload: UpdateResourceConfigPayload
  action: ActionInput
}

export interface UpdateResourceConfigPayload {
  uuid: Scalars['String']
  name: Scalars['String']
  category: Scalars['String']
  resourceUuid: Scalars['String']
  value: Scalars['String']
}

export interface UpdateGlobalConfigInput {
  payload: Array<UpdateGlobalConfigPayload>
  action: ActionInput
}

export interface UpdateGlobalConfigPayload {
  name: Scalars['String']
  category?: Maybe<Scalars['String']>
  value: Scalars['String']
}

export interface ResetGlobalConfigInput {
  payload: Array<ResetGlobalConfigPayload>
  action: ActionInput
}

export interface ResetGlobalConfigPayload {
  systemTags?: Maybe<Array<Scalars['String']>>
}

export interface ReloadLicenseInput {
  payload: ReloadLicensePlayload
  action: ActionInput
}

export interface ReloadLicensePlayload {
  reloadLicense?: Maybe<Scalars['Int']>
}

export interface DeleteLicenseInput {
  payload: Array<DeleteLicensePayload>
  action: ActionInput
}

export interface DeleteLicensePayload {
  managementNodeUuid: Scalars['String']
  module?: Maybe<Scalars['String']>
}

export interface UpdateLicenseInput {
  payload: Array<UpdateLicensePayload>
  action: ActionInput
}

export interface UpdateLicensePayload {
  managementNodeUuid: Scalars['String']
  license: Scalars['String']
}

export interface ApplyTemplateConfigInput {
  payload: Array<ApplyTemplateConfigPayload>
  action: ActionInput
}

export interface ApplyTemplateConfigPayload {
  templateUuid: Scalars['String']
}

export interface ResetTemplateConfigInput {
  payload: Array<ResetTemplateConfigPayload>
  action: ActionInput
}

export interface ResetTemplateConfigPayload {
  templateUuid: Scalars['String']
}

export interface UpdateTemplateConfigInput {
  payload: Array<UpdateTemplateConfigPayload>
  action: ActionInput
}

export interface UpdateTemplateConfigPayload {
  templateUuid: Scalars['String']
  category: Scalars['String']
  name: Scalars['String']
  value: Scalars['String']
}

export interface UpdateCustomColumnsInput {
  payload: UpdateCustomColumnsPayload
  action: ActionInput
}

export interface UpdateCustomColumnsPayload {
  path: Scalars['String']
  columnKeys: Array<Scalars['String']>
}

export interface UpdateThemeConfigInput {
  payload: UpdateThemeConfigPayload
  action: ActionInput
}

export interface UpdateThemeConfigPayload {
  themeConfig: Scalars['String']
}

export interface ResetThemeConfigInput {
  payload: ResetThemeConfigPayload
  action: ActionInput
}

export interface ResetThemeConfigPayload {
  themeConfig?: Maybe<Scalars['String']>
}

export interface CreatePortMirrorInput {
  payload: CreatePortMirrorPayload
  action: ActionInput
}

export interface CreatePortMirrorPayload {
  name: Scalars['String']
  description?: Maybe<Scalars['String']>
  mirrorNetworkUuid: Scalars['String']
  stateEvent?: Maybe<PortMirrorStateEvent>
}

export enum PortMirrorStateEvent {
  enable = 'enable',
  disable = 'disable'
}

export interface ChangePortMirrorStateInput {
  payload: Array<ChangePortMirrorStatePayload>
  action: ActionInput
}

export interface ChangePortMirrorStatePayload {
  uuid: Scalars['String']
  stateEvent: PortMirrorStateEvent
}

export interface UpdatePortMirrorInput {
  payload: Array<UpdatePortMirrorPayload>
  action: ActionInput
}

export interface UpdatePortMirrorPayload {
  uuid: Scalars['String']
  name?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
}

export interface DeletePortMirrorInput {
  payload: Array<DeletePortMirrorPayload>
  action: ActionInput
}

export interface DeletePortMirrorPayload {
  uuid: Scalars['String']
}

export interface CreatePortMirrorSessionInput {
  payload: CreatePortMirrorSessionPayload
  action: ActionInput
}

export interface CreatePortMirrorSessionPayload {
  portMirrorUuid: Scalars['String']
  name: Scalars['String']
  type: PortMirrorSessionType
  srcEndPoint: Scalars['String']
  dstEndPoint: Scalars['String']
  description?: Maybe<Scalars['String']>
}

export interface DeletePortMirrorSessionInput {
  payload: Array<DeletePortMirrorSessionPayload>
  action: ActionInput
}

export interface DeletePortMirrorSessionPayload {
  uuid: Scalars['String']
}

export interface DeleteVRouterOspfAreaInput {
  payload: Array<DeleteVRouterOspfAreaPayload>
  action: ActionInput
}

export interface DeleteVRouterOspfAreaPayload {
  uuid: Scalars['String']
}

export interface UpdateVRouterOspfAreaInput {
  payload: Array<UpdateVRouterOspfAreaPayload>
  action: ActionInput
}

export interface UpdateVRouterOspfAreaPayload {
  uuid: Scalars['String']
  /** OSPF区域的认证方式 */
  areaAuth?: Maybe<Scalars['String']>
  /** 区域类型 */
  areaType?: Maybe<Scalars['String']>
  /** 认证方式为plaintext时的密码 */
  password?: Maybe<Scalars['String']>
  /** 流量监控协议的版本 */
  keyId?: Maybe<Scalars['Int']>
  /** 系统标签 */
  systemTags?: Maybe<Array<Scalars['String']>>
  /** 用户标签 */
  userTags?: Maybe<Array<Scalars['String']>>
}

export interface AddVRouterNetworksToOspfAreaInput {
  payload: AddVRouterNetworksToOspfAreaPayload
  action: ActionInput
}

export interface AddVRouterNetworksToOspfAreaPayload {
  /** VPC路由器uuid */
  vRouterUuid: Scalars['String']
  /** 网络 uuids */
  l3NetworkUuids: Array<Scalars['String']>
  /** 路由区域的id，唯一标识 */
  routerAreaUuid?: Maybe<Scalars['String']>
}

export interface CreateVRouterOspfAreaInput {
  payload: CreateVRouterOspfAreaPayload
  action: ActionInput
}

export interface CreateVRouterOspfAreaPayload {
  /** 区域Id，区域标识 */
  areaId?: Maybe<Scalars['String']>
  /** 认证方式为plaintext时的密码 */
  password?: Maybe<Scalars['String']>
  /** 流量监控协议的版本 */
  keyId?: Maybe<Scalars['Int']>
  /** OSPF区域的认证方式 */
  areaAuth?: Maybe<Scalars['String']>
  /** 区域类型 */
  areaType?: Maybe<Scalars['String']>
  /** 路由配置 */
  routerConfig?: Maybe<Array<AddVRouterNetworksToOspfAreaPayload>>
  /** 标签UUID列表 */
  tagUuids?: Maybe<Array<Scalars['String']>>
  /** 系统标签 */
  systemTags?: Maybe<Array<Scalars['String']>>
  /** 用户标签 */
  userTags?: Maybe<Array<Scalars['String']>>
}

export interface SetVRouterRouterIdInput {
  payload: SetVRouterRouterIdPayload
  action: ActionInput
}

export interface SetVRouterRouterIdPayload {
  /** 路由器的UUID */
  vRouterUuid: Scalars['String']
  /** IP地址形式的ID */
  routerId: Scalars['String']
}

export interface RemoveVRouterNetworksFromOspfAreaInput {
  payload: Array<RemoveVRouterNetworksFromOspfAreaPayload>
  action: ActionInput
}

export interface RemoveVRouterNetworksFromOspfAreaPayload {
  /** 网络区域表中的uuid */
  uuid: Scalars['String']
}

export interface AddOrRemoveCidrIPsecConnectionActionInput {
  payload: RemoteCidrsToIPsec
  action: ActionInput
}

export interface RemoteCidrsToIPsec {
  uuid: Scalars['String']
  peerCidrs: Array<Scalars['String']>
}

export interface AttachOrDetachL3NetworkFromIPsecActionInput {
  payload: DetachL3NetworkFromIPsecInput
  action: ActionInput
}

export interface DetachL3NetworkFromIPsecInput {
  uuid: Scalars['String']
  l3NetworkUuids: Array<Scalars['String']>
}

export interface CreateIPsecActionActionInput {
  payload: CreateIpsecInput
  action: ActionInput
}

export interface CreateIpsecInput {
  name: Scalars['String']
  description?: Maybe<Scalars['String']>
  l3NetworkUuid?: Maybe<Scalars['String']>
  localNetworkUuids?: Maybe<Array<Scalars['String']>>
  peerAddress: Scalars['String']
  authKey?: Maybe<Scalars['String']>
  authMode?: Maybe<Scalars['String']>
  vipUuid?: Maybe<Scalars['String']>
  ikeAuthAlgorithm?: Maybe<Scalars['String']>
  ikeEncryptionAlgorithm?: Maybe<Scalars['String']>
  ikeDhGroup?: Maybe<Scalars['Int']>
  policyAuthAlgorithm?: Maybe<Scalars['String']>
  policyEncryptionAlgorithm?: Maybe<Scalars['String']>
  pfs?: Maybe<Scalars['String']>
  policyMode?: Maybe<Scalars['String']>
  transformProtocol?: Maybe<Scalars['String']>
  resourceUuid?: Maybe<Scalars['String']>
  peerCidrs?: Maybe<Array<Scalars['String']>>
  systemTags?: Maybe<Array<Scalars['String']>>
  createVipInput?: Maybe<CreateVipInputInIpsec>
}

export interface CreateVipInputInIpsec {
  name?: Maybe<Scalars['String']>
  l3NetworkUuid?: Maybe<Scalars['String']>
  ipRangeUuid?: Maybe<Scalars['String']>
  requiredIp?: Maybe<Scalars['String']>
}

export interface DeleteIPsecConnectionActionInput {
  payload: Array<DeleteIPsecConnectionInput>
  action: ActionInput
}

export interface DeleteIPsecConnectionInput {
  uuid: Scalars['String']
}

export interface UpdateIPsecConnectionActionInput {
  payload: UpdateIPsecConnectionInput
  action: ActionInput
}

export interface UpdateIPsecConnectionInput {
  name?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  uuid: Scalars['String']
}

export interface AttachEipToVmActionInput {
  payload: Array<AttachEipToVmInput>
  action: ActionInput
}

export interface AttachEipToVmInput {
  eipUuid: Scalars['String']
  vmNicUuid: Scalars['String']
  usedIpUuid: Scalars['String']
}

export interface CreateEipActionInput {
  payload: CreateEipInput
  action: ActionInput
}

export interface CreateEipInput {
  name: Scalars['String']
  description?: Maybe<Scalars['String']>
  vipUuid?: Maybe<Scalars['String']>
  requiredIp?: Maybe<Scalars['String']>
  ipRangeUuid?: Maybe<Scalars['String']>
  l3NetworkUuid?: Maybe<Scalars['String']>
}

export interface DeleteEipActionInput {
  payload: Array<DeleteEipInput>
  action: ActionInput
}

export interface DeleteEipInput {
  uuid: Scalars['String']
  vipUuid?: Maybe<Scalars['String']>
}

export interface DetachEipToVmActionInput {
  payload: Array<DetachEipToVmInput>
  action: ActionInput
}

export interface DetachEipToVmInput {
  uuid: Scalars['String']
}

export interface UpdateEipActionInput {
  payload: UpdateEipInput
  action: ActionInput
}

export interface UpdateEipInput {
  uuid: Scalars['String']
  name?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
}

export interface DeleteLoadBalancerInput {
  payload: Array<DeleteLoadBalancerPayload>
  action: ActionInput
}

export interface DeleteLoadBalancerPayload {
  uuid: Scalars['String']
  /** 区分负载均衡器类型, SLB | Shared */
  type?: Maybe<Scalars['String']>
}

export interface CreateLoadBalancerInput {
  payload: CreateLoadBalancerPayload
  action: ActionInput
}

export interface CreateLoadBalancerPayload {
  name: Scalars['String']
  loadBalancerType: Scalars['String']
  vipMethod: Scalars['String']
  nodeOfferingType?: Maybe<Scalars['String']>
  backendNetworkUuid?: Maybe<Scalars['String']>
  zoneUuid?: Maybe<Scalars['String']>
  vipUuid?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  requiredIp?: Maybe<Scalars['String']>
  ipRangeUuid?: Maybe<Scalars['String']>
  l3NetworkUuid?: Maybe<Scalars['String']>
  nodeName?: Maybe<Scalars['String']>
  managementNetworkUuid?: Maybe<Scalars['String']>
  cpu?: Maybe<Scalars['Int']>
  memory?: Maybe<Scalars['Float']>
  slbOfferingUuid?: Maybe<Scalars['String']>
  imageUuid?: Maybe<Scalars['String']>
}

export interface UpdateLoadBalancerInput {
  payload: Array<UpdateLoadBalancerPayload>
  action: ActionInput
}

export interface UpdateLoadBalancerPayload {
  uuid: Scalars['String']
  name?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
}

export interface ChangeSlbOfferingStateInput {
  payload: Array<ChangeSlbOfferingStatePayload>
  action: ActionInput
}

export interface ChangeSlbOfferingStatePayload {
  uuid: Scalars['String']
  stateEvent: Scalars['String']
}

export interface CreateSlbOfferingInput {
  payload: Array<CreateSlbOfferingPayload>
  action: ActionInput
}

export interface CreateSlbOfferingPayload {
  name: Scalars['String']
  description?: Maybe<Scalars['String']>
  managementNetworkUuid: Scalars['String']
  imageUuid: Scalars['String']
  cpuNum: Scalars['Float']
  memorySize: Scalars['Float']
  allocatorStrategy?: Maybe<Scalars['String']>
  sortKey?: Maybe<Scalars['Float']>
  type?: Maybe<Scalars['String']>
  resourceUuid?: Maybe<Scalars['String']>
  zoneUuid: Scalars['String']
}

export interface UpdateSlbOfferingInput {
  payload: UpdateSlbOfferingPayload
  action: ActionInput
}

export interface UpdateSlbOfferingPayload {
  uuid: Scalars['String']
  name?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
}

export interface AddBackendServerToServerGroupInput {
  payload: AddBackendServerToServerGroupPayload
  action: ActionInput
}

export interface AddBackendServerToServerGroupPayload {
  serverGroupUuid: Scalars['String']
  vmNics?: Maybe<Array<VmNicsWeightRef>>
  servers?: Maybe<Array<ServerWeightRef>>
}

export interface VmNicsWeightRef {
  uuid: Scalars['String']
  weight?: Maybe<Scalars['String']>
}

export interface ServerWeightRef {
  ipAddress: Scalars['String']
  weight?: Maybe<Scalars['String']>
}

export interface AddServerGroupToLoadBalancerListenerInput {
  payload: Array<AddServerGroupToLoadBalancerListenerPayload>
  action: ActionInput
}

export interface AddServerGroupToLoadBalancerListenerPayload {
  serverGroupUuid: Scalars['String']
  listenerUuid: Scalars['String']
}

export interface CreateServerGroupInput {
  payload: CreateServerGroupPayload
  action: ActionInput
}

export interface CreateServerGroupPayload {
  name: Scalars['String']
  loadBalancerUuid: Scalars['String']
  description?: Maybe<Scalars['String']>
  vmNics?: Maybe<Array<VmNicsWeightRef>>
  servers?: Maybe<Array<ServerWeightRef>>
  listenerUuids?: Maybe<Array<Scalars['String']>>
}

export interface DeleteServerGroupInput {
  payload: Array<DeleteServerGroupPayload>
  action: ActionInput
}

export interface DeleteServerGroupPayload {
  uuid: Scalars['String']
}

export interface RemoveBackendServerFromServerGroupInput {
  payload: RemoveBackendServerFromServerGroupPayload
  action: ActionInput
}

export interface RemoveBackendServerFromServerGroupPayload {
  serverGroupUuid: Scalars['String']
  vmNicUuids: Array<Scalars['String']>
  serverIps: Array<Scalars['String']>
}

export interface RemoveServerGroupFromLoadBalancerListenerInput {
  payload: Array<RemoveServerGroupFromLoadBalancerListenerPayload>
  action: ActionInput
}

export interface RemoveServerGroupFromLoadBalancerListenerPayload {
  serverGroupUuid: Scalars['String']
  listenerUuid: Scalars['String']
}

export interface SetWeightInput {
  payload: SetWeightPayload
  action: ActionInput
}

export interface SetWeightPayload {
  serverGroupUuid: Scalars['String']
  vmNics?: Maybe<Array<VmNicsWeightRef>>
  servers?: Maybe<Array<ServerWeightRef>>
}

export interface UpdateServerGroupInput {
  payload: Array<UpdateServerGroupPayload>
  action: ActionInput
}

export interface UpdateServerGroupPayload {
  uuid: Scalars['String']
  name?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  weight?: Maybe<Scalars['Float']>
}

export interface DeleteListenerInput {
  payload: Array<DeleteListenerPayload>
  action: ActionInput
}

export interface DeleteListenerPayload {
  uuid: Scalars['String']
}

export interface UpdateListenerInput {
  payload: Array<UpdateListenerPayload>
  action: ActionInput
}

export interface UpdateListenerPayload {
  uuid: Scalars['String']
  name?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
}

export interface ChangeListenerInput {
  payload: Array<ChangeListenerPayload>
  action: ActionInput
}

export interface ChangeListenerPayload {
  uuid: Scalars['String']
  balancerAlgorithm?: Maybe<Scalars['String']>
  connectionIdleTimeout?: Maybe<Scalars['Float']>
  healthyThreshold?: Maybe<Scalars['Float']>
  unhealthyThreshold?: Maybe<Scalars['Float']>
  healthCheckInterval?: Maybe<Scalars['Float']>
  maxConnection?: Maybe<Scalars['Float']>
  healthCheckTarget?: Maybe<Scalars['String']>
  healthCheckProtocol?: Maybe<Scalars['String']>
  healthCheckMethod?: Maybe<Scalars['String']>
  healthCheckURI?: Maybe<Scalars['String']>
  healthCheckHttpCode?: Maybe<Scalars['String']>
}

export interface AddCertificateToListenerInput {
  payload: Array<AddCertificateToListenerPayload>
  action: ActionInput
}

export interface AddCertificateToListenerPayload {
  certificateUuid: Scalars['String']
  listenerUuid: Scalars['String']
}

export interface RemoveCertificateFromListenerInput {
  payload: Array<RemoveCertificateFromListenerPayload>
  action: ActionInput
}

export interface RemoveCertificateFromListenerPayload {
  certificateUuid: Scalars['String']
  listenerUuid: Scalars['String']
}

export interface CreateFirewallIpSetTemplateInput {
  payload: CreateFirewallIpSetTemplatePayload
  action: ActionInput
}

export interface CreateFirewallIpSetTemplatePayload {
  name: Scalars['String']
  type: Scalars['String']
  sourceValue?: Maybe<Scalars['String']>
  destValue?: Maybe<Scalars['String']>
  systemTags?: Maybe<Array<Scalars['String']>>
  userTags?: Maybe<Array<Scalars['String']>>
}

export interface DeleteFirewallIpSetTemplateInput {
  payload: Array<DeleteFirewallIpSetTemplatePayload>
  action: ActionInput
}

export interface DeleteFirewallIpSetTemplatePayload {
  uuid: Scalars['String']
}

export interface UpdateFirewallIpSetTemplateInput {
  payload: UpdateFirewallIpSetTemplatePayload
  action: ActionInput
}

export interface UpdateFirewallIpSetTemplatePayload {
  name: Scalars['String']
  type: Scalars['String']
  sourceValue?: Maybe<Scalars['String']>
  destValue?: Maybe<Scalars['String']>
  systemTags?: Maybe<Array<Scalars['String']>>
  userTags?: Maybe<Array<Scalars['String']>>
  uuid: Scalars['String']
}

export interface ApplyRuleSetChangesInput {
  payload: Array<ApplyRuleSetChangesPayload>
  action: ActionInput
}

export interface ApplyRuleSetChangesPayload {
  /** 规则集uuid */
  uuid: Scalars['String']
}

export interface CreateFirewallRuleSetInput {
  payload: Array<CreateFirewallRuleSetPayload>
  action: ActionInput
}

export interface CreateFirewallRuleSetPayload {
  name: Scalars['String']
  actionType?: Maybe<ActionType>
  description?: Maybe<Scalars['String']>
}

export interface DeleteFirewallRuleSetInput {
  payload: Array<DeleteFirewallRuleSetPayload>
  action: ActionInput
}

export interface DeleteFirewallRuleSetPayload {
  uuid: Scalars['String']
}

export interface UpdateFirewallRuleSetInput {
  payload: Array<UpdateFirewallRuleSetPayload>
  action: ActionInput
}

export interface UpdateFirewallRuleSetPayload {
  uuid: Scalars['String']
  name?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  actionType?: Maybe<ActionType>
}

export interface CreateFirewallRuleInput {
  payload: Array<CreateFirewallRulePayload>
  action: ActionInput
}

export interface CreateFirewallRulePayload {
  ruleSetUuid: Scalars['String']
  /** 行为类型 */
  action: ActionType
  /** 规则优先级 */
  ruleNumber: Scalars['Int']
  state: FirewallRuleState
  /** 协议 */
  protocol?: Maybe<Scalars['String']>
  /** 源端口 */
  sourcePort?: Maybe<Scalars['String']>
  /** 目标端口 */
  destPort?: Maybe<Scalars['String']>
  /** 源Ip */
  sourceIp?: Maybe<Scalars['String']>
  /** 目标Ip */
  destIp?: Maybe<Scalars['String']>
  /** 报文状态 */
  allowStates?: Maybe<Scalars['String']>
  tcpFlag?: Maybe<Scalars['String']>
  icmpTypeName?: Maybe<Scalars['String']>
  /** 是否开启日志 */
  enableLog?: Maybe<Scalars['Boolean']>
  description?: Maybe<Scalars['String']>
}

export interface DeleteFirewallRuleInput {
  payload: Array<DeleteFirewallRulePayload>
  action: ActionInput
}

export interface DeleteFirewallRulePayload {
  uuid: Scalars['String']
}

export interface UpdateFirewallRuleInput {
  payload: Array<UpdateFirewallRulePayload>
  action: ActionInput
}

export interface UpdateFirewallRulePayload {
  uuid: Scalars['String']
  ruleSetUuid: Scalars['String']
  /** 行为类型 */
  action: ActionType
  /** 规则优先级 */
  ruleNumber: Scalars['Int']
  state: FirewallRuleState
  /** 协议 */
  protocol?: Maybe<Scalars['String']>
  /** 源端口 */
  sourcePort?: Maybe<Scalars['String']>
  /** 目标端口 */
  destPort?: Maybe<Scalars['String']>
  /** 源Ip */
  sourceIp?: Maybe<Scalars['String']>
  /** 目标Ip */
  destIp?: Maybe<Scalars['String']>
  /** 报文状态 */
  allowStates?: Maybe<Scalars['String']>
  tcpFlag?: Maybe<Scalars['String']>
  icmpTypeName?: Maybe<Scalars['String']>
  /** 是否开启日志 */
  enableLog?: Maybe<Scalars['Boolean']>
  description?: Maybe<Scalars['String']>
}

export interface ChangeFirewallRuleStateInput {
  payload: Array<ChangeFirewallRuleStatePayload>
  action: ActionInput
}

export interface ChangeFirewallRuleStatePayload {
  uuid: Scalars['String']
  state: FirewallRuleState
}

export interface CheckRuleNumberParam {
  vpcFirewallUuid: Scalars['String']
  l3NetworkUuid?: Maybe<Scalars['String']>
  packetsForwardType: PacketsForwardType
  ruleSetUuids: Array<Scalars['String']>
}

export interface CreateFirewallRuleTemplateInput {
  payload: CreateFirewallRuleTemplatePayload
  action: ActionInput
}

export interface CreateFirewallRuleTemplatePayload {
  name: Scalars['String']
  action: Scalars['String']
  protocol?: Maybe<Scalars['String']>
  destPort?: Maybe<Scalars['String']>
  sourcePort?: Maybe<Scalars['String']>
  sourceIp?: Maybe<Scalars['String']>
  destIp?: Maybe<Scalars['String']>
  allowStates?: Maybe<Scalars['String']>
  tcpFlag?: Maybe<Scalars['String']>
  icmpTypeName?: Maybe<Scalars['String']>
  enableLog?: Maybe<Scalars['Boolean']>
  state?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  ruleNumber?: Maybe<Scalars['Int']>
  systemTags?: Maybe<Array<Scalars['String']>>
  userTags?: Maybe<Array<Scalars['String']>>
}

export interface DeleteFirewallRuleTemplateInput {
  payload: Array<DeleteFirewallRuleTemplatePayload>
  action: ActionInput
}

export interface DeleteFirewallRuleTemplatePayload {
  uuid: Scalars['String']
}

export interface UpdateFirewallRuleTemplateInput {
  payload: UpdateFirewallRuleTemplatePayload
  action: ActionInput
}

export interface UpdateFirewallRuleTemplatePayload {
  name: Scalars['String']
  action: Scalars['String']
  protocol?: Maybe<Scalars['String']>
  destPort?: Maybe<Scalars['String']>
  sourcePort?: Maybe<Scalars['String']>
  sourceIp?: Maybe<Scalars['String']>
  destIp?: Maybe<Scalars['String']>
  allowStates?: Maybe<Scalars['String']>
  tcpFlag?: Maybe<Scalars['String']>
  icmpTypeName?: Maybe<Scalars['String']>
  enableLog?: Maybe<Scalars['Boolean']>
  state?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  ruleNumber?: Maybe<Scalars['Int']>
  systemTags?: Maybe<Array<Scalars['String']>>
  userTags?: Maybe<Array<Scalars['String']>>
  uuid: Scalars['String']
}

export interface AttachFirewallRuleSetToL3Input {
  payload: Array<AttachFirewallRuleSetToL3Payload>
  action: ActionInput
}

export interface AttachFirewallRuleSetToL3Payload {
  /** vpc防火墙uuid */
  vpcFirewallUuid: Scalars['String']
  l3Uuid: Scalars['String']
  ruleSetUuid: Scalars['String']
  /** 网络方向 */
  forward: PacketsForwardType
}

export interface DetachFirewallRuleSetFromL3Input {
  payload: Array<DetachFirewallRuleSetFromL3Payload>
  action: ActionInput
}

export interface DetachFirewallRuleSetFromL3Payload {
  /** vpc防火墙uuid */
  vpcFirewallUuid: Scalars['String']
  l3Uuid: Scalars['String']
  ruleSetUuid: Scalars['String']
  /** 网络方向 */
  forward: PacketsForwardType
}

export interface CreateVpcFirewallInput {
  payload: CreateVpcFirewallPayload
  action: ActionInput
}

export interface CreateVpcFirewallPayload {
  name: Scalars['String']
  vpcUuid: Scalars['String']
  description?: Maybe<Scalars['String']>
  systemTags?: Maybe<Array<Scalars['String']>>
  userTags?: Maybe<Array<Scalars['String']>>
}

export interface DeleteFirewallInput {
  payload: Array<DeleteFirewallPayload>
  action: ActionInput
}

export interface DeleteFirewallPayload {
  uuid: Scalars['String']
}

export interface UpdateVpcFirewallInput {
  payload: Array<UpdateVpcFirewallPayload>
  action: ActionInput
}

export interface UpdateVpcFirewallPayload {
  uuid: Scalars['String']
  name?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
}

export interface RemoveSdnControllerListInput {
  payload: Array<RemoveSdnControllerPayload>
  action: ActionInput
}

export interface RemoveSdnControllerPayload {
  uuid: Scalars['String']
}

export interface UpdateSdnControllerInput {
  payload: UpdateSdnControllerPayload
  action: ActionInput
}

export interface UpdateSdnControllerPayload {
  uuid: Scalars['String']
  name?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
}

export interface AddSdnControllerInput {
  payload: AddSdnControllerPayload
  action: ActionInput
}

export interface AddSdnControllerPayload {
  name: Scalars['String']
  description?: Maybe<Scalars['String']>
  vendorType: Scalars['String']
  ip: Scalars['String']
  userName: Scalars['String']
  password: Scalars['String']
  resourceUuid: Scalars['String']
  systemTags?: Maybe<Array<Scalars['String']>>
}

export interface AttachOrDetachVRouterRouteTableToVRouterActionInput {
  payload: Array<AttachOrDetachVRouterRouteTableToVRouterInput>
  action: ActionInput
}

export interface AttachOrDetachVRouterRouteTableToVRouterInput {
  routeTableUuid: Scalars['ID']
  virtualRouterVmUuid: Scalars['ID']
}

export interface CreateVRouterRouteTableActionInput {
  payload: CreateVRouterRouteTableInput
  action: ActionInput
}

export interface CreateVRouterRouteTableInput {
  name?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  virtualRouterVmUuids?: Maybe<Array<Scalars['String']>>
}

export interface CreateVRouterRouteEntryActionInput {
  payload: CreateVRouterRouteEntryInput
  action: ActionInput
}

export interface CreateVRouterRouteEntryInput {
  routeTableUuid: Scalars['ID']
  type: VRouterRouteEntryType
  target?: Maybe<Scalars['String']>
  destination: Scalars['String']
  distance: Scalars['Int']
}

export interface DeleteVRouterRouteTableActionInput {
  payload: Array<DeleteVRouterRouteTableInput>
  action: ActionInput
}

export interface DeleteVRouterRouteTableInput {
  uuid: Scalars['String']
}

export interface UpdateVRouterRouteTableActionInput {
  payload: UpdateVRouterRouteTableInput
  action: ActionInput
}

export interface UpdateVRouterRouteTableInput {
  name?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  uuid: Scalars['String']
}

export interface DeleteVRouterRouteEntryActionInput {
  payload: Array<DeleteVRouterRouteEntryInput>
  action: ActionInput
}

export interface DeleteVRouterRouteEntryInput {
  routeTableUuid: Scalars['ID']
  uuid: Scalars['ID']
}

export interface CreateVxlanPoolInput {
  payload: CreateVxlanPoolPayload
  action: ActionInput
}

export interface CreateVxlanPoolPayload {
  name: Scalars['String']
  description?: Maybe<Scalars['String']>
  type?: Maybe<Scalars['String']>
  cidr?: Maybe<Scalars['String']>
  zoneUuid?: Maybe<Scalars['String']>
  physicalInterface?: Maybe<Scalars['String']>
  clusterUuid?: Maybe<Scalars['String']>
  vlan?: Maybe<Scalars['String']>
  vni?: Maybe<Scalars['Int']>
  poolUuid?: Maybe<Scalars['String']>
  resourceUuid?: Maybe<Scalars['String']>
  userTags?: Maybe<Array<Scalars['String']>>
  systemTags?: Maybe<Array<Scalars['String']>>
  startVni?: Maybe<Scalars['Int']>
  endVni?: Maybe<Scalars['Int']>
  l2NetworkUuid?: Maybe<Scalars['String']>
}

export interface CreateVniRangeInput {
  payload: CreateVniRangePayload
  action: ActionInput
}

export interface CreateVniRangePayload {
  name: Scalars['String']
  startVni?: Maybe<Scalars['Int']>
  endVni?: Maybe<Scalars['Int']>
  l2NetworkUuid?: Maybe<Scalars['String']>
}

export interface DeleteVniRangeInput {
  payload: Array<DeleteVniRangePayload>
  action: ActionInput
}

export interface DeleteVniRangePayload {
  uuid: Scalars['String']
}

export interface UpdateVniRangeInput {
  payload: UpdateVniRangePayload
  action: ActionInput
}

export interface UpdateVniRangePayload {
  name: Scalars['String']
  uuid: Scalars['String']
}

export interface UpdateHomepageLayoutConfigInput {
  payload: UpdateHomepageLayoutConfigPayload
  action: ActionInput
}

export interface UpdateHomepageLayoutConfigPayload {
  layoutConfig: Scalars['String']
}

export interface UpdateWelcomeConfigInput {
  welcomeConfig: Scalars['String']
}

export interface Subscription {
  listenActionResp: ActionTaskResult
  listenZWatch: ZWatchEvent
  listenTicket: ZWatchEvent
}

export interface SubscriptionlistenActionRespArgs {
  sessionId: Scalars['String']
}

export interface SubscriptionlistenZWatchArgs {
  sessionId: Scalars['String']
}

export interface SubscriptionlistenTicketArgs {
  sessionId: Scalars['String']
}
