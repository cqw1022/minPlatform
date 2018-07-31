const Service = require('./../../services/wx/common');
const extendUrl = require('./../../services/wx/tools/extendUrl');
const common={
  async address(ctx,next){
    let provinceId = ctx.params.provinceId||null;
    let cityId = ctx.params.cityId||null;
    let body = await Service.address(provinceId,cityId).then((response)=>{
      let res = response.data;
      return res;
    })
    ctx.body=body;
  }
}


module.exports=common;