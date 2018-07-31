const axios = require('axios');
const qs = require('qs');
let service = {
    shareImage: function (query, sessionId) {
        let headers = {'Content-Type': 'application/json;charset=UTF-8'}
        if (sessionId) {
            headers.Cookie = sessionId;
        }
        return axios({
            url: `/relation/v2/templateImage.htm`,
            method: "GET",
            headers: headers,
            params: query
        })
    },
    shareProductImage: function (query, sessionId) {
        let headers = {'Content-Type': 'application/json;charset=UTF-8'}
        if (sessionId) {
            headers.Cookie = sessionId;
        }
        return axios({
            url: `/relation/v2/commoShareImage.htm`,
            method: "GET",
            headers: headers,
            params: query
        })
    },
    relate: function (data, sessionId) {
        let headers = {'Content-Type': 'text/plain;charset=UTF-8'}
        if (sessionId) {
            headers.Cookie = sessionId;
        }
        return axios({
            url: `/relation/v2/contact.htm`,
            method: "post",
            transformRequest: [function () {
                return JSON.stringify(data);
            }],
            headers: headers
        })
    },
    detail: function (sessionId) {
        let headers = {'Content-Type': 'application/json;charset=UTF-8'}
        if (sessionId) {
            headers.Cookie = sessionId;
        }
        return axios({
            url: `/relation/v2/detail.htm`,
            method: "GET",
            headers: headers,
        })

    },
    history: function (data, sessionId) {
        let headers = {'Content-Type': 'application/json;charset=UTF-8'}
        if (sessionId) {
            headers.Cookie = sessionId;
        }
        return axios({
            url: `/extract/v2/histroy.htm`,
            method: "GET",
            headers: headers,
            params: data
        })
    },
    withdraw: function (data, sessionId) {
        let headers = {'Content-Type': 'text/plain;charset=UTF-8'}
        if (sessionId) {
            headers.Cookie = sessionId;
        }
        return axios({
            url: `/extract/v2/sponsor.htm`,
            method: "post",
            transformRequest: [function () {
                return JSON.stringify(data);
            }],
            headers: headers
        })
    },
    fansList: function (data, sessionId) {
        let headers = {'Content-Type': 'application/json;charset=UTF-8'}
        if (sessionId) {
            headers.Cookie = sessionId;
        }
        return axios({
            url: `/relation/v2/fans/list.htm`,
            method: "GET",
            headers: headers,
            params: data
        })
    },
    withdrawDetail: function (id, sessionId) {
        let headers = {'Content-Type': 'application/json;charset=UTF-8'}
        if (sessionId) {
            headers.Cookie = sessionId;
        }
        return axios({
            url: `/extract/v2/detail/${id}.htm`,
            method: "GET",
            headers: headers
        })
    },
    createRelation: function (memberId, sessionId) {
        let headers = {'Content-Type': 'text/plain;charset=UTF-8'}
        if (sessionId) {
            headers.Cookie = sessionId;
        }
        return axios({
            url: `/relation/v2/role.htm`,
            method: "post",
            transformRequest: [function () {
                return JSON.stringify({memberId: memberId});
            }],
            headers: headers
        })
    },
    promoted: function (data, sessionId) {
        let headers = {'Content-Type': 'text/plain;charset=UTF-8'}
        if (sessionId) {
            headers.Cookie = sessionId;
        }
        return axios({
            url: `/memberManage/v2/role.htm`,
            method: "post",
            transformRequest: [function () {
                return JSON.stringify(data);
            }],
            headers: headers
        })
    },
    employInviter: function (memberId, sessionId) {
        let headers = {'Content-Type': 'text/plain;charset=UTF-8'}
        if (sessionId) {
            headers.Cookie = sessionId;
        }
        return axios({
            url: "memberManage/v2/hire.htm",
            method: "post",
            transformRequest: [function () {
                return JSON.stringify({memberId: memberId});
            }],
            headers: headers
        })
    },
    createEmployer: function (sessionId) {
        let headers = {'Content-Type': 'text/plain;charset=UTF-8'}
        if (sessionId) {
            headers.Cookie = sessionId;
        }
        return axios({
            url: "/memberManage/v2/acceptHire.htm",
            method: "post",
            headers: headers
        })
    },
    deleteEmployer: function (sessionId) {
        let headers = {'Content-Type': 'text/plain;charset=UTF-8'}
        if (sessionId) {
            headers.Cookie = sessionId;
        }
        return axios({
            url: "/memberManage/v2/relieveHire.htm",
            method: "post",
            transformRequest: [function () {
            }],
            headers: headers
        })
    }
};
module.exports = service