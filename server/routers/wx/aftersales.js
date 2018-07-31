const router = require('koa-router')();
const aftersaleController = require('./../../controllers/wx/aftersale');

const routers = router
    .get('/waitList/:orderId', aftersaleController.waitList)
    .get('/waitList2/:orderId', aftersaleController.waitList2)
    .get('/deliveryList/:logisticsId', aftersaleController.deliveryList)
    .post('/returnProduct/:type', aftersaleController.returnProduct)
    .get('/record', aftersaleController.recordList)
    .get('/record/:orderId/:logisticsId', aftersaleController.recordForServer)
    .get('/progress/:serverId', aftersaleController.progress)
    .get('/logistics/:orderId/:logisticsId/', aftersaleController.logistics)
    .get('/logistics2/:orderId/:logisticsId/', aftersaleController.logistics2)


module.exports = routers;