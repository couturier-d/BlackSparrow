let currentUser;
let existingUsers;

$(document).ready(function() {
	// Récupération de l'utilisateur connecté'
	getUserAndFriends(function() {
		updateMenu();
		updateFriendsList();
		fillProfilForm(currentUser);
		refresh(5000);
	});
	
	// Chargement de la page Jeux
	openPage($("#menuGameBtn"), 'Jeux');
	fillGameTable();

	// Event de déconnexion
	$("#logoutBtn").click(function() {
		if(confirm("Voulez-vous vraiment vous déconnecter ?")) {
			disconnect();
		}
	});

	$("#friendsSearch").focus(function() {
		$.get('/users', function(users) {
			existingUsers = users;
		});
	});

	$("#friendsSearch").keyup(function() {
		searchForFriends($(this).val());
	});
});

function getUserAndFriends(callback) {
	$.get('/user', function(user) {
		currentUser = user;
		callback();
	});
}

// Mise à jour de la barre de menu en fonction de l'ustilisateur
function updateMenu() {
	if(!currentUser) return;
	$("#tokensNumber").html(currentUser.token);
	$("#username").html(currentUser.nickname);
	if(currentUser.profil == 2) $("#adminDiv").show();
	else $("#adminDiv").hide();
}

function updateFriendsList() {
	$("#friendsList").empty();
	$.each(currentUser.friends, function(index, friend) {
		let li = document.createElement("li");
		$(li).html("<span>"+friend.nickname+"</span>");
		if(friend.connected) li.className = "connected";
		else li.className = "disconnected";
		$("#friendsList").append(li);
	});
}

function searchForFriends(text) {
	$("#friendsSearchResultList").html("");
	if(text == "") return;
	$.each(existingUsers, function(index, user) {
		if(user.nickname.startsWith(text)) {
			$("#friendsSearchResultList").append("<li>"+user.nickname+"<img style='float:right;' width='15' src='images/icons/user-add.png' alt='[+]' onclick='addFriend("+user.idUser+")'/></li>");
		}
	});
}

function addFriend(idUser) {
	$.post('/addFriend', {idUser: idUser});
}

function disconnect() {
	$.get('/disconnect', function() {
		window.location = "/";
	});
}

function refresh(time) {
	getUserAndFriends(function() {
		if(!currentUser) {
			disconnect(); 
			return;
		}
		updateMenu();
		updateFriendsList();
		fillProfilForm(currentUser);
	});
	window.setTimeout(function() {
		refresh(time);
	}, time);
}

function openPage(button, PageName) {
    // Declare all variables
    var i, tabcontent, tablinks;

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(PageName).style.display = "block";
	$(button).addClass(' active');
}
