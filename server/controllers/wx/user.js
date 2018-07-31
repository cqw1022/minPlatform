const Service = require('./../../services/wx/user');

let user = {
    async session(ctx, next) {
        let body = await Service.session(ctx.request.body).then((response) => {
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
    async info(ctx, next) {
        let body = await Service.info(ctx.request.body, ctx.sessionId).then((response) => {
            let res = response.data;
            return res
        })
        ctx.body = body
    },
    async info3(ctx, next) {
        let body = await Service.info3(ctx.request.body, ctx.sessionId).then((response) => {
            let res = response.data;
            return res
        })
        ctx.body = body
    },
    async getInfo(ctx, next) {
        let body = await
            Service.getInfo(ctx.sessionId).then((response) => {
                let res = response.data;
                return res
            })
        ctx.body = body
    }
    ,
    async unionId(ctx, next) {
        let body = await
            Service.unionId(ctx.request.body, ctx.sessionId).then((response) => {
                let res = response.data;
                return res
            })
        ctx.body = body
    }
    ,
    async verify(ctx, next) {
        let body = await
            Service.verify(ctx.query, ctx.sessionId).then((response) => {
                let res = response.data;
                return res
            })
        ctx.body = body
    }
    ,
    async bindPhone(ctx, next) {
        let body = await
            Service.bindPhone(ctx.request.body, ctx.sessionId).then((response) => {
                let res = response.data;
                return res
            })
        ctx.body = body
    }
    ,
    async addressAdd(ctx, next) {
        let body = await Service.addressAdd(ctx.request.body, ctx.sessionId).then((response) => {
            let res = response.data;
            return res
        })
        ctx.body = body
    }
    ,
    async addressList(ctx, next) {
        let body = await
            Service.addressList(ctx.sessionId).then((response) => {
                let res = response.data;
                return res
            })
        ctx.body = body
    }
    ,
    async addressGet(ctx, next) {
        let addressId = ctx.params.addressId;
        let body = await
            Service.addressGet(addressId, ctx.sessionId).then((response) => {
                let res = response.data;
                return res
            })
        ctx.body = body
    }
    ,
    async addressDelete(ctx, next) {
        let addressId = ctx.params.addressId;
        let body = await
            Service.addressDelete(addressId, ctx.sessionId).then((response) => {
                let res = response.data;
                return res;
            })
        ctx.body = body
    }
    ,
    async addressModify(ctx, next) {
        let addressId = ctx.params.addressId;
        let data = ctx.request.body;
        data.id = addressId
        let body = await
            Service.addressModify(data, ctx.sessionId).then((response) => {
                let res = response.data;
                return res;
            })
        ctx.body = body
    }
    ,
    async type(ctx, next) {
        let body = await
            Service.type(ctx.sessionId).then((response) => {
                let res = response.data;
                return res;
            })
        ctx.body = body
    }
    ,
    async latelyAddress(ctx, next) {

        let body = await
            Service.latelyAddress(ctx.sessionId).then((response) => {
                let res = response.data;
                return res;
            })
        ctx.body = body
    }
    ,
    async getZhima(ctx, next) {
        let body = await Service.getZhima(ctx.sessionId).then((response) => {
            let res = response.data;
            return res;
        })
        ctx.body = body
    }
    ,
    async getZhimaTest(ctx, next) {
        let body = {
            code: 10000,
            data: {
                type: 1,
                zhimaCoreBrief: 650
            }
        }
        ctx.body = body
    }
    ,
    async getZhimaTest2(ctx, next) {
        let body = {
            code: 10000,
            data: {
                type: 1,
                zhimaCoreBrief: 650
            }
        }
        ctx.body = body
    }
    ,
    async zhimaVerify(ctx, next) {
        let body = await
            Service.zhimaVerify(ctx.request.body, ctx.sessionId).then((response) => {
                let res = response.data;
                return res;
            })
        ctx.body = body
    }
    ,
    async identify(ctx, next) {
        let body = await
            Service.identify(ctx.request.body, ctx.sessionId).then((response) => {
                let res = response.data;
                return res;
            })
        ctx.body = body
    }
};

module.exports = user;