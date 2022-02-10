const mongoose = require('mongoose');
const { Schema } = mongoose;

const TagSchema = new Schema({
  text: { type: String, required: true, unique: true },
});

const Tag = mongoose.model('Tag', TagSchema, 'tags');

module.exports = Tag;
