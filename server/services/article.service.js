const Article = require('../models/Article.js');

class ArticleService {
  async create (article) {
    const newArticle = await Article.create(article);
    await Article.collection.createIndex({tags: 1});
    return newArticle;
  }

  async getAll(query) {
    if (Object.keys(query).length !== 0) {
      return Article
        .find(        { tags: { $in: [query.tags] } })
        .select('_id author date title description content usersLikeId tags')
        .populate('author', '_id firstName LastName email')
        .sort({date: -1});
    } else {
      return Article
        .find(        {})
        .select('_id author date title description content usersLikeId tags')
        .populate('author', '_id firstName LastName email')
        .sort({date: -1});
    }
  }

  async getOne(id) {
    if (!id) {
      throw new Error('ID has not been specified');
    }
    return Article
      .findById(id)
      .select('_id author date title description content usersLikeId tags')
      .populate('author', '_id firstName LastName email');
  }

  async update(article) {
    if (!article._id) {
      throw new Error('ID has not been specified');
    }
    return Article
      .findByIdAndUpdate(article._id, article, {new: true})
      .select('_id author date title description content usersLikeId tags')
      .populate('author', '_id firstName LastName email');
  }

  async delete(id) {
    if (!id) {
      throw new Error('ID has not been specified');
    }
    return Article
      .findByIdAndDelete(id)
      .select('_id author date title description content usersLikeId tags')
      .populate('author', '_id firstName LastName email');
  }
}

module.exports = { ArticleService: ArticleService };
