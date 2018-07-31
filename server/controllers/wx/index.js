const Service = require('./../../services/wx/index');
const extendUrl = require('./../../services/wx/tools/extendUrl');
const index = {
    //首页bannars
    async banners(ctx, next) {
        let body = await Service.banners().then((response) => {
            let res = response.data;
            if (res.code == 10000) {
                res.data.forEach(function (item, index) {
                    item.img = item.imageUrl;
                    delete item.imageUrl;
                });
            }
            let re = {
                code: res.code,
                data: res.data,
                msg: res.msg
            }
            return re;
        });
        ctx.body = body;
    },
    //便捷入口
    async convenient(ctx, next) {
        let body = await Service.convenient().then((response) => {
            let res = response.data;
            if (res.code == 10000) {
                res.data.forEach(function (item, index) {
                    item.img = item.imageUrl;
                    delete item.imageUrl;
                });
            }
            let re = {
                code: res.code,
                data: res.data,
                msg: res.msg
            }
            return re;
        });
        ctx.body = body
    },
    //限时秒杀
    async seckills(ctx, next) {
        let body = await Service.seckills().then((response) => {
            let res = response.data;
            if (res.code === 10000) {
                if (res.data) {
                    let data = res.data;
                    data.list.forEach(function (item, index) {
                        item.img = extendUrl.formaImg(item.imageUrl, 320);
                        delete item.imageUrl;
                        item.tips = item.title;
                        item.title = item.commodityName;
                        delete item.commodityName;
                        try {
                            item.delPrice = item.presentPrice.split("-")[0];
                            delete item.presentPrice;
                            item.price = item.price.split("-")[0];
                        } catch (err) {

                        }
                    });
                    if (data.systemTime > data.startTime && data.endTime > data.systemTime) {
                        //正在开抢
                        data.start = true;
                        data.startTime = data.systemTime;
                        delete data.systemTime
                    } else {
                        //下一场开抢
                        data.start = false;
                        data.endTime = data.startTime;
                        data.startTime = data.systemTime;
                        delete data.systemTime;
                    }
                }
            }
            let re = {
                code: res.code,
                data: res.data,
                msg: res.msg
            }
            return re;
        });
        ctx.body = body
    },
    //本周新品
    async weeks(ctx, next) {
        let data = {
            page: 1,
            pageSize: 7
        };
        let body = await Service.weeks(data).then((response) => {
            let res = response.data;
            if (res.code == 10000) {
                try {
                    res.data.list.forEach(function (item, index) {
                        item.img = extendUrl.formaImg(item.imageUrl, 320);
                        delete item.imageUrl;
                        item.tips = item.title;
                        item.title = item.commodityName;
                        delete item.commodityName;
                        try {
                            item.price = item.todayPrice.split("-")[0];
                            delete item.todayPrice;
                            item.payMonthly = item.todayPricePayMonthly;
                            delete item.todayPricePayMonthly;
                            if (item.tomorrowPrice) {
                                item.tomPrice = item.tomorrowPrice.split("-")[0];
                                delete item.tomorrowPrice;
                            }
                            if (item.tomorrowPayMonthly) {
                                item.tomPayMonthly = item.tomorrowPayMonthly;
                                delete item.tomorrowPayMonthly;
                            }
                            if (item.present_price) {
                                item.delPrice = item.present_price.split("-")[0];
                                delete item.present_price;
                            }
                            if (item.presentPrice) {
                                item.delPrice = item.presentPrice.split("-")[0];
                                delete item.presentPrice;
                            }
                            if (item.presentPricePayMonthly) {
                                item.delPayMonthly = item.presentPricePayMonthly;
                                delete item.presentPricePayMonthly;
                            }
                        } catch (err) {

                        }
                    });
                } catch (err) {

                }
            }
            let re = {
                code: res.code,
                data: res.data,
                msg: res.msg
            }
            return re;
        })
        ctx.body = body
    },
    //人气推荐
    async hotProducts(ctx, next) {
        let body = await Service.hotProducts().then((response) => {
            let res = response.data;
            if (res.code == 10000) {
                res.data.forEach(function (item, index) {
                    item.title = item.commodityName;
                    delete item.commodityName;
                    item.img = extendUrl.formaImg(item.imageUrl, 320);
                    delete item.imageUrl;
                    try {
                        item.price = item.price.split("-")[0]
                    } catch (err) {

                    }
                })
            }
            let re = {
                code: res.code,
                data: res.data,
                msg: res.msg
            }
            return re;
        });
        ctx.body = body
    },
    //选你所想
    async recommend(ctx, next) {
        let openId = ctx.params.openId;
        let page = ctx.query.page;
        let pageSize = ctx.query.pageSize;
        let body = await Service.recommend(openId, page, pageSize).then((response) => {
            let res = response.data;
            if (res.code == 10000) {
                res.data.list.forEach(function (item, index) {
                    item.tips = item.describe || item.title;
                    item.title = item.commodityName;
                    delete item.commodityName;
                    delete item.describe;
                    item.img = extendUrl.formaImg(item.imageUrl, 320);
                    delete item.imageUrl;
                    try {
                        item.price = item.price.split("-")[0];
                    } catch (err) {
                    }
                })
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
module.exports = index;