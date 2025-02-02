const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validateUser } = require('./userValidation');
const User = require('../../models/user/User');
const { authMiddleware, adminMiddleware } = require('../../middleware/authMiddleware');

const router = express.Router();

// Register User
router.post('/register', validateUser, async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: 'User already exists' });

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully!' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// User Login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) return res.status(400).json({ message: 'User not found' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Incorrect password' });

        // Ensure JWT_SECRET is used properly
        if (!process.env.JWT_SECRET) {
            return res.status(500).json({ message: 'JWT Secret is missing' });
        }

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// Get user details (Protected)
router.get('/me', authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// router.get('/dashboard', authMiddleware, async (req, res) => {
//     try {
//         const user = await User.findById(req.user.id).select('-password');
//         if (!user) return res.status(404).json({ message: 'User not found' });

//         if (user.role !== 'admin') {
//             return res.status(403).json({ message: 'Access denied. Admins only.' });
//         }

//         const users = await User.find().select('-password');
//         res.json({ admin: user, users });
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// });

router.get('/dashboard', authMiddleware, adminMiddleware, async (req, res) => {
    try {
        const admin = await User.findById(req.user.id).select('-password');
        const users = await User.find().select('-password');
        res.json({ admin, users });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


module.exports = router;
