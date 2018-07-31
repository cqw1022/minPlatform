const Service = require('./../../services/wx/shareList');
const extendUrl = require('./../../services/wx/tools/extendUrl');


const shareList = {
    async createShareList(ctx, next) {
        let requestBody = ctx.request.body;
        let skusInfo = JSON.parse(requestBody.skusInfo);
        let memberId = requestBody.memberId;
        let shareInventoryItemPos = []
        skusInfo.forEach(function (item,index) {
            shareInventoryItemPos.push({
                commodityPriceId:item.skuId,
                number:item.num
            })
        })
        let body = await Service.createShareList({
            shareInventoryItemPos: shareInventoryItemPos,
            shareMemberId: memberId
        }, ctx.sessionId).then((response) => {
            let res = response.data;
            return res;
        })
        ctx.body = body;
    },
    async createShareListDetail(ctx,next){
        let requestBody = ctx.request.body;
        let skusInfo = JSON.parse(requestBody.skusInfo);
        let shareInventoryItemPos = []
        skusInfo.forEach(function (item,index) {
            shareInventoryItemPos.push({
                commodityPriceId:item.skuId,
                number:item.num
            })
        })
        let body = await Service.createShareListDetail({
            shareInventoryItemPos
        }, ctx.sessionId).then((response) => {
            let res = response.data;
            let data = res.data;
            res.data = {
                num: data.title.split('共')[1].split('件')[0],
                id:data.id,
                title: data.title.split('共')[0],
                img:data.img
            }
            return res;
        })
        ctx.body = body;
    },
    async list(ctx, next) {
        let data = ctx.request.query;
        let body = await Service.list(data, ctx.sessionId).then((response) => {
            let res = response.data;
            let data = res.data;
            if(res.code==10000){
                let list = data.list;
                for (let i = 0; i < list.length; i++) {
                    let item = list[i];
                    list[i] = {
                        img: extendUrl.formaImg(item.img, 320),
                        title: item.title.split('共')[0],
                        num: item.title.split('共')[1].split('件')[0],
                        id: item.id,
                        price: item.sumPrice,
                        memberId: item.shareMemberId
                    }
                }
            }
            return res;
        })
        ctx.body = body;
    },
    async detail(ctx, next) {
        let id = ctx.params.id;
        let memberId = ctx.request.query.memberId;
        let body = await Service.detail(id, {shareMemberId: memberId}, ctx.sessionId).then((response) => {
            let res = response.data;
            let data = res.data;
            data.info = {
                img: extendUrl.formaImg(data.img, 320),
                price: data.sumPrice,
                num: data.title.split('共')[1].split('件')[0],
                title: data.title.split('共')[0],
                sharer : {
                    avatarUrl: data.avatarUrl,
                    nickname: data.nickname
                }
            }
            data.list = data.shareInventoryItemPos;
            data.marked = data.isCollection;
            let list = data.list;
            for (let i = 0; i < list.length; i++) {
                let item = list[i];
                list[i] = {
                    id: item.commodityId,
                    title: item.commodityName,
                    skuId: item.commodityPriceId,
                    img: extendUrl.formaImg(item.imageUrl, 320),
                    tips: item.tip,
                    price: item.price,
                    num:item.number
                }
            }
            delete data.isCollection;
            delete data.img;
            delete data.title;
            delete data.shareInventoryItemPos;
            delete data.sumPrice;
            delete data.nickname;
            delete data.avatarUrl;
            delete data.createTime;
            delete data.type;
            delete data.status;
            return res;
        })
        ctx.body = body;
    },
    async createMarked(ctx,next){
        let id = ctx.params.id;
        let requestBody = ctx.request.body;
        let data = {
            shareInventoryId:id,
            shareMemberId:requestBody.memberId
        }
        let body = await Service.createMarked( data,ctx.sessionId).then((response) => {
            let res = response.data;
            let data = res.data;
            return res;
        })
        ctx.body = body;
    },
    async deleteMarked(ctx,next){
        let id = ctx.params.id;
        let data = {
            shareInventoryId:id,
        }
        let body = await Service.deleteMarked(data, ctx.sessionId).then((response) => {
            let res = response.data;
            let data = res.data;
            return res;
        })
        ctx.body = body;
    },
    async shareImg(ctx,next){
        let data = ctx.request.query;
        let body = await Service.shareImg(data,ctx.sessionId).then((response)=>{
            let res = response.data;
            res.data = res.data.replace(/http:\/\/img.lexj.com/,"https://lexj-oss.oss-cn-shenzhen.aliyuncs.com");
            return res;
        })
        ctx.body = body;
    }
}

module.exports = shareList;
