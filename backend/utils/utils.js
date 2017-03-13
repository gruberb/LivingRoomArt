var aws = require('aws-sdk');
var uuid = require('node-uuid');
var mailjet = require ('node-mailjet')
  .connect(process.env.mail_jet_api_key, process.env.mail_jet_secret);

var AWS_ACCESS_KEY = process.env.AWS_ACCESS_KEY;
var AWS_SECRET_KEY = process.env.AWS_SECRET_KEY;
var S3_BUCKET = process.env.S3_BUCKET

exports.uploadImage = function(req, res) {
  aws.config.update({accessKeyId: AWS_ACCESS_KEY, secretAccessKey: AWS_SECRET_KEY});
  var s3 = new aws.S3({signatureVersion: 'v4'});
  var key = uuid.v4();
  var image = req.files[0];
  var s3_params = {
    Bucket: S3_BUCKET,
    Key: key,
    ContentType: image.mimetype,
    ACL: 'public-read',
    Body: image.buffer
  };

  return s3.putObject(s3_params, function(err, data) {
    if(err) {
      console.log(err);
      res.json({ status: 500, success: false,  message: err});
    } else {
      console.log('success', key);
      res.json({
        status: 200,
        success: true,
        message: 'Image uploaded',
        data: 'https://'+ S3_BUCKET +'.s3.amazonaws.com/' + key
      });
    }
  });
};

exports.sendMail = function(subject, text, recipient) {

  var handleError = function(err) {
    throw new Error(err.ErrorMessage);
  }

  email = {};
  email['FromName'] = 'Livingroomart';
  email['FromEmail'] = 'foreach@me.com';
  email['Subject'] = subject;
  email['Recipients'] = [{Email: recipient}];
  email['Html-Part'] = text;

  mailjet.post('send')
  .request(email)
  .on('error', handleError);

};

exports.removeElement = function(array, element) {
  for (var i = 0; i < array.length; i++) {
    if (array[i]['userID'] == element) {
      array.splice(i, 1);
      return;
    }
  }
  console.log('array', array);
  return array;
};
