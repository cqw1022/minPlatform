const router = require('koa-router')();
const commonController = require('./../../controllers/wx/common');

const routers = router
  .get('/address', commonController.address)
  .get('/address/:provinceId/', commonController.address)
  .get('/address/:provinceId/:cityId', commonController.address)


module.exports = routers;