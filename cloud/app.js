// 在 Cloud code 里初始化 Express 框架
var express = require('express');
var app = express();

// App 全局配置
app.set('views','cloud/views');   // 设置模板目录
app.set('view engine', 'ejs');    // 设置 template 引擎
app.use(express.bodyParser());    // 读取请求 body 的中间件

var Post = AV.Object.extend('Post');
// 使用 Express 路由 API 服务 /hello 的 HTTP GET 请求
app.get('/hello', function(req, res) {
  res.render('hello', { message: 'Congrats, you just set up your app!' });
});

app.get('/post/:id', function (req, res) {
  var postId = req.params.id;
  // 基础查询
  // 通常的模式是创建一个 AV.Query 对象,
  var query = new AV.Query("Post");
  //用 equalTo 加入一些条件, 
  
  //然后用 find 方法返回一个满足条件的 AV.Object 数组
  // then 方法，每一个 Promise 都有一个叫 then 的方法, 这个方法接受一对 callback. 第一个 callback 在 promise 被解决的时候调用, 第二个会在 promise 被拒绝的时候调用.
  query.find().then(function (posts) {
    res.render("post", { title: titele});
    }, mutil.renderErrorFn(res));

// 最后，必须有这行代码来使 express 响应 HTTP 请求
app.listen();