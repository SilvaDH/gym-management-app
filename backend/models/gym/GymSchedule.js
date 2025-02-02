const mongoose = require('mongoose');

const GymScheduleSchema = new mongoose.Schema({
    day: { type: String, required: true },
    openTime: { type: String, required: true },
    closeTime: { type: String, required: true },
    activities: [{ type: String }]
}, { timestamps: true });

module.exports = mongoose.model('GymSchedule', GymScheduleSchema);
