"use strict";

const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const db = require('../config/database');
const Weather = require('../models/Weather');
const request = require('request');
const jwt = require('jsonwebtoken');

/**
 * Create the Weather logs.
 * @param req
 * @param res
 */
exports.create = function(req, res) {
    // hit weather url and get data. and save it into db
    request('http://demo7846896.mockable.io/weather', { json: true }, async (err, response, data) => {
        if (err) { return console.log(err); }

        // Save in the db
        let params = {
            tempMin: data.tempMin,
            tempMax: data.tempMax,
            temp: data.temp,
            addedOn: new Date(),
            status: 1
        };

        try {
            const weather = await Weather.create(params);
            res.json(weather);
        } catch (err) {
            res.json({
                error: 'Error',
                message: err.message
            })
        }
    });
};


/**
 * Get the weather logs
 * @param req
 * @param res
 *
 * url: localhost:5000/weathers
 * Headers: Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJuYW1lIjoiWW9nZXNoIiwiZW1haWwiOiJtYWhhbGUueW9nZXNoNEBnbWFpbC5jb20ifSwiaWF0IjoxNTg4Njg3OTcxfQ.qygA82X7IpP0g9TpiM6N23DHHy0V8LEGH5XCww5gKLE
 * @returns {Promise<*>}
 */
exports.list = async function(req, res) {
    // Check does token is valid or not.
    jwt.verify(req.token, 'secretkey', async (err, authData) => {

        // User is verified
        if (err) {
            return res.json({error: true, message: 'Invalid user'});
        } else {
            let searchDate = req.param('searchDate');

            //Todo: Move logic in services and do pagination here..
            //Add filter here
            let options = {
                where: {
                    /*addedOn: {
                        [Op.gte]: searchDate
                    }*/
                }
            };
            let result = await Weather.findAll(options);

            if (!result) {
                return res.json({error: true, message: 'No records'});
            }

            res.json(result);
        }
    });
};