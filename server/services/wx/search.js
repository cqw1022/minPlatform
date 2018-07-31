const axios = require('axios');
function keyword(keyword) {
  return axios.get('/search/keywords.htm',{params:{
    keyword:keyword
  }});
}
function hotKeywords() {
  return axios.get('/search/hotKeywords.htm');
}
module.exports={
  keyword,
  hotKeywords
};