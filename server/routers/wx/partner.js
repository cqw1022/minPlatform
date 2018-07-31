const router = require('koa-router')();
const partnerController = require('./../../controllers/wx/partner');

const routers = router
    .get('/info',partnerController.getInfo)
    .get('/fansList/:role',partnerController.fansList)
    .get('/orderList',partnerController.orderList)
    .get('/achievement',partnerController.achievement)


module.exports=routers;