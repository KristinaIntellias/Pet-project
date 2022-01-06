const express = require('express');
const bodyParser = require('body-parser');

const articleController = require('../api/article.controller.js');
const ArticleController = new articleController.ArticleController();
const likeController = require('../api/like.controller.js');
const LikeController = new likeController.LikeController();

const router = express.Router();
router.use(bodyParser.json());

router.post('/posts', ArticleController.create);
router.get('/posts', ArticleController.getAll);
router.get('/posts/:id', ArticleController.getOne);
router.put('/posts', ArticleController.update);
router.delete('/posts/:id', ArticleController.delete);

router.post('/likes', LikeController.create);
router.get('/likes', LikeController.getAll);
router.get('/likes/:id', LikeController.getOne);
router.put('/likes', LikeController.update);
router.delete('/likes/:id', LikeController.delete);

module.exports = router;
