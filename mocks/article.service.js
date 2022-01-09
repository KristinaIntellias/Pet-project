const Article = require('../models/Article.js');

class ArticleService {
  async create (article) {
    const createdArticle = await Article.create(article);
    return createdArticle;
  }

  async getAll() {
    const articles = await Article
      .aggregate([
        { $match: { date: { $gte: 1640532829147 } } }
    ])
      .sort({author: -1})
    return articles;
  }

  async getOne(id) {
    if (!id) {
      throw new Error('ID has not been specified');
    }
    const article = await Article.findById(id);
    return article;
  }

  async update(article) {
    if (!article._id) {
      throw new Error('ID has not been specified');
    }
    const updatedArticle = await Article.findByIdAndUpdate(article._id, article, {new: true});
    return updatedArticle;
  }

  async delete(id) {
    if (!id) {
      throw new Error('ID has not been specified');
    }
    const article = await Article.findByIdAndDelete(id);
    return article;
  }
}

module.exports = { ArticleService: ArticleService };
