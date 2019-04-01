/* jshint esversion: 6 */
const express = require('express');

const workspaceRouter = express.Router();
const slackController = require('../controllers/slackController');

const getWorkspaces = '/workspace';
const urlWorkspace = '/workspace/:id';
const createChannel = '/workspace/:id/channel';
const addUserChannel = '/workspace/:id/channel/:channelid';
const getUserChannel = '/workspace/:id/channel/:channelid';

// slack REST API

workspaceRouter.route(getWorkspaces)
  .get(slackController.getWorkspace)
  .post(slackController.createWorkspace);

workspaceRouter.route(urlWorkspace)
  .get(slackController.getAWorkspace)
  .put(slackController.updateWorkspace)
  .delete(slackController.deleteWorkspace)
  .post(slackController.addUserToWorkspace);


workspaceRouter.route(createChannel).post(slackController.createChannel);

workspaceRouter.route(addUserChannel).post(slackController.addUserToChannel);

workspaceRouter.route(getUserChannel).get(slackController.getUserChannel);

module.exports = workspaceRouter;
