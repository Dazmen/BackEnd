const express = require("express");
const helmet = require('helmet');

const session = require('express-session');
const cors = require('cors');

const ApiRouter = require('./api/routes/apiRoutes');

const server = express();
const knexSessionStore = require('connect-session-knex')(session);



const sessionConfig = {
    name: 'secretfamilyrecipesess',
    secret: 'asifIdtellyouthesecretsauce',
    cookie: {
      maxAge: 1000 * 60 * 60,
      secure: false, 
      httpOnly: true
    },
    resave: false,
    saveUninitialized: false,
  
    store: new knexSessionStore(
      {
        knex: require("./data/db-config"),
        tablename: "sessions",
        sidfieldname: "sid",
        createtable: true,
        clearInterval: 1000 * 60 * 60
      }
    )
  }
  

server.use(helmet());
server.use(express.json());

server.use(session(sessionConfig));
server.use(cors());





server.use('/api', ApiRouter);




server.get('/', (req, res) => {
    res.send('Hello World')
})




module.exports = server;
