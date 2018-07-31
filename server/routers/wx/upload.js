const router = require('koa-router')();
const path = require('path');
const fs = require('fs');
const axios = require('axios');
let storagePath = path.join(path.resolve(__dirname, '../../../static'), './upload/');
const mineType = require('mime-types');

const koaBody = require('koa-body')({
    multipart: true,  // 允许上传多个文件
    formidable: {
        uploadDir: storagePath,// 上传的文件存储的路径
        keepExtensions: true  //  保存图片的扩展名
    }
});
const routers = router
    .post('/',koaBody,async (ctx,next)=>{
        let filePath = ctx.request.body.files.file.path;
        let data = fs.readFileSync(filePath);
        data = new Buffer(data).toString('base64');
        let base64 = 'data:' + mineType.lookup(filePath) + ';base64,' + data;
        fs.unlink(filePath)
        let body = await uploadImage(base64);
        ctx.body = body.data;
    }
);

function uploadImage(base64){
    let headers ={'Content-Type':'text/plain;charset=UTF-8'}
    return axios({
        url: `/platform/upload/base64.htm`,
        method: "POST",
        transformRequest: [function() {
            return JSON.stringify({base64Data:base64});
        }],
        headers:headers
    })
}




module.exports = routers;