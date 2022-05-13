// import necessary dependencies
const express = require('express');
const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');

// create port and initialize express
const PORT = process.env.PORT || 3001;
const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/api', apiRoutes);
app.use('/', htmlRoutes);

// invalid request 404 response and end app
app.use((req, res) => {
  res.status(404).end();
});

// start server and listen on desired port
app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`);
});

// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, './public/index.html'));
// });

// app.get('/notes', (req, res) => {
//   res.sendFile(path.join(__dirname, './public/notes.html'));
// });

// //get request for all notes
// app.get('/api/notes', (req, res) => {
//   //console log that get request was recieved
//   console.info(`${req.method} get request for all notes received`);
//   //send note list to client
//   res.json(noteList);
// });

// // post request to add notes
// app.post('/api/notes', (req, res) => {
//   console.info(`${req.method} post request received`);
//   const { title, text } = req.body; // destructure req.body to send back to client
//   if (title && text) { //if both title and text fields are filled, create new note
//     const newNote = {
//       title,
//       text,
//       id: uuid()
//     };

//     fs.readFile('./db/db.json', 'utf-8', (err, data) => { //obtain existing notes
//       if (err) {
//         console.err(err);
//       } else {
//         const parsedNotes = JSON.parse(data);
//         parsedNotes.push(newNote);
//         noteList = parsedNotes;

//         fs.writeFile('./db/db.json', JSON.stringify(noteList), (err, data) => {
//           if (err) {
//             console.err(err)
//           }else {
//             console.log('Notes updated succesfully')
//           };
//         });
//       };
//     });

//     const response = {
//       status: 'success',
//       body: newNote
//     };

//     res.json(response);
//   } else {
//     res.json('Note posting failed')
//   }
// });

// app.delete("/api/notes/:id", (req, res) => {// delete note route
//   console.log(`${req.method} recieved`);
//   const noteId = req.params.id;
//   const updatedArray = [];

//   for (let i=0; i<noteList.length; i++) {
//     if (noteList[i].id !== noteId) {
//       updatedArray.push(noteList[i]);
//     }
//   }

//   if(updatedArray.length === noteList.length) {
//     res.status(404);
//     return;
//   }
//   noteList = updatedArray;

//   fs.writeFile('./db/db.json', JSON.stringify(noteList), (err, data) => {
//     if (err) {
//       console.err(403)
//     } else {
//       console.log('Notes updated succesfully')
//     };
//   });
//   res.json(noteList);
// });

// // returns user to index if attempting to visit nonexisting routes
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, './public/index.html'));
// });
