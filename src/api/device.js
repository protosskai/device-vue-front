import request from '@/utils/request'

export function getDeviceList() {
  return request({
    url: '/device/info/list',
    method: 'get'
  })
}

export function addDevice(data) {
  return request({
    url: '/device/info/add',
    method: 'post',
    data
  })
}

export function getDeviceMaintainList(query) {
  return request({
    url: '/device/maintain/list',
    method: 'get',
    params: query
  })
}

export function getDeviceScrapList(query) {
  return request({
    url: '/device/scrap/list',
    method: 'get',
    params: query
  })
}

export function getDeviceLendList(query) {
  return request({
    url: '/device/lend/list',
    method: 'get',
    params: query
  })
}

export function getDeviceReverseList(query) {
  return request({
    url: '/device/reserve/list',
    method: 'get',
    params: query
  })
}