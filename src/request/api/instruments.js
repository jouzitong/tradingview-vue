import $http from '@/request';

let api = {
    /**
     * 请求配置列表
     */
    instIds: function () {
        return $http.get('/platform/api/v1/instruments/swap/list');
    },
}

export default api