const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({
  firstName: { type: String, required: true },
  LastName: { type: String, required: true },
  email: { type: String, required: true },
  // password:  { type: String, required: true }
  password:  { type: String }
});

const User = mongoose.model('User', UserSchema, 'users');

module.exports = User;
