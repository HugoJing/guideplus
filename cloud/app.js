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

var Post = AV.Object.extend('Post');

function findPost(queryFn) {
  var q = new AV.Query(Post);
  queryFn.call(this, q);
  return q.first();
}

function findRawPostById(id) {
  return findPost(function (q) {
    q.equalTo('objectId', id);
  });
}

function transfromPost(curPost) {
  return {
    title:curPost.get('title'),
    id:curPost.id,
    content:curPost.get('content')
  };
}

app.get('/post/:id', function (req, res) {
    var id = req.params.id;
    muser.findPostById(id).then(function (post) {
      if (post) {
        res.render('post', {post: post});
      } else {
        renderInfo(res, '该帖子已删除 或者 链接是错误的');
      }
    }, mutil.renderErrorFn(res));
});


// This line is required to make Express respond to http requests.
app.listen();
