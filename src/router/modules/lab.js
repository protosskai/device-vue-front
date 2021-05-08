import Layout from '@/layout'

const labRoute = {
  path: '/labManage',
  component: Layout,
  name: 'LabManage',
  alwaysShow: true, // will always show the root menu
  meta: {
    title: '实验室管理',
    icon: 'el-icon-office-building',
    roles: ['admin', 'editor'] // you can set roles in root nav
  },
  children: [
    {
      path: '/listLab',
      component: () => import('@/views/laboratory/labList'),
      name: 'ListLab',
      meta: {
        title: '实验室列表',
        icon: 'list',
        roles: ['admin', 'editor'] // you can set roles in root nav
      }
    },
    {
      path: '/addLab',
      component: () => import('@/views/laboratory/addLab'),
      name: 'AddLab',
      meta: {
        title: '新增实验室',
        icon: 'el-icon-plus',
        roles: ['admin', 'editor'] // you can set roles in root nav
      }
    },
    {
      path: '/realTimeLab',
      component: () => import('@/views/laboratory/labStatus'),
      name: 'RealTimeLab',
      meta: {
        title: '实时状态',
        icon: 'el-icon-odometer',
        roles: ['admin', 'editor'] // you can set roles in root nav
      }
    }
  ]
}

export default labRoute
