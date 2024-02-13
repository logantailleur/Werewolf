// Function to check if the input in the text boxes are valid
function checkInput() {
    var gameCodeInput = document.getElementById("gameCodeInput");
    var nameInput = document.getElementById("nameInput")
    var button = document.getElementById("joinGameButton");
    
    // Enable the button if the input length is 5, disable it otherwise
    if (gameCodeInput.value.length === 5 && nameInput.value.length >= 1) {
        button.disabled = false;
        button.classList.remove("disabled-button"); // Remove the disabled styling
    } else {
        button.disabled = true;
        button.classList.add("disabled-button"); // Add the disabled styling
    }
}

// Function to handle the click event for the "Join Game" button
function handleJoinGameClick() {
    // Retrieve the name entered by the user
    var nameInput = document.getElementById("nameInput").value;

    // Store the name in local storage
    localStorage.setItem("playerName", nameInput);

    // Replace the inputs and button with the message
    var container = document.querySelector(".container-fluid");
    container.innerHTML = `<div class="text-center">
                                <div class="mt-2">Hang tight, <strong>${nameInput}</strong>. The host will be starting the game soon...</div>
                            </div>`;
}

// Function to initialize event listeners
function initializeEventListeners() {
    // Add click event listener to the "Join Game" button
    var joinGameButton = document.getElementById("joinGameButton");
    joinGameButton.addEventListener("click", handleJoinGameClick);
}

// Function to initialize the application
function initializeApp() {
    initializeEventListeners();
}

// Call the initializeApp function when the DOM content is loaded
document.addEventListener("DOMContentLoaded", function() {
    initializeApp();
});