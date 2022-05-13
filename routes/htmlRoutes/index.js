// require necessary dependencies
const express = require('express');
const path = require('path');
const router = express.Router();

const store = require('../../db/store');

router.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/notes.html'));
});

router.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/index.html'));
});

module.exports = router;