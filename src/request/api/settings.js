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
    settingsUpdateApi: function (id) {
        return $http.post(`/api/v1/settings/${id}`);
    },
}

export default api