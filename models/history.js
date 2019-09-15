const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const historySchema = new Schema({
    regno: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vehicle'
    },
    entered: {
        type: Boolean,
        default: true
    },
    exited: {
        type: Boolean,
        default: false
    }
},{
    timestamps: true
});

var History = mongoose.model('History', historySchema);

module.exports = History;