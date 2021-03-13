module.exports = [
    {
        url: '/vue-element-admin/permission/permissionList',
        type: 'get',
        response: config => {

            const data = {
                list: [
                    {
                        id: "1",
                        permission_name: "用户管理",
                        module_name: "用户管理",
                        path: "/user",
                        create_time: "2020-01-01"
                    }
                ],
                total: 1
            }
            return {
                code: 20000,
                data: data
            }
        }
    },
]