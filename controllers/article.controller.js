const articleService = require('../services/article.service.js');
const ArticleService = new articleService.ArticleService();

class ArticleController {
  async create (req, res) {
    try {
      const article = await ArticleService.create(req.body);
      res.status(201).json(article);
    } catch (e) {
      res.status(500).json(e.message);
    }
  }

  async getAll(req, res) {
    try {
      const articles = await ArticleService.getAll();
      console.log('articles', articles)
      return res.status(200).json(articles);
    } catch (e) {
      res.status(500).json(e.message);
    }
  }

  async getOne(req, res) {
    try {
      const article = await ArticleService.getOne(req.params.id);
      return res.status(200).json(article);
    } catch (e) {
      res.status(500).json(e.message);
    }
  }

  async update(req, res) {
    try {
      const updatedArticle = await ArticleService.update(req.body);
      return res.status(200).json(updatedArticle);
    } catch (e) {
      res.status(500).json(e.message);
    }
  }

  async delete(req, res) {
    try {
      const article = await ArticleService.delete(req.params.id);
      return res.status(200).json(article);
    } catch (e) {
      res.status(500).json(e.message);
    }
  }
}

module.exports = { ArticleController: ArticleController };
