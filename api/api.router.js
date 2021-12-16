const express = require('express');
const bodyParser = require('body-parser');

const postsData = require('./posts.mock.js');

const router = express.Router();
router.use(bodyParser.json());

router.get('/posts', (req, res) => {
  res.status(200).send(postsData);
});

module.exports = router;
