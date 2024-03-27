import { handleViewRoleClick } from './viewRoleClickHandler.js';
import { roleModalHTML } from './roleModal.js';
import { roleCardHTML } from './roleCard.js';
import { hostSleeps } from '../services/FetchAPI.js';
// import { generateRoleCards } from "./generateRoleCardsFunction.js";

//Initialize app when DOM content is loaded.
document.addEventListener('DOMContentLoaded', function () {
	initializeApp();
});

function initializeApp() {
	generateRoleCards();
	initializeEventListeners();

	//Load role modal
	let roleModal = document.getElementById('roleModal');
	roleModal.innerHTML = roleModalHTML;
}

function initializeEventListeners() {
	//Click listener for view role button.
	var viewRoleBtn = document.getElementById('viewRoleBtn');
	viewRoleBtn.addEventListener('click', handleViewRoleClick);

	var nightFallBtn = document.getElementById('nightFallBtn');
	nightFallBtn.addEventListener('click', handleContinueClick);
}

async function handleContinueClick() {
	var response = await hostSleeps(localStorage.getItem('lobbyCode'));

	if (response.canContinue) {
		window.location.href = '04h_host_night_view.html';
	}

	// TODO: Send signal to players so their screens move on to werewolf turn
}

async function generateRoleCards() {
	//Clear previous role cards.
	document.getElementById('otherRoleCards').innerHTML = '';

	//Generate and append role cards.

	let otherPlayers = JSON.parse(localStorage.getItem('players'));
	let nOtherPlayers = otherPlayers.length;
	console.log(otherPlayers);

	for (let i = 0; i < nOtherPlayers; i++) {
		//Create new role card element.
		let roleCardElement = document.createElement('div');

		//Adjust width and margin as needed.
		roleCardElement.classList.add(
			'col-lg-3',
			'col-md-4',
			'col-sm-6',
			'mb-3',
			'role-card'
		);
		roleCardElement.innerHTML = roleCardHTML;

		//Add name-based id.
		let cardId = otherPlayers[i].playerId;
		roleCardElement.setAttribute('id', cardId);

		//Add player name to role card.
		let playerName = roleCardElement.querySelector('.player-name');
		playerName.textContent = 'Name: ' + otherPlayers[i].name;

		let playerRole = roleCardElement.querySelector('.player-role');
		playerRole.textContent = 'Role: ' + 'Villager'

		let playerStatus = roleCardElement.querySelector('.player-status');
		if (otherPlayers[i].isAlive === 'n') {
			playerStatus.textContent = 'Status: ' + 'Dead';
		} else {
			playerStatus.textContent = 'Status: ' + 'Alive';
		}

		if (otherPlayers[i].role === 'werewolf') {
			let image = roleCardElement.querySelector('.role-img');
			image.src = 'ImageAssets/wolficon.png';
			playerRole.textContent = 'Role: ' + 'Werewolf';
		}

		//Append role card to container.
		document.getElementById('otherRoleCards').appendChild(roleCardElement);
	}
}
