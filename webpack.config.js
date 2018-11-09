const path = require('path');
//const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
//const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development", // development or production
  entry: "./js/logic.js",
  devtool: "inline-source-map", // https://webpack.js.org/configuration/devtool/
  devServer: {
    contentBase: path.resolve(__dirname),
    inline: true,
    hot: true,
    open: false,
    compress: true,
    port: 3002,
    headers: {
      "Access-Control-Allow-Origin": "http://localhost:3002",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization",
      "Service-Worker-Allowed": "/"
    }
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'js')
  },
  module: {
    rules: [
      { 
        test: /\.js$/, 
        use: { loader: "babel-loader" },
        exclude: /node_modules/ 
      }
    ]
  },
  node: {
    fs: "empty"
 },
 target: "web" //web or node
};

//path: path.resolve(__dirname, 'dist')