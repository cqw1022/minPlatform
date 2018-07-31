const axios = require('axios');
const qs = require('qs');
let service = {
  ownCoupon:function(sessionId) {
    let headers ={'Content-Type':'application/json;charset=UTF-8'}
    if(sessionId){
      headers.Cookie = sessionId;
    }
    return axios({
      url:'/coupon/member.htm',
      method:'get',
      headers: headers
    })
  },
  list : function (type,data,sessionId) {
    let headers ={'Content-Type':'application/json;charset=UTF-8'}
    if(sessionId){
      headers.Cookie = sessionId;
    }
    return axios({
      url:`/coupon/list/${type}.htm`,
      method:'get',
      headers: headers,
      params:data
    })
  },
  activity:function (data,sessionId) {
    let headers ={'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
    if(sessionId){
      headers.Cookie = sessionId;
    }
    return axios({
      url: "/coupon/v/obtain.htm",
      method: "POST",
      transformRequest: [function() {
        return qs.stringify(data);
      }],
      headers:headers
    })
  }
};
module.exports=service;