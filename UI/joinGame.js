import {joinGame} from './services/FetchAPI.js';

//Initialize app when DOM content is loaded.
document.addEventListener("DOMContentLoaded", function() {
    initializeApp();
});

function initializeApp() {
    initializeEventListeners();
}

function initializeEventListeners() {
	//Click listener for join game button.
    var joinGameBtn = document.getElementById("joinGameBtn");
    joinGameBtn.addEventListener("click", handleJoinGameClick);
}

async function handleJoinGameClick() {
    var userName = document.getElementById("userName").value;
    var lobbyCode = document.getElementById("lobbyCode").value;

    //Validate userName and lobbyCode.
    if (lobbyCode.length !== 5 || userName.length < 1) {
        var errorMessage = document.getElementById("joinGameError");
        errorMessage.innerHTML = `Sorry, username and/or game code are invalid. Please try again.`;
        return;
    }

    //Get entered name, store in localStorage.
    localStorage.setItem("userName", userName);

    var response = await joinGame(lobbyCode, userName);
    if (response.success) {
        //Get entered lobby, store in localStorage.
        localStorage.setItem("lobbyCode", lobbyCode);

        //Get returned player ID, store in localStorage.
        localStorage.setItem("playerId", response.playerId);

        //Redirect to waiting_room page.
        window.location.href = "waiting_room.html";
    } else {
        var errorMessage = document.getElementById("startGameError");
        errorMessage.innerHTML = `Sorry, game <strong>${lobbyCode}</strong> doesn't exist or is full. Please try again.`;
        return;
    }
}