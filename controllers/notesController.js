/* jshint esversion: 6 */
const notes = require('../data/notes.json');

const notesController = {
  getAllNotes: (req, res) => {
    res.set('Content-type', 'application/json');
    res.status(200).send(notes);
  },
  createNote: (req, res) => {
    const note = req.body;
    notes.push(note);

    if (note.length === 0) res.status(404).send('Not found!');
    else {
      res.set('Content-type', 'application/json');
      res.status(201).send(note);
    }
  },
  updateNote: (req, res) => {
    const note = req.body;
    const notesIndex = notes.findIndex(n => n.noteId === parseInt(req.params.noteId, 10));

    if (notesIndex === -1) res.status(404).send('NoteID not found!');
    else {
      notes[notesIndex] = note;
      res.set('Content-type', 'application/json');
      res.status(202).send(note);
    }
  },
  deleteNote: (req, res) => {
    const note = req.body;
    const notesIndex = notes.findIndex(n => n.noteId === parseInt(req.params.noteId, 10));

    if (notesIndex === -1) res.status(404).send('NoteId not found!');
    else {
      notes.splice((notesIndex), 1);
      res.set('Content-type', 'application/json');
      res.status(200).send(note);
    }
  },
  getANote: (req, res) => {
    const note = notes.filter(n => n.noteId === parseInt(req.params.noteId, 10));
    if (note.length === 0) res.status(404).send('Not found!');
    else {
      res.set('Content-type', 'application/json');
      res.status(200).send(note);
    }
  },
};

module.exports = notesController;
