const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
//const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

/*
 inline: true,
    hot: true, 

    //dev-server 
*/
module.exports = {
  mode: "development", // development or production
  entry: { "js/logic.bundle.js": "./js/logic.js",
           "service-worker.bundle.js": "./service-worker.js"
         },
  devtool: "inline-source-map", // https://webpack.js.org/configuration/devtool/
  devServer: {
    contentBase: path.resolve(__dirname, "dist"),
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
    filename: '[name]',
    path: path.resolve(__dirname, "dist")
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
      filename: "dist/staff.html",
      template: "staff.html"
    }),
    new CopyWebpackPlugin([ { from: "css/font-awesome.min.css", to: "dist/css/font-awesome.min.css"},
                            { from: "css/grid-system.css", to: "dist/css/grid-system.css" },
                            { from: "css/style.css", to: "dist/css/style.css" },
                            { from: "css/style-red.css", to: "dist/css/style-red.css" },
                            { from: "images/*", to: "dist"},
                            { from: "images/*/**", to: "dist"},
                            { from: "js/staff-manifest.json", to: "dist/js/staff-manifest.json"}
                          ], { debug: "info"}),
    new HtmlWebpackIncludeAssetsPlugin({ assets: ['css/font-awesome.min.css',
                                                  'css/grid-system.css',
                                                  'css/style.css',
                                                 ], 
                                         append: true })
   
  ],
 target: "web" //web or node
};

//path: path.resolve(__dirname, 'dist')