const router = require('koa-router')();
const markedController = require('./../../controllers/wx/marked');

const routers = router
  .get('/lexj',markedController.lexjList)
  .get('/product',markedController.productList)
  .get('/list/:type',markedController.list)


module.exports=routers;