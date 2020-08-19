"use strict";

const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const db = require('../config/database');
const User = require('../models/user');
/*const request = require('request');
const jwt = require('jsonwebtoken');*/


/**
 * Get the users
 * @param req
 * @param res
 */
exports.list = async function(req, res) {
    let options = {
        where: {
            /*addedOn: {
                [Op.gte]: searchDate
            }*/
        }
    };
    let result = await User.findAll(options);

    if (!result) {
        return res.json({error: true, message: 'No records'});
    }

    res.json(result);
};

exports.create = async function(req, res) {

    req.body.createdAt = new Date();
    req.body.updatedAt = new Date();

    // Prepare request data. Get data from req.body and prepare it.
    var params = {};
    for (let [key, value] of Object.entries(req.body)) {
        params[key] = value;
    }

    try {
        let user = await User.create(params);

        return res.jsonp({
            success: true,
            user: user
        });
    } catch (err) {
        return res.send('500', {
            errors: JSON.stringify(err),
            status: 500
        });
    }
};

exports.delete = async function (req, res) {
    let id = req.param('userId');

    User.destroy({
        where: {
            id: id
        }
    }).then(function (user) {
        return res.jsonp({
            success: true,
            message: "User is removed successfully"
        });
    });
};

exports.update = async function(req, res) {
    let options = {
        where: {
            id: req.param('userId')
        }
    };

    try {
        let user = await User.findOne(options);

        // Prepare request data. Get data from req.body and prepare it.
        let params = {};
        for (let [key, value] of Object.entries(req.body)) {
            //console.log(`${key}: ${value}`);
            params[key] = value;
        }

        await user.setAttributes(params);
        await user.save();

        return res.jsonp({
            success: true,
            message: "Record is updated successfully",
            user: user
        });
    } catch (err) {
        return res.jsonp({
            error: true,
            status: 200,
            message: err.message
        });
    }
};

exports.view = async function (req, res) {
    let options = {
        where: {
            id: req.param('userId')
        }
    };

    try {
        let user = await User.findOne(options);
        return res.jsonp(user);
    } catch (err) {
        return res.jsonp({
            error: true,
            status: 200,
            message: err
        });
    }
};