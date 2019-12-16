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
  password: String,
  is_teamleader: {
    type: Boolean,
    default: false
  },
  is_inteam: {
    type: Boolean,
    default: false
  },
  team_id: {
    type: String,
    default: ""
  }

}, {
  timestamps: true
});

userSchema.pre('updateOne',async function(next) {

  const femaleGravatars = [ "https://image.flaticon.com/icons/png/512/163/163811.png", "https://image.flaticon.com/icons/png/512/145/145852.png", "https://image.flaticon.com/icons/png/512/163/163824.png", "https://image.flaticon.com/icons/png/512/163/163830.png", "https://image.flaticon.com/icons/png/512/163/163835.png"]
  const maleGravatars= [ "https://image.flaticon.com/icons/png/512/163/163803.png", "https://image.flaticon.com/icons/png/512/163/163847.png", "https://image.flaticon.com/icons/png/512/163/163801.png", "https://image.flaticon.com/icons/png/512/163/163815.png", "https://image.flaticon.com/icons/png/512/163/163827.png", "https://image.flaticon.com/icons/png/512/163/163825.png" , "https://image.flaticon.com/icons/png/512/163/163834.png" ]  
  if(this._update.email !== undefined)
    this._update.gravatar_url = (this._update.gender == "female") ? 'http://www.gravatar.com/avatar/' + md5(this._update.email) + '?s=700' + '&d=' + encodeURI(femaleGravatars[Math.floor(Math.random()*femaleGravatars.length)])
    : 'http://www.gravatar.com/avatar/' + md5(this._update.email) + '?s=700' + '&d=' + encodeURI(maleGravatars[Math.floor(Math.random()*maleGravatars.length)]);
  
  next();
});

/**
 * Password hash middleware.
 */
userSchema.pre('save', async function save(next) {
  const user = this;
  const femaleGravatars = [ "https://image.flaticon.com/icons/png/512/163/163811.png", "https://image.flaticon.com/icons/png/512/145/145852.png", "https://image.flaticon.com/icons/png/512/163/163824.png", "https://image.flaticon.com/icons/png/512/163/163830.png", "https://image.flaticon.com/icons/png/512/163/163835.png"]
  const maleGravatars= [ "https://image.flaticon.com/icons/png/512/163/163803.png", "https://image.flaticon.com/icons/png/512/163/163847.png", "https://image.flaticon.com/icons/png/512/163/163801.png", "https://image.flaticon.com/icons/png/512/163/163815.png", "https://image.flaticon.com/icons/png/512/163/163827.png", "https://image.flaticon.com/icons/png/512/163/163825.png" , "https://image.flaticon.com/icons/png/512/163/163834.png" ]  
  console.log(maleGravatars[Math.floor(Math.random()*femaleGravatars.length)]);
  
  user.gravatar_url = (user.gender == "female") ? 'http://www.gravatar.com/avatar/' + md5(user.email) + '?s=700' + '&d=' + encodeURI(femaleGravatars[Math.floor(Math.random()*femaleGravatars.length)])
  : 'http://www.gravatar.com/avatar/' + md5(user.email) + '?s=700' + '&d=' + encodeURI(maleGravatars[Math.floor(Math.random()*maleGravatars.length)]);

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