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
	console.log(params);
	callRequest("http://localhost:3000/user/add", "POST", params, function(response) {
		console.log(response);
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
		res.writeHead(200, {'Content-Type': 'text/html'});
		next();
	}
});

app.get('/', function(req, res) {
	fs.readFile('./views/home.html', function(err, data) {
		res.write(data);
		console.log(req.session.user);
		res.end();
	});
 });

 app.get('/user', function(req, res) {
	res.end(req.session.user);
 });

app.use(function(req, res, next) {
    res.setHeader('Content-Type', 'text/plain');
    res.send(404, 'Page introuvable !');
});

app.listen(4000, function() {
	console.log("Listening on port 4000.");
});

function callAjax(url, method, callback) {
	var xmlHttp = new XMLHttpRequest();
	xmlHttp.onreadystatechange = function() {
		if(xmlHttp.readyState == 4 && xmlHttp.status == 200) {
			callback(xmlHttp.responseText);
		}
	}
	xmlHttp.open(method, url, true);
	xmlHttp.send();
}

function callRequest(url, method, params, callback) {
	let options = {  
		url: url,
		method: method,
		headers: {
			'Accept': 'application/json',
			'Accept-Charset': 'utf-8',
			"Content-Type": "application/json; charset=utf-8" 
		}
	};
	if(method != "GET") {
		options.form = params;
	} 
	request(options, function(error, response, body) {
		if(error) throw error;
		callback(JSON.parse(body));
	});
	console.log(options);
}