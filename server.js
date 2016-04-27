'use strict';
var express = require('express');
var mongoose = require('mongoose');
var multer = require('multer');
var app = express();
var data = multer();


app.use(express.static('public'));

mongoose.connect('mongodb://localhost:27017/contact_app');

// connect to db, define schema
var db = mongoose.connection;
var Contact; // model
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  var contactSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    email: String,
    message: String
  });
  Contact = mongoose.model('Contact', contactSchema);
  /*
  var contact = new Contact({first_name: 'Kyle', last_name: 'Paulson',
    email:'kypaulson@email.com'});
  //console.log(contact.first_name);
  contact.save(function(err, contact) {
    if (err)
      return console.error(err);
  });
  */
});

app.post('/signup', data.fields(), function(req, res) {
  // get user information
  // check if user is already in database
  // add user to database if not already in it
  console.log('req.body');
  console.log(req.body);
  console.log('data.fields()');
  console.log(data.fields());
  res.send('got it');
});

app.listen(8080, function() {
  console.log('listening on port 8080');
});
