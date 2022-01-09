const User = require('../models/User.js');

class UserService {
  async create (user) {
    return await User.create(user);
  }

  async getAll() {
    return User
      .find({})
      .select('_id firstName LastName email');
  }

  async getOne(id) {
    if (!id) {
      throw new Error('ID has not been specified');
    }
    return User
      .findById(id)
      .select('_id firstName LastName email');
  }

  async update(user) {
    if (!user._id) {
      throw new Error('ID has not been specified');
    }
    return User
      .findByIdAndUpdate(user._id, user, {new: true})
      .select('_id firstName LastName email');
  }

  async delete(id) {
    if (!id) {
      throw new Error('ID has not been specified');
    }
    return User
      .findByIdAndDelete(id)
      .select('_id firstName LastName email');
  }
}

module.exports = { UserService: UserService };
