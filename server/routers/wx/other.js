const router = require('koa-router')();
const otherController = require('./../../controllers/wx/other');

const routers = router
    .post('/session', otherController.session)
    .get('/systemTime', otherController.systemTime)
    .get('/encrypted', otherController.encrypted)
    .get('/lexj', otherController.lexjId)
    .get('/activityTime', otherController.activityTime)
    .post('/formId', otherController.setFormId)
    .get('/appRule',otherController.appRule)
    .post('/statistics',otherController.statistics)

module.exports = routers;