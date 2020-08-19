const express = require('express');
const router = express.Router();
const db = require('../config/database');
const User = require('../models/User');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const userCtrl = require('../controller/user.controller');
const authCtrl = require('../controller/auth.controller');
const jwt = require('jsonwebtoken');

/*const weatherCtrl = require('../controller/weather.controller');
const authCtrl = require('../controller/auth.controller');
const jwt = require('jsonwebtoken');*/

/** Users APIs
 * ******************************************************/

// Get the JWT Token
// router.get('/login', authCtrl.login);

router.get('/users', userCtrl.list);
router.post('/users', userCtrl.create);
router.get('/users/:userId', userCtrl.view);
router.put('/users/:userId', userCtrl.update);
router.delete('/users/:userId', userCtrl.delete);

router.post('/login', authCtrl.login);


module.exports = router;