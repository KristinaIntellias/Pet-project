const Tag = require('../models/Tag.js');

class TagService {
  async create (tag) {
    return await Tag.create(tag);
  }

  async getAll() {
    // await Tag.collection.createIndex({text: 1}, {unique: true});
    // await Tag.collection.getIndexes({full: true}).then(indexes => {
    //   console.log("indexes:", indexes);
    //   // ...
    // }).catch(console.error);

    return Tag
      .find()
      .select('_id text');
  }

  async getOne(id) {
    if (!id) {
      throw new Error('ID has not been specified');
    }
    return Tag
      .findById(id)
      .select('_id text');
  }

  async update(tag) {
    if (!tag._id) {
      throw new Error('ID has not been specified');
    }
    return Tag
      .findByIdAndUpdate(tag._id, tag, {new: true})
      .select('_id text');
  }

  async delete(id) {
    if (!id) {
      throw new Error('ID has not been specified');
    }
    return Tag
      .findByIdAndDelete(id)
      .select('_id text');
  }
}

module.exports = { TagService: TagService };
