var mongoose = require('mongoose');
var Attendee = require('./attendee');

var EventSchema = new mongoose.Schema({
  userID: { type: String, required: true },
  name: { type: String, required: true },
  category: { type: String },
  description: { type: String, required: true },
  creationDate: { type: Date, default: Date.now, required: true },
  picture: { type: String },
  cost: { type: Number, default: '0' },
  street: { type: String, required: true },
  housenumber: { type: String, required: true },
  city: { type: String, required: true },
  zip: { type: Number, required: true },
  country: { type: String, required: true },
  phone: { type: String },
  email: { type: String, required: true },
  url: { type: String },
  from: { type: Date },
  to: { type: Date },
  attendees: [ Attendee.schema ]
});

module.exports = mongoose.model('Event', EventSchema);
