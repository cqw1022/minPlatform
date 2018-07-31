const axios = require('axios');
let service = {
  hotProducts : function (type,data) {
    return  axios.get("/hotCommodity/"+type+'.htm',{params:data})
  },
  shareHomes : function (page,pageSize) {
    return axios.get("/leXuanJia/units.htm",{params:{
      page:page,
      pageSize:pageSize
    }})
  },
  seckillDates : function () {
    return axios.get("/seckill/units.htm")
  },
  seckillList : function (dateId,page,pageSize) {
    return axios.get("/seckill/seckillCommoditys/"+dateId+'.htm',{params:{
      page:page,
      pageSize:pageSize
    }})
  },
  weekProducts : function (data) {
    return axios.get("/weekCommodity/units.htm",{
      params:data
    })
  }
};
module.exports=service