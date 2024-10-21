// controllers/teamController.js
const Team = require('../models/Team');
const Player = require('../models/Player');

// Create a new team
exports.createTeam = async (req, res) => {
  try {
    const { teamName, players } = req.body;

    if (!teamName || players.length > 11) {
      return res.status(400).json({ message: 'Team name required and only up to 11 players allowed' });
    }

    const team = new Team({
      teamName,
      players,
      user: req.user.id,  // Assume user is attached to req by authentication middleware
    });

    await team.save();
    res.status(201).json(team);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a specific team by ID
exports.getTeamById = async (req, res) => {
  try {
    const team = await Team.findById(req.params.id).populate('players');
    if (!team) {
      return res.status(404).json({ message: 'Team not found' });
    }
    res.json(team);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
