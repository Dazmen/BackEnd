const express = require('express');

const UserRouter = require('../auth/users/user-router');


const router = express.Router();

router.use('/users', UserRouter);

module.exports = router;