const axios = require('axios');
if(process.env.NODE_ENV=='development'){
    axios.defaults.baseURL = 'http://192.168.0.179:8080/app-apiservice';   //配置接口地址
    // axios.defaults.baseURL ="http://api.lexj.com/";   //正式地址
}else{
    axios.defaults.baseURL ="http://api.lexj.com/";   //正式地址
}
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
axios.defaults.headers.delete['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
axios.defaults.headers.put['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';

module.exports = axios;