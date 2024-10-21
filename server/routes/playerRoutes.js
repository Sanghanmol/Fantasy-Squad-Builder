// routes/playerRoutes.js
const express = require('express');
const { getAllPlayers, createPlayers } = require('../controllers/playerController');

const router = express.Router();

router.get('/all', getAllPlayers);
router.post('/create', createPlayers);

module.exports = router;
