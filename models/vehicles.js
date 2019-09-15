const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const vehicleSchema = new Schema({
    regno: {
        type: String,
        required: true,
        unique: true
    },
    type: {
        type: String,
        default: "Guest"
    }
},{
    timestamps: true
});

var Vehicles = mongoose.model('Vehicle', vehicleSchema);

module.exports = Vehicles;