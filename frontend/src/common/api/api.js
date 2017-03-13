angular
.module( 'api', [])
.service('Api', Api);

function Api($http) {

  var baseUrl = 'https://livingroomart.herokuapp.com/api/';

  function login(credentials) {
    return $http({
      method: 'POST',
      url: baseUrl + 'authenticate',
      data: credentials
    });
  }

  function register(newUser) {
    return $http({
      method: 'POST',
      url: baseUrl + 'users',
      data: newUser
    });
  }

  function uploadImage(image) {
    var fd = new FormData();
    fd.append('files', image);

    return $http({
      method: 'POST',
      url: baseUrl + 'image',
      data: fd,
      transformRequest: angular.identity,
      headers: {'Content-Type': undefined}
    });
  }

  function sendEmailToAttendees(_event, text) {
    return $http({
      method: 'POST',
      url: baseUrl + 'attendees',
      data: {_event: _event, text: text}
    });
  }

  // -------- SPACES ----------- //
  function getAllSpaces() {
    return $http({
      method: 'GET',
      url: baseUrl + 'spaces'
    });
  }

  function addSpace(space) {
    return $http({
      method: 'POST',
      url: baseUrl + 'spaces',
      data: space
    });
  }

  function saveSpace(space) {
    return $http({
      method: 'PUT',
      url: baseUrl + 'space/' + space._id,
      data: space
    });
  }

  function deleteSpace(spaceID) {
    return $http({
      method: 'DELETE',
      url: baseUrl + 'space/' + spaceID
    });
  }

  function getSpaceById(spaceID) {
    return $http({
      method: 'GET',
      url: baseUrl + 'space/' + spaceID
    });
  }
  // -------- /SPACES ----------- //
  // -------- EVENTS ----------- //
  function getAllEvents() {
    return $http({
      method: 'GET',
      url: baseUrl + 'events'
    });
  }

  function addEvent(_event) {
    return $http({
      method: 'POST',
      url: baseUrl + 'events',
      data: _event
    });
  }

  function saveEvent(_event) {
    return $http({
      method: 'PUT',
      url: baseUrl + 'event/' + _event._id,
      data: _event
    });
  }

  function deleteEvent(eventID) {
    return $http({
      method: 'DELETE',
      url: baseUrl + 'event/' + eventID
    });
  }

  function getEventById(eventID) {
    return $http({
      method: 'GET',
      url: baseUrl + 'event/' + eventID
    });
  }
  // -------- /EVENTS ----------- //
  // -------- USERS ----------- //
  function getAllArtists() {
    return $http({
      method: 'GET',
      url: baseUrl + 'users'
    });
  }

  function saveUser(user) {
    return $http({
      method: 'PUT',
      url: baseUrl + 'users/' + user._id,
      data: user
    });
  }

  function deleteUser(userID) {
    return $http({
      method: 'DELETE',
      url: baseUrl + 'users/' + userID
    });
  }

  function getUserById(userID) {
    return $http({
      method: 'GET',
      url: baseUrl + 'users/' + userID
    });
  }
  // -------- /USERS ----------- //
  // -------- PROJECTS ----------- //
  function getAllProjectsForUser(userID) {
    return $http({
      method: 'GET',
      url: baseUrl + 'projects/' + userID
    });
  }

  function addProject(project) {
    return $http({
      method: 'POST',
      url: baseUrl + 'projects',
      data: project
    });
  }

  function saveProject(project) {
    return $http({
      method: 'PUT',
      url: baseUrl + 'project/' + project._id,
      data: project
    });
  }

  function deleteProject(projectID) {
    return $http({
      method: 'DELETE',
      url: baseUrl + 'project/' + projectID
    });
  }

  function getProjectById(projectID) {
    return $http({
      method: 'GET',
      url: baseUrl + 'project/' + projectID
    });
  }
  // -------- /PROJECTS ----------- //
  // -------- OPENCALLS ----------- //
  function getAllOpenCalls() {
    return $http({
      method: 'GET',
      url: baseUrl + 'opencalls'
    });
  }

  function addOpenCall(opencall) {
    return $http({
      method: 'POST',
      url: baseUrl + 'opencalls',
      data: opencall
    });
  }

  function saveOpenCall(opencall) {
    return $http({
      method: 'PUT',
      url: baseUrl + 'opencall/' + opencall._id,
      data: opencall
    });
  }

  function deleteOpenCall(opencallID) {
    return $http({
      method: 'DELETE',
      url: baseUrl + 'opencall/' + opencallID
    });
  }

  function getOpenCallById(opencallID) {
    return $http({
      method: 'GET',
      url: baseUrl + 'opencall/' + opencallID
    });
  }
  // -------- /OPENCALLS ----------- //
  // -------- DASHBOARD ----------- //
  function getEventsByUserId(userID) {
    return $http({
      method: 'GET',
      url: baseUrl + 'events/' + userID
    });
  }

  function getEventsByAttendeeId(userID) {
    return $http({
      method: 'GET',
      url: baseUrl + 'events/attendee/' + userID
    });
  }

  function getOpenCallsByOwnerId(userID) {
    return $http({
      method: 'GET',
      url: baseUrl + 'opencalls/' + userID
    });
  }

  function getOpenCallsByAttendeeId(userID) {
    return $http({
      method: 'GET',
      url: baseUrl + 'opencalls/attendee/' + userID
    });
  }

  function getSpacesByUserId(userID) {
    return $http({
      method: 'GET',
      url: baseUrl + 'spaces/' + userID
    });
  }
  // -------- /DASHBOARD ----------- //

  return {
    login: login,
    register: register,
    uploadImage: uploadImage,
    sendEmailToAttendees: sendEmailToAttendees,
    getAllSpaces: getAllSpaces,
    addSpace: addSpace,
    saveSpace: saveSpace,
    deleteSpace: deleteSpace,
    getSpaceById: getSpaceById,
    getAllEvents: getAllEvents,
    addEvent: addEvent,
    saveEvent: saveEvent,
    deleteEvent: deleteEvent,
    getEventById: getEventById,
    getAllOpenCalls: getAllOpenCalls,
    addOpenCall: addOpenCall,
    saveOpenCall: saveOpenCall,
    deleteOpenCall: deleteOpenCall,
    getOpenCallById: getOpenCallById,
    getAllArtists: getAllArtists,
    saveUser: saveUser,
    deleteUser: deleteUser,
    getUserById: getUserById,
    getAllProjectsForUser: getAllProjectsForUser,
    addProject: addProject,
    saveProject: saveProject,
    deleteProject: deleteProject,
    getProjectById: getProjectById,
    getEventsByUserId: getEventsByUserId,
    getEventsByAttendeeId: getEventsByAttendeeId,
    getOpenCallsByAttendeeId: getOpenCallsByAttendeeId,
    getOpenCallsByOwnerId: getOpenCallsByOwnerId,
    getSpacesByUserId: getSpacesByUserId
  };
}
