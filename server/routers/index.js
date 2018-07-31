/**
 * 整合所有子路由
 */
import Route from "koa-router";
import api from "./api/routes";
const router = Route();

router.use("/api", api.routes(), api.allowedMethods());

export default router;
