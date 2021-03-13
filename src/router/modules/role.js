import Layout from '@/layout'

const roleRoute = {
  path: 'roleManage',
  component: Layout,
  name: 'RoleManage',
  alwaysShow: true, // will always show the root menu
  meta: {
    title: '角色管理',
    icon: 'el-icon-user-solid',
    roles: ['admin', 'editor'] // you can set roles in root nav
  },
  children: [
    {
      path: '/listRole',
      component: () => import('@/views/role/roleList'),
      name: 'ListRole',
      meta: {
        title: '角色列表',
        icon: 'list',
        roles: ['admin', 'editor'] // you can set roles in root nav
      }
    },
    {
      path: '/addRole',
      component: () => import('@/views/role/addRole'),
      name: 'AddRole',
      meta: {
        title: '新增角色',
        icon: 'el-icon-plus',
        roles: ['admin', 'editor'] // you can set roles in root nav
      }
    }
  ]
}

export default roleRoute
