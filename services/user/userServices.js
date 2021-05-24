const userModel = require('../../data/user/userModel')
let jwt = require('jsonwebtoken');


exports.getUsers = function (req, res) {
  var token=req.headers.authorization.split(" ")[1]
      jwt.verify(token, 'secret', function(err, decoded) {
      if(err) res.json(err);
      else{
     userModel.findOne({email:decoded.user.email,password:decoded.user.password}, function (err, user) {
      if (null!==user){
             userModel.get(function (err, users) {
        if (err) {
            res.json({
                status: "ERROR",
                responseDesc: err,
            });
        }
        res.json(users);
    });
      }
      else
      res.json({MESSAGE:"AUTH ERROR"})
    });
      }
});
}

exports.getUserById = function (req, res) {
    var token=req.headers.authorization.split(" ")[1]
      jwt.verify(token, 'secret', function(err, decoded) {
      if(err) res.json(err);
      else{
      userModel.findOne({email:decoded.user.email,password:decoded.user.password}, function (err, user) {
      if (null!==user){
          userModel.findById(req.params.id, function (err, user) {
       if (err) {
            res.json({
                status: "ERROR",
                responseDesc: err,
            });
        }
        res.json(user);
    });
      }
      else
      res.json({MESSAGE:"AUTH ERROR"})
       
    });
      }
});
}


exports.auth = function (req, res) {
  var headAuth= req.headers.authorization.split(" ")
  var login=Buffer.from(headAuth[1], 'base64').toString('utf-8').split(":")
    console.log(login)
    userModel.findOne({email:login[0],password:login[1]}, function (err, user) {
      if (null!==user){
          res.json({token:jwt.sign({ user }, 'secret')})
      }
      else
      res.json({MESSAGE:"USER NOT FOUND"})
       
    });
}


exports.addUser = function (req, res) {
    req.body.base64=Buffer.from(`${req.body.email}:${req.body.password}`,'utf-8').toString('base64')
    userModel.create(req.body, function (err, user) {
  if (err) return handleError(err);
   res.json(user);
});
}


exports.updateUser = function (req, res) {
    var token=req.headers.authorization.split(" ")[1]
  
    jwt.verify(token, 'secret', function(err, decoded) {
      if(err) res.json(err);
      else{
         userModel.findByIdAndUpdate(decoded.user._id,{$set: req.body}, {new: true, useFindAndModify: false})
    .then(user=>{
         res.json(user);
    }).catch(err=>{
         res.json(err);
    })
      }
});
 
}