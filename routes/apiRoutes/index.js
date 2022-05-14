// require necessary dependencies 
const express = require('express');
const router = express.Router();

// stored class
const store = require('../../db/store');

// returns all notes
router.get('/notes',  (req, res) => {
  store
    .getNotes()
    .then((notes) => {
      return res.json(notes)
    })
    .catch((err) => {
      res.status(500).json(err)
    });
});

// creates note and posts to notes.html
router.post('/notes', (req, res) => {
  store
    .addNote(req.body)
    .then((note) => {
      return res.json(note)
    })
    .catch((err) => {
      return res.status(500).json(err);
    });
});

// deletes note from stored
router.delete('/notes/:id', (req, res) => {
  // finds note by id and deletes that id
  store
    .deleteNote(req.params.id)
    .then(() => {
      return res.status(200).json({ message: "successfully deleted" });
    })
    .catch((err) => {
      return res.status(500).json(err);
    });
});

module.exports = router;