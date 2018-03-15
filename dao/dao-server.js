var daoUser = require("./daoUser.js");
var daoFriend = require("./daoFriend.js");
var daoGame = require("./daoGame.js");
var daoProfil = require("./daoProfil.js");
var daoTable = require("./daoTable.js");
var daoStat = require("./daoStat.js");

var express = require('express');
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json());

var mysql = require('mysql');
var con = mysql.createConnection({
  host: "92.222.219.57",
  user: "casino_web",
  password: "m2tiil",
  database : 'casino_web'
});

con.connect(function(err) {
  if(err) console.log("Not connected!");
  else console.log("Connected!");
});

app.get('/', function(req, res) {
    res.setHeader('Content-Type', 'text/plain');
    res.end('Serveur de requetage de la base de données');
});

app.get('/user/:tag', function(req, res) {
	console.log(req.body);
	console.log(req.query);
	console.log(req.params);
	var tag = req.params.tag;
	if(typeof eval("daoUser."+tag) === "undefined") {
		res.end("Error: you must pass an existing function");
	} else {
		eval("daoUser."+tag+"(con, res, req);"); // tag = function name of daoUser
	}
});

app.post('/friend/:tag', function(req, res) {
	var tag = req.params.tag;
	if(typeof eval("daoFriend."+tag) === "undefined") {
		res.end("Error: you must pass an existing function");
	} else {
		eval("daoFriend."+tag+"(con, res, req);"); // tag = function name of daoFriend
	}
});

app.post('/game/:tag', function(req, res) {
	var tag = req.params.tag;
	if(typeof eval("daoGame."+tag) === "undefined") {
		res.end("Error: you must pass an existing function");
	} else {
		eval("daoGame."+tag+"(con, res, req);"); // tag = function name of daoGame
	}
});

app.post('/profil/:tag', function(req, res) {
	var tag = req.params.tag;
	if(typeof eval("daoProfil."+tag) === "undefined") {
		res.end("Error: you must pass an existing function");
	} else {
		eval("daoProfil."+tag+"(con, res, req);"); // tag = function name of daoGame
	}
});

app.post('/table/:tag', function(req, res) {
	var tag = req.params.tag;
	if(typeof eval("daoTable."+tag) === "undefined") {
		res.end("Error: you must pass an existing function");
	} else {
		eval("daoTable."+tag+"(con, res, req);"); // tag = function name of daoGame
	}
});

app.post('/stat/:tag', function(req, res) {
	var tag = req.params.tag;
	if(typeof eval("daoStat."+tag) === "undefined") {
		res.end("Error: you must pass an existing function");
	} else {
		eval("daoStat."+tag+"(con, res, req);"); // tag = function name of daoGame
	}
});

/*app.use(function(req, res, next)
    res.setHeader('Content-Type', 'text/plain');
    res.send(404, 'Page introuvable !');
});*/

app.listen(3000);