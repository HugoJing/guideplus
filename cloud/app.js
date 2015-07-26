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
var API = require('wechat-api');

var config = {
  token: 'your_token',
  appid: 'your_appid',
  encodingAESKey: 'your_encodingAESKey'
};
appid = 'your_token';
secret = 'your_secret';
var api = new API(appid, secret);

var mstory = require('cloud/mstory.js');
var muser = require('cloud/muser.js');
var mlog = require('cloud/mlog.js');
var mutil = require('cloud/mutil.js');
var mwechat = require('cloud/mwechat.js');
var login = require('cloud/login.js');


app.set('views','cloud/views');   // 设置模板目录
app.set('view engine', 'ejs');    // 设置 template 引擎
// app.use(avosExpressHttpsRedirect());
app.use(expressLayouts);
app.use(express.bodyParser());        // 读取请求body的中间件
// app.use(express.cookieParser(config.cookieParserSalt));
// app.use(avosExpressCookieSession({ 
//     cookie: { 
//         maxAge: 3600000 
//     }, 
//     fetchUser: true
// }));

var renderError = mutil.renderError;
var renderErrorFn = mutil.renderErrorFn;
var renderForbidden = mlog.renderForbidden;
var renderInfo = mutil.renderInfo;

var Story = AV.Object.extend('Story');
var User = AV.Object.extend('_User');

// 使用 Express 路由 API 服务 / 的 HTTP GET 请求

// 下载页/首页
app.get('/', function(req, res) {
    res.render('index')
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
});
// 登录页
app.get('/login', function(req, res) {
  res.render('login');
});


app.post('/login', function (req, res) {
    var username = req.body.username;
    var password = req.body.password;
    AV.User.logIn(username, password, {
        success: function (user) {
            res.redirect('/tickets');
        },
        error: function (user, error) {
            renderError(res, error.message);
        }
    });
});

app.get('/register', function(req, res) {
    if (login.isLogin(req)) {
        renderInfo(res, '当前已登录.');
    } else {
        res.render('register');
    }
});

app.post('/register_1', function (req, res) {
  var user = new AV.User();
  user.set("username", req.body.phone);
  user.set("password", "123456");
  user.setMobilePhoneNumber(req.body.phone);
        user.signUp(null).then(function (user) {
            console.log('User is saved.');
        }, function (error) {
            console.log('error');
        });
});
  
app.post('/register_2', function (req, res) {
  AV.User.verifyMobilePhone(req.body.PIN).then(function(){
      login.login(req.body.mobilePhoneNumber, req.body.password);
      muser.findUserByMPN(req.body.phone).get("id");
      res.redirect('/clients/:id');
    }, function(err){
      console.log('验证失败');
      renderErrorFn(res);
    });
});


function judgeDetailVisible(isAdmin, detailCid, visistCid) {
    if (isAdmin) {
        return AV.Promise.as(isAdmin);
    }
    return login.isAdmin(detailCid).then(function (isAdminDetail) {
        if (isAdminDetail || detailCid == visistCid) {
            return AV.Promise.as(true);
        } else {
            return AV.Promise.as(false);
        }
    });
}

app.get('/clients/:id', function (req, res) {
    var cid = req.cid;
    var id = req.params.id;
    if (judgeDetailVisible(req.admin,id, cid)) {
        muser.findUserById(id).then(function (client) {
            if (client) {
                res.render('client_detail', {client: client});
            } else {
                renderInfo(res, '此用户并未建立用户信息');
            }
        }, mutil.renderErrorFn(res));
    } else {
        renderForbidden(res);
    }
});

app.post('/client_detail', function (req, res) {
  var user = AV.User.current();
  user.set('Password', req.body.password);
  user.save().then(function () {
    console.log('User is saved.');
    renderInfo(res, '<p>成功！</p>');
  },function (err) {
    console.log('User is saved.');
    renderErrorFn(res);
  });
});

//Wechat Server
//wechatMenu
api.createMenu(mwechat.menu, function (err, result) {});
//wechatUser
// api.getUser(openid, function (err, result) {});
//wechat
app.use('/wechat', wechat(config).text(function (message, req, res, next) {
    res.reply({
        content: 'Hi，你的消息我已收到。\n点“获取”，我就把一封帖子发给你。\n如果你想更改自己的兴趣话题标签，请发送“更改”。\nGuide+ 敬上',
        type: 'text'
    });
}).image(function (message, req, res, next) {
  // TODO
}).voice(function (message, req, res, next) {
  // TODO
}).video(function (message, req, res, next) {
  // TODO
}).location(function (message, req, res, next) {
  // TODO
}).link(function (message, req, res, next) {
  // TODO
}).event(function (message, req, res, next) {
    if (message.EventKey === 'getStory') {
        if (openid) {
          res.reply({
            content: 'Sorry~还不知道你对什么话题感兴趣呢~\n<a href="http://guideplus.me/">花 1 分钟去设置一下\>\></a>',
            type: 'text'
          })


        }else{
          res.reply([
               {
                  title: '《失控》',
                  description: '书名《失控》，黑黄色的封面，让人以为又是一本写于90年代的末日论著作。实际上这是一本充满浪漫主义情怀的书。',
                  picurl: 'http://media.guideplus.me/2015/01/06/97875133007111883157-fm.jpg',
                  url: 'http://guideplus.me/story/54ab6924e4b031f4ee6cdf3a'
               }
        ]);
      }
    }
}).middlewarify());



// 最后，必须有这行代码来使 express 响应 HTTP 请求
app.listen();
// 渲染一个 404 页面
app.use(function(req, res, next){
  res.status(404).render('404', {title: "非常抱歉，该页面找不到了。","layout":false});
});
