const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
//const UglifyJsPlugin = require('uglifyjs-webpack-plugin');


module.exports = {
  mode: "development", // development or production
  entry: { "js/logic.bundle.js": "./js/logic.js",
           "service-worker.bundle.js": "./service-worker.js" 
         },
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
    filename: 'dist/[name]',
    path: path.resolve(__dirname)
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
  plugins: [
    new HtmlWebpackPlugin({
      title: "staff-prod.html",
      filename: "dist/staff.html"
    })
  ],
 target: "web" //web or node
};

//path: path.resolve(__dirname, 'dist')