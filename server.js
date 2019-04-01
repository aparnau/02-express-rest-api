/* jshint esversion: 6 */

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const logger = require('logger').createLogger();
const notesRouter = require('./routes/notes');
const boardsRouter = require('./routes/trello');
const workspaceRouter = require('./routes/slack');


const app = express();

const port = process.env.PORT || 3000;

app.use('/api', notesRouter);
app.use('/api', boardsRouter);
app.use('/api', workspaceRouter);

app.use(morgan('dev'));
app.use(bodyParser.json());

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.send('Hello expressjs1!');
});

app.get('/echo/:name', (req, res) => {
  res.send(`Hello ${req.params.name}`);
});

app.listen(port, () => {
  logger.info(`server listening on port ${port}`);
});
