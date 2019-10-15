require('dotenv').config({path: __dirname + './../.env', debug: true}) //Load environmental variables

const fs = require('fs'),
      passport = require('passport');
      SamlStrategy = require('passport-saml').Strategy;



// Passport session setup.
//   To support persistent login sessions, Passport needs to be able to
//   serialize users into and deserialize users out of the session.  Typically,
//   this will be as simple as storing the user ID when serializing, and finding
//   the user by ID when deserializing.
passport.serializeUser(function(user, done) {
  done(null, user);
});
passport.deserializeUser(function(user, done) {
  done(null, user);
});


let ADFS_SAML_CONFIG = {
    entryPoint: process.env.ADFS_IDP,
    issuer: 'https://portal.centinela.k12.ca.us',
    callbackUrl: process.env.ADFS_IDP,
    privateCert: fs.readFileSync('../certificates/ADFS_Signing.pem', 'utf-8'),
    cert: fs.readFileSync('../certificates/ADFS_Encryption.crt', 'utf-8'),
  // other authn contexts are available e.g. windows single sign-on
    authnContext: 'http://schemas.microsoft.com/ws/2008/06/identity/authenticationmethod/password',
  // not sure if this is necessary?
    acceptedClockSkewMs: -1,
    identifierFormat: null,
  // this is configured under the Advanced tab in AD FS relying party
    signatureAlgorithm: 'sha256',
    RACComparison: 'exact', // default to exact RequestedAuthnContext Comparison Type
  };

passport.use(new SamlStrategy(
    ADFS_SAML_CONFIG,
    function(profile, done) {
        return done(null,
        {
            upn: profile['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/upn'],
            // e.g. if you added a Group claim
            group: profile['http://schemas.xmlsoap.org/claims/Group']
        });
    }
));

module.exports = passport;