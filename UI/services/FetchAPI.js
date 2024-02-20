const address = 'localhost';

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
        })
        .catch((error) => {
            console.error('There was a problem creating the game:', error);
        });
}

export function startGame(gameCode) {
    return fetch(`http://${address}:4000/api/game/start/${gameCode}`, {
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
        })
        .catch((error) => {
            console.error('There was a problem starting the game:', error);
        });
}

export function joinGame(gameCode, playerData) {
    return fetch(`http://${address}:4000/api/game/join/${gameCode}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(playerData),
    })
    .then((response) => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then((data) => {
        console.log('Player joined game:', data);
    })
    .catch((error) => {
        console.error('There was a problem joining the game:', error);
    });
}

export function viewRole(gameCode, playerId) {
    return fetch(`http://${address}:4000/api/game/player/role/${gameCode}/${playerId}`)
    .then((response) => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then((data) => {
        console.log('Player role:', data.role);
    })
    .catch((error) => {
        console.error('There was a problem fetching player role:', error);
    });
}


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