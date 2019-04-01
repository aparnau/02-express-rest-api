/* jshint esversion: 6 */
const express = require('express');

const router = express.Router();
const notes = require('./data/notes.json');
const boards = require('./data/trello.json');
const workspace = require('./data/slack.json');

const { lists } = boards[0];
const getPutNotes = '/notes';
const urlNote = '/notes/:noteId';
const getBoard = '/boards';
const urlBoard = '/boards/:id';
const createBoard = '/boards/createBoard';
const getList = '/lists';
const createCard = '/boards/:id/lists/:id/cards';
const createList = '/boards/:id/lists';
const getWorkspaces = '/workspace';
const urlWorkspace = '/workspace/:id';
const createChannel = '/workspace/:id/channel';
const addUserChannel = '/workspace/:id/channel/:channelid';
const getUserChannel = '/workspace/:id/channel/:channelid';

router.get(getPutNotes, (req, res) => {
  res.set('Content-type', 'application/json');
  res.status(200).send(notes);
});

// get /api/notes/id -> find
router.get(urlNote, (req, res) => {
  const note = notes.filter(n => n.noteId === parseInt(req.params.noteId, 10));
  if (note.length === 0) res.status(404).send('Not found!');
  else {
    res.set('Content-type', 'application/json');
    res.status(200).send(note);
  }
});

// post /api/notes -> create
router.post(getPutNotes, (req, res) => {
  const note = req.body;
  notes.push(note);

  if (note.length === 0) res.status(404).send('Not found!');
  else {
    res.set('Content-type', 'application/json');
    res.status(201).send(note);
  }
});

// put /api/notes/:noteId -> update
router.put(urlNote, (req, res) => {
  const note = req.body;
  const notesIndex = notes.findIndex(n => n.noteId === parseInt(req.params.noteId, 10));

  if (notesIndex === -1) res.status(404).send('NoteID not found!');
  else {
    notes[notesIndex] = note;
    res.set('Content-type', 'application/json');
    res.status(202).send(note);
  }
});

// post /api/notes:noteId -> delete
router.delete(urlNote, (req, res) => {
  const note = req.body;
  const notesIndex = notes.findIndex(n => n.noteId === parseInt(req.params.noteId, 10));

  if (notesIndex === -1) res.status(404).send('NoteId not found!');
  else {
    notes.splice((notesIndex), 1);
    res.set('Content-type', 'application/json');
    res.status(200).send(note);
  }
});


// trello REST API
// GET /api/boards -> get all
router.get(getBoard, (req, res) => {
  res.set('Content-type', 'application/json');
  res.status(200).send(boards);
});

// get /api/boards/id -> retrieve
router.get(urlBoard, (req, res) => {
  const board = boards.filter(n => n.id === req.params.id);

  if (board.length === 0) res.status(404).send('Not found!');
  else {
    res.set('Content-type', 'application/json');
    res.status(200).send(board);
  }
});

// post /api/boards/id/actions -> createBoard
router.post(createBoard, (req, res) => {
  const board = req.body;
  boards.push(board);

  if (board.length === 0) res.status(404).send('Not found!');
  else {
    res.set('Content-type', 'application/json');
    res.status(201).send(board);
  }
});

// put /boards/boards/:id -> updateBoard
router.put(urlBoard, (req, res) => {
  const board = req.body;
  const boardIndex = boards.findIndex(n => n.id === req.params.id);

  if (boardIndex === -1) res.status(404).send('ID not found!');
  else {
    boards[boardIndex] = board;
    res.set('Content-type', 'application/json');
    res.status(202).send(board);
  }
});

// post /api/boards:id -> delete
router.delete(urlBoard, (req, res) => {
  const board = req.body;
  const boardIndex = boards.findIndex(n => n.id === req.params.id);

  if (boardIndex === -1) res.status(404).send('id not found!');
  else {
    boards.splice((boardIndex), 1);
    res.set('Content-type', 'application/json');
    res.status(200).send(board);
  }
});

// get all lists
router.get(getList, (req, res) => {
  res.set('Content-type', 'application/json');
  res.status(200).send(lists);
});

// put /api/lists boards/id/lists?name=name -> create list in board at index
router.post(createList, (req, res) => {
  const idBoard = req.params.id;
  const currentBoardIndex = boards.findIndex(board => board.id === idBoard);
  const currentBoard = boards[currentBoardIndex];
  const list = req.body;

  if (list.length === 0) res.status(404).send(' not found!');
  else {
    currentBoard.lists.push(list);
    res.set('Content-type', 'application/json');
    res.status(201).send(list);
  }
});

// put /api/lists -> Create a card at an index in a list
router.post(createCard, (req, res) => {
  const board = boards.filter(n => n.id === req.params.id);
  const list = req.body;

  if (board.length === 0) res.status(404).send(' not found!');
  else {
    lists.push(list);
    res.set('Content-type', 'application/json');
    res.status(201).send(list);
  }
});

// slack REST API
// GET /api/workspace -> get all
router.get(getWorkspaces, (req, res) => {
  res.set('Content-type', 'application/json');
  res.status(200).send(workspace);
});

// get /api/workspace/id -> retrieve
router.get(urlWorkspace, (req, res) => {
  const workspaces = workspace.filter(n => n.id === req.params.id);

  if (workspaces.length === 0) res.status(404).send('Not found!');
  else {
    res.set('Content-type', 'application/json');
    res.status(200).send(workspaces);
  }
});

// post /api/workspace -> create workspace
router.post(getWorkspaces, (req, res) => {
  const workspaces = req.body;

  if (workspaces.length === 0) res.status(404).send('Not found!');
  else {
    workspace.push(workspaces);
    res.set('Content-type', 'application/json');
    res.status(201).send(workspaces);
  }
});

// put /boards/workspace/:id -> updateBoard
router.put(urlWorkspace, (req, res) => {
  const workspaces = req.body;
  const workspaceIndex = workspace.findIndex(n => n.id === req.params.id);

  if (workspaceIndex === -1) res.status(404).send('ID not found!');
  else {
    workspace[workspaceIndex] = workspaces;
    res.set('Content-type', 'application/json');
    res.status(202).send(workspaces);
  }
});

// post /api/workspace:id -> delete
router.delete(urlWorkspace, (req, res) => {
  const workspaces = req.body;
  const workspaceIndex = workspace.findIndex(n => n.id === req.params.id);

  if (workspaceIndex === -1) res.status(404).send('id not found!');
  else {
    workspace.splice((workspaceIndex), 1);
    res.set('Content-type', 'application/json');
    res.status(200).send(workspaces);
  }
});

// post /api/workspace/:id -> add users to workspace
router.post(urlWorkspace, (req, res) => {
  const user = req.body;
  const workspaceIndex = workspace.findIndex(n => n.id === req.params.id);

  if (workspaceIndex === -1) res.status(404).send('Not found!');
  else {
    if (!(workspace[workspaceIndex].users !== undefined && workspace[workspaceIndex].users instanceof Array)) {
      workspace[workspaceIndex].users = [];
    }
    workspace[workspaceIndex].users.push(user);
    res.set('Content-type', 'application/json');
    res.status(201).send(user);
  }
});

// post /api/workspace/:id -> Create channel in workspace
router.post(createChannel, (req, res) => {
  const channelbody = req.body;
  const workspaceIndex = workspace.findIndex(n => n.id === req.params.id);

  if (workspaceIndex === -1) res.status(404).send('Not found!');
  else {
    if (!(workspace[workspaceIndex] !== undefined && workspace[workspaceIndex] instanceof Array)) {
      workspace[workspaceIndex].channel = [];
    }
    workspace[workspaceIndex].channel.push(channelbody);
    res.set('Content-type', 'application/json');
    res.status(201).send(channelbody);
  }
});

// post /api/workspace/:id -> Add users to channels in workspace
router.post(addUserChannel, (req, res) => {
  const members = req.body.name;
  const workspaceIndex = workspace.findIndex(n => n.id === req.params.id);
  const channelIndex = workspace[workspaceIndex].channel.findIndex(c => c.channelid === req.params.channelid);

  if (workspaceIndex === -1) res.status(404).send('Not found');
  else {
    if (!(workspace[workspaceIndex].channel[channelIndex].members !== undefined && workspace[workspaceIndex].channel[channelIndex].members instanceof Array)) {
      workspace[workspaceIndex].channel[channelIndex].members = [];
    }
    workspace[workspaceIndex].channel[channelIndex].members.push(members);
    res.set('Content-type', 'application/json');
    res.status(201).send(workspace[workspaceIndex].channel[channelIndex].members);
  }
});

// get /api/workspace/id/channel/:channelId -> List Users in a channel
router.get(getUserChannel, (req, res) => {
  const workspaces = workspace.filter(n => n.id === req.params.id);
  const workspaceIndex = workspace.findIndex(n => n.id === req.params.id);
  const channelIndex = workspace[workspaceIndex].channel.findIndex(c => c.channelid === req.params.channelid);
  const channel = workspace[workspaceIndex].channel[channelIndex].members;

  if (workspaces.length === 0) res.status(404).send('Not found!');
  else {
    res.set('Content-type', 'application/json');
    res.status(200).send(channel);
  }
});

module.exports = router;
