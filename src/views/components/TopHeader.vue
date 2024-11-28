<template>
  <div class="topHeader">
    <div class="logo"></div>
    <div class="wrapper-text">
      <el-button type="text" @click="goto(1)">涨幅列表</el-button>
      <el-button type="text" @click="goto(2)">k线数据</el-button>
      <el-button type="text" @click="goto(3)">配置列表</el-button>
    </div>
    <div class="setting"></div>
  </div>
</template>

<script>
export default {
  name: "TopHeader",
  data() {
    return {}
  },
  methods: {
    goto(index) {
      if (index === 1) {
        this.$router.push({ path: "/order-list" })
      } else if (index === 2) {
        this.$router.push("/")
      } else if (index === 3) {
        this.$router.push("/settings")
      }
    }
  },
  created() {},
  mounted() {}
}
</script>

<style lang="less" scoped>
@import url("./css/topheader.less");
</style>