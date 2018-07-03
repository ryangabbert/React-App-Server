const router = require('express').Router();
const sequelize = require('../db')
const User = sequelize.import('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.post('/signup', (req, res) => {
console.log(req.body)
  var username = req.body.User.user_name;
  var pass = req.body.User.password;
  var email = req.body.User.email;
  User.create({
      user_name: username,
      password: bcrypt.hashSync(pass, 10),
      email: email
  }).then(
      function createSuccess(user){
          console.log(process.env.JWT_SECRET)
          var token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: 60*60*24});
          res.json({
              user: user,
              message: 'created',
              sessionToken: token
          });
      },
      function createError(err) {
          res.json(500, err.message);
      }
  );
});
 
router.post('/login', function(req, res) {
    console.log(req.body)
  User.findOne( { where: { user_name: req.body.User.user_name } } ).then(
      function(user) {
          if(user) {
              bcrypt.compare(req.body.User.password, user.password, function (err, matches) {
                  if(matches){
                      var token = jwt.sign({id: user.id}, process.env.JWT_SECRET, { expiresIn: 60*60*24});
                      res.json({
                          user: user,
                          message: "successfully authenticated",
                          sessionToken: token
                      });
                  } else {
                      res.status(502).send({ error: "you failed, yo"})
                  }
              });
          } else {
              res.status(500).send({ error: "failed to authenticate"});
          }
      },
      function (err) {
          res.status(501).send({ error: "you failed, yo"});
      }
  );
});
module.exports = router;