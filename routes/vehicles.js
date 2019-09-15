var express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
var Vehicle = require('../models/vehicles');
var History = require('../models/history');
var router = express.Router();
var authenticate = require('../authenticate.js');

router.post('/enteredOrExited', authenticate.verifyUser, (req, res, next) => {
    Vehicle.find({regno : req.body.regno})
    .then((vehicle) => {
        if(vehicle.length == 0)
        {
            console.log("Entered 1");
            Vehicle.create(req.body)
            .then((vehicle) => {
                History.create({"regno":vehicle._id})
                .then((history) => {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json({success: true,history: history, status: 'Entered Successfully!'});
                }), (err) => next(err)
            }), (err) => next(err)
        }
        else {
            History.create({"regno":vehicle._id})
            .then((history) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json({success: true,history: history, vehicle: vehicle.length, status: 'Entered Successfully!'});
            }), (err) => next(err)
        }
    }), (err) => next(err)
    .catch((err) => next(err));
});

router.post('/register', (req, res, next) => {
    Vehicle.create(req.body)
    .then((vehicle) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json({vehicle: vehicle});
    }), (err) => next(err)
    .catch((err) => next(err))
});

module.exports = router;