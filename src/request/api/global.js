import $http from '@/request';

let api = {
    /**
     * 测试get
     */
    enums: function () {
        return $http.get('/api/v1/global/enums');
    },
}

export default api