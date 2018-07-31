const Service = require('./../../services/wx/partner');
const extendUrl = require('./../../services/wx/tools/extendUrl');


const partner = {
    async getInfo(ctx, next) {
        let body = await Service.getInfo(ctx.sessionId).then((response) => {
            let res = response.data;
            return res;
        })
        ctx.body = body
    },
    async fansList(ctx,next){
        let role = ctx.params.role;
        let query = ctx.request.query;
        let body = await Service.fansList(role,query,ctx.sessionId).then((response) => {
            let res = response.data;
            return res;
        })
        ctx.body = body
    },
    async orderList(ctx,next){
        let query= ctx.query;
        let pageSize = query.pageSize,
            page = query.page,
            prevMonth = query.prevMonth,
            startTime = query.startTime,
            endTime = query.endTime;
        if(typeof prevMonth !== 'undefined'){
            if(prevMonth>0){
                startTime = new Date().setDate(1);
                endTime = new Date().getTime();
            }else{
            }
            endTime = new Date(new Date().setMonth(new Date().getMonth()-prevMonth+1)).setDate(0);
            startTime = new Date(endTime).setDate(1);
        }else{
            let startTimeArr = startTime.split("-");
            startTime = new Date(new Date(new Date().setFullYear(startTimeArr[0])).setMonth(startTimeArr[1]-1)).setDate(startTimeArr[2]);
            let endTimeArr = endTime.split("-");
            endTime = new Date(new Date(new Date().setFullYear(endTimeArr[0])).setMonth(endTimeArr[1]-1)).setDate(endTimeArr[2]);
        }
        let data = {
            shopownerId:query.memId,
            pageSize,
            page,
            startTime,
            endTime
        }
        for(let k in data){
            if(!data[k]){
                delete data[k]
            }
        }
        let body = await Service.orderList(data,ctx.sessionId).then((response) => {
            let res = response.data;
            let data = res.data;
            let list = [];
            data.list.forEach((item,index)=>{
                list.push({
                    amount:item.actualPrice,
                    referrer :item.nickname,
                    consumer:item.people,
                    product:item.title,
                    createTime: extendUrl.timeForma2(item.createTime)
                })
            })
            data.list = list;
            return res;
        })
        ctx.body = body

    },
    async achievement(ctx, next) {
        let query = ctx.request.query;
        let body = await Service.achievement(query,ctx.sessionId).then((response) => {
            let list=response.data.data.list;
            list.forEach(function (item,index) {
                item.yymm = extendUrl.dateFtt("yyyy年M月",new Date(item.yymm))
            })
            let res = response.data;
            return res;
        })
        ctx.body = body
    }
};

module.exports = partner;