const mongoose = require('mongoose')

const CalendarSchema = mongoose.Schema({
    title: {
        type: String
    },
    start: {
        type: Date
    },
    end: {
        type: Date
    },
    color: {
        type: String
    },
    all_day: {
        type: Boolean,
        default: true
    },
}, { timestamps: true })

module.exports = Calendar = mongoose.model('calendar', CalendarSchema)