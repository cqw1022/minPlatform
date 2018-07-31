const axios = require('axios');
const qs = require('qs');
let service = {
    addOrder: function (mode, type, data, sessionId) {
        let headers = {'Content-Type': 'text/plain;charset=UTF-8'}
        if (sessionId) {
            headers.Cookie = sessionId;
        }
        return axios({
            url: `/order/v4/${mode}/${type}.htm`,
            method: "POST",
            transformRequest: [function () {
                return JSON.stringify(data);
            }],
            headers: headers
        })
    },
    getInfo: function (orderId, sessionId) {
        let headers = {'Content-Type': 'application/json;charset=UTF-8'}
        if (sessionId) {
            headers.Cookie = sessionId;
        }
        return axios({
            url: `/order/info/${orderId}.htm`,
            method: "GET",
            headers: headers
        })
    },
    getInfo2: function (orderId, sessionId) {
        let headers = {'Content-Type': 'application/json;charset=UTF-8'}
        if (sessionId) {
            headers.Cookie = sessionId;
        }
        return axios({
            url: `/order/v2/info/${orderId}.htm`,
            method: "GET",
            headers: headers
        })
    },
    deliveryTime: function () {
        return axios({
            url: `/order/deliveryTimeType.htm`,
            method: "GET"
        })
    },
    orderList: function (type, data, sessionId) {
        let headers = {'Content-Type': 'application/json;charset=UTF-8'}
        if (sessionId) {
            headers.Cookie = sessionId;
        }
        return axios({
            url: `/order/lists/${type}.htm`,
            method: "GET",
            headers: headers,
            params: data
        })
    },
    orderList2: function (type, data, sessionId) {
        let headers = {'Content-Type': 'application/json;charset=UTF-8'}
        if (sessionId) {
            headers.Cookie = sessionId;
        }
        return axios({
            url: `/order/v2/lists/${type}.htm`,
            method: "GET",
            headers: headers,
            params: data
        })
    },
    cancelOrder: function (id, sessionId) {
        let headers = {'Content-Type': 'text/plain;charset=UTF-8'}
        if (sessionId) {
            headers.Cookie = sessionId;
        }
        return axios({
            url: '/order.htm',
            method: "PUT",
            transformRequest: [function () {
                return JSON.stringify({id: id, status: 1});
            }],
            headers: headers
        })
    },
    deleteOrder: function (id, sessionId) {
        let headers = {'Content-Type': 'text/plain;charset=UTF-8'}
        if (sessionId) {
            headers.Cookie = sessionId;
        }
        return axios({
            url: `/order/${id}.htm`,
            method: "DELETE",
            headers: headers
        })
    },
    productList: function (id, sessionId) {
        let headers = {'Content-Type': 'application/json;charset=UTF-8'}
        if (sessionId) {
            headers.Cookie = sessionId;
        }
        return axios({
            url: `/soItem/list/${id}.htm`,
            method: "GET",
            headers: headers
        })
    },
    recieve: function (id, sessionId) {
        let headers = {'Content-Type': 'text/plain;charset=UTF-8'}
        if (sessionId) {
            headers.Cookie = sessionId;
        }
        return axios({
            url: `/soItem/receipt/${id}.htm`,
            method: "PUT",
            headers: headers
        })
    },
    chooseData: function () {
        return axios({
            url: `/order/v2/chooseData.htm`,
            method: "GET"
        })
    },
    virtual: function () {
        return axios({
            url: `/disCountCode/v2/data.htm`,
            method: "GET"
        })
    },
    count: function (sessionId) {
        let headers = {'Content-Type': 'application/json;charset=UTF-8'}
        if (sessionId) {
            headers.Cookie = sessionId;
        }
        return axios({
            url: `/order/v2/soMemberPageData.htm`,
            method: "get",
            headers: headers
        })
    }
};
module.exports = service;
