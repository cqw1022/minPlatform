const router = require('koa-router')();
const productController = require('./../../controllers/wx/product');

const routers = router
    .get('/category1', productController.category1)
    .get('/category', productController.allCategory)
    .get('/category/:id', productController.category)
    .get('/filter', productController.filter)
    .get('/forKeyword', productController.forKeyword)
    .get('/forCategory', productController.forCategory)
    .get('/itemDetail/:id', productController.itemDetail)
    .get('/dimensions/:id', productController.dimensions)
    .get('/dimensionses/:id', productController.dimensionses)
    .post('/marked/:id', productController.markProduct)
    .delete('/marked/:id', productController.cancelMarkProduct)
    .get('/shareImg',productController.shareImg)        //记得改成post
    .get('/page/:id',productController.getPage)         //获取商品详情页默认显示套餐
    .get('/pages/:id',productController.getPages)
    .get('/itemKeyMessage/:id',productController.itemKeyMessage)
    .get('/recommend',productController.recommend)

module.exports = routers;