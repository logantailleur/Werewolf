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
function generateRoleCards(numRoles) {
    // Clear previous role cards
    document.getElementById("otherRoleCards").innerHTML = "";

    // Generate and append role cards
    for (let i = 0; i < numRoles; i++) {
        // Create a new role card element
        let roleCard = document.createElement("div");
        roleCard.classList.add("col-3", "mb-3"); // Adjust the width and margin as needed
        roleCard.innerHTML = `
            <div class="card">
                <div class="card-body text-center">
                    <img src="ImageAssets/playericon.jpg" class="role-img" alt="Role Icon">
                    <p class="card-text">Player Name</p>
                </div>
            </div>
        `;

        // Append the role card to the container
        document.getElementById("otherRoleCards").appendChild(roleCard);
    }
}

// Function to initialize the application
function initializeApp() {
    // Generate initial role cards (e.g., 10)
    generateRoleCards(6); // Adjust the number of roles as needed
}

// Call the initializeApp function when the DOM content is loaded
document.addEventListener("DOMContentLoaded", function() {
    initializeApp();
});