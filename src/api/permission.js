import request from '@/utils/request'

export function getPermissionList() {
  return request({
    url: '/vue-element-admin/permission/permissionList',
    method: 'get'
  })
}