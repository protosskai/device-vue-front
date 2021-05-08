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
      <el-table-column prop="isMaintain" label="是否维护">
        <template slot-scope="scope">
          <div>
            {{ convertBool(scope.row.isMaintain) }}
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="maintainOwner" label="维护人" />
      <el-table-column prop="startTime" label="开始时间" />
      <el-table-column prop="finishedTime" label="预计结束时间" />
      <el-table-column label="操作" width="100">
        <template slot-scope="scope">
          <el-button
            v-if="scope.row.isMaintain == 0"
            type="success"
            style="font-size: 2px; margin-right: 5px"
            @click="openMaintainDialog(scope.$index, scope.row.deviceId)"
          >
            发起维护
          </el-button>
          <el-button
            v-if="scope.row.isMaintain == 1"
            type="primary"
            style="font-size: 2px; margin-right: 5px"
            @click="stopMaintain(scope.$index, scope.row.deviceId)"
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
    <el-dialog title="发起维护" :visible.sync="dialogFormVisible">
      <el-form :model="maintain_form">
        <el-form-item label="维护人" :label-width="formLabelWidth">
          <el-input
            v-model="maintain_form.userName"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="维护原因" :label-width="formLabelWidth">
          <el-input
            v-model="maintain_form.detail"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="维护开始时间" :label-width="formLabelWidth">
          <div class="block">
            <el-date-picker
              v-model="maintain_start_date"
              type="datetime"
              placeholder="选择日期时间"
            >
            </el-date-picker>
          </div>
        </el-form-item>
        <el-form-item label="维护结束时间" :label-width="formLabelWidth">
          <div class="block">
            <el-date-picker
              v-model="maintain_end_date"
              type="datetime"
              placeholder="选择日期时间"
            >
            </el-date-picker>
          </div>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="startMaintain()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getDeviceMaintainList } from "@/api/device";
import { startMaintainDevice, stopMaintainDevice, startMaintainDevice1 } from "@/api/device";
import { queryUserIdByName } from "@/api/user";
export default {
  name: "MaintainListDevice",
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
          label: "维护中",
        },
        {
          value: 2,
          label: "未维护",
        },
      ],
      page: {
        pageSize: 10,
        total: 50,
        currentPage: 1,
      },
      maintain_form: {
        userName: "",
        detail: "",
      },
      dialogFormVisible: false,
      maintain_index: 0,
      maintain_device_id: 0,
      maintain_end_date: null,
      maintain_start_date: null,
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
      getDeviceMaintainList(this.query).then((response) => {
        this.deviceList = response.data.list;
        this.page.total = response.data.total;
        this.listLoading = false;
      });
    },
    openMaintainDialog(index, device_id) {
      this.dialogFormVisible = true;
      this.maintain_index = index;
      this.maintain_device_id = device_id;
    },
    // startMaintain(index, device_id) {
    //   // 发起维护设备
    //   let userId = 1; //管理员ID
    //   let query = {
    //     deviceId: device_id,
    //     userId: userId,
    //   };
    //   startMaintainDevice(query).then((response) => {
    //     this.deviceList[index].isMaintain = 1;
    //   });
    // },
    startMaintain() {
      queryUserIdByName({
        userName: this.maintain_form.userName,
      }).then((response) => {
        // 发起维护设备
        let userId = response.data.userId;
        let query = {
          deviceId: this.maintain_device_id,
          userId: userId,
          maintainStartDate: this.maintain_start_date,
          maintainEndDate: this.maintain_end_date,
        };
        startMaintainDevice1(query).then((response) => {
          this.deviceList[this.maintain_index].isMaintain = 1;
          this.dialogFormVisible = false
          this.getList()
        });
      });
    },
    stopMaintain(index, device_id) {
      // 结束设备维护
      let userId = 1; //管理员ID
      let query = {
        deviceId: device_id,
        userId: userId,
      };
      stopMaintainDevice(query).then((response) => {
        this.deviceList[index].isMaintain = 0;
        this.getList()
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
