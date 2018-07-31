const Service = require('./../../services/wx/aftersale');
const extendUrl = require('./../../services/wx/tools/extendUrl');
const aftersale = {
    async waitList(ctx, next) {
        let id = ctx.params.orderId;
        let body = await Service.waitList(id, ctx.cookies.get('sessionId')).then((response) => {
            let res = response.data;
            if (res.code == 10000) {
                let data = res.data;
                let abledList = [];
                let disabledList = [];
                for (let it of data.waitList) {
                    let item = {
                        pid: it.commodityId,
                        img: extendUrl.formaImg(it.imageUrl, 150),
                        status: it.statusString,
                        title: it.commodityName,
                        max: it.number,
                        tips: it.tip,
                        price: it.actualPrice,
                        id: it.id,
                        num: 1
                    }
                    if (item.status == '没退货申请' || item.status == '退货失败') {
                        abledList.push(item)
                    } else {
                        disabledList.push(item)
                    }
                }
                res.data = {
                    abledList,
                    disabledList
                };
            }
            return res;
        })
        ctx.body = body;
    },
    async waitList2(ctx, next) {
        let id = ctx.params.orderId;
        let body = await Service.waitList2(id, ctx.cookies.get('sessionId')).then((response) => {
            let res = response.data;
            if (res.code == 10000) {
                let data = res.data;
                let abledList = [];
                let disabledList = [];
                console.log(data.waitList.list)
                for (let it of data.waitList.list) {
                    let item = {
                        pid: it.commodityId,
                        img: extendUrl.formaImg(it.imageUrl, 150),
                        status: it.returnStatus,
                        title: it.commodityName,
                        max: it.number,
                        tips: it.tip,
                        price: it.actualPrice,
                        id: it.id,
                        num: 1
                    }
                    if (!item.status || item.status == '没退货申请' || item.status == '退货失败') {
                        abledList.push(item)
                    } else {
                        disabledList.push(item)
                    }
                }
                res.data = {
                    abledList,
                    disabledList
                };
            }
            return res;
        })
        ctx.body = body;
    },
    async deliveryList(ctx, next) {
        let id = ctx.params.logisticsId;
        let body = await Service.deliveryList(encodeURIComponent(id), ctx.cookies.get('sessionId')).then((response) => {
            let res = response.data;
            if (res.code == 10000) {
                let data = res.data;
                let abledList = [];
                let disabledList = [];
                for (let it of data) {
                    let item = {
                        pid: it.commodityId,
                        img: extendUrl.formaImg(it.imageUrl, 150),
                        status: it.statusString,
                        title: it.commodityName,
                        max: it.number,
                        tips: it.tip,
                        price: it.actualPrice,
                        id: it.id,
                        num: 1
                    };
                    if (item.status == '没退货申请' || item.status == '退货失败') {
                        abledList.push(item)
                    } else {
                        disabledList.push(item)
                    }
                }
                res.data = {
                    abledList,
                    disabledList
                };
            }
            return res;
        })
        ctx.body = body;
    },
    async returnProduct(ctx, next) {
        let requestBody = ctx.request.body;
        let type = ctx.params.type;
        let body = await Service.returnProduct(type, requestBody, ctx.cookies.get('sessionId')).then((response) => {
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
    async recordList(ctx, next) {
        let data = ctx.request.query;
        let body = await Service.recordList(data, ctx.cookies.get('sessionId')).then((response) => {
            let res = response.data;
            if (res.code == 10000) {
                let data = res.data;
                for (let i = 0; i < data.list.length; i++) {
                    let product = [];
                    for (let item of data.list[i].soReturnItemPos) {
                        product.push({
                            title: item.commodityName,
                            img: extendUrl.formaImg(item.imageUrl, 150),
                            tips: item.tip
                        })
                    }
                    data.list[i] = {
                        title: data.list[i].commodityName,
                        id: data.list[i].id,
                        product: product,
                        status: data.list[i].statusString,
                        type: data.list[i].typeString,
                        tips: data.list[i].tips
                    }
                }
            }
            let re = {
                code: res.code,
                data: res.data,
                msg: res.msg
            };
            return res;
        });
        ctx.body = body;
    },
    async recordForServer(ctx, next) {
        let orderId = ctx.params.orderId;
        let logisticsId = ctx.params.logisticsId;
        let body = await Service.recordForServer(orderId, logisticsId, ctx.cookies.get('sessionId')).then((response) => {
            let res = response.data;
            if (res.code == 10000) {
                let data = res.data;
                for (let i = 0; i < data.length; i++) {
                    let product = [];
                    for (let item of data[i].soReturnItemPos) {
                        product.push({
                            title: item.commodityName,
                            img: extendUrl.formaImg(item.imageUrl, 150),
                            tips: item.tip
                        })
                    }
                    data[i] = {
                        title: data[i].commodityName,
                        id: data[i].id,
                        product: product,
                        status: data[i].statusString,
                        type: data[i].typeString,
                        tips: data[i].tips
                    }
                }
                res.data={
                    list:data
                }
            }
            let re = {
                code: res.code,
                data: res.data,
                msg: res.msg
            };
            return res;
        })
        ctx.body = body;
    },
    async progress(ctx, next) {
        let serverId = ctx.params.serverId;
        let body = await Service.progress(serverId, ctx.cookies.get('sessionId')).then((response) => {
            let res = response.data;
            if (res.code == 10000) {
                let data = res.data;
                data.createTime = extendUrl.timeForma(data.createTime);
                if (data.type == 1) {
                    switch (data.status) {
                        case 1:
                            break;
                        case 2:
                            data.status = -1;
                            break;
                        case 3:
                            data.status = 2;
                            break;
                        case 4:
                            data.status = 2;
                            break;
                        case 5:
                            data.status = 3;
                            break;
                        case 6:
                            data.status = 3;
                            break;
                        case 7:
                            data.status = 4;
                            break;
                    }
                } else {
                    switch (data.status) {
                        case 1:
                            break;
                        case 2:
                            data.status = -1;
                            break;
                        case 3:
                            data.status = 2;
                            break;
                        case 4:
                            data.status = 2;
                            break;
                        case 5:
                            data.status = 3;
                            break;
                        case 6:
                            data.status = 4;
                            break;
                        case 7:
                            data.status = 5;
                            break;
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
    async logistics(ctx, next) {
        let orderId = ctx.params.orderId;
        let logisticsId = ctx.params.logisticsId;
        let body;
        if (logisticsId == "0") {
            body = await Service.waitList(orderId, ctx.cookies.get('sessionId')).then((response) => {
                let res = response.data;
                if (res.code == 10000) {
                    let data = res.data;
                    res.data = {
                        img: extendUrl.formaImg(data.waitList[0].imageUrl, 150),
                        list: [["暂未发货"]],
                        logisticsNum: '— —',
                        status: '未发货',
                        company: '— —',
                        tel: '— —'
                    }
                }
                return res;
            })
        } else {
            body = await Service.logistics(logisticsId, ctx.cookies.get('sessionId')).then((response) => {
                let res = response.data;
                if (res.code == 10000) {
                    let data = res.data;
                    let list = data.logisticsInfo.split('\n');
                    for (let k in list) {
                        list[k] = list[k].split("；")
                    }
                    let copyCata = {
                        img: extendUrl.formaImg(data.imageUrl, 150),
                        list: list,
                        logisticsNum: data.logisticsNo,
                        status: data.logisticsStatus,
                        company: '一智通',
                        tel: '400-6006-111'
                    }
                    res.data = copyCata;
                }
                let re = {
                    code: res.code,
                    data: res.data,
                    msg: res.msg
                };
                return res;
            });
        }
        ctx.body = body;
    },
    async logistics2(ctx, next) {
        let orderId = ctx.params.orderId;
        let logisticsId = ctx.params.logisticsId;
        let body;
        if (logisticsId == "0") {
            body = await Service.waitList2(orderId, ctx.cookies.get('sessionId')).then((response) => {
                let res = response.data;
                if (res.code == 10000) {
                    let data = res.data;
                    res.data = {
                        img: extendUrl.formaImg(data.waitList.list[0].imageUrl, 150),
                        list: [["暂未发货"]],
                        logisticsNum: '— —',
                        status: '未发货',
                        company: '— —',
                        tel: '— —'
                    }
                }
                return res;
            })
        } else {
            body = await Service.logistics(encodeURIComponent(logisticsId), ctx.cookies.get('sessionId')).then((response) => {
                let res = response.data;
                if (res.code == 10000) {
                    let data = res.data;
                    let list = data.logisticsInfo.split('\n');
                    for (let k in list) {
                        list[k] = list[k].split("；")
                    }

                    let status;
                    switch (data.logisticsStatus){
                        case 1:
                            status = '待发货';
                            break;
                        case 2:
                            status = '待收货';
                            break;
                        case 3:
                            status = '已收货';
                    }
                    let copyCata = {
                        img: extendUrl.formaImg(data.imageUrl, 150),
                        list: list,
                        logisticsNum: data.logisticsNo,
                        status: status,
                        company: data.logisticsName,
                        tel: data.logisticsPhone
                    }
                    res.data = copyCata;
                }
                let re = {
                    code: res.code,
                    data: res.data,
                    msg: res.msg
                };
                return res;
            });
        }
        ctx.body = body;
    }
}

module.exports = aftersale;