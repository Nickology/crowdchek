var express = require('express');
var router = express.Router();

// var config = require("../firebase.json");
var firebase = require('firebase');
var db = firebase.database();
var ref = db.ref('cheks')

router.get('/', function(req, res) {
  var results = []

  // ref.on('child_added', function(data) {
  //   var chek = data.val()
  //   results.push(chek);
  // });

  res.render('admin', { results: results });
});

module.exports = router;
