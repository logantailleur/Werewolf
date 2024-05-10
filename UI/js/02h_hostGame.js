import { getAllPlayers, startGame } from '../services/FetchAPI.js';

//Initialize app when DOM content is loaded.
document.addEventListener('DOMContentLoaded', function () {
	initializeApp();
});

function initializeApp() {
	initializeHostGamePage();
	initializeEventListeners();
}

async function initializeHostGamePage() {
	var lobbyCode = localStorage.getItem('lobbyCode');

	//Display lobby's code.
	var generatedCodeElement = document.getElementById('lobbyCode');
	generatedCodeElement.textContent = 'Lobby Code: ' + lobbyCode;
}

function initializeEventListeners() {
	//Click listener for start game button.
	var startGameBtn = document.getElementById('startGameBtn');
	startGameBtn.addEventListener('click', handleStartGameClick);
}

async function handleStartGameClick() {
	var lobbyCode = localStorage.getItem('lobbyCode');

	//Start game if 6 people are in lobby.
	var startResponse = await startGame(lobbyCode);
	console.log(startResponse);
	if (startResponse.success) {
		//Redirect to role_assign page.
		var allPlayers = await getAllPlayers(lobbyCode);
		console.log(allPlayers);
		if (allPlayers.success) {
			localStorage.setItem('players', JSON.stringify(allPlayers.players));
			window.location.href = '05h_player_grid_view.html';
		}
	} else {
		var errorMessage = document.getElementById('startGameError');
		errorMessage.innerHTML = `Sorry, game <strong>${lobbyCode}</strong> could not be started. Please try again.`;
		return;
	}
}
