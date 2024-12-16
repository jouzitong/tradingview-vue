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
     * 开始收集历史数据
     */
    startCollect: function () {
        return $http.get(`/collector/api/v1/kline/start`);
    },

}

export default api

