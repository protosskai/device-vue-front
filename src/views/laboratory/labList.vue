<template>
  <div class="list-lab">
    <el-table
      v-loading="listLoading"
      :data="
        labList.slice(
          (page.currentPage - 1) * page.pageSize,
          page.currentPage * page.pageSize
        )
      "
      style="width: 100%"
    >
      <el-table-column prop="id" label="编号" width="80" />
      <el-table-column prop="lab_name" label="实验室" />
      <el-table-column prop="principal_user" label="负责人" />
      <el-table-column prop="region" label="所属区域" />
      <el-table-column prop="detail" label="详情" />
      <el-table-column label="操作" width="100">
        <template slot-scope="scope">
          <el-button
            type="success"
            style="font-size: 2px"
            @click="startReverse(scope.row.id)"
          >
            操作一
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
import { getLabList } from '@/api/lab'
export default {
  name: 'ListLab',
  data() {
    return {
      labList: [],
      listLoading: true,
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
      this.listLoading = true
      getLabList().then((response) => {
        this.labList = response.data.list
        this.page.total = response.data.total
        this.listLoading = false
      })
    },
    handleCurrentChange(new_page) {
      this.page.currentPage = new_page
      console.log('New Page: ' + this.page.currentPage)
    },
    startReverse(lab_id){
        console.log(lab_id)
    }
  }
}
</script>

<style scoped>
.list-lab {
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
