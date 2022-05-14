const fs = require('fs');
const util = require('util');
const uuid = require('uuid');

// create read/write files for pathways
const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

// class that stores notes
class Store {
  read() {
    return readFileAsync("db/db.json", "utf8");
  }

  write(note) {
    return writeFileAsync("db/db.json", JSON.stringify(note));
  }

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
  }

  addNote(note) {
    // check for title and txt content
    if (!note.title || !note.text) {
      throw new Error("Empty data");
    }
    // unique id
    note.id = uuid.v4();
    return this.getNotes()
    .then((notes) => {
      return [...notes, note];
    })
    .then((updatedNotes) => {
      return this.write(updatedNotes);
    })
    .then(() => {
      return note;
    });
  }

  deleteNote(id) {
    // get all notes, remove note with corresponding id, rewrite remaining notes
    return this.getNotes()
    .then((notes) => {
      return notes.filter((note) => note.id !== id);
    })
    .then((updatedNotes) => {
      this.write(updatedNotes);
    });
  }
}

module.exports = new Store();