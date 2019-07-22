const mongoose = require('mongoose')

const StatsV2Schema = new mongoose.Schema({
    epicName: String,
    uid: String,
    keyboardmouse: Object,
    gamepad: Object,
    touch: Object,
    dateAdded: {
        type: Date,
        default: Date.now,
    },
})

const StatsV2 = mongoose.model('UserStats', StatsV2Schema)

module.exports = StatsV2
