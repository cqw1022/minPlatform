const router = require('koa-router')();
const couponController = require('./../../controllers/wx/coupon');

const routers = router
  .get('/own',couponController.ownCoupon)
  .get('/list/:type',couponController.list)
  .post('/activity',couponController.activity)


module.exports=routers;