/* jshint esversion: 6 */
const boards = require('../data/trello.json');

const { lists } = boards[0];

const trelloController = {
  getBoards: (req, res) => {
    res.set('Content-type', 'application/json');
    res.status(200).send(boards);
  },
  getABoard: (req, res) => {
    const board = boards.filter(n => n.id === req.params.id);

    if (board.length === 0) res.status(404).send('Not found!');
    else {
      res.set('Content-type', 'application/json');
      res.status(200).send(board);
    }
  },
  createBoard: (req, res) => {
    const board = req.body;
    boards.push(board);

    if (board.length === 0) res.status(404).send('Not found!');
    else {
      res.set('Content-type', 'application/json');
      res.status(201).send(board);
    }
  },
  updateBoard: (req, res) => {
    const board = req.body;
    const boardIndex = boards.findIndex(n => n.id === req.params.id);

    if (boardIndex === -1) res.status(404).send('ID not found!');
    else {
      boards[boardIndex] = board;
      res.set('Content-type', 'application/json');
      res.status(202).send(board);
    }
  },
  deleteBoard: (req, res) => {
    const board = req.body;
    const boardIndex = boards.findIndex(n => n.id === req.params.id);

    if (boardIndex === -1) res.status(404).send('id not found!');
    else {
      boards.splice((boardIndex), 1);
      res.set('Content-type', 'application/json');
      res.status(200).send(board);
    }
  },
  getLists: (req, res) => {
    res.set('Content-type', 'application/json');
    res.status(200).send(lists);
  },
  createList: (req, res) => {
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
  },
  createCard: (req, res) => {
    const board = boards.filter(n => n.id === req.params.id);
    const list = req.body;

    if (board.length === 0) res.status(404).send(' not found!');
    else {
      lists.push(list);
      res.set('Content-type', 'application/json');
      res.status(201).send(list);
    }
  },
};

module.exports = trelloController;
