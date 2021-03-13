const Mock = require('mockjs')

const tokens = {
  admin: {
    token: 'admin-token'
  },
  editor: {
    token: 'editor-token'
  }
}

const users = {
  'admin-token': {
    roles: ['admin'],
    introduction: 'I am a super administrator',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Super Admin'
  },
  'editor-token': {
    roles: ['editor'],
    introduction: 'I am an editor',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Normal Editor'
  }
}

module.exports = [
  // user login
  {
    url: '/vue-element-admin/user/login',
    type: 'post',
    response: config => {
      const { username } = config.body
      const token = tokens[username]

      // mock error
      if (!token) {
        return {
          code: 60204,
          message: 'Account and password are incorrect.'
        }
      }

      return {
        code: 20000,
        data: token
      }
    }
  },

  // get user info
  {
    url: '/vue-element-admin/user/info\.*',
    type: 'get',
    response: config => {
      const { token } = config.query
      const info = users[token]

      // mock error
      if (!info) {
        return {
          code: 50008,
          message: 'Login failed, unable to get user details.'
        }
      }

      return {
        code: 20000,
        data: info
      }
    }
  },

  // user logout
  {
    url: '/vue-element-admin/user/logout',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },
  // user list
  {
    url: '/vue-element-admin/user/userList',
    type: 'get',
    response: config => {
      const data = {
        list: [
          Mock.mock({
            id: "1",
            user_alias: "第一个",
            role: "admin",
            sex: "男",
            phone: "15145455555",
            wechat: "",
            qq: "",
            create_time: "2020-01-01"
          }),
          Mock.mock({
            id: "1",
            user_alias: "第二个",
            role: "editor",
            sex: "女 ",
            phone: "15145466666",
            wechat: "",
            qq: "",
            create_time: "2020-01-01"
          }),
        ],
        total: 2
      }
      return {
        code: 20000,
        data: data
      }
    }
  }
]
