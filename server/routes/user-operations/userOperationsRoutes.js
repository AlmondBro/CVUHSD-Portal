import fs from 'fs';
import path from 'path';
import { Router } from 'express';
import passport from 'passport';

import AD from 'ad';

import isDev from 'isdev';

let router = Router();

const username = process.env.ADFS_USER_NAME;
const password = process.env.ADFS_USER_PASSWORD;

const ad_config = {
  url: process.env.ADFS_SERVER_URL,
  user: username,
  pass: password
};

const activeDirectory = new AD(ad_config);

router.put('/password/update', async (req, res) => {
    let message, error;

    let { email, currentPassword, newPassword } = req.body;
    

    const isAuthenticated = await activeDirectory.user(email).isAuthenticated(currentPassword);


    let { success: authenticateSuccess } = isAuthenticated;

    if (authenticateSuccess === true) {
      message = "Authenticate successful"
      error   = null;

      const passwordChangeSuccess = await activeDirectory.user(email).password(newPassword);
      console.log("passwordChangeSuccess", passwordChangeSuccess);
    }

    return res.json({ message: message, error: error});
}); //end 

module.exports = router;