import Vue from 'vue'
import Vuex from 'vuex'
import global from '@/request/api/global';

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        enumsMap: new Map(),
        globalData: null, // 全局参数
    },
    mutations: {
        updateEnumsMap(state, data) {
            state.enumsMap = data; // 更新全局状态
        },
    },
    actions: {
        fetchEnumsMap({commit}) {
            // console.log("获取全局枚举参数")
            try {
                global.enums().then(response => {
                    if (response.code === 0) {
                        // console.log("全局枚举参数", response.data.data);
                        const data = new Map(Object.entries(response.data.data));
                        commit('updateEnumsMap', data);
                    }
                })
            } catch (error) {
                console.error('Failed to fetch global data:', error);
            }
        },
        getBars() {
            return this.state.enumsMap.get('bars');
        },
        indicators() {
            return this.state.enumsMap.get('indicators');
        }
    },
    getters: {
        bars: (state) => {
            return state.enumsMap?.get('bars') || null; // 便于组件访问
        },
        getEnums: (state, key) => {
            return state.enumsMap.get(key); // 便于组件访问
        }
    },
    modules: {},

})
