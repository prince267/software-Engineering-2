var express = require('express');
var app = express();
var path = require('path');
const { readFileSync  } = require('fs');
const paths = require("../../config/paths");

const filePath = `${paths.appBuild}/index.html`;
const htmlData = readFileSync(filePath,'utf8');
console.log(htmlData)
// viewed at http://localhost:8080
app.use('/', express.static('/home/prince/Documents/SE2/software-engineering-2/build'))
// app.get('/', function(req, res) {
//     res.sendFile("/home/prince/Documents/SE2/software-engineering-2/build/index.html");
// });

app.listen(8080, () => {
    console.log(`App launched on`)});