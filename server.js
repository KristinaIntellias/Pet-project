const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotEnv = require('dotenv');

const apiRouter = require('./server/routes/api.router.js');

const result = dotEnv.config({ path: path.join(__dirname, '/server/.env') });
if (result.error) {
  throw result.error
}

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use('/api', apiRouter);

app.use(express.static(path.join(__dirname, '/dist/kristina-project')));

app.get('*', (req, res) => {
  res.sendFile(__dirname + '/dist/kristina-project/index.html');
});

app.get('*', (req, res, next) => {
    res.status(404).send('Not found');
});

app.use((err, req, res, next) => {
  res.status(500).send(`Error occurred: ${err.message}`);
});

async function startApp() {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    app.listen(port, () => console.log(`Listening at http://localhost:${port}`))
  } catch (error) {
    console.log(error);
  }
}

startApp();
