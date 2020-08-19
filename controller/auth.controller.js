"use strict";

const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const db = require('../config/database');
const User = require('../models/User');
const jwt = require('jsonwebtoken');


exports.verifyToken = function(req, res, next) {
    const bearerHeader = req.headers['authorization'];

    if (typeof bearerHeader !== 'undefined') {
        let bearer = bearerHeader.split(' ');
        req.token = bearer[1];
        next();
    } else {
        res.json({error: 'Invalid Token'});
    }
};

/**
 * Generate JWT token by checking user apiKey and secretKey
 * @param req
 * @param res
 */
exports.login = async function(req, res) {
    //todo: check this from database, For now, assume user exists in DB. Now generate JWT token.
    let options = {
        where: {
            email: req.param('email'),
            password: req.param('password')
        }
    };

    try {
        let user = await User.findOne(options);
        if (!user) {
            return res.jsonp({
                error: true,
                status: 200,
                message: 'Invalid user details'
            });
        }

        let userData = {
            id: 1,
            name: user.username,
            email: user.email
        };

        // Return jwt token
        jwt.sign({user: userData}, 'secretkey', (err, token) => {
            return res.jsonp({
                user: user,
                token: token
            });
        });
    } catch (err) {
        return res.jsonp({
            error: true,
            status: 200,
            message: err.message
        });
    }
};

