const express = require("express");
const helmet = require('helmet');

const session = require('express-session');
const cors = require('cors');

const ApiRouter = require('./api/routes/apiRoutes');

const server = express();


server.use(helmet());
server.use(express.json());

server.use(session(sessionConfig));
server.use(cors());


server.use('/api', ApiRouter);




server.get('/', (req, res) => {
    res.send('Hello World')
})




module.exports = server;
