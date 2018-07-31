const axios = require('axios');
const qs = require('qs');
let service = {
  info:function (id,sessionId) {
    let headers ={'Content-Type':'application/json;charset=UTF-8'}
    if(sessionId){
      headers.Cookie = sessionId;
    }
    return axios({
      url:`leXuanJia/info/${id}.htm`,
      method:'get',
      headers: headers
    })
  },
  productList:function (id) {
    return axios.get('/leXuanJia/commodities.htm',{params:{id:id}});
  },
  markShareHome:function (id,sessionId) {
    let headers ={'Content-Type':'text/plain;charset=UTF-8'}
    if(sessionId){
      headers.Cookie = sessionId;
    }
    return axios({
      url: `/lexuanjia/collection/${id}.htm`,
      method: "POST",
      headers:headers
    })
  },
  cancelMarkShareHome:function (id,sessionId) {
    let headers ={'Content-Type':'text/plain;charset=UTF-8'}
    if(sessionId){
      headers.Cookie = sessionId;
    }
    return axios({
      url: `/lexuanjia/collection/${id}.htm`,
      method: "DELETE",
      headers:headers
    })
  }
};
module.exports=service