var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var UserSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  password: { type: String, required: true, select: false },
  email: { type: String, unique: true, required: true },
  phone: { type: String },
  url: { type: String },
  aboutme: { type: String },
  lastLogin: { type: Date },
  confirmed: { type: Boolean },
  registrationDate: { type: Date, default: Date.now, required: true },
  street: { type: String },
  housenumber: { type: String },
  city: { type: String },
  country: { type: String },
  zip: { type: Number },
  profilePhoto: { type: String },
  isArtist: { type: Boolean, default: false }
});

// Execute before each user.save() call
UserSchema.pre('save', function(callback) {
  var user = this;

  // Break out if the password hasn't changed
  if (!user.isModified('password')) return callback();

  // Password changed so we need to hash it
  bcrypt.genSalt(5, function(err, salt) {
    if (err) return callback(err);

    bcrypt.hash(user.password, salt, null, function(err, hash) {
      if (err) return callback(err);
      user.password = hash;
      callback();
    });
  });
});

UserSchema.methods.verifyPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', UserSchema);
