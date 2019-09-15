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
            Vehicle.create(req.body)
            .then((vehicle) => {
                History.create({"regno":vehicle[0]._id})
                .then((history) => {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json({success: true,history: history, status: 'Entered Successfully!'});
                }), (err) => next(err)
            }), (err) => next(err)
        }
        else {
            var rate_value = 1;
            /*if(document.getElementById('test').checked) {
                rate_value = document.getElementById('r1').value;
            }
            if(document.getElementById('test').checked) {
                rate_value = document.getElementById('r2').value;
            }*/
            if(rate_value == 1) {
                History.find({regno:vehicle[0]._id, entered:true, exited: false})
                .then((history) => {
                    if(history.length == 0)
                    {
                        History.create({"regno":vehicle[0]._id})
                        .then((history) => {
                            res.statusCode = 200;
                            res.setHeader('Content-Type', 'application/json');
                            res.json({success: true,history: history, vehicle: vehicle, status: 'Entered Successfully!'});
                        }, (err) => next(err))
                    }
                    else {
                        err = new Error('Vehicle already inside');
                        err.status = 404;
                        return next(err);
                    }
                }, (err)=>next(err))
            }
            else {
                History.find({regno:vehicle[0]._id, entered:true, exited: false})
                .then((history) => {
                    if(history.length == 0)
                    {
                        err = new Error('No vehicle with the number inside');
                        err.status = 404;
                        return next(err);
                    }
                    else {
                        History.findByIdAndUpdate(history[0]._id, {$set: {exited: true}})
                        .then((history) => {
                            res.statusCode = 200;
                            res.setHeader('Content-Type', 'application/json');
                            res.json(history);
                        }, (err) => next(err))
                    }
                })
            }
        }
    }, (err) => next(err))
    .catch((err) => next(err));
});

module.exports = router;