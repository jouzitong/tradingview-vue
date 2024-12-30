<template>
  <div class="list">
    <h1>配置列表
      <button style="font-size: smaller" class="sync-button" @click="syncAllSettings">全部同步</button>
    </h1>
    <!-- 搜索框 -->
    <div style="margin-bottom: 10px; color: red">
      <input
          v-model="searchText"
          type="text"
          placeholder="请输入InstId查询"
          style="width: 200px; padding: 5px; font-size: 14px;"
      />
<!--      <button style="font-size: smaller" class="sync-button" @click="addSettings">新增</button>-->

    </div>
    <ol v-for="(inst, index) in filteredItems" :key="index">
      <li>
        <span class="test-box-show" @click="chooseInst(inst.instId)">{{ inst.instId }}
          <button class="sync-button" @click="syncSettings(inst.instId)">配置同步</button>

          <el-switch v-model="inst.enablePlace"
                     @change="(val)=>{handleSwitchChange(val,inst,index)}"
                     active-text="开" active-color="green"
                     inactive-text="关" inactive-color="red"/>
        </span>
      </li>
    </ol>
  </div>
</template>

<script>
export default {
  name: "SettingsList",
  data() {
    return {
      searchText: '',
    };
  },
  props: [
    "items", "chooseInst"
  ],
  methods: {
    handleSwitchChange(enable, item, index) {
      console.log(item, index, enable)
      if (enable) {
        this.$confirm('此操作将永久删除该传输记录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
              //     确认
              console.log("确认", this.items[index]),
                  this.items[index].enablePlace = true
              this.$http.settings.enablePlaceOrder(this.items[index].instId, true)
            }
        ).catch(
            //     取消事件
            //     console.log("quxiao 取消");
            this.items[index].enablePlace = false
        )
      } else {
        // 关闭逻辑
        this.$http.settings.enablePlaceOrder(this.items[index].instId, false)
      }
    },
    syncSettings(instId) {
      console.log("同步配置: ", instId);
      this.$http.settings.syncSettings(instId);
    },
    syncAllSettings() {
      console.log("同步所有配置");
      this.$http.settings.syncAllSettings();
    },

    addSettings() {

    }

  },
  computed: {
    filteredItems() {
      if (!this.searchText) {
        return this.items; // 如果没有输入搜索内容，返回全部
      }
      // 过滤：instId 包含搜索文本
      return this.items.filter((item) =>
          item.instId.toLowerCase().includes(this.searchText.toLowerCase())
      );
    },
  }
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

.sync-button {
  background-color: green;
}

</style>