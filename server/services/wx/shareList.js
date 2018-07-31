const axios = require('axios');

let service = {
    createShareList:function(data,sessionId){
        let headers = {'Content-Type': 'text/plain;charset=UTF-8'}
        if (sessionId) {
            headers.Cookie = sessionId;
        }
        return axios({
            url: `/shareInventory/v2/collect.htm`,
            method: "POST",
            transformRequest: [function () {
                return JSON.stringify(data);
            }],
            headers: headers
        })
    },
    createShareListDetail:function (data,sessionId) {
        let headers = {'Content-Type': 'text/plain;charset=UTF-8'}
        if (sessionId) {
            headers.Cookie = sessionId;
        }
        return axios({
            url: `/shareInventory/v/shareCart.htm`,
            method: "POST",
            transformRequest: [function () {
                return JSON.stringify(data);
            }],
            headers: headers
        })
    },
    list:function (data,sessionId) {
        let headers ={'Content-Type':'application/json;charset=UTF-8'}
        if(sessionId){
            headers.Cookie = sessionId;
        }
        return axios({
            url:`/shareInventory/v2/list.htm`,
            method: "GET",
            headers:headers,
            params:data
        })
    },
    detail:function (id,data,sessionId) {
        let headers ={'Content-Type':'application/json;charset=UTF-8'}
        if(sessionId){
            headers.Cookie = sessionId;
        }
        return axios({
            url:`/shareInventory/v2/info/${id}.htm`,
            method: "GET",
            headers:headers,
            params:data
        })
    },
    createMarked:function (data,sessionId) {
        let headers = {'Content-Type': 'text/plain;charset=UTF-8'}
        if (sessionId) {
            headers.Cookie = sessionId;
        }
        return axios({
            url: `/shareInventory/v2/collection.htm`,
            method: "POST",
            transformRequest: [function () {
                return JSON.stringify(data);
            }],
            headers: headers
        })
    },
    deleteMarked:function (data,sessionId) {
        let headers = {'Content-Type': 'text/plain;charset=UTF-8'}
        if (sessionId) {
            headers.Cookie = sessionId;
        }
        return axios({
            url: `/shareInventory/v2/cancelCollection.htm`,
            method: "DELETE",
            transformRequest: [function () {
                return JSON.stringify(data);
            }],
            headers: headers
        })
    },
    shareImg:function (data,sessionId) {
        let headers ={'Content-Type':'application/json;charset=UTF-8'}
        if(sessionId){
            headers.Cookie = sessionId;
        }
        return axios({
            url:`/shareInventory/v/inventoryShareImage.htm`,
            method: "GET",
            headers:headers,
            params:data
        })
    }
}

module.exports = service;