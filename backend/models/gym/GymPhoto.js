const mongoose = require('mongoose');

const GymPhotoSchema = new mongoose.Schema({
    imageUrl: { type: String, required: true },
    caption: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('GymPhoto', GymPhotoSchema);
