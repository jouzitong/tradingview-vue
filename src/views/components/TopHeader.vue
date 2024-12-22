<template>
  <div class="topHeader">
    <div class="logo">LOGO</div>
    <div class="wrapper-text">
      <el-button type="text" @click="goto(1)">涨幅列表</el-button>
      <!--      <el-button type="text" @click="goto(2)">K线数据</el-button>-->
      <el-button type="text" @click="goto(3)">配置列表</el-button>
      <el-button type="text" @click="goto(4)">模拟回测</el-button>
      <!-- 一级菜单: 项目配置 -->
      <el-dropdown @command="goto">
        <el-button type="text">
          项目服务 <i class="el-icon-arrow-down el-icon--right"></i>
        </el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="5">量化交易服务</el-dropdown-item>
          <el-dropdown-item command="7">平台服务</el-dropdown-item>
          <el-dropdown-item command="6">数据收集服务</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>

      <!-- 一级菜单: 项目配置 -->
      <el-dropdown @command="goto" disabled>
        <el-button type="text">
          学习碎片(未完成) <i class="el-icon-arrow-down el-icon--right"></i>
        </el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="20">碎片空间</el-dropdown-item>
          <el-dropdown-item command="21">技术学习</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>

    </div>
    <div class="setting">头像</div>
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
      const routes = {
        1: "/order-list",
        2: "/",
        3: "/settings",
        4: "/home",
        5: "/trading", // 量化交易服务
        6: "/collector", // 数据收集服务
        7: "/platform", // 数据中心服务
      }
      this.$router.push({path: routes[index]});
    }
  },
  created() {
  },
  mounted() {
  }
}
</script>

<style lang="less" scoped>
@import url("./css/topheader.less");
</style>