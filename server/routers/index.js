/**
 * 整合所有子路由
 */
const router = require("koa-router")();

const wx = require("./wx/routes");
const api = require("./api/routes");

// router.use("/wx", wx.routes(), wx.allowedMethods());
// router.use("/gzh", gzh.routes(), gzh.allowedMethods());

router.use("/api", api.routes(), api.allowedMethods());

module.exports = router;
