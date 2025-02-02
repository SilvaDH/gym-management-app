const express = require('express');
const GymPhoto = require('../../models/gym/GymPhoto');
const GymSchedule = require('../../models/gym/GymSchedule');
const Member = require('../../models/gym/Member');
const { authMiddleware, adminMiddleware } = require('../../middleware/authMiddleware');

const router = express.Router();

// Fetch gym photos
router.get('/photos', async (req, res) => {
    try {
        const photos = await GymPhoto.find();
        res.json(photos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Fetch gym schedules
router.get('/schedules', async (req, res) => {
    try {
        const schedules = await GymSchedule.find();
        res.json(schedules);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Fetch members (Admin only)
router.get('/members', authMiddleware, adminMiddleware, async (req, res) => {
    try {
        const members = await Member.find();
        res.json(members);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
