import { roleCardHTML } from "./roleCard.js";
import { roleModalHTML } from "./roleModal.js";
import { generateRoleCards } from "./generateRoleCardsFunction.js";
import { handleViewRoleClick } from "./viewRoleClickHandler.js";

//Initialize app when DOM content is loaded.
document.addEventListener("DOMContentLoaded", function() {
    initializeApp();
});

function initializeApp() {
    generateRoleCards();
    initializeEventListeners();

    //Load role modal
    let roleModal = document.getElementById("roleModal");
    roleModal.innerHTML = roleModalHTML;
}

function initializeEventListeners() {
	//Click listener for view role button.
    var viewRoleBtn = document.getElementById("viewRoleBtn");
    viewRoleBtn.addEventListener("click", handleViewRoleClick);
}
