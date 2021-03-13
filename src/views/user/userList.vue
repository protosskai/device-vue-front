<template>
  <div class="list-user">
    <el-table
      v-loading="listLoading"
      :data="
        userList.slice(
          (page.currentPage - 1) * page.pageSize,
          page.currentPage * page.pageSize
        )
      "
      style="width: 100%"
    >
      <el-table-column prop="id" label="编号" width="80" />
      <el-table-column prop="user_alias" label="昵称" />
      <el-table-column prop="role" label="用户身份" />
      <el-table-column prop="sex" label="性别" />
      <el-table-column prop="phone" label="手机号" />
      <el-table-column prop="wechat" label="微信" />
      <el-table-column prop="qq" label="QQ" />
      <el-table-column prop="create_time" label="创建时间" />
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
import { getUserList } from "@/api/user";
export default {
  name: "ListUser",
  data() {
    return {
      userList: [],
      listLoading: true,
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
      this.listLoading = true;
      getUserList().then((response) => {
        this.userList = response.data.list;
        this.page.total = response.data.total;
        this.listLoading = false;
      });
    },
    handleCurrentChange(new_page) {
      this.page.currentPage = new_page;
      console.log("New Page: " + this.page.currentPage);
    },
  },
};
</script>

<style scoped>
.list-user {
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
