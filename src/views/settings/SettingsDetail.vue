<template>
  <div class="detail rollbar">
    {{ settings }}
    <hr/>
    <form>
      <div>
        产品ID: <input v-model="settings.instId" disabled/>
      </div>
      <!--  遍历 settings.bars  处理分析周期  -->
      <div class="bars-container">
        分析周期:
        <ol v-for="(val, index) in bars" class="bar-item">
          <li>
            <input type="checkbox"
                   v-model="settings.bars"
                   v-bind:value="val.code"
                   v-bind:checked="settings.bars.includes(val.code)"/>
            {{ val.name }}<p/>
          </li>
        </ol>
      </div>

      <div>
        目标权重: <input type="number" v-model="settings.targetWeight"/>
      </div>
      <hr/>
      <div>
        计算指标:
        <ol v-for="(val,index) in indicators">
          <li>
            <input type="checkbox"
                   @change="updateCalculateSettingsFaceMap(val.code, $event.target.checked)"
                   v-bind:value="val.code"
                   v-bind:checked="val.code in settings.calculateSettingsFaceMap"/>
            {{ val.name }}<p/>
          </li>
        </ol>
      </div>
      <hr/>

      <div id="macd" v-show="isShow('MACD')" class="settings">
        <!-- 分析周期选择 -->
        <div class="header">
          <h1>MACD</h1>

          <select v-model="currentPeriod['MACD']" @change="handlePeriodChange">
            <!--            <template v-for="bar in this.settings.bars">-->
            <!--              <option :value="bar.code"> {{ bar.name }}（分析周期）</option>-->
            <!--            </template>-->
            <option value="1m">1分钟（分析周期）</option>
            <option value="5m">5分钟（分析周期）</option>
            <option value="15m">15分钟（分析周期）</option>
          </select>
        </div>

        <!-- 参数输入区域 -->
        <div class="parameters">
          <div class="parameter-row">
            <label>权重: <span class="required">*</span></label>
            <input type="number" v-model="macd().weights" min="1"/>
          </div>
          <div class="parameter-row">
            <label>短周期: <span class="required">*</span></label>
            <input type="number" v-model="macd().shortPeriod" min="1"/>
          </div>
          <div class="parameter-row">
            <label>长周期: <span class="required">*</span></label>
            <input type="number" v-model="macd().longPeriod" min="1"/>
          </div>
          <div class="parameter-row">
            <label>信号周期: <span class="required">*</span></label>
            <input type="number" v-model="macd().signalPeriod" min="1"/>
          </div>
        </div>

        <!-- 策略1 -->
        <div id="macd-strategy1" class="strategy">
          <h2>策略1</h2>
          <div class="parameter-row">
            <label>是否金叉死叉: <span class="required">*</span></label>
            <input name="goldenCrossLine" type="radio" v-model="macd().goldenCrossLine" value="false" @change=""/>
            <label>否</label>
            <input type="radio" v-model="macd().goldenCrossLine" value="true" />
            <label>是</label>
          </div>
        </div>

        <!-- 策略2 -->
        <div id="macd-strategy2" class="strategy">
          <h2>策略2</h2>
          <div class="parameter-row">
            <label>末位计算周期: <span class="required">*</span></label>
            <input type="number" v-model="macd().lastPeriod" min="1"/>
          </div>
          <div class="parameter-row">
            <label>最小连续次数: <span class="required">*</span></label>
            <input type="number" v-model="macd().minContinuityCount" min="1"/>
          </div>
          <div class="parameter-row">
            <label>最大连续次数: <span class="required">*</span></label>
            <input type="number" v-model="macd().maxContinuityCount" min="1"/>
          </div>
        </div>
      </div>

      <p/>
      <button class="test-red">保存</button>
      <button class="test-red">取消</button>

    </form>
  </div>
</template>

<script>
import store from "@/store";

export default {
  name: "SettingDetail",
  props: ["settings"],
  data() {
    return {
      bars: null,
      indicators: null,
      currentPeriod: {'MACD': '1m'},
    }
  },
  methods: {
    handlePeriodChange() {
      console.log(this.currentPeriod);
    },

    updateCalculateSettingsFaceMap(key, check) {
      console.log("计算指标", key, "更新 =>", check)
      if (check) {
        if (!(key in this.settings.calculateSettingsFaceMap)) {
          this.settings.calculateSettingsFaceMap[key] = {enable: true}

        } else {
          this.settings.calculateSettingsFaceMap[key].enable = true
        }
      } else {
        this.settings.calculateSettingsFaceMap[key].enable = false
      }
      console.log(this.settings.calculateSettingsFaceMap)
    },
    isShow(key) {
      if (!(key in this.settings.calculateSettingsFaceMap)) {
        return false
      }
      return this.settings.calculateSettingsFaceMap[key].enable;
    },

    macd() {
      const key = "MACD";
      if (!(key in this.settings.calculateSettingsFaceMap)) {
        return {}
      }
      const val = this.settings.calculateSettingsFaceMap[key];
      console.log("macd", val)
      return val.barSettingsMap[this.currentPeriod[key]];
      // return this.settings.calculateSettingsFaceMap[key];
    }

  },
  mounted() {
    store.dispatch('getBars').then(resp => {
      this.bars = resp;
      // console.log("this.bars: ", this.bars);
    });
    store.dispatch("indicators").then(resp => {
      this.indicators = resp;
      // console.log("this.indicators: ", this.indicators);
    });

    // console.log("SettingDetail mounted", store.getters('bars'));
    // console.log("SettingDetail mounted", this.bars);
  },
  // 监听 this.settings 中属性的变化,
}
</script>

<style scoped lang="css">


.detail {
  /* 整体靠左 */
  text-align: left;
  /*  */
}

input {
  color: red;
  /* 宽度设置80px */
  width: 80px;
}

.bars-container {
  display: flex;
  flex-wrap: wrap; /* 换行 */
  gap: 16px; /* 元素间距 */
}

.bar-item {
  width: calc(20% - 16px); /* 每行 4 个，减去间距 */
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.rollbar {
  text-align: left;
  /* 滚动条设置 */
  overflow-y: auto;
  height: 100%;
  /* 滚动条样式 */
  scrollbar-width: unset;
  scrollbar-color: #888 #f1f1f1;
}

.settings{
  /* 设置边框 */
  border: 1px solid red;
  /* 设置宽度占40% */
  width: 40%;
}

</style>