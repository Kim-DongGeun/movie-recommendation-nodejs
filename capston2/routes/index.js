var express = require('express');
var router = express.Router();




/* GET home page. */
router.post('/', function(req, res, next) {
  console.log(typeof(req.body))
  var data = JSON.stringify(req.body)
  console.log(data);
  res.send({title: 'hello react'});
});

module.exports = router;
