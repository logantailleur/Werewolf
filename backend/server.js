const express = require('express');
const cors = require('cors');
const server = express();

server.use(cors());

const port = 4000;
server.listen(port, () => console.log(`Server running on port ${port}`));

server.get('/api/test', (req, res) => {
	res.send(JSON.stringify('hello world'));
});
