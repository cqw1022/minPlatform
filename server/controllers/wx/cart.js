const Service = require('./../../services/wx/cart');
const extendUrl = require('./../../services/wx/tools/extendUrl');

const qs = require('qs');

const cart = {
    async addAllCart(ctx, next) {
        let requestBody = ctx.request.body;
        let list = JSON.parse(requestBody.list)
        for (let i = 0; i < list.length; i++) {
            let item = list[i];
            list[i] = {
                commodityPriceId: item.skuId,
                amount: item.num
            }
            if(item.cartId){
                list[i].id = item.cartId
            }
        }
        let body = await Service.addAllCart(list, ctx.sessionId).then((response) => {
            let res = response.data;
            let re = {
                code: res.code,
                data: res.data,
                msg: res.msg
            };
            return re;
        });
        ctx.body = body;
    },
    async addCart(ctx, next) {
        let skuId = ctx.params.skuId;
        let requestBody = {amount: ctx.request.body.num};
        let body = await Service.addCart(skuId, requestBody, ctx.sessionId).then((response) => {
            let res = response.data;
            let re = {
                code: res.code,
                data: res.data,
                msg: res.msg
            };
            return res;
        }).catch(function (error) {
            if (error.response) {
                // 请求已发出，但服务器响应的状态码不在 2xx 范围内
                return {
                    data: error.response.data,
                    status: error.response.status,
                    headers: error.response.headers
                }
            } else {
                // Something happened in setting up the request that triggered an Error=
                return {
                    message: error.message
                }
            }
            // console.log(error.config);
        });
        ctx.body = body;
        // ctx.body = {
        //   skuId,
        //   body:JSON.stringify(requestBody)
        // }
    },
    async addPage(ctx,next){
        let requestBody = ctx.request.body;
        let data= []
        for(let item of JSON.parse(requestBody.data)){
            data.push({
                commodityPriceId: item.skuId,
                amount: item.num
            })
        }
        let body = await Service.addPage(data, ctx.sessionId).then((response) => {
            let res = response.data;
            let re = {
                code: res.code,
                data: res.data,
                msg: res.msg
            };
            return res;
        })
        ctx.body = body;
    },
    async deleteCart(ctx, next) {
        let cartId = ctx.params.cartId;
        let body = await Service.deleteCart(cartId, ctx.sessionId).then((response) => {
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
    async deleteCarts(ctx, next) {
        let requestBody = ctx.request.body;
        let data = {shoppingCartIds: requestBody.cartId};
        let body = await Service.deleteCarts(data, ctx.sessionId).then((response) => {
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
    async modifyCart(ctx, next) {
        let requestBody = ctx.request.body;
        let data = {
            commodityPriceId: ctx.params.skuId,
            amount: requestBody.num
        }
        let body = await Service.modifyCart(data, ctx.sessionId).then((response) => {
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
    async modifyAllCart(ctx, next) {
        let requestBody = ctx.request.body;
        let list = JSON.parse(requestBody.list)
        for (let i = 0; i < list.length; i++) {
            let item = list[i];
            list[i] = {
                id:item.cartId,
                commodityPriceId: item.skuId,
                amount: item.num
            }
            if(item.cartId){
                list[i].id = item.cartId
            }
        }
        let body = await Service.modifyAllCart(list, ctx.sessionId).then((response) => {
            let res = response.data;
            let re = {
                code: res.code,
                data: res.data,
                msg: res.msg
            };
            return re;
        });
        ctx.body = body;
    },
    async getAllCart(ctx, next) {
        let query = null;
        if (ctx.request.query.cartId) {
            query = {ids: ctx.request.query.cartId}
        }
        let body = await Service.getAllCart(query, ctx.sessionId).then((response) => {
            let res = response.data;
            let data = res.data;
            if (res.code === 10000) {
                data.forEach(function (item, index) {
                    item.title = item.commodityName;
                    delete item.commodityName;
                    item.num = item.amount;
                    delete item.amount;
                    item.pid = item.commodityId;
                    delete item.commodityId;
                    item.img = extendUrl.formaImg(item.imageUrl, 150);
                    delete item.imageUrl;
                    item.cartId = item.id;
                    delete item.id;
                    item.relateId = item.relate;
                    delete item.relate;
                    item.remian = item.stock;
                    delete item.stock;
                    item.skuId = item.commodityPriceId;
                    delete  item.commodityPriceId;
                    item.saleType = item.activeType;
                    delete item.activeType;
                    switch (item.saleType) {
                        case 0:
                            break;
                        case 1:
                            item.delPrice = item.price;
                            item.price = item.activePrice;
                            item.label = '秒杀价';
                            break;
                        case 2:
                            item.delPrice = item.price;
                            item.price = item.activePrice;
                            item.label = '上新价';
                            break;
                    }
                    delete item.activePrice;
                    item.status = item.commodityStatus;
                    delete item.commodityStatus;
                    delete item.volume;
                    delete item.weight;
                    if(item.discount){
                        item.price = Math.floor(item.price*item.discount)
                    }
                })
            }
            let re = {
                code: res.code,
                data: data,
                msg: res.msg
            };
            return re;
        });
        ctx.body = body;
    },
    async getCartGroup(ctx,next){
        let query = null;
        if (ctx.request.query.cartId) {
            query = {ids: ctx.request.query.cartId}
        }
        let body = await Service.getCartGroup(query, ctx.sessionId).then((response) => {
            let res = response.data;
            let data = res.data;
            if (res.code === 10000) {
                data.allPage = data.packageMap;
                delete data.packageMap;
                data.allCart = data.packageDataList;
                delete  data.packageDataList;
                delete data.shoppingCartList;
                let allCartLength = data.allCart.length;
                let noCartList = []
                for(let i = 0;i<allCartLength;i++){
                    let item = data.allCart[i];
                    if(item.commodityId){
                        item.title = item.commodityName;
                        delete item.commodityName;
                        item.num = item.amount;
                        delete item.amount;
                        item.pid = item.commodityId;
                        delete item.commodityId;
                        item.img = extendUrl.formaImg(item.imageUrl, 150);
                        delete item.imageUrl;
                        item.cartId = item.id;
                        delete item.id;
                        item.relateId = item.relate;
                        delete item.relate;
                        item.remian = item.stock;
                        delete item.stock;
                        item.skuId = item.commodityPriceId;
                        delete  item.commodityPriceId;
                        item.saleType = item.activeType;
                        delete item.activeType;
                        switch (item.saleType) {
                            case 0:
                                break;
                            case 1:
                                item.delPrice = item.price;
                                item.price = item.activePrice;
                                item.label = '秒杀价';
                                break;
                            case 2:
                                item.delPrice = item.price;
                                item.price = item.activePrice;
                                item.label = '上新价';
                                break;
                        }
                        delete item.activePrice;
                        item.status = item.commodityStatus;
                        delete item.commodityStatus;
                        if(item.status){
                            noCartList.push(data.allCart.splice(i,1));
                            i--;
                            allCartLength--;
                        }
                    }else{
                        item.carts = item.shoppingCartList;
                        delete item.shoppingCartList;
                        item.pages = item.packageList;
                        delete item.packageList;
                        let cartsLength = item.carts.length;
                        let noCarts = [];
                        for(let j=0;j<cartsLength;j++){
                            let it = item.carts[j];
                            it.title = it.commodityName;
                            delete it.commodityName;
                            it.num = it.amount;
                            delete it.amount;
                            it.pid = it.commodityId;
                            delete it.commodityId;
                            it.img = extendUrl.formaImg(it.imageUrl, 150);
                            delete it.imageUrl;
                            it.cartId = it.id;
                            delete it.id;
                            it.relateId = it.relate;
                            delete it.relate;
                            it.remian = it.stock;
                            delete it.stock;
                            it.skuId = it.commodityPriceId;
                            delete  it.commodityPriceId;
                            it.saleType = it.activeType;
                            delete it.activeType;
                            switch (it.saleType) {
                                case 0:
                                    break;
                                case 1:
                                    it.delPrice = it.price;
                                    it.price = it.activePrice;
                                    it.label = '秒杀价';
                                    break;
                                case 2:
                                    it.delPrice = it.price;
                                    it.price = it.activePrice;
                                    it.label = '上新价';
                                    break;
                            }
                            delete it.activePrice;
                            it.status = it.commodityStatus;
                            delete it.commodityStatus;
                            if(it.status){
                                noCarts.push(item.carts.splice(j,1));
                                j--;
                                cartsLength--;
                            }
                        }
                        item.carts = item.carts.concat(...noCarts);
                    }
                }
                data.allCart = data.allCart.concat(...noCartList);
                console.log(data.allCart.length)
            }
            let re = {
                code: res.code,
                data: data,
                msg: res.msg
            };
            return re;
        });
        ctx.body = body;
    },
    async getInfo(ctx, next) {
        let skuId = ctx.request.query.skuId;
        let body = await Service.getInfo(skuId, ctx.sessionId).then((response) => {
            let res = response.data;
            let data = res.data;
            if (res.code === 10000) {
                data.forEach(function (item, index) {
                    item.title = item.commodityName;
                    delete item.commodityName;
                    item.num = item.amount;
                    delete item.amount;
                    item.pid = item.commodityId;
                    delete item.commodityId;
                    item.img = extendUrl.formaImg(item.imageUrl, 150);
                    delete item.imageUrl;
                    item.cartId = item.id;
                    delete item.id;
                    item.relateId = item.relate;
                    delete item.relate;
                    item.remian = item.stock;
                    delete item.stock;
                    item.skuId = item.commodityPriceId;
                    delete  item.commodityPriceId;
                    item.saleType = item.activeType;
                    delete item.activeType;
                    switch (item.saleType) {
                        case 0:
                            break;
                        case 1:
                            item.delPrice = item.price;
                            item.price = item.activePrice;
                            item.label = '秒杀价';
                            break;
                        case 2:
                            item.delPrice = item.price;
                            item.price = item.activePrice;
                            item.label = '上新价';
                            break;
                    }
                    delete item.activePrice;
                    item.status = item.commodityStatus;
                    delete item.commodityStatus;
                })
            }
            let re = {
                code: res.code,
                data: data,
                msg: res.msg
            };
            return re;
        })
        ctx.body = body;
    },
    async getCartGroupInfo(ctx,next){
        let skuId = ctx.request.query.skuId;
        let body = await Service.getCartGroupInfo(skuId).then((response) => {
            let res = response.data;
            let data = res.data;
            if (res.code === 10000) {
                data.allPage = data.packageMap;
                delete data.packageMap;
                data.allCart = data.packageDataList;
                delete  data.packageDataList;
                delete data.shoppingCartList;
                let allCartLength = data.allCart.length;
                let noCartList = []
                for(let i = 0;i<allCartLength;i++){
                    let item = data.allCart[i];
                    if(item.commodityId){
                        item.title = item.commodityName;
                        delete item.commodityName;
                        item.num = item.amount;
                        delete item.amount;
                        item.pid = item.commodityId;
                        delete item.commodityId;
                        item.img = extendUrl.formaImg(item.imageUrl, 150);
                        delete item.imageUrl;
                        item.cartId = item.id;
                        delete item.id;
                        item.relateId = item.relate;
                        delete item.relate;
                        item.remian = item.stock;
                        delete item.stock;
                        item.skuId = item.commodityPriceId;
                        delete  item.commodityPriceId;
                        item.saleType = item.activeType;
                        delete item.activeType;
                        switch (item.saleType) {
                            case 0:
                                break;
                            case 1:
                                item.delPrice = item.price;
                                item.price = item.activePrice;
                                item.label = '秒杀价';
                                break;
                            case 2:
                                item.delPrice = item.price;
                                item.price = item.activePrice;
                                item.label = '上新价';
                                break;
                        }
                        delete item.activePrice;
                        item.status = item.commodityStatus;
                        delete item.commodityStatus;
                        if(item.status){
                            noCartList.push(data.allCart.splice(i,1));
                            i--;
                            allCartLength--;
                        }
                    }else{
                        item.carts = item.shoppingCartList;
                        delete item.shoppingCartList;
                        item.pages = item.packageList;
                        delete item.packageList;
                        let cartsLength = item.carts.length;
                        let noCarts = [];
                        for(let j=0;j<cartsLength;j++){
                            let it = item.carts[j];
                            it.title = it.commodityName;
                            delete it.commodityName;
                            it.num = it.amount;
                            delete it.amount;
                            it.pid = it.commodityId;
                            delete it.commodityId;
                            it.img = extendUrl.formaImg(it.imageUrl, 150);
                            delete it.imageUrl;
                            it.cartId = it.id;
                            delete it.id;
                            it.relateId = it.relate;
                            delete it.relate;
                            it.remian = it.stock;
                            delete it.stock;
                            it.skuId = it.commodityPriceId;
                            delete  it.commodityPriceId;
                            it.saleType = it.activeType;
                            delete it.activeType;
                            switch (it.saleType) {
                                case 0:
                                    break;
                                case 1:
                                    it.delPrice = it.price;
                                    it.price = it.activePrice;
                                    it.label = '秒杀价';
                                    break;
                                case 2:
                                    it.delPrice = it.price;
                                    it.price = it.activePrice;
                                    it.label = '上新价';
                                    break;
                            }
                            delete it.activePrice;
                            it.status = it.commodityStatus;
                            delete it.commodityStatus;
                            if(it.status){
                                noCarts.push(item.carts.splice(j,1));
                                j--;
                                cartsLength--;
                            }
                        }
                        item.carts = item.carts.concat(...noCarts);
                    }
                }
                data.allCart = data.allCart.concat(...noCartList);
                console.log(data.allCart.length)
            }
            let re = {
                code: res.code,
                data: data,
                msg: res.msg
            };
            return re;
        })
        ctx.body = body;
    },
    async cover(ctx, next) {
        let requestBody = ctx.request.body;
        let data = {
            commodityPriceId: ctx.params.skuId,
            amount: requestBody.num
        }
        let body = await Service.cover(data, ctx.sessionId).then((response) => {
            let res = response.data;
            if (res.code == 10000) {

            }
            return res;
        })
        ctx.body = body;
    },
    async covers(ctx,next){
        let requestBody = ctx.request.body;
        let data= []
        for(let item of JSON.parse(requestBody.data)){
            data.push({
                commodityPriceId: item.skuId,
                amount: item.num
            })
        }
        let body = await Service.covers(data, ctx.sessionId).then((response) => {
            let res = response.data;
            if (res.code == 10000) {

            }
            return res;
        })
        ctx.body = body;
    }
};

module.exports = cart;