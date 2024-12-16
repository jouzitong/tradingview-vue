<template>
  <div id="app" class="calendar-app">
    <div class="calendar-container">
      <!-- 日历组件 -->
      <Calendar @date-selected="onDateSelected" />

      <!-- 日志展示组件 -->
      <LogList :logs="logs" />
    </div>
  </div>
</template>

<script>
import Calendar from "./components/Calendar.vue";
import LogList from "./components/LogList.vue";

export default {
  name: "App",
  components: {
    Calendar,
    LogList,
  },
  data() {
    return {
      logs: [], // 日志数据
    };
  },
  methods: {
    onDateSelected(date) {
      // 模拟从 API 获取对应日期的日志数据
      this.logs = this.fetchLogsForDate(date);
    },
    fetchLogsForDate(date) {
      // 假设这里是日志的模拟数据
      const logData = {
        "2024-12-16": ["日志 1：完成 Vue 日历开发", "日志 2：学习 Vue 组件传值"],
        "2024-12-17": ["日志 1：优化 Nginx 配置"],
      };
      return logData[date] || ["暂无日志"];
    },
  },
};
</script>

<style scoped>
.calendar-app {
  display: flex;
  flex-direction: row;
  width: 100%;
}

.calendar-container {
  display: flex;
  flex: 1;
  border: 1px solid #ddd;
}
</style>