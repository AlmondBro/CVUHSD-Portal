
//TODO: Fix serialize errors upon improper authentication

const path = require('path'),
      AD = require('ad');

      require('dotenv').config({path: path.join(__dirname, './../../.env'), debug: false}) //Load environmental variables


const username = process.env.ADFS_USER_NAME;
const pass = process.env.ADFS_USER_PASSWORD;

let ad_config = {
  url: process.env.ADFS_SERVER_URL,
  user: username,
  pass: pass
};

const activeDirectory = new AD(ad_config);


module.exports = { activeDirectory};