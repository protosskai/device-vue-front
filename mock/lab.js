const Mock = require('mockjs')

module.exports = [
    {
        url: '/vue-element-admin/lab/labList',
        type: 'get',
        response: config => {
            const data = {
                list: [
                    Mock.mock({
                        id: "1",
                        "lab_name": "第一个",
                        "principal_user": "Tom",
                        "region": "21B",
                        "detail": "无"
                    }),
                    Mock.mock({
                        id: "2",
                        "lab_name": "第二个",
                        "principal_user": "Tim",
                        "region": "21A",
                        "detail": "无"
                    }),
                ],
                total: 2
            }
            return {
                code: 20000,
                data: data
            }
        }
    },
]