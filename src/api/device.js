import request from '@/utils/request'

export function getDeviceList() {
  return request({
    url: '/device/list',
    method: 'get'
  })
}

export function addDevice(data) {
  return request({
    url: '/device/add',
    method: 'post',
    data
  })
}

export function getDeviceMaintainList(query) {
  return request({
    url: '/device/maintainList',
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

export function getDeviceLendList(query) {
  return request({
    url: '/vue-element-admin/device/lendList',
    method: 'get',
    params: query
  })
}

export function getDeviceReverseList(query) {
  return request({
    url: '/vue-element-admin/device/reverseList',
    method: 'get',
    params: query
  })
}