import request from '@/utils/request'

export function getLabList(query) {
  return request({
    url: '/lab/info/list',
    method: 'get',
    params: query
  })
}

export function queryCurrentUser(query) {
  return request({
    url: '/user/location/query',
    method: 'get',
    params: query
  })
}