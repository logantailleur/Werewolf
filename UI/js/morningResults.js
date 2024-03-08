import { viewRole } from '../services/FetchAPI.js';
import { roleModalHTML } from "./roleModal.js";

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

    var victimName = "[Victim Name]";
    var victimRole = "[Victim Role]";
    var doctorSave = true;
    var victimImage = 'ImageAssets/villagericon.png'

    if (doctorSave){
        resultAnnouncement.textContent = victimName + ' was almost killed!';
        resultSummary.textContent = "The doctor was able to save them! 🙌";
        roleImage.src = victimImage;
    } else {
        resultAnnouncement.textContent = victimName + ' was killed! They were a ' + victimRole + '!';
        roleImage.src = victimImage;
        resultSummary.textContent = "There was nothing anyone could do to save them 😭";
    }
}

function initializeEventListeners() {

}

function handleViewRoleClick() {
	// Set the src attribute to the desired image path inside the modal
	var modalRoleImage = document.querySelector(
		'#roleModal .role-assign-image img'
	);

    var role = localStorage.getItem("role");

	// Get a reference to the modal title and body elements
	var viewRoleTitle = document.getElementById('viewRoleTitle');
	var viewRoleObjective = document.getElementById('viewRoleObjective');
	var viewRoleAbilities = document.getElementById('viewRoleAbilities');

    if (role == "werewolf") {
        modalRoleImage.src = 'ImageAssets/wolficon.png';
        viewRoleTitle.textContent = 'Werewolf';
        viewRoleObjective.textContent = "Kill off the entire village and don't get caught";
        viewRoleAbilities.textContent = "You can kill one other player each night";
    } else {
        modalRoleImage.src = 'ImageAssets/villagericon.png';
        viewRoleTitle.textContent = 'Villager';
        viewRoleObjective.textContent = "Find the identity of the werewolves";
        viewRoleAbilities.textContent = "You're a little weak, but there is strength in numbers";
    }
}

