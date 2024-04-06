import { handleViewRoleClick } from './viewRoleClickHandler.js';
import { roleModalHTML } from './roleModal.js';
import { checkWinner, hostWakes } from '../services/FetchAPI.js';

const hostWelcomeScript = [
	'Welcome to Werewolf!',
	'Today, we gather in the village to uncover the truth behind mysterious events.',
	'Each night, the werewolves prowl, seeking their next victim.',
	'During the day, the villagers must work together to identify the werewolves among them.',
	'Remember, trust no one, and may the odds be ever in your favor!',
];

const werewolfHostInstructions = [
	"Werewolves, it's time for your nightly hunt.",
	'Discuss with your fellow werewolves and choose your target wisely.',
	'Send your selection to the host via private message.',
	'Once all werewolves have made their choice, the night phase will end.',
];

const WELCOME_MESSAGE = 0;
const WEREWOLF_TURN = 1;
// Start out with a welcome message from the host
var turn = WELCOME_MESSAGE;

//Initialize app when DOM content is loaded.
document.addEventListener('DOMContentLoaded', function () {
	initializeApp();
});

function initializeApp() {
	initializeEventListeners();
	updateHostScript();

	//Load role modal
	let roleModal = document.getElementById('roleModal');
	roleModal.innerHTML = roleModalHTML;
}

function updateHostScript() {
	const hostScript = document.getElementById('host-script');
	// Clear previous script lines
	hostScript.innerHTML = '';
	// Append new script lines
	var script = [];

	let turnTitle = document.getElementById('scriptTitle');

	if (turn == WEREWOLF_TURN) {
		script = werewolfHostInstructions;
		turnTitle.textContent = 'Werewolf Turn Script';
	} else {
		script = hostWelcomeScript;
		turnTitle.textContent = 'Welcome Script';
	}

	// Replace script based on who's turn it is
	script.forEach((line) => {
		const p = document.createElement('p');
		p.textContent = line;
		hostScript.appendChild(p);
	});

	const nightBtn = document.getElementById('nightBtn');
	if (turn == WELCOME_MESSAGE) {
		nightBtn.textContent = 'Next: Werewolf';
	} else if (turn == WEREWOLF_TURN) {
		nightBtn.textContent = 'Next: Morning Results';
	}
}

function initializeEventListeners() {
	//Click listener for view role button.
	var viewRoleBtn = document.getElementById('viewRoleBtn');
	viewRoleBtn.addEventListener('click', handleViewRoleClick);

	var nightBtn = document.getElementById('nightBtn');
	nightBtn.addEventListener('click', async function () {
		// Update turn
		if (turn == WELCOME_MESSAGE && roleDone(WELCOME_MESSAGE)) {
			turn = WEREWOLF_TURN;
		} else if (turn == WEREWOLF_TURN && roleDone(WEREWOLF_TURN)) {
			// Redirect to morning view
			var lobbyCode = localStorage.getItem('lobbyCode');

			var winResponse = await checkWinner(lobbyCode);
			var wakeResponse = await hostWakes(lobbyCode);
			console.log(winResponse);
			console.log(wakeResponse);

			if (wakeResponse.canContinue) {
				if (winResponse.winner === 'villager') {
					window.location.href = '18_villager_win_view.html';
				} else if (winResponse.winner === 'werewolf') {
					window.location.href = '18_werewolf_win_view.html';
				} else {
					window.location.href = '11h_host_vote_view.html';
				}
			}
			return; // Exit function early
		}

		// Update host script and button text
		updateHostScript();
	});
}

function roleDone(role) {
	// TODO: Check to see if the role is finished completing their actions.
	var isDone = true;

	if (!isDone) {
		var nightBtn = document.getElementById('nightBtn');
		nightBtn.disabled = true;
	}
	return isDone;
}
