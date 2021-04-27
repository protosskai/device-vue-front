<template>
  <div class="addLab">
    <el-form ref="form" :model="form" label-width="100px">
      <el-form-item label="实验室名">
        <el-input
          v-model="form.lab_name"
          placeholder="请输入实验室名"
          style="width: 180px"
        />
      </el-form-item>
      <el-form-item label="负责人">
        <el-autocomplete
          v-model="form.principal"
          :fetch-suggestions="querySearchAsync"
          placeholder="请输入负责人名称"
          @select="handleSelect"
        />
      </el-form-item>
      <el-form-item label="所在区域">
        <el-input
          v-model="form.region"
          placeholder="请输入区域"
          style="width: 180px"
        />
      </el-form-item>
      <el-form-item label="备注">
        <el-input
          v-model="form.detail"
          placeholder="请输入备注"
          style="width: 180px"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">新增实验室</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getUserList } from "@/api/user";
export default {
  name: "AddLab",
  data() {
    return {
      form: {
        lab_name: "",
        principal: "",
        region: "",
        detail: "",
      },
      principals: [],
    };
  },
  mounted() {
    this.getUsers();
  },
  methods: {
    getUsers() {
      var query = {};
      getUserList(query).then((response) => {
        for (var i of response.data.list) {
          this.principals.push({ value: i.userAlias });
        }
      });
    },
    success() {
      this.$alert("添加成功！", "提示", {
        confirmButtonText: "确定",
        callback: (action) => {
          this.form = {
            lab_name: "",
            principal: "",
            region: "",
            detail: "",
          };
        },
      });
    },
    onSubmit() {
      this.success();
    },
    querySearchAsync(queryString, cb) {
      var principals = this.principals;
      var results = queryString
        ? principals.filter(this.createStateFilter(queryString))
        : principals;
      cb(results);
    },
    createStateFilter(queryString) {
      return (state) => {
        return (
          state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
        );
      };
    },
    handleSelect(item) {
      console.log(item);
    },
  },
};
</script>

<style scoped>
.addLab {
  margin-left: 10px;
  margin-top: 10px;
}
</style>
