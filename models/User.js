const bcrypt = require('bcrypt');
const crypto = require('crypto');
const mongoose = require('mongoose');
const md5 = require('md5');

const userSchema = new mongoose.Schema({

  _id: {
    type: String,
    unique: true
  },
  name: String,
  email: String,
  mobile: String,
  gender: String,
  dept: String,
  year: String,
  gravatar_url: String,
  collegeid: String,
  password: String
}, {
  timestamps: true
});

/**
 * Password hash middleware.
 */
userSchema.pre('save', async function save(next) {
  const user = this;
  user.gravatar_url = 'http://www.gravatar.com/avatar/' + md5(user.email)

  if (user._id.toLowerCase().startsWith('c'))
    user.dept = 'Computer'
  else if (user._id.toLowerCase().startsWith('i'))
    user.dept = 'Information Technology'
  else
    user.dept = 'ENTC'

  if (!user.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(user.password, salt);
  user.password = hashedPassword
  next()
});

/**
 * Helper method for validating user's password.
 */
userSchema.methods.comparePassword = function comparePassword(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    cb(err, isMatch);
  });
};

/**
 * Helper method for getting user's gravatar.
 */

const User = mongoose.model('User', userSchema);

module.exports = User;