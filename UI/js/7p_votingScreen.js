import { playerVote } from '../services/FetchAPI.js';
import { roleCardHTML } from './roleCard.js';
import { roleModalHTML } from './roleModal.js';

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

	//Load role modal
	let roleModal = document.getElementById('roleModal');
	roleModal.innerHTML = roleModalHTML;

	let actionDescription = document.getElementById('actionDescription');
	actionDescription.innerHTML = '<p>Vote for the suspects.</p>';
}

//Generate initial role cards.
async function generateRoleCards() {
	//Clear previous role cards.
	document.getElementById('otherRoleCards').innerHTML = '';

	//Generate and append role cards.

	let otherPlayers = JSON.parse(localStorage.getItem('players'));
	let nOtherPlayers = otherPlayers.length;

	for (let i = 0; i < nOtherPlayers; i++) {
		//TODO: Add status to database.
		if (otherPlayers[i].status == 'alive' && otherPlayers[i].name != localStorage.getItem('userName')) {
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

	// Add click event listener to each role card
	var roleCards = document.querySelectorAll('.role-card');
	roleCards.forEach(function (roleCard) {
		roleCard.addEventListener('click', async function () {
			//TODO: Separate function?
			console.log('player voted for');

			const response = await playerVote(
				localStorage.getItem('lobbyCode'),
				localStorage.getItem('playerId'),
				roleCard.id
			);

			if (response.success) {
				window.location.href = '7.5p_vote_room_view.html';
			}
		});
	});
}

function handleViewRoleClick() {
	//Set src attribute to desired image path inside modal.
	var modalRoleImage = document.querySelector(
		'#roleModal .role-assign-image img'
	);

	var role = localStorage.getItem('role');

	//Get reference to modal title and body elements.
	var viewRoleTitle = document.getElementById('viewRoleTitle');
	var viewRoleObjective = document.getElementById('viewRoleObjective');
	var viewRoleAbilities = document.getElementById('viewRoleAbilities');

	if (role == 'werewolf') {
		modalRoleImage.src = 'ImageAssets/wolficon.png';
		viewRoleTitle.textContent = 'Werewolf';
		viewRoleObjective.textContent =
			"Kill off the entire village and don't get caught";
		viewRoleAbilities.textContent = 'You can kill one other player each night';
	} else if (role == 'villager') {
		modalRoleImage.src = 'ImageAssets/villagericon.png';
		viewRoleTitle.textContent = 'Villager';
		viewRoleObjective.textContent = 'Find the identity of the werewolves';
		viewRoleAbilities.textContent =
			"You're a little weak, but there is strength in numbers";
	}
}
