/**
 * JS API
 */
// 文档参考：https://www.bookstack.cn/read/tradingViewWikiCn/book-JS-Api.md
class datafeeds {
  /**
   * JS API
   * @param {*Object} vue vue实例
   */
  constructor(vue) {
    this.self = vue
    //this.barsUpdater = new dataUpdater(this)
  }

  /**
   * @param {*Function} callback  回调函数
   * `onReady` should return result asynchronously.
   */
  onReady(callback) {
    return new Promise((resolve, reject) => {
      let configuration = this.defaultConfiguration()
      if (this.self.getConfig) {
        configuration = Object.assign(
          this.defaultConfiguration(),
          this.self.getConfig()
        )
      }
      resolve(configuration)
    }).then((data) => callback(data))
  }

  /**
   * 搜索商品
   * @param {*String} userInput  用户在商品搜索框中输入的文字。
   * @param {*String} exchange 请求的交易所（由用户选择）。空值表示没有指定
   * @param {*String} symbolType  请求的商品类型：指数、股票、外汇等等（由用户选择）。空值表示没有指定。
   * @param {*Function} onResultReadyCallback 提供一个匹配用户搜索的商品列表
   */
  searchSymbols(userInput, exchange, symbolType, onResultReadyCallback) {}

  /**
   * 作用：通过商品名称解析商品信息
   * @param {*String} symbolName  商品名称或ticker
   * @param {*Function} onSymbolResolvedCallback 成功回调
   * @param {*Function} onResolveErrorCallback   失败回调
   * `resolveSymbol` should return result asynchronously.
   */
  resolveSymbol(symbolName, onSymbolResolvedCallback, onResolveErrorCallback) {
    return new Promise((resolve, reject) => {
      let symbolInfo = this.defaultSymbol()
      if (this.self.getSymbol) {
        symbolInfo = Object.assign(
          this.defaultSymbol(),
          this.self.getSymbol(symbolName)
        )
      }
      resolve(symbolInfo)
    })
      .then((data) => onSymbolResolvedCallback(data))
      .catch((err) => onResolveErrorCallback(err))
  }

  /**
   * 用途：通过日期范围获取历史K线数据。图表库希望通过onHistoryCallback(onDataCallback)仅一次调用，接收所有的请求历史。而不是被多次调用。
   * @param {*Object} symbolInfo  商品信息对象
   * @param {*String} resolution  分辨率(时间周期)
   * @param {*Number} rangeStartDate  时间戳、最左边请求的K线时间
   * @param {*Number} rangeEndDate  时间戳、最右边请求的K线时间
   * @param {*Function} onDataCallback  回调函数
   * @param {*Function} onErrorCallback  回调函数
   */
  getBars(
    symbolInfo,
    resolution,
    rangeStartDate,
    rangeEndDate,
    onDataCallback,
    onErrorCallback
  ) {
    const onLoadedCallback = (data) => {
      data && data.length
        ? onDataCallback(data, {
            noData: false,
          })
        : onDataCallback([], {
            noData: true,
          })
    }
    this.self.getBars(
      symbolInfo,
      resolution,
      rangeStartDate,
      rangeEndDate,
      onLoadedCallback
    )
  }

  getMarks(
    symbolInfo,
    rangeStartDate,
    rangeEndDate,
    onDataCallback,
    resolution
  ) {
    const onDatedCallback = (data) => {
      if (data && data.length) {
        onDataCallback(data)
      } else {
        onDataCallback([])
      }
    }

    // 调用你的实际数据获取函数
    this.self.getMarks(
      symbolInfo,
      rangeStartDate,
      rangeEndDate,
      onDatedCallback,
      resolution
    )
    // const onDataedCallback = (data) => {
    //   data && data.length
    //     ? onDataCallback(data, {
    //         noData: false,
    //       })
    //     : onDataCallback([], {
    //         noData: true,
    //       })
    // }
    // this.self.getMarks(
    //   symbolInfo,
    //   rangeStartDate,
    //   rangeEndDate,
    //   onDataCallback,
    //   resolution
    // )
  }

  /**
   * 订阅K线数据。图表库将调用onRealtimeCallback方法以更新实时数据
   * @param {*Object} symbolInfo 商品信息
   * @param {*String} resolution 分辨率
   * @param {*Function} onRealtimeCallback 回调函数
   * @param {*String} subscriberUID 监听的唯一标识符
   * @param {*Function} onResetCacheNeededCallback (从1.7开始): 将在bars数据发生变化时执行
   */
  subscribeBars(
    symbolInfo,
    resolution,
    onRealtimeCallback,
    subscriberUID,
    onResetCacheNeededCallback
  ) {
    //this.barsUpdater.subscribeBars(symbolInfo, resolution, onRealtimeCallback, subscriberUID, onResetCacheNeededCallback)
    this.self.subscribeBars(
      symbolInfo,
      resolution,
      onRealtimeCallback,
      subscriberUID,
      onResetCacheNeededCallback
    )
  }

  /**
   * 取消订阅K线数据，在调用subscribeBars方法时,图表库将跳过与subscriberUID相同的对象。
   * @param {*String} subscriberUID 监听的唯一标识符
   */
  unsubscribeBars(subscriberUID) {
    //this.barsUpdater.unsubscribeBars(subscriberUID)
  }

  /**
   * 默认配置
   */
  defaultConfiguration() {
    return {
      supports_search: true,
      supports_group_request: false,
      // 支持的周期数组，周期可以是数字或字符串。 如果周期是一个数字，它被视为分钟数。字符串可以是“*D”(Days)，“*W”(Weeks)，“_M”(Months)（_的意思是任何数字）
      supported_resolutions: [
        '1',
        '5',
        '15',
        '30',
        '60',
        '1D',
        '2D',
        '3D',
        '1W',
        '1M',
      ],
      supports_marks: true, //布尔值来标识您的 datafeed 是否支持在K线上显示标记
      supports_timescale_marks: true, //标识您的 datafeed 是否支持时间刻度标记。
      supports_time: true, //此设置为true假如您的datafeed提供服务器时间（unix时间）。 它仅用于在价格刻度上显示倒计时。
    }
  }

  /**
   * 默认商品信息
   */
  defaultSymbol() {
    return {
      name: 'BTCUSDT', //商品名称。您的用户将看到它(作为一个字符串)。 此外，如果您不使用tickers，它将用于数据请求。
      full_name: 'BTCUSDT',
      timezone: 'Asia/Shanghai', //商品的交易所时区
      minmov: 1, //最小波动
      minmov2: 0,
      pointvalue: 1,
      fractional: false,
      session: '24x7', //商品交易时间
      has_intraday: true, //显示商品是否具有日内（分钟）历史数据。 如果它为false，则当图表中的该商品处于活动状态时，日内周期的所有按钮将被禁用。 如果设置为true，则由datafeed直接提供的所有周期必须在intraday_multipliers数组中设定。
      has_no_volume: false, //表示商品是否拥有成交量数据。
      description: 'BTCUSDT', //商品说明。这个商品说明将被打印在图表的标题栏中。
      pricescale: 100000000,
      ticker: 'BTCUSDT', //它是您的商品体系中此商品的唯一标识符。如果您指定此属性，则其值将用于所有数据请求，ticker如果未明确指定，则被视为等于symbol.(译者注：请一定指定ticker，如果没有ticker可以将symbol赋值给ticker，未指定ticker时会发生错误。)
      intraday_multipliers: ['1', '5', '15', '30', '60'],
      supported_resolutions: [
        '1',
        '5',
        '15',
        '30',
        '60',
        '1D',
        '2D',
        '3D',
        '1W',
        '1M',
      ],
    }
  }
}

export default datafeeds
