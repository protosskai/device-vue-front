<template>
  <div class="module-manage">{{ test }}</div>
</template>

<script>
export default {
  name: 'ModuleManage',
  data() {
    return {
      test: 'Hello!'
    }
  }
}
</script>

<style lang="scss" scoped>
.module-manage {
  background-color: #e3e3e3;
  min-height: 100vh;
  padding: 50px 60px 0px;
}
</style>
