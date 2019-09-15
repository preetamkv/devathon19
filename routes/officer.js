var express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
var router = express.Router();
var Vehicle = require('../models/vehicles');
var History = require('../models/history');
var authenticate = require('../authenticate.js');

router.get('/', authenticate.verifyUser, authenticate.verifyadmin, (req, res, next) => {
    History.find({ exited : false })
    .populate('regno')
    .then((history) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(history);
    }, (err) => next(err))
    .catch((err) => next(err));
});

router.get('/alert', authenticate.verifyUser, authenticate.verifyadmin, (req, res, next) => {
    History.find({ exited : false })
    .populate('regno')
    .then((history) => {
        var blacklist = history.filter((history) => {
            return history.regno.type == "Guest" && Date.now() - history._id.getTimestamp() >= 86400000;
        })
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(blacklist);
    }, (err) => next(err))
    .catch((err) => next(err));
})

router.put('/register', authenticate.verifyUser, authenticate.verifyadmin, (req, res, next) => {
    Vehicle.find({regno :req.body.regno})
    .then((vehicle) => {
        Vehicle.findByIdAndUpdate(vehicle[0]._id, {$set: {"type":"Registered"}})
        .then((vehicle) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(vehicle);
        })
    }, (err) => next(err))
    .catch((err) => next(err));
});

module.exports = router;