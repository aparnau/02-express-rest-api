/* jshint esversion: 6 */
const workspace = require('../data/slack.json');

const slackController = {
  getWorkspace: (req, res) => {
    res.set('Content-type', 'application/json');
    res.status(200).send(workspace);
  },
  getAWorkspace: (req, res) => {
    const workspaces = workspace.filter(n => n.id === req.params.id);

    if (workspaces.length === 0) res.status(404).send('Not found!');
    else {
        res.set('Content-type', 'application/json');
        res.status(200).send(workspaces);
    }
  },
  createWorkspace: (req, res) => {
    const workspaces = req.body;

    if (workspaces.length === 0) res.status(404).send('Not found!');
    else {
      workspace.push(workspaces);
      res.set('Content-type', 'application/json');
      res.status(201).send(workspaces);
    }
  },
  updateWorkspace: (req, res) => {
    const workspaces = req.body;
    const workspaceIndex = workspace.findIndex(n => n.id === req.params.id);

    if (workspaceIndex === -1) res.status(404).send('ID not found!');
    else {
        workspace[workspaceIndex] = workspaces;
        res.set('Content-type', 'application/json');
        res.status(202).send(workspaces);
    }
  },
  deleteWorkspace: (req, res) => {
    const workspaces = req.body;
    const workspaceIndex = workspace.findIndex(n => n.id === req.params.id);

    if (workspaceIndex === -1) res.status(404).send('id not found!');
    else {
      workspace.splice((workspaceIndex), 1);
      res.set('Content-type', 'application/json');
      res.status(200).send(workspaces);
    }
  },
  addUserToWorkspace: (req, res) => {
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
  },
  createChannel: (req, res) => {
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
  },
  addUserToChannel: (req, res) => {
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
  },
  getUserChannel: (req, res) => {
    const workspaces = workspace.filter(n => n.id === req.params.id);
    const workspaceIndex = workspace.findIndex(n => n.id === req.params.id);
    const channelIndex = workspace[workspaceIndex].channel.findIndex(c => c.channelid === req.params.channelid);
    const channel = workspace[workspaceIndex].channel[channelIndex].members;

    if (workspaces.length === 0) res.status(404).send('Not found!');
    else {
      res.set('Content-type', 'application/json');
      res.status(200).send(channel);
    }
  },
};

module.exports = slackController;
