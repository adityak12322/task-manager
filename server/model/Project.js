const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  admin: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Project Owner
  team: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // Members assigned to this project
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Project', ProjectSchema);