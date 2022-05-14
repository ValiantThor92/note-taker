// require necessary dependencies
const express = require('express');
const path = require('path');
const router = express.Router();

// get notes file to send notes.html
router.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/notes.html'));
});

// index.html get route
router.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/index.html'));
});

module.exports = router;