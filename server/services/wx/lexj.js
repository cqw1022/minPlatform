const axios = require('axios');
const qs = require('qs');
let service = {
  list:function (data) {
    return axios.get('/lexj/list.htm',{params:data});
  },
  style:function () {
    return axios.get('/lexj/houseStyles.htm',{})
  },
  detail : function (id,sessionId) {
    let headers ={'Content-Type':'application/json;charset=UTF-8'}
    if(sessionId){
      headers.Cookie = sessionId;
    }
    return axios({
      url: `/lexj/detail.htm`,
      method: "GET",
      headers:headers,
      params:{id:id}
    })
  },
  productList:function (id) {
    return axios.get('/lexj/commodities.htm',{params:{lexjId:id}});
  },
  markLexj : function (id,sessionId) {
    let headers ={'Content-Type':'text/plain;charset=UTF-8'}
    if(sessionId){
      headers.Cookie = sessionId;
    }
    return axios({
      url: `/lexj/collection/${id}.htm`,
      method: "POST",
      headers:headers
    })
  },
  cancelMarkLexj : function (id,sessionId) {
    let headers ={'Content-Type':'text/plain;charset=UTF-8'}
    if(sessionId){
      headers.Cookie = sessionId;
    }
    return axios({
      url: `/lexj/collection/${id}.htm`,
      method: "DELETE",
      headers:headers
    })
  },
  appoint:function (id,data,sessionId) {
    let headers ={'Content-Type':'text/plain;charset=UTF-8'}
    if(sessionId){
      headers.Cookie = sessionId;
    }
    return axios({
      url: `/lexj/appointment.htm`,
      method: "POST",
      transformRequest: [function() {
        return JSON.stringify(data);
      }],
      headers:headers
    })
  },
  appointed:function (type,data,sessionId) {
    let headers ={'Content-Type':'application/json;charset=UTF-8'}
    if(sessionId){
      headers.Cookie = sessionId;
    }
    return axios({
      url: `/lexj/appointment/appointed/list/${type}.htm`,
      method: "GET",
      headers:headers,
      params:data
    })
  }
};
module.exports=service