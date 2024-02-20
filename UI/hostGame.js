//Generate random 5-character code.
function createCode() {
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    var code = '';
    for (var i = 0; i < 5; i++) {
        code += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return code;
}

async function createLobby(code) {
    const response0 = await fetch(`/api/getlobby/${code}`);
    const body0 = await response0.json();
    if (body0.lobby != null) {
        return false;
    }

    const response = await fetch(`/api/createlobby`, {
        method: 'post',
        body: JSON.stringify({ game_code: code }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
    });
    const body = await response.json();
    
    if (response?.status === 200) {
        localStorage.setItem("lobby", code);
        return true;
    } else {
        return false;
    }
}

function initializeHostGamePage() {
    var valid = false;
    while (!valid) {
        //Create lobby's code.
        var code = createCode();
        //Adds lobby to database (returns false if it already exists).
        valid = createLobby(code);
    }

    //Display lobby's code.
    var generatedCodeElement = document.getElementById("lobbyCode");
    generatedCodeElement.textContent = "Lobby Code: " + code;
}

async function startGame() {
    //TODO: Call DB to verify 5 people are in lobby, start game if yes.
}

//Call initializeApp() when DOM is loaded.
document.addEventListener("DOMContentLoaded", function() {
    initializeHostGamePage();
});