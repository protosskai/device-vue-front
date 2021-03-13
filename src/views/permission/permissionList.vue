<template>
  <div class="list-permission">
    <el-table
      v-loading="listLoading"
      :data="
        permissionList.slice(
          (page.currentPage - 1) * page.pageSize,
          page.currentPage * page.pageSize
        )
      "
      style="width: 100%"
    >
      <el-table-column prop="id" label="编号" width="80" />
      <el-table-column prop="permission_name" label="权限名称" />
      <el-table-column prop="module_name" label="模块名" />
      <el-table-column prop="path" label="路径" />
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
import { getPermissionList } from "@/api/permission";
export default {
  name: "ListPermission",
  data() {
    return {
      permissionList: [],
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
      getPermissionList().then((response) => {
        this.permissionList = response.data.list;
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
.list-permission {
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
