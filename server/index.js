const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const config = require('../etc/config.json');
const db = require('./utils/dataBaseUtils');

const clientBuildPath = '../client/build/';

db.setUpConnection();

const app = express();

app.set('port', process.env.PORT || config.serverPort);

// Express only serves static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, clientBuildPath)));
}

app.use(bodyParser.json());

// temp logging
app.use((req, res, next) => {
  console.log(`Request receved from ${req.url}, method: ${req.method}`);
  next();
});

app.get('/hi', (req, res) => {
  res.send('hi!!!');
});
app.get('/', (req, res) => {
  res.send('hi index route!!!');
});

app.get('/notes', (req, res) => {
  db.listNotes().then(data => res.send(data), err => res.send(err));
});

// post notes types:
// title: { type: String },
// text: { type: String, required: true },
// color: { type: String },
// createdAt: { type: Date }
app.post('/notes', (req, res) => {
  db.createNotes(req.body).then(data => res.send(data));
});

app.delete('/notes/:id', (req, res) => {});

if (process.env.NODE_ENV === 'production') {
  app.get('/*', (req, res, next) => {
    res.sendFile(path.join(__dirname, clientBuildPath, 'index.html'));
  });
}

app.listen(app.get('port'), () => {
  console.log(`Server running on port ${app.get('port')}`);
});
