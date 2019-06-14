const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const compression = require('compression');
const logger = require('morgan');
const session = require('express-session');
const helmet = require('helmet');

const config = require('./config');
const notesRouter = require('./routes/notes');

// relative path to static files
const clientBuildPath = config.clientBuildPath;

const app = express();
app.disable('x-powered-by');

app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// app.use(helmet());
app.use(compression());

// app.use(function(req, res, next) {
//   res.removeHeader('X-Powered-By');
//   // res.set('X-Powered-By', '');
//   next();
// });

// Express only serves static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, clientBuildPath)));
}

// session
app.use(
  session({
    secret: config.secret,
    cookie: { maxAge: 60000 },
    resave: false,
    saveUninitialized: false
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

// Connect notes router
app.use('/api/notes', notesRouter);

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
});

app.listen(config.serverPort, () => {
  console.log(`Server running on port ${config.serverPort}`);
});
