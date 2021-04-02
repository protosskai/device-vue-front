<template>
  <div class="addUser">
    <el-form ref="form" :model="form" label-width="100px">
      <el-form-item label="用户名">
        <el-input
          v-model="form.user_name"
          placeholder="请输入用户名"
          style="width: 180px"
        />
      </el-form-item>
      <el-form-item label="用户昵称">
        <el-input
          v-model="form.user_alias"
          placeholder="请输入用户昵称"
          style="width: 180px"
        />
      </el-form-item>
      <el-form-item label="密码">
        <el-input
          placeholder="请输入密码"
          v-model="form.password"
          show-password
          style="width: 250px"
        />
      </el-form-item>
      <el-form-item label="确认密码">
        <el-input
          placeholder="请输入密码"
          v-model="form.password1"
          show-password
          style="width: 250px"
        />
      </el-form-item>
      <el-form-item label="用户角色">
        <el-select v-model="form.role" placeholder="请选择">
          <el-option
            v-for="item in roleOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="性别">
        <el-select v-model="form.sex" placeholder="请选择">
          <el-option
            v-for="item in sexOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="手机号">
        <el-input
          v-model="form.phone"
          placeholder="请输入手机号"
          style="width: 180px"
        />
      </el-form-item>
      <el-form-item label="微信">
        <el-input
          v-model="form.wechat"
          placeholder="请输入微信号"
          style="width: 180px"
        />
      </el-form-item>
      <el-form-item label="QQ">
        <el-input
          v-model="form.qq"
          placeholder="请输入QQ号"
          style="width: 180px"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">新增用户</el-button>
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
        user_name: "",
        user_alias: "",
        password: "",
        password1: "",
        role: "",
        sex: "",
        phone: "",
        wechat: "",
        qq: "",
      },
      roleOptions: [
        {
          value: "admin",
          label: "管理员",
        },
      ],
      role: "",
      sexOptions: [
        {
          value: "0",
          label: "男",
        },
        {
          value: "1",
          label: "女",
        },
      ],
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
            user_name: "",
            user_alias: "",
            password: "",
            password1: "",
            role: "",
            sex: "",
            phone: "",
            wechat: "",
            qq: "",
          };
        },
      });
    },
    onSubmit() {
      this.success();
      console.log("submit!");
    },
  },
};
</script>

<style scoped>
.addUser {
  margin-left: 10px;
  margin-top: 10px;
}
</style>
