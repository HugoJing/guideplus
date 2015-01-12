/**
 * Created by Hugo on 14-12-19.
 */
// 在 Cloud code 里初始化 Express 框架
var express = require('express');
var app = express();
var expressLayouts = require('express-ejs-layouts');
// var avosExpressHttpsRedirect = require('avos-express-https-redirect');
// var avosExpressCookieSession = require('avos-express-cookie-session');
var wechat = require('wechat');
var config = {
  token: 'fa21gas2asg2sas2aaa1f0',
  appid: 'wx1ae58e7dc3df808d',
  encodingAESKey: 'UA9MA0N5VspKF2S1mBIYQjPxwXkw4VcfjgGBlvBW88P'
};

var mstory = require('cloud/mstory.js');
var mlog = require('cloud/mlog.js');
var mutil = require('cloud/mutil.js');


app.set('views','cloud/views');   // 设置模板目录
app.set('view engine', 'ejs');    // 设置 template 引擎
// app.use(avosExpressHttpsRedirect());
app.use(express.bodyParser());        // 读取请求body的中间件
// app.use(express.cookieParser(config.cookieParserSalt));
// app.use(avosExpressCookieSession({ 
//     cookie: { 
//         maxAge: 3600000 
//     }, 
//     fetchUser: true
// }));
//wechat
app.use(express.query());
app.use('/wechat', wechat(config, function (req, res, next) {
  // 微信输入信息都在req.weixin上
  var message = req.weixin;
  if (message.FromUserName === 'diaosi') {
    // 回复屌丝(普通回复)
    res.reply('hehe');
  } else if (message.FromUserName === 'text') {
    //你也可以这样回复text类型的信息
    res.reply({
      content: 'text object',
      type: 'text'
    });
  } else if (message.FromUserName === 'hehe') {
    // 回复一段音乐
    res.reply({
      type: "music",
      content: {
        title: "来段音乐吧",
        description: "一无所有",
        musicUrl: "http://mp3.com/xx.mp3",
        hqMusicUrl: "http://mp3.com/xx.mp3",
        thumbMediaId: "thisThumbMediaId"
      }
    });
  } else {
    // 回复高富帅(图文回复)
    res.reply([
      {
        title: '你来我家接我吧',
        description: '这是女神与高富帅之间的对话',
        picurl: 'http://nodeapi.cloudfoundry.com/qrcode.jpg',
        url: 'http://nodeapi.cloudfoundry.com/'
      }
    ]);
  }
}));


var renderError = mutil.renderError;
var renderErrorFn = mutil.renderErrorFn;
var renderForbidden = mlog.renderForbidden;
var renderInfo = mutil.renderInfo;


var Story = AV.Object.extend('Story');


// 使用 Express 路由 API 服务 /hello 的 HTTP GET 请求

// 下载页/首页
app.get('/', function(req, res) {
    res.render('index',{"layout":false});
});
// 内容页
app.get('/story/:id', function (req, res) {
    var id = req.params.id;
    mstory.findStoryById(id).then(function (story) {
      if (story) {
        res.render('story',{story: story,"layout":false} );
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

// 最后，必须有这行代码来使 express 响应 HTTP 请求
app.listen();
// 渲染一个 404 页面
app.use(function(req, res, next){
  res.status(404).render('404', {title: "非常抱歉，该页面找不到了。","layout":false});
});
