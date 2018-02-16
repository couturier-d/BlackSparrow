var userService = require("./services/userServices.js");

var express = require('express');
var app = express();
var session = require('express-session');
var fs = require('fs'); 
var request = require("request");
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(express.static('./includes'));

app.post('/connect', function(req, res) {
	console.log(req);
	console.log(req.body.nickname);
	console.log(req.params.nickname);
	console.log(req.query.nickname);
	callRequest("http://localhost:3000/user/list", "GET", {}, function(response) {
		response.forEach(function(user) {
			if(user.nickname == req.body.nickname && user.password == req.body.password) {
				session("user", user);
				return;
			}
		});
		if(session.user) {
			res.sendStatus(200);
		} else {
			res.sendStatus(401);
		}
	});
});

app.all('*', function(req, res, next) {
	if(!session.user) {
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
		res.end();
	});
 });

 app.get('/user', function(req, res) {
	res.end(session.user);
 });

app.use(function(req, res, next) {
    res.setHeader('Content-Type', 'text/plain');
    res.send(404, 'Page introuvable !');
});

app.listen(4000);

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
		}
	};
	if(method != "GET") options.form = params;
	request(options, function(error, response, body) {
		if(error) throw error;
		callback(JSON.parse(body));
	});
}