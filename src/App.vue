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
import store from "@/store";

export default {
  name: "App",
  components: {
    TopHeader
  },
  beforeCreate() {
    store.dispatch('fetchEnumsMap').then(resp => {
      console.log("获取全局枚举完成");
    });
  },
  mounted() {
    console.log(this,"this",store)
    store.dispatch('fetchEnumsMap').then(res => {
      console.log("获取全局枚举完成",res);
    });
  }
}
</script>

<style lang="scss">
// 引入全局样式
@import "@/assets/style/common.scss";
</style>
