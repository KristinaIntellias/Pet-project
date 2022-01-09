const likeService = require('./like.service.js');
const LikeService = new likeService.LikeService();

class LikeController {
  async create (req, res) {
    try {
      const like = await LikeService.create(req.body);
      res.json(like);
    } catch (e) {
      res.status(500).json(e.message);
    }
  }

  async getAll(req, res) {
    try {
      const likes = await LikeService.getAll();
      return res.json(likes);
    } catch (e) {
      res.status(500).json(e.message);
    }
  }

  async getOne(req, res) {
    try {
      const like = await LikeService.getOne(req.params.id);
      return res.json(like);
    } catch (e) {
      res.status(500).json(e.message);
    }
  }

  async update(req, res) {
    try {
      const updatedLike = await LikeService.update(req.body);
      return res.json(updatedLike);
    } catch (e) {
      res.status(500).json(e.message);
    }
  }

  async delete(req, res) {
    try {
      const like = await LikeService.delete(req.params.id);
      return res.json(like);
    } catch (e) {
      res.status(500).json(e.message);
    }
  }
}

module.exports = { LikeController: LikeController };
