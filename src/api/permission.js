import request from '@/utils/request'

export function getPermissionList(query) {
  return request({
    url: '/permission/list',
    method: 'get',
    params: query
  })
}