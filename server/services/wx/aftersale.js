const axios = require('axios');
const qs = require('qs');
let service = {
    waitList: function (id, sessionId) {
        let headers = {'Content-Type': 'application/json;charset=UTF-8'}
        if (sessionId) {
            headers.Cookie = sessionId;
        }
        return axios({
            url: `/order/info/${id}.htm`,
            method: "GET",
            headers: headers
        })
    },
    waitList2: function (id, sessionId) {
        let headers = {'Content-Type': 'application/json;charset=UTF-8'}
        if (sessionId) {
            headers.Cookie = sessionId;
        }
        return axios({
            url: `/order/v2/info/${id}.htm`,
            method: "GET",
            headers: headers
        })
    },
    deliveryList: function (id, sessionId) {
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
    returnProduct: function (type, data, sessionId) {
        let headers = {'Content-Type': 'text/plain;charset=UTF-8'}
        if (sessionId) {
            headers.Cookie = sessionId;
        }
        return axios({
            url: `/soReturn/return/${type}.htm`,
            method: "POST",
            transformRequest: [function () {
                return JSON.stringify(data);
            }],
            headers: headers
        })
    },
    recordList: function (data, sessionId) {
        let headers = {'Content-Type': 'application/json;charset=UTF-8'}
        if (sessionId) {
            headers.Cookie = sessionId;
        }
        return axios({
            url: `/soReturn/list.htm`,
            method: "GET",
            headers: headers,
            params: data
        })
    },
    recordForServer: function (orderId, logisticsId, sessionId) {
        let headers = {'Content-Type': 'application/json;charset=UTF-8'}
        if (sessionId) {
            headers.Cookie = sessionId;
        }
        return axios({
            url: `/soReturn/list/${orderId}/${logisticsId || 0}.htm`,
            method: "GET",
            headers: headers
        })
    },
    progress: function (serverId, sessionId) {
        let headers = {'Content-Type': 'application/json;charset=UTF-8'}
        if (sessionId) {
            headers.Cookie = sessionId;
        }
        return axios({
            url: `/soReturn/info/${serverId}.htm`,
            method: "GET",
            headers: headers
        })
    },
    logistics: function (logisticsId, sessionId) {
        let headers = {'Content-Type': 'application/json;charset=UTF-8'}
        if (sessionId) {
            headers.Cookie = sessionId;
        }
        return axios({
            url: `/soItem/logisticsInfo/${logisticsId}.htm`,
            method: "GET",
            headers: headers
        })
    }
};
module.exports = service