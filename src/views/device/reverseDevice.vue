<template>
  <div class="reverse-device">
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
      <el-table-column prop="isReverse" label="是否预约">
        <template slot-scope="scope">
          <div>
            {{ convertBool(scope.row.isReverse) }}
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="reserveUser" label="预约者" />
      <el-table-column prop="reserveTime" label="预约时间" />
      <!-- <el-table-column prop="expectReturnTime" label="预计归还时间" /> -->
      <el-table-column prop="detail" label="预约原因" />
      <el-table-column label="操作" width="100">
        <template slot-scope="scope">
          <el-button
            v-if="scope.row.isReverse == 0"
            type="success"
            style="font-size: 2px"
            @click="openReverseDialog(scope.$index, scope.row.deviceId)"
          >
            预约设备
          </el-button>
          <el-button
            v-if="scope.row.isReverse == 1"
            type="primary"
            style="font-size: 2px"
            @click="stopReverse(scope.$index, scope.row.deviceId)"
          >
            取消预约
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

    <el-dialog title="发起预约" :visible.sync="dialogFormVisible">
      <el-form :model="reverse_form">
        <el-form-item label="预约人" :label-width="formLabelWidth">
          <el-input
            v-model="reverse_form.userName"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="预约原因" :label-width="formLabelWidth">
          <el-input v-model="reverse_form.detail" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="预约时间" :label-width="formLabelWidth">
          <div class="block">
            <el-date-picker
              v-model="reverse_date"
              type="datetime"
              placeholder="选择日期时间"
            >
            </el-date-picker>
          </div>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="startReverse()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  getDeviceReverseList,
  reverseDevice,
  stopReverseDevice,
  reverseDevice1,
} from "@/api/device";
import { queryUserIdByName } from "@/api/user";
export default {
  name: "ReverseListDevice",
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
          label: "已预约",
        },
        {
          value: 2,
          label: "未预约",
        },
      ],
      page: {
        pageSize: 10,
        total: 50,
        currentPage: 1,
      },
      dialogFormVisible: false,
      reverse_form: {
        userName: "",
        detail: "",
      },
      reverse_index: 0,
      reverse_device_id: 0,
      formLabelWidth: "120px",
      reverse_date: null,
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
      getDeviceReverseList(this.query).then((response) => {
        this.deviceList = response.data.list;
        this.page.total = response.data.total;
        this.listLoading = false;
      });
    },
    openReverseDialog(index, device_id) {
      this.dialogFormVisible = true;
      this.reverse_index = index;
      this.reverse_device_id = device_id;
    },
    startReverse() {
      queryUserIdByName({
        userName: this.reverse_form.userName,
      }).then((response) => {
        let userId = response.data.userId;
        let query = {
          deviceId: this.reverse_device_id,
          userId: userId,
          reverseDate: this.reverse_date,
        };
        reverseDevice1(query).then((response) => {
          this.deviceList[this.reverse_index].isReverse = 1;
          this.getList();
        });
        this.dialogFormVisible = false;
      });
    },
    stopReverse(index, device_id) {
      // 发起取消预约
      let userId = 1; //管理员ID
      let query = {
        deviceId: device_id,
        userId: userId,
      };
      stopReverseDevice(query).then((response) => {
        this.deviceList[index].isReverse = 0;
        this.getList();
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
.reverse-device {
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
