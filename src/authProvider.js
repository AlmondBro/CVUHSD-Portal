// authProvider.js
import { MsalAuthProvider, LoginType } from 'react-aad-msal';

// Msal Configurations
const config = {
  auth: {
    clientId: "3470eb69-479b-4be6-8d5e-0c5a11b78845",
    authority: "https://login.microsoftonline.com/c9a48109-968f-43b9-9e1f-ce756542dbe2",
    redirectUri: "http://localhost:3000/"
  },
  cache: {
    cacheLocation: "localStorage",
    storeAuthStateInCookie: true, // Set this to "true" if you are having issues on IE11 or Edge
    forceRefresh: false // Set this to "true" to skip a cached token and go to the server to get a new
  }
};

// Authentication Parameters
const authenticationParameters = {
  scopes: [
    "openid",
    "profile",
    'User.read'
  ]
}

// Options
const options = {
  loginType: LoginType.Popup,
  tokenRefreshUri: window.location.origin
}

export const authProvider = new MsalAuthProvider(config, authenticationParameters, options)