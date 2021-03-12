import request from '@/utils/request'

export function getDeviceList() {
  return request({
    url: '/vue-element-admin/device/list',
    method: 'get'
  })
}

export function getDeviceMaintainList(query) {
  return request({
    url: '/vue-element-admin/device/maintainList',
    method: 'get',
    params: query
  })
}

export function getDeviceScrapList(query) {
  return request({
    url: '/vue-element-admin/device/scrapList',
    method: 'get',
    params: query
  })
}
