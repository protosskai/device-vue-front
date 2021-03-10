<template>
  <div class="list-device">
    <el-table
      v-loading="listLoading"
      :data="deviceList"
      border="true"
      style="width: 100%"
    >
      <el-table-column prop="id" label="编号" width="180" />
      <el-table-column prop="device_name" label="设备名称" width="180" />
      <el-table-column prop="principal" label="负责人" />
      <el-table-column prop="is_maintain" label="是否维护" />
      <el-table-column prop="is_abandoned" label="是否废弃" />
    </el-table>
  </div>
</template>

<script>
import { getDeviceList } from '@/api/device'
export default {
  name: 'ListDevice',
  data() {
    return {
      deviceList: [],
      listLoading: true
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      getDeviceList().then(response => {
        this.deviceList = response.data.list
        this.listLoading = false
      })
    }
  }
}
</script>
