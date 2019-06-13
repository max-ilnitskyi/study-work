const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const compression = require('compression');
const logger = require('morgan');
const session = require('express-session');

const config = require('./config');
const notesRouter = require('./routes/notes');

// relative path to static files
const clientBuildPath = config.clientBuildPath;

const app = express();

// define port
app.set('port', config.serverPort);

// logging
app.use(logger('dev'));

// compression
app.use(compression());

// Express only serves static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, clientBuildPath)));
}

// session
app.use(
  session({
    secret: config.secret,
    cookie: { maxAge: 60000 },
    resave: false
    // saveUninitialized: false
  })
);

// temp check session
app.get('/getsession', (req, res) => {
  res.json({
    id: req.session.id,
    cookie: req.session.id,
    secret: config.secret
  });
});

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

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
