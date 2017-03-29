var express = require('express');
var router = express.Router();

var firebase = require('firebase');
// var app = firebase.initializeApp(config);
var db = firebase.database();
var ref = db.ref('cheks')

router.post('/', function(req, res) {
  //TODO: validate object from req
  //var fields = ['user', 'content', 'source', 'feedback', 'parent_source']

  var id = ref.push(req.body);

  console.log(req.body);

  res.header("Access-Control-Allow-Origin", "*");
  res.send('OK');
});

router.get('/', function(req, res) {
  res.sendStatus(404);
});

module.exports = router;
