const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../model/User');
const auth = require('../middleware/auth');


router.get('/users', auth, async (req, res) => {
    try {
        const users = await User.find().select('-password').sort({ name: 1 });
        res.json(users);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});


router.post('/register', async (req, res) => {
    const { name, email, password, role } = req.body;
    try {
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ msg: 'User already exists' });
        user = new User({ name, email, password, role: role || 'member' });
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        await user.save();
        const payload = { id: user.id, role: user.role };
        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '10h' }, (err, token) => {
            if (err) throw err;
            res.json({ token, name: user.name, role: user.role });
        });
    } catch (err) { res.status(500).send('Server error'); }
});

// Login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) return res.status(400).json({ msg: 'Invalid Credentials' });
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: 'Invalid Credentials' });
        const payload = { id: user.id, role: user.role };
        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '10h' }, (err, token) => {
            if (err) throw err;
            res.json({ token, name: user.name, role: user.role });
        });
    } catch (err) { res.status(500).send('Server error'); }
});

module.exports = router;