/* jshint esversion: 6 */
const express = require('express');

const notesRouter = express.Router();
const notesController = require('../controllers/notesController');

const getPutNotes = '/notes';
const urlNote = '/notes/:noteId';

notesRouter.route(getPutNotes)
  .get(notesController.getAllNotes)
  .post(notesController.createNote);

// get /api/notes/id -> find
notesRouter.route(urlNote)
  .get(notesController.getANote)
  .put(notesController.updateNote)
  .delete(notesController.deleteNote);

module.exports = notesRouter;
