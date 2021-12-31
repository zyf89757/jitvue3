import { defHttp } from '/@/utils/http/axios';

enum Api {
  GetEmployeeTree = '/api/employee/get-tree',
  GetBindEmployeeTree = '/api/employee/get-deptbindemployee?key=',
  BindTree = '/api/employee/bindgroup',
  RemoveEmployee = '/api/employee/removegroup'
}

// 获取所有员工Tree
export const getEmployeeTree = () => {
  return defHttp.get({ url: Api.GetEmployeeTree });
};

// 获取小组下员工Tree
export const getBindEmployeeTree = (groupId) => {
  return defHttp.get({ url: Api.GetBindEmployeeTree + groupId });
};

//小组绑定员工
export const BindEmployee = (data) => {
  return defHttp.post({ url: Api.BindTree, params: data }, { isToastMsg: true });
};

//小组删除员工
export const RemoveEmployee = (data) => {
  return defHttp.post({ url: Api.RemoveEmployee, params: data }, { isToastMsg: true });
};
