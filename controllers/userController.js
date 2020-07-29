var db = require('./../models/index');

var jwt = require('express-jwt');
var passport=require('passport');
var auth = jwt({secret:'SECRET',algorithms: ['HS256'],userProperty:'payload'});

const userController={};

// userController.post = (req, res)=>{
//     const { username,password } = req.body;

//     //Validation
    
//     const user= new db.User({
//         username,
//         password
//     });

//     user.save().then((newUser)=>{
//         res.status(200).json({
//             success:true,
//             data:newUser,
//         });
//     }).catch((err)=>{
//         res.status(500).json({
//             //success:false,
//             message:err,
//         });
//     });
//}

///////

//register function
userController.register = function(req, res, next){
    if(!req.body.username || !req.body.password){
      return res.status(400).json({message: 'Please fill out all fields'});
    }
  
    var user = new db.User();
  
    user.username = req.body.username;
    user.setPassword(req.body.password);
  
    user.save(function (err){
      if(err){ return next(err); }
  
      return res.json({token: user.generateJWT()})
    });
  };
  
//login function
userController.login=function(req, res, next){
    if(!req.body.username || !req.body.password){
      return res.status(400).json({message: 'Please fill out all fields'});
    }
  
    passport.authenticate('local', function(err, user, info){
        //somehow knows to grab the user information from the req.body?
      if(err){ return next(err); }
  
      if(user){
        return res.json({token: user.generateJWT()});
      } else {
        return res.status(401).json(info);
      }
    })(req, res, next);
  
  };

  /////////

module.exports = userController;