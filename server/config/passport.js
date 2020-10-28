import isDev from 'isdev';
import passport from 'passport';
import { OAuth2Strategy }  from 'passport-oauth';

// Configure passport to integrate with ADFS
const strategy = new OAuth2Strategy({
        authorizationURL: process.env.OAUTH_AUTH_URL,
        tokenURL: process.env.OAUTH_TOKEN_URL,
        clientID: process.env.OAUTH_CLIENT_ID, // This is just a UID I generated and registered
        clientSecret: process.env.OAUTH_CLIENT_SECRET, // This is ignored but required by the OAuth2Strategy
        callbackURL: isDev ? process.env.OAUTH_CALLBACK_URL_DEV : process.env.OAUTH_CALLBACK_URL_PROD
    },
    (accessToken, refreshToken, profile, done) => {
        if (refreshToken) {
            console.log('Received but ignoring refreshToken (truncated)', refreshToken.substr(0, 25));
        } else {
            console.log('No refreshToken received');
        }
        done(null, profile);
    });

    strategy.authorizationParams = (options) => {
    return {
        resource: 'http://localhost:3000/' // An identifier corresponding to the RPT
    };
};

strategy.userProfile = (accessToken, done) => {
    done(null, accessToken);
};

passport.use('provider', strategy);

passport.serializeUser(function(user, done) {
    done(null, user);
});
passport.deserializeUser(function(user, done) {
    done(null, user);
});