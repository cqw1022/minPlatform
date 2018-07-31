const Service = require('./../../services/wx/profit');
const extendUrl = require('./../../services/wx/tools/extendUrl');
const profit = {
    async shareImage(ctx, next) {
        let query = ctx.request.query;
        let body = await Service.shareImage(query, ctx.sessionId).then((response) => {
            let res = response.data;
            let data = res.data;
            try {
                for (let item of data) {
                    item.imageUrl = item.imageUrl.replace(/http:\/\/img.lexj.com/, "https://lexj-oss.oss-cn-shenzhen.aliyuncs.com");
                    item.miniImg = item.miniImg.replace(/http:\/\/img.lexj.com/, "https://lexj-oss.oss-cn-shenzhen.aliyuncs.com");
                }
            } catch (err) {

            }
            return res;
        })
        ctx.body = body;
    },
    async shareProductImage(ctx, next) {
        let query = ctx.request.query;
        let body = await Service.shareProductImage(query, ctx.sessionId).then((response) => {
            let res = response.data;
            return res;
        })
        ctx.body = body;
    },
    async relate(ctx, next) {
        let body = await Service.relate(ctx.request.body, ctx.sessionId).then((response) => {
            let res = response.data;
            return res;
        })
        ctx.body = body;
    },
    async detail(ctx, next) {
        let body = await Service.detail(ctx.sessionId).then((response) => {
            let res = response.data;
            return res;
        })
        ctx.body = body;
    },
    async history(ctx, next) {
        let query = ctx.request.query;
        let body = await Service.history(query, ctx.sessionId).then((response) => {
            let res = response.data;
            return res;
        })
        ctx.body = body;
    },
    async withdraw(ctx, next) {
        let requestBody = ctx.request.body;
        let body = await Service.withdraw(requestBody, ctx.sessionId).then((response) => {
            let res = response.data;
            return res;
        })
        ctx.body = body;
    },
    async fansList(ctx, next) {
        let query = ctx.request.query;
        let body = await Service.fansList(query, ctx.sessionId).then((response) => {
            let res = response.data;
            return res;
        })
        ctx.body = body;
    },
    async withdrawDetail(ctx, next) {
        let id = ctx.params.id;
        let body = await Service.withdrawDetail(id, ctx.sessionId).then((response) => {
            let res = response.data;
            let data = res.data;
            data.createTime = extendUrl.dateFtt('yyyy-MM-dd hh:mm:ss', new Date(data.createTime))
            return res;
        })
        ctx.body = body;
    },
    async createRelation(ctx, next) {
        let memberId = ctx.params.memberId;
        let body = await Service.createRelation(memberId, ctx.sessionId).then((response) => {
            let res = response.data;
            return res;
        })
        ctx.body = body;
    },
    async promoted(ctx, next) {
        let body = await Service.promoted(ctx.request.body, ctx.sessionId).then((response) => {
            let res = response.data;
            if (res.code == 10000) {
                let data = res.data;
            }
            return res;
        })
        ctx.body = body;
    },
    async employInviter(ctx, next) {
        let memberId = ctx.params.memberId;
        let body = await Service.employInviter(memberId, ctx.sessionId).then((response) => {
            let res = response.data;
            if (res.code == 10000) {
                let data = res.data;
            }
            return res;
        })
        ctx.body = body;
    },
    async createEmployer(ctx, next) {
        let body = await Service.createEmployer(ctx.sessionId).then((response) => {
            let res = response.data;
            if (res.code == 10000) {
                let data = res.data;
            }
            return res;
        })
        ctx.body = body;
    },
    async deleteEmployer(ctx, next) {
        let body = await Service.deleteEmployer(ctx.sessionId).then((response) => {
            let res = response.data;
            if (res.code == 10000) {
                let data = res.data;
            }
            return res;
        })
        ctx.body = body;
    }
}

module.exports = profit;