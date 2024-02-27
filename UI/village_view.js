import { roleCardHTML } from "./roleCard.js";

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
}

//Generate initial role cards (e.g., 10).
//TODO: Adjust the number of roles as needed.
function generateRoleCards() {
    //Clear previous role cards.
    document.getElementById("otherRoleCards").innerHTML = "";

    //Generate and append role cards.
    //TODO: Fetch number of roles and add dynamic content.
    let nOtherPlayers = 6;
    for (let i = 0; i < nOtherPlayers; i++) {
        //Create new role card element.
        let roleCardElement = document.createElement("div");
        //Adjust width and margin as needed.
        roleCardElement.classList.add("col-3", "mb-3");
        roleCardElement.innerHTML = roleCardHTML;

        let playerName = roleCardElement.querySelector(".player-name")
        playerName.textContent = "Player " + (i + 2);

        //Append role card to container.
        document.getElementById("otherRoleCards").appendChild(roleCardElement);
    }
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