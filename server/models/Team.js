// models/Team.js
const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
  teamName: { type: String, required: true },
  players: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Player' }],
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
},{
  timestamps: true,
});

module.exports = mongoose.model('Team', teamSchema);
