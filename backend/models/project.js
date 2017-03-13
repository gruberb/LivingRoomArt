var mongoose = require('mongoose');

var ProjectSchema = new mongoose.Schema({
  userID: { type: String, required: true },
  name: { type: String, required: true },
  category: { type: String },
  description: { type: String, required: true },
  creationDate: { type: Date, default: Date.now, required: true },
  picture: { type: String },
  url: { type: String },
  from: { type: Date },
  to: { type: Date }
});

module.exports = mongoose.model('Project', ProjectSchema);
