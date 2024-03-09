import { roleCardHTML } from "./roleCard.js";
import { roleModalHTML } from "./roleModal.js";
import { generateRoleCards } from "./generateRoleCardsFunction.js";

//Initialize app when DOM content is loaded.
document.addEventListener("DOMContentLoaded", function() {
    initializeApp();
});

function initializeApp() {
    generateRoleCards();
    initializeEventListeners();

    //Load role card.
    let myRoleCard = document.getElementById("myRoleCard");
    myRoleCard.innerHTML = roleCardHTML;
    let myName = myRoleCard.querySelector(".player-name");
    myName.textContent = "My Name"

    //Load role modal.
    let roleModal = document.getElementById("roleModal");
    roleModal.innerHTML = roleModalHTML;
}

//Generate initial role cards.
async function generateRoleCards() {
    var role = localStorage.getItem("role");

    //Clear previous role cards.
    document.getElementById("otherRoleCards").innerHTML = "";

    //Generate and append role cards.
    const response = await players(
		localStorage.getItem('lobbyCode')
	);

    let otherPlayers = response.players;
    let nOtherPlayers = otherPlayers.length;

    for (let i = 0; i < nOtherPlayers; i++) {
        //Create new role card element.
        let roleCardElement = document.createElement("div");

        //Adjust width and margin as needed.
        roleCardElement.classList.add("col-lg-3", "col-md-4", "col-sm-6", "mb-3");
        roleCardElement.innerHTML = roleCardHTML;

        //Add player name to role card.
        let playerName = roleCardElement.querySelector(".player-name")
        playerName.textContent = otherPlayers[i].player_name;

        //Add player status to role card.
        //TODO: Add status to database.
        let playerStatus = roleCardElement.querySelector(".player-status")
        playerStatus.textContent = otherPlayers[i].player_status;

        //TODO: Make sure host is a role.
        //TODO: Change role to player_role in database.
        if (role == "host") {
            let playerRole = roleCardElement.querySelector(".player-role")
            playerRole.textContent = otherPlayers[i].player_role;
        }

        //Append role card to container.
        document.getElementById("otherRoleCards").appendChild(roleCardElement);
    }
}

function initializeEventListeners() {
	//Click listener for view role button.
    var viewRoleBtn = document.getElementById("viewRoleBtn");
    viewRoleBtn.addEventListener("click", handleViewRoleClick);
    
	//Click listener for nightfall button.
    var nightFallBtn = document.getElementById("nightFallBtn");
    nightFallBtn.addEventListener("click", handleNightFallClick);
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

function handleNightFallClick() {
	window.location.href = 'werewolfTurn.html';
}