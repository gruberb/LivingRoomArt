var User = require('../models/user');
var Utils = require('../utils/utils');

var setUser = function(user, newUser) {
  user.firstName = newUser.firstName;
  user.lastName = newUser.lastName;
  user.email = newUser.email;
  user.registrationDate = newUser.registrationDate ? newUser.registrationDate : newDate();
  user.creationDate = newUser.date ? newUser.date : new Date();
  user.profilePhoto = newUser.profilePhoto;
  user.isArtist = newUser.isArtist;
  user.street = newUser.street;
  user.housenumber = newUser.housenumber;
  user.city = newUser.city;
  user.zip = newUser.zip;
  user.country = newUser.country;
  user.phone = newUser.phone;
  user.email = newUser.email;
  user.url = newUser.url;
  user.aboutme = newUser.aboutme;
  return user;
}

var sendConfirmationMail = function(user) {
  var subject = "Welcome to LivingRoomArt";
  var text = "<h1>Hi " + user.firstName + "!</h1>" +
              "<p>It is so nice to have you on board! Please feel free to update your information " +
              "<a href='https://livingroomart-frontend.herokuapp.com/viewprofile/" + user._id + "'>in your profile settings</a>.</p>" +
              "<p>In addition, you can create your first event <a href='https://livingroomart-frontend.herokuapp.com/addevent'>here</a> or participate in " +
              "the ones <a href='https://livingroomart-frontend.herokuapp.com/events'>already offered</a>.</p>" +
              "<p>To activate your profile as an artist and to be visible for all other users, head over to your <a href='https://livingroomart-frontend.herokuapp.com/editprofile/"+ user._id + "'> profile settings</a> " +
              "and acticate the checkbox under 'Are you an artist?'</p>" +
              "<p>Feel free to <a href='mailto:foreach@me.com'>contact us</a> whenever you have questions or further requests. We are always happy to help! </p>";

  Utils.sendMail(subject, text, user.email);
};

// Create endpoint /api/users for POST
exports.createUsers = function(req, res) {
  var user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    password: req.body.password,
    email: req.body.email,
    registrationDate: new Date(),
    isArtist: req.body.isArtist
  });

  user.save(function(err) {
    if (err) {
      return res.status(500).send({
        success: false,
        error: err
      });
    }

    sendConfirmationMail(user);

    res.json({ status: 200, success: true, message: 'new user added' });
  });
};

exports.getAllArtists = function(req, res) {
  User.find({ isArtist: true}, function(err, users) {
      if (err)
          res.status(500).send({
          success: false,
          error: 'Could not get users.'
        });

        res.json({ status: 200, success: true, data: users });
  });
};

exports.putUserById = function(req, res) {
  User.findById({ _id: req.params.userID }, function(err, user) {
    if (err) {
      return res.status(500).send({
        success: false,
        error: 'Something went wrong.'
      });
    }

    user = setUser(user, req.body);

    user.save(function(err) {
      if (err) {
        return res.status(500).send({
          success: false,
          error: err
        });
      }

      res.json({ status: 200, success: true,  message: 'The user was successfully updated.', data: user });
    });
  });
};

exports.getUserById = function(req, res) {
  User.findById({ _id: req.params.userID }, function(err, user) {
    if(err) {
      return res.status(500).send({
        success: false,
        error: 'Something went wrong.'
      });
    }

    if(user === null) {
      return res.status(404).send({
        success: false,
        error: 'No user found.'
      });
    }

    res.json({ status: 200, success: true,  message: 'Here is the user you wanted.', data: user });
  });
};

exports.deleteUserById = function(req, res) {
  User.findOne({ _id: req.params.userID }, function(err, user) {
    if (err) {
      return res.status(500).send({
        success: false,
        error: 'Could not find user you want to delete.'
      });
    }

    user.remove(function(err) {
      if (err) {
        return res.status(500).send({
          success: false,
          error: 'Something went wrong.'
        });
      }

      res.json({ status: 200, success: true, message: 'User removed.', data: user });
    });
  });
};
