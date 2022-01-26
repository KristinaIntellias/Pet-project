const express = require('express');
const router = express.Router();
const { check } = require('express-validator');

const articleController = require('../controllers/article.controller.js');
const ArticleController = new articleController.ArticleController();
const userController = require('../controllers/user.controller.js');
const UserController = new userController.UserController();
const tagController = require('../controllers/tag.controller.js');
const TagController = new tagController.TagController();
const checkAuth = require('../middleware/check-auth');

router.post('/posts', checkAuth, ArticleController.create);
router.get('/posts', ArticleController.getAll);
router.get('/posts/:id', ArticleController.getOne);
router.put('/posts', checkAuth, ArticleController.update);
router.delete('/posts/:id', checkAuth, ArticleController.delete);

router.post('/signup', [
  check('firstName', 'First name should not be empty').notEmpty(),
  check('lastName', 'Last name should not be empty').notEmpty(),
  check('email', 'Should be email format').isEmail(),
  check('password', 'Password should be at least 6 symbols').isLength({min: 6}),
], UserController.signup);
router.post('/login', UserController.login);
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
