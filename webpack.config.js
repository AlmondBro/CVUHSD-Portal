const path = require('path');

module.exports = {
  mode: "development",
  entry: "./js/logic.js",
  devServer: {
    contentBase: path.join(__dirname),
    compress: true,
    port: 3002,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
    }
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'js')
  },
  module: {
    rules: [
      { test: /\.js$/, loader: "babel-loader" }
    ]
  },
  target: "node"
};

//path: path.resolve(__dirname, 'dist')