// 在Cloud code里初始化express框架
var express = require('express');
var app = express();
var name = require('cloud/name.js');
var avosExpressHttpsRedirect = require('avos-express-https-redirect');


// App全局配置
//设置模板目录
if(__production)
	app.set('views', 'cloud/views');
else
	app.set('views', 'cloud/dev_views');
app.set('view engine', 'ejs');    // 设置template引擎
app.use(avosExpressHttpsRedirect()); //启用HTTPS
app.use(express.bodyParser());    // 读取请求body的中间件

//使用express路由API服务/hello的http GET请求
app.get('/hello', function(req, res) {
	res.render('hello', { message: 'Congrats, you just set up your app!' });
});

// 创建一个AV.Object子类Visitor.
var Post = AV.Object.extend('Post');
// 创建函数
function renderIndex(res, name){
	//创建一个 AV.Query 对象
	var query = new AV.Query(Visitor);
	//设置查询条件
	query.skip(0);     //用 skip 跳过前面0个结果 / skip the first 0 results
	query.limit(10);   //用设定 limit 的方法来限定返回的结果数,默认100 / limit to at most 10 results
	query.descending('createdAt');  //控制返回结果的顺序 / Sorts the results in descending order by the createAt field
	//用 find 方法返回一个满足条件的 AV.Object 数组
	query.find({
		success: function(results){
			res.render('index',{ name: name, visitors: results});
		},
		error: function(error){
			console.log(error);
			res.render('500',500)
		}
	});

}

//使用express路由API服务 / 的http GET请求
app.get('/', function(req, res){
	var name = req.query.name;
	if(!name)
		name = 'AVOS Cloud';
	renderIndex(res, name);
});
//使用express路由API服务 /的http POST请求
app.post('/',function(req, res){
	var name = req.body.name;
	if(name && name.trim() !=''){
		//Save visitor
		var visitor = new Visitor();
		visitor.set('name', name);
		visitor.save(null, {
			success: function(gameScore) {
				res.redirect('/?name=' + name);
			},
			error: function(gameScore, error) {
				res.render('500', 500);
			}
		});
	}else{
		res.redirect('/');
	}
});

// This line is required to make Express respond to http requests.
app.listen();
