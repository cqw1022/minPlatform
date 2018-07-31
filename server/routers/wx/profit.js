const router = require('koa-router')();
const profitController = require('./../../controllers/wx/profit');

const routers = router
    .get('/shareImage',profitController.shareImage)
    .get('/shareProductImage',profitController.shareProductImage)
    .post('/relate',profitController.relate)
    .get('/detail',profitController.detail)
    .get('/history',profitController.history)
    .post('/withdraw',profitController.withdraw)
    .get('/fansList',profitController.fansList)
    .get('/withdraw/detail/:id',profitController.withdrawDetail)
    .post('/relation/:memberId',profitController.createRelation)
    .post('/promoted',profitController.promoted)
    .post('/employInviter/:memberId',profitController.employInviter)
    .post("/employer",profitController.createEmployer)
    .delete("/employer",profitController.deleteEmployer)


module.exports=routers;