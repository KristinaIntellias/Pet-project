const Article = require('../models/Article.js');

class ArticleService {
  async create (article) {
    return await Article.create(article);
  }

  async getAll() {
    return Article
      .find(        { $match: { date: { $gte: 1640532829147 } } })
      .select('_id author date title description content usersLikeId')
      .populate('author', '_id firstName LastName email')
      .sort({date: -1});
  }

  async getOne(id) {
    if (!id) {
      throw new Error('ID has not been specified');
    }
    return Article
      .findById(id)
      .select('_id author date title description content usersLikeId')
      .populate('author', '_id firstName LastName email');
  }

  async update(article) {
    if (!article._id) {
      throw new Error('ID has not been specified');
    }
    return Article
      .findByIdAndUpdate(article._id, article, {new: true})
      .select('_id author date title description content usersLikeId')
      .populate('author', '_id firstName LastName email');
  }

  async delete(id) {
    if (!id) {
      throw new Error('ID has not been specified');
    }
    return Article
      .findByIdAndDelete(id)
      .select('_id author date title description content usersLikeId')
      .populate('author', '_id firstName LastName email');
  }
}

module.exports = { ArticleService: ArticleService };
