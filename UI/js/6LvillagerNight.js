import { roleCardHTML } from "./roleCard.js";
import { roleModalHTML } from "./roleModal.js";

//Initialize app when DOM content is loaded.
document.addEventListener("DOMContentLoaded", function() {
    initializeApp();
});

function initializeApp() {
    initializeEventListeners();

    //Load role card.
    let myRoleCard = document.getElementById("myRoleCard");
    myRoleCard.innerHTML = roleCardHTML;
    let myName = myRoleCard.querySelector(".player-name");
    myName.textContent = localStorage.getItem('lobbyCode')

    //Load role modal.
    let roleModal = document.getElementById("roleModal");
    roleModal.innerHTML = roleModalHTML;
    
    let actionDescription = document.getElementById("actionDescription");
    actionDescription.innerHTML = "<p>Sleep</p>";
}

function initializeEventListeners() {
	//Click listener for sleep button.
    var sleepBtn = document.getElementById("sleepBtn");
    sleepBtn.addEventListener("click", handleSleepClick);

	//Click listener for view role button.
    var viewRoleBtn = document.getElementById("viewRoleBtn");
    viewRoleBtn.addEventListener("click", handleViewRoleClick);
}

function handleSleepClick() {
    window.location.href = '7L_morning_room.html';
}

function handleViewRoleClick() {
    //Set src attribute to desired image path inside modal.
    var modalRoleImage = document.querySelector(
		'#roleModal .role-assign-image img'
	);

    var role = localStorage.getItem("role");

    //Get reference to modal title and body elements.
    var viewRoleTitle = document.getElementById("viewRoleTitle");
    var viewRoleObjective = document.getElementById("viewRoleObjective");
    var viewRoleAbilities = document.getElementById("viewRoleAbilities");

    if (role == "werewolf") {
        modalRoleImage.src = 'ImageAssets/wolficon.png';
        viewRoleTitle.textContent = 'Werewolf';
        viewRoleObjective.textContent = "Kill off the entire village and don't get caught";
        viewRoleAbilities.textContent = "You can kill one other player each night";
    } else if (role == "villager") {
        modalRoleImage.src = 'ImageAssets/villagericon.png';
        viewRoleTitle.textContent = 'Villager';
        viewRoleObjective.textContent = "Find the identity of the werewolves";
        viewRoleAbilities.textContent = "You're a little weak, but there is strength in numbers";
    }
}