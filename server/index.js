const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const compression = require('compression');
const logger = require('morgan');
const helmet = require('helmet');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

const config = require('./config');
const routes = require('./routes');
const mongoConnection = require('./utils/mongoConnection');
const sendJsonExtending = require('./utils/sendJsonExtending');

// add res.jsonOk and res.jsonErr custom methods
sendJsonExtending(express);

// relative path to static files
const clientBuildPath = config.clientBuildPath;

const app = express();

mongoConnection.startConnection(config.mongodbUri);

// app.disable('x-powered-by');
app.use(helmet());
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(compression());

// Express only serves static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, clientBuildPath)));
}

// session
app.use(
  session({
    secret: config.secret,
    cookie: { maxAge: 60000 * 10 },
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection })
  })
);

// temp check session
app.get('/getsession', (req, res) => {
  if (req.session.count == undefined) {
    req.session.count = 1;
  } else {
    req.session.count += 1;
  }

  res.json({
    id: req.session.id,
    cookie: req.session.id,
    secret: config.secret,
    count: req.session.count
  });
});

// Connect notes router
app.use('/api', mongoConnection.checkConnection, routes);

// If get request, always send index.html (if not resolved before)
if (process.env.NODE_ENV === 'production') {
  const indexPath = path.join(__dirname, clientBuildPath, 'index.html');

  app.get('*', (req, res, next) => {
    if (!req.accepts('html')) next();

    res.sendFile(indexPath);
  });
}

// Not found
app.use((req, res) => {
  res.sendStatus(404);
});

// TODO: make some normal logging
// global errors handler
app.use((error, req, res, next) => {
  console.log(`-----express error: `, error);

  res.sendStatus(500);
});

app.listen(config.serverPort, () => {
  console.log(`Server running on port ${config.serverPort}`);
});
