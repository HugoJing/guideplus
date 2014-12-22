/**
 * Created by Hugo on 14-12-19.
 */
// 在 Cloud code 里初始化 Express 框架
var express = require('express');
var app = express();

var mstory = require('cloud/mstory.js');
var mlog = require('cloud/mlog.js');
var mutil = require('cloud/mutil.js');

app.set('views','cloud/views');   // 设置模板目录
app.set('view engine', 'ejs');    // 设置 template 引擎
app.use(express.bodyParser());    // 读取请求 body 的中间件

var renderError = mutil.renderError;
var renderErrorFn = mutil.renderErrorFn;
var renderForbidden = mlog.renderForbidden;
var renderInfo = mutil.renderInfo;


var Story = AV.Object.extend('Story');

// 使用 Express 路由 API 服务 /hello 的 HTTP GET 请求
// 内容页
app.get('/story/:id', function (req, res) {
    var id = req.params.id;
    mstory.findStoryById(id).then(function (story) {
      if (story) {
        res.render('story', {story: story});
      } else {
        renderError(res, '无法找到这篇帖子');
      }
    }, renderErrorFn(res));
});

// 列表页
app.get('/admin/storys', function (req, res) {
    var query = new AV.Query('Story');
    query.descending('createdAt');
    query.limit(10);
    query.find().then(function (storys) {
      storys = storys || [];
      storys = _.map(storys, storys);
      res.render('list', {storys: storys});
    }, mutil.renderErrorFn(res));
  });

// 录入页
app.get('/admin/storys/new', function(req, res) {
    res.render('new');
});
// 点击提交将触发下列函数
app.post('/admin/storys/new', function(req, res) {
    var title = req.body.title;
    var content = req.body.content;
    //var image = req.body.image;
    if (title && content) {
        var story = new AV.Object(Story);
        story.set('title', title);
        story.set('content', content);
        //story.set('image', image);
        story.save().then(function (story) {
            alert('New object created with objectId: ' + story.objectId);
            res.redirect("/story/" + story.objectId);
        }, renderErrorFn(res));
    } else {
        mutil.renderError(res, '不能为空');
    }
});


// 最后，必须有这行代码来使 express 响应 HTTP 请求
app.listen();
// 渲染一个 404 页面
app.use(function(req, res, next){
  res.status(404).render('404', {title: "非常抱歉，该页面找不到了。"});
});
