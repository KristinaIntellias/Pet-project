const Tag = require('../models/Tag.js');

class TagService {
  async create (tag) {
    const createdTag = await Tag.create(tag);
    return createdTag;
  }

  async getAll() {
    const tags = await Tag.find();
    return tags;
  }

  async getOne(id) {
    if (!id) {
      throw new Error('ID has not been specified');
    }
    const tag = await Tag.findById(id);
    return tag;
  }

  async update(tag) {
    if (!tag._id) {
      throw new Error('ID has not been specified');
    }
    const updatedTag = await Tag.findByIdAndUpdate(tag._id, tag, {new: true});
    return updatedTag;
  }

  async delete(id) {
    if (!id) {
      throw new Error('ID has not been specified');
    }
    const tag = await Tag.findByIdAndDelete(id);
    return tag;
  }
}

module.exports = { TagService: TagService };
