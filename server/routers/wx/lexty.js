const router = require('koa-router')();
const lexjController = require('./../../controllers/wx/lexty');

const routers = router
    .get('/detail/:id', lexjController.detail)
    .get('/hotProduct/:id', lexjController.hotProduct)



module.exports = routers;