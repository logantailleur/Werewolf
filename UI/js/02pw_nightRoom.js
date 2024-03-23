import { playerSleeps } from '../services/FetchAPI.js';

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

	var response = await playerSleeps(lobbyCode, playerId);
	if (response.success && response.canContinue) {
		var role = localStorage.getItem('role');
		localStorage.setItem('players', JSON.stringify(response.players));

		console.log(response.players);

		if (role == 'werewolf') {
			window.location.href = '03p_werewolf_night_view.html';
		} else if (role == 'villager') {
			window.location.href = '03p_villager_night_view.html';
		}
	} else {
		var errorMessage = document.getElementById('playerSleepsError');
		errorMessage.innerHTML = `Sorry, night for game <strong>${lobbyCode}</strong> has not started. Please try again.`;
		return;
	}
}
