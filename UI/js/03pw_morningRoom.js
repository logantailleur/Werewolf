import { playerWakes } from '../services/FetchAPI.js';

document.addEventListener('DOMContentLoaded', function () {
	initializeApp();
});

function initializeApp() {
	initializeEventListeners();
}

function initializeEventListeners() {
	var continueButton = document.getElementById('continueButton');
	continueButton.addEventListener('click', handleContinueClick);
}

async function handleContinueClick() {
	var lobbyCode = localStorage.getItem('lobbyCode');
	var playerId = localStorage.getItem('playerId');

	var response = await playerWakes(lobbyCode, playerId);
	if (response.canContinue) {
		if (response.lastKillPlayer.playerId === localStorage.getItem('playerId')) {
			window.location.href = '09p_dead_villager_view.html';
		}
		console.log(response);
		localStorage.setItem('victim', JSON.stringify(response.lastKillPlayer));

		if (response.lastKillPlayer.role === 'werewolf') {
			window.location.href = '10_werewolf_win_view.html';
		} else {
			window.location.href = '05p_morning_results_view.html';
		}
	} else {
		var errorMessage = document.getElementById('gameStartedError');
		errorMessage.innerHTML = `Sorry, game <strong>${lobbyCode}</strong> has not been started. Please try again.`;
		return;
	}
}
