<!--
 * @Author: kexiao 3493821365@qq.com
 * @Date: 2024-08-04 12:21:54
 * @LastEditors: kexiao 3493821365@qq.com
 * @LastEditTime: 2024-11-02 16:19:40
 * @FilePath: /tradingview-vue/src/App.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div id="app">
    <TopHeader/>
    <router-view/>
  </div>
</template>

<script>
import TopHeader from "./views/components/TopHeader.vue"

export default {
  name: "App",
  components: {
    TopHeader
  },
  mounted() {
    // this.$store.dispatch('fetchEnumsMap'); // 页面刷新时请求数据
    // 页面刷新时调用全局数据请求
    // this.$store.dispatch('fetchEnumsMap');
  }
}
</script>

<style lang="scss">
// 引入全局样式
@import "@/assets/style/common.scss";
</style>
