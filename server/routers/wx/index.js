const router = require('koa-router')();
const indexController = require('./../../controllers/wx/index');

const routers = router
  .get('/banners', indexController.banners)
  .get("/convenient", indexController.convenient)
  .get("/seckills", indexController.seckills)
  .get("/weeks", indexController.weeks)
  .get("/hotProducts", indexController.hotProducts)
  .get("/recommend/:openId",indexController.recommend)


module.exports = routers;