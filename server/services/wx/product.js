const axios = require('axios');
let service = {
    category: function (id) {
        return axios.get('/commodity/contents/' + id + '.htm');
    },
    filter: function () {
        return axios.get('/commodity/filter.htm')
    },
    forKeyword(data) {
        return axios.get('/commodity/forKeywords.htm', {params: data})
    },
    forCategory(data) {
        return axios.get('/commodity/forContents.htm', {params: data})
    },
    itemDetail(id, callback) {
        return axios.all([this.itemInfo(id), this.dimensions(id)])
            .then(axios.spread(function (itemInfo, dimensions) {
                callback(itemInfo, dimensions)
                //当这两个请求都完成的时候会触发这个函数，两个参数分别代表返回的结果
            }))
    },
    itemInfo(id, data, sessionId) {
        let headers = {'Content-Type': 'application/json;charset=UTF-8'}
        if (sessionId) {
            headers.Cookie = sessionId;
        }
        return axios({
            url: `/commodity/itemDetail/${id}.htm`,
            method: "GET",
            headers: headers,
            params:data
        })
    },
    dimensions: function (id) {
        return axios.get("/commodity/dimensions/" + id + '.htm')
    },
    dimensionses:function (id) {
        let headers = {'Content-Type': 'application/json;charset=UTF-8'};
        return axios({
            url: `/commodity/v2/dimensions.htm`,
            method: "GET",
            headers: headers,
            params:{
                commodityIds:id.split(';').join(',')
            }
        })
    },
    markProduct: function (id, sessionId) {
        let headers = {'Content-Type': 'text/plain;charset=UTF-8'}
        if (sessionId) {
            headers.Cookie = sessionId;
        }
        return axios({
            url: `/commodityCollect/collection/${id}.htm`,
            method: "POST",
            headers: headers
        })
    },
    cancelMarkProduct: function (id, sessionId) {
        let headers = {'Content-Type': 'text/plain;charset=UTF-8'}
        if (sessionId) {
            headers.Cookie = sessionId;
        }
        return axios({
            url: `/commodityCollect/collection/${id}.htm`,
            method: "DELETE",
            headers: headers
        })
    },
    shareImg:function (query,sessionId) {
        let headers = {'Content-Type': 'application/json;charset=UTF-8'}
        if (sessionId) {
            headers.Cookie = sessionId;
        }
        return axios({
            url: `/relation/v2/commoShareImage.htm`,
            method: "GET",
            headers: headers,
            params:query
        })
    },

    getPage:function (id) {
        let headers = {'Content-Type': 'application/json;charset=UTF-8'};
        return axios({
            url: `/package/v2/commodity/default.htm`,
            method: "GET",
            headers: headers,
            params:{
                commodityId:id
            }
        })
    },
    getPages:function (id) {
        let headers = {'Content-Type': 'application/json;charset=UTF-8'};
        return axios({
            url: `/package/v2/commodity/list.htm`,
            method: "GET",
            headers: headers,
            params:{
                commodityId:id
            }
        })
    },
    itemKeyMessage:function (id) {
        return axios.get('/commodity/v2/findItPageInfo.htm',{params:{commodityId:id}})
    },
    recommend:function (data) {
        return axios.get('/commodity/v2/findIt.htm',{params:data})
    }
}
module.exports = service