<template>
  <div class="addDevice">
    <el-form ref="form" :model="form" label-width="100px">
      <el-form-item label="设备名称">
        <el-input
          v-model="form.device_name"
          placeholder="请输入设备名称"
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
      <el-form-item label="是否正在维护">
        <el-radio-group v-model="form.is_maintain">
          <el-radio label="是" />
          <el-radio label="否" />
        </el-radio-group>
      </el-form-item>
      <el-form-item label="是否已废弃">
        <el-radio-group v-model="form.is_abandoned">
          <el-radio label="是" />
          <el-radio label="否" />
        </el-radio-group>
      </el-form-item>
      <el-form-item label="设备详情">
        <el-input
          v-model="form.detail"
          type="textarea"
          placeholder="请输入设备详情"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">新增设备</el-button>
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
        device_name: '',
        principal: '',
        is_maintain: '否',
        is_abandoned: '否',
        detail: ''
      },
      principals: []
    }
  },
  mounted() {
    this.principals = [{ value: 'Tom' }, { value: 'Mike' }, { value: 'Tim' }]
  },
  methods: {
    onSubmit() {
      console.log('submit!')
    },
    querySearchAsync(queryString, cb) {
      var principals = this.principals
      var results = queryString
        ? principals.filter(this.createStateFilter(queryString))
        : principals
      cb(results)
    },
    createStateFilter(queryString) {
      return (state) => {
        return (
          state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
        )
      }
    },
    handleSelect(item) {
      console.log(item)
    }
  }
}
</script>

<style scoped>
.addDevice {
  margin-left: 10px;
  margin-top: 10px;
}
</style>
