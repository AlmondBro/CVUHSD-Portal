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

router.get('/login-ie', (req, res) => {
    return res.json({ url: `https://sso.centinela.k12.ca.us/adfs/oauth2/authorize?resource=http%3A%2F%2Flocalhost%3A3000%2F&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fauth-success&client_id=2ea7058a-3b74-428d-8829-30c4101bdc9c`});
});

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