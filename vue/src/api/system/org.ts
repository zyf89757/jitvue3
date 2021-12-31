import { defHttp } from '/@/utils/http/axios';

/**
 * 返回组织列表
 * @returns 返回组织列表
 */
export const appListOrgApi = () =>
  defHttp.get(
    {
      url: '/api/org/manager/current/orgs',
    },
    { isTransformResponse: false }
  );
