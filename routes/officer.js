var express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
var router = express.Router();
var Vehicle = require('../models/vehicles');
var History = require('../models/history');
var authenticate = require('../authenticate.js');

router.get('/', authenticate.verifyUser, authenticate.verifyadmin, (req, res, next) => {
    History.find({"exited":false})
    .populate('regno')
    .then((history) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(history);
    }, (err) => next(err))
    .catch((err) => next(err));
});

router.put('/register', authenticate.verifyUser, authenticate.verifyadmin, (req, res, next) => {
    Vehicle.find({"regno":req.body.regno})
    .then((vehicle) => {
        
    })
});

module.exports = router;