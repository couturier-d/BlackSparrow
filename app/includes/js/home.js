$(document).ready(function() {
	
	$(".joinTd img").click(function() {
		console.log(this.parentElement.parentElement.id);
	});

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
		col_3: 'none',
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

function fillGameTable() {
	//$.get("127.0.0.1:3001", function(tables) {
		let tables = [{id: 1, onlinePlayer: 2, maxPlayer: 4, game: "Black Jack"}];
		$.each(tables, function(index, table) {
			let tr = document.createElement("tr");
			tr.id = table.id;
			let gameTd = createGameTd(table.game);
			let roomTd = createRoomTd(table.id);
			let playerTd = createPlayerTd(table.id, table.onlinePlayer, table.maxPlayer);
			let joinTd = createJoinTd(table.id);
			tr.append(gameTd, roomTd, playerTd, joinTd);
			$("#gameTable tbody").append(tr);
		});
	//});
}

function createPlayerTd(idTable, onlinePlayer, maxPlayer) {
	let tdPlayer = document.createElement("td");
	let onlinePlayerSpan = document.createElement("span");
	onlinePlayerSpan.id = "onlineTable" + idTable;
	$(onlinePlayerSpan).text(onlinePlayer);
	tdPlayer.append(onlinePlayerSpan, " / " + maxPlayer);
	return tdPlayer;
}

function createGameTd(game) {
	let tdGame = document.createElement("td");
	$(tdGame).text(game);
	return tdGame;
}

function createRoomTd(idTable) {
	let tdRoom = document.createElement("td");
	$(tdRoom).text("Table " + idTable);
	return tdRoom;
}

function createJoinTd() {
	let tdJoin = document.createElement("td");
	tdJoin.classList.add("joinTd");
	let playImgBtn = document.createElement("img");
	playImgBtn.alt = "Play";
	playImgBtn.src = "images/icons/playbutton.png";
	playImgBtn.width = "30";
	tdJoin.appendChild(playImgBtn);
	return tdJoin;
}
