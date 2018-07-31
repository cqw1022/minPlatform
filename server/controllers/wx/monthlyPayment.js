const Service = require('../../services/wx/monthlyPayment');
const extendUrl = require('./../../services/wx/tools/extendUrl');

let user={
    async monthlyPaymentList (ctx,next){
        let body = await Service.monthlyPaymentList(ctx.request.query,ctx.cookies.get('sessionId')).then((response)=>{
            let res=response.data;
            if(res.code==10000){
                let list = res.data.list;
                list.forEach((item,index)=>{
                        item.remainPayment = item.totalBalance;
                        delete item.totalBalance;
                        item.productList = [];
                        item.imageUrlList.forEach((it,idx)=>{
                            item.productList.push((extendUrl.formaImg(it,150)))
                        })
                        delete item.imageUrlList;
                        if(item.repaymentDate){
                            item.nowMonthPayDate = extendUrl.dateFtt('MM月dd日',new Date(item.repaymentDate))
                            delete item.repaymentDate
                        }
                        if(item.nextMonthPayDate){
                            item.nextMonthPayDate = extendUrl.dateFtt('MM月dd日',new Date(item.nextMonthPayDate))
                        }
                })
            }
            let re={
                code:res.code,
                data:res.data,
                msg:res.msg
            }
            return re;
        })
        ctx.body=body;
    },
    async monthlyPaymentInfo(ctx,next){
        let body = await Service.monthlyPaymentInfo(ctx.params.monthlyPaymentId,ctx.cookies.get('sessionId')).then((response)=>{
            let res=response.data;
            if(res.code==10000){
                let data = res.data;
                data.remainPayment = data.totalBalance;
                delete data.totalBalance;
                data.productList = [];
                data.imageUrlList.forEach((it,idx)=>{
                    data.productList.push((extendUrl.formaImg(it,150)))
                })
                delete data.imageUrlList;
                if(data.repaymentDate){
                    data.nowMonthPayDate = extendUrl.dateFtt('MM月dd日',new Date(data.repaymentDate))
                    delete data.repaymentDate
                }
                if(data.nextMonthPayDate){
                    data.nextMonthPayDate = extendUrl.dateFtt('MM月dd日',new Date(data.nextMonthPayDate))
                }
                data.soInstallmentPos.forEach((item,index)=>{
                    item.date = extendUrl.dateFtt('yyyy年MM月',new Date(item.repayTime));
                    delete item.repayTime;
                })
                data.monthlyPaymentBills = data.soInstallmentPos;
                delete data.soInstallmentPos;
            }
            let re={
                code:res.code,
                data:res.data,
                msg:res.msg
            }
            return re;
        })
        ctx.body=body;
    },
    async pay(ctx,next){
        let orderId = ctx.params.orderId;
        let type = ctx.params.type;
        let body = await Service.pay(orderId,type,ctx.request.body,ctx.cookies.get('sessionId')).then((response)=>{
            let res=response.data;
            if(res.code==10000){
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

module.exports=user;