const router = require('koa-router')();
const orderController = require('./../../controllers/wx/order');

const routers = router
    .post('/:mode/:type', orderController.addOrder)
    .get('/info/:orderId', orderController.getInfo)
    .get('/info2/:orderId', orderController.getInfo2)
    .get('/deliveryTime', orderController.deliveryTime)
    .get('/list/:type', orderController.orderList)
    .get('/list2/:type', orderController.orderList2)
    .put('/:orderId', orderController.cancelOrder)
    .delete('/:orderId', orderController.deleteOrder)
    .get('/productList/:orderId', orderController.productList)
    .put('/logistics/:logisticsId', orderController.recieve)
    .get('/chooseData', orderController.chooseData)
    .get('/virtual', orderController.virtual)
    .get('/count', orderController.count)


module.exports = routers;