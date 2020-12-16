const express = require('express');

const UserRouter = require('../auth/users/user-router');
const AuthRouter = require('../auth/auth-router');
const Restricted = require('../auth/restricted-middleware');



const router = express.Router();

router.use('/users', Restricted, UserRouter);
router.use('/auth', AuthRouter)

module.exports = router;