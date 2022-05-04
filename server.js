const express = require('express');
const path = require('path');
const fs = require('fs');
const PORT = process.env.PORT || 3001;
const app = express();
const uuid = require('./helpers/uuid');
let noteList = require('./db/db.json');

const { uptime } = require('process');

// use express to parse data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// enable access to public directory
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
})

app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/notes.html'));
})

//get request for all notes
app.get('/api/notes', (req, res) => {
  console.log(`${req.method} get request for all notes received`);
  res.json(noteList);
});

// post request to add notes
app.post('/api/notes', (req, res) => {
  console.log(`${req.method} post request received`);
  const{ title, text } = req.body; // destructure req.body to send back to client
  if (title && text) {
    const newNote = {
      title,
      text,
      id: uuid()
    };

    fs.readFile('./db/db.json', 'utf-8', (err, data) => { //obtain existing notes arrays
      if (err) {
        console.log(err);
      } else {
        const notesData = JSON.parse(data);
        notesData.push(newNote);
        noteList = parsedNotes;

        fs.writeFile('./db/db.json', JSON.stringify(noteList), (err, data) => {
          if (err) {
            console.log(err)
          }else {
            console.log('Notes updated succesfully')
          };
        });
      };
    });

    const response = {
      status: 'success',
      body: newNote
    };

    res.json(response);
  } else {
    res.json('Note posting failed')
  }
});

app.delete("/api/notes/:id", (req, res) => {
  console.log(`${req.method} recieved`);
  const noteId = req.params.id;
  const updatedArray = [];

  for (let i=0; i<noteList.length; i++) {
    if (noteList[i].id !== noteId) {
      updatedArray.push(noteList[i]);
    }
  }

  if(updatedArray.length === noteList.length) {
    res.status(404);
    return;
  }
  noteList = updatedArray;

  fs.writeFile('./db/db.json', JSON.stringify(noteList), (err, data) => {
    if (err) {
      console.err(403)
    } else {
      console.log('Notes updated succesfully')
    };
  });
  res.json(noteList);
});

// returns user to index if attempting to visit nonexisting routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});

app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`);
})