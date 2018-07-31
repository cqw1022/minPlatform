const Service = require('./../../services/wx/lexj');
const extendUrl = require('./../../services/wx/tools/extendUrl');
const lexj={
  async list(ctx,next){
    let body = await Service.list(ctx.query).then((response)=>{
      let res = response.data;
      if(res.code==10000){
      }
      return res;
    })
    ctx.body=body;
  },
  async style(ctx,next){
    let body = await Service.style().then((response)=>{
      let res = response.data;
      return res;
    })
    ctx.body=body;
  },
  async detail(ctx,next){
    let id = ctx.params.lexjId;
    let body = await Service.detail(id,ctx.sessionId).then((response)=>{
      let res = response.data;
      if(res.code==10000){
        let data=res.data;
        data.marked = data.isCollected;
        delete  data.isCollected;
        data.appointed = data.isAppointed;
        delete data.isAppointed;
      }
      return res;
    })
    ctx.body = body
  },
  async productList(ctx,next){
    let id = ctx.params.lexjId;
    let body = await Service.productList(id,ctx.sessionId).then((response)=>{
      let res=response.data;
      let data=res.data;
      if(res.code===10000){
        data.forEach(function (item,index) {
            item.title=item.commodityName;
            delete item.commodityName;
            item.num=item.amount;
            delete item.amount;
            item.pid=item.commodityId;
            delete item.commodityId;
            item.img=extendUrl.formaImg(item.imageUrl,150);
            delete item.imageUrl;
            item.cartId = item.id;
            delete item.id;
            item.relateId = item.relate;
            delete item.relate;
            item.remian = item.stock;
            delete item.stock;
            item.skuId = item.commodityPriceId;
            delete  item.commodityPriceId;
            item.saleType=item.activeType;
            delete item.activeType;
            switch (item.saleType){
                case 0:
                    break;
                case 1:
                    item.delPrice = item.price;
                    item.price = item.activePrice;
                    item.label = '秒杀价';
                    break;
                case 2:
                    item.delPrice = item.price;
                    item.price=item.activePrice;
                    item.label = '上新价';
                    break;
            }
            delete item.activePrice;
            item.status = item.commodityStatus;
            delete item.commodityStatus;
        })
      }
      let re={
        code:res.code,
        data:data,
        msg:res.msg
      };
      return re;
    })
    ctx.body = body
  },
  async markLexj(ctx,next){
    let id = ctx.params.lexjId
    let body = await Service.markLexj(id,ctx.sessionId).then((response)=>{
      let res = response.data;
      return res;
    })
    ctx.body = body
  },
  async cancelMarkLexj(ctx,next){
    let id = ctx.params.lexjId
    let body = await Service.cancelMarkLexj(id,ctx.sessionId).then((response)=>{
      let res = response.data;
      return res;
    })
    ctx.body = body
  },
  async appoint(ctx,next){
    let id = ctx.params.lexjId;
    let data = ctx.request.body;
    data={
      appointNumber:data.people,
      appointTimeStr:data.date,
      timeInterval:data.time,
      lexjId:id,
      phone:data.phone
    }
    let body = await Service.appoint(id,data,ctx.sessionId).then((response)=>{
      let res = response.data;
      if(res.code==10000){

      }
      return res;
    })
    ctx.body =body
  },
  async appointed(ctx,next){
    let type = ctx.params.type- -1;
    let data = ctx.request.query;
    let body = await Service.appointed(type,data,ctx.sessionId).then((response)=>{
      let res = response.data;
      if(res.code==10000){
        let data = res.data;
        data.list.forEach(function (item,index) {
          let date = new Date(item.appointTime);
          item.date = extendUrl.dateFtt('M月d日',date);
          switch (Math.floor((new Date().getTime()-item.appointTime)/86400000)){
            case 0:
              item.date = '今天， '+item.date;
              break;
            case 1:
              item.date = '明天， '+item.date;
              break;
          }
        })
      }
      return res;
    })
    ctx.body = body
  },
}

module.exports=lexj;