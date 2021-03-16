<template>
  <div class="maintain-device">
    <span>请选择设备状态：</span>
    <el-select
      v-model="query.querySelect"
      placeholder="请选择"
      @change="getList"
    >
      <el-option
        v-for="item in queryOptions"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
    <el-table
      id="table"
      v-loading="listLoading"
      :data="
        deviceList.slice(
          (page.currentPage - 1) * page.pageSize,
          page.currentPage * page.pageSize
        )
      "
      style="width: 100%"
    >
      <el-table-column prop="deviceId" label="设备ID" width="80" />
      <el-table-column prop="deviceName" label="设备名称" />
      <!-- <el-table-column prop="isMaintain" label="是否维护" /> -->
      <el-table-column prop="maintainOwner" label="维护人" />
      <el-table-column prop="startTime" label="开始时间" />
      <el-table-column prop="finishedTime" label="预计结束时间" />
      <el-table-column prop="status" label="维护状态" />
      <el-table-column label="操作" width="100">
        <template slot-scope="scope">
          <el-button
            v-if="scope.row.is_maintain == 0"
            type="success"
            style="font-size: 2px;margin-right:5px"
            @click="startMaintain(scope.row.device_id)"
          >
            发起维护
          </el-button>
          <el-button
            v-if="scope.row.is_maintain == 1"
            type="primary"
            style="font-size: 2px;margin-right:5px"
            @click="stopMaintain(scope.row.device_id)"
          >
            取消维护
          </el-button>
        </template>
      </el-table-column>
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
import { getDeviceMaintainList } from '@/api/device'
export default {
  name: 'MaintainListDevice',
  data() {
    return {
      deviceList: [],
      listLoading: true,
      query: {
        querySelect: 0,
        page: 1,
        size: 10
      },
      queryOptions: [
        {
          value: 0,
          label: '全部设备'
        },
        {
          value: 1,
          label: '维护中'
        },
        {
          value: 2,
          label: '未维护'
        }
      ],
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
      // 获取设备维护信息
      this.listLoading = true
      this.query.page = this.page.currentPage
      this.query.size = this.page.pageSize
      getDeviceMaintainList(this.query).then((response) => {
        this.deviceList = response.data.list
        this.page.total = response.data.total
        this.listLoading = false
      })
    },
    startMaintain(device_id) {
      // 发起维护设备
      console.log('startMaintain:' + device_id)
    },
    stopMaintain(device_id) {
      // 结束设备维护
      console.log('stopMaintain:' + device_id)
    },
    handleCurrentChange(new_page) {
      this.page.currentPage = new_page
      console.log('New Page: ' + this.page.currentPage)
    }
  }
}
</script>

<style scoped>
.maintain-device {
  margin-left: 5px;
  margin-top: 5px;
}

#table {
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
