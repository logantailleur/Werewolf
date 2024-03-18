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
    // const response = await viewRole(
	// 	localStorage.getItem('lobbyCode'),
	// 	localStorage.getItem('playerId')
	// );
	// console.log(response);

	// Get references to document portions
	var resultAnnouncement = document.getElementById('resultAnnouncement');
	var resultSummary = document.getElementById('resultSummary');
	var roleImage = document.querySelector('.role-assign-image img');

	// console.log(response);
	// localStorage.setItem('role', 'werewolf');

    var werewolfImage = 'ImageAssets/wolficon.png';
    var villagerImage = 'ImageAssets/villagericon.png'
    var werewolfWin = true;

    if (werewolfWin){
        resultAnnouncement.textContent = "The werewolves won!";
        roleImage.src = werewolfImage;
        resultSummary.textContent = "There's no more hope for the village :(";
    } else {
        resultAnnouncement.textContent = "The villagers won!";
        roleImage.src = villagerImage;
        resultSummary.textContent = "The villagers successfully rooted out and killed all the werewolves!";
    }
    
}

function initializeEventListeners() {
	//Click listener for view role button.
	var viewRoleBtn = document.getElementById('viewRoleBtn');
	viewRoleBtn.addEventListener('click', handleViewRoleClick);
}


