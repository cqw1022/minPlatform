const axios = require('axios');
const qs = require('qs');
let service = {
  toPay:function (data,sessionId) {
    let headers ={'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
    if(sessionId){
      headers.Cookie = sessionId;
    }
    return axios({
      url:'/onlinePay/weixin/getSignInfo.htm',
      method:'POST',
      transformRequest : [function () {
        return qs.stringify(data);
      }],
      headers: headers
    })
  }
};
module.exports=service