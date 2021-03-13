import Layout from '@/layout'

const userRoute = {
  path: '/userManage',
  component: Layout,
  name: 'UserManage',
  alwaysShow: true, // will always show the root menu
  meta: {
    title: '用户管理',
    icon: 'peoples',
    roles: ['admin', 'editor'] // you can set roles in root nav
  },
  children: [
    {
      path: '/listUser',
      component: () => import('@/views/user/userList'),
      name: 'ListUser',
      meta: {
        title: '用户列表',
        icon: 'list',
        roles: ['admin', 'editor'] // you can set roles in root nav
      }
    },
    {
      path: '/addUser',
      component: () => import('@/views/user/addUser'),
      name: 'AddUser',
      meta: {
        title: '新增用户',
        icon: 'el-icon-plus',
        roles: ['admin', 'editor'] // you can set roles in root nav
      }
    },
  ]
}

export default userRoute
