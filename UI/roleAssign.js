document.addEventListener("DOMContentLoaded", function() {
    // Get a reference to the View Role button
    var viewRoleButton = document.getElementById("viewRoleBtn");

    // Add click event listener to the View Role button
    viewRoleButton.addEventListener("click", function() {

        // Get a reference to the image element
        var roleImage = document.querySelector(".role-assign-image img");

        // Set the src attribute to the desired image path
        roleImage.src = "ImageAssets/wolficon.png";

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