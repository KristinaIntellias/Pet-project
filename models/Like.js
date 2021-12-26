const mongoose = require('mongoose');
const { Schema } = mongoose;

const LikeSchema = new Schema({
  articleId: String,
  usersId: { type: Array, default: [] },
});

const Like = mongoose.model('Like', LikeSchema, 'likes');

module.exports = Like;
