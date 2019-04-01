/* jshint esversion: 6 */
const express = require('express');

const boardsRouter = express.Router();
const trelloController = require('../controllers/trelloController');

const getBoard = '/boards';
const urlBoard = '/boards/:id';
const createBoard = '/boards/createBoard';
const getList = '/lists';
const createCard = '/boards/:id/lists/:id/cards';
const createList = '/boards/:id/lists';
// trello REST API

// boardsRouter.route('/login').post(passport.authenticate('local'), trelloController.login);

// GET /api/boards -> get all
boardsRouter.route(getBoard).get(trelloController.getBoards);

// get /api/boards/id -> retrieve
boardsRouter.route(urlBoard).get(trelloController.getABoard);

// post /api/boards/id/actions -> createBoard
boardsRouter.route(createBoard).post(trelloController.createBoard);

// put /boards/boards/:id -> updateBoard
boardsRouter.route(urlBoard)
  .put(trelloController.updateBoard)
  .delete(trelloController.deleteBoard);

// get all lists
boardsRouter.route(getList).get(trelloController.getLists);

// put /api/lists boards/id/lists?name=name -> create list in board at index
boardsRouter.route(createList).post(trelloController.createList);

// put /api/lists -> Create a card at an index in a list
boardsRouter.route(createCard).post(trelloController.createCard);

module.exports = boardsRouter;
