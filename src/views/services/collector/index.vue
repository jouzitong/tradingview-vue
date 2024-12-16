<template>
  <div>
    <h1>数据收集器服务</h1>
    <div>
      <div>
        <h2>功能按钮</h2>
        <div>
          <el-button>开始历史数据收集</el-button>
          <el-button>重新连接WS</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "collector",
  methods: {
    startCollect() {
      this.$http.collector.startCollect().then(resp => {
        if (resp.code === 0) {
          this.$message.success("操作成功");
        } else {
          this.$message.error("失败:" + resp.msg);
        }
      })
    }
  }

}
</script>

<style scoped lang="scss">

</style>