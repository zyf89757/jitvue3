import { ErrorTypeEnum } from '/@/enums/exceptionEnum';
import { MenuModeEnum, MenuTypeEnum } from '/@/enums/menuEnum';
import { RoleInfo } from '/@/api/sys/model/userModel';

// Lock screen information
export interface LockInfo {
  // Password required
  pwd?: string | undefined;
  // Is it locked?
  isLock?: boolean;
}

// Error-log information
export interface ErrorLogInfo {
  // Type of error
  type: ErrorTypeEnum;
  // Error file
  file: string;
  // Error name
  name?: string;
  // Error message
  message: string;
  // Error stack
  stack?: string;
  // Error detail
  detail: string;
  // Error url
  url: string;
  // Error time
  time?: string;
}

export interface UserInfo {
  // 用户Id
  userId: string | number;
  // 用户姓名
  userName: string;
  // realName: string;
  avatar: string;
  desc?: string;
  homePath?: string;
  roles?: RoleInfo[];
  roleIds?: Array;
  // 是否超级管理员
  superAdmin: bool;
  // 应用程序编号
  applicationId?: striing;
  // 应用程序编码
  applicationCode?: striing;
  // 应用程序名称
  applicationName?: striing;
  // 允许访问的应用
  allowApplications?: Array;
  // 租户编号
  tenantId: string;
  // 租户A编号
  tenantAid?: string;
  // 租户编码
  tenantCode?: string;
  // 租户数据库链接字符串
  tenantConnectionString?: string;
  // 租户名称
  tenantName: string;
  // 组织编号
  organizationId: string;
  // 组织A编号
  organizationAid?: string;
  // 组织名称
  organizationName?: string;
  // 企业编码
  organizationCode?: string;
  // 组织类型
  organizationType: number;
  // 组织类型Code
  organizationTypeCode?: string;
  // 允许访问的租户数据
  allowTenants?: [];
  // 允许访问的组织数据
  allowOrganizations?: [];
  authToken: string;
  departments: [];
  departmentDatas: [];
  employeeId?: any;
  employeeName?: any;
  employeeCode?: any;
  //菜单
  menus?: any;
  // 当前任务编号
  taskId?: any;
  // 当前任务名称
  taskName?: any;
  // 允许访问的任务
  allowTasks?: [];
  // 当前部门编号
  deptId?: any;
  // 当前部门名称w
  deptName?: any;
  // 小组编号
  groupId?: any;
  // 小组名称
  groupName?: any;
  // 允许访问的小组
  allowGroups?: [];
  // 所属货主编号
  ownerId?: any;
  // 所属货主名称
  ownerName?: any;
  // 当前项目编码
  projectId?: any;
  // 当前项目名称
  projectName?: any;
  // 允许访问的项目编码
  allowProjects?: [];
  // 允许访问的货主
  allowOwners?: [];
  // 允许访问部门编码
  allowDepts?: [];
  // 浏览器
  browser?: string;
  // 检验检疫编码
  ciqCode?: any;
  // 配置
  configs?: any;
  // 海关十位编码
  customsCode?: any;
  // 主机名
  host?: any;
  // 登录时间
  inDate?: any;
  //IP
  ip?: string;
  //是否是正式用户
  isFormal?: number | string;
  //多语言
  language?: any;
  // logo
  logo?: string;
  //菜单样式
  menuStyle?: any;
  // 所属海关十位编码
  ownerCustomsCode?: any;
  // 皮肤
  skin?: any;
  // 数据库名
  tenantDbName?: any;
  businessType?: any;
  isProvider?: any;
}

export interface BeforeMiniState {
  menuCollapsed?: boolean;
  menuSplit?: boolean;
  menuMode?: MenuModeEnum;
  menuType?: MenuTypeEnum;
}
