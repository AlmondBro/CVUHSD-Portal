require('dotenv').config({path: __dirname + './../.env', debug: true}) //Load environmental variables

const fs = require('fs'),
      passport = require('passport');
      SamlStrategy = require('passport-saml').Strategy;
      wsfedsaml2 = require("passport-wsfed-saml2").Strategy;

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
    //Comments are from docs: https://github.com/bergie/passport-saml#security-and-signatures
    entryPoint: process.env.ADFS_IDP,
    issuer: 'https://portal.centinela.k12.ca.us', //issuer string to supply to identity provider
    callbackUrl: process.env.ADFS_IDP, //full callbackUrl (overrides path/protocol if supplied)
    //privateCert: fs.readFileSync('/../../certificates/ADFS_Signing.pem', 'utf-8'), //Authentication requests sent by Passport-SAML can be signed using RSA-SHA1. To sign them you need to provide a private key in the PEM format via the privateCert configuration key. The certificate should start with -----BEGIN PRIVATE KEY----- on its own line and end with -----END PRIVATE KEY----- on its own line.
    cert: process.env.ADFS_SIGNING_CERT, //the IDP's public signing certificate used to validate the signatures of the incoming SAML Responses
  // other authn contexts are available e.g. windows single sign-on
    authnContext: 'http://schemas.microsoft.com/ws/2008/06/identity/authenticationmethod/password',
  // not sure if this is necessary?
    acceptedClockSkewMs: -1, // Time in milliseconds of skew that is acceptable between client and server when checking OnBefore and NotOnOrAfter assertion condition validity timestamps. Setting to -1 will disable checking these conditions entirely. Default is 0.
    identifierFormat: null,
  // this is configured under the Advanced tab in AD FS relying party
    signatureAlgorithm: 'sha256', //optionally set the signature algorithm for signing requests, valid values are 'sha1' (default), 'sha256', or 'sha512'
    RACComparison: 'exact', // default to exact RequestedAuthnContext Comparison Type
  };

passport.use('wsfed-saml2', new wsfedsaml2({
    // ADFS RP identifier
    realm: process.env.ADFS_REALM,
    identityProviderUrl: process.env.ADFS_IDP,
    thumbprint: process.env.ADFS_THUMBPRINT //// ADFS token signing certificate
   // cert: fs.readFileSync(path.resolve(__dirname, "../certificates/ADFS_Signing.crt") )
  }, function (profile, done) {
    console.log(profile);
    return done(null, profile);
  }));

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