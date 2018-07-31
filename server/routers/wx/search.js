const router = require('koa-router')();
const searchController = require('./../../controllers/wx/search');

const routers = router
  .get('/keyword', searchController.keyword)
  .get('/hotKeywords',searchController.hotKeywords)


module.exports = routers;