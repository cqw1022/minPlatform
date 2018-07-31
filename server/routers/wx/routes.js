/**
 * 整合所有wx子路由
 */
const router = require('koa-router')();
const index = require('./index');
const lexj = require('./lexj');
const lexty = require('./lexty');
const operation = require('./operation');
const product = require('./product');
const search = require('./search');
const cart = require('./cart');
const user = require('./user');
const common = require('./common');
const order = require('./order');
const coupon = require('./coupon');
const pay = require('./pay');
const shareHome = require('./shareHome');
const aftersale = require('./aftersales');
const marked = require('./marked')
const other = require('./other');
const activity = require('./activity')
const monthlyPayment = require('./monthlyPayment')
const profit = require('./profit')
const upload = require('./upload')
const shareList = require('./shareList');
const partner = require('./partner');

router.use('/index', index.routes(), index.allowedMethods())
    .use('/lexj', lexj.routes(), lexj.allowedMethods())
    .use('/lexty', lexty.routes(), lexty.allowedMethods())
    .use('/operation', operation.routes(), operation.allowedMethods())
    .use('/product', product.routes(), product.allowedMethods())
    .use('/search', search.routes(), search.allowedMethods())
    .use('/cart', cart.routes(), cart.allowedMethods())
    .use('/user', user.routes(), user.allowedMethods())
    .use('/common', common.routes(), common.allowedMethods())
    .use('/order', order.routes(), order.allowedMethods())
    .use('/coupon', coupon.routes(), coupon.allowedMethods())
    .use('/pay', pay.routes(), pay.allowedMethods())
    .use('/shareHome', shareHome.routes(), shareHome.allowedMethods())
    .use('/aftersales', aftersale.routes(), aftersale.allowedMethods())
    .use('/marked', marked.routes(), marked.allowedMethods())
    .use('/other', other.routes(), other.allowedMethods())
    .use('/activity', activity.routes(), activity.allowedMethods())
    .use('/monthlyPayment', monthlyPayment.routes(), monthlyPayment.allowedMethods())
    .use('/profit', profit.routes(), profit.allowedMethods())
    .use('/upload', upload.routes(), upload.allowedMethods())
    .use('/shareList',shareList.routes(), shareList.allowedMethods())
    .use('/partner',partner.routes(), partner.allowedMethods())

module.exports = router;