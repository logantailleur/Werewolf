import { viewRole } from './services/FetchAPI.js';

//Initialize app when DOM content is loaded.
document.addEventListener('DOMContentLoaded', function () {
	initializeApp();
});

function initializeApp() {
	initializeRoleAssignPage();
	initializeEventListeners();
}

async function initializeRoleAssignPage() {
	const response = await viewRole(
		localStorage.getItem('lobbyCode'),
		localStorage.getItem('playerId')
	);
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
