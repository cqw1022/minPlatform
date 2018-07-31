const Service = require('./../../services/wx/pay');
const extendUrl = require('./../../services/wx/tools/extendUrl');
const pay={
  async toPay(ctx,next){
    let body = await Service.toPay(ctx.request.body,ctx.cookies.get('sessionId')).then((response)=>{
      let res = response.data;
      return res;
    })
    ctx.body=body;
  }
}

module.exports=pay;