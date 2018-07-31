const Service = require('./../../services/wx/lexty');
const extendUrl = require('./../../services/wx/tools/extendUrl');
const controller={
    async detail(ctx,next){
        let id = ctx.params.id;
        let body = await Service.detail(ctx.sessionId,ctx.query,id).then((response)=>{
            let res = response.data;
            if(res.code==10000){
                let data = res.data;
                let recommend = [];
                data.lexjGroupPos.forEach((item,index)=>{
                    let object = {
                        img:item.img,
                        title:item.title
                    };
                    let pieces = [];
                    item.lexjGroupCommodityPos.forEach((it,idx)=>{
                        let obj = {
                            title:it.commodityName,
                            price:it.commodityPriceId,
                            id:it.id,
                            img:extendUrl.formaImg(it.imageUrl, 320)
                        }
                        pieces.push(obj)
                    })
                    object.pieces = pieces;
                    recommend.push(object);
                })
                data.recommend = recommend;
                delete data.lexjGroupPos;
                data.marked = data.isCollected;
                delete data.isCollected;
            }
            return res;
        })
        ctx.body=body;
    },
    async hotProduct(ctx,next){
        let id = ctx.params.id;
        let body = await Service.hotProduct(id).then((response)=>{
            let res = response.data;
            if(res.code==10000){
                let data = res.data;
                let list = [];
                data.list.forEach((item,index)=>{
                    let object = {
                        title:item.commodityName,
                        img :extendUrl.formaImg(item.imageUrl,320),
                        id:item.id,
                        price:item.price,
                        remark:item.remarkCateName
                    }
                    list.push(object);
                })
                data.list = list;
            }
            return res;
        })
        ctx.body=body;

    }
}

module.exports=controller;