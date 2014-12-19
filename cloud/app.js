// 在Cloud code里初始化express框架
var express = require('express');
var app = express();
var avosExpressHttpsRedirect = require('avos-express-https-redirect');



app.set('view engine', 'ejs');    // 设置template引擎
app.use(avosExpressHttpsRedirect()); //启用HTTPS
app.use(express.bodyParser());    // 读取请求body的中间件

//使用express路由API服务/hello的http GET请求
app.get('/hello', function(req, res) {
	res.render('hello', { message: 'Congrats, you just set up your app!' });
});

app.get('/', function (req, res) {
  var q = req.query.q;
  var md5Value = utility.md5(q);
  res.send(md5Value);
});



// This line is required to make Express respond to http requests.
app.listen();
