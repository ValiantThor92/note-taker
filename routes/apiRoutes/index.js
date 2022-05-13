// require necessary dependencies 
const express = require('express');
const router = express.Router();

const store = require('../../db/store');

// returns all notes
router.get('/notes', (req, res) => {
  store.getNotes()
  .then((notes) => {
    return res.json(notes)
  })
  .catch((err) => res.status(500).json(err));
});

module.exports = router;