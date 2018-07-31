const router = require('koa-router')();
const shareHomeController = require('./../../controllers/wx/shareHome');

const routers = router
  .get('/info/:id', shareHomeController.info)
  .get('/:id/product-list',shareHomeController.productList)
  .post('/marked/:shareHomeId',shareHomeController.markShareHome)
  .delete('/marked/:shareHomeId',shareHomeController.cancelMarkShareHome)


module.exports = routers;