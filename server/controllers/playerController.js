// controllers/playerController.js
const Player = require('../models/Player');

// Get all players
exports.getAllPlayers = async (req, res) => {
  try {
    const players = await Player.find();
    res.json(players);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createPlayers = async (req, res) => {
  const players = req.body; // Expecting an array of player objects

  // Basic validation
  if (!Array.isArray(players) || players.length === 0) {
    return res.status(400).json({ message: 'An array of players is required.' });
  }

  // Validate each player object
  for (const player of players) {
    const { name, position, points } = player;
    if (!name || !position || points === undefined) {
      return res.status(400).json({ message: 'Name, position, and points are required for each player.' });
    }
  }

  try {
    // Use insertMany to save multiple players to the database
    const createdPlayers = await Player.insertMany(
      players.map(player => ({
        name: player.name,
        position: player.position,
        points: Number(player.points), // Ensure points are stored as a number
      }))
    );

    // Respond with the created players information
    res.status(201).json({
      message: 'Players created successfully.',
      players: createdPlayers,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error creating players', error: error.message });
  }
};