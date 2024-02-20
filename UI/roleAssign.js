function viewRole() {
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
}

function initializeRoleAssignPage() {
    // Get references to document portions
    var roleAnnouncement = document.getElementById("roleAnnouncement");
    var roleSummary = document.getElementById("roleSummary");
    var roleImage = document.querySelector(".role-assign-image img");

    // Change the role announcement
    roleAnnouncement.textContent = "You are a [role]!"

    // Change the role summary
    roleSummary.textContent = "Summary of role"

    // Set the src attribute to the desired image path
    roleImage.src = "ImageAssets/wolficon.png";
}

//Call initializeApp() when DOM is loaded.
document.addEventListener("DOMContentLoaded", function() {
    initializeRoleAssignPage();
});