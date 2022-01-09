const Tag = require('../models/Tag.js');

class TagService {
  async create (tag) {
    return await Tag.create(tag);
  }

  async getAll() {
    return Tag
      .find()
      .select('_id content userId');
  }

  async getOne(id) {
    if (!id) {
      throw new Error('ID has not been specified');
    }
    return Tag
      .findById(id)
      .select('_id content userId');
  }

  async update(tag) {
    if (!tag._id) {
      throw new Error('ID has not been specified');
    }
    return Tag
      .findByIdAndUpdate(tag._id, tag, {new: true})
      .select('_id content userId');
  }

  async delete(id) {
    if (!id) {
      throw new Error('ID has not been specified');
    }
    return Tag
      .findByIdAndDelete(id)
      .select('_id content userId');
  }
}

module.exports = { TagService: TagService };
