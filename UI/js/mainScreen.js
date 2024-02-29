import { createGame } from '../services/FetchAPI.js';

//Initialize app when DOM content is loaded.
document.addEventListener('DOMContentLoaded', function () {
	initializeApp();
});

function initializeApp() {
	initializeEventListeners();
}

function initializeEventListeners() {
	//Click listener for host game button.
	var hostGameBtn = document.getElementById('hostGameBtn');
	hostGameBtn.addEventListener('click', handleHostGameClick);

	//Click listener for join game button.
	var joinGameBtn = document.getElementById('joinGameBtn');
	joinGameBtn.addEventListener('click', handleJoinGameClick);
}

async function handleHostGameClick() {
	//Redirect to host_game page.
	var lobbyCode = await createGame();
	localStorage.setItem('lobbyCode', lobbyCode.gameCode);
	window.location.href = 'host_game.html';
}

function handleJoinGameClick() {
	//Redirect to host_game page.
	window.location.href = 'join_game.html';
}
