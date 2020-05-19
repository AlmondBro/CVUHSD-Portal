
//TODO: Fix serialize errors upon improper authentication

const path = require('path'),
      passport = require('passport'),
      AD = require('ad');

      require('dotenv').config({path: path.join(__dirname, './../../.env'), debug: true}) //Load environmental variables


// Passport session setup.
//   To support persistent login sessions, Passport needs to be able to
//   serialize users into and deserialize users out of the session.  Typically,
//   this will be as simple as storing the user ID when serializing, and finding
//   the user by ID when deserializing.

passport.serializeUser( (user, done) => {
  done(null, user);
});
passport.deserializeUser( (user, done) => {
  done(null, user);
});

/*
  passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  // console.log(`id: ${id}`);
  User.findById(id)
    .then((user) => {
      done(null, user);
    })
    .catch((error) => {
      console.log(`Error: ${error}`);
    });
});
*/

/*
  Here an working but still lazy way to use sessions and still "serialisize" the values.

var user_cache = {};

passport.serializeUser(function(user, next) {
  let id = user._id;
  user_cache[id] = user;
  next(null, id);
});

passport.deserializeUser(function(id, next) {
  next(null, user_cache[id]);
});
*/

const username = process.env.ADFS_USER_NAME;
const pass = process.env.ADFS_USER_PASSWORD;

let active_directory_config = { 
  url: process.env.ADFS_SERVER_URL,
  baseDN: process.env.LDAP_BASEDN,
  username: username,
  password: pass,
  passReqToCallback: true 
}

let ad_config = {
  url: process.env.ADFS_SERVER_URL,
  user: username,
  pass: pass
};

const activeDirectory = new AD(ad_config);

//Passport configuration for SAML
let ADFS_SAML_CONFIG = {
    //Comments are from docs: https://github.com/bergie/passport-saml#security-and-signatures
    entryPoint: process.env.ADFS_IDP,
    issuer: 'https://testwebapps.centinela.k12.ca.us', //issuer string to supply to identity provider
    callbackUrl: "http://localhost:3000/login", //full callbackUrl (overrides path/protocol if supplied)
    //privateCert: fs.readFileSync(path.join(__dirname, '/../../certificates/ADFS_Signing.pem'), 'utf-8'), //Authentication requests sent by Passport-SAML can be signed using RSA-SHA1. To sign them you need to provide a private key in the PEM format via the privateCert configuration key. The certificate should start with -----BEGIN PRIVATE KEY----- on its own line and end with -----END PRIVATE KEY----- on its own line.
    cert: [process.env.ADFS_SIGNING_CERT], //the IDP's public signing certificate used to validate the signatures of the incoming SAML Responses
  // other authn contexts are available e.g. windows single sign-on
    authnContext: 'http://schemas.microsoft.com/ws/2008/06/identity/authenticationmethod/password',
  // not sure if this is necessary?
    acceptedClockSkewMs: -1, // Time in milliseconds of skew that is acceptable between client and server when checking OnBefore and NotOnOrAfter assertion condition validity timestamps. Setting to -1 will disable checking these conditions entirely. Default is 0.
    identifierFormat: null,
  // this is configured under the Advanced tab in AD FS relying party
    signatureAlgorithm: 'sha256', //optionally set the signature algorithm for signing requests, valid values are 'sha1' (default), 'sha256', or 'sha512'
    RACComparison: 'exact', // default to exact RequestedAuthnContext Comparison Type
  };



module.exports = { passport, activeDirectory};