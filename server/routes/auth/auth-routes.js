import fs from 'fs';
import path from 'path';
import { Router } from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';

const router = Router();

var adfsSigningPublicKey = fs.readFileSync(path.join(__dirname, './../../../certificates/ADFS_Signing.crt')); // Exported from ADFS

const validateAccessToken = (accessToken) => {
    let payload = null;

    try {
        payload = jwt.verify(accessToken, adfsSigningPublicKey);
    }
    catch(e) {
        console.warn('Dropping unverified accessToken', e);
    }
    return payload;
}; //end //validateAccessToken

router.get('/login', passport.authenticate('provider'));

router.get('/callback', passport.authenticate('provider'), async (req, res) => {
    // Beware XSRF...
    res.cookie('accessToken', req.user);

    const accessToken = req.user;
    const userInfo = validateAccessToken(accessToken);
  
    res.json({ ...userInfo, accessToken });
    return;
});

router.get('/logout', function (req, res) {
    res.clearCookie('accessToken');
    res.redirect(process.env.ADFS_SIGN_OUT);

    return;
}); 

module.exports = router;