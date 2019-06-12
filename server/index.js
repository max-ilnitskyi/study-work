const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const compression = require('compression');

const config = require('./config');
const notesRouter = require('./routes/notes');

// relative path to static files
const clientBuildPath = config.clientBuildPath;

const app = express();

// define port
app.set('port', config.serverPort);

app.use(compression());

// Express only serves static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, clientBuildPath)));
}

app.use(bodyParser.json());

// logging / temp
app.use((req, res, next) => {
  console.log(`Request receved from ${req.url}, method: ${req.method}`);
  next();
});

// test is [history fallback]? work / temp
app.get('/hi', (req, res) => {
  res.send('hi!!!');
});
// test is static work / temp
app.get('/', (req, res) => {
  res.send('hi index route!!!');
});

// connect nores router
app.use('/api/notes', notesRouter);

// try parody webpack dev server, always send index.html (if not resolved before)
if (process.env.NODE_ENV === 'production') {
  app.get('*', (req, res, next) => {
    if (!req.accepts('html')) next();

    res.sendFile(path.join(__dirname, clientBuildPath, 'index.html'));
  });
}

// wrong request
app.use((req, res) => {
  res.sendStatus(400);
});

// TODO: make some normal logging
// global errors handler
app.use((error, req, res, next) => {
  console.log(`-----some error: `, error);
});

app.listen(app.get('port'), () => {
  console.log(`Server running on port ${app.get('port')}`);
});
