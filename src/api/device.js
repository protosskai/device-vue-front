import request from '@/utils/request'

export function getDeviceList() {
  return request({
    url: '/vue-element-admin/device/list',
    method: 'get'
  })
}
