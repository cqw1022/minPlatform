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
    info: function (data, sessionId) {
        let headers = {'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'}
        if (sessionId) {
            headers.Cookie = sessionId;
        }
        return axios({
            url: '/member/v2/wxLogin.htm',
            method: 'POST',
            transformRequest: [function () {
                return qs.stringify(data);
            }],
            headers: headers
        })
    },
    info3: function (data, sessionId) {
        let headers = {'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'}
        if (sessionId) {
            headers.Cookie = sessionId;
        }
        return axios({
            url: '/member/v3/wxLogin.htm',
            method: 'POST',
            transformRequest: [function () {
                return qs.stringify(data);
            }],
            headers: headers
        })
    },
    getInfo: function (sessionId) {
        let headers = {'Content-Type': 'application/json;charset=UTF-8'}
        if (sessionId) {
            headers.Cookie = sessionId;
        }
        return axios({
            url: '/member/info.htm',
            method: 'GET',
            headers: headers
        })
    },
    unionId: function () {
        let headers = {'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'}
        if (sessionId) {
            headers.Cookie = sessionId;
        }
        return axios({
            url: '/member/wxLogin.htm',
            method: 'POST',
            transformRequest: [function () {
                return qs.stringify(data);
            }],
            headers: headers
        })
    },
    verify: function (data, sessionId) {
        let headers = {'Content-Type': 'application/json;charset=UTF-8'}
        if (sessionId) {
            headers.Cookie = sessionId;
        }
        return axios({
            url: '/member/phoneVerifications.htm',
            method: 'GET',
            params: data,
            headers: headers
        })
    },
    bindPhone: function (data, sessionId) {
        let headers = {'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'}
        if (sessionId) {
            headers.Cookie = sessionId;
        }
        return axios({
            url: '/member/PhoneVerifications.htm',
            method: 'POST',
            transformRequest: [function () {
                return qs.stringify(data);
            }],
            headers: headers
        })
    },
    addressAdd: function (data, sessionId) {
        let headers = {'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'}
        if (sessionId) {
            headers.Cookie = sessionId;
        }
        return axios({
            url: '/deliveryAddress.htm',
            method: 'POST',
            transformRequest: [function () {
                return qs.stringify(data);
            }],
            headers: headers
        })
    },
    addressList: function (sessionId) {
        let headers = {'Content-Type': 'application/json;charset=UTF-8'}
        if (sessionId) {
            headers.Cookie = sessionId;
        }
        return axios({
            url: '/deliveryAddress.htm',
            method: 'get',
            params: {},
            headers: headers
        })
    },
    addressGet: function (addressId, sessionId) {
        let headers = {'Content-Type': 'application/json;charset=UTF-8'}
        if (sessionId) {
            headers.Cookie = sessionId;
        }
        if (addressId == 0) {
            return axios({
                url: `/deliveryAddress/default.htm`,
                method: 'get',
                params: {},
                headers: headers
            })
        } else {
            return axios({
                url: `/deliveryAddress/${addressId}.htm`,
                method: 'get',
                params: {},
                headers: headers
            })
        }
    },
    addressDelete: function (addressId, sessionId) {
        let headers = {'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'}
        if (sessionId) {
            headers.Cookie = sessionId;
        }
        return axios({
            url: `/deliveryAddress/${addressId}.htm`,
            method: 'DELETE',
            headers: headers
        })
    },
    addressModify: function (data, sessionId) {
        let headers = {'Content-Type': 'text/plain;charset=UTF-8'}
        if (sessionId) {
            headers.Cookie = sessionId;
        }
        return axios({
            url: `/deliveryAddress.htm`,
            method: 'PUT',
            transformRequest: [function () {
                return JSON.stringify(data);
            }],
            headers: headers
        })
    },
    type: function (sessionId) {
        let headers = {'Content-Type': 'application/json;charset=UTF-8'}
        if (sessionId) {
            headers.Cookie = sessionId;
        }

        return axios({
            url: "/member/type.htm",
            method: 'get',
            params: {},
            headers: headers
        })
    },
    latelyAddress: function (sessionId) {
        let headers = {'Content-Type': 'application/json;charset=UTF-8'}
        if (sessionId) {
            headers.Cookie = sessionId;
        }
        return axios({
            url: "/deliveryAddress/lately.htm",
            method: 'get',
            params: {},
            headers: headers
        })
    },
    getZhima: function (sessionId) {
        let headers = {'Content-Type': 'application/json;charset=UTF-8'}
        if (sessionId) {
            headers.Cookie = sessionId;
        }
        return axios({
            url: "/member/v2/identity/briefScore.htm",
            method: 'get',
            params: {},
            headers: headers
        })
    },
    zhimaVerify: function (data, sessionId) {
        let headers = {'Content-Type': 'text/plain;charset=UTF-8'}
        if (sessionId) {
            headers.Cookie = sessionId;
        }
        return axios({
            url: `/member/v2/identity/code.htm`,
            method: "POST",
            transformRequest: [function () {
                return JSON.stringify(data);
            }],
            headers: headers
        })
    },
    identify: function (data, sessionId) {
        let headers = {'Content-Type': 'text/plain;charset=UTF-8'}
        if (sessionId) {
            headers.Cookie = sessionId;
        }
        return axios({
            url: `/member/v2/identity/verify.htm`,
            method: "POST",
            transformRequest: [function () {
                return JSON.stringify(data);
            }],
            headers: headers
        })
    }
};
module.exports = service