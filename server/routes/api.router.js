const express = require('express');

const articleController = require('../controllers/article.controller.js');
const ArticleController = new articleController.ArticleController();
const userController = require('../controllers/user.controller.js');
const UserController = new userController.UserController();
const tagController = require('../controllers/tag.controller.js');
const TagController = new tagController.TagController();

const router = express.Router();

router.post('/posts', ArticleController.create);
router.get('/posts', ArticleController.getAll);
router.get('/posts/:id', ArticleController.getOne);
router.put('/posts', ArticleController.update);
router.delete('/posts/:id', ArticleController.delete);

router.post('/users', UserController.create);
router.get('/users', UserController.getAll);
router.get('/users/:id', UserController.getOne);
router.put('/users', UserController.update);
router.delete('/users/:id', UserController.delete);

router.post('/tags', TagController.create);
router.get('/tags', TagController.getAll);
router.get('/tags/:id', TagController.getOne);
router.put('/tags', TagController.update);
router.delete('/tags/:id', TagController.delete);

module.exports = router;
