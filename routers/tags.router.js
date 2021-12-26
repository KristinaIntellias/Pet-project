const express = require('express');
const bodyParser = require('body-parser');

const tagController = require('../api/tag.controller.js');
const TagController = new tagController.TagController();

const router = express.Router();
router.use(bodyParser.json());

router.post('/', TagController.create);
router.get('/', TagController.getAll);
router.get('/:id', TagController.getOne);
router.put('/', TagController.update);
router.delete('/:id', TagController.delete);

module.exports = router;
