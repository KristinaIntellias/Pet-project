const express = require('express');
const path = require('path');

const apiRouter = require('./api/api.router.js');

const app = express();
const port = process.env.port || 3000;

app.use('/api', apiRouter);
app.use(express.static(path.join(__dirname, '/dist/kristina-project')));

app.get('*', (req, res) => {
    res.status(404).send('Not found');
});

app.use((err, req, res, next) => {
  res.status(500).send(`Error occurred: ${err.message}`);
});

app.listen(port, (error) => {
  if (error) {
    return console.log(error);
  }
  console.log(`Listening at http://localhost:${port}`);
})
