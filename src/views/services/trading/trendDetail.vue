<template>
  <div class="detail">
    <h1>趋势详情 {{ instId }}
      <el-button type="success" @click="getTrendDetail(instId)">刷新</el-button>
    </h1>
    <div>
      {{ trendDetail }}
    </div>
<!--    <div v-if="trendDetail!=null">
      <h1>整体趋势: {{ trendDetail.trend }}</h1>
      <div>
        <h2>技术指标:</h2>
        <div v-for="(indicatorMap, bar, index) in trendDetail.indicatorTrendMap" :key="index"
             style="margin-bottom: 20px;">
          &lt;!&ndash; 显示 IndicatorType &ndash;&gt;
          <h2>Bar: {{ bar }}</h2>
          <ul>
            &lt;!&ndash; 遍历内部的 Bar 和 TrendType &ndash;&gt;
            <li v-for="(trend, indicator, subIndex) in indicatorMap" :key="subIndex">
              indicator: {{ indicator }}, Trend: {{ trend }}
            </li>
          </ul>
        </div>
      </div>
    </div>-->
  </div>
</template>

<script>
export default {
  props: ["instId"],

  data() {
    return {
      // 定时任务ID
      intervalId: null,
      trendDetail: null,
    };
  },

  methods: {

    getTrendDetail(id) {
      if (id == null) {
        return;
      }
      this.$http.trading.trendDetail(id).then(resp => {
        console.log("获取趋势:", resp.data)
        if (resp.code === 0) {
          this.trendDetail = resp.data;
        }
      })
    },
  },
  mounted() {
    console.log("请求趋势")
    // 启动定时任务，5秒请求一次
    this.getTrendDetail(this.instId); // 初次调用
    this.intervalId = setInterval(() => {
      this.getTrendDetail(this.instId);
    }, 5000);
  },
  beforeDestroy() {
    console.log("请求趋势")
    // 清除定时器
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  },

}

</script>

<style scoped lang="less">

</style>