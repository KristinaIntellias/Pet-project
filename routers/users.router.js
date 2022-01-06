const express = require('express');
const bodyParser = require('body-parser');

const userController = require('../api/user.controller.js');
const UserController = new userController.UserController();

const router = express.Router();
router.use(bodyParser.json());

router.post('/', UserController.create);
router.get('/', UserController.getAll);
router.get('/:id', UserController.getOne);
router.put('/', UserController.update);
router.delete('/:id', UserController.delete);

module.exports = router;
