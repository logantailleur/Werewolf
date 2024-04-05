import { playerWakes, checkWinner } from '../services/FetchAPI.js';

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
	var wakeResponse = await playerWakes(lobbyCode, playerId);
	console.log(winResponse);
	console.log(wakeResponse);

	if (wakeResponse.canContinue) {
		if (winResponse.winner === 'villager') {
			window.location.href = '18_villager_win_view.html';
		} else if (winResponse.winner === 'werewolf') {
			window.location.href = '18_werewolf_win_view.html';
		} else if (wakeResponse.lastKillPlayer.playerId === playerId) {
			window.location.href = '12p_dead_villager_view.html';
		} else {
			window.location.href = '12p_morning_results_view.html';
		}
		console.log(wakeResponse);
		localStorage.setItem('victim', JSON.stringify(wakeResponse.lastKillPlayer));
	} else {
		return;
	}
}
