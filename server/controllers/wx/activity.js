const Service = require('./../../services/wx/activity');
const extendUrl = require('./../../services/wx/tools/extendUrl');

let activity = {
    async bargainList(ctx, next) {
        let query = ctx.request.query;
        let body = await Service.bargainList(query, ctx.sessionId).then((response) => {
            let res = response.data;
            if (res.code == 10000) {
            }
            let re = {
                code: res.code,
                data: res.data,
                msg: res.msg
            }
            return re;
        })
        ctx.body = body;
    },
    async createBargain(ctx, next) {
        let bargainId = ctx.params.bargainId;

        let body = await Service.createBargain(bargainId, ctx.sessionId).then((response) => {
            let res = response.data;
            if (res.code == 10000) {
            }
            let re = {
                code: res.code,
                data: res.data,
                msg: res.msg
            }
            return re;
        })
        ctx.body = body;

    },
    async getBargain(ctx, next) {
        let bargainId = ctx.params.bargainId;
        let body = await Service.getBargain(bargainId, ctx.sessionId).then((response) => {
            let res = response.data;
            if (res.code == 10000) {
            }
            let re = {
                code: res.code,
                data: res.data,
                msg: res.msg
            }
            return re;
        })
        ctx.body = body;
    },
    async joinBargain(ctx, next) {
        let bargainId = ctx.params.bargainId;

        let body = await Service.joinBargain(bargainId, ctx.sessionId).then((response) => {
            let res = response.data;
            if (res.code == 10000) {
            }
            let re = {
                code: res.code,
                data: res.data,
                msg: res.msg
            }
            return re;
        })
        ctx.body = body;
    },
    async bargainInfo(ctx, next) {
        let bargainId = ctx.params.bargainId;
        let body = await Service.bargainInfo(bargainId, ctx.sessionId).then((response) => {
            let res = response.data;
            if (res.code == 10000) {
            }
            let re = {
                code: res.code,
                data: res.data,
                msg: res.msg
            }
            return res;
        })
        ctx.body = body;
    },
    async bargainProduct(ctx, next) {
        let bargainId = ctx.params.bargainId;
        let body = await Service.bargainProduct(bargainId, ctx.sessionId).then((response) => {
            let res = response.data;
            if (res.code == 10000) {
            }
            let re = {
                code: res.code,
                data: res.data,
                msg: res.msg
            }
            return res;
        })
        ctx.body = body;
    },
    async bargainHelper(ctx, next) {
        let bargainId = ctx.params.bargainId;
        let query = ctx.request.query;
        let body = await Service.bargainHelper(bargainId, query, ctx.sessionId).then((response) => {
            let res = response.data;
            if (res.code == 10000) {
            }
            let re = {
                code: res.code,
                data: res.data,
                msg: res.msg
            }
            return res;
        })
        ctx.body = body;
    },
    //是否参与了抽奖
    async raffled(ctx, next) {
        let body = await Service.raffled(ctx.sessionId).then((response) => {
            let res = response.data;
            if (res.code == 10000) {
            }
            let re = {
                code: res.code,
                data: res.data.activityFieldId,
                msg: res.msg
            }
            return re;
        })
        ctx.body = body;
    },
    //创建抽奖活动
    async createRaffled(ctx, next) {
        let body = await Service.createRaffled(ctx.sessionId).then((response) => {
            let res = response.data;
            if (res.code == 10000) {
                let data = res.data;
                data.raffledId = data.activityFieldId;
                delete data.activityFieldId;
            }
            let re = {
                code: res.code,
                data: res.data,
                msg: res.msg
            }
            return re;
        })
        ctx.body = body;
    },
    async getRaffled(ctx, next) {
        let raffledId = ctx.params.raffledId;
        let body = await Service.getRaffled(raffledId, ctx.sessionId).then((response) => {
            let res = response.data;
            if (res.code == 10000) {
                let data = res.data;
                data.participants = data.activityFieldMemberPos;
                delete  data.activityFieldMemberPos;
            }
            //status =1,已参与未满人；status=2，已参与已满人，可抽奖；status=3.已参与已抽奖；
            let re = {
                code: res.code,
                data: res.data,
                msg: res.msg
            }
            return re;
        })
        ctx.body = body;
    },
    //获取抽奖活动详情
    async raffledInfo(ctx, next) {
        let raffledId = ctx.params.raffledId;
        let body = await Service.raffledInfo(raffledId, ctx.sessionId).then((response) => {
            let res = response.data;
            if (res.code == 10000) {
                let data = res.data;
                data.participants = data.activityFieldMemberPos;
                delete  data.activityFieldMemberPos;
            }
            //status =1,已参与未满人；status=2，已参与已满人，可抽奖；status=3.已参与已抽奖；
            let re = {
                code: res.code,
                data: res.data,
                msg: res.msg
            }
            return re;
        })
        ctx.body = body;
    },
    //获取抽奖奖品详情
    async raffledPrize(ctx, next) {
        let raffledId = ctx.params.raffledId;
        let body = await Service.raffledPrize(raffledId, ctx.sessionId).then((response) => {
            let res = response.data;
            if (res.code == 10000) {
            }
            let re = {
                code: res.code,
                data: res.data,
                msg: res.msg
            }
            return re;
        })
        ctx.body = body;
    },
    //获取礼物列表
    async prizes(ctx, next) {
        let body = await Service.prizes().then((response) => {
            let res = response.data;
            if (res.code == 10000) {
            }
            let re = {
                code: res.code,
                data: res.data,
                msg: res.msg
            }
            return re;
        })
        ctx.body = body;
    },
    async counts(ctx, next) {
        let body = await Service.counts().then((response) => {
            let res = response.data;
            if (res.code == 10000) {
            }
            let re = {
                code: res.code,
                data: res.data,
                msg: res.msg
            }
            return re;
        })
        ctx.body = body;
    },
    async codeNum(ctx, next) {
        let body = await Service.codeNum().then((response) => {
            let res = response.data;
            if (res.code == 10000) {
            }
            let re = {
                code: res.code,
                data: res.data,
                msg: res.msg
            }
            return re;
        })
        ctx.body = body;
    },
    async hasCode(ctx, next) {
        let body = await Service.hasCode(ctx.sessionId).then((response) => {
            let res = response.data;
            if (res.code == 10000) {
            }
            let re = {
                code: res.code,
                data: res.data,
                msg: res.msg
            }
            return re;
        })
        ctx.body = body;
    },
    async all(ctx, next) {
        let body = await Service.all().then((response) => {
            let res = response.data;
            if (res.code == 10000) {
            }
            let re = {
                code: res.code,
                data: res.data,
                msg: res.msg
            }
            return re;
        })
        ctx.body = body;
    },
    async activityInfo(ctx, next) {
        let activityName = ctx.params.activityName;
        let body = await Service.activityInfo(activityName, ctx.sessionId).then((response) => {
            let res = response.data;
            if (res.code == 10000) {

            }
            let re = {
                code: res.code,
                data: res.data,
                msg: res.msg
            }
            return re;
        })
        ctx.body = body;
    },
    async increaseFansInfo(ctx, next) {
        let body = await Service.increaseFansInfo().then((response) => {
            let res = response.data;
            if (res.code == 10000) {
                let list = [];
                res.data.list.forEach((item, index) => {
                    list.push({
                        id: item.id,
                        img: extendUrl.formaImg(item.img, 320),
                        title: item.name,
                        remain: item.remain
                    })
                })
                res.data.list = list;
            }
            return res;
        })
        ctx.body = body;
    },
    async increaseFansStatus(ctx, next) {
        let body = await Service.increaseFansStatus(ctx.sessionId).then((response) => {
            let res = response.data;
            if (res.code == 10000) {

            }
            return res;
        })
        ctx.body = body;
    },
    async increaseFansDetail(ctx, next) {
        let id = ctx.params.id;
        let body = await Service.increaseFansDetail(id).then((response) => {
            let res = response.data;
            if (res.code == 10000) {
                let data = res.data;
                let object = {
                    title: data.name,
                    img: extendUrl.formaImg(data.img, 150),
                    price: 0,
                    id: data.id
                }
                res.data = object;
            }
            return res;
        })
        ctx.body = body;
    },
    async increaseFansOrder(ctx,next){
        let requestBody = ctx.request.body;
        requestBody = {
            deliveryTimeType: requestBody.deliveryTime,
            deliveryAddress: requestBody.deliveryAddress,
            prizeId:requestBody.id,
            remark:requestBody.remark
        }
        let body = await Service.increaseFansOrder(requestBody,ctx.sessionId).then((response) => {
            let res = response.data;
            if (res.code == 10000) {
            }
            return res;
        })
        ctx.body = body;
    }
};

module.exports = activity;