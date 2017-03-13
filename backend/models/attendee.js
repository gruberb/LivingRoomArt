var mongoose = require('mongoose');

var AttendeeSchema = new mongoose.Schema({
  email: { type: String, required: true },
  name: { type: String, required: true },
  userID: { type: String, required: true }
});

module.exports = mongoose.model('Attendee', AttendeeSchema);
