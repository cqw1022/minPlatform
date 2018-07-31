const axios = require('axios');
let service = {
    getInfo: function (sessionId) {
        let headers = {'Content-Type': 'application/json;charset=UTF-8'}
        if (sessionId) {
            headers.Cookie = sessionId;
        }
        return axios({
            url: "/relation/v2/cityPartnerDetail.htm",
            method: "GET",
            headers: headers
        })
    },
    fansList:function (role,query,sessionId) {
        let headers = {'Content-Type': 'application/json;charset=UTF-8'}
        if (sessionId) {
            headers.Cookie = sessionId;
        }
        return axios({
            url: `/relation/v2/cityPartnerFansList/${role}.htm`,
            method: "GET",
            params:query,
            headers: headers
        })
    },
    orderList:function (data,sessionId) {
        console.log(data)
        let headers = {'Content-Type': 'application/json;charset=UTF-8'}
        if (sessionId) {
            headers.Cookie = sessionId;
        }
        return axios({
            url: `/profitInfo/v2/cityPartnerSoList.htm`,
            method: "GET",
            params:data,
            headers: headers
        })
    },
    achievement: function (query,sessionId) {
        let headers = {'Content-Type': 'application/json;charset=UTF-8'}
        if (sessionId) {
            headers.Cookie = sessionId;
        }
        return axios({
            url: "/profitInfo/v2/monthList.htm",
            method: "GET",
            params:query,
            headers: headers
        })
    },
};
module.exports = service