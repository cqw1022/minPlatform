const Service = require('./../../services/wx/coupon');
const extendUrl = require('./../../services/wx/tools/extendUrl');
const common={
  async ownCoupon(ctx,next){
    let body = await Service.ownCoupon(ctx.cookies.get('sessionId')).then((response)=>{
      let res = response.data;
      return res;
    })
    ctx.body=body;
  },
  async list(ctx,next){
    let type = Number.parseInt(ctx.params.type)+1;
    let body = await Service.list(type,ctx.request.query,ctx.cookies.get("sessionId")).then((response)=>{
      let res = response.data;
      let numArr = ['一','二','三','四','五','六','七','八','九'];
      if(res.code==10000){
        let data = res.data;
        data.list=[];
        for(let item of data.coupons){
          let range = ''
          switch (item.useType){
            case 1:
              range = '全场商品';
              break;
            case 2:
              range = '限时抢购商品除外';
              break;
            case 3:
              range = '需预约一次乐享家'
          }
          let obj = {
              id:item.couponId,
              discountType:type-1,
              timeType : item.timeType==='forever'?0:1,
              startTime : extendUrl.timeForma2(item.usefulStart),
              endTime : extendUrl.timeForma2(item.usefulEnd),
              conditionPrice:item.minTotal,
              description:item.descr,
              range:range,
              condition:{
                  needAppoint:item.isNeedBespeak
              },
              useType:item.type
          };
          if(item.type==1){
              obj.discountPrice = item.couponTotal;
          }else if(item.type==2){
              obj.discountPercent = item.couponTotal/100;
          }else if(item.type==3){
              obj.discountPayMonthly = item.couponTotal;
              obj.discountPayMonthlyText = `免${numArr[item.couponTotal-1]}期`;
          }
          if(item.couponTotal&&!item.type){
              obj.discountPrice = item.couponTotal;
              obj.discount = item.couponTotal;
              obj.useType=1;
          }
          data.list.push(obj)
        }
        // delete data.coupons
      }
      return res;
    })
    ctx.body = body;
  },
  async activity(ctx,next){
    let requestBody = ctx.request.body;
    let body = await Service.activity(requestBody,ctx.cookies.get('sessionId')).then((response)=>{
      let res = response.data;
      return res;
    })
    ctx.body=body;
  }
}


module.exports=common;