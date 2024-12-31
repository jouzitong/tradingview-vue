<template>
  <div class="dark-theme-container">
    <!-- 一级菜单 -->
    <div class="menu-bar">
      <el-menu
          :default-active="activeTab"
          mode="horizontal"
          @select="switchTab"
          class="el-menu-dark"
      >
        <el-menu-item index="file-storage">产品订阅</el-menu-item>
        <el-menu-item index="config-management">配置管理</el-menu-item>
      </el-menu>
    </div>

    <!-- 文件存储模块 -->
    <div v-if="activeTab === 'file-storage'" class="tab-content">
      <div class="tab-content-header" style="display: flex">
        <div>
          <h2>文件存储</h2>
        </div>
        <div>
          <el-button @click="init">刷新</el-button>
          <div class="status-light"
               :style="{ backgroundColor: publicChannelState ? 'green' : 'red',
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',}"
               @click="toggleChannelState">
          </div>
        </div>
      </div>


      <!-- 搜索框和新增按钮 -->
      <div class="search-and-add">
        <el-input v-model="searchQuery" placeholder="搜索产品/币种" clearable size="mini" class="search-box"/>
        <el-button type="primary" size="medium" @click="showAddProductDialog">新增产品</el-button>
        <el-button type="primary" size="medium" @click="startCollectAll">收集所有产品</el-button>
        <el-button type="primary" size="medium" @click="syncAllInstFile">同步所有产品</el-button>
      </div>

      <!-- 产品列表 -->
      <div class="file-storage">
        <div
            v-for="(product, index) in filteredProductList"
            :key="index"
            class="file-card"
        >
          <div>
            <h3>{{ product.instId }}
              <template v-if="isSub(product.instId)">
                <el-button style="background-color: green; color: black">已订阅</el-button>
              </template>
              <template v-if="!isSub(product.instId)">
                <el-button
                    style="background-color: red; color: black"
                    @click="subInst(product.instId)"
                >
                  未订阅
                </el-button>
              </template>
            </h3>

          </div>
          <p><strong>币种:</strong> {{ product.ccy }}</p>
          <div class="data-section">
            <div
                class="data-row"
                v-for="(dateInterval, bar) in product.barsDateMap"
                :key="bar"
            >
              <span class="bar-name">{{ bar }}</span>
              <el-date-picker
                  v-model="dateInterval.start"
                  type="month"
                  placeholder="开始时间"
                  format="yyyy-MM"
                  size="mini"
              ></el-date-picker>
              至
              <el-date-picker
                  v-model="dateInterval.end"
                  type="month"
                  placeholder="结束时间"
                  format="yyyy-MM"
                  size="mini"
              ></el-date-picker>
              <el-button
                  type="primary"
                  size="mini"
                  @click="updateBar(product.instId)"
              >更新
              </el-button>
              <el-button
                  type="primary"
                  size="mini"
                  @click="syncInstFile(product.instId, bar)"
              >同步
              </el-button>
            </div>
          </div>
        </div>
      </div>

      <!-- 新增产品对话框 -->
      <el-dialog
          title="新增产品"
          :visible.sync="addProductDialogVisible"
          width="400px"
      >
        <el-form>
          <el-form-item label="产品ID">
            <el-select v-model="newProduct.instId"
                       filterable
                       placeholder="请输入关键词搜索"
                       :clearable="true">
              <el-option
                  v-for="item in allEnableSwapInstIds"
                  :key="item"
                  :label="item"
                  :value="item"/>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="addProductDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="addProduct">确定</el-button>
        </div>
      </el-dialog>
    </div>

    <!-- 配置管理模块 -->
    <div v-if="activeTab === 'config-management'" class="tab-content">
      <h2>配置管理</h2>
      <p>这里是配置管理的内容，可以添加更多功能。</p>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      activeTab: "file-storage", // 当前选中的一级菜单项
      searchQuery: "", // 搜索框绑定的值
      productList: [
        {
          instId: "AGLD-USDT-SWAP",
          barsDateMap: {
            "1m": {
              start: "2021-09",
              end: "2024-12",
            },
          },
          ccy: "AGLD",
        }
      ],
      addProductDialogVisible: false, // 控制新增产品对话框的显示
      newProduct: {
        instId: "",
      },
      subInstList: [],
      allEnableSwapInstIds: [],
      publicChannelState: false,
    };
  },
  computed: {
    // 过滤后的产品列表
    filteredProductList() {
      if (!this.searchQuery) {
        return this.productList;
      }
      return this.productList.filter(
          (product) =>
              product.instId.includes(this.searchQuery) ||
              product.ccy.includes(this.searchQuery)
      );
    },
    // 判断是否订阅了

  },
  methods: {
    // 切换一级菜单
    switchTab(tab) {
      this.activeTab = tab;
    },

    toggleChannelState() {
      // 切换状态
      // this.publicChannelState = !this.publicChannelState;
      this.reconnectPublicChannel();
    },

    /**
     * 是否已订阅
     *
     * @param instId
     * @returns {boolean}
     */
    isSub(instId) {
      return this.subInstList.includes(instId);
    },

    subInst(id) {
      this.$http.collector.subInst(id).then(resp => {
        if (resp.code === 0) {
          this.$message.success("订阅成功");
        } else {
          this.$message.error("订阅失败: " + resp.msg);
        }
      });
    },

    // 显示新增产品对话框
    showAddProductDialog() {
      this.addProductDialogVisible = true;
    },

    startCollectAll() {
      this.$http.collector.startCollectAll().then(resp => {
        if (resp.code === 0) {
          this.$message("操作成功");
        } else {
          this.$message("操作失败: ", resp.msg);
        }
      });
    },

    syncAllInstFile() {
      this.$http.collector.kStoreFileSyncAll();
    },

    // 新增产品方法
    addProduct() {
      console.log("新增产品ID", this.newProduct.instId)
      if (this.newProduct.instId.trim() === "") {
        this.$message.error("产品ID不能为空");
        return;
      }
      // 判断 this.newProduct.instId.trim() 如果不是-USDT-SWAP结尾的, 就拼接该字符串
      if (!this.newProduct.instId.trim().endsWith("-USDT-SWAP")) {
        this.newProduct.instId = this.newProduct.instId.trim() + "-USDT-SWAP";
      }
      this.$http.collector.startCollectByInstId(this.newProduct.instId.trim());
      this.newProduct.instId = ""; // 清空输入框
      this.addProductDialogVisible = false;
    },

    // 更新数据方法
    updateBar(productId) {
      this.$http.collector.startCollectByInstId(productId);
    },

    syncInstFile(id, bar) {
      this.$http.collector.kStoreFileSync(id, bar).then(resp => {
        if (resp.code === 0) {
          this.$message.success("操作成功");
        } else {
          this.$message.error("失败:" + resp.msg);
        }
      })
    },

    getChannelState() {
      this.$http.collector.getChannelState().then(resp => {
        if (resp.code === 0) {
          this.publicChannelState = resp.data;
        } else {
          this.$message.error("失败:" + resp.msg);
        }
      })
    },

    reconnectPublicChannel() {
      this.$http.collector.reconnectPublicChannel().then(resp => {
        if (resp.code === 0) {
          this.$message.success("操作成功, 稍后手动刷新页面")
        } else {
          this.$message.error("失败:" + resp.msg);
        }
      })
    },

    /**
     * 获取已经订阅的列表
     */
    getSubInstList() {
      this.$http.collector.getSubInstList().then(resp => {
        console.log("获取订阅的列表: ", resp.data)
        if (resp.code === 0) {
          this.subInstList = resp.data;
        } else {
          this.$message.error("获取产品订阅列表失败:" + resp.msg);
        }
      });
    },

    /**
     * 获取所有的合约产品ID
     */
    getAllEnableSwapInstIds() {
      this.$http.instruments.instIds().then(resp => {
        console.log("获取所有的合约产品ID: ", resp.data)
        if (resp.code === 0) {
          this.allEnableSwapInstIds = resp.data;
        } else {
          this.$message.error("获取产品订阅列表失败:" + resp.msg);
        }
      });
    },

    /**
     * 获取KStore实例列表
     */
    getKStoreInstList() {
      this.$http.collector.kStoreInstList().then(resp => {
        if (resp.code === 0) {
          this.productList = resp.data;
        } else {
          this.$message.error("失败:" + resp.msg);
        }
      })
    },

    init() {
      this.getSubInstList();
      this.getKStoreInstList();
      this.getAllEnableSwapInstIds();
      this.getChannelState();
    },

  },

  mounted() {
    this.init();
  }

};
</script>

<style scoped>
.search-and-add {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  gap: 10px;
}

.dialog-footer {
  text-align: right;
}

.dark-theme-container {
  background-color: #1e1e2f;
  color: #e0e0e0;
  padding: 20px;
  font-family: Arial, sans-serif;
}

.menu-bar {
  margin-bottom: 20px;
  background-color: #252537;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.3);
}

.el-menu-dark {
  background-color: #252537;
}

.el-menu-item {
  color: #e0e0e0 !important;
}

.el-menu-item.is-active {
  background-color: #1e90ff !important;
  color: white !important;
}

.search-box {
  margin-bottom: 20px;
  width: 300px;
}

.file-storage {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.file-card {
  background-color: #252537;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.3);
  flex: 1 1 calc(33.333% - 20px); /* 三列布局 */
  box-sizing: border-box;
}

.file-card h3 {
  margin-bottom: 10px;
}

.data-row {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.bar-name {
  width: 80px;
  font-size: 14px;
}

/* 状态灯的基本样式 */
.status-light {
  transition: background-color 0.3s ease; /* 动画效果 */
}

.tab-content {
  .tab-content-header {
    display: flex;
    align-items: center; /* 垂直居中 */
    justify-content: center; /* 水平居中 */
    gap: 10px; /* 控制元素之间的间隔 */
  }
}

.el-date-picker {
  margin: 0 10px;
}

.el-button {
  background-color: #1e90ff;
  border: none;
}

.el-button:hover {
  background-color: #0056b3;
}
</style>