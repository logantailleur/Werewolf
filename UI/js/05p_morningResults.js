import { handleViewRoleClick } from "./viewRoleClickHandler.js";
import { roleModalHTML } from './roleModal.js';
import { playerReadyToVote } from '../services/FetchAPI.js';

//Initialize app when DOM content is loaded.
document.addEventListener('DOMContentLoaded', function () {
	initializeApp();
});

function initializeApp() {
	initializeResultPage();
	initializeEventListeners();

	//Load role modal
	let roleModal = document.getElementById('roleModal');
	roleModal.innerHTML = roleModalHTML;
}

async function initializeResultPage() {
	var resultAnnouncement = document.getElementById('resultAnnouncement');
	var resultSummary = document.getElementById('resultSummary');
	var resultImage = document.querySelector('.result-image img');

	var victim = JSON.parse(localStorage.getItem('victim'));
	var victimName = victim.name;
	var victimRole = victim.role;
	var victimImage = 'ImageAssets/villagericon.png';

	resultAnnouncement.textContent =
		victimName + ' was killed! They were a ' + victimRole + '!';
	resultSummary.textContent =
		'There was nothing anyone could do to save them 😭';
	resultImage.src = victimImage;
}

function initializeEventListeners() {
	//Click listener for vote button.
	var voteBtn = document.getElementById('voteBtn');
	voteBtn.addEventListener('click', handleVoteClick);

	//Click listener for view role button.
	var viewRoleBtn = document.getElementById('viewRoleBtn');
	viewRoleBtn.addEventListener('click', handleViewRoleClick);
}

async function handleVoteClick() {
	const response = await playerReadyToVote(
		localStorage.getItem('lobbyCode'),
		localStorage.getItem('playerId')
	);
	if (response.success) {
		localStorage.setItem('players', JSON.stringify(response.players));
		window.location.href = '07p_voting_screen_view.html';
	}
}