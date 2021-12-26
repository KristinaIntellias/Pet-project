const mongoose = require('mongoose');
const { Schema } = mongoose;

const ArticleSchema = new Schema({
  author: { type: String, required: true },
  date: { type: Number, default: Date.now(), required: true },
  title:  { type: String, required: true },
  description: { type: String, required: true },
  content: String,
  userId: { type: String, required: true },
  likeId: String,
});

const Article = mongoose.model('Article', ArticleSchema, 'articles');

module.exports = Article;
