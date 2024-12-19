import $http from '@/request';

let api = {

    /**
     * 获取系统状态
     */
    systemState: function () {
        return $http.get('/collector/api/v1/systems/state');
    },

    systemOn: function () {
        return $http.post(`/collector/api/v1/systems/on`);
    },

    systemOff: function () {
        return $http.post(`/collector/api/v1/systems/off`);
    },

    /**
     * 开始收集所有的历史数据
     */
    startCollectAll: function () {
        return $http.get(`/collector/api/v1/kline/start`);
    },

    /**
     * 开始收集指定产品的历史数据
     */
    startCollectByInstId: function (instId) {
        return $http.get(`/collector/api/v1/kline/collect/${instId}`);
    },

    /**
     * k 线数据存储的产品列表
     */
    kStoreInstList: function () {
        return $http.get(`/collector/api/v1/kStores/list`);
    },

    /**
     * k 线数据存储 同步
     */
    kStoreFileSync: function (instId, bar) {
        return $http.get(`/platform//api/v1/historyData/file/download?instId=${instId}&bar=${bar}`);
    },

}

export default api

