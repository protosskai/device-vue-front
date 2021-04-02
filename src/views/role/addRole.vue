<template>
  <div class="addRole">
    <el-form ref="form" :model="form" label-width="100px">
      <el-form-item label="角色名称">
        <el-input
          v-model="form.roleName"
          placeholder="请输入角色名称"
          style="width: 180px"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">新增角色</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { addRole } from "@/api/role";
export default {
  data() {
    return {
      form: {
        roleName: "",
      },
    };
  },
  mounted() {},
  methods: {
    success() {
      this.$alert("添加成功！", "提示", {
        confirmButtonText: "确定",
        callback: (action) => {
          // this.$message({
          //   type: "info",
          //   message: `添加成功`,
          // });
          this.form = {
            roleName: "",
          };
        },
      });
    },
    onSubmit() {
      addRole(this.form).then((response) => {
        if (response.code == 20000) {
          this.success();
          console.log("添加成功");
        }
      });
    },
  },
};
</script>

<style scoped>
.addRole {
  margin-left: 10px;
  margin-top: 10px;
}
</style>
