import { handleViewRoleClick } from "./viewRoleClickHandler.js";
import { roleCardHTML } from './roleCard.js';
import { roleModalHTML } from './roleModal.js';
import { werewolfKills } from '../services/FetchAPI.js';

//Initialize app when DOM content is loaded.
document.addEventListener('DOMContentLoaded', function () {
	initializeApp();
});

function initializeApp() {
	generateRoleCards();
	//dummyGenerateRoleCards();
	initializeEventListeners();

	//Load role card.
	let myRoleCard = document.getElementById('myRoleCard');
	myRoleCard.innerHTML = roleCardHTML;
	let myName = myRoleCard.querySelector('.player-name');
	myName.textContent = localStorage.getItem('userName');

	//Load role modal.
	let roleModal = document.getElementById('roleModal');
	roleModal.innerHTML = roleModalHTML;

	let actionDescription = document.getElementById('actionDescription');
	actionDescription.innerHTML = '<p>Choose your prey. 😈</p>';
}

//Generate initial role cards.
async function generateRoleCards() {
	//Clear previous role cards.
	document.getElementById('otherRoleCards').innerHTML = '';

	//Generate and append role cards.

	let otherPlayers = JSON.parse(localStorage.getItem('players'));
	let nOtherPlayers = otherPlayers.length;
	console.log(otherPlayers);

	for (let i = 0; i < nOtherPlayers; i++) {
		//TODO: Add status to database. Add "villager" role to database.
		if (
			otherPlayers[i].role !== 'werewolf' &&
			otherPlayers[i].isAlive === 'y'
		) {
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
			playerName.textContent = otherPlayers[i].name;

			//Append role card to container.
			document.getElementById('otherRoleCards').appendChild(roleCardElement);
		}
	}
}

//Generate dummy role cards.
async function dummyGenerateRoleCards() {
	//Clear previous role cards.
	document.getElementById('otherRoleCards').innerHTML = '';

	let nOtherPlayers = 6;

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
		let cardId = 'player id ' + i;
		roleCardElement.setAttribute('id', cardId);

		//Add player name to role card.
		let playerName = roleCardElement.querySelector('.player-name');
		playerName.textContent = 'player name ' + i;

		//Append role card to container.
		document.getElementById('otherRoleCards').appendChild(roleCardElement);
	}
}

function initializeEventListeners() {
	//Click listener for view role button.
	var viewRoleBtn = document.getElementById('viewRoleBtn');
	viewRoleBtn.addEventListener('click', handleViewRoleClick);

	//Click listener for each role card.
	var roleCards = document.querySelectorAll('.role-card');
	roleCards.forEach(function (roleCard) {
		roleCard.addEventListener('click', async function () {
			//TODO: Separate function?
			console.log('player killed');

			const response = await werewolfKills(
				localStorage.getItem('lobbyCode'),
				localStorage.getItem('playerId'),
				roleCard.id
			);

			if (response.success && response.canContinue) {
				window.location.href = '03pw_morning_room_view.html';
			}
		});
	});
}
