<template>
  <div class="detail">
    <h1>趋势详情 {{ instId }}
      <el-button type="success" @click="getTrendDetail(instId)">刷新</el-button>
    </h1>
    <div>
      趋势对象:
      {{ trendDetail }}
    </div>
    <div v-if="trendDetail!=null">
      <h1>整体趋势: {{ trendDetail.trend }}</h1>
      <div>
        <h2>技术指标:</h2>
        <div v-for="(indicatorMap, bar, index) in trendDetail.indicatorTrendMap" :key="index"
             style="margin-bottom: 20px;">
          <!-- 显示 IndicatorType -->
          <h2>Bar: {{ bar }}</h2>
          <ul>
            <!-- 遍历内部的 Bar 和 TrendType -->
            <li v-for="(trend, indicator, subIndex) in indicatorMap" :key="subIndex">
              indicator: {{ indicator }}, Trend: {{ trend }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["instId"],

  data() {
    return {
      // 定时任务ID
      flashKey:0,
      intervalId: null,
      trendDetail: {
        indicatorTrendMap:{},
        instId:'',
        trend:''
      },
    };
  },
watch:{
  instId:{
    handler(val){
      this.flashKey++
      console.log(val,"props 接受的值,instId===>")
        this.getTrendDetail(val); // 初次调用
    },
    immediate:true
  }
},
  computed:{
    calcTrend(){
      if(this.trendDetail){
        return this.trendDetail
      }else{
        return "+++"
      }
    }
  },
  methods: {

    getTrendDetail(id) {
      console.log(this.trendDetail,"123+++++")
      if (id == null) {
        return;
      }
      this.$http.trading.trendDetail(id).then(resp => {
        console.log("获取趋势:", resp.data);
        // if (resp.code === 0) {
        // this.$set(this, 'trendDetail', resp.data);
        //
        this.trendDetail = {...this.trendDetail,...resp.data};
        // this.$emit('changeKey',this.flashKey)
          // this.$set(this,'trendDetail',resp.data)

        console.log(this.trendDetail,"+++++",this.trendDetail.instId);
        // }
      })
    },
  },
  created() {
    console.log("请求趋势11")
  },
  mounted() {
    console.log("请求趋势");
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