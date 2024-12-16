import $http from '@/request';

let api = {
    /**
     * 获取系统状态
     */
    systemState: function () {
        return $http.get('/platform/pri/api/v1/trading/system/state');
    },

    /**
     * 获取系统状态
     */
    tradingSettings: function (id) {
        return $http.get(`/platform/pri/api/v1/trading/settings/${id}`);
    },

}

export default api