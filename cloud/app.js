/**
 * Created by Hugo on 14-12-19.
 */
// 在 Cloud code 里初始化 Express 框架
var express = require('express');
var app = express();
var _ = require('underscore');
var expressLayouts = require('express-ejs-layouts');
//var avosExpressHttpsRedirect = require('avos-express-https-redirect');


var mstory = require('cloud/mstory.js');
var mlog = require('cloud/mlog.js');
var mutil = require('cloud/mutil.js');


app.set('views','cloud/views');   // 设置模板目录
app.set('view engine', 'ejs');    // 设置 template 引擎
//app.use(avosExpressHttpsRedirect());
app.use(express.bodyParser());    // 读取请求 body 的中间件
app.use(expressLayouts);


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
// app.get('/admin/storys', function (req, res) {
//   var skip = req.query.skip;
//   var limit = 100;
//   var query = new AV.Query("Story");
//   query.skip(skip);
//   query.descending("createdAt");
//   query.find().then(function (storys) {
//       storys = storys || [];
//       //归属Ticket
//       storys = _.map(storys, mstory.transformStory);
//       res.render('admin_list', {storys: storys});
//     }, renderErrorFn(res));
// });

// 录入页
app.get('/admin/storys/new', function(req, res) {
    res.render('new');
});
// 点击提交将触发下列函数
app.post('/admin/storys/new', function (req, res) {
    var story = new Story;
    story.set('title', req.body.title);
    story.set('type', req.body.type);
    story.set('content', req.body.content);
    story.set('readLink', req.body.readLink);
    story.set('from', req.body.from);
    story.set('image', req.body.image);
    story.save(null, {
        success: function(story) {
            story.set('url', 'http://guideplus.me/story/' + story.id);
            story.save();
            console.log('New object created with objectId: ' + story.id);
            renderInfo(res, '<p>成功！辛苦了，你又录入了一篇帖子： ' + '<a href="http://guideplus.me/story/' + story.id +'" target="_blank" title="点击查看">点击查看</a></p>')
        },
        error: function(story, error) {
            console.log('Failed to create new object, with error code: ' + error.description);
            renderErrorFn(res);
        }
    });
})

app.get('/admin/upload', function(req, res) {
    res.render('upload');
});

app.get('/putauth.json', function(req, res){

    // our front-end isnot serve by node server, all of them are static files
    // so we need output response headers for CORS
    // or you can change to use template engine for render pages
    res.header('Pragma', 'no-cache');
    res.header('Cache-Control', 'no-store, no-cache, must-revalidate');
    res.header('X-Content-Type-Options', 'nosniff');
    res.header('Access-Control-Allow-Origin', '*');

    // output response body as json format
    rs.putAuth(function(resp){
        output = resp;
        if(resp.code == 200){output.data.bucket = bucket;}
        console.log("\n===> Response Output: ", output);
        res.json(output);
    });

});

//     mstory.createStory(req.body).then(function () {
//         console.log("新建了一条帖子");
//         //res.redirect('/admin/storys/new');
//     }, mutil.renderErrorFn(res));
// });

// 最后，必须有这行代码来使 express 响应 HTTP 请求
app.listen();
// 渲染一个 404 页面
app.use(function(req, res, next){
  res.status(404).render('404', {title: "非常抱歉，该页面找不到了。"});
});
