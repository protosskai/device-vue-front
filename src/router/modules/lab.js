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
      component: () => import('@/views/module-manage/index'),
      name: 'ListLab',
      meta: {
        title: '实验室列表',
        icon: 'list',
        roles: ['admin', 'editor'] // you can set roles in root nav
      }
    }
  ]
}

export default labRoute
