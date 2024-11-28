/*
 * @Author: kexiao 3493821365@qq.com
 * @Date: 2024-08-04 12:21:54
 * @LastEditors: kexiao 3493821365@qq.com
 * @LastEditTime: 2024-11-02 16:49:12
 * @FilePath: /tradingview-vue/src/main.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '../src/assets/style/element-variables.scss'
import App from './App.vue'
import router from './router'
import store from './store'

//移动端调试器  需要使用 直接解开注释
// import Vconsole from 'vconsole'
// const vConsole = new Vconsole()
// Vue.use(vConsole)
// 请求
import http from '@/request/api'
//mock数据模拟
import '@/request/mock'
//移动端适配
import 'lib-flexible'
// vant按需引入 & 无需在页面中注册组件
import {Loading, Tab, Tabs} from 'vant'
//自定义组件无需注册组件
import '@/components/index.js'

Vue.prototype.$http = http
Vue.use(Tab).use(Tabs).use(Loading)
// 去除谷歌浏览器 “passive” 警告
// import 'default-passive-events';
//阻止启动生产消息，常用作指令
Vue.config.productionTip = false

// store.dispatch('fetchEnumsMap'); // 页面刷新时请求数据

Vue.use(ElementUI, {size: 'middle', zIndex: 3000})
new Vue({
    router,
    store,
    render: (h) => h(App),
}).$mount('#app');


