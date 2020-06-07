var express = require('express');
var app = express();
var path = require('path');
const fs = require('fs');
const paths = require("../../config/paths");

import React from 'react';
import { renderToString } from "react-dom/server";
import App from "../App"
// const filePath = `${paths.appBuild}/index.html`;
// const htmlData = readFileSync(filePath,'utf8');

// console.log(htmlData)
// viewed at http://localhost:8080
app.use('/', express.static('/home/prince/Documents/SE2/software-engineering-2/build'))

app.get(/^[^.]+$|\.(?!(js|ico|map|css|json)$)([^.]+$)/, (req, res) => {
    const app = renderToString(<App />);
  console.log(app)
    const indexFile = path.resolve( `${paths.appBuild}/index.html`);
    fs.readFile(indexFile, 'utf8', (err, data) => {
      if (err) {
        console.error('Something went wrong:', err);
        return res.status(500).send('Oops, better luck next time!');
      }
  
      return res.send(
        data.replace('<div id="root"></div>', `<div id="root">${app}</div>`)
      );
    });
  });
app.listen(8081, () => {
    console.log(`App launched on`)});