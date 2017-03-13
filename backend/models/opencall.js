var mongoose = require('mongoose');
var Applicant = require('./applicant');

var OpenCallSchema = new mongoose.Schema({
  userID: { type: String, required: true },
  name: { type: String, required: true },
  category: { type: String },
  description: { type: String, required: true },
  creationDate: { type: Date, default: Date.now, required: true },
  picture: { type: String },
  cost: { type: Number, default: '0' },
  street: { type: String },
  housenumber: { type: String },
  city: { type: String },
  zip: { type: Number },
  country: { type: String },
  phone: { type: String },
  email: { type: String, required: true },
  url: { type: String },
  from: { type: Date },
  to: { type: Date },
  applicants: [ Applicant.schema ],
  rejected: [ Applicant.schema ],
  accepted: [ Applicant.schema ]
});

module.exports = mongoose.model('OpenCall', OpenCallSchema);
