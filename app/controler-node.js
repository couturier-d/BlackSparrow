var userService = require("./services/userServices.js");

var express = require('express');
var app = express();
var session = require('express-session');
var fs = require('fs'); 
var request = require("request");
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(express.static('./includes'));

var connectedUsers = [];

app.use(session({ secret: 'keyboard cat', resave: false, saveUninitialized: true, cookie: {}}));

app.post('/connect', function(req, res) {
	callRequest("http://localhost:3000/user/list", "POST", {}, function(response) {
		response.forEach(function(user) {
			if(user.nickname == req.body.nickname && user.password == req.body.password) {
				req.session.user = user;
				req.session.user.friends = [];
				connectedUsers[req.session.user.idUser] = req.session.user;
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

app.get('/disconnect', function(req, res) {
	if(connectedUsers[req.session.user.idUser]) {
		delete connectedUsers[req.session.user.idUser];
	}
	req.session.destroy();
	res.sendStatus(200);
});

app.get('/user', function(req, res) {
	res.setHeader("Content-Type", "application/json; charset=utf-8");
	let user = req.session.user;
	friendList(user, function() {
		console.log("user : "+JSON.stringify(user));
		res.end(JSON.stringify(user));
	});
});

app.get('/users', function(req, res) {
	res.setHeader("Content-Type", "application/json; charset=utf-8");
	callRequest("http://localhost:3000/user/list", "POST", {}, function(users) {
		let response = [];
		users.forEach(function(user) {
			if(user.idUser != req.session.user.idUser && !isUserFriend(user, req.session.user.friends)) {
				response.push({idUser: user.idUser, nickname: user.nickname});
			}
		});
		res.end(JSON.stringify(response));
	});
});

app.post('/addFriend', function(req, res) {
	callRequest("http://localhost:3000/friend/add", "POST", {idUser1: req.session.user.idUser, idUser2: req.body.idUser}, function(response) {
		res.end();
	});
});

app.get('/stats', function(req, res) {
	res.setHeader("Content-Type", "application/json; charset=utf-8");
	callRequest("http://localhost:3000/stat/getById", "POST", { idUser: req.session.user.idUser }, function(stats) {
		console.log(stats.length);
		let nbStatCompleted = 0;
		stats.forEach(function(stat) {
			callRequest("http://localhost:3000/game/getById", "POST", { idGame: stat.idGame }, function(game) {
				stat.game = game.name;
				nbStatCompleted++;
				if(nbStatCompleted == stats.length) {
					console.log(JSON.stringify(stats));
					res.end(JSON.stringify(stats));
				}
			});
		});	
	});
});

app.post('/updateProfil', function(req, res) {
	res.setHeader("Content-Type", "application/json; charset=utf-8");
	let params = {
		idUser: req.session.user.idUser,
		nickname: req.session.user.nickname,
		password: req.body.password,
		mail: req.body.mail,
		token: req.session.user.token,
		profil: req.session.user.profil,
	};
	callRequest("http://localhost:3000/user/update", "POST", params, function(response) {
		console.log(JSON.stringify(response));
		res.sendStatus(200);
	});
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

function friendList(user, callback) {
	user.friends = [];
	callRequest("http://localhost:3000/friend/list", "POST", { idUser: user.idUser}, function(friends) {
		friends.forEach(function(friend) {
			let idFriend;
			if(friend.idUser1 != user.idUser) idFriend = friend.idUser1;
			else idFriend = friend.idUser2;
			callRequest("http://localhost:3000/user/getById", "POST", { idUser: idFriend}, function(userFriend) {
				userFriend.connected = isConnected(userFriend);
				user.friends.push(userFriend);
				callback();
			});
		});
	});
}

function isConnected(user) {
	console.log(connectedUsers);
	let connected = false;
	connectedUsers.forEach(function(connectedUser) {
		if(connectedUser.idUser == user.idUser) {
			connected = true;
		}
	});
	return connected;
}

function isUserFriend(user, friends) {
	let isFriend = false;
	friends.forEach(function(friend) {
		if(friend.idUser == user.idUser) isFriend = true;
		return;
	});
	return isFriend;
}