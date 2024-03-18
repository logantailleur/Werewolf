import { viewRole } from '../services/FetchAPI.js';
import { roleModalHTML } from "./roleModal.js";
import { handleViewRoleClick } from './viewRoleClickHandler.js';

//Initialize app when DOM content is loaded.
document.addEventListener('DOMContentLoaded', function () {
	initializeApp();
});

function initializeApp() {
	initializeRoleAssignPage();
	initializeEventListeners();

	//Load role modal
	let roleModal = document.getElementById("roleModal");
	roleModal.innerHTML = roleModalHTML;
}

async function initializeRoleAssignPage() {
	const response = await viewRole(
		localStorage.getItem('lobbyCode'),
		localStorage.getItem('playerId')
	);
	console.log(response);

	// Get references to document portions
	var roleAnnouncement = document.getElementById('roleAnnouncement');
	var roleSummary = document.getElementById('roleSummary');
	var roleImage = document.querySelector('.role-assign-image img');

	console.log(response);
	localStorage.setItem('role', response.role);

	if (response.role == 'werewolf') {
		roleAnnouncement.textContent = 'You are a werewolf!';
		roleSummary.textContent = "Stay hidden, don't get caught!";
		roleImage.src = 'ImageAssets/wolficon.png';
	} else {
		roleAnnouncement.textContent = 'You are a villager!';
		roleSummary.textContent = 'Try to find the werewolves!';
		roleImage.src = 'ImageAssets/villagericon.png';
	}
}

function initializeEventListeners() {
	//Click listener for view role button.
	var viewRoleBtn = document.getElementById('viewRoleBtn');
	viewRoleBtn.addEventListener('click', handleViewRoleClick);
}
