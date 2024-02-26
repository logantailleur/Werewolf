import { roleCardHTML } from "./roleCard.js";

document.addEventListener("DOMContentLoaded", function() {
    // Get references to document portions
    var viewRoleButton = document.getElementById("viewRoleBtn");

    // Add click event listener to the View Role button
    viewRoleButton.addEventListener("click", function() {
        // Set the src attribute to the desired image path inside the modal
        var modalRoleImage = document.querySelector("#roleModal .role-assign-image img");
        modalRoleImage.src = "ImageAssets/wolficon.png";
        // Get a reference to the modal title and body elements
        var viewRoleTitle = document.getElementById("viewRoleTitle");
        var viewRoleObjective = document.getElementById("viewRoleObjective");
        var viewRoleAbilities = document.getElementById("viewRoleAbilities");

        // Change the modal title
        viewRoleTitle.textContent = "Role Title";

        // Change the objective
        viewRoleObjective.textContent = "This role's objectives.";

        // Change the role abilities
        viewRoleAbilities.textContent = "This role's abilities";
    });
});

// Function to generate and display role cards
function generateRoleCards() {
    // Clear previous role cards
    document.getElementById("otherRoleCards").innerHTML = "";

    // Generate and append role cards
    // TODO: Fetch number of roles and add dynamic content
    let nOtherPlayers = 6;
    for (let i = 0; i < nOtherPlayers; i++) {
        // Create a new role card element
        let roleCardElement = document.createElement("div");
        roleCardElement.classList.add("col-3", "mb-3"); // Adjust the width and margin as needed
        roleCardElement.innerHTML = roleCardHTML;

        let playerName = roleCardElement.querySelector(".player-name")
        playerName.textContent = "Player " + (i + 2);

        // Append the role card to the container
        document.getElementById("otherRoleCards").appendChild(roleCardElement);
    }
}

// Function to initialize the application
function initializeApp() {
    // Generate initial role cards (e.g., 10)
    generateRoleCards(); // Adjust the number of roles as needed

    // Load my role card
    let myRoleCard = document.getElementById("myRoleCard");
    myRoleCard.innerHTML = roleCardHTML;
    let myName = myRoleCard.querySelector(".player-name");
    myName.textContent = "My Name"
}

// Call the initializeApp function when the DOM content is loaded
document.addEventListener("DOMContentLoaded", function() {
    initializeApp();
});
