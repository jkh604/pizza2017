var express=require('express');
var http=require('http');
var path=require('path');
var handlebars = require("express-handlebars").create({defaultLayout: "main"});
var bodyParser = require('body-parser');
var db = require('./db');
///config.json
//dbproduction.json
var dbLink = require('./json/config.json');
var url = dbLink.devServer.url;

var exphbs = require('express-handlebars');
var session = require("express-session");
var app = express();
var hbs = exphbs.create({defaultLayout:"main"});

app.use(session({
	secret: 'secret msg',
	resave: false,
	saveUninitialized: true
}));
app.use(require('./routers/signupServer'));

var authAdmin = function(req, res, next)
{
	if(req.session && req.session.admin)
		return next();
	else
		return res.send(401, "401: You must sign in before continuing!");
};

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

var publicPath=path.resolve(__dirname,"public"); //Double Underscore Direct Name: Figures out Absolute Path of the Public Folder
												 //For My Public: The Absolute Path c:\users\username\pizza2017\public
app.get('/orderSummary', authAdmin);
app.use(express.static(publicPath));
app.use(require('./routers/getMenuItems'));
app.use(require('./routers/popMenus'));
app.use(bodyParser.json());
//app.use(require('./routers/signup'));

db.connect(url, function(err) {
if(err) {
	console.log('Unable to connect to Mongo.')
	process.exit(1)
}  else {
	var listener = http.createServer(app).listen(process.env.PORT || 3000);
	console.log('Server is listening at port ' + listener.address());
	} 	
});

//Handle get request from the browser
app.get('/',function(req, res)
	{
		//req: Request from the Browser
		//res: Response from the Server to the Browser
		//res.send("<h2> Welcome to our first server!</h2>");
		console.log("Here comes a request!");
		res.sendFile(`${publicPath}/main.html`);
	});

app.get('/menu',function(req, res) {
		//req: Request from the Browser
		//res: Response from the Server to the Browser
		console.log("a request for the menu!"); //Print Log on Server
		res.sendFile(`${publicPath}/menu.html`);
	});

app.get('/about',function(req, res) {
		//req: Request from the Browser
		//res: Response from the Server to the Browser
		console.log("a request for information!"); //Print Log on Server
		res.sendFile(`${publicPath}/about.html`);
	});

app.get('/signup',function(req, res)
	{
		//req: Request from the Browser
		//res: Response from the Server to the Browser
		//res.send("<h2> Welcome to our first server!</h2>");
		res.sendFile(`${publicPath}/signup.html`);
	});

app.get('/special',function(req, res) {
		//req: Request from the Browser
		//res: Response from the Server to the Browser
		console.log("a request for specials!"); //Print Log on Server
		res.sendFile(`${publicPath}/special.html`);
	});

app.get('/cart',function(req, res) {
		//req: Request from the Browser
		//res: Response from the Server to the Browser
		console.log("a request for the cart!"); //Print Log on Server
		res.sendFile(`${publicPath}/cart.html`);
	});

app.post('/signupServer', function(req, res){
	console.log("A request from signup!");
	res.send("The server is handling your request " + req.body.email);
});


app.use( function(req, res, next){
		//Next: Is callback function after this function is done
		res.type("text/plain");
		res.status(404);
		res.send("404-Not Found");
	});

app.set('db',db);
module.exports.app = app;