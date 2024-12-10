import $http from '@/request';

let api = {
    /**
     * 请求配置列表
     */
    settingsListApi: function () {
        return $http.get('/platform/api/v1/settings/list');
    },
    /**
     * 请求配置详情
     */
    settingsDetailApi: function (id) {
        return $http.get(`/platform/api/v1/settings/${id}`);
    },

    /**
     * 请求配置更新
     */
    settingsUpdateApi: function (data) {
        return $http.post(`/platform/api/v1/settings`, data);
    },

    /**
     * 开/关自动下单功能 API
     * @param id
     * @param enable
     */
    enablePlaceOrder: function (id, enable) {
        return $http.post(`/platform/api/v1/settings/${id}/${enable}`);
    },

    /**
     * 同步产品配置
     */
    syncSettings: function (id) {
        return $http.post(`/platform/api/v1/settings/syncSettings/${id}`);
    },

    /**
     * 同步所有配置
     */
    syncAllSettings: function () {
        return $http.post(`/platform/api/v1/settings/syncAllSettings`);
    },


    /**
     * 应用所有的配置
     */
    applyAll: function (data) {
        return $http.post(`/platform/api/v1/settings/applyAll`, data);
    }
}

export default api