<template>
  <div class="list-device">
    搜索：<span
      ><el-input
        class="search-input"
        v-model="search_input"
        placeholder="请输入设备名称"
      ></el-input>
      <el-button
        id="search_btn"
        style="margin-left: 10px"
        @click="search_device()"
        >搜索</el-button
      >
    </span>

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
      <el-table-column prop="deviceName" label="设备名称" />
      <el-table-column prop="principalUserAlias" label="负责人" />
      <el-table-column prop="isMaintain" label="是否维护">
        <template slot-scope="scope">
          <div>
            {{ convertBool(scope.row.isMaintain) }}
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="isScraped" label="是否废弃">
        <template slot-scope="scope">
          <div>
            {{ convertBool(scope.row.isScraped) }}
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="isScraped" label="是否借出">
        <template slot-scope="scope">
          <div>
            {{ convertBool(scope.row.isLended) }}
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="isScraped" label="是否预约">
        <template slot-scope="scope">
          <div>
            {{ convertBool(scope.row.isReverse) }}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="二维码">
        <template slot-scope="scope">
          <el-popover placement="right" width="300" trigger="click">
            <vue-qr
              ref="Qrcode"
              :text="generate_text(scope.row.uuid)"
              :size="300"
            ></vue-qr>
            <el-button slot="reference">查看二维码</el-button>
          </el-popover>
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
import { getDeviceList } from "@/api/device";
// 二维码组件
import VueQr from "vue-qr";

export default {
  name: "ListDevice",
  components: { VueQr },
  data() {
    return {
      deviceList: [],
      listLoading: true,
      page: {
        pageSize: 10,
        total: 50,
        currentPage: 1,
      },
      search_input: "",
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      this.listLoading = true;
      getDeviceList().then((response) => {
        this.deviceList = response.data.list;
        this.page.total = response.data.total;
        this.listLoading = false;
      });
    },
    handleCurrentChange(new_page) {
      this.page.currentPage = new_page;
      console.log("New Page: " + this.page.currentPage);
    },
    convertBool(bool_val) {
      return bool_val ? "是" : "否";
    },
    generate_text(uuid) {
      let o = {
        type: "info",
        uuid: uuid,
      };
      return JSON.stringify(o);
    },
    search_device() {
      this.listLoading = true;
      getDeviceList().then((response) => {
        this.deviceList = response.data.list;
        this.listLoading = false;
        let new_list = [];
        let device_name = this.search_input;
        for (let i = 0; i < response.data.list.length; i++) {
          if (
            response.data.list[i].deviceName == device_name ||
            device_name.trim() == ""
          ) {
            new_list.push(response.data.list[i]);
          }
        }
        this.deviceList = new_list;
        this.page.total = new_list.length;
      });
    },
  },
};
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
.search-input {
  width: 200px;
}
</style>
