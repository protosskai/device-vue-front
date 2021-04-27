<template>
  <div class="scrap-device">
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
      <el-table-column prop="isScraped" label="是否废弃">
        <template slot-scope="scope">
          <div>
            {{ convertBool(scope.row.isScraped) }}
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="scrapUser" label="废弃执行人" />
      <el-table-column prop="scrapTime" label="废弃时间" />
      <el-table-column prop="detail" label="废弃原因" />
      <el-table-column label="操作" width="100">
        <template slot-scope="scope">
          <el-button
            v-if="scope.row.isScraped == 0"
            type="success"
            style="font-size: 2px"
            @click="startScrap(scope.$index, scope.row.deviceId)"
          >
            报废设备
          </el-button>
          <el-button
            v-if="scope.row.isScraped == 1"
            type="primary"
            style="font-size: 2px"
            @click="stopScrap(scope.$index, scope.row.deviceId)"
          >
            取消报废
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
import { getDeviceScrapList } from "@/api/device";
import { scrapDevice } from "@/api/device";
import { stopScrapDevice } from "@/api/device";
export default {
  name: "ScrapListDevice",
  data() {
    return {
      deviceList: [],
      listLoading: true,
      query: {
        querySelect: 0,
        page: 1,
        size: 10,
      },
      queryOptions: [
        {
          value: 0,
          label: "全部设备",
        },
        {
          value: 1,
          label: "已报废",
        },
        {
          value: 2,
          label: "未报废",
        },
      ],
      page: {
        pageSize: 10,
        total: 50,
        currentPage: 1,
      },
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      // 获取设备维护信息
      this.listLoading = true;
      this.query.page = this.page.currentPage;
      this.query.size = this.page.pageSize;
      getDeviceScrapList(this.query).then((response) => {
        this.deviceList = response.data.list;
        this.page.total = response.data.total;
        this.listLoading = false;
      });
    },
    startScrap(index, device_id) {
      // 发起报废设备
      let userId = 1;
      let query = {
        userId: userId,
        deviceId: device_id,
      };
      scrapDevice(query).then((response) => {
        this.deviceList[index].isScraped = 1;
      });
    },
    stopScrap(index, device_id) {
      // 取消设备报废
      let userId = 1; //管理员ID
      let query = {
        deviceId: device_id,
        userId: userId,
      };
      stopScrapDevice(query).then((response) => {
        this.deviceList[index].isScraped = 0;
      });
    },
    handleCurrentChange(new_page) {
      this.page.currentPage = new_page;
      console.log("New Page: " + this.page.currentPage);
    },
    convertBool(bool_val) {
      return bool_val ? "是" : "否";
    },
  },
};
</script>

<style scoped>
.scrap-device {
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
