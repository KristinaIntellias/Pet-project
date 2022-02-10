const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/User.js');

const saltRounds = 10;

class UserService {
  async signup (user) {
    const { email, password } = user;
    const emailExist = await User.findOne({email});

    if (!!emailExist) {
      throw new Error('Such email is already exist');
    }

    bcrypt.hash(password, saltRounds, async (err, hash) => {
      if (err) {
        return err
      } else {
        return await User.create({...user, password: hash});
      }
    })
  }

  async login (user) {
    const { email, password } = user;
    const existUser = await User.findOne({email});

    if (!existUser) {
      throw new Error(`Authorization failed`);
    }

    const validPassword = bcrypt.compareSync(password, existUser.password);
    if (!validPassword) {
      throw new Error('Invalid password');
    }

    return jwt.sign({id: existUser._id, email: existUser.email}, process.env.SECRET, {expiresIn: '1h'});
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
