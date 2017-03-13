var Project = require('../models/project');

var setProject = function(project, newProject) {
  project.userID = newProject.userID;
  project.name = newProject.name;
  project.category = newProject.category;
  project.description = newProject.description;
  project.creationDate = newProject.date ? newProject.date : new Date();
  project.picture = newProject.picture;
  project.url = newProject.url;
  project.from = newProject.from ? newProject.from : undefined;
  project.to = newProject.to ? newProject.to : undefined;
  return project;
}

exports.getProjectsForUser = function(req, res) {
  Project.find({ userID: req.params.userID }, function(err, projects) {

    if(err) {
      return res.status(500).send({
        success: false,
        error: 'Something went wrong.'
      });
    }

    res.json({ status: 200, success: true,  message: 'Here, the projects you were looking for!', data: projects });
  });
};

exports.postProject = function(req, res) {
  var project = new Project();

  project = setProject(project, req.body);

  project.save(function(err) {
    if(err) {
      return res.status(500).send({
        success: false,
        error: err
      });
    }

    res.json({ status: 200, success: true,  message: 'Hurray, we have a new project in our Database!'});
  });
};

exports.putProjectById = function(req, res) {
  Project.findById({ _id: req.params.projectID }, function(err, project) {
    if (err) {
      return res.status(500).send({
        success: false,
        error: 'Something went wrong.'
      });
    }

    project = setProject(project, req.body);

    project.save(function(err) {
      if (err) {
        return res.status(500).send({
          success: false,
          error: err
        });
      }

      res.json({ status: 200, success: true,  message: 'The project was updated successfully.', data: project });
    });
  });
};

exports.getProjectById = function(req, res) {
  Project.findById({ _id: req.params.projectID }, function(err, project) {
    if(err) {
      return res.status(500).send({
        success: false,
        error: 'Something went wrong.'
      });
    }

    if(project === null) {
      return res.status(404).send({
        success: false,
        error: 'No project found.'
      });
    }

    res.json({ status: 200, success: true,  message: 'Here is the project you wanted, human.', data: project });
  });
};

exports.deleteProjectById = function(req, res) {
  Project.findOne({ _id: req.params.projectID }, function(err, project) {
    if (err) {
      return res.status(500).send({
        success: false,
        error: 'Could not find project you want to delete.'
      });
    }

    project.remove(function(err) {
      if (err) {
        return res.status(500).send({
          success: false,
          error: 'Something went wrong.'
        });
      }

      res.json({ status: 200, success: true, message: 'Project removed.', data: project });
    });
  });
};
