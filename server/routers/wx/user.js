const router = require('koa-router')();
const userController = require('./../../controllers/wx/user');

const routers = router
    .post('/session', userController.session)
    .post('/info', userController.info)
    .post('/info3', userController.info3)
    .get('/info', userController.getInfo)
    .get("/unionId", userController.unionId)
    .get('/verify', userController.verify)
    .post('/bindPhone', userController.bindPhone)
    .post('/address', userController.addressAdd)
    .get('/address', userController.addressList)
    .get('/address/:addressId', userController.addressGet)
    .delete('/address/:addressId', userController.addressDelete)
    .put('/address/:addressId', userController.addressModify)
    .get('/type', userController.type)
    .get('/latelyAddress', userController.latelyAddress)
    .get('/zhima', userController.getZhima)
    .get('/zhimaTest', userController.getZhimaTest)
    .get('/zhimaTest2', userController.getZhimaTest2)
    .post('/zhima/verify', userController.zhimaVerify)
    .post('/identify', userController.identify)


module.exports = routers;