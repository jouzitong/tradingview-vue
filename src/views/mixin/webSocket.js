export const webSocketMixin = {
  data() {
    return {
      isWebsock: false,
      upList: [],
      downList: [],
      marksData: [], //标记数组
      limit: 10,
      websockTime: '', //心跳
      tempUid: Math.random().toString(36).substr(2, 10), //随机uid
    }
  },
  created() {},
  methods: {
    /**
     * 获取推送数据 （取一个值就好）
     * e {string} load=加载 get=获取
     */
    webSocket(e) {
      const self = this
      if (e == 'load') {
        if (typeof WebSocket === 'undefined') {
          alert('您的浏览器不支持socket')
        } else {
          try {
            console.log('进入websocket...try')
            self.websock.close()
            this.isWebsock = false
          } catch (e) {
            console.log('websocket...异常', e)
          }
          // 实例化socket
          self.websock = new WebSocket(self.wsUrl)
          // 监听socket连接
          self.websock.onopen = self.websockOpen
          // 监听socket错误信息
          self.websock.onerror = self.websockError
          // 监听socket消息
          self.websock.onmessage = self.websockMessage
          // 关闭socket
          self.websock.onclose = self.websockClose
        }
      }
    },
    //链接状态
    websockOpen(e) {
      const self = this
      this.websockClose()
      console.log('socket连接成功', e)
      if (this.websockTime) {
        clearInterval(this.websockTime)
      }
      this.isWebsock = true
      this.tempUid = Math.random().toString(36).substr(2, 10)
      this.websockSend()
      setTimeout(function () {
        self.websockHeartbeat()
      }, 1000)
    },
    //发送消息
    websockSend(msg) {
      const self = this
      console.log('进去了啊，发送消息', msg)
      if (msg) {
        if (this.isWebsock) {
          self.websock.send(msg)
        }
      } else {
        let tempObj = {
          opCode: 1003, //开始订阅数据操作码: 1003 //	// 请求推送数据操作码: 1004
          msg: '请求订阅数据',
          args: [
            {
              channel: 'tickers',
              trend: 'up/down',
              limit: 200,
              interval: 3000,
            },
          ],
        }
        self.websock.send(JSON.stringify(tempObj))
      }
    },
    //错误
    websockError(e) {
      // console.log(e)
      console.log('连接错误', e)
      this.websockClose()
    },
    //监听返回消息
    websockMessage(msg) {
      const self = this
      let setInt = null
      let res = JSON.parse(msg.data)
      console.log('收到消息', msg)
      if (res.code == 0) {
        // this.leftData
        if (res.data && res.data.length > 0) {
          this.leftData = res.data
          // res.data.forEach((item) => {
          //   if (item.trend == 'UP') {
          //     self.upList = item.data
          //   } else if (item.trend == 'DOWN') {
          //     self.downList = item.data
          //   }
          // })
          // console.log(self.activeIndex, 'activeIndex')
          // if (self.activeIndex == 0) {
          //   this.leftData = self.upList
          // } else {
          //   this.leftData = self.downList
          // }
        }
      } else {
        this.$message(res.msg)
      }
    },
    //心跳
    websockHeartbeat() {
      const self = this
      self.websockTime = setInterval(function () {
        // self.websockSend(JSON.stringify({ ping: new Date().getTime() }));
        self.websockSend('ping')
      }, 30 * 1000)
    },
    //连接关闭
    websockClose() {
      console.log('socket已经关闭')
      clearInterval(this.websockTime)
      this.isWebsock = false
    },
  },
}
