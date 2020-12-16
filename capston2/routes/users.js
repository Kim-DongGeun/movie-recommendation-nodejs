var express = require('express');
var router = express.Router();
var models = require('../models');
var crypto = require('crypto');

router.get('/signup', function(req, res, next){
  res.render('signup');
})

router.post('/signup', async function(req, res, next){
  let body = req.body;
  let user = await models.users.findOne({
    where:{
      email: body.Email
    }
  });

  if(user){
    res.json({
      message: '이메일이 중복되었습니다.',
      duplicate: '1'
    })
  }
  else{
    let inputPassword = body.Password;
    let salt = Math.round((new Date().valueOf() * Math.random())) + "";
    let hashPassword = crypto.createHash("sha512").update(inputPassword + salt).digest("hex");
    console.log(`salt ${salt}`);
    console.log(`hash ${hashPassword}`);
  
    models.users.create({
        email: body.Email,
        password: hashPassword,
        salt: salt
    })

    res.json({
      message: '회원가입 성공!',
      duplicate: '0'
    })
  }

  //res.redirect("signup");
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

  let result = await models.users.findOne({
    where:{
      email:body.Email
    }
  })

  if(result === undefined){
    res.json({
      message: '존재하지 않는 계정입니다.'
    })
  }
  else{
    let dbPassword = result.dataValues.password;
    let inputPassword = body.Password;
    let salt = result.dataValues.salt;
    let hashPassword = crypto.createHash("sha512").update(inputPassword + salt).digest("hex");
    console.log(`salt  ${salt}`);
    console.log(hashPassword);
    console.log(dbPassword);
    if(dbPassword === hashPassword){
      console.log("비밀번호 일치");
      req.session.email = body.userEmail;
      /*res.cookie('users', body.userEamil, {
        expires: new Date(Date.now() + 900000), // 유효시간
        httpOnly: true
      })*/
      /*res.cookie('loginId', body.Email, {
        expires: new Date(Date.now() + 900000), // 유효시간
        httpOnly: true
      });*/
      res.json({
        message: '로그인 되었습니다.',
        login: '1'
      });
    }
    else{
      console.log("비밀번호 불일치");
      res.json({
        message: '비밀번호가 일치하지 않습니다.',
        login: '0'
      })
    }

  }


})

router.get('/logout', function(req, res, next){
  req.session.destroy();
  res.clearCookie('sid');

  res.redirect('login');
})

module.exports = router;
