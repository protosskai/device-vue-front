<template>
  <div class="list-device">
    <el-table
      v-loading="listLoading"
      :data="
        deviceList.slice(
          (page.currentPage - 1) * page.pageSize,
          page.currentPage * page.pageSize
        )
      "
      style="width: 100%"
    >
      <el-table-column prop="id" label="编号" width="80" />
      <el-table-column prop="device_name" label="设备名称" />
      <el-table-column prop="principal" label="负责人" />
      <el-table-column prop="is_maintain" label="是否维护" />
      <el-table-column prop="is_abandoned" label="是否废弃" />
    </el-table>
    <el-pagination
      class="pagination"
      background
      layout="prev, pager, next"
      :current-page="page.currentPage"
      :page-size="page.pageSize"
      :total="page.total"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script>
import { getDeviceList } from '@/api/device'
export default {
  name: 'ListDevice',
  data() {
    return {
      deviceList: [],
      listLoading: true,
      page: {
        pageSize: 10,
        total: 50,
        currentPage: 1
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      getDeviceList().then((response) => {
        this.deviceList = response.data.list
        this.page.total = response.data.total
        this.listLoading = false
      })
    },
    handleCurrentChange(new_page) {
      this.page.currentPage = new_page
      console.log('New Page: ' + this.page.currentPage)
    }
  }
}
</script>

<style scoped>
.list-device {
  margin-left: 5px;
  margin-top: 5px;
}
.pagination {
  position: absolute;
  bottom: 0px;
  padding: 0px;
  left: 0px;
  margin-bottom: 10px;
}
</style>
