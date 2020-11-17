import { Router } from 'express';
import AD from 'ad';

let router = Router();

const username = process.env.ADFS_USER_NAME;
const password = process.env.ADFS_USER_PASSWORD;

const ad_config = {
  url: process.env.ADFS_SERVER_URL,
  user: username,
  pass: password
};

const activeDirectory = new AD(ad_config);

router.post('/password/update', async (req, res) => {
    let message, error = null;

    let { username, currentPassword, newPassword } = req.body;

    const isAuthenticated = await activeDirectory.user(username).authenticate(currentPassword)
                            .catch((error) => { 
                              message = error.description || error;
                              error   = true;
                          });

    if (isAuthenticated === true) {
      let changePasswordResult = await activeDirectory.user(username).password(newPassword)
                                         
      console.log("\n\nchangePasswordResult:\t", changePasswordResult);

      if (changePasswordResult.success === true) {
        message = "Password Change Successful";
        error   = false;
      } else {
        message = changePasswordResult;
        error   = true;
      } 
    } else {
      message = "Current password incorrect";
      error   = true;
    } //end if-else statement checking if normal password authentication was okay

    return res.json({ message, error: error});
}); //end 

module.exports = router;