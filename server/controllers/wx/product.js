const Service = require('./../../services/wx/product');
const extendUrl = require('./../../services/wx/tools/extendUrl');
const cheerio = require('cheerio');


const product = {
    async category1(ctx, next) {
        let category1 = await Service.category(0).then((response) => {
            let res = response.data.data;
            res.forEach(function (item, index) {
                item.name = item.contentsName;
                delete item.contentsName;
            })
            return res;
        })
        ctx.body = category1
    },
    async allCategory(ctx, next) {
        let category1 = await Service.category(0).then((response) => {
            let res = response.data.data;
            res.forEach(function (item, index) {
                item.name = item.contentsName;
                delete item.contentsName;
            })
            return res;
        })
        let category2 = [];
        for (let item of category1) {
            let categoryData = await Service.category(item.id).then((response) => {
                let res = response.data.data;
                res.forEach(function (item, index) {
                    item.name = item.contentsName;
                    delete item.contentsName;
                })
                return res;
            }, (err) => {
                return [];
            })
            category2.push(categoryData)
        }
        let re = {
            code: 10000,
            data: {category1, category2},
            msg: '获取成功'
        };
        ctx.body = re
    },
    async category(ctx, next) {
        let id = ctx.params.id;
        let body = await Service.category(id).then((response) => {
            let res = response.data;
            if (id == 0) {
                res.data.forEach(function (item, index) {
                    item.name = item.contentsName;
                    delete item.contentsName;
                })
            }
            let re = {
                code: res.code,
                data: res.data,
                msg: res.msg
            };
            return re;
        })
        ctx.body = body
    },
    async filter(ctx, next) {
        let body = await Service.filter().then((response) => {
            let res = response.data;
            res.data.brandList.forEach(function (item, index) {
                item.name = item.brandName;
                delete item.brandName;
                item.bid = item.id;
                delete item.id;
            });
            let brand = res.data.brandList;
            res.data.stuffList.forEach(function (item, index) {
                item.name = item.stuffName;
                delete item.stuffName;
                item.mid = item.id;
                delete item.id;
            });
            let material = res.data.stuffList;
            res.data.styleList.forEach(function (item, indedx) {
                item.name = item.styleName;
                delete item.styleName;
                item.sid = item.id;
                delete item.id;
            });
            let style = res.data.styleList;


            res.data.contentList.forEach(function (item, indedx) {
                item.name = item.contentsName;
                delete item.contentsName;
                item.cid = item.id;
                delete item.id;
            });
            let category = res.data.contentList;


            let re = {
                code: res.code,
                data: {
                    brand: brand,
                    material: material,
                    style: style,
                    category: category
                },
                msg: res.msg
            };
            return re;
        });
        ctx.body = body
    },
    async forKeyword(ctx, next) {
        let keyword = ctx.query.keyword;
        let tid = ctx.query.tid;
        let mid = ctx.query.mid;
        let bid = ctx.query.bid;
        let sid = ctx.query.sid;
        let minPrice = ctx.query.minPrice;
        let maxPrice = ctx.query.maxPrice;
        let page = ctx.query.page;
        let pageSize = ctx.query.pageSize;
        let data = {
            keyword: keyword,
            sort: tid,
            stuffId: mid,
            brandId: bid,
            styleId: sid,
            minPrice: minPrice,
            maxPrice: maxPrice,
            page: page,
            pageSize: pageSize
        };
        for (let k in data) {
            if (!data[k]) {
                delete data[k]
            }
        }
        ;
        let body = await Service.forKeyword(data).then((response) => {
            let res = response.data;
            if (res.code == 10000) {
                res.data.list.forEach(function (item, index) {
                    item.title = item.commodity;
                    delete item.commodity;
                    item.img = extendUrl.formaImg(item.imageUrl, 320);
                    delete item.imageUrl;
                    item.price = item.price_section.split('-')[0];
                    delete item.price_section;
                })
            }
            let re = {
                code: res.code,
                data: res.data,
                msg: res.msg
            };
            return re;
        })
        ctx.body = body
    },
    async forCategory(ctx, next) {
        let aid = ctx.query.aid;
        let cid = ctx.query.cid;
        let tid = ctx.query.tid;
        let mid = ctx.query.mid;
        let bid = ctx.query.bid;
        let sid = ctx.query.sid;
        let minPrice = ctx.query.minPrice;
        let maxPrice = ctx.query.maxPrice;
        let excludeId = ctx.query.excludeId;
        let page = ctx.query.page;
        let pageSize = ctx.query.pageSize;
        let data = {
            attributeId: aid,
            contentsId: cid,
            sort: tid,
            stuffId: mid,
            brandId: bid,
            styleId: sid,
            minPrice: minPrice,
            maxPrice: maxPrice,
            excludeId:excludeId,
            page: page,
            pageSize: pageSize
        };
        for (let k in data) {
            if (!data[k]) {
                delete data[k]
            }
        }
        let body = await Service.forCategory(data).then((response) => {
            let res = response.data;
            if (res.code == 10000) {
                res.data.list.forEach(function (item, index) {
                    item.title = item.commodity;
                    delete item.commodity;
                    item.img = extendUrl.formaImg(item.imageUrl, 320);
                    delete item.imageUrl;
                    try {
                        item.price = item.price_section.split('-')[0];
                        delete item.price_section;
                    } catch (err) {
                        item.price = item.price_section;
                        delete item.price_section;
                    }
                })
            }
            let re = {
                code: res.code,
                data: res.data,
                msg: res.msg
            };
            return re;
        })
        ctx.body = body
    },
    async itemDetail(ctx, next) {
        let id = ctx.params.id;
        let skuId = ctx.request.query.skuId;
        let storeId = ctx.request.query.storeId;
        let data = {};
        if(skuId){
            data.commodityPriceId=skuId;
        }
        if(storeId){
            data.meLexjId=storeId;
        }
        console.log(data)
        let body = await Service.itemInfo(id,data, ctx.sessionId).then((response) => {
            let res = response.data;
            if (res.code == 10000) {
                let data = res.data;

                data.title = data.commodityName;
                delete data.commodityName;

                data.status = data.state;
                delete data.state;

                data.banner = data.imageList;
                delete data.imageList;
                try {
                    data.intro = JSON.parse(data.introduce).intro;
                } catch (err) {
                    data.intro = [];
                }
                delete data.introduce;


                for (let k in data.parameter) {
                    if (!data.parameter[k]) {
                        data.parameter.splice(k, 1)
                    }
                }
                data.param = data.parameter;

                delete data.parameter;

                data.price = data.presentPrice;
                delete data.presentPrice;


                let saleInfo;
                if(data.commodityPricePo){
                    data.skuId = data.commodityPricePo.id;
                    data.relateId = data.commodityPricePo.relate;
                }
                switch (data.saleType) {
                    case 0:
                        //普通状态
                        saleInfo = data.commodityPricePo;
                        if (saleInfo) {
                            data.skuId = saleInfo.id;
                            data.relateId = saleInfo.relate;
                            data.price = saleInfo.presentPrice;
                            data.remain = saleInfo.stock;
                        }
                        break;
                    case 1:
                        //限时秒杀
                        saleInfo = data.saleInfo;

                        if (saleInfo.systemTime > saleInfo.startTime && saleInfo.endTime > saleInfo.systemTime) {
                            data.remain = saleInfo.remain;
                            let seckillData = saleInfo.seckillData;
                            if (seckillData) {
                                if(!data.skuId){
                                    data.skuId = seckillData.commodityPriceId;
                                    data.relateId = seckillData.relateId;
                                }
                                data.delPrice = seckillData.presentPrice;
                                data.price = seckillData.price;
                                data.remain = seckillData.remain;
                            }
                            data.seckillInfo = {};


                            //正在开抢
                            data.seckillInfo.startTime = saleInfo.systemTime;
                            data.seckillInfo.endTime = saleInfo.endTime;
                        } else if (saleInfo.startTime > saleInfo.systemTime) {
                            let seckillData = saleInfo.seckillData;
                            data.discountPrice = saleInfo.price;
                            if (seckillData) {
                                if(!data.skuId){
                                    data.skuId = seckillData.commodityPriceId;
                                    data.relateId = seckillData.relateId;
                                }
                                data.remain = seckillData.remain;
                            }
                            data.seckillInfo = {};

                            //下一场开抢
                            // data.discountPrice = saleInfo.presentPrice;
                            data.saleType = 3;
                            data.seckillInfo.endTime = saleInfo.startTime;
                            data.seckillInfo.startTime = saleInfo.systemTime;
                            data.seckillInfo.day = Math.ceil((saleInfo.startTime - saleInfo.systemTime) / 86400000)
                        }
                        break;
                    case 2:
                        //每周上新
                        data.remain = data.stock;
                        saleInfo = data.saleInfo;
                        let dayTime = 86400000;
                        let diffDate = Math.floor((saleInfo.systemTime - saleInfo.startTime) / dayTime);
                        let dateList = saleInfo.list;
                        for (let k in dateList) {
                            if (k == diffDate) {
                                dateList[k] = {
                                    date: "今日价",
                                    price: dateList[k].split("-")[0]
                                }
                            } else if (k == dateList.length - 1) {
                                dateList[k] = {
                                    date: "原价",
                                    price: dateList[k].split("-")[0]
                                }
                            } else {
                                let thisDate = new Date(saleInfo.startTime + dayTime * k);
                                dateList[k] = {
                                    date: (thisDate.getMonth() + 1) + "月" + thisDate.getDate() + "日",
                                    price: dateList[k].split("-")[0]
                                }
                            }
                        }
                        data.weekInfo = {
                            list: dateList,
                            today: diffDate
                        };

                        saleInfo = data.commodityPricePo;
                        if (saleInfo) {
                            if(!data.skuId){
                                data.skuId = saleInfo.id;
                                data.relateId = saleInfo.relate;
                            }
                            data.delPrice = saleInfo.presentPrice;
                            data.price = saleInfo.price;
                            data.remain = saleInfo.stock;
                        }
                        break;
                }
                delete data.saleInfo;
                delete data.stock;
                delete data.commodityPricePo;
                if(data.salePackagePo){
                    let item =  data.salePackagePo;
                    let itemData = {};
                    itemData.id = item.id;
                    itemData.productsId = item.commodityIds;
                    itemData.discount = item.discount;
                    itemData.discountPrice = item.discountPrice;
                    itemData.title = item.title;
                    for(let j = 0;j<item.commodityPos.length;j++){
                        let it = item.commodityPos[j];
                        let itData = {};
                        itData.title = it.commodityName;
                        itData.id = it.id;
                        itData.img = extendUrl.formaImg(it.imageUrl, 320);
                        try {
                            itData.price = it.price.split('-')[0];
                        }catch(err){
                            itData.price = it.price;
                        }
                        item.commodityPos[j] = itData;
                    }
                    itemData.products = item.commodityPos;
                    itemData.discount = item.discount;
                    data.page = itemData;
                    delete data.salePackagePo;
                }
            }
            return res;
        })
        ctx.body = body;
    },
    async dimensions(ctx, next) {
        let id = ctx.params.id;
        let body = await Service.dimensions(id).then((response) => {
            let res = response.data;
            if (res.code === 10000) {
                res.data.list.forEach(function (item, index) {
                    item.choice.forEach(function (it, idx) {
                        for (let k in it) {
                            if (k !== 'id') {
                                it.value = it[k];
                                delete it[k];
                                it.id = it.id.toString();
                            }
                        }
                    })
                    item.index--;
                })
                res.data.dimensions = res.data.list;
                delete res.data.list;
                let defaultSeckillRemain = 0
                res.data.relate.forEach(function (item, index) {
                    item.saleType = item.activeType;
                    delete item.activeType;
                    item.img = extendUrl.formaImg(item.imageUrl, 150);
                    delete item.imageUrl;
                    item.relateId = item.relate;
                    delete item.relate;
                    item.allStock = item.stock;
                    delete item.stock;
                    item.skuId = item.id;
                    delete item.id;
                    switch (item.saleType) {
                        case 0:
                            item.price = item.presentPrice;
                            item.advancePayment = item.presentPriceAdvancePayment;
                            item.payMonthly = item.presentPricePayMonthly;
                            break;
                        case 1:
                            item.delPrice = item.presentPrice;
                            item.delAdvancePayment = item.presentPriceAdvancePayment;
                            item.delPayMonthly = item.presentPricePayMonthly;

                            item.price = item.seckillPrice;
                            item.advancePayment = item.seckillPriceAdvancePayment;
                            item.payMonthly = item.seckillPricePayMonthly;
                            defaultSeckillRemain += item.seckillRemain;
                            break;
                        case 2:
                            item.delPrice = item.presentPrice;
                            item.delAdvancePayment = item.presentPriceAdvancePayment;
                            item.delPayMonthly = item.presentPricePayMonthly;
                            item.price = item.weekPrice;
                            item.advancePayment = item.weekPriceAdvancePayment;
                            item.payMonthly = item.weekPricePayMonthly;
                            break;
                        case 3:
                            item.price = item.presentPrice;
                            item.advancePayment = item.presentPriceAdvancePayment;
                            item.payMonthly = item.presentPricePayMonthly;
                            item.discountPrice = item.seckillPrice;
                            item.discountAdvancePayment = item.seckillPriceAdvancePayment;
                            item.discountPayMonthly = item.seckillPricePayMonthly;
                    }
                    delete item.seckillPrice;
                    delete item.seckillPriceAdvancePayment;
                    delete item.seckillPricePayMonthly;
                    delete item.weekPrice;
                    delete item.weekPriceAdvancePayment;
                    delete item.weekPricePayMonthly;
                    delete item.presentPrice;
                    delete item.presentPricePayMonthly;
                    delete item.presentPriceAdvancePayment;
                });
                res.data.img = extendUrl.formaImg(res.data.commodity.defaultImageUrl, 150);
                res.data.remain = defaultSeckillRemain;
                let delPrice = res.data.commodity.presentPrice;
                let price = res.data.commodity.defaultPrice.price;
                if(delPrice != price){
                    res.data.delPrice = delPrice;
                    res.data.price = price;
                }else{
                    res.data.price = price;
                }
                res.data.advancePayment = res.data.commodity.defaultPrice.advancePayment;
                res.data.payMonthly = res.data.commodity.defaultPrice.payMonthly;
                res.data.discountPrice = res.data.commodity.seckillPrice;
                delete res.data.commodity
            }
            let re = {
                code: res.code,
                data: res.data,
                msg: res.msg,

            }
            return re;
        })
        ctx.body = body
    },
    async dimensionses(ctx,next){
        let id = ctx.params.id;
        let body = await Service.dimensionses(id).then((response) => {
            let res = response.data;

            if (res.code === 10000) {
                let dataList = res.data;
                dataList.forEach(function (dataItem,index) {
                    dataItem.list.forEach(function (item, index) {
                        item.choice.forEach(function (it, idx) {
                            for (let k in it) {
                                if (k !== 'id') {
                                    it.value = it[k];
                                    delete it[k];
                                    it.id = it.id.toString();
                                }
                            }
                        })
                        item.index--;
                    })
                    dataItem.dimensions = dataItem.list;
                    delete dataItem.list;
                    let defaultSeckillRemain = 0
                    dataItem.relate.forEach(function (item, index) {
                        item.saleType = item.activeType;
                        delete item.activeType;
                        item.img = extendUrl.formaImg(item.imageUrl, 150);
                        delete item.imageUrl;
                        item.relateId = item.relate;
                        delete item.relate;
                        item.allStock = item.stock;
                        delete item.stock;
                        item.skuId = item.id;
                        delete item.id;
                        switch (item.saleType) {
                            case 0:
                                item.price = item.presentPrice;
                                item.advancePayment = item.presentPriceAdvancePayment;
                                item.payMonthly = item.presentPricePayMonthly;
                                break;
                            case 1:
                                item.delPrice = item.presentPrice;
                                item.delAdvancePayment = item.presentPriceAdvancePayment;
                                item.delPayMonthly = item.presentPricePayMonthly;

                                item.price = item.seckillPrice;
                                item.advancePayment = item.seckillPriceAdvancePayment;
                                item.payMonthly = item.seckillPricePayMonthly;
                                defaultSeckillRemain += item.seckillRemain;
                                break;
                            case 2:
                                item.delPrice = item.presentPrice;
                                item.delAdvancePayment = item.presentPriceAdvancePayment;
                                item.delPayMonthly = item.presentPricePayMonthly;
                                item.price = item.weekPrice;
                                item.advancePayment = item.weekPriceAdvancePayment;
                                item.payMonthly = item.weekPricePayMonthly;
                                break;
                            case 3:
                                item.price = item.presentPrice;
                                item.advancePayment = item.presentPriceAdvancePayment;
                                item.payMonthly = item.presentPricePayMonthly;
                                item.discountPrice = item.seckillPrice;
                                item.discountAdvancePayment = item.seckillPriceAdvancePayment;
                                item.discountPayMonthly = item.seckillPricePayMonthly;
                        }
                        delete item.seckillPrice;
                        delete item.seckillPriceAdvancePayment;
                        delete item.seckillPricePayMonthly;
                        delete item.weekPrice;
                        delete item.weekPriceAdvancePayment;
                        delete item.weekPricePayMonthly;
                        delete item.presentPrice;
                        delete item.presentPricePayMonthly;
                        delete item.presentPriceAdvancePayment;
                    });
                    dataItem.img = extendUrl.formaImg(dataItem.commodity.defaultImageUrl, 150);
                    dataItem.remain = defaultSeckillRemain;

                    let delPrice = dataItem.commodity.presentPrice;
                    let price = dataItem.commodity.defaultPrice.price;
                    if(delPrice != price){
                        dataItem.delPrice = delPrice;
                        dataItem.price = price;
                    }else{
                        dataItem.price = price;
                    }
                    dataItem.advancePayment = dataItem.commodity.defaultPrice.advancePayment;
                    dataItem.payMonthly = dataItem.commodity.defaultPrice.payMonthly;
                    dataItem.discountPrice = dataItem.commodity.seckillPrice;
                    delete dataItem.commodity
                })
            }
            let re = {
                code: res.code,
                data: res.data,
                msg: res.msg,

            }
            return re;
        })
        ctx.body = body
    },
    async markProduct(ctx, next) {
        let id = ctx.params.id;
        let body = await Service.markProduct(id, ctx.sessionId).then((response) => {
            let res = response.data;
            let re = {
                code: res.code,
                data: res.data,
                msg: res.msg
            };
            return re;
        })
        ctx.body = body
    },
    async cancelMarkProduct(ctx, next) {
        let id = ctx.params.id;
        let body = await Service.cancelMarkProduct(id, ctx.sessionId).then((response) => {
            let res = response.data;
            let re = {
                code: res.code,
                data: res.data,
                msg: res.msg
            };
            return re;
        })
        ctx.body = body;
    },
    async shareImg(ctx, next){
        let body = await Service.shareImg(ctx.request.query,ctx.sessionId).then((response) => {
            let res = response.data;
            let re = {
                code: res.code,
                data: res.data.replace(/http:\/\/img.lexj.com/,"https://lexj-oss.oss-cn-shenzhen.aliyuncs.com"),
                msg: res.msg
            };
            return re;
        })
        ctx.body = body;
    },
    async getPage(ctx,next){
        let id = ctx.params.id;
        let body = await Service.getPage(id).then((response) => {
            let res = response.data;
            let re = {
                code: res.code,
                data: res.data,
                msg: res.msg
            };
            return re;
        })
        ctx.body = body;
    },
    async getPages(ctx,next){
        let id = ctx.params.id;
        let body = await Service.getPages(id).then((response) => {
            let res = response.data;
            let data = res.data;
            for(let i = 0;i<data.length;i++){
                let item = data[i];
                let itemData = {};

                itemData.id = item.id;
                itemData.productsId = item.commodityIds;
                itemData.discount = item.discount;
                itemData.discountPrice = item.discountPrice;
                itemData.title = item.title;
                for(let j = 0;j<item.commodityPos.length;j++){
                    let it = item.commodityPos[j];
                    let itData = {};
                    itData.title = it.commodityName;
                    itData.id = it.id;
                    itData.img = it.imageUrl;
                    try {
                        itData.price = it.price.split('-')[0];
                    }catch(err){
                        itData.price = it.price;
                    }
                    data[i].commodityPos[j] = itData;
                }
                itemData.products = item.commodityPos;
                itemData.discount = item.discount;

                data[i] = itemData;
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
    async itemKeyMessage(ctx,next){
        let id = ctx.params.id;
        let body = await Service.itemKeyMessage(id).then((response)=>{
            let res = response.data;
            let data = res.data;
            let obj = {
                category1 :{
                    id: data.firstContentsId,
                    text: data.firstContents
                },
                category2 :{
                    id: data.secondContentsId,
                    text: data.secondContents
                },
                style:{
                    id:data.styleId,
                    text:data.style
                },
                img : extendUrl.formaImg(data.imageUrl, 320)
            }
            res.data = obj;
            return res;
        })
        ctx.body = body;
    },
    async recommend(ctx,next){
        let query = ctx.request.query;
        let data = {
            styleId:query.sid,
            firstContentsId:query.cid1,
            secondContentsId:query.cid2,
            page:query.page,
            pageSize:query.pageSize,
            excludeId:query.excludeId
        }
        let body = await Service.recommend(data).then((response)=>{
            let res = response.data;
            if (res.code == 10000) {
                let list = []
                res.data.list.forEach(function (item, index) {
                    list.push({
                        title:item.title,
                        img : extendUrl.formaImg(item.imageUrl, 320),
                        price: item.price_section.split('-')[0],
                        id: item.id,
                        payMonthly: item.payMonthly
                    })
                })
                res.data.list = list;
            }
            let re = {
                code: res.code,
                data: res.data,
                msg: res.msg
            };
            return re;
        })
        ctx.body = body;
    }
};

module.exports = product;

