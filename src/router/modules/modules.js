import Layout from '@/layout'

const modulesRoute = {
  path: '/moduleManage',
  component: Layout,
  name: 'ModuleManage',
  alwaysShow: true, // will always show the root menu
  meta: {
    title: '模块管理',
    icon: 'el-icon-folder-opened',
    roles: ['admin', 'editor'] // you can set roles in root nav
  },
  children: [
    {
      path: '/permissionChange',
      component: () => import('@/views/module-manage/index'),
      name: 'PermissionChange',
      meta: {
        title: '权限变更',
        icon: 'lock',
        roles: ['admin', 'editor'] // you can set roles in root nav
      }
    }
  ]
}

export default modulesRoute
