var OpenCall = require('../models/opencall');
var Applicant = require('../models/applicant');
var _ = require('underscore');
var moment = require('moment');
var Utils = require('../utils/utils');

var setOpenCall = function(opencall, newOpenCAll) {
  opencall.userID = newOpenCAll.userID ? newOpenCAll.userID : opencall.userID;
  opencall.name = newOpenCAll.name ? newOpenCAll.name : opencall.name;
  opencall.category = newOpenCAll.category ? newOpenCAll.category : opencall.category;
  opencall.description = newOpenCAll.description ? newOpenCAll.description : opencall.description;
  opencall.creationDate = newOpenCAll.date ? newOpenCAll.date : new Date();
  opencall.picture = newOpenCAll.picture ? newOpenCAll.picture : opencall.picture;
  opencall.cost = newOpenCAll.cost ? newOpenCAll.cost : opencall.cost;
  opencall.street = newOpenCAll.street ? newOpenCAll.street : opencall.street;
  opencall.housenumber = newOpenCAll.housenumber ? newOpenCAll.housenumber : opencall.housenumber;
  opencall.city = newOpenCAll.city ? newOpenCAll.city : opencall.city;
  opencall.zip = newOpenCAll.zip ? newOpenCAll.zip : opencall.zip;
  opencall.country = newOpenCAll.country ? newOpenCAll.country : opencall.country;
  opencall.phone = newOpenCAll.phone ? newOpenCAll.phone : opencall.phone;
  opencall.email = newOpenCAll.email ? newOpenCAll.email : opencall.mail;
  opencall.url = newOpenCAll.url ? newOpenCAll.url : opencall.url;
  opencall.from = newOpenCAll.from ? newOpenCAll.from : opencall.from;
  opencall.to = newOpenCAll.to ? newOpenCAll.to : opencall.to;
  return opencall;
};

var sendConfirmationEmail = function(opencall, applicant) {
  var subject = "[LivingRoomArt] You are applying for " + opencall.name;
  var text = "<p>Here is the confirmation for your OpenCall you are applying for!</p>" +
  "<h5>Your application: </h5>" +
  "<p>" + applicant.message + "</p>" +
  "When? " + moment(opencall.from).format('MMMM Do YYYY, h:mm a') + "<br />" +
  "Where? " + opencall.street + " " + opencall.housenumber + ", " + opencall.city + "<br />" +
  "Cost? " + opencall.cost + " Euro <br/>" +
  "<br /><p>Feel free to <a href='mailto:" + opencall.email + "'>contact the organiser</a> when you have any further questions!</p>" +
  "<p>Also, <a href='https://livingroomart-frontend.herokuapp.com/viewOpenCall/" + opencall._id + "'>visit the OpenCall at LivingRoomArt</a> to stay up to date about applicants and further information!<p>" +
  "<p>And here is again the OpenCall description: </p>" + opencall.description;

  Utils.sendMail(subject, text, applicant.email);
};

var sendOrganiserEmail = function(opencall, applicant) {
  var subject = "[LivingRoomArt] You have a new application for " + opencall.name;
  var text = "<p>Congrats! " + applicant.name + " applied for your OpenCall " + opencall.name + "!</p>" +
  "<p>You can visit open applications for " + opencall.name + " <a href='https://livingroomart-frontend.herokuapp.com/manageopencall/" + opencall._id + "'> over here</a>!</p>" +
  "<p><a href='https://livingroomart-frontend.herokuapp.com/viewopencall/" + opencall._id + "'>Here is the link to your OpenCall</a>, and following the information about your OpenCall: </p>" +
  "When? " + moment(opencall.from).format('MMMM Do YYYY, h:mm a') + "<br />" +
  "Where? " + opencall.street + " " + opencall.housenumber + ", " + opencall.city + "<br />" +
  "Cost? " + opencall.cost + " Euro <br/>" +
  opencall.description;

  Utils.sendMail(subject, text, opencall.email);
};

var sendRejectedEmail = function(opencall, applicant) {
  var subject = "[LivingRoomArt] Updated status on " + opencall.name;
  var text = "<p>The OpenCall for " + opencall.name + " decided to pick someone else for this OpenCall!" +
  "<p>Please have a look at our other OpenCalls on LivingRoomArt: <a href='https://livingroomart-frontend.herokuapp.com/opencalls/'>LivingRoomArt OpenCalls</a><p>";

  Utils.sendMail(subject, text, applicant.email);
};

var sendAcceptedEmail = function(opencall, applicant) {
  var subject = "[LivingRoomArt] Updated status on " + opencall.name;
  var text = "<p>Congrats! The OpenCall for " + opencall.name + " decided to pick you for this OpenCall!" +
  "<p>Please <a href='mailto:" + opencall.email + "'>contact the organiser</a> for further information!<p>" +
  "<p><a href='https://livingroomart-frontend.herokuapp.com/viewopencall/" + opencall._id + "'>Here is the link to your OpenCall</a>. Feel free to stop by whenever you feel like it!</p>" +
  "<p>To remind you, the description of the OpenCall: </p>" +
  "When? " + moment(opencall.from).format('MMMM Do YYYY, h:mm a') + "<br />" +
  "Where? " + opencall.street + " " + opencall.housenumber + ", " + opencall.city + "<br />" +
  "Cost? " + opencall.cost + " Euro <br/>" +
  opencall.description;

  Utils.sendMail(subject, text, applicant.email);
};

exports.getOpenCalls = function(req, res) {
  var cutoff = new Date();
  OpenCall.find({from: {$gte: cutoff} }, function(err, opencalls) {
    if(err) {
      return res.status(500).send({
        success: false,
        error: 'Something went wrong.'
      });
    }

    res.json({ status: 200, success: true,  message: 'Here, the OpenCalls you were looking for!', data: opencalls });
  });
};

exports.postOpenCall = function(req, res) {
  var opencall = new OpenCall();

  opencall = setOpenCall(opencall, req.body);

  opencall.save(function(err) {
    if(err) {
      return res.status(500).send({
        success: false,
        error: err
      });
    }

    res.json({ status: 200, success: true,  message: 'Hurray, we have a new OpenCall in our Database!'});
  });
};

exports.putOpenCallById = function(req, res) {
  OpenCall.findById({ _id: req.params.opencallID }, function(err, opencall) {
    if (err) {
      return res.status(500).send({
        success: false,
        error: 'Something went wrong.'
      });
    }

    opencall = setOpenCall(opencall, req.body);

    if(req.body.applicant) {
      var applicant = JSON.parse(req.body.applicant);

      switch(applicant.status){
        case 'open':
          opencall.applicants.push(new Applicant(applicant));
          sendConfirmationEmail(opencall, applicant);
          sendOrganiserEmail(opencall, applicant);
          break;
        case 'accepted':
          Utils.removeElement(opencall.applicants, applicant.userID);
          opencall.accepted.push(new Applicant(applicant));
          sendAcceptedEmail(opencall, applicant);
          break;
        case 'rejected':
          Utils.removeElement(opencall.applicants, applicant.userID);
          opencall.rejected.push(new Applicant(applicant));
          sendRejectedEmail(opencall, applicant);
          break;
      }
    }

    opencall.save(function(err) {
      if (err) {
        return res.status(500).send({
          success: false,
          error: err
        });
      }

      res.json({ status: 200, success: true,  message: 'The OpenCall was successfully updated.', data: opencall });
    });
  });
};

exports.getOpenCallById = function(req, res) {
  OpenCall.findById({ _id: req.params.opencallID }, function(err, opencall) {
    if(err) {
      return res.status(500).send({
        success: false,
        error: 'Something went wrong.'
      });
    }

    if(opencall === null) {
      return res.status(404).send({
        success: false,
        error: 'No OpenCall with ID found.'
      });
    }

    res.json({ status: 200, success: true,  message: 'Here is the OpenCall you wanted, human.', data: opencall });
  });
};

exports.getOpenCallsByOwner = function(req, res) {
  var cutoff = new Date();
  OpenCall.find({ userID: req.params.userID, from: {$gte: cutoff  }}, function(err, opencalls) {
    if(err) {
      return res.status(500).send({
        success: false,
        error: 'Something went wrong.'
      });
    }

    if(opencalls === null) {
      return res.status(404).send({
        success: false,
        error: 'No OpenCall with ID found.'
      });
    }

    res.json({ status: 200, success: true,  message: 'Here are the requested OpenCalls for this user.', data: opencalls });
  });
};

exports.getOpenCallsByAttendeeId = function(req, res) {
  var cutoff = new Date();
  OpenCall.find({ from: {$gte: cutoff  }, 'applicants.userID': req.params.userID }, function(err, opencalls) {
    if(err) {
      return res.status(500).send({
        success: false,
        error: 'Something went wrong.'
      });
    }

    if(opencalls === null) {
      return res.status(404).send({
        success: false,
        error: 'No OpenCall with ID found.'
      });
    }

    res.json({ status: 200, success: true,  message: 'Here are the requested OpenCalls for this user.', data: opencalls });
  });
};

exports.deleteOpenCallById = function(req, res) {
  OpenCall.findOne({ _id: req.params.opencallID }, function(err, opencall) {
    if (err) {
      return res.status(500).send({
        success: false,
        error: 'Could not find OpenCall you want to delete.'
      });
    }

    opencall.remove(function(err) {
      if (err) {
        return res.status(500).send({
          success: false,
          error: 'Something went wrong.'
        });
      }

      res.json({ status: 200, success: true, message: 'OpenCall removed.', data: opencall });
    });
  });
};
