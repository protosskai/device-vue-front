import Layout from '@/layout'

const permissionRoute = {
  path: '/permissionManage',
  component: Layout,
  name: 'PermissionManage',
  alwaysShow: true, // will always show the root menu
  meta: {
    title: '权限管理',
    icon: 'password',
    roles: ['admin', 'editor'] // you can set roles in root nav
  },
  children: [
    {
      path: '/listPermission',
      component: () => import('@/views/permission/permissionList'),
      name: 'ListPermission',
      meta: {
        title: '权限列表',
        icon: 'list',
        roles: ['admin', 'editor'] // you can set roles in root nav
      }
    }
  ]
}

export default permissionRoute
