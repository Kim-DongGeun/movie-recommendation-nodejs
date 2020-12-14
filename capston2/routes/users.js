var express = require('express');
var router = express.Router();
var models = require('../models');
var crypto = require('crypto');

router.get('/signup', function(req, res, next){
  res.render('signup');
})

router.post('/signup', async function(req, res, next){
  let body = req.body;
  
  let inputPassword = body.password;
  let salt = Math.round((new Date().valueOf() * Math.random())) + "";
  let hashPassword = crypto.createHash("sha512").update(inputPassword + salt).digest("hex");

  let result = models.user.create({
      name: body.userName,
      email: body.userEmail,
      password: hashPassword,
      salt: salt
  })

  res.redirect("signup");
})


router.get('/', function(req, res, next) {
  if(req.cookies){
    console.log(req.cookies);
  }
  res.send('respond with a resource');
});

router.get('/login', function(req, res, next){
  res.render('login', {
    session: req.session
  });
})

router.post('/login', async function(req, res, next){
  let body = req.body;

  let result = await models.user.findOne({
    where:{
      email:body.userEmail
    }
  })

  let dbPassword = result.dataValues.password;
  let inputPassword = body.password;
  let salt = result.dataValues.salt;
  let hashPassword = crypto.createHash("sha512").update(inputPassword + salt).digest("hex");

  if(dbPassword === hashPassword){
    console.log("비밀번호 일치");
    req.session.email = body.userEmail;
    /*res.cookie('users', body.userEamil, {
      expires: new Date(Date.now() + 900000), // 유효시간
      httpOnly: true
    })*/
    res.redirect('/users');
  }
  else{
    console.log("비밀번호 불일치");
    res.redirect('login');
  }
})

router.get('/logout', function(req, res, next){
  req.session.destroy();
  res.clearCookie('sid');

  res.redirect('login');
})

module.exports = router;
