export const webSocketMixin = {
    data() {
        return {
            isWebsock: false,
            arrayData: [],
            marksData: [], //标记数组
            limit: 10,
            websockTime: '', //心跳
            tempUid: Math.random().toString(36).substr(2, 10), //随机uid
        }
    },
    created() {
    },
    methods: {
        /**
         * 获取推送数据 （取一个值就好）
         * e {string} load=加载 get=获取
         */
        webSocket(e) {
            const self = this
            if (e === 'load') {
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
                    self.websock.send(JSON.stringify(msg))
                }
            } else {
                // let tempObj = {
                //     opCode: 1003, //开始订阅数据操作码: 1003 //	// 请求推送数据操作码: 1004
                //     msg: '请求订阅数据',
                //     data: {
                //         uid: this.tempUid, //客户端唯一标识, 例如 mac地址"ACD-ASX-123S-AXS"
                //         instId: 'CRV-USDT-SWAP', //交易对名称, 例如 BTC-USDT
                //         limit: this.limit, //	限制数量, 默认为1000
                //         autoPush: true, //是否自动推送，默认true
                //         bar: self.interval, //15m,30m,1h,1d 默认1d
                //     },
                // }
                // self.websock.send(
                //     JSON.stringify(tempObj)
                //     // JSON.stringify({
                //     //     req: "contractkline",
                //     //     sub: `contract:KLineData:${self.marketName}:kline_${$lodash.find(self.tabsArr, { resolution: self.interval }).websockSend}_${self.marketId}`,
                //     // })
                //     // JSON.stringify({
                //     //   req: "currency",
                //     //   sub: `trade:kline:KLineData_kline_${
                //     //     $lodash.find(self.tabsArr, { resolution: self.interval })
                //     //       .websockSend
                //     //   }_${self.marketId}`,
                //     // })
                // )
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
            if (msg.data === 'pong') {
                return;
            }
            let res = JSON.parse(msg.data)
            if (res.opCode == 1003) {
                // 2003表示请求订阅成功，开始请求推送K线数据
                // 就请求推送数据
                // self.websockSend(JSON.stringify({opCode:1004,
                //   data: {
                //     uid: this.tempUid,//客户端唯一标识, 例如 mac地址"ACD-ASX-123S-AXS"
                //     // instId: "BTC-USDT-SWAP",//交易对名称, 例如 BTC-USDT
                //     // limit: 1000,//	限制数量, 默认为1000
                //     // autoPush: false //是否自动推送，默认true
                //   }})); //请求推送数据操作码: 1004
            }
            if (res.opCode !== 3004) return // 3004表示推送K线数据
            if (this.arrayData.length >= 8000) {
                // TODO:当数据超过一定长度时，把前面的数据截掉，放新的推送数据
                this.arrayData.splice(0, this.limit)
            }
            if (Array.isArray(res.data.dataList)) {
                // if (res.data.dataList) {
                // let arrayData = []
                res.data.dataList.map((item) => {
                    this.arrayData.push({
                        time: Number(item.data[0]), //item.data[0] * 1000
                        open: Number(item.data[1]),
                        close: Number(item.data[2]),
                        low: Number(item.data[3]),
                        high: Number(item.data[4]),
                        // volume: Number(item.order),
                        // 1. time: number UTC 时区的毫秒单位时间戳。time对于日K线的时间应为00:00 UTC(而非交易时段的开始时间)。图表库讲根据商品信息中的交易时段调整时间。每个月K线的时间是该月的第一个交易日，且无时间部分。
                        // 2. open: number K线开盘价
                        // 3. high: number K线最高价
                        // 4. low: number K线最低价
                        // 5. close: number K线收盘价
                        // 6. volume: number K线交易量
                        // time: Number(item.Date * 1000),
                        // close: Number(item.Close),
                        // open: Number(item.Open),
                        // high: Number(item.High),
                        // low: Number(item.Low),
                        // volume: Number(item.Volume),
                    })
                    if (item.orders && item.orders.length) {
                        //id，time,color,text,label,labelFontColor,minSize
                        // item.order
                        // function getData(n) {
                        //   let now = new Date(n),
                        //     y = now.getFullYear(),
                        //     m = now.getMonth() + 1,
                        //     d = now.getDate();
                        //   return y + "-" + (m < 10 ? "0" + m : m) + "-" + (d < 10 ? "0" + d : d) + " " + now.toTimeString().substr(0, 8);
                        // }
                        // getData(1642583223751) //'2022-01-19 17:07:03'

                        let orderArray = item.orders
                        // console.log(orderArray, '订单数')
                        orderArray.forEach((el) => {
                            this.marksData.push({
                                id: el.ordId, //item.data[0] * 1000
                                time: el.cTime,
                                color: 'white',
                                text: el.px, //弹出式文字
                                label: el.side, //标记文字
                                labelFontColor: '#fff',
                                minSize: '14',
                            })
                        })
                        // this.marksData.push({
                        //   id: item.orders[0].ordId, //item.data[0] * 1000
                        //   time: item.orders[0].cTime,
                        //   color: 'white',
                        //   text: item.orders[0].px, //弹出式文字
                        //   label: item.orders[0].side, //标记文字
                        //   labelFontColor: '#fff',
                        //   minSize: '16',
                        // })
                    }
                })
                if (typeof this.onLoadedCallback == 'function') {
                    // console.log('回调函数进入1', this.onLoadedCallback)
                    self.onLoadedCallback(this.arrayData)
                    // self.onDataCallback(this.marksData)
                } else {
                    console.log('回调函数进入2', this.onLoadedCallback)
                    setInt = setInterval(() => {
                        if (typeof this.onLoadedCallback == 'function') {
                            self.onLoadedCallback(this.arrayData)
                            clearInterval(setInt)
                        }
                    }, 100)
                }
                if (typeof this.onDataedCallback == 'function') {
                    // console.log('回调函数进入1', this.onLoadedCallback)
                    // self.onLoadedCallback(this.arrayData)
                    self.onDataedCallback(this.marksData)
                } else {
                    //
                }
                // console.log('回调函数进入3', this.onLoadedCallback)
                // self.$nextTick(() => {
                //   self.onLoadedCallback(arrayData);
                // });
            } else {
                console.log('数据格式不正确', res.data.dataList.data)
                if (!res.hasOwnProperty('pong')) {
                    try {
                        self.onRealtimeCallback({
                            time: Number(res.Date * 1000),
                            close: Number(res.Close),
                            open: Number(res.Open),
                            high: Number(res.High),
                            low: Number(res.Low),
                            volume: Number(res.Volume),
                        })
                    } catch (e) {
                    }
                }
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
