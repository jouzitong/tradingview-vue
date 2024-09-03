<!--
 * @Author: kexiao 3493821365@qq.com
 * @Date: 2024-08-04 12:21:54
 * @LastEditors: kexiao 3493821365@qq.com
 * @LastEditTime: 2024-08-04 15:21:13
 * @FilePath: /tradingview-vue/src/views/Home.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by ${git_name_email}, All Rights Reserved. 
-->
<template>
  <div class="content">
    <!-- 移动端 -->
    <s-tradingview
      v-if="!isPC"
      :marketName="marketName"
      :marketId="marketId"
      :wsUrl="wsUrl"
      :decimal="decimal"
      class="tradingviewView"
    />
    <!-- pc端 -->
    <s-tradingview-pc
      v-else
      :marketName="marketName"
      :marketId="marketId"
      :wsUrl="wsUrl"
      :decimal="decimal"
      class="tradingviewView"
    />
  </div>
</template>

<script>
export default {
  name: "home",
  data() {
    return {
      isPC: true,
      marketId: this.$route.query.marketId,
      marketName: this.$route.query.marketName,
      decimal: this.$route.query.decimal,
      // wsUrl: "ws://localhost:8080/"
      wsUrl: process.env.VUE_APP_WS_URL
      // wsUrl: "ws://请求地址"VUE_APP_WS_URL
    }
  },
  methods: {
    // 判断是否为移动端
    isCheckPC() {
      var sUserAgent = navigator.userAgent.toLowerCase()
      var bIsIpad = sUserAgent.match(/ipad/i) == "ipad"
      var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os"
      var bIsMidp = sUserAgent.match(/midp/i) == "midp"
      var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4"
      var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb"
      var bIsAndroid = sUserAgent.match(/android/i) == "android"
      var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce"
      var bIsWM =
        sUserAgent.match(/windows mobile/i) == "windows mobile"
      document.writeln("您的浏览设备为：")
      if (
        bIsIpad ||
        bIsIphoneOs ||
        bIsMidp ||
        bIsUc7 ||
        bIsUc ||
        bIsAndroid ||
        bIsCE ||
        bIsWM
      ) {
        console.log("phone")
        return false
        // document.writeln("phone")
      } else {
        console.log("PC")
        return true
        // document.writeln("pc")
      }
    },
    getData() {
      let res = this.$http.home.get()
      console.log(res, "res返回值", this.$http)
    }

    // browserRedirect();
  },
  created() {
    // this.isCheckPC()
    if (this.isCheckPC()) {
      this.isPC = true
    } else {
      this.isPC = false
    }
    // console.log(this.$route.query.decimal, "路由苍蝇")
  },
  mounted() {
    // this.getData()
    // this.isCheckPC()
  }
}
</script>
<style lang="scss" scoped>
.tradingviewView {
  height: 100vh;
  width: 100vw;
}
</style>