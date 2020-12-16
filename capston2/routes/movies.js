var express = require('express');
var router = express.Router();
var models = require('../models');
const exec = require("child_process").exec

router.get('/', function(req, res, next){
    //const {stdout, stderr} = await exec('spark-shell -i test.scala  --driver-class-path mysql-connector-java-8.0.22.jar --jars mysql-connector-java-8.0.22.jar');
    exec('spark-shell -i test.scala  --driver-class-path mysql-connector-java-8.0.22.jar --jars mysql-connector-java-8.0.22.jar', function(err, stdout, stderr){
        console.log(stdout);
    })
    res.send({title:'fwef'});
})

module.exports = router;