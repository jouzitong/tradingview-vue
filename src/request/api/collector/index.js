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
        return $http.get(`/platform/api/v1/historyData/file/download?instId=${instId}&bar=${bar}`);
    },

    /**
     * k 线数据存储 同步所有的产品文件
     */
    kStoreFileSyncAll: function () {
        return $http.get(`/platform/api/v1/historyData/file/download/all`);
    },

    /**
     * 产品信息订阅
     */
    subInst: function (id) {
        return $http.get(`/collector/api/v1/mark-prices/sub/${id}`);
    },

    /**
     * 产品信息订阅
     */
    unsubInst: function (id) {
        return $http.get(`/collector/api/v1/mark-prices/unsub/${id}`);
    },

    /**
     * 获取 Public 通道状态
     */
    getChannelState: function () {
        return $http.get(`/collector/api/v1/mark-prices/channel/state/public`);
    },

    /**
     * 重新连接 Public 通道
     */
    reconnectPublicChannel: function () {
        return $http.get(`/collector/api/v1/mark-prices/channel/reconnect/public`);
    },



    /**
     * 获取所有已经订阅了的产品列表
     */
    getSubInstList: function () {
        return $http.get(`/collector/api/v1/mark-prices/subInstList`);
    },


}

export default api

