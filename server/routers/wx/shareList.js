const router = require('koa-router')();
const shareListController = require('./../../controllers/wx/shareList');

const routers = router
    .post('/',shareListController.createShareList)
    .post('/detail',shareListController.createShareListDetail)
    .get('/list',shareListController.list)
    .get('/detail/:id',shareListController.detail)
    .post('/marked/:id',shareListController.createMarked)
    .delete('/marked/:id',shareListController.deleteMarked)
    .get('/shareImg',shareListController.shareImg)


module.exports=routers;
