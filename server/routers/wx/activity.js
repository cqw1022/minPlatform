const router = require('koa-router')();
const activityController = require('./../../controllers/wx/activity');

const routers = router
    .get('/bargainList', activityController.bargainList)
    .post('/bargain/:bargainId', activityController.createBargain)
    .get('/bargain/:bargainId', activityController.getBargain)
    .post('/bargain/joined/:bargainId', activityController.joinBargain)
    .get('/bargain/:bargainId/info', activityController.bargainInfo)
    .get('/bargain/:bargainId/product', activityController.bargainProduct)
    .get('/bargain/:bargainId/helper', activityController.bargainHelper)
    .get('/user/raffled', activityController.raffled)
    .post('/raffled', activityController.createRaffled)
    .get('/raffled/:raffledId', activityController.getRaffled)
    .get('/raffled/:raffledId/info', activityController.raffledInfo)
    .get('/raffled/:raffledId/prize', activityController.raffledPrize)
    .get('/prizes', activityController.prizes)
    .get('/counts', activityController.counts)
    .get('/monthlyPayment/codeNum', activityController.codeNum)
    .get('/monthlyPayment/hasCode', activityController.hasCode)
    .get('/all', activityController.all)
    .get('/info/:activityName', activityController.activityInfo)
    .get('/increaseFans/info',activityController.increaseFansInfo)
    .get('/increaseFans/status',activityController.increaseFansStatus)
    .get('/increaseFans/detail/:id',activityController.increaseFansDetail)
    .post('/increaseFans/order',activityController.increaseFansOrder)


module.exports = routers;