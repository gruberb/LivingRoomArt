var mongoose = require('mongoose');

var ApplicantSchema = new mongoose.Schema({
  email: { type: String, required: true },
  name: { type: String, required: true },
  userID: { type: String, required: true },
  message: { type: String, required: true },
  status: { type: String, default: 'open'}
});

module.exports = mongoose.model('Applicant', ApplicantSchema);
