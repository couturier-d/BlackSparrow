var userService = require("./services/userServices.js");

var express = require('express');
var app = express();
var session = require('express-session');
var fs = require('fs'); 
var request = require("request");
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(express.static('./includes'));

app.use(session({ secret: 'keyboard cat', resave: false, saveUninitialized: true, cookie: {}}));

app.post('/connect', function(req, res) {
	callRequest("http://localhost:3000/user/list", "POST", {}, function(response) {
		response.forEach(function(user) {
			if(user.nickname == req.body.nickname && user.password == req.body.password) {
				console.log(user);
				req.session.user = user;
				return;
			}
		});
		if(req.session.user) {
			res.sendStatus(200);
		} else {
			res.sendStatus(401);
		}
	});
});

app.get('/disconnect', function(req, res) {
	req.session.destroy();
	res.sendStatus(200);
});

app.post('/register', function(req, res) {
	let params = {nickname: req.body.nickname, password: req.body.password, mail: req.body.mail, token: 0, profil: 1};
	callRequest("http://localhost:3000/user/add", "POST", params, function(response) {
		console.log(response); // recupere id de l'element ajouté'
		res.sendStatus(200);
	});
});

app.all('*', function(req, res, next) {
	if(!req.session.user) {
		res.writeHead(401, {'Content-Type': 'text/html'});
		fs.readFile('./views/index.html', function(err, data) {
			res.write(data);
			res.end();
		});
	} else {
		next();
	}
});

app.get('/', function(req, res) {
	fs.readFile('./views/home.html', function(err, data) {
		res.writeHead(200, {'Content-Type': 'text/html'});
		res.write(data);
		res.end();
	});
 });

 app.get('/user', function(req, res) {
	console.log("user : "+JSON.stringify(req.session.user));
	res.setHeader("Content-Type", "application/json; charset=utf-8");
	res.end(JSON.stringify(req.session.user));
 });

app.use(function(req, res, next) {
	res.setHeader("Content-Type", "text/plain");
	res.status(404).send('Element introuvable !')
});

app.listen(4000, function() {
	console.log("Listening on port 4000.");
});

function callRequest(url, method, params, callback) {
	let options = {  
		url: url,
		method: method,
		json: true,
		headers: {
			'Accept': 'application/json',
			'Accept-Charset': 'utf-8',
			"Content-Type": "application/json; charset=utf-8" 
		},
	};
	if(method != "GET") {
		options.body = params;
	} 
	request(options, function(error, response, body) {
		if(error) throw error;
		callback(body);
	});
}