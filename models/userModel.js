const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Your name is required.'],
    trim: true
  },
  email: {
    type: String,
    require: [true, 'Please add you email address.'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email']
  },
  photo: String,
  role: {
    type: String,
    enum: ['user', 'guide', 'admin'],
    required: [
      true,
      'One of the following roles must be specified, user, guide or admin.'
    ],
    trim: true,
    default: 'user'
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: 8,
    select: false
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm your password'],
    validate: {
      // This only work on .create and .save!!!
      validator: function(el) {
        return el === this.password;
      },
      message: 'Password do not match.'
    },
    select: false
  },
  passwordChangedAt: Date
});

userSchema.pre('save', async function(next) {
  //only runs if password was modified
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;

  next();
});

userSchema.methods.correctPassword = async function(
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changedPasswordAfter = function(JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    return JWTTimestamp < changedTimestamp;
  }
  // Not changed
  return false;
};

//Model names always start with capital letter
const User = mongoose.model('User', userSchema);

module.exports = User;
