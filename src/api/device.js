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

export function startMaintainDevice(query) {
  return request({
    url: '/device/maintain/startMaintainDevice',
    method: 'get',
    params: query
  })
}

export function startMaintainDevice1(query) {
  return request({
    url: '/device/maintain/startMaintainDevice1',
    method: 'get',
    params: query
  })
}

export function stopMaintainDevice(query) {
  return request({
    url: '/device/maintain/stopMaintainDevice',
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

export function scrapDevice(query){
  return request({
    url: '/device/scrap/scrapDevice',
    method: 'get',
    params: query
  })
}

export function stopScrapDevice(query){
  return request({
    url: '/device/scrap/stopScrapDevice',
    method: 'get',
    params: query
  })
}

export function lendDevice(query){
  return request({
    url: '/device/lend/lend',
    method: 'get',
    params: query
  })
}

export function returnDevice(query){
  return request({
    url: '/device/lend/returnDevice',
    method: 'get',
    params: query
  })
}

export function reverseDevice(query){
  return request({
    url: 'device/reserve/startReverse',
    method: 'get',
    params: query
  })
}

export function reverseDevice1(query){
  return request({
    url: 'device/reserve/startReverse1',
    method: 'get',
    params: query
  })
}

export function stopReverseDevice(query){
  return request({
    url: 'device/reserve/stopReverse',
    method: 'get',
    params: query
  })
}



