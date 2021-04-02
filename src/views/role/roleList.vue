<template>
  <div class="list-role">
    <el-table
      v-loading="listLoading"
      :data="
        roleList.slice(
          (page.currentPage - 1) * page.pageSize,
          page.currentPage * page.pageSize
        )
      "
      style="width: 100%"
    >
      <el-table-column prop="id" label="编号" width="80" />
      <el-table-column prop="roleName" label="角色名称" />
      <el-table-column prop="createTime" label="创建时间" />
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
import { getRoleList } from "@/api/role";
export default {
  name: "ListUser",
  data() {
    return {
      roleList: [],
      listLoading: true,
      query: {
        page: 1,
        size: 10,
      },
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
      this.query.page = this.page.currentPage;
      this.query.size = this.page.pageSize;
      getRoleList(this.query).then((response) => {
        this.roleList = response.data.list;
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
.list-role {
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
