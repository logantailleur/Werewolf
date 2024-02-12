function checkInput() {
    var input = document.getElementById("gameCodeInput");
    var button = document.getElementById("joinGameButton");
    
    // Enable the button if the input length is 5, disable it otherwise
    if (input.value.length === 5) {
        button.disabled = false;
        button.classList.remove("disabled-button"); // Remove the disabled styling
    } else {
        button.disabled = true;
        button.classList.add("disabled-button"); // Add the disabled styling
    }
}