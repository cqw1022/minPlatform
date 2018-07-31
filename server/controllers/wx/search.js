const Service = require('./../../services/wx/search');
const extenUrl = require('./../../services/wx/tools/extendUrl');

const search = {
  async keyword(ctx,next){
    let keyword=ctx.query.keyword;
    let body = await Service.keyword(keyword).then((response)=>{
      let res=response.data;
      if(res.code==10000){
        for(let k in res.data){
          let strArr = res.data[k].split("'");
          res.data[k] ='';
          for(let j in strArr){
           if(j==1){
             res.data[k]+=`'${strArr[j]}'`
           }else{
             res.data[k]+=strArr[j]
           }
          }
        }
      }
      let re={
        code:res.code,
        data:res.data,
        msg:res.msg
      };
      return re;
    })
    ctx.body = body
  },
  async hotKeywords(ctx,next){
    let body = await  Service.hotKeywords().then((response)=>{
      let res=response.data;
      let re={
        code:res.code,
        data:res.data,
        msg:res.msg
      };
      return re;
    })
    ctx.body = body
  }
};

module.exports = search;