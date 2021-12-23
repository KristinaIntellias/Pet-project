const mongoose = require('mongoose');
const { Schema } = mongoose;

const LikeSchema = new Schema({
  postId: { type: String, required: true },
  userId: { type: String, required: true },
  favorite: { type: Boolean, default: false },
});

const Like = mongoose.model('Like', LikeSchema, 'likes');

module.exports = Like;
