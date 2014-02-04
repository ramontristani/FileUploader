
/**
 * Module dependencies.
 */

var express = require('express')
	, connect = require('connect')
	, routes = require('./routes')
	, http = require('http')
	, path = require('path');

var app = express();

app.configure(function() {
	app.set('port', process.env.port);
	app.set('views', path.join(__dirname, 'views'));
	app.set('view engine', 'ejs');
	app.use(express.favicon());
	app.use(express.logger('dev'));
	app.use(connect.urlencoded());
    app.use(express.json({limit: '12mb'}));
	app.use(express.urlencoded({limit: '12mb'}));
	app.use(express.methodOverride());
	app.use(express.cookieParser('ca79ea60-83df-11e3-a34a-0fb6c63a180f'));
	app.use(express.session());
	app.use(app.router);
	app.use(require('less-middleware')({ src: path.join(__dirname, 'public') }));
	app.use(express.static(path.join(__dirname, 'public')));

	// development only
	if ('development' == app.get('env')) {
	  app.use(express.errorHandler());
	}
});

	
// Root route
app.get('/', routes.index);

// File upload rest service
app.post('/services/v1/io', routes.fileUpload);

http.createServer(app).listen(app.get('port'), function(){
  console.log('File Uploader server is now listening on port ' + app.get('port'));
});
