const axios = require('axios');
let service = {
  banners:function() {
    return axios.get('/index/banners.htm');
  },
  convenient:function() {
    return axios.get('/index/navigations.htm');
  },
  seckills:function() {
    return axios.get('/index/seckills.htm');
  },
  weeks:function(data) {
    return axios.get('/weekCommodity/units.htm',{params:data});
  },
  hotProducts:function () {
    return axios.get('/index/hotCommoditys.htm');
  },
  recommend:function(openId,page,pageSize) {
    return axios.get('/index/recommend/'+openId+'.htm',{params : {
      page:page,
      pageSize:pageSize
    }})
  }
};
module.exports=service;