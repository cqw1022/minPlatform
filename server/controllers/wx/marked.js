const Service = require('./../../services/wx/marked');
const extendUrl = require('./../../services/wx/tools/extendUrl');
const marked={
  async lexjList(ctx,next){
    let data = ctx.request.query;
    let body = await Service.lexjList(data,ctx.cookies.get('sessionId')).then((response)=>{
      let res = response.data;
      return res;
    })
    ctx.body=body;
  },
  async productList(ctx,next){
    let data = ctx.request.query;
    let body = await Service.productList(data,ctx.cookies.get('sessionId')).then((response)=>{
      let res = response.data;
      return res;
    })
    ctx.body=body;
  },
  async list(ctx,next){
    let type = ctx.params.type;
    let data = ctx.request.query;

    if(type==1){
      let body = await Service.lexjList(data,ctx.cookies.get('sessionId')).then((response)=>{
        let res = response.data;
        return res;
      })
      ctx.body=body;
    }else if(type==0){
      let body = await Service.productList(data,ctx.cookies.get('sessionId')).then((response)=>{
        let res = response.data;
        if(res.code==10000){
          let data = res.data
          let list =[];
          for(let item of data.list){
            let obj= {
                markedId :item.collectId,
                id:item.id,
                title:item.name,
                price:item.price,
                tips :item.title,
                type:item.type,
                img:extendUrl.formaImg(item.image,320),
                payMonthly:item.payMonthly,

            }
            if(item.activeType==1){
                obj.label = '秒杀价'
                obj.delPrice = item.activePrice;
            }else if(item.activeType==2){
                obj.label = '上新价'
                obj.delPrice = item.activePrice;
            }
            list.push(obj)
          }
          data.list = list;
        }
        return res;
      })
      ctx.body=body;
    }
  }
}

module.exports=marked;