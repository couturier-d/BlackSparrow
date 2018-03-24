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

	openPage($("#menuGameBtn"), 'Jeux');

	let filterConfig = {
		base_path: 'libs/tablefilter/',
		paging: {
          results_per_page: ['Lignes par page : ', [10,25,50]]
        },
        alternate_rows: true,
        btn_reset: true,
        rows_counter: true,
        loader: true,
        status_bar: true,
		col_0: 'select',
        col_1: 'select',
        col_2: 'select',
        col_types: [
            'string', 'string', 'number'
        ],
		extensions:[{
            name: 'sort'
        }]
	};
	let tf = new TableFilter('gameTable', filterConfig);
    tf.init();
});

function update() {
	if(!currentUser) return;
	$("#tokensNumber").html(currentUser.token);
	$("#username").html(currentUser.nickname);
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
