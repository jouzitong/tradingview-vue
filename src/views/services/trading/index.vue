<template>
  <div>
    <h1>
      量化交易服务
      <el-switch
          v-model="status"
          @change="(val)=>{handleSwitchChange(val)}"
          inactive-text="异常" inactive-color="red"
          active-text="正常" active-color="green"
      />
    </h1>
    <div>
    </div>
    <div class="container">
      <div class="container-top"></div>
      <div class="container-main">
        <div class="left container">
          <tradingList :items="items" :chooseInst="chooseInst"/>
        </div>
        <div class="left-drag">
        </div>

        <div class="main container" v-if="chooseInstId!=null">
          <div>
            <el-button type="info" @click="isShowSettings=true">配置详情</el-button>
            <el-button type="info" @click="isShowSettings=false">技术分析</el-button>
          </div>
          <div v-if="!isShowSettings" >
            <TrendDetail :instId="chooseInstId" @changeKey="changeKey"/>
          </div>
<!--          <div v-if="isShowSettings">
            <SettingsDetail :settings="settings" :can-update="false"/>
          </div>-->
        </div>
        <div class="main-drag">
        </div>

      </div>
    </div>

  </div>
</template>

<script>

import tradingList from "@/views/services/trading/list.vue";
import SettingsDetail from "@/views/components/settings/SettingsDetail.vue";
import TrendDetail from "@/views/services/trading/trendDetail.vue";

export default {
  name: "trading",
  components: {SettingsDetail, tradingList, TrendDetail},
  data() {
    return {
      /* 系统状态 */
      status: false,
      key:0,
      items: [],
      chooseInstId: null,
      settings: null,
      trendDetail: null,
      isShowSettings: true,
    }
  },

  methods: {
    changeKey(val){
      this.key = val
      console.log(val,"更新key")
    },
    chooseInst(instId) {
      this.chooseInstId = instId;

      this.getSettingsDetail(this.chooseInstId);
    },

    getTradingState() {
      this.$http.trading.systemState().then(resp => {
        console.log(resp)
        if (resp.code === 0) {
          this.status = resp.data;
        } else {
          this.status = false;
        }
      })
    },


    handleSwitchChange(enable) {
      console.log("点击状态变更: ", enable)
      if (enable) {
        this.$confirm('确定是否禁用程序运?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.trading.systemOn().then(resp => {
            if (resp.code === 0) {
              this.status = resp.data
            } else {
              this.status = false
            }
          })
        }).catch(
        )
      } else {
        this.$http.trading.systemOff().then(resp => {
          if (resp.code === 0) {
            this.status = resp.data
          } else {
            this.status = false
          }
        })
      }
    },

    getList() {
      this.$http.trading.list().then(resp => {
        console.log("获取量化交易运行产品集合: ", resp.data)
        if (resp.code === 0) {
          this.items = resp.data;
        }
      })
    },
    getSettingsDetail(instId) {
      this.$http.trading.tradingSettings(instId).then(resp => {
        if (resp.code === 0) {
          this.settings = resp.data;
        } else {
          this.$message.error("获取配置详情异常:", resp);
        }
      });
    }
  },
  mounted() {
    this.getTradingState();
    this.getList();
  },
}
</script>

<style scoped lang="less">
@import url("./../../css/index.less");
@import url("./../../css/order.less");

/* 写一个显示边框的样式 */
.container {
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

</style>