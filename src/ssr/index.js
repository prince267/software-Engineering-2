require("../../config/env");
require('ignore-styles')

// require('@babel/register')({
//   ignore: [/(node_modules)/],
//   presets: ['@babel/preset-env', '@babel/preset-react','react-app'],
//   plugins:['transform-es2015-modules-commonjs']
// })
require('@babel/register')({
    ignore: [/(node_modules)/],
    presets: ['@babel/preset-env', '@babel/preset-react'],
    plugins :['@babel/plugin-proposal-export-namespace-from']
  })
require('./ssr')
