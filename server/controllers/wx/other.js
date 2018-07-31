const Service = require('./../../services/wx/other');

let other = {
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
    async systemTime(ctx, next) {
        ctx.body = new Date().getTime();
    },
    async encrypted(ctx, next) {
        let data = ctx.request.query;
        let body = await Service.encrypted(data, ctx.sessionId).then((response) => {
            let res = response.data;
            if (res.code == 10000) {
            }
            let re = {
                code: res.code,
                data: res.data,
                msg: res.msg
            }
        })
        ctx.body = body;
    },
    async lexjId(ctx, next) {
        ctx.body = 310000018000002;
    },
    async activityTime(ctx, next) {
        let startTime = 1510315200000,
            endTime = 1510588799000,
            sysTime = new Date().getTime(),
            inActivity = false;
        if (sysTime > startTime && sysTime < endTime) {
            inActivity = true;
        }
        ctx.body = inActivity
    },
    async setFormId(ctx, next) {
        let body = await Service.setFormId(ctx.request.body, ctx.sessionId).then((response) => {
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
    async appRule(ctx,next){
        let body = await Service.appRule(ctx.sessionId).then((response) => {
            let res = response.data;
            let data = res.data;
            if (res.code == 10000) {
                data.payMonthly = false;
            }
            let re = {
                code: res.code,
                data: data,
                msg: res.msg
            }
            return re;
        })
        ctx.body = body;
    },
    async statistics(ctx,next){
        let body = await Service.statistics(ctx.request.body, ctx.sessionId).then((response) => {
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
    }

};

module.exports = other;