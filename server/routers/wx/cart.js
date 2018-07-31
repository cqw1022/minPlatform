const router = require('koa-router')();
const cartController = require('./../../controllers/wx/cart');

const routers = router
    .post('/', cartController.addAllCart)
    .post('/:skuId', cartController.addCart)
    .post('/covers/page',cartController.addPage)
    .delete('/:cartId', cartController.deleteCart)
    .delete('/', cartController.deleteCarts)
    .put('/:skuId', cartController.modifyCart)
    .put('/', cartController.modifyAllCart)
    .get('/', cartController.getAllCart)
    .get('/group',cartController.getCartGroup)
    .get("/info", cartController.getInfo)
    .get("/group/info", cartController.getCartGroupInfo)


module.exports = routers;