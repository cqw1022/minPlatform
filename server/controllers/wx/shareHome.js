const Service = require('./../../services/wx/shareHome');
const extendUrl = require('./../../services/wx/tools/extendUrl');
const shareHome={
  async info(ctx,next){
    let body = await Service.info(ctx.params.id,ctx.cookies.get('sessionId')).then((response)=>{
      let res = response.data;
      if(res.code==10000){
        let data =res.data;
        delete data.content;
        data.marked = data.isCollect;
        delete data.isCollect;
      }
      return res;
    })
    ctx.body=body;
  },
  async productList(ctx,next){
    let id = ctx.params.id;
    let body = await Service.productList(id).then((response)=>{
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
  async markShareHome (ctx,next) {
    let id = ctx.params.shareHomeId;
    let body = await Service.markShareHome(id,ctx.cookies.get('sessionId')).then((response)=>{
      let res=response.data;
      let re={
        code:res.code,
        data:res.data,
        msg:res.msg
      };
      return re;
    })
    ctx.body = body
  },
  async cancelMarkShareHome(ctx,next){
    let id = ctx.params.shareHomeId;
    let body = await Service.cancelMarkShareHome(id,ctx.cookies.get('sessionId')).then((response)=>{
      let res=response.data;
      let re={
        code:res.code,
        data:res.data,
        msg:res.msg
      };
      return re;
    })
    ctx.body = body;
  }
}

module.exports=shareHome;