import $http from '@/request';

let api = {
    /**
     * 获取系统状态
     */
    systemState: function () {
        return $http.get('/trading/api/v1/systems/state');
    },

    systemOn: function () {
        return $http.post(`/trading/api/v1/systems/on`);
    },

    systemOff: function () {
        return $http.post(`/trading/api/v1/systems/off`);
    },

    list: function () {
        return $http.get(`/trading/api/v1/trading/list`);
    },

    /**
     * 获取产品配置
     */
    tradingSettings: function (id) {
        return $http.get(`/trading/api/v1/trading/settings/${id}`);
    },

}

export default api