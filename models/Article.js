const mongoose = require('mongoose');
const { Schema } = mongoose;

const ArticleSchema = new Schema({
  author: { type: String, required: true },
  date: { type: Number, default: Date.now(), required: true },
  title:  { type: String, required: true },
  description: { type: String, required: true },
  content: String,
  // userId: { type: String, required: true },
  userId: { type: String },
  likeId: { type: String },
  favorite: { type: Number, required: true },
});

const Article = mongoose.model('Article', ArticleSchema, 'articles');

module.exports = Article;
