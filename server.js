const express = require("express");
const helmet = require('helmet');
const session = require('express-session');

const ApiRouter = require('./api/routes/apiRoutes');

const server = express();

const sessionConfig = {
    name: 'secretfamrecipesess',
    secret: 'crack this, and I"ll crack you.',
    cookie: 
    {
     maxAge:    1000 * 30,
     secure: false,
     httpOnly: true
    },
    resave: false,
    saveUninitialize: false

}

server.use(helmet());
server.use(express.json());
server.use(session(sessionConfig));


server.use('/api', UserRouter);



server.get('/', (req, res) => {
    res.send('Hello World')
})




module.exports = server;
