const Service = require('./../../services/wx/order');
const extendUrl = require('./../../services/wx/tools/extendUrl');

const order = {
    async addOrder(ctx,next){
        let type = ctx.params.type;
        let mode = ctx.params.mode;
        let requestBody = ctx.request.body;
        requestBody = {
            bargainFieldId: requestBody.bargainId,
            shoppingCartIds: requestBody.cartId,
            couponId: requestBody.couponId,
            price: requestBody.price,
            deliveryTimeType: requestBody.deliveryTime,
            remark: requestBody.remark,
            periods: requestBody.term,
            payMonthly: requestBody.payMonthly,
            deliveryAddress: requestBody.deliveryAddress,
            cityPartnerId:requestBody.memId
        }
        for(let k in requestBody){
            if(!requestBody[k]){
                delete requestBody[k];
            }
        }
        console.log(requestBody)
        // ctx.body=requestBody;
        let body = await Service.addOrder(mode, type, requestBody, ctx.sessionId).then((response) => {
            let res = response.data;
            let re = {
                code: res.code,
                data: res.data,
                msg: res.msg
            };
            return res;
        });
        ctx.body = body;
    },
    async getInfo(ctx, next) {
        let orderId = ctx.params.orderId;
        let body = await Service.getInfo(orderId, ctx.sessionId).then((response) => {
            let res = response.data;
            if (res.code == 10000) {
                let data = res.data;
                let order = data.order;
                order.status = order.statusString;
                delete order.statusString;
                order.amount = order.actualPrice;
                delete order.actualPrice;
                delete order.activePrice;
                delete order.memberId;
                delete order.presentPrice;
                delete order.payStatus;
                // delete order.soTitle;
                order.discount = order.couponPrice;
                delete order.couponPrice;

                if (order.status === "待付款") {
                    let payTime = order.endTime - order.systemTime;
                    if (payTime > 0) {
                        let min = Number.parseInt(payTime / 1000 / 60) % 60;
                        let sec = Number.parseInt(payTime / 1000 % 60);
                        if (min < 10) {
                            min = "0" + min;
                        }
                        if (parseInt(sec) < 10) {
                            sec = "0" + sec;
                        }
                        payTime = min + ':' + sec;
                        order.payTime = payTime;
                    } else {
                        order.status = "已取消"
                    }
                }


                let deliveryList = [];
                data.order.createTime = extendUrl.timeForma(data.order.createTime);
                if (data.commodityData) {
                    for (let item of data.commodityData) {
                        deliveryList.push({
                            list: [],
                            logistics: item[0].logisticsNo,
                            status: item[0].receiptStatusString,
                            returnStatus: item.returnStatus
                        })
                        for (let it of item) {
                            deliveryList[deliveryList.length - 1].list.push({
                                pid: it.commodityId,
                                img: extendUrl.formaImg(it.imageUrl, 150),
                                status: it.statusString,
                                title: it.commodityName,
                                num: it.number,
                                tips: it.tip,
                                price: it.actualPrice,
                                payMonthly: it.payMonthly,
                                advancePayment: it.advancePayment
                            })
                        }
                    }
                    data.deliveryList = deliveryList;
                    delete data.commodityData;
                }
                let returnList = [];
                for (let it of data.returnList) {
                    returnList.push({
                        pid: it.commodityId,
                        img: extendUrl.formaImg(it.imageUrl, 150),
                        status: it.statusString,
                        title: it.commodityName,
                        num: it.number,
                        tips: it.tip,
                        price: it.actualPrice,
                        payMonthly: it.payMonthly,
                        advancePayment: it.advancePayment
                    })
                }
                data.returnList = returnList;
                let waitList = [];
                for (let it of data.waitList) {
                    waitList.push({
                        pid: it.commodityId,
                        img: extendUrl.formaImg(it.imageUrl, 150),
                        status: it.statusString,
                        title: it.commodityName,
                        num: it.number,
                        tips: it.tip,
                        price: it.actualPrice,
                        payMonthly: it.payMonthly,
                        advancePayment: it.advancePayment
                    })
                }
                data.waitList = waitList;
            }
            let re = {
                code: res.code,
                data: res.data,
                msg: res.msg
            };
            return re;
        })
        ctx.body = body;
    },
    async getInfo2(ctx, next) {
        let orderId = ctx.params.orderId;
        let body = await Service.getInfo2(orderId, ctx.sessionId).then((response) => {
            let res = response.data;
            if (res.code == 10000) {
                let data = res.data;
                let order = data.order;
                order.status = order.statusString;
                delete order.statusString;
                order.amount = order.actualPrice;
                delete order.actualPrice;
                // delete order.activePrice;
                delete order.memberId;
                order.totalPrice = order.notDiscountPrice;
                delete order.notDiscountPrice;
                delete order.payStatus;
                // delete order.soTitle;
                order.createTime = extendUrl.timeForma(order.createTime)

                order.discountType = order.couponType;
                delete order.couponType;
                if (order.discountType == 1) {
                    order.discountPrice = order.couponPrice;
                } else if (order.discountType == 2) {
                    order.discountPercent = order.couponPrice / 100;
                    order.discountPrice = Math.floor(order.totalPrice * (1 - order.discountPercent) * 10) / 10;
                } else if (order.discountType == 3) {
                    order.discountPayMonthly = order.couponPrice;
                    let numArr = ['一', '二', '三', '四', '五', '六', '七', '八', '九'];
                    order.discountPayMonthlyText = `免${numArr[order.discountPayMonthly - 1]}期月付`;
                }
                if (!order.discountType) {
                    order.discountPrice = order.couponPrice;
                    order.discount = order.couponPrice;
                }
                delete order.couponPrice;
                order.virtual = order.commodityType;
                delete order.commodityType;

                order.num = order.number;
                delete order.number;


                let deliveryList = [];
                if (data.commodityData) {
                    for (let item of data.commodityData) {
                        let itemData = {
                            list: []
                        }
                        if (item.list) {
                            itemData.logistics = item.list[0].logisticsNo;
                            itemData.status = item.list[0].receiptStatusString;
                            itemData.returnStatus = item.list[0].returnStatus;
                            if (order.virtual) {
                                itemData.status = order.status
                            }
                        }
                        deliveryList.push(itemData)
                        for (let it of item.list) {
                            deliveryList[deliveryList.length - 1].list.push({
                                pid: it.commodityId,
                                img: extendUrl.formaImg(it.imageUrl, 150),
                                status: it.returnStatusString,
                                title: it.commodityName,
                                num: it.number,
                                tips: it.tip,
                                price: it.actualPrice,
                                payMonthly: it.payMonthly,
                                advancePayment: it.advancePayment,
                                label: it.activeType == 1 ? '秒杀价' : it.activeType == 2 ? '上新价' : null
                            })
                        }
                    }
                    data.deliveryList = {list: deliveryList, returnStatus: order.returnStatus};
                    delete data.commodityData;
                }
                if (data.returnList) {
                    let returnList = [];
                    for (let it of data.returnList) {
                        returnList.push({
                            pid: it.commodityId,
                            img: extendUrl.formaImg(it.imageUrl, 150),
                            status: it.returnStatusString,
                            title: it.commodityName,
                            num: it.number,
                            tips: it.tip,
                            price: it.actualPrice,
                            payMonthly: it.payMonthly,
                            advancePayment: it.advancePayment,
                            label: it.activeType == 1 ? '秒杀价' : it.activeType == 2 ? '上新价' : null
                        })
                    }
                    data.returnList = returnList;
                }
                if (order.virtual==1||order.virtual==2) {
                    if (data.waitList) {
                        let waitList = [];
                        for (let it of data.waitList) {
                            waitList.push({
                                img: extendUrl.formaImg(it.imageUrl, 150),
                                title: it.commodityName,
                                num: it.number,
                                price: it.actualPrice,
                                tips: it.tip
                            })
                        }
                        data.waitList = {list: waitList};
                    }
                } else if(order.virtual==0||order.virtual==3) {
                    if (data.waitList) {
                        let waitList = [];
                        for (let it of data.waitList.list) {
                            waitList.push({
                                pid: it.commodityId,
                                img: extendUrl.formaImg(it.imageUrl, 150),
                                status: it.returnStatusString,
                                title: it.commodityName,
                                num: it.number,
                                tips: it.tip,
                                price: it.actualPrice,
                                payMonthly: it.payMonthly,
                                advancePayment: it.advancePayment,
                                label: it.activeType == 1 ? '秒杀价' : it.activeType == 2 ? '上新价' : null
                            })
                        }
                        data.waitList.list = waitList;
                    }
                }


                if (order.status === "待付款") {
                    let payTime = order.endTime - order.systemTime;
                    if (payTime > 0) {
                        let min = Number.parseInt(payTime / 1000 / 60) % 60;
                        let sec = Number.parseInt(payTime / 1000 % 60);
                        if (min < 10) {
                            min = "0" + min;
                        }
                        if (parseInt(sec) < 10) {
                            sec = "0" + sec;
                        }
                        payTime = min + ':' + sec;
                        order.payTime = payTime;
                    } else {
                        order.status = "已取消"
                    }
                }
            }
            let re = {
                code: res.code,
                data: res.data,
                msg: res.msg
            };
            return re;
        })
        ctx.body = body;
    },
    async deliveryTime(ctx, next) {
        let body = await Service.deliveryTime().then((response) => {
            let res = response.data;
            return res;
        })
        ctx.body = body;
    },
    async orderList(ctx, next) {
        let type = ctx.params.type;
        let body = await Service.orderList(type, ctx.request.query, ctx.sessionId).then((response) => {
            let res = response.data;
            if (res.data) {
                res.data.list.forEach(function (item, index) {
                    item.productImages = item.imageUrlList.splice(0, 3);
                    delete item.imageUrlList;
                    item.status = item.statusString;
                    delete item.statusString;
                    item.num = item.number;
                    delete item.number;
                    if (item.status === "待付款") {
                        let payTime = item.endTime - item.systemTime;
                        if (payTime > 0) {
                            let min = Number.parseInt(payTime / 1000 / 60) % 60;
                            let sec = Number.parseInt(payTime / 1000 % 60);
                            if (min < 10) {
                                min = "0" + min;
                            }
                            if (parseInt(sec) < 10) {
                                sec = "0" + sec;
                            }
                            payTime = min + ':' + sec;
                            item.payTime = payTime;
                        } else {
                            item.status = "已取消"
                        }
                    }
                })
            }
            return res;
        })
        ctx.body = body;
    },
    async orderList2(ctx, next) {
        let type = ctx.params.type;
        let body = await Service.orderList2(type, ctx.request.query, ctx.sessionId).then((response) => {
            let res = response.data;
            if (res.data) {
                res.data.list.forEach(function (item, index) {

                    item.virtual = item.commodityType;
                    delete item.commodityType;

                    item.status = item.statusString;
                    delete item.statusString;
                    item.num = item.number;
                    delete item.number;


                    let data = item.map;
                    let deliveryList = [];
                    if (data.commodityData) {
                        for (let item of data.commodityData) {
                            let itemData = {
                                list: []
                            }
                            if (item.list) {
                                itemData.logistics = item.list[0].logisticsNo;
                                itemData.status = item.list[0].receiptStatusString;
                                itemData.returnStatus = item.returnStatus;
                            }
                            deliveryList.push(itemData)
                            for (let it of item.list) {
                                deliveryList[deliveryList.length - 1].list.push({
                                    pid: it.commodityId,
                                    img: extendUrl.formaImg(it.imageUrl, 150),
                                    status: it.statusString,
                                    title: it.commodityName,
                                    num: it.number,
                                    tips: it.tip,
                                    price: it.actualPrice,
                                    payMonthly: it.payMonthly,
                                    advancePayment: it.advancePayment
                                })
                            }
                        }
                        data.deliveryList = {list: deliveryList, returnStatus: item.returnStatus};
                        delete data.commodityData;
                    }
                    if (data.returnList) {
                        let returnList = [];
                        for (let it of data.returnList) {
                            returnList.push({
                                pid: it.commodityId,
                                img: extendUrl.formaImg(it.imageUrl, 150),
                                status: it.statusString,
                                title: it.commodityName,
                                num: it.number,
                                tips: it.tip,
                                price: it.actualPrice,
                                payMonthly: it.payMonthly,
                                advancePayment: it.advancePayment
                            })
                        }
                        data.returnList = returnList;
                    }
                    if (item.virtual==2||item.virtual==1) {
                        if (data.waitList) {
                            let waitList = [];
                            for (let it of data.waitList) {
                                waitList.push({
                                    img: extendUrl.formaImg(it.imageUrl, 150),
                                    title: it.commodityName,
                                    num: it.number,
                                    price: it.actualPrice,
                                    tips: it.tip
                                })
                            }
                            data.waitList = {list: waitList};
                        }
                    } else if(item.virtual==0||item.virtual==3){
                        if (data.waitList) {
                            let waitList = [];
                            for (let it of data.waitList.list) {
                                waitList.push({
                                    pid: it.commodityId,
                                    img: extendUrl.formaImg(it.imageUrl, 150),
                                    status: it.statusString,
                                    title: it.commodityName,
                                    num: it.number,
                                    tips: it.tip,
                                    price: it.actualPrice,
                                    payMonthly: it.payMonthly,
                                    advancePayment: it.advancePayment
                                })
                            }
                            data.waitList.list = waitList;
                        }
                    }


                    if (item.status === "待付款") {
                        let payTime = item.endTime - item.systemTime;
                        if (payTime > 0) {
                            let min = Number.parseInt(payTime / 1000 / 60) % 60;
                            let sec = Number.parseInt(payTime / 1000 % 60);
                            if (min < 10) {
                                min = "0" + min;
                            }
                            if (parseInt(sec) < 10) {
                                sec = "0" + sec;
                            }
                            payTime = min + ':' + sec;
                            item.payTime = payTime;
                        } else {
                            item.status = "已取消"
                        }
                    }

                })
            }
            return res;
        })
        ctx.body = body;
    },
    async cancelOrder(ctx, next) {
        let orderId = ctx.params.orderId;
        // ctx.body = orderId;
        // return;
        let body = await Service.cancelOrder(orderId, ctx.sessionId).then((response) => {
            let res = response.data;
            return res;
        })
        ctx.body = body;
    },
    async deleteOrder(ctx, next) {
        let orderId = ctx.params.orderId;
        let body = await Service.deleteOrder(orderId, ctx.sessionId).then((response) => {
            let res = response.data;
            return res;
        })
        ctx.body = body;
    },
    async productList(ctx, next) {
        let orderId = ctx.params.orderId;
        let body = await Service.productList(orderId, ctx.sessionId).then((response) => {
            let res = response.data;
            if (res.code == 10000) {
                let data = res.data;
                for (let i = 0; i < data.length; i++) {
                    let label;
                    if (data[i].activeType == 1) {
                        label = '秒杀价';
                    } else if (data[i].activeType == 2) {
                        label = '上新价';
                    }
                    data[i] = {
                        pid: data[i].commodityId,
                        img: extendUrl.formaImg(data[i].imageUrl, 150),
                        status: data[i].statusString,
                        title: data[i].commodityName,
                        num: data[i].number,
                        tips: data[i].tip,
                        price: data[i].actualPrice,
                        label
                    }
                }
            }
            return res;
        })
        ctx.body = body;
    },
    async recieve(ctx, next) {
        let logisticsId = ctx.params.logisticsId
        let body = await Service.recieve(encodeURIComponent(logisticsId), ctx.sessionId).then((response) => {
            let res = response.data;
            if (res.code == 10000) {

            }
            return res;
        })
        ctx.body = body;
    },
    async chooseData(ctx, next) {
        let body = await Service.chooseData().then((response) => {
            let res = response.data;
            if (res.code == 10000) {
                let data = res.data;
                let rule = data.installmentRule;
                let ruleArray = [];
                for (let k in rule) {
                    if (ruleArray.length == 0) {
                        ruleArray.push({
                            level: k.split('-')[0],
                            terms: [
                                {
                                    term: k.split('-')[1],
                                    rule: rule[k]
                                }
                            ]
                        })
                    } else {
                        let hasRule = false;
                        for (let item of ruleArray) {
                            if (item.level == k.split('-')[0]) {
                                item.rule.push({
                                    term: k.split('-')[1],
                                    rule: rule[k]
                                });
                                hasRule = true;
                                break;
                            }
                        }
                        if (!hasRule) {
                            ruleArray.push({
                                level: k.split('-')[0],
                                terms: [
                                    {
                                        term: k.split('-')[1],
                                        rule: rule[k]
                                    }
                                ]
                            })
                        }
                    }
                }
                data.installmentRule = ruleArray
            }
            return res;
        })
        ctx.body = body;
    },
    async virtual(ctx, next) {
        let body = await Service.virtual().then((response) => {
            let res = response.data;
            if (res.code == 10000) {

            }
            return res;
        })
        ctx.body = body;
    },
    async count(ctx, next) {
        let body = await Service.count(ctx.sessionId).then((response) => {
            let res = response.data;
            if (res.code == 10000) {

            }
            return res;
        })
        ctx.body = body;
    }
};

module.exports = order;