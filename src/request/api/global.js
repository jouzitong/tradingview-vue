import $http from '@/request';

let api = {
    /**
     * 获取全局枚举
     */
    enums: function () {
        return $http.get('/platform/api/v1/global/enums');
    },
}

export default api