import { Router } from 'express';
import AD from 'ad';

import isDev from 'isdev';

const router = Router();

let ad_config = {
  url: process.env.ADFS_SERVER_URL,
  user: process.env.ADFS_USER_NAME,
  pass: process.env.ADFS_USER_PASSWORD
};

const activeDirectory = new AD(ad_config);


/* === ROUTES === */

//Need to use absolute paths relative to where the web.config file is when using Express in IISNode. 
// If not using url rewrite, specifiy extension
let aboutIISNode_URL = `${isDev ? "" : "/server"}/about-IIS-Node`;
router.get(aboutIISNode_URL,  (req, res)  =>{
  res.send(`IISNode version:\t ${process.env.IISNODE_VERSION} 
            \n NodeJS version:\t ${process.version}
            \n isDev:\t ${isDev}`); 
}); 

const getOU_URL = `${isDev ? "" : "/server" }/getOU`;

let getOU = async (req, res, next) =>  {

  console.log("getOu()");

  let userLocation = "";

  let { user } = req.body;
  
  console.log("\nUser\t\n" + user);

  userLocation = await activeDirectory.user(user).location();

  let waitInterval = 2000; //2k milliseconds -- 2 seconds
  setTimeout(() => { 
                    console.log("userLocation:\t" + userLocation); 
                    res.json(userLocation); 
                  }, waitInterval
            ); 
}; //end getOU()

router.post(getOU_URL, getOU);

const redirectToExpoAuth_URL = `${isDev ? "" : "/server" }/mobile-app-auth`;

let redirectToExpoAuth = (req, res, next) =>  {
  let queryString = req._parsedUrl.query;
  let expoRedirectURL = process.env.EXPO_REDIRECT_URL;

  res.redirect(expoRedirectURL + queryString);
}; //end getOU()

router.get(redirectToExpoAuth_URL, redirectToExpoAuth);

module.exports = router;