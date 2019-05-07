const express = require('express');



const app = express();

app.use((req, res, next) => {
  console.log(`Request receved from ${req.url}`);

  next();
})

app.get('/', (req, res) => {
  res.send('hi!!!');
})

app.listen(3000, () => {
  console.log("Server runningon port 8080");
});
