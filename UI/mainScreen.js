// Function to handle the click event for hosting a game
function handleHostGameClick() {
    // Redirect to the host_game.html page
    window.location.href = "host_game.html";
}

function handleJoinGameClick() {
    // Redirect to the host_game.html page
    window.location.href = "join_game.html";
}

// Function to initialize event listeners
function initializeEventListeners() {
    // Add click event listener to the host game button
    var hostGameBtn = document.getElementById("hostGameBtn");
    hostGameBtn.addEventListener("click", handleHostGameClick);

    var joinGameBtn = document.getElementById("joinGameBtn");
    joinGameBtn.addEventListener("click", handleJoinGameClick);
}

// Function to initialize the application
function initializeApp() {
    initializeEventListeners();
}

// Call the initializeApp function when the DOM content is loaded
document.addEventListener("DOMContentLoaded", function() {
    initializeApp();
});