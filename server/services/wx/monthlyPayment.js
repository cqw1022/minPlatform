const axios = require('axios');
const qs = require('qs');

const service = {
    monthlyPaymentList:function (data,sessionId) {
        let headers ={'Content-Type':'application/json;charset=UTF-8'}
        if(sessionId){
            headers.Cookie = sessionId;
        }
        return axios({
            url: `/order/v2/installment.htm`,
            method: "GET",
            headers:headers,
            params:data
        })
    },
    monthlyPaymentInfo:function (id,sessionId) {
        let headers ={'Content-Type':'application/json;charset=UTF-8'}
        if(sessionId){
            headers.Cookie = sessionId;
        }
        return axios({
            url: `/order/v2/installmentInfo/${id}.htm`,
            method: "GET",
            headers:headers
        })
    },
    pay:function (orderId,type,data,sessionId) {
        let headers ={'Content-Type':'text/plain;charset=UTF-8'}
        if(sessionId){
            headers.Cookie = sessionId;
        }
        return axios({
            url: `/soInstallment/v2/installmentPay/${orderId}/${type}.htm`,
            method: "POST",
            transformRequest: [function() {
                return JSON.stringify(data);
            }],
            headers:headers
        })
    }
}

module.exports=service;