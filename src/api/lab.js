import request from '@/utils/request'

export function getLabList() {
  return request({
    url: '/vue-element-admin/lab/labList',
    method: 'get'
  })
}