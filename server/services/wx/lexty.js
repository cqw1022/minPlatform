const axios = require('axios');
let service = {
    detail:function (sessionId,data,id) {
        data.id = id;
        let headers ={'Content-Type':'application/json;charset=UTF-8'}
        if(sessionId){
            headers.Cookie = sessionId;
        }
        return axios({
            url: `/lexj/v/getExperienceHall.htm`,
            method: "GET",
            headers:headers,
            params:data
        })
    },
    hotProduct:function (id) {
        return axios.get('/lexj/v/findPopularCommodity.htm', {params: {id}})
    }
};
module.exports=service