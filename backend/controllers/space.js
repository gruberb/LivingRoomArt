var Space = require('../models/space');

var setSpace = function(space, newSpace) {
  space.userID = newSpace.userID;
  space.name = newSpace.name;
  space.category = newSpace.category;
  space.description = newSpace.description;
  space.creationDate = newSpace.date ? newSpace.date : new Date();
  space.picture = newSpace.picture;
  space.cost = newSpace.cost;
  space.squareMeters = newSpace.squareMeters;
  space.street = newSpace.street;
  space.housenumber = newSpace.housenumber;
  space.city = newSpace.city;
  space.zip = newSpace.zip;
  space.country = newSpace.country;
  space.phone = newSpace.phone;
  space.email = newSpace.email;
  space.url = newSpace.url;
  space.from = newSpace.from;
  space.to = newSpace.to;
  return space;
}

exports.getSpaces = function(req, res) {
  var cutoff = new Date();
  Space.find({}, function(err, spaces) {
    if(err) {
      return res.status(500).send({
        success: false,
        error: 'Something went wrong.'
      });
    }

    res.json({ status: 200, success: true,  message: 'Here, your spaces you were looking for!', data: spaces });
  });
};

exports.postSpace = function(req, res) {
  var space = new Space();

  space = setSpace(space, req.body);

  space.save(function(err) {
    if(err) {
      return res.status(500).send({
        success: false,
        error: err
      });
    }

    res.json({ status: 200, success: true,  message: 'Hurray, we have a new space in our Database!'});
  });
};

exports.putSpaceById = function(req, res) {
  Space.findById({ _id: req.params.spaceID }, function(err, space) {
    if (err) {
      return res.status(500).send({
        success: false,
        error: 'Something went wrong.'
      });
    }

    space = setSpace(space, req.body);

    space.save(function(err) {
      if (err) {
        return res.status(500).send({
          success: false,
          error: err
        });
      }

      res.json({ status: 200, success: true,  message: 'The space was updated successfully.', data: space });
    });
  });
};

exports.getSpaceById = function(req, res) {
  Space.findById({ _id: req.params.spaceID }, function(err, space) {
    if(err) {
      return res.status(500).send({
        success: false,
        error: 'Something went wrong.'
      });
    }

    if(space === null) {
      return res.status(404).send({
        success: false,
        error: 'No space found.'
      });
    }

    res.json({ status: 200, success: true,  message: 'Here is the space you wanted, human.', data: space });
  });
};

exports.getSpacesByUserId = function(req, res) {
  Space.find({ userID: req.params.userID }, function(err, spaces) {
    if(err) {
      return res.status(500).send({
        success: false,
        error: 'Something went wrong.'
      });
    }

    if(spaces === null) {
      return res.status(404).send({
        success: false,
        error: 'No spaces found.'
      });
    }

    res.json({ status: 200, success: true,  message: 'Here are spaces you wanted, human.', data: spaces });
  });
};

exports.deleteSpaceById = function(req, res) {
  // Use the workspace model to find a specific workspace and remove it
  Space.findOne({ _id: req.params.spaceID }, function(err, space) {
    if (err) {
      return res.status(500).send({
        success: false,
        error: 'Could not find space you want to delete.'
      });
    }

    space.remove(function(err) {
      if (err) {
        return res.status(500).send({
          success: false,
          error: 'Something went wrong.'
        });
      }

      res.json({ status: 200, success: true, message: 'Space removed.', data: space });
    });
  });
};
