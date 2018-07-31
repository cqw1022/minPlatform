const router = require('koa-router')();
const monthlyPaymentController = require('../../controllers/wx/monthlyPayment');

const routers = router
    .get('/list',monthlyPaymentController.monthlyPaymentList)
    .get('/info/:monthlyPaymentId',monthlyPaymentController.monthlyPaymentInfo)
    .post('/pay/:orderId/:type',monthlyPaymentController.pay)


module.exports=routers;