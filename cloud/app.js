/**
 * Created by Hugo on 14-12-19.
 */
// 在 Cloud code 里初始化 Express 框架
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var mstory = require('cloud/mstory.js');

// App 全局配置
app.set('views','cloud/views');   // 设置模板目录
app.set('view engine', 'ejs');    // 设置 template 引擎
app.use(express.bodyParser());    // 读取请求 body 的中间件

// 使用 Express 路由 API 服务 /hello 的 HTTP GET 请求
app.get('/story/:id', function (req, res) {
    var id = req.params.id;
    mstory.findPostById(id).then(function (story) {
      if (story) {
        res.render('story', {story: story});
      } else {
        renderInfo(res, '！错误的链接');
      }
    }, console.log());
});

// 最后，必须有这行代码来使 express 响应 HTTP 请求
app.listen();
// 渲染一个 404 页面
app.use(function(req, res, next){
  res.status(404).render('404', {title: "非常抱歉，该页面找不到了。"});
});