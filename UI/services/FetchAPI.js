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
