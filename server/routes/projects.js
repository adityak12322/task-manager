const express = require('express');
const router = express.Router();
const Project = require('../model/Project');
const auth = require('../middleware/auth');

// Create Project & Assign Team (Admin Only)
router.post('/', auth, async (req, res) => {
    if (req.user.role !== 'admin') return res.status(403).json({ msg: 'Unauthorized' });
    try {
        const { name, description, team } = req.body; // team = array of user IDs
        const newProject = new Project({ name, description, team, admin: req.user.id });
        await newProject.save();
        res.json(newProject);
    } catch (err) { res.status(500).send('Server Error'); }
});

// Get Projects (Members only see projects they are part of)
router.get('/', auth, async (req, res) => {
    try {
        let projects;
        if (req.user.role === 'admin') {
            projects = await Project.find().populate('team', 'name email');
        } else {
            projects = await Project.find({ team: req.user.id }).populate('team', 'name email');
        }
        res.json(projects);
    } catch (err) { res.status(500).send('Server Error'); }
});

module.exports = router;