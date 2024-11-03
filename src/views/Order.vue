<template>
  <div class="container">
    <div class="container-top"> </div>
    <div class="container-main">
      <div class="left">
        <div class="left-header">
          <div
            @click="activeIndex = 0"
            class="left-header-item"
            :class="activeIndex == 0 ? 'active-item' : ''"
            >涨幅榜</div
          >
          <div
            @click="activeIndex = 1"
            class="left-header-item"
            :class="activeIndex == 1 ? 'active-item' : ''"
            >跌幅榜</div
          >
        </div>
        <div class="left-list">
          <div
            class="left-list-item"
            v-for="(item, index) in showWhichList"
            :key="index"
          >
            <div class="left-item">
              <span class="num-ind">{{ index + 1 }}</span>
              <span> {{ item.instId }}</span>
            </div>
            <div class="right-item">
              <span :class="activeIndex == 0 ? 'green' : 'red'">
                {{ item.markPx }}</span
              >
            </div>
          </div>
        </div>
      </div>
      <div class="left-drag"></div>
      <div class="main"></div>
      <div class="main-drag"></div>
      <div class="right"></div>
    </div>
  </div>
</template>

<script>
import { webSocketMixin } from "../views/mixin/webSocket"
export default {
  mixins: [webSocketMixin],
  data() {
    return {
      activeIndex: 0, // 0:涨幅榜 1:跌幅榜
      wsUrl: process.env.VUE_APP_WS_URL,
      leftData: [],
      showListUp: [],
      showListDown: []
    }
  },
  watch: {
    leftData(val) {
      console.log(val, "val")
      if (val && val.length > 0) {
        this.leftData.forEach(item => {
          if (item.trend == "UP") {
            this.showListUp = item.data
            console.log(this.showListUp, "涨幅")
          } else if (item.trend == "DOWN") {
            this.showListDown = item.data
            console.log(this.showListDown, "跌幅")
          }
        })
      }
    }
    // activeIndex(val) {
    //   if (val == 0) {
    //     this.leftData.forEach(item => {
    //       if (item.trend == "UP") {
    //         this.showListUp = item.data
    //       } else if (item.trend == "DOWN") {
    //         this.showListDown = item.data
    //       }
    //     })
    //     console.log(self.activeIndex, "activeIndex")
    //     // if (self.activeIndex == 0) {
    //     //   this.leftData = self.upList
    //     // } else {
    //     //   this.leftData = self.downList
    //     // }
    //   } else if (val == 1) {
    //   }
    // }
  },
  computed: {
    showWhichList() {
      if (this.activeIndex == 0) {
        return this.showListUp
      } else {
        return this.showListDown
      }
    }
  },
  mounted() {
    this.webSocket("load")
    this.dragControllerDiv()
  },
  methods: {
    dragControllerDiv: function () {
      var resize = document.getElementsByClassName("left-drag")
      var left = document.getElementsByClassName("left")
      var mid = document.getElementsByClassName("main")
      var box = document.getElementsByClassName("container-main")
      for (let i = 0; i < resize.length; i++) {
        // 鼠标按下事件
        resize[i].onmousedown = function (e) {
          //颜色改变提醒
          resize[i].style.background = "#818181"
          var startX = e.clientX
          resize[i].left = resize[i].offsetLeft
          // 鼠标拖动事件
          document.onmousemove = function (e) {
            var endX = e.clientX
            var moveLen = resize[i].left + (endX - startX) // （endx-startx）=移动的距离。resize[i].left+移动的距离=左边区域最后的宽度
            var maxT = box[i].clientWidth - resize[i].offsetWidth // 容器宽度 - 左边区域的宽度 = 右边区域的宽度

            if (moveLen < 32) moveLen = 32 // 左边区域的最小宽度为32px
            if (moveLen > maxT - 150) moveLen = maxT - 150 //右边区域最小宽度为150px

            resize[i].style.left = moveLen // 设置左侧区域的宽度

            for (let j = 0; j < left.length; j++) {
              left[j].style.width = moveLen + "px"
              mid[j].style.width =
                box[i].clientWidth - moveLen - 10 + "px"
            }
          }
          // 鼠标松开事件
          document.onmouseup = function (evt) {
            //颜色恢复
            resize[i].style.background = "#d6d6d6"
            document.onmousemove = null
            document.onmouseup = null
            resize[i].releaseCapture && resize[i].releaseCapture() //当你不在需要继续获得鼠标消息就要应该调用ReleaseCapture()释放掉
          }
          resize[i].setCapture && resize[i].setCapture() //该函数在属于当前线程的指定窗口里设置鼠标捕获
          return false
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
@import url("./css/index.less");
@import url("./css/order.less");
</style>