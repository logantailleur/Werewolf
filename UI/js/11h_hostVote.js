import { handleViewRoleClick } from './viewRoleClickHandler.js';
import { roleModalHTML } from './roleModal.js';
import { endVoting, getAllPlayers, viewResult } from '../services/FetchAPI.js';

const hostVotingInProgress = [
	'Now is the time for the villagers to deliberate and cast their votes.',
	"Listen carefully to each villager's arguments and consider your decisions wisely.",
	'Once everyone has had their say, cast your vote for who you believe is a werewolf.',
	'Remember, the fate of the village rests in your hands.',
];

const hostVotingResult = [
	'The votes have been tallied, and the decision has been made.',
	'With a majority vote, {VILLAGER_NAME} has been chosen to face judgment.',
	'Prepare yourselves as the village gathers to reveal the truth.',
];

const VOTING_IN_PROGRESS = 0;
const VOTING_DONE = 1;
var voting_status = VOTING_IN_PROGRESS;

//Initialize app when DOM content is loaded.
document.addEventListener('DOMContentLoaded', function () {
	initializeApp();
});

function initializeApp() {
	initializeEventListeners();

	//Load role modal
	let roleModal = document.getElementById('roleModal');
	roleModal.innerHTML = roleModalHTML;

	let scriptTitle = document.getElementById('scriptTitle');
	scriptTitle.textContent = 'Voting Script';

	const hostScript = document.getElementById('host-script');

	hostScript.innerHTML = '';

	var script = hostVotingInProgress;
	script.forEach((line) => {
		const p = document.createElement('p');
		p.textContent = line;
		hostScript.appendChild(p);
	});
}

async function updateHostScript() {
	const hostScript = document.getElementById('host-script');

	hostScript.innerHTML = '';

	var script = [];

	var villagerName = '[PLAYER_NAME]';

	var response = await endVoting(localStorage.getItem('lobbyCode'));

	if (response.canContinue) {
		villagerName = response.victim.name;
		script = hostVotingResult.map((line) =>
			line.replace('{VILLAGER_NAME}', villagerName)
		);
	} else {
		script = hostVotingInProgress;
	}

	script.forEach((line) => {
		const p = document.createElement('p');
		p.textContent = line;
		hostScript.appendChild(p);
	});
}

function initializeEventListeners() {
	//Click listener for view role button.
	var viewRoleBtn = document.getElementById('viewRoleBtn');
	viewRoleBtn.addEventListener('click', handleViewRoleClick);

	var nightFallBtn = document.getElementById('nightFallBtn');
	nightFallBtn.addEventListener('click', async function () {
		if (voting_status === VOTING_IN_PROGRESS) {
			voting_status = VOTING_DONE;
			updateHostScript();
			return;
		}
		const response = await viewResult(localStorage.getItem('lobbyCode'));
		const players = await getAllPlayers(localStorage.getItem('lobbyCode'));

		console.log(response);
		console.log(players);
		if (response.canContinue) {
			localStorage.setItem('players', JSON.stringify(players.players));
			localStorage.setItem('deadPlayer', JSON.stringify(response.player));
			window.location.href = "02h_player_grid_view.html";
		}
	});
}
