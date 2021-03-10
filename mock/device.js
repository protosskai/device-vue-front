const Mock = require('mockjs')

module.exports = [
    // device list
    {
        url: '/vue-element-admin/device/list',
        type: 'get',
        response: config => {
            const data = {
                list: [
                    Mock.mock({
                        id: "1",
                        "device_name": "第一个",
                        "principal": "Tom",
                        "is_maintain": "否",
                        "is_abandoned": "否"
                    }),
                    Mock.mock({
                        id: "2",
                        "device_name": "第二个",
                        "principal": "Mike",
                        "is_maintain": "否",
                        "is_abandoned": "否"
                    }),
                ]
            }
            return {
                code: 20000,
                data: data
            }
        }
    },
]
