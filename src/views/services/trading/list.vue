<template>
  <div>
    <div class="list">
      <div>
        <h1>运行产品列表
          <el-button type="success" @click="isForm=true">新增</el-button>
        </h1>
      </div>
      <ol v-for="(inst, index) in items" :key="index">
        <li>
        <span class="test-box-show" @click="chooseInst(inst.instId)">{{ inst.instId }}
           <button class="sync-button" @click="delInst(inst.instId)">删除</button>

          <el-switch v-model="inst.enablePlaceOrder"
                     @change="(val)=>{handleSwitchChange(val,inst,index)}"
                     active-text="开" active-color="green"
                     inactive-text="关" inactive-color="red"/>
        </span>
        </li>
      </ol>
      <div v-show="isForm" class="addForm">
        <div>
          <el-select v-model="addInstId"
                     filterable
                     placeholder="请输入关键词搜索"
                     :clearable="true">
            <el-option
                v-for="item in instIds"
                :key="item"
                :label="item"
                :value="item"/>
          </el-select>
          <el-button @click="addInst(addInstId)">新增</el-button>
          <el-button @click="isForm=false">取消</el-button>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  name: "SettingsList",
  data() {
    return {
      isForm: false,
      instIds: [],
      addInstId: '',
    }
  },
  props: [
    "items",
    "chooseInst"
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
                  this.items[index].enablePlaceOrder = true
              this.$http.settings.enablePlaceOrder(this.items[index].instId, true)
            }
        ).catch(
            //     取消事件
            //     console.log("quxiao 取消");
            this.items[index].enablePlaceOrder = false
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
    getInstIdList() {
      this.$http.instruments.instIds().then(resp => {
        if (resp.code === 0) {
          // 过滤 resp.data 中包含 items 中包含的元素
          this.instIds = resp.data.filter(id => !this.items.some(item => item.instId === id));
          // this.instIds = resp.data;
        } else {
          console.log("响应失败：", resp);
        }
      });
    },
    addInst(id) {
      // TODO 临时添加的逻辑
      let instId = id;
      if (!id.includes("-")) {
        instId = id + "-USDT-SWAP";
      }

      this.$http.trading.addById(instId).then(resp => {
        if (resp.code === 0) {
          this.isForm = false;
          this.$message.success("添加成功");
          this.getInstIdList();
        } else {
          this.$message.error("添加失败");
        }
      })
    },
    delInst(id) {
      // TODO 临时添加的逻辑
// TODO 临时添加的逻辑
      let instId = id;
      if (!id.includes("-")) {
        instId = id + "-USDT-SWAP";
      }
      this.$confirm('确定停止运行产品, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        //     确认
        this.$http.trading.deleteById(instId).then(resp => {
          if (resp.code === 0) {
            this.$message.success("添加成功");
            this.getInstIdList();
          } else {
            this.$message.error("添加失败");
          }
        })
      });
    },
  },
  created() {
    this.getInstIdList();
  },
}
</script>


<style scoped lang="css">
@import url("./../../css/test.less");

.addForm {
  /* 绝对定位 在中心, 长=页面60%, 宽度=页面60% */
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 20%;
  height: 20%;
  background-color: #1c2030;
  border: 1px solid #1c2030;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  color: #d1e1f8;
}

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
  background-color: red;
}

</style>