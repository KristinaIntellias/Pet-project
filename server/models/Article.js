const mongoose = require('mongoose');
const { Schema } = mongoose;

const ArticleSchema = new Schema({
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Number, default: Date.now(), required: true },
  title:  { type: String, required: true },
  description: { type: String, required: true },
  content: String,
  usersLikeId: { type: Array, default: [] },
});

const Article = mongoose.model('Article', ArticleSchema, 'articles');

module.exports = Article;
