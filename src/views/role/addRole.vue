<template>
  <div class="addRole">
    <el-form ref="form" :model="form" label-width="100px">
      <el-form-item label="角色名称">
        <el-input
          v-model="form.role_name"
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
export default {
  data() {
    return {
      form: {
        role_name: "",
      },
    };
  },
  mounted() {},
  methods: {
    onSubmit() {
      console.log("submit!");
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
