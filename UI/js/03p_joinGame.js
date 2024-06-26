import { joinGame } from '../services/FetchAPI.js';

//Initialize app when DOM content is loaded.
document.addEventListener('DOMContentLoaded', function () {
	initializeApp();
});

function initializeApp() {
	initializeEventListeners();
}

function initializeEventListeners() {
	//Click listener for join game button.
	var joinGameBtn = document.getElementById('joinGameBtn');
	joinGameBtn.addEventListener('click', handleJoinGameClick);
}

async function handleJoinGameClick() {
	var userName = document.getElementById('userName').value;
	var lobbyCode = document.getElementById('lobbyCode').value;

	//Validate userName and lobbyCode.
	if (lobbyCode.length !== 5 || userName.length < 1) {
		var errorMessage = document.getElementById('joinGameError');
		errorMessage.innerHTML = `Sorry, username and/or game code are invalid. Please try again.`;
		return;
	}

	//Get entered name, store in localStorage.
	localStorage.setItem('userName', userName);

	var joinResponse = await joinGame(lobbyCode, userName);
	if (joinResponse.success) {
		//Get returned player ID, store in localStorage.
		localStorage.setItem('playerId', joinResponse.playerId);

		//Get entered lobby, store in localStorage.
		localStorage.setItem('lobbyCode', lobbyCode);

		console.log(joinResponse);
		//Redirect to waiting_room page.
		if (joinResponse.canContinue) {
			window.location.href = '04pw_waiting_room_view.html';
		}
	} else {
		var errorMessage = document.getElementById('startGameError');
		errorMessage.innerHTML = `Sorry, game <strong>${lobbyCode}</strong> doesn't exist or is full. Please try again.`;
		return;
	}
}
