require('newrelic');

var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var cors = require('cors')
var passport = require('passport');
var multer  = require('multer');

var upload = multer();
var authController = require('./controllers/auth');
var userController = require('./controllers/user');
var spaceController = require('./controllers/space');
var eventController = require('./controllers/event');
var projectController = require('./controllers/project');
var opencallController = require('./controllers/opencall');
var attendeeController = require('./controllers/attendee');
var Utils = require('./utils/utils');

var app = express();

// SEO friendly prerender
app.use(require('prerender-node').set('prerenderToken', 'bjoySLqa0lwi7YU8YXjm'));

var whitelist = [
  'https://livingroomart-frontend.herokuapp.com',
  'http://livingroomart-frontend.herokuapp.com',
  'http://localhost:9001',
  'http://localhost:3000'
];

var corsOptions = {
  origin: function(origin, callback){
    var originIsWhitelisted = whitelist.indexOf(origin) !== -1;
    callback(null, originIsWhitelisted);
  },
  credentials: true
};

// Connect to MongoDB
mongoose.connect(process.env.databaseUri);

app.use(cors(corsOptions));

// Use the body-parser package in our application
app.use(bodyParser.urlencoded({
  extended: true
}));

// Use the passport package in our application
app.use(passport.initialize());

var router = express.Router();

router.route('/spaces')
  .post(authController.isAuthenticated, spaceController.postSpace)
  .get(spaceController.getSpaces);

router.route('/space/:spaceID')
  .get(spaceController.getSpaceById)
  .put(authController.isAuthenticated, spaceController.putSpaceById)
  .delete(authController.isAuthenticated, spaceController.deleteSpaceById);

router.route('/spaces/:userID')
  .get(authController.isAuthenticated, spaceController.getSpacesByUserId);

router.route('/events')
  .post(authController.isAuthenticated, eventController.postEvent)
  .get(eventController.getEvents);

router.route('/events/:userID')
  .get(authController.isAuthenticated, eventController.getEventsByUserId);

router.route('/events/attendee/:userID')
  .get(authController.isAuthenticated, eventController.getEventsByAttendeeId);

router.route('/event/:eventID')
  .get(eventController.getEventById)
  .put(authController.isAuthenticated, eventController.putEventById)
  .delete(authController.isAuthenticated, eventController.deleteEventById);

router.route('/users')
  .post(userController.createUsers)
  .get(userController.getAllArtists);

router.route('/users/:userID')
  .get(userController.getUserById)
  .put(authController.isAuthenticated, userController.putUserById)
  .delete(authController.isAuthenticated, userController.deleteUserById);

router.route('/projects')
  .post(authController.isAuthenticated, projectController.postProject);

router.route('/projects/:userID')
  .get(projectController.getProjectsForUser);

router.route('/project/:projectID')
  .get(projectController.getProjectById)
  .put(authController.isAuthenticated, projectController.putProjectById)
  .delete(authController.isAuthenticated, projectController.deleteProjectById);

router.route('/opencalls')
  .get(opencallController.getOpenCalls)
  .post(authController.isAuthenticated, opencallController.postOpenCall);

router.route('/opencalls/:userID')
  .get(opencallController.getOpenCallsByOwner);

router.route('/opencalls/attendee/:userID')
  .get(authController.isAuthenticated, opencallController.getOpenCallsByAttendeeId);

router.route('/opencall/:opencallID')
  .get(opencallController.getOpenCallById)
  .put(authController.isAuthenticated, opencallController.putOpenCallById)
  .delete(authController.isAuthenticated, opencallController.deleteOpenCallById);

router.route('/authenticate')
  .post(authController.authenticateUser);

router.route('/image')
  .post(authController.isAuthenticated, upload.any(), Utils.uploadImage);

router.route('/attendees')
  .post(authController.isAuthenticated, attendeeController.sendOrganiserMail);

// Register all our routes with /api
app.use('/api', router);

app.all('/*', function (req, res) {
  res.redirect(process.env.redirect);
});

// Start the server
app.listen(process.env.PORT || 5000);
