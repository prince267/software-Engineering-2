var express = require('express');
var app = express();
var path = require('path');
// const paths = require("../../config/paths");
// // console.log(paths.appBuild)
// viewed at http://localhost:8080
app.use('/', express.static('/home/prince/Documents/SE2/software-engineering-2/build'))
// app.get('/', function(req, res) {
//     res.sendFile("/home/prince/Documents/SE2/software-engineering-2/build/index.html");
// });

app.listen(8080);