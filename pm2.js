module.exports = {
  apps: [{
    name: 'middle',
    script: './server/app.js',
    cwd: "./",
    watch: false, // 默认关闭watch 可替换为 ['src']
    ignore_watch: [],
    out_file: '/logs/out.log', // 日志输出
    error_file: '/logs/error.log', // 错误日志
    max_memory_restart: '2G', // 超过多大内存自动重启，仅防止内存泄露有意义，需要根据自己的业务设置
    env: {
      NODE_ENV: 'production'
    },
    instances: 'max', // 启用多少个实例，可用于负载均衡
    autorestart: true // 程序崩溃后自动重启
  }]
}