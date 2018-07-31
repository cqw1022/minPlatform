import path from "path";
import Koa from "koa";
import views from "koa-views";
import koaStatic from "koa-static";
import bodyParser from "koa-bodyparser";
import koaLogger from "koa-logger";
import session from "koa-session-minimal";
import MysqlStore from "koa-mysql-session";
import cors from "koa2-cors";
import routers from "./routers/index";
import config from "./config";
import "./utils/createTable";

const app = new Koa();
// session存储配置
const sessionMysqlConfig = {
  user: config.database.USERNAME,
  password: config.database.PASSWORD,
  database: config.database.DATABASE,
  host: config.database.HOST
};

// 配置session中间件
app.use(
  session({
    key: "USER_SID",
    store: new MysqlStore(sessionMysqlConfig)
  })
);
// 配置控制台日志中间件
app.use(koaLogger());

// 配置ctx.body解析中间件
app.use(bodyParser());

// 配置静态资源加载中间件
app.use(koaStatic(path.join(__dirname, "../static")));

// 配置服务端模板渲染引擎中间件
app.use(
  views(path.join(__dirname, "./views"), {
    extension: "ejs"
  })
);
//cors跨域
const corsConfig = config.cors;
if (process.env.NODE_ENV == "development") {
  app.use(
    cors({
      origin: function(ctx) {
        return corsConfig.origin;
      },
      exposeHeaders: ["WWW-Authenticate", "Server-Authorization"],
      maxAge: corsConfig.maxAge,
      credentials: corsConfig.credentials,
      allowMethods: ["GET", "POST", "DELETE", "PUT"],
      allowHeaders: ["Content-Type", "Authorization", "Accept", "session_id"]
    })
  );
} else {
}
// 初始化路由中间件
app.use(routers.routes()).use(routers.allowedMethods());

// 监听启动端口
app.listen(9080);
console.log(`the server is start at port 9080`);
