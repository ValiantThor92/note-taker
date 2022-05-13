const fs = require('fs');
const util = require('util');
const uuid = require('uuid');

// create read/write files for pathways
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

// class that stores notes
class Store {
  read() {
    return readFile('db/db.json', 'utf-8');
  };

  write(note) {
    return writeFile('db/db.json', JSON.stringify(note));
  };

  getNotes() {
    return this.read().then((notes) => {
      let parsedNotes;
      try {
        parsedNotes = [].concat(JSON.parse(notes));
      } catch (err) {
        parsedNotes = [];
      }
      return parsedNotes;
    });
  };

  addNote(note) {
    const { title, text } = note;
    
    // add unique id using uuid 
    const newNote = { title, text, id: uuid() };
    return this.getNotes()
    .then((notes) => [...notes, newNote])
    .then((updatedNotes) => this.write(updatedNotes))
    .then(() => newNote);
  };

  deleteNote(id) {
    // get all notes, remove note with corresponding id, rewrite remaining notes
    return this.getNotes()
    .then((notes) => notes.filter((note) => note.id !== id))
    .then((filteredNotes) => this.write(filteredNotes));
  };
};

module.exports = new Store();