import { playerSleeps } from '../services/FetchAPI.js';
import { roleModalHTML } from './roleModal.js';

//Initialize app when DOM content is loaded.
document.addEventListener('DOMContentLoaded', function () {
	initializeApp();
});

function initializeApp() {
	initializeRoleAssignPage();
	initializeEventListeners();

	//Load role modal
	let roleModal = document.getElementById('roleModal');
	roleModal.innerHTML = roleModalHTML;
}

async function initializeRoleAssignPage() {
	var resultAnnouncement = document.getElementById('resultAnnouncement');
	var resultSummary = document.getElementById('resultSummary');
	var resultImage = document.querySelector('.result-image img');

	var victim = JSON.parse(localStorage.getItem('victim'));
	var victimName = victim.name;
	var victimRole = victim.role;
	var victimImage = 'ImageAssets/villagericon.png';

	resultAnnouncement.textContent =
		victimName + ' was executed! They were a ' + victimRole + '!';
	resultSummary.textContent = 'You killed them 😭';
	resultImage.src = victimImage;
}

function initializeEventListeners() {
	//Click listener for vote button.
	var nightBtn = document.getElementById('nightBtn');
	nightBtn.addEventListener('click', handleNightClick);

	//Click listener for view role button.
	var viewRoleBtn = document.getElementById('viewRoleBtn');
	viewRoleBtn.addEventListener('click', handleViewRoleClick);
}

async function handleNightClick() {
	const response = await playerSleeps(localStorage.getItem('lobbyCode'), localStorage.getItem('playerId'));
	if (response.success && response.canContinue) {
		window.location.href = '2.5p_night_room_view.html';
	}
}

function handleViewRoleClick() {
	//Set src attribute to desired image path inside modal.
	var modalRoleImage = document.querySelector(
		'#roleModal .role-assign-image img'
	);

	var role = localStorage.getItem('role');

	//Get reference to modal title and body elements.
	var viewRoleTitle = document.getElementById('viewRoleTitle');
	var viewRoleObjective = document.getElementById('viewRoleObjective');
	var viewRoleAbilities = document.getElementById('viewRoleAbilities');

	if (role == 'werewolf') {
		modalRoleImage.src = 'ImageAssets/wolficon.png';
		viewRoleTitle.textContent = 'Werewolf';
		viewRoleObjective.textContent =
			"Kill off the entire village and don't get caught";
		viewRoleAbilities.textContent = 'You can kill one other player each night';
	} else if (role == 'villager') {
		modalRoleImage.src = 'ImageAssets/villagericon.png';
		viewRoleTitle.textContent = 'Villager';
		viewRoleObjective.textContent = 'Find the identity of the werewolves';
		viewRoleAbilities.textContent =
			"You're a little weak, but there is strength in numbers";
	}
}
