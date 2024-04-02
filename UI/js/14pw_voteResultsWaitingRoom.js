import { viewResult, viewResultPlayer } from '../services/FetchAPI.js';

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

	var response = await viewResultPlayer(
		lobbyCode,
		localStorage.getItem('playerId')
	);
	console.log(response);
	if (response.success && response.canContinue) {
		if (response.player.playerId === localStorage.getItem('playerId')) {
			window.location.href = '16p_hung_villager_view.html';
		}
		console.log(response);
		localStorage.setItem('victim', JSON.stringify(response.player));

		if (response.player.role === 'werewolf') {
			window.location.href = '18_villager_win_view.html';
		} else {
			window.location.href = '16p_vote_results_view.html';
		}
	} else {
		return;
	}
}
