const mongoose = require('mongoose');
const { Schema } = mongoose;

const TagSchema = new Schema({
  content: { type: String, required: true },
  userId: String,
});

const Tag = mongoose.model('Tag', TagSchema, 'tags');

module.exports = Tag;
