const router = require('koa-router')();
const operationController = require('./../../controllers/wx/operation');

const routers = router
  .get('/hotProducts/:type',operationController.hotProducts)
  .get("/shareHomes",operationController.shareHomes)
  .get("/seckillDates",operationController.seckillDates)
  .get("/seckillList/:dateId",operationController.seckillList)
  .get("/weekProducts",operationController.weekProducts)

module.exports = routers;