const express = require('express');
const cors = require('cors');
const server = express();
const { generateRandom5DigitNumber } = require('./utils');

server.use(cors());

const port = 4000;
server.listen(port, () => console.log(`Server running on port ${port}`));

server.get('/api/test', (req, res) => {
    res.send(JSON.stringify('hello world'));
});

server.post('/api/game/create', (req, res) => {
    const gameCode = generateRandom5DigitNumber();
    res.json(gameCode);
});

server.post('/api/game/start/:gameCode', (req, res) => {
    const { gameCode } = req.params;
    const response = { success: true, gameCode: gameCode };
    res.json(response);
});

server.post('/api/game/join/:gameCode', (req, res) => {
    const { gameCode } = req.params;
    const playerId = generateRandom5DigitNumber();
    const response = { success: true, gameCode: gameCode, playerId: playerId};
    res.json(response);
});

server.get('/api/game/player/role/:gameCode/:playerId', (req, res) => {
    const { gameCode, playerId } = req.params;
    const response = { success: true, gameCode: gameCode, playerId: playerId, role: 'werewolf' };
    res.json(response);
});