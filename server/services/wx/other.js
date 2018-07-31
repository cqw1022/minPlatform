const axios = require('axios');
const qs = require('qs');
let service = {
    session: function (data) {
        return axios({
            url: '/member/wxAuthorization.htm',
            method: "POST",
            transformRequest: [function () {
                return qs.stringify(data);
            }]
        })
    },
    encrypted: function (data, sessionId) {
        let headers = {'Content-Type': 'application/json;charset=UTF-8'}
        if (sessionId) {
            headers.Cookie = sessionId;
        }
        return axios({
            url: `/member/encryptedData.htm`,
            method: "get",
            headers: headers,
            params: data
        })
    },
    setFormId: function (data, sessionId) {
        let headers = {'Content-Type': 'text/plain;charset=UTF-8'}
        if (sessionId) {
            headers.Cookie = sessionId;
        }
        return axios({
            url: `/member/addFormId.htm`,
            method: "POST",
            transformRequest: [function () {
                return JSON.stringify(data);
            }],
            headers: headers
        })
    },
    appRule:function (sessionId) {
        let headers = {'Content-Type': 'application/json;charset=UTF-8'}
        if (sessionId) {
            headers.Cookie = sessionId;
        }
        return axios({
            url: `/member/manageInfo.htm`,
            method: "get",
            headers: headers
        })
    },
    statistics:function (data, sessionId) {
        let headers = {'Content-Type': 'text/plain;charset=UTF-8'}
        if (sessionId) {
            headers.Cookie = sessionId;
        }
        return axios({
            url: `/infoAcqui/v2/acqui.htm`,
            method: "POST",
            transformRequest: [function () {
                return JSON.stringify(data);
            }],
            headers: headers
        })
    }
};
module.exports = service