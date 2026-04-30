const express = require('express');
const router = express.Router();
const Task = require('../model/Task');
const auth = require('../middleware/auth');


router.get('/', auth, async (req, res) => {
    try {
        let tasks;
        if (req.user.role === 'admin') {
            tasks = await Task.find().populate('assignedTo', 'name email').sort({ createdAt: -1 });
        } else {
            tasks = await Task.find({ assignedTo: req.user.id }).sort({ createdAt: -1 });
        }
        res.json(tasks);
    } catch (err) { res.status(500).send('Server Error'); }
});


router.post('/', auth, async (req, res) => {
    if (req.user.role !== 'admin') return res.status(403).json({ msg: 'Unauthorized' });
    try {
        const newTask = new Task({ ...req.body, user: req.user.id });
        const task = await newTask.save();
        res.json(task);
    } catch (err) { res.status(500).send('Server Error'); }
});


router.patch('/:id', auth, async (req, res) => {
    try {
        const task = await Task.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
        res.json(task);
    } catch (err) { res.status(500).send('Server Error'); }
});

router.delete('/:id', auth, async (req, res) => {
    try {
        if (req.user.role !== 'admin') return res.status(403).json({ msg: "Permission Denied" });
        await Task.findByIdAndDelete(req.params.id);
        res.json({ msg: "Task Expunged Successfully" });
    } catch (err) { res.status(500).send("Server Error"); }
});

module.exports = router;