import {createGame, startGame} from './services/FetchAPI.js';

//Initialize app when DOM content is loaded.
document.addEventListener("DOMContentLoaded", function() {
    initializeApp();
});

function initializeApp() {
    initializeHostGamePage();
    initializeEventListeners();
}

function initializeHostGamePage() {
    //Create lobby in DB.
    var lobbyCode = createGame();

    //Store lobby's code in local storage.
    localStorage.setItem("lobbyCode", lobbyCode);

    //Display lobby's code.
    var generatedCodeElement = document.getElementById("lobbyCode");
    generatedCodeElement.textContent = "Lobby Code: " + lobbyCode;
}

function initializeEventListeners() {
	//Click listener for start game button.
    var startGameBtn = document.getElementById("startGameBtn");
    startGameBtn.addEventListener("click", handleStartGameClick);
}

function handleStartGameClick() {
    //Get lobby's code from local storage.
    var lobbyCode = localStorage.getItem("lobbyCode");

    //Start game if 5 people are in lobby.
    var response = startGame(lobbyCode);
    if (response.success) {
        //Redirect to role_assign page.
        window.location.href = "role_assign.html";
    } else {
        var errorMessage = document.getElementById("startGameError");
        errorMessage.innerHTML = `Sorry, game <strong>${lobbyCode}</strong> could not be started. Please try again.`;
        return;
    }
}