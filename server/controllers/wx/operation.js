const Service = require('./../../services/wx/operation');
const extendUrl = require('./../../services/wx/tools/extendUrl');

const operation={
  async hotProducts(ctx,next){
    let type = ctx.params.type;
    if(type==0){
      type=2
    }
    let body = await Service.hotProducts(type,ctx.request.query).then((response)=>{
      let res=response.data;
      if(res.code==10000){
        let data = res.data;
        try{
          data.list.forEach(function (item,index) {
            item.tips = item.title;
            item.title = item.commodityName;
            delete item.commodityName;
            item.img = extendUrl.formaImg(item.image,320);
            delete item.image;
            try {
              item.price = item.price.split('-')[0]
            }catch (err){

            }
          })
        }catch (err){

        }
      }
      return res
    });
    ctx.body = body;
  },
  async shareHomes(ctx,next){
    let page=ctx.query.page;
    let pageSize = ctx.query.pageSize;
    let body = await Service.shareHomes(page,pageSize).then((response)=>{
      let res=response.data;
      if(res.code==10000){
        try{
          res.data.list.forEach(function (item,index) {
            item.term=item.stageNum;
            delete item.stageNum;
            item.img = item.imageUrl;
            delete item.imageUrl;
            delete item.image;
            try{
              item.data.forEach(function (it,idx) {
                it.img=extendUrl.formaImg(it.image,150);
                delete it.image;
                it.pid = it.commodityId;
                delete it.commodityId;
              });
            }catch (err){

            }
            item.pieces=item.data.splice(0,4);
            delete item.data;
          })
        }catch (err){

        }
      }
      let re={
        code:res.code,
        data:res.data,
        msg:res.msg
      }
      return re
    });
    ctx.body = body;
  },
  async seckillDates(ctx,next){
    let body = await Service.seckillDates().then((response)=>{
      let res=response.data;
      if(res.code==10000){
        let weekday=["日","一","二","三","四","五","六"];
        let data = res.data;
        let hasPrevDay = false;

        let systemDate = new Date();
        let systemYear = systemDate.getFullYear();
        let systemMonth = systemDate.getMonth();
        let systemDates = systemDate.getDate();
        for(let i = 0;i<data.length;i++){
          let resDate = new Date(data[i].startTime);
          let resYear = resDate.getFullYear();
          let resMonth = resDate.getMonth();
          let resDates = resDate.getDate();
          let hour=resDate.getHours();
          if(hour<0){
            hour = "0"+hour+":00";
          }else{
            hour = hour+":00";
          }
          if(systemYear>resYear||(systemYear==resYear&&systemMonth>resMonth)||(systemYear==resYear&&systemMonth==resMonth&&systemDates>resDates)){
            data[i].date = "昨日"+" "+hour;;
            if(data[i].startTime>data[i].systemTime){
              data[i].status = "即将开抢";
            }else if(data[i].systemTime>data[i].endTime){
              data[i].status = "开抢结束";
            }else{
              data[i].status = "已开抢";
            }
          }else if(systemYear==resYear&&systemMonth==resMonth&&systemDates==resDates){
            data[i].date  = "今日"+" "+hour;;
            if(data[i].startTime>data[i].systemTime){
              data[i].status = "即将开抢";
            }else if(data[i].systemTime>data[i].endTime){
              data[i].status = "开抢结束";
            }else{
              data[i].status = "已开抢";
            }
          }else if(data[i].startTime-systemDate.getTime()<86400000&&data[i].startTime-systemDate.getTime()>0){
            data[i].date  = "明日"+" "+hour;;
            data[i].status = "即将开抢";
          }else{
            data[i].date = "周"+weekday[resDate.getDay()]+" "+hour;
            data[i].status = "即将开抢";
          }

          data[i].sysStart=data[i].startTime>data[i].systemTime;
        }
      }
      return res
    })
    ctx.body = body;
  },
  async seckillList(ctx,next){
    let dateId=ctx.params.dateId;
    let page = ctx.query.page;
    let pageSize  = ctx.query.pageSize;
    let body = await Service.seckillList(dateId,page,pageSize).then((response)=>{
      let res=response.data;
      if(res.code==10000){
        res.data.list.forEach(function (item,index) {
          item.tips = item.title;
          item.title = item.commodityName;
          delete item.commodityName;
          item.img = extendUrl.formaImg(item.imageUrl,320);
          delete item.imageUrl;
          item.delPrice = item.presentPrice.split("-")[0];
          delete item.presentPrice;
          try{
            item.price=item.price.split("-")[0];
          }catch (err){

          }
          item.allNum = item.stock;
          delete item.stock;
        })
      }
      return res
    })
    ctx.body = body;
  },
  async weekProducts(ctx,next){
    let data={
      page:ctx.query.page,
      pageSize:ctx.query.pageSize
    };
    let body = await Service.weekProducts(data).then((response)=>{
      let res=response.data;
      if(res.code===10000){
        try {
          res.data.list.forEach(function (item,index) {
            item.img=extendUrl.formaImg(item.imageUrl,320);
            delete item.imageUrl;
            item.tips=item.title;
            item.title=item.commodityName;
            delete item.commodityName;
            try {
              item.price=item.todayPrice.split("-")[0];
              delete item.todayPrice;
              item.payMonthly = item.todayPricePayMonthly;
              delete item.todayPricePayMonthly;
              if(item.tomorrowPrice){
                item.tomPrice = item.tomorrowPrice.split("-")[0];
                delete item.tomorrowPrice;
              }
              if(item.tomorrowPricePayMonthly){
                item.tomPayMonthly = item.tomorrowPricePayMonthly;
                delete item.tomorrowPricePayMonthly;
              }
              if(item.present_price){
                item.delPrice = item.present_price.split("-")[0];
                delete item.present_price;
              }
              if(item.presentPrice){
                  item.delPrice = item.presentPrice.split("-")[0];
                  delete item.presentPrice;
              }
              if(item.presentPricePayMonthly){
                  item.delPayMonthly = item.presentPricePayMonthly;
                  delete item.presentPricePayMonthly;
              }
            }catch (err){

            }

          });
        }catch (err){

        }
      }
      let re={
        code:res.code,
        data:res.data,
        msg:res.msg
      }
      return re;
    })
    ctx.body=body;
  }
};

module.exports=operation;