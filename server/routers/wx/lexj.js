const router = require('koa-router')();
const lexjController = require('./../../controllers/wx/lexj');

const routers = router
  .get('/list', lexjController.list)
  .get('/style',lexjController.style)
  .get('/:lexjId',lexjController.detail)
  .get('/:lexjId/product-list',lexjController.productList)
  .get('/:lexjId/productlist',lexjController.productList)
  .post('/marked/:lexjId',lexjController.markLexj)
  .delete('/marked/:lexjId',lexjController.cancelMarkLexj)
  .post('/appointment/:lexjId',lexjController.appoint)
  .get('/appointed/:type',lexjController.appointed)


module.exports = routers;