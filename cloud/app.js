// 在 Cloud code 里初始化 Express 框架
var express = require('express');
var app = express();

// App 全局配置
app.set('views','cloud/views');   // 设置模板目录
app.set('view engine', 'ejs');    // 设置 template 引擎
app.use(express.bodyParser());    // 读取请求 body 的中间件

// 使用 Express 路由 API 服务 /hello 的 HTTP GET 请求
app.get('/hello', function(req, res) {
  res.render('hello', { message: 'Congrats, you just set up your app!' });
});

//post page
app.get('/post/:id', function (req, res, next) {
  var url = "https://leancloud.cn/1/classes/Post/" + req.params.id;
  request.get(url, function (err, resp, data) {
    if (err || resp.statusCode != 200) return next(err);

    var json = JSON.parse(data);
    var ids = [];
    json.news.forEach(function (item) {
      item.url = '/post/' + item.news_id;
      item.date = item.display_date;
      item.thumbnail = '/thumbnail/' + getKey(item.thumbnail);
      ids.push('news-' + item.news_id);
    });
    db.allDocs({keys: ids, include_docs: true}).then(function (data) {
      data.rows.forEach(function (item, i) {
        json.news[i].image = item.doc.image;
      });
      var title = "专题";
      crawler.sections().data.forEach(function (item) {
        if (item.id == req.params.id) {
          title = item.name;
          return;
        }
      });
      res.render('section', {title: title, news: json.news, timestamp: json.timestamp});
    }).catch(function (err) {
      res.status(404).render('error');
    });
  });
});



// 最后，必须有这行代码来使 express 响应 HTTP 请求
app.listen();