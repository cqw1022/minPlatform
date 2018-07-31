const axios = require('axios');
const qs = require('qs');
let service = {
  lexjList : function (data,sessionId) {
    let headers ={'Content-Type':'application/json;charset=UTF-8'}
    if(sessionId){
      headers.Cookie = sessionId;
    }
    return axios({
      url:`/lexj/collection/list.htm`,
      method: "GET",
      headers:headers,
      params:data
    })
  },
  productList : function (data,sessionId) {
    let headers ={'Content-Type':'application/json;charset=UTF-8'}
    if(sessionId){
      headers.Cookie = sessionId;
    }
    return axios({
      url:`/commodityCollect/collection/list.htm`,
      method: "GET",
      headers:headers,
      params:data
    })
  }
};
module.exports=service