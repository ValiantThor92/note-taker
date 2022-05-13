const util = require('util');
const fs = require('fs');
const {v1} = require('uuid');

// create read/write files for pathways
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

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

  if (!title || !text) {
    throw new Error("Note 'title' and 'text' must be filled in!");
  }
  // add unique id using uuid 
  const newNote = { title, text, id: v1() };
  return this.getNotes()
  .then((notes) => [...notes, newNote])
  .then((updatedNotes) => this.write(updatedNotes))
  .then(() => newNote);
  };

};

module.exports = new Store();