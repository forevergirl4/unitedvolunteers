var mongoose = require('mongoose');
var User = require('../models/users');

module.exports.signup = function (req, res){
    var user = new User(req.body);
    user.save(function(err, user) {
        if (err) return console.error(err);
        console.log('ang galing mo ems! nag save siya!!!');
        console.dir(user);
    });
    res.json(req.body);
}

module.exports.login = function(req, res){
    User.find(req.body, function (err, results){
        if(err){
            console.log('Error out');
        }

        if(results && results.length === 1){
            var userData = results[0];
            res.json({username: req.body.username,
            _id: userData._id});
        }
    })
}