const express = require('express');
const apiMocker = require('connect-api-mocker');

const port = 9000;
const app = express();
 
app.use('/api', apiMocker('mock-api'));
app.use(express.static(__dirname)); //here is important thing - no static directory, because all static :)

console.log(`Mock API Server is up and running at: http://localhost:${port}`);
app.listen(port);