const axios = require('axios');
const qs = require('qs');
let service = {
  bargainList:function (data,sessionId) {
    let headers ={'Content-Type':'application/json;charset=UTF-8'}
    if(sessionId){
      headers.Cookie = sessionId;
    }
    return axios({
      url: `/marketBargain/v1/list.htm`,
      method: "GET",
      headers:headers,
      params:data
    })
  },
  createBargain:function (bargainId,sessionId) {
    let headers ={'Content-Type':'text/plain;charset=UTF-8'}
    if(sessionId){
      headers.Cookie = sessionId;
    }
    return axios({
      url: `/marketBargain/v1/${bargainId}.htm`,
      method: "POST",
      headers:headers
    })
  },
  getBargain:function (bargainId,sessionId) {
    let headers ={'Content-Type':'application/json;charset=UTF-8'}
    if(sessionId){
      headers.Cookie = sessionId;
    }
    return axios({
      url: `/marketBargain/v1/${bargainId}.htm`,
      method: "GET",
      headers:headers,
    })
  },
  joinBargain:function (bargainId,sessionId) {
    let headers ={'Content-Type':'text/plain;charset=UTF-8'}
    if(sessionId){
      headers.Cookie = sessionId;
    }
    return axios({
      url: `/marketBargain/v1/bargain/${bargainId}.htm`,
      method: "POST",
      headers:headers
    })

  },
  bargainInfo:function (bargainId,sessionId) {
    let headers ={'Content-Type':'application/json;charset=UTF-8'}
    if(sessionId){
      headers.Cookie = sessionId;
    }
    return axios({
      url: `/marketBargain/v1/bargainField/${bargainId}.htm`,
      method: "GET",
      headers:headers
    })
  },
  bargainProduct:function (bargainId,sessionId) {
    let headers ={'Content-Type':'application/json;charset=UTF-8'}
    if(sessionId){
      headers.Cookie = sessionId;
    }
    return axios({
      url: `/marketBargain/v1/commodity/${bargainId}.htm`,
      method: "GET",
      headers:headers
    })
  },
  bargainHelper:function (bargainId,query,sessionId) {
    let headers ={'Content-Type':'application/json;charset=UTF-8'}
    if(sessionId){
      headers.Cookie = sessionId;
    }
    return axios({
      url: `/marketBargain/v1/helpers/${bargainId}.htm`,
      method: "GET",
      headers:headers,
      params:query
    })
  },
  raffled:function (sessionId) {
    let headers ={'Content-Type':'application/json;charset=UTF-8'}
    if(sessionId){
      headers.Cookie = sessionId;
    }
    return axios({
      url: `/activityField/v2/judege.htm`,
      method: "GET",
      headers:headers
    })
  },
  createRaffled:function (sessionId) {
    let headers ={'Content-Type':'text/plain;charset=UTF-8'}
    if(sessionId){
      headers.Cookie = sessionId;
    }
    return axios({
      url: `/activityField/v2/share/neighborhood.htm`,
      method: "POST",
      headers:headers
    })
  },
  getRaffled:function (raffledId,sessionId) {
    let headers ={'Content-Type':'application/json;charset=UTF-8'}
    if(sessionId){
      headers.Cookie = sessionId;
    }
    return axios({
      url: `/marketGift/v1/fortune/${raffledId}.htm`,
      method: "GET",
      headers:headers
    })
  },
  raffledInfo:function (raffledId,sessionId) {
    let headers ={'Content-Type':'application/json;charset=UTF-8'}
    if(sessionId){
      headers.Cookie = sessionId;
    }
    return axios({
      url: `/activityField/v2/detail/${raffledId}.htm`,
      method: "GET",
      headers:headers
    })
  },
  raffledPrize:function (raffledId,sessionId) {
    let headers ={'Content-Type':'application/json;charset=UTF-8'}
    if(sessionId){
      headers.Cookie = sessionId;
    }
    return axios({
      url: `/marketGift/v1/detail/${raffledId}.htm`,
      method: "GET",
      headers:headers
    })
  },
  prizes:function () {
    let headers ={'Content-Type':'application/json;charset=UTF-8'}
    return axios({
      url: `marketGift/v1/list/neighborhood.htm`,
      method: "GET",
      headers:headers
    })
  },
  counts:function () {
    let headers ={'Content-Type':'application/json;charset=UTF-8'};
    return axios({
      url: `/activityField/v2/sendAmount/neighborhood.htm`,
      method: "GET",
      headers:headers
    })
  },
  codeNum:function () {
      let headers ={'Content-Type':'application/json;charset=UTF-8'};
      return axios({
          url: `/disCountCode/v2/residueCode.htm`,
          method: "GET",
          headers:headers
      })
  },
    hasCode:function (sessionId) {
        let headers ={'Content-Type':'application/json;charset=UTF-8'};
        if(sessionId){
            headers.Cookie = sessionId;
        }
        return axios({
            url: ` /disCountCode/v2/member.htm`,
            method: "GET",
            headers:headers
        })
    },
    all:function () {
        let headers ={'Content-Type':'application/json;charset=UTF-8'};
        return axios({
            url: ` /coupon/v/usefulAct.htm`,
            method: "GET",
            headers:headers
        })
    },
    activityInfo:function (activityName,sessionId) {
        let headers ={'Content-Type':'application/json;charset=UTF-8'};
        if(sessionId){
            headers.Cookie = sessionId;
        }
        return axios({
            url: `/coupon/v2/isParted/${activityName}.htm`,
            method: "GET",
            headers:headers
        })
    },
    increaseFansInfo:function () {
        return axios.get('/prize/v2/increaseFansInfo.htm')
    },
    increaseFansStatus:function (sessionId) {
        let headers ={'Content-Type':'application/json;charset=UTF-8'};
        if(sessionId){
            headers.Cookie = sessionId;
        }
        return axios({
            url: `/memberManage/v2/conformIncreaseFans.htm`,
            method: "GET",
            headers:headers
        })
    },
    increaseFansDetail:function (id) {
        return axios.get(`/prize/v2/increaseFans/${id}.htm`);
    },
    increaseFansOrder:function (data,sessionId) {
    console.log(data)
        let headers = {'Content-Type': 'text/plain;charset=UTF-8'}
        if (sessionId) {
            headers.Cookie = sessionId;
        }
        return axios({
            url: `/order/v2/prize.htm`,
            method: "POST",
            transformRequest: [function () {
                return JSON.stringify(data);
            }],
            headers: headers
        })
    }
};
module.exports=service