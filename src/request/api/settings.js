import $http from '@/request';

let api = {
    /**
     * 请求配置列表
     */
    settingsListApi: function () {
        return $http.get('/api/v1/settings/list');
    },
    /**
     * 请求配置详情
     */
    settingsDetailApi: function (id) {
        return $http.get(`/api/v1/settings/${id}`);
    },

    /**
     * 请求配置更新
     */
    settingsUpdateApi: function (data) {
        return $http.post(`/api/v1/settings`, data);
    },

    /**
     * 应用所有的配置
     */
    applyAll: function (data) {
        return $http.post(`/api/v1/settings/applyAll`, data);
    }
}

export default api