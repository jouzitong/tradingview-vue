<template>
<div>
  <h2>订阅产品</h2>
  <div class="search-and-add">
    <el-input
        v-model="searchQuery"
        placeholder="搜索产品ID或币种"
        size="medium"
    ></el-input>
    <el-button type="primary" size="medium" @click="showAddProductDialog">新增产品</el-button>
  </div>

  <div class="product-list">
    <div
        v-for="(product, index) in filteredProductList"
        :key="index"
        class="product-card"
    >
      <h3>{{ product.instId }}</h3>
      <p><strong>币种:</strong> {{ product.ccy }}</p>
      <el-button type="primary" size="medium" @click="syncInstFile(product.instId, '1m')">同步1分钟数据</el-button>
    </div>
  </div>

</div>
</template>

<script>

</script>

<style scoped lang="scss">

</style>