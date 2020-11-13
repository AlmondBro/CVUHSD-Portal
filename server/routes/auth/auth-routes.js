import fs from 'fs';
import path from 'path';
import { Router } from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';

import rateLimiter from 'express-rate-limit';

import isDev from 'isdev';

const router = Router();

const limiter = rateLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 70 // limit each IP to 100 requests per windowMs
}); //end rateLimiter()

const adfsSigningPublicKey = fs.readFileSync(path.join(__dirname, './../../../certificates/ADFS_Signing.crt')); // Exported from ADFS

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

router.use(limiter);

router.get('/login-ie', (req, res) => {
    return res.json(
                        { 
                            url: `${process.env.OAUTH_AUTH_URL}?resource=${encodeURIComponent("http://localhost:3000")}&response_type=${encodeURIComponent("code")}&redirect_uri=${isDev ? encodeURIComponent(process.env.OAUTH_CALLBACK_URL_DEV) : encodeURIComponent(process.env.OAUTH_CALLBACK_URL_PROD)}&client_id=${encodeURIComponent(process.env.OAUTH_CLIENT_ID)}`
                        }
                    );
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