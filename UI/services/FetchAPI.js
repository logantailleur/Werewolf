const address = '54.203.49.42';
// const address = 'localhost';

export function fetchTest() {
    return fetch(`http://${address}:4000/api/test`)
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then((data) => {
            console.log(data);
            return data;
        })
        .catch((error) => {
            console.error('There was a problem with the fetch operation:', error);
        });
}

export function createGame() {
    return fetch(`http://${address}:4000/api/game/create`, {
        method: 'POST',
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then((data) => {
            console.log('Game created:', data);
            return data;
        })
        .catch((error) => {
            console.error('There was a problem creating the game:', error);
        });
}

export function startGame(lobbyCode) {
    return fetch(`http://${address}:4000/api/game/start/${lobbyCode}`, {
        method: 'POST',
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then((data) => {
            console.log('Game started:', data);
            return data;
        })
        .catch((error) => {
            console.error('There was a problem starting the game:', error);
        });
}

export function joinGame(lobbyCode, userName) {
    return fetch(`http://${address}:4000/api/game/join/${lobbyCode}/${userName}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then((response) => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then((data) => {
        console.log('Player joined game:', data);
        return data;
    })
    .catch((error) => {
        console.error('There was a problem joining the game:', error);
    });
}

export function viewRole(lobbyCode, playerId) {
    return fetch(`http://${address}:4000/api/game/player/role/${lobbyCode}/${playerId}`)
    .then((response) => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then((data) => {
        console.log('Player role:', data.role);
        return data;
    })
    .catch((error) => {
        console.error('There was a problem fetching player role:', error);
    });
}

export function players(lobbyCode) {
    return fetch(`http://${address}:4000/api/game/players/${lobbyCode}`)
    .then((response) => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then((data) => {
        console.log('Players:', data.players);
        return data;
    })
    .catch((error) => {
        console.error('There was a problem fetching players:', error);
    });
}

export function gameStarted(lobbyCode) {}

export function nightStarted(lobbyCode) {}

export function killPlayer(lobbyCode, playerId) {}

export function dayStarted(lobbyCode) {}

export function votePlayer(lobbyCode, playerId) {}

export function voteFinished(lobbyCode) {}

/*
    To use the fetch functions to make api requests follow this format 

    fetchTest()
        .then((data) => {
            console.log(data);
        })
        .catch((error) => {
            console.error('Error fetching data:', error);
        });

    make sure to import the exported function to the js file where you want to use it and include this
    in the corresponding html file

    <script src="services/FetchAPI.js" type="module"></script>
*/