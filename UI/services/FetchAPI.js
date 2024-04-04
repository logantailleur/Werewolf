const address = '44.202.29.77';
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
	return fetch(
		`http://${address}:4000/api/game/join/${lobbyCode}/${userName}`,
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
		}
	)
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
	return fetch(
		`http://${address}:4000/api/game/player/role/${lobbyCode}/${playerId}`
	)
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

export function getAllPlayers(lobbyCode) {
	return fetch(`http://${address}:4000/api/game/host/players/${lobbyCode}`)
		.then((response) => {
			if (!response.ok) {
				throw new Error('Network response was not ok');
			}
			return response.json();
		})
		.then((data) => {
			return data;
		})
		.catch((error) => {
			console.error(error);
		});
}

//TODO: build this in:
export function hostSleeps(lobbyCode) {
	return fetch(`http://${address}:4000/api/game/host/sleep/${lobbyCode}`, {
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
			return data;
		})
		.catch((error) => {
			console.error(error);
		});
}

export function playerSleeps(lobbyCode, playerId) {
	return fetch(
		`http://${address}:4000/api/game/player/sleep/${lobbyCode}/${playerId}`,
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
		}
	)
		.then((response) => {
			if (!response.ok) {
				throw new Error('Network response was not ok');
			}
			return response.json();
		})
		.then((data) => {
			return data;
		})
		.catch((error) => {
			console.error(error);
		});
}

export function werewolfKills(lobbyCode, playerId, victimId) {
	return fetch(
		`http://${address}:4000/api/game/player/kill/${lobbyCode}/${playerId}/${victimId}`,
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
		}
	)
		.then((response) => {
			if (!response.ok) {
				throw new Error('Network response was not ok');
			}
			return response.json();
		})
		.then((data) => {
			return data;
		})
		.catch((error) => {
			console.error(error);
		});
}

//TODO: build this in:
export function hostWakes(lobbyCode) {
	return fetch(`http://${address}:4000/api/game/host/wake/${lobbyCode}`, {
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
			return data;
		})
		.catch((error) => {
			console.error(error);
		});
}

export function playerWakes(lobbyCode, playerId) {
	return fetch(
		`http://${address}:4000/api/game/player/wake/${lobbyCode}/${playerId}`,
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
		}
	)
		.then((response) => {
			if (!response.ok) {
				throw new Error('Network response was not ok');
			}
			return response.json();
		})
		.then((data) => {
			return data;
		})
		.catch((error) => {
			console.error(error);
		});
}

//TODO: build this in:
export function playerReadyToVote(lobbyCode, playerId) {
	return fetch(
		`http://${address}:4000/api/game/player/begin-voting/${lobbyCode}/${playerId}`,
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
		}
	)
		.then((response) => {
			if (!response.ok) {
				throw new Error('Network response was not ok');
			}
			return response.json();
		})
		.then((data) => {
			return data;
		})
		.catch((error) => {
			console.error(error);
		});
}

export function playerVote(lobbyCode, playerId, voteId) {
	return fetch(
		`http://${address}:4000/api/game/player/vote/${lobbyCode}/${playerId}/${voteId}`,
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
		}
	)
		.then((response) => {
			if (!response.ok) {
				throw new Error('Network response was not ok');
			}
			return response.json();
		})
		.then((data) => {
			return data;
		})
		.catch((error) => {
			console.error(error);
		});
}

export function endVoting(lobbyCode) {
	return fetch(`http://${address}:4000/api/game/host/end-vote/${lobbyCode}`, {
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
			return data;
		})
		.catch((error) => {
			console.error(error);
		});
}

export function viewResult(lobbyCode) {
	return fetch(
		`http://${address}:4000/api/game/host/vote/result/${lobbyCode}`
	)
		.then((response) => {
			if (!response.ok) {
				throw new Error('Network response was not ok');
			}
			return response.json();
		})
		.then((data) => {
			return data;
		})
		.catch((error) => {
			console.error(error);
		});
}

export function viewResultPlayer(lobbyCode, playerId) {
	return fetch(
		`http://${address}:4000/api/game/player/vote/result/${lobbyCode}/${playerId}`
	)
		.then((response) => {
			if (!response.ok) {
				throw new Error('Network response was not ok');
			}
			return response.json();
		})
		.then((data) => {
			return data;
		})
		.catch((error) => {
			console.error(error);
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
