const httpProxy = require('http-proxy');

const proxy = new httpProxy.createProxyServer({
  // target: 'http://192.168.0.248:8080/',
  target: 'http://192.168.0.10:8080/',
  // target:'http://lexj.ngrok.cc/',
  changeOrigin: true              // for vhosted sites, changes host header to match to target's host
});
var response_formatter = (ctx) => {
  if(ctx.req.method=="post"){

  }
  proxy.web(ctx.req, ctx.res);
  ctx.body = ctx.res;
};

var url_filter = (pattern) => {
  return async (ctx, next) => {
    var reg = new RegExp(pattern);
    try {
      //通过正则的url进行格式化处理
      if (reg.test(ctx.originalUrl)) {
        response_formatter(ctx);
      }
      await next();
    } catch (error) {
      //继续抛，让外层中间件处理日志
      throw error;
    }
  }
};
module.exports = url_filter;