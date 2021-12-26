const Like = require('../models/Like.js');

class LikeService {
  async create (like) {
    const createdLike = await Like.create(like);
    return createdLike;
  }

  async getAll() {
    const likes = await Like.find();
    return likes;
  }

  async getOne(id) {
    if (!id) {
      throw new Error('ID has not been specified');
    }
    const like = await Like.findById(id);
    return like;
  }

  async update({like, userId}) {
    if (!like._id) {
      throw new Error('ID has not been specified');
    }

    let flag = false, updatedLike;
    like.usersId.forEach((id) => {
      if (id === userId) {
        flag = true;
      }
    })

    // updatedLike = await Like.findByIdAndUpdate(like._id, {$cond: { if: { userId: { $in: like.usersId } }, then: { $pull: { usersId: userId } }, else: { $push: { usersId: userId } } }}, {new: true})
    !flag ?
    updatedLike = await Like.findByIdAndUpdate(like._id, { $push: { usersId: userId } }, {new: true})
    : updatedLike = await Like.findByIdAndUpdate(like._id, { $pull: { usersId: userId } }, {new: true});
    return updatedLike;
  }

  async delete(id) {
    if (!id) {
      throw new Error('ID has not been specified');
    }
    const like = await Like.findByIdAndDelete(id);
    return like;
  }
}

module.exports = { LikeService: LikeService };
