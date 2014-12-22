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

// 使用 Express 路由 API 服务 /hello 的 HTTP GET 请求
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

app.get('/admin/storys', function (req, res) {
    var query = new AV.Query('Story');
    query.descending('createdAt');
    query.limit(10);
    query.find().then(function (storys) {
      storys = storys || [];
      storys = _.map(storys, transformStory);
      res.render('list', {storys: storys});
    }, mutil.renderErrorFn(res));
  });

function createStory(title, type, content, image, thumbnail, shareUrl, readLink) {
    mticket.incTicketNReturnOrigin().then(function (n) {
        var story = new AV.Object('Story');
        story.set('title', client.id);
        story.set('type', client.email);
        story.set('content', type);
        story.set('image', token);
        story.set('thumbnail', todo_status);
        story.set('shareUrl', title);
        story.set('readLink', content);
        story.save().then(function (story) {
            // var text = '<p>Client:    ' + client.username + '</p><p> Type:    ' + type + '</p><p> Title:    <pre>' + title + '</pre></p><p>Content:    <pre>' + content + '</pre></p>';
            // text += generateAdminReplyLink(ticket);
            // sendEmail(ticket, 'New ticket', text);
            // var info = '新的工单！';
            // notifyTicketToChat(ticket, content, info);
            // then(ticket);
        }, renderErrorFn(res));
    });
}

app.get('/admin/storys/new', function (req, res) {
    res.render('new', {});
});

app.post('/admin/storys', function (req, res) {
    var token = req.token;
    var cid = req.cid;
    var client = req.client;
    mlog.log('req title' + req.body.title);
    saveFileThen(req, function (attachment) {
        createTicket(res, token, client, attachment, req.body.title, req.body.type, req.body.content, req.body.secret, function (ticket) {
            res.redirect('/admin/storys');
        });
    });
});




// 最后，必须有这行代码来使 express 响应 HTTP 请求
app.listen();
// 渲染一个 404 页面
app.use(function(req, res, next){
  res.status(404).render('404', {title: "非常抱歉，该页面找不到了。"});
});