const router = require('koa-router')();
const payController = require('./../../controllers/wx/pay');

const routers = router
  .post('/',payController.toPay)


module.exports=routers;