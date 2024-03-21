import { viewResult } from '../services/FetchAPI.js';

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

	var response = await viewResult(lobbyCode);
	if (response.success && response.canContinue) {
		if (response.player.playerId === localStorage.getItem('playerId')) {
			window.localation.href = '10p_hung_villager_view.html';
		}
		console.log(response);
		localStorage.setItem('victim', JSON.stringify(response.player));

		if (response.player.role === 'werewolf') {
			window.location.href = '10p_win_game_view.html';
		} else {
			window.location.href = '8p_vote_results_view.html';
		}
	} else {
		var errorMessage = document.getElementById('endVotingError');
		errorMessage.innerHTML = `Sorry, voting for game <strong>${lobbyCode}</strong> has not ended. Please try again.`;
		return;
	}
}