const mongoose = require('mongoose')

const StatsV2Schema = new mongoose.Schema({
    success: Boolean,
    epicName: String,
    keyboardmouse: Number,
    gamepad: String,
    touch: String,
    dateAdded: {
        type: Date,
        default: Date.now,
    },
})

const StatsV2 = mongoose.model('UserStats', StatsV2Schema)

module.exports = StatsV2
