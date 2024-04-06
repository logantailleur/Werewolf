import { checkWinner, viewResultPlayer } from '../services/FetchAPI.js';

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

	var winResponse = await checkWinner(lobbyCode);
	var deathResponse = await viewResultPlayer(lobbyCode, playerId);
	console.log(winResponse);
	console.log(deathResponse);

	if (deathResponse.success && deathResponse.canContinue) {
		localStorage.setItem('victim', JSON.stringify(deathResponse.player));
		
		if (winResponse.winner === 'villager') {
			window.location.href = '18_villager_win_view.html';
		} else if (winResponse.winner === 'werewolf') {
			window.location.href = '18_werewolf_win_view.html';
		} else if (deathResponse.player.playerId === playerId) {
			window.location.href = '16p_hung_villager_view.html';
		} else {
			window.location.href = '16p_vote_results_view.html';
		}
	} else {
		return;
	}
}
