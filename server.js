var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var authenticationController = require('./app/modules/newUsers/server/controllers/authenticationcontroller');
var app = express();

mongoose.connect('mongodb://localhost:27017/unitedvolunteers');
mongoose.connection.on('connected', function () {
    console.log('Mongoose connected');
});
mongoose.connection.on('error',function (err) {
    console.log('Mongoose connection error: ' + err);
});
mongoose.connection.on('disconnected', function () {
    console.log('Mongoose disconnected');
});
process.on('SIGINT', function() {
    mongoose.connection.close(function () {
        console.log('Mongoose disconnected through app termination');
        process.exit(0);
    });
});
app.use(bodyParser.json());
app.use('/app', express.static(__dirname + "/app"));
app.use('/theme', express.static(__dirname + "/theme"));
app.use('/node_modules', express.static(__dirname + "/node_modules"));

app.get('/', function(req, res){
    res.sendfile('app/modules/index/client/views/index.html');
})

//authentication
app.post('/api/newUsers/client/views/signup', authenticationController.signup);
app.post('/api/index/client/views/index', authenticationController.login);
app.listen('3000', function () {
    console.log("Listening to port 3000 :D yey yey yey maria maria maria magdiwang!!!");
})