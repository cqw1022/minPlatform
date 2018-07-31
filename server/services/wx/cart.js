const axios = require('axios');
const qs = require('qs');
let service = {
    //覆盖购物车
    addAllCart: function (data, sessionId) {
        let headers = {'Content-Type': 'text/plain;charset=UTF-8'}
        if (sessionId) {
            headers.Cookie = sessionId;
        }
        return axios({
            url: "/shoppingCart/v2/list.htm",
            method: "POST",
            transformRequest: [function () {
                return JSON.stringify(data);
            }],
            headers: headers
        })
    },
    //添加单个购物车
    addCart: function (skuId, data, sessionId) {
        let headers = {'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'}
        if (sessionId) {
            headers.Cookie = sessionId;
        }
        return axios({
            url: "/shoppingCart/" + skuId + '.htm',
            method: "POST",
            transformRequest: [function () {
                return qs.stringify(data);
            }],
            headers: headers
        })
    },
    addPage:function (data,sessionId) {
        let headers = {'Content-Type': 'text/plain;charset=UTF-8'}
        if (sessionId) {
            headers.Cookie = sessionId;
        }
        return axios({
            url: "/shoppingCart/v2/list.htm",
            method: "POST",
            transformRequest: [function () {
                return JSON.stringify(data);
            }],
            headers: headers
        })
    },
    //删除单个购物车
    deleteCart: function (cartId, sessionId) {
        let headers = {'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'}
        if (sessionId) {
            headers.Cookie = sessionId;
        }
        return axios({
            method: "DELETE",
            url: '/shoppingCart/' + cartId + '.htm',
            headers: headers
        });
    },
    deleteCarts: function (data, sessionId) {
        let headers = {'Content-Type': 'text/plain;charset=UTF-8'};
        if (sessionId) {
            headers.Cookie = sessionId;
        }
        return axios({
            url: '/shoppingCart.htm',
            method: "DELETE",
            transformRequest: [function () {
                return JSON.stringify(data);
            }],
            headers: headers
        })
    },
    //修改单个购物车
    modifyCart: function (data, sessionId) {
        let headers = {'Content-Type': 'text/plain;charset=UTF-8'}
        if (sessionId) {
            headers.Cookie = sessionId;
        }
        return axios({
            method: "PUT",
            url: '/shoppingCart/cover.htm',
            transformRequest: [function () {
                //在这里根据自己的需求改变数据
                return JSON.stringify(data);
            }],
            headers: headers
        });
    },
    modifyAllCart: function (data, sessionId) {
        let headers = {'Content-Type': 'text/plain;charset=UTF-8'}
        if (sessionId) {
            headers.Cookie = sessionId;
        }
        return axios({
            method: "PUT",
            url: '/shoppingCart/v2/cover.htm',
            transformRequest: [function () {
                //在这里根据自己的需求改变数据
                console.log(data)
                return JSON.stringify(data);
            }],
            headers: headers
        });
    },
    //获取所有购物车
    getAllCart: function (query, sessionId) {
        let headers = {'Content-Type': 'application/json;charset=UTF-8'}
        if (sessionId) {
            headers.Cookie = sessionId;
        }
        if (query) {
            return axios({
                method: "GET",
                url: `/shoppingCart/ids.htm`,
                params: query,
                headers: headers
            });
        } else {
            return axios({
                method: "GET",
                url: '/shoppingCart.htm',
                headers: headers
            });
        }
    },
    getCartGroup: function (query, sessionId) {
        let headers = {'Content-Type': 'application/json;charset=UTF-8'}
        if (sessionId) {
            headers.Cookie = sessionId;
        }
        if (query) {
            return axios({
                method: "GET",
                url: `/shoppingCart/ids.htm`,
                params: query,
                headers: headers
            });
        } else {
            return axios({
                method: "GET",
                url: '/shoppingCart/v2/user.htm',
                headers: headers
            });
        }
    },
    //根据获取购物车详情
    getInfo: function (skuId, sessionId) {
        let headers = {'Content-Type': 'application/json;charset=UTF-8'}
        if (sessionId) {
            headers.Cookie = sessionId;
        }
        return axios({
            method: "GET",
            url: '/shoppingCart/info.htm',
            params: {
                commodityPriceIds: skuId
            },
            headers: headers
        });
    },
    getCartGroupInfo:function (skuId) {
        let headers = {'Content-Type': 'application/json;charset=UTF-8'}
        return axios({
            method: "GET",
            url: '/shoppingCart/v2/commodityPriceId.htm',
            params: {
                commodityPriceIds: skuId
            },
            headers: headers
        });
    }
};
module.exports = service;
