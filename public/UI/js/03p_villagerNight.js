import { handleViewRoleClick } from "./viewRoleClickHandler.js";
import { roleCardHTML } from './roleCard.js';
import { roleModalHTML } from './roleModal.js';

//Initialize app when DOM content is loaded.
document.addEventListener('DOMContentLoaded', function () {
	initializeApp();
});

function initializeApp() {
	initializeEventListeners();

	//Load role card.
	let myRoleCard = document.getElementById('myRoleCard');
	myRoleCard.innerHTML = roleCardHTML;
	let myName = myRoleCard.querySelector('.player-name');
	myName.textContent = localStorage.getItem('userName');
	let myRole = myRoleCard.querySelector('.player-role')
	myRole.textContent = localStorage.getItem('role')

	//Load role modal.
	let roleModal = document.getElementById('roleModal');
	roleModal.innerHTML = roleModalHTML;

	let actionDescription = document.getElementById('actionDescription');
	actionDescription.innerHTML = '<p>Sleep</p>';
}

function initializeEventListeners() {
	//Click listener for sleep button.
	var sleepBtn = document.getElementById('sleepBtn');
	sleepBtn.addEventListener('click', handleSleepClick);

	//Click listener for view role button.
	var viewRoleBtn = document.getElementById('viewRoleBtn');
	viewRoleBtn.addEventListener('click', handleViewRoleClick);
}

function handleSleepClick() {
	window.location.href = '03pw_morning_room_view.html';
}
