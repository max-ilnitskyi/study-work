const express = require('express');
const bodyParser = require('body-parser');

const config = require('../etc/config.json');

const db = require('./utils/dataBaseUtils');
// db.createNotes({
//   title: 'Hello',
//   text: 'Worlddddd',
//   color: 'red'
// }).then(
//   data => {
//     console.log(`data: ${data}`);
//   },
//   err => {
//     console.log(`err: ${err}`);
//   }
// );
const app = express();
db.setUpConnection();

app.use(bodyParser.json());
app.use((req, res, next) => {
  console.log(`Request receved from ${req.url}, method: ${req.method}`);

  next();
});

app.get('/', (req, res) => {
  res.send('hi!!!');
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

app.listen(config.serverPort, () => {
  console.log(`Server running on port ${config.serverPort}`);
});
