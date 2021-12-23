const express = require('express');
const bodyParser = require('body-parser');

const articleController = require('../api/article.controller.js');
const ArticleController = new articleController.ArticleController();

const router = express.Router();
router.use(bodyParser.json());

router.post('/posts', ArticleController.create);
router.get('/posts', ArticleController.getAll);
router.get('/posts/:id', ArticleController.getOne);
router.put('/posts', ArticleController.update);
router.delete('/posts/:id', ArticleController.delete);

module.exports = router;
