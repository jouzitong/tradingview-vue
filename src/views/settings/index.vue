<template>
  <div class="container">
    <div class="container-top"></div>
    <div class="container-main">
      <div class="left container">
        <SettingsList :items="items" :chooseInst="chooseInst"/>
      </div>
      <div class="left-drag"></div>
      <div class="main container">
        <SettingsDetail :settings="settings" :save="updateSettings" :apply-all="applyAll" :can-update="true"/>
      </div>
      <div class="main-drag">
      </div>

    </div>
  </div>

</template>

<script>
import SettingsList from "@/views/settings/list.vue";
import SettingsDetail from "@/views/components/settings/SettingsDetail.vue";

export default {
  name: "Settings",
  components: {
    SettingsList,
    SettingsDetail,
  },
  data() {
    return {
      instId: 'BTC',
      items: [
        {
          instId: 'BTC',
          /* 能否自动下单 */
          "enablePlace": true,
        },
        {
          instId: 'ETH',
          /* 能否自动下单 */
          "enablePlace": false,
        }
      ],
      settings: {}
    }
  },
  methods: {
    updateSettings() {
      console.log("保存: ", this.settings);
      this.$http.settings.settingsUpdateApi(this.settings).then(resp => {
        if (resp.code === 0) {
          this.$message({
            message: '保存成功',
            type: 'success'
          });
          console.log("响应成功：", resp)
        } else {
          console.log("响应失败：", resp);
        }
      })
    },
    applyAll() {
      console.log("保存: ", this.settings);
      this.$http.settings.applyAll(this.settings).then(resp => {
        if (resp.code === 0) {
          this.$message({
            message: '保存成功',
            type: 'success'
          });
          console.log("响应成功：", resp)
        } else {
          console.log("响应失败：", resp);
        }
      })
    },

    chooseInst(instId) {
      this.instId = instId;
      this.settings.instId = instId;
      this.$http.settings.settingsDetailApi(instId).then(resp => {
        if (resp.code === 0) {
          this.settings = resp.data;
        } else {
          console.log("响应失败：", resp);
        }
      })
    },
    getList() {
      this.$http.settings.settingsListApi().then(resp => {
        if (resp.code === 0) {
          this.items = resp.data;
        } else {
          console.log("响应失败：", resp);
        }
      })

    }
  },

  mounted() {
    this.getList();
  }

}

</script>

<style scoped lang="less">
@import url("./../css/index.less");
@import url("./../css/order.less");

/* 写一个显示边框的样式 */
.container {
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

</style>