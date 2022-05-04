const express = require('express');
const path = require('path');
const fs = require('fs');
const PORT = process.env.PORT || 3001;
const app = express();
const uuid = require('./helpers/uuid');
let noteList = require('./db/db.json');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

//get request for all notes
app.get('/api/notes', (req, res) => {
  console.log(`${req.method} get request for all notes received`);
  res.json(noteList);
});

app.post('/api/notes', (req, res) => {});

app.delete("/api/notes/:id", (req, res) => {});

app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`);
})