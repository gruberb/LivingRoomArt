var Utils = require('../utils/utils');
var async = require('async');

exports.sendOrganiserMail = function(req, res) {
  var text = req.body.text;
  var _event = JSON.parse(req.body._event);
  var subject = "[LivingRoomArt] New Message from the organiser of " + _event.name;

  async.forEach(_event.attendees, function(attendee, callback) {
    Utils.sendMail(subject, text, attendee.email);
    callback();
  }, function(done) {
    res.json({ status: 200, success: true, message: 'hurray!'});
  });
};
