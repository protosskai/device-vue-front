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
      <el-table-column prop="deviceId" label="设备ID" width="80" />
      <el-table-column prop="deviceName" label="设备名称" />
      <el-table-column prop="isLended" label="是否借出">
        <template slot-scope="scope">
          <div>
            {{ convertBool(scope.row.isLended) }}
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="lendUser" label="借出者" />
      <el-table-column prop="lendTime" label="借出时间" />
      <el-table-column prop="detail" label="借出原因" />
      <el-table-column label="操作" width="100">
        <template slot-scope="scope">
          <el-button
            v-if="scope.row.isLended == 0"
            type="success"
            style="font-size: 2px"
            @click="openLendDialog(scope.$index, scope.row.deviceId)"
          >
            借出设备
          </el-button>
          <el-button
            v-if="scope.row.isLended == 1"
            type="primary"
            style="font-size: 2px"
            @click="stopLend(scope.$index, scope.row.deviceId)"
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

    <el-dialog title="发起借出" :visible.sync="dialogFormVisible">
      <el-form :model="lend_form">
        <el-form-item label="借出人" :label-width="formLabelWidth">
          <el-input v-model="lend_form.userName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="借出原因" :label-width="formLabelWidth">
          <el-input v-model="lend_form.detail" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="startLend()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getDeviceLendList, lendDevice, returnDevice } from "@/api/device";
import { queryUserIdByName } from "@/api/user";
export default {
  name: "LendListDevice",
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
          label: "已借出",
        },
        {
          value: 2,
          label: "未借出",
        },
      ],
      page: {
        pageSize: 10,
        total: 50,
        currentPage: 1,
      },
      dialogFormVisible: false,
      lend_form: {
        userName: "",
        detail: "",
      },
      lend_index: 0,
      lend_device_id: 0,
      formLabelWidth: "120px",
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
      getDeviceLendList(this.query).then((response) => {
        this.deviceList = response.data.list;
        this.page.total = response.data.total;
        this.listLoading = false;
      });
    },
    openLendDialog(index, device_id) {
      this.dialogFormVisible = true;
      this.lend_index = index;
      this.lend_device_id = device_id;
    },
    startLend() {
      queryUserIdByName({
        userName: this.lend_form.userName,
      }).then((response) => {
        // 发起借出设备
        let userId = response.data.userId;
        let query = {
          deviceId: this.lend_device_id,
          userId: userId,
          detail: this.lend_form.detail,
        };
        lendDevice(query).then((response) => {
          this.deviceList[this.lend_index].isLended = 1;
        });
        this.dialogFormVisible = false;
      });
    },
    stopLend(index, device_id) {
      // 发起设备归还
      let userId = 1; //管理员ID
      let query = {
        deviceId: device_id,
        userId: userId,
      };
      returnDevice(query).then((response) => {
        this.deviceList[index].isLended = 0;
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
