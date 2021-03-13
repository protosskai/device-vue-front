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
                ],
                total: 2
            }
            return {
                code: 20000,
                data: data
            }
        }
    },
    // Get Device Maintain List
    {
        url: '/vue-element-admin/device/maintainList',
        type: 'get',
        response: config => {
            const data0 = {
                list: [
                    Mock.mock({
                        device_id: 1,
                        device_name: "第一个",
                        principal: "Mike",
                        is_maintain: "否",
                        maintain_owner: "",
                        start_time: "",
                        finished_time: "",
                        status: ""
                    }),
                    Mock.mock({
                        device_id: 2,
                        device_name: "第二个",
                        principal: "Mike",
                        is_maintain: "是",
                        maintain_owner: "Tim",
                        start_time: "2020-02-01",
                        finished_time: "2020-02-05",
                        status: "正在维护"
                    })
                ],
                total: 2
            }
            const data2 = {
                list: [
                    Mock.mock({
                        device_id: 1,
                        device_name: "第一个",
                        principal: "Mike",
                        is_maintain: "否",
                        maintain_owner: "",
                        start_time: "",
                        finished_time: "",
                        status: ""
                    }),
                ],
                total: 1
            }

            const data1 = {
                list: [
                    Mock.mock({
                        device_id: 2,
                        device_name: "第二个",
                        principal: "Mike",
                        is_maintain: "是",
                        maintain_owner: "Tim",
                        start_time: "2020-02-01",
                        finished_time: "2020-02-05",
                        status: "正在维护"
                    })
                ],
                total: 1
            }
            var data = 0
            const { querySelect } = config.query
            if (querySelect == 0) {
                data = data0
            } else if (querySelect == 1) {
                data = data1
            } else {
                data = data2
            }
            return {
                code: 20000,
                data: data
            }
        }
    },
    // Get Device Scrap List
    {
        url: '/vue-element-admin/device/scrapList',
        type: 'get',
        response: config => {
            const data0 = {
                list: [
                    Mock.mock({
                        device_id: 1,
                        device_name: "第一个",
                        principal: "Mike",
                        is_scraped: "否",
                        scrap_user: "",
                        scrap_time: "",
                        detail: "",
                    }),
                    Mock.mock({
                        device_id: 1,
                        device_name: "第二个",
                        principal: "Mike",
                        is_scraped: "是",
                        scrap_user: "Tim",
                        scrap_time: "2020-01-01",
                        detail: "设备损坏",
                    })
                ],
                total: 2
            };
            const data1 = {
                list: [
                    Mock.mock({
                        device_id: 1,
                        device_name: "第一个",
                        principal: "Mike",
                        is_scraped: "否",
                        scrap_user: "",
                        scrap_time: "",
                        detail: "",
                    }),
                ],
                total: 1
            };
            const data2 = {
                list: [
                    Mock.mock({
                        device_id: 1,
                        device_name: "第二个",
                        principal: "Mike",
                        is_scraped: "是",
                        scrap_user: "Tim",
                        scrap_time: "2020-01-01",
                        detail: "设备损坏",
                    })
                ],
                total: 1
            };
            var data = 0
            const { querySelect } = config.query
            if (querySelect == 0) {
                data = data0
            } else if (querySelect == 1) {
                data = data2
            } else {
                data = data1
            }
            return {
                code: 20000,
                data: data
            }
        }
    },
    // Get Device Lend List
    {
        url: '/vue-element-admin/device/lendList',
        type: 'get',
        response: config => {
            const data0 = {
                list: [
                    Mock.mock({
                        device_id: 1,
                        device_name: "第一个",
                        principal: "Mike",
                        is_lended: "否",
                        lend_user: "",
                        lend_time: "",
                        detail: "",
                    }),
                    Mock.mock({
                        device_id: 1,
                        device_name: "第二个",
                        principal: "Mike",
                        is_lended: "是",
                        lend_user: "Tim",
                        lend_time: "2020-01-01",
                        detail: "设备损坏",
                    })
                ],
                total: 2
            };
            const data1 = {
                list: [
                    Mock.mock({
                        device_id: 1,
                        device_name: "第一个",
                        principal: "Mike",
                        is_lended: "否",
                        lend_user: "",
                        lend_time: "",
                        detail: "",
                    }),
                ],
                total: 1
            };
            const data2 = {
                list: [
                    Mock.mock({
                        device_id: 1,
                        device_name: "第二个",
                        principal: "Mike",
                        is_lended: "是",
                        lend_user: "Tim",
                        lend_time: "2020-01-01",
                        detail: "设备损坏",
                    })
                ],
                total: 1
            };
            var data = 0
            const { querySelect } = config.query
            if (querySelect == 0) {
                data = data0
            } else if (querySelect == 1) {
                data = data2
            } else {
                data = data1
            }
            return {
                code: 20000,
                data: data
            }
        }
    },
    {
        url: '/vue-element-admin/device/reverseList',
        type: 'get',
        response: config => {
            const data0 = {
                list: [
                    Mock.mock({
                        device_id: 1,
                        device_name: "第一个",
                        principal: "Mike",
                        is_lended: "否",
                        lend_user: "",
                        lend_time: "",
                        detail: "",
                    }),
                    Mock.mock({
                        device_id: 1,
                        device_name: "第二个",
                        principal: "Mike",
                        is_lended: "是",
                        lend_user: "Tim",
                        lend_time: "2020-01-01",
                        detail: "设备损坏",
                    })
                ],
                total: 2
            };
            const data1 = {
                list: [
                    Mock.mock({
                        device_id: 1,
                        device_name: "第一个",
                        principal: "Mike",
                        is_lended: "否",
                        lend_user: "",
                        lend_time: "",
                        detail: "",
                    }),
                ],
                total: 1
            };
            const data2 = {
                list: [
                    Mock.mock({
                        device_id: 1,
                        device_name: "第二个",
                        principal: "Mike",
                        is_lended: "是",
                        lend_user: "Tim",
                        lend_time: "2020-01-01",
                        detail: "设备损坏",
                    })
                ],
                total: 1
            };
            var data = 0
            const { querySelect } = config.query
            if (querySelect == 0) {
                data = data0
            } else if (querySelect == 1) {
                data = data2
            } else {
                data = data1
            }
            return {
                code: 20000,
                data: data
            }
        }
    }
]
