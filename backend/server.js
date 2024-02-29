const express = require('express');
const cors = require('cors');
const server = express();
const {
	createGame,
	beginGame,
	joinRunningGame,
	viewRole,
} = require('./services/service');

server.use(cors());

const validateStartGameRequest = (gameCode) => {
	if (!gameCode) {
		return false;
	}
	return true;
};

const validateJoinGameRequest = (gameCode) => {
	if (!gameCode) {
		return false;
	}
	return true;
};

const validatePlayerRoleRequest = (gameCode, playerId) => {
	if (!gameCode || !playerId) {
		return false;
	}
	return true;
};

const port = 4000;
server.listen(port, () => console.log(`Server running on port ${port}`));

server.get('/api/test', (req, res) => {
	res.send(JSON.stringify('hello world'));
});

server.post('/api/game/create', async (req, res) => {
	const gameCode = await createGame();
	res.json(gameCode);
});

server.post('/api/game/start/:gameCode', async (req, res) => {
	const { gameCode } = req.params;
	if (!validateStartGameRequest(gameCode)) {
		return res.status(400).send('Missing gameCode for starting a game\n');
	}
	const response = await beginGame(gameCode);
	res.json(response);
});

server.post('/api/game/join/:gameCode/:playerName', async (req, res) => {
	const { gameCode, playerName } = req.params;
	if (!validateJoinGameRequest(gameCode)) {
		return res.status(400).send('Missing gameCode for joining a game\n');
	}
	const response = await joinRunningGame(gameCode, playerName);
	res.json(response);
});

server.get('/api/game/player/role/:gameCode/:playerId', async (req, res) => {
	const { gameCode, playerId } = req.params;
	if (!validatePlayerRoleRequest(gameCode, playerId)) {
		return res
			.status(400)
			.send('Missing gameCode and/or playerId for viewing a role\n');
	}
	const response = await viewRole(gameCode, playerId);
	res.json(response);
});
