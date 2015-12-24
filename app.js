var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
//文件上传下载中间件
var multiparty = require('connect-multiparty');
var mongoose = require('mongoose');

//后端处理逻辑
var routes = require('./routes/index');
var users = require('./routes/users');
var search = require('./routes/search');
var buy = require('./routes/buy');
var sales = require('./routes/sales');
var exchange = require('./routes/exchange');

//采用connect-mongo中间件作为Session存储
var session = require('express-session');
var Settings = require('./database/settings');
var MongoStore = require('connect-mongo')(session);
var db = require('./database/msession');

global.dbHandel = require('./database/dbHandel');
global.db = mongoose.connect(Settings.URL);
var app = express();

// 设置视图模版以及路径
app.set('views', path.join(__dirname, 'views'));
app.engine("html",require("ejs").__express); // or   app.engine("html",require("ejs").renderFile);
app.set('view engine', 'html');

//装载中间件
//app.use(favicon(__dirname + 'public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
//设置上传文件的临时存储目录
app.use(multiparty({ uploadDir: './temp', keepExtensions: true }));

app.use(cookieParser());

//session配置
app.use(session({
    secret: Settings.COOKIE_SECRET,
    saveUninitialized: false, // don't create session until something stored
    resave: false, //don't save session if unmodified
    store: new MongoStore({
		username: Settings.USERNAME,
        password: Settings.PASSWORD,
        url: Settings.URL,
		db: db,
        touchAfter: 24 * 3600 // time period in seconds
    })
}));

//静态文件存放的根路径
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req,res,next){ 
	res.locals.user = req.session.user;
	var err = req.session.error;
	delete req.session.error;
	res.locals.message = "";
	if(err){ 
		res.locals.message = err;
	}
	next();
});

//请求路由转发设置
app.use('/', routes);  // 即为为路径 / 设置路由
app.use('/', users); // 即为为路径 /users 设置路由
app.use('/', search); // 即为为路径 /search 设置路由
app.use('/buy', buy); // 即为为路径 /buy 设置路由
app.use('/sales', sales); // 即为为路径 /sales 设置路由
app.use('/exchange', exchange); // 即为为路径 /exchange 设置路由

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
