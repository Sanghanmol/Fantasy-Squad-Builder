// routes/teamRoutes.js
const express = require('express');
const { createTeam, getTeamById } = require('../controllers/teamController');
const protect = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/create', protect, createTeam);
router.get('/:id', protect, getTeamById);

module.exports = router;
