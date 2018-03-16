let currentUser;

$(document).ready(function() {
	$.get('/user', function(user) {
		currentUser = user;
		update();
	});

	$("#logoutBtn").click(function() {
		if(confirm("Voulez-vous vraiment vous déconnecter ?")) {
			$.get('/disconnect', function() {
				window.location = "/";
			});
		}
	});
});

function update() {
	if(!currentUser) return;
	$("#tokensNumber").html(currentUser.token);
	$("#username").html(currentUser.nickname);
}

function openPage(evt, PageName) {
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
    evt.currentTarget.className += " active";
}
