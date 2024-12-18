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

    /**
     * 获取产品配置
     * @param id
     * @returns {Promise<AxiosResponse<any>>}
     */
    trendDetail: function (id) {
        return $http.get(`/trading/api/v1/trading/trendDetail/${id}`);
    },

    /**
     * 获取产品配置
     */
    addById: function (id) {
        return $http.post(`/platform/pri/api/v1/trading/${id}`);
    },

    /**
     * 更新同步配置
     */
    updateSyncSettings: function (id) {
        return $http.put(`/platform/pri/api/v1/trading/${id}`);
    },

    /**
     * 删除产品配置
     */
    deleteById: function (id) {
        return $http.delete(`/platform/pri/api/v1/trading/${id}`);
    },

}

export default api