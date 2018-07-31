const axios = require('axios');
let service = {
  address:function(provinceId,cityId) {
    let parentId,choose;
    if(!provinceId && !cityId){
      parentId = 0;
      choose = 'province'
    }else if(provinceId && !cityId){
      parentId = provinceId;
      choose = 'city'
    }else if(provinceId && cityId){
      parentId = cityId;
      choose = 'area'
    }
    return axios.get(`/deliveryAddress/addressData/${parentId}/${choose}.htm`);
  }
};
module.exports=service;