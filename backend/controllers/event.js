var Event = require('../models/event');
var Attendee = require('../models/attendee');
var _ = require('underscore');
var moment = require('moment');
var Utils = require('../utils/utils');

var setEvent = function(_event, newEvent) {
  _event.userID = newEvent.userID ? newEvent.userID : _event.userID;
  _event.name = newEvent.name ? newEvent.name : _event.name;
  _event.category = newEvent.category ? newEvent.category : _event.category;
  _event.description = newEvent.description ? newEvent.description : _event.description;
  _event.creationDate = newEvent.date ? newEvent.date : new Date();
  _event.picture = newEvent.picture ? newEvent.picture : _event.picture;
  _event.cost = newEvent.cost ? newEvent.cost : _event.cost;
  _event.street = newEvent.street ? newEvent.street : _event.street;
  _event.housenumber = newEvent.housenumber ? newEvent.housenumber : _event.housenumber;
  _event.city = newEvent.city ? newEvent.city : _event.city;
  _event.zip = newEvent.zip ? newEvent.zip : _event.zip;
  _event.country = newEvent.country ? newEvent.country : _event.country;
  _event.phone = newEvent.phone ? newEvent.phone : _event.phone;
  _event.email = newEvent.email ? newEvent.email : _event.mail;
  _event.url = newEvent.url ? newEvent.url : _event.url;
  _event.from = newEvent.from ? newEvent.from : _event.from;
  _event.to = newEvent.to ? newEvent.to : _event.to;
  return _event;
};

var sendConfirmationEmail = function(_event, email) {
  var subject = "[LivingRoomArt] You are attending " + _event.name;
  var text = "<p>Here is the confirmation for your event you are attending!</p>" +
  "When? " + moment(_event.from).format('MMMM Do YYYY, h:mm a') + "<br />" +
  "Where? " + _event.street + " " + _event.housenumber + ", " + _event.city + "<br />" +
  "Cost? " + _event.cost + " Euro <br/>" +
  "<br /><p>Feel free to <a href='mailto:" + _event.email + "'>contact the organiser</a> when you have any question!</p>" +
  "<p>Also visit the <a href='https://livingroomart-frontend.herokuapp.com/viewevent/" + _event._id + "'>LivingRoomArt event overview</a> to stay up to date about attendees and further information!<p>" +
  "<p>And here is again the event description: </p>" + _event.description;

  Utils.sendMail(subject, text, email);
};

var sendCancelEmail = function(_event, email) {
  var subject = "[LivingRoomArt] Updated status on " + _event.name;
  var text = "<p>We are very sad not to see you at " + _event.name + "!" +
  "<p>Still, you can always stay up to date via the <a href='https://livingroomart-frontend.herokuapp.com/viewevent/" + _event._id + "'>LivingRoomArt event overview</a><p>";

  Utils.sendMail(subject, text, email);
};

exports.getEvents = function(req, res) {
  var cutoff = new Date();
  Event.find({from: {$gte: cutoff} }, function(err, _events) {
    if(err) {
      return res.status(500).send({
        success: false,
        error: 'Something went wrong.'
      });
    }

    res.json({ status: 200, success: true,  message: 'Here, the events you were looking for!', data: _events });
  });
};

exports.postEvent = function(req, res) {
  var _event = new Event();

  _event = setEvent(_event, req.body);

  if(req.body.attendee) {
    var attendee = JSON.parse(req.body.attendee);
    _event.attendees.push(new Attendee(attendee));
  }

  _event.save(function(err) {
    if(err) {
      return res.status(500).send({
        success: false,
        error: err
      });
    }

    res.json({ status: 200, success: true,  message: 'Hurray, we have a new event in our Database!'});
  });
};

exports.putEventById = function(req, res) {
  Event.findById({ _id: req.params.eventID }, function(err, _event) {
    if (err) {
      return res.status(500).send({
        success: false,
        error: 'Something went wrong.'
      });
    }

    _event = setEvent(_event, req.body);

    if(req.body.attendee) {
      var attendee = JSON.parse(req.body.attendee);
      _event.attendees.push(new Attendee(attendee));
      sendConfirmationEmail(_event, attendee.email);
    }

    if(req.body.no_attendee) {
      var no_attendee = JSON.parse(req.body.no_attendee);
      _event.attendees = _.without(_event.attendees, _.findWhere(_event.attendees, no_attendee));
      sendCancelEmail(_event, no_attendee.email);
    };

    _event.save(function(err) {
      if (err) {
        return res.status(500).send({
          success: false,
          error: err
        });
      }

      res.json({ status: 200, success: true,  message: 'The event was successfully updated.', data: _event });
    });
  });
};

exports.getEventById = function(req, res) {
  Event.findById({ _id: req.params.eventID }, function(err, _event) {
    if(err) {
      return res.status(500).send({
        success: false,
        error: 'Something went wrong.'
      });
    }

    if(_event === null) {
      return res.status(404).send({
        success: false,
        error: 'No event with ID found.'
      });
    }

    res.json({ status: 200, success: true,  message: 'Here is the event you wanted, human.', data: _event });
  });
};

exports.getEventsByUserId = function(req, res) {
  var cutoff = new Date();
  Event.find({ userID: req.params.userID, from: {$gte: cutoff  }}, function(err, _events) {
    if(err) {
      return res.status(500).send({
        success: false,
        error: 'Something went wrong.'
      });
    }

    if(_events === null) {
      return res.status(404).send({
        success: false,
        error: 'No event with ID found.'
      });
    }

    res.json({ status: 200, success: true,  message: 'Here are the requested events for this user.', data: _events });
  });
};

exports.getEventsByAttendeeId = function(req, res) {
  var cutoff = new Date();
  Event.find({ from: {$gte: cutoff  }, 'attendees.userID': req.params.userID }, function(err, _events) {
    if(err) {
      console.log(err);
      return res.status(500).send({
        success: false,
        error: 'Something went wrong.'
      });
    }

    if(_events === null) {
      return res.status(404).send({
        success: false,
        error: 'No event with ID found.'
      });
    }

    res.json({ status: 200, success: true,  message: 'Here are the requested events for this user.', data: _events });
  });
};

exports.deleteEventById = function(req, res) {
  Event.findOne({ _id: req.params.eventID }, function(err, _event) {
    if (err) {
      return res.status(500).send({
        success: false,
        error: 'Could not find Event you want to delete.'
      });
    }

    _event.remove(function(err) {
      if (err) {
        return res.status(500).send({
          success: false,
          error: 'Something went wrong.'
        });
      }

      res.json({ status: 200, success: true, message: 'Event removed.', data: _event });
    });
  });
};
