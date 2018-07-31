require("babel-core/register");
require("./middlewares/axios");
const path = require("path");
const Koa = require("koa");
const app = new Koa();
const convert = require("koa-convert");
const views = require("koa-views");
const koaStatic = require("koa-static");
const bodyParser = require("koa-bodyparser");
const koaLogger = require("koa-logger");
const session = require("koa-session-minimal");
var MysqlStore = require("koa-mysql-session");
const cors = require("koa2-cors");

const routers = require("./routers/index");

const config = require("./config");

require("./models/createTable");

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
//获取sessionId
app.use(async (ctx, next) => {
  if (process.env.NODE_ENV == "development") {
    ctx.sessionId =
      ctx.cookies.get("sessionId") || ctx.request.header.session_id;
  } else {
    ctx.sessionId = ctx.cookies.get("sessionId");
  }
  await next();
});

// 初始化路由中间件
app.use(routers.routes()).use(routers.allowedMethods());

// 监听启动端口
app.listen(9080);
console.log(`the server is start at port 9080`);
