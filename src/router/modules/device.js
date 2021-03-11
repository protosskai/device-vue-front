import Layout from '@/layout'

const deviceRoute = {
  path: '/deviceManage',
  component: Layout,
  name: 'DeviceManage',
  alwaysShow: true, // will always show the root menu
  meta: {
    title: '设备管理',
    icon: 'el-icon-suitcase',
    roles: ['admin', 'editor'] // you can set roles in root nav
  },
  children: [
    {
      path: '/listDevice',
      component: () => import('@/views/device/listDevice'),
      name: 'ListDevice',
      meta: {
        title: '设备列表',
        icon: 'list',
        roles: ['admin', 'editor'] // you can set roles in root nav
      }
    },
    {
      path: '/addDevice',
      component: () => import('@/views/device/addDevice'),
      name: 'AddDevice',
      meta: {
        title: '新增设备',
        icon: 'el-icon-plus',
        roles: ['admin', 'editor'] // you can set roles in root nav
      }
    },
    {
      path: '/maintainDevice',
      component: () => import('@/views/device/maintainDevice'),
      name: 'MaintainDevice',
      meta: {
        title: '维护设备',
        icon: 'el-icon-refresh',
        roles: ['admin', 'editor'] // you can set roles in root nav
      }
    },
    {
      path: '/scrapDevice',
      component: () => import('@/views/module-manage/index'),
      name: 'ScrapDevice',
      meta: {
        title: '报废管理',
        icon: 'el-icon-error',
        roles: ['admin', 'editor'] // you can set roles in root nav
      }
    },
    {
      path: '/lendDevice',
      component: () => import('@/views/module-manage/index'),
      name: 'LendDevice',
      meta: {
        title: '借出管理',
        icon: 'el-icon-sell',
        roles: ['admin', 'editor'] // you can set roles in root nav
      }
    },
    {
      path: '/reserveDevice',
      component: () => import('@/views/module-manage/index'),
      name: 'ReserveDevice',
      meta: {
        title: '预约管理',
        icon: 'el-icon-time',
        roles: ['admin', 'editor'] // you can set roles in root nav
      }
    }
  ]
}

export default deviceRoute
