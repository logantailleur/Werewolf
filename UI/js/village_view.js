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

    //Load role modal
    let roleModal = document.getElementById("roleModal");
    roleModal.innerHTML = roleModalHTML;
}

function initializeEventListeners() {
	//Click listener for view role button.
    var viewRoleBtn = document.getElementById("viewRoleBtn");
    viewRoleBtn.addEventListener("click", handleViewRoleClick);
}

function handleViewRoleClick() {
    //Set src attribute to desired image path inside modal.
    var modalRoleImage = document.querySelector("#roleModal .role-assign-image img");
    modalRoleImage.src = "ImageAssets/wolficon.png";

    //Get reference to modal title and body elements.
    var viewRoleTitle = document.getElementById("viewRoleTitle");
    var viewRoleObjective = document.getElementById("viewRoleObjective");
    var viewRoleAbilities = document.getElementById("viewRoleAbilities");

    //Change modal title.
    viewRoleTitle.textContent = "Role Title";

    //Change objective.
    viewRoleObjective.textContent = "This role's objectives.";

    //Change role abilities.
    viewRoleAbilities.textContent = "This role's abilities";
}