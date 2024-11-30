<template>
  <div class="list">
    <h1>配置列表</h1>
    <ol v-for="(inst, index) in items" :key="index">
      <li >
        <span class="test-box-show" @click="chooseInst(inst.instId)" >{{ inst.instId }}
        <span v-if="inst.enablePlace">(开启自动下单)</span>
        </span>
        <!-- TODO 修改展示格式 -->
      </li>
    </ol>
  </div>
</template>

<script>
export default {
  name: "SettingsList",
  props: [
    "items","chooseInst"
  ],
  /*data() {sd
    return {
      items: [
        {
          instId: 'BTC',
          /!* 能否自动下单 *!/
          "enablePlace": false,
        }
      ]
    }
  }*/
}


</script>


<style scoped lang="css">
@import url("./../css/test.less");

.list {
  text-align: left;
  /* 滚动条设置 */
  overflow-y: auto;
  height: 100%;
  /* 滚动条样式 */
  scrollbar-width: thin;
  scrollbar-color: #888 #f1f1f1;
}

.list::-webkit-scrollbar {
  width: 10px;
}

.list::-webkit-scrollbar-track {
  background: #f1f1f1;
}

.list::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 5px;
}

.list::-webkit-scrollbar-thumb:hover {
  background: #555;
}

.test-box-show {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #ccc;
  cursor: pointer;
}

.test-box-show:hover {
  background-color: #f1f1f1;
}

.test-box-show span {
  margin-right: 10px;
}

</style>