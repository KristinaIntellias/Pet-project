const tagService = require('./tag.service.js');
const TagService = new tagService.TagService();

class TagController {
  async create (req, res) {
    try {
      const tag = await TagService.create(req.body);
      res.json(tag);
    } catch (e) {
      res.status(500).json(e.message);
    }
  }

  async getAll(req, res) {
    try {
      const tags = await TagService.getAll();
      return res.json(tags);
    } catch (e) {
      res.status(500).json(e.message);
    }
  }

  async getOne(req, res) {
    try {
      const tag = await TagService.getOne(req.params.id);
      return res.json(tag);
    } catch (e) {
      res.status(500).json(e.message);
    }
  }

  async update(req, res) {
    try {
      const updatedTag = await TagService.update(req.body);
      return res.json(updatedTag);
    } catch (e) {
      res.status(500).json(e.message);
    }
  }

  async delete(req, res) {
    try {
      const tag = await TagService.delete(req.params.id);
      return res.json(tag);
    } catch (e) {
      res.status(500).json(e.message);
    }
  }
}

module.exports = { TagController: TagController };
