const Article = require('../models/Article.js');

class ArticleService {
  async create (article) {
    const createdArticle = await Article.create(article);
    return createdArticle;
  }

  async getAll() {
    const articles = await Article
      .find()
      .sort({author: -1, favorite: -1});
    //   .aggregate([
    //   { $match: { author: "John Dow" }}
    // ])
    //   .sort({title: 1})
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
    const articleFromDB = await Article.findById(article._id);
    if (article.userId === articleFromDB.userId) {
      const updatedArticle = await Article.findByIdAndUpdate(article._id, article, {new: true});
      return updatedArticle;
    } else {
      throw new Error('Permission denied');
    }
  }

  async delete(article) {
    if (!article._id) {
      throw new Error('ID has not been specified');
    }
    const articleFromDB = await Article.findById(article._id);
    if (article.userId === articleFromDB.userId) {
      const updatedArticle = await Article.findByIdAndDelete(!article._id);
      return updatedArticle;
    } else {
      throw new Error('Permission denied');
    }
  }
}

module.exports = { ArticleService: ArticleService };
