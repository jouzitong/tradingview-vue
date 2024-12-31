<!--
 * @Author: kexiao 3493821365@qq.com
 * @Date: 2024-08-04 12:21:54
 * @LastEditors: kexiao 3493821365@qq.com
 * @LastEditTime: 2024-11-02 16:19:21
 * @FilePath: /tradingview-vue/src/views/Home.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by ${git_name_email}, All Rights Reserved. 
-->
<template>
  <div class="content">
    <div>
      <button @click="showSettings=true">配置</button>
      <button>停止</button>
      <button>下一个</button>
    </div>
    <!-- 移动端 -->
    <s-tradingview
        v-if="!isPC"
        :marketName="instConfig"
        :marketId="marketId"
        :wsUrl="wsUrl"
        :decimal="decimal"
        class="tradingviewView"
    />
    <!-- pc端 -->
    <s-tradingview-pc
        ref="tradingviewPc"
        v-else
        :marketName="instConfig"
        :marketId="marketId"
        :wsUrl="wsUrl"
        :decimal="decimal"
        class="tradingviewView"
    />

    <div v-if="showSettings">
      <div class="settingsForm">
        <el-form :model="instConfig" label-width="100px">
          <div class="settingsForm-content">
            <el-form-item label="产品ID">
              <el-select v-model="instConfig.instId"
                         filterable
                         placeholder="请输入关键词搜索"
                         :clearable="true">
                <el-option
                    v-for="item in instIds"
                    :key="item"
                    :label="item"
                    :value="item"/>
              </el-select>
            </el-form-item>
            <el-form-item label="时间周期">
              <el-select v-model="instConfig.bar" placeholder="请选择">
                <el-option
                    v-for="item in bars"
                    :key="item.code"
                    :label="item.name"
                    :value="item.code"/>
              </el-select>
            </el-form-item>

            <el-form-item label="上下文配置">
              <el-input
                  type="text"
                  v-model="settingsContextInput"
                  @input="handleInput"
              ></el-input>
              <el-button @click="showSettingsDetail=true" style="color: red; background-color: #0a8415">配置上下文
              </el-button>
            </el-form-item>

            <!-- 时间选择器 -->
            <el-form-item label="开始时间">
              <el-date-picker
                  v-model="instConfig.startTime"
                  type="date"
                  placeholder="选择日期"
                  format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd"
                  size="small"
                  style="width: 150px;"
              />
            </el-form-item>

            <el-form-item label="结束时间">
              <el-date-picker
                  v-model="instConfig.endTime"
                  type="date"
                  placeholder="选择日期"
                  format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd"
                  size="small"
                  style="width: 150px;"
              />
            </el-form-item>

            <el-form label-width="120px">
              <el-form-item label="是否自动推送">
                <el-switch
                    v-model="instConfig.autoPush"
                    active-text="开启"
                    inactive-text="关闭"
                    active-color="green"
                    inactive-color="red"
                />
              </el-form-item>
            </el-form>
            <el-form-item label="数据推送间隔">
              <el-input type="number" v-model="instConfig.interval"></el-input>
            </el-form-item>
            <el-form-item label="数据推送限制">
              <el-input type="number" v-model="instConfig.limit"></el-input>
            </el-form-item>
          </div>
          <div class="settingsForm-tail">
            <el-form-item>
              <el-button type="primary" style="color: red" @click="submitForm">提交</el-button>
              <el-button type="primary" style="color: red" @click="showSettings = false">取消</el-button>
            </el-form-item>
          </div>
        </el-form>

      </div>
    </div>

    <div class="settingsDetail" v-if="showSettingsDetail">
      <SettingDetail
          :settings="instConfig.settingsContext"
          :can-update="true"
          :applyAll="localSaveSettingsContext"
          :save="localSaveSettingsContext"/>
      <!--      <el-button @click="showSettingsDetail=false">保存</el-button>-->
    </div>

  </div>

</template>

<script>

import store from "@/store";
import SettingDetail from "@/views/components/settings/SettingsDetail.vue";


export default {
  name: "home",
  components: {SettingDetail},
  data() {
    return {
      showSettings: true,
      showSettingsDetail: false,
      isPC: true,
      marketId: this.$route.query.marketId,
      marketName: this.$route.query.marketName,
      decimal: this.$route.query.decimal,
      wsUrl: process.env.VUE_APP_WS_URL,
      instConfig: {
        uid: 'TEST',
        instId: '',
        bar: '1H',
        startTime: '2024-08-01',
        endTime: null,
        settingsContext: null,
        autoPush: true,
        interval: 1000,
        limit: 100,
      },
      settingsContextInput: null,
      instIds: [],
    }
  },

  methods: {
    submitForm() {
      console.log("提交表单")
      this.showSettings = false;
      this.$refs.tradingviewPc.sendMsg();
    },
    handleInput(value) {
      this.settingsContextInput = value;
      try {
        // 尝试解析为 JSON 对象
        const parsed = JSON.parse(value);
        this.instConfig.settingsContext = parsed;
        console.log("解析成功：", parsed);
      } catch (error) {
        console.warn("输入的内容不是有效的 JSON 格式：", error.message);
      }
    },

    localSaveSettingsContext() {
      this.showSettingsDetail = false;
      this.settingsContextInput = JSON.stringify(this.instConfig.settingsContext);
    },

    getDefaultSettings() {
      this.$http.settings.getDefaultSettings().then(resp => {
        if (resp.code === 0) {
          this.instConfig.settingsContext = resp.data;
        }
      })
    },

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
      // document.writeln("您的浏览设备为：")
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
    }
  },

  created() {
    // this.isCheckPC()
    if (this.isCheckPC()) {
      this.isPC = true
    } else {
      this.isPC = false
    }
    this.getDefaultSettings();
  },
  computed: {
    bars() {
      return store.getters.bars;
    },
  },
  beforeMount() {
    this.$http.instruments.instIds().then(resp => {
      if (resp.code === 0) {
        this.instIds = resp.data;
      }
    });
  },
}
</script>
<style lang="scss" scoped>
.tradingviewView {
  height: 100vh;
  width: 100vw;
}

.settingsForm {
  /* 绝对定位 在中心, 长=页面60%, 宽度=页面60% */
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 20%;
  height: 60%;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

  .settingsForm-content {
    height: 80%;

  }

  .settingsForm-content .el-input,
  .settingsForm-content .el-select {
    width: 200px;
    /*  */
  }

  .settingsForm-content .el-form-item {
    margin-bottom: 16px;
  }
}

button {
  color: red;
}

.settingsDetail {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 70%;
  height: 80%;
  background-color: #000000;
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

</style>