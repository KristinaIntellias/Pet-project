const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');

const apiRouter = require('./routes/api.router.js');

const app = express();
const port = process.env.port || 3000;
const db_url = `mongodb+srv://kristina:kristina@cluster0.ksxdi.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

app.use(cors());
app.use(bodyParser.json());
app.use('/api', apiRouter);

app.use(express.static(path.join(__dirname, '/dist/kristina-project')));

app.use((req, res) => {
  res.sendFile(__dirname + '/dist/kristina-project');
});

app.get('*', (req, res, next) => {
    res.status(404).send('Not found');
});

app.use((err, req, res, next) => {
  res.status(500).send(`Error occurred: ${err.message}`);
});

async function startApp() {
  try {
    await mongoose.connect(db_url);
    app.listen(port, () => console.log(`Listening at http://localhost:${port}`))
  } catch (error) {
    console.log(error);
  }
}

startApp();
