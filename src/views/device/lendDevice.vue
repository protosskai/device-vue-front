<template>
  <div class="lend-device">
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
      <el-table-column prop="device_id" label="设备ID" width="80" />
      <el-table-column prop="device_name" label="设备名称" />
      <el-table-column prop="principal" label="负责人" />
      <el-table-column prop="is_lended" label="是否借出" />
      <el-table-column prop="lend_user" label="借出者" />
      <el-table-column prop="lend_time" label="借出时间" />
      <el-table-column prop="detail" label="借出原因" />
      <el-table-column label="操作" width="100">
        <template slot-scope="scope">
          <el-button
            v-if="scope.row.is_lended == '否'"
            type="success"
            style="font-size: 2px"
            @click="startLend(scope.row.device_id)"
          >
            借出设备
          </el-button>
          <el-button
            v-if="scope.row.is_lended == '是'"
            type="primary"
            style="font-size: 2px"
            @click="stopLend(scope.row.device_id)"
          >
            归还设备
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
import { getDeviceLendList } from '@/api/device'
export default {
  name: 'LendListDevice',
  data() {
    return {
      deviceList: [],
      listLoading: true,
      query: {
        querySelect: 0
      },
      queryOptions: [
        {
          value: 0,
          label: '全部设备'
        },
        {
          value: 1,
          label: '已借出'
        },
        {
          value: 2,
          label: '未借出'
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
      getDeviceLendList(this.query).then((response) => {
        this.deviceList = response.data.list
        this.page.total = response.data.total
        this.listLoading = false
      })
    },
    startLend(device_id) {
      // 发起借出设备
      console.log('startMaintain:' + device_id)
    },
    stopLend(device_id) {
      // 发起设备归还
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
.lend-device {
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
