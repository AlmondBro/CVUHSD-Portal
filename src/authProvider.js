// authProvider.js
import { MsalAuthProvider, LoginType } from 'react-aad-msal';
import { Logger, LogLevel } from "msal";
// Msal Configurations
//https://sso.centinela.k12.ca.us/adfs/ls


//SSO Page:
//https://sso.centinela.k12.ca.us/adfs/ls/?client-request-id=24b1536e-3c4a-41f3-a120-30afe189cb83&wa=wsignin1.0&wtrealm=urn%3afederation%3aMicrosoftOnline&wctx=LoginOptions%3D3%26estsredirect%3d2%26estsrequest%3drQIIAXWRv2vUYBzG817urmccPKqUo4JkCCjCm7w_8wsFD5GWeva01yJ0e5O88WLT5MjlHG4R6aJbR3FSEYdbRCcR_4Jz6Sid1EkcRHRxNKV09Bk-PPAdvg_PozWwSUx8WSUm8g3KHCQD24PM8QLIAmlDN-ISopALjAPHdRkvFrV2NnhrrF35032hozdfn3zam4GlYVmOfMtK81Ckw3xc-hQhZL0H4ACA7wDMagayPYc7joShZAgyFtswIJ4LMaPCqZ6iwJOHtTP97qQckiPkRTKVv2utuBD3dmVWPlMNLGMqY4IhJRGFTPAQBqH0YERxIF1ii9imM9VAx6LwiMcIT9yJ3qlG6AnmYuRBz3ZjyGhQOYnjKqDDbc5IFEgyVzv5SGZJpI-KPE5SqW-NZWEWUkSfVfBNXU6r8_T-tbAKmGQyFeYOJmYozMn4oA5-1JdaoF3rAF25tIhUv9XS2kpH0ZW_dfCyUTX5vLjw6uPDvZuvz3-5-PPRaWXesMjd9ZXVTZfyftKzV3ZuZJPtct22-GZ_48EqujMmctobblzfSm67V7mP95vN_ebZeXPh1qDbM9cGv5rg8YLy4dR_FnmqgUPtHEGkaoNCinWCfcJ86mz_Aw2&cbcxt=&mkt=&lc=

const config = {
  auth: {
    clientId: "3470eb69-479b-4be6-8d5e-0c5a11b78845",
    authority: "https://login.microsoftonline.com/c9a48109-968f-43b9-9e1f-ce756542dbe2",
    redirectUri: window.location.origin 
  },
  cache: {
    cacheLocation: "localStorage",
    storeAuthStateInCookie: true, // Set this to "true" if you are having issues on IE11 or Edge
    forceRefresh: true // Set this to "true" to skip a cached token and go to the server to get a new
  },
  // Enable logging of MSAL events for easier troubleshooting.
    // This should be disabled in production builds.
    system: {
      logger: new Logger(
        (logLevel, message, containsPii) => {
          console.log("[MSAL]", message);
        },
        {
          level: LogLevel.Verbose,
          piiLoggingEnabled: false
        }
      )
    }
};

// Authentication Parameters
const authenticationParameters = {
  scopes: ["openid", "profile", "User.Read"],
  extraQueryParameters: { domain_hint: 'centinela.k12.ca.us' }
}


const authenticationParameters_noDomainHint = {
  scopes: ["openid", "profile", "User.Read"],
  extraQueryParameters: { }
}

// Options
const options = {
  loginType: LoginType.Redirect,
  tokenRefreshUri: window.location.origin
}

const authProvider = new MsalAuthProvider(config, authenticationParameters, options);

const authProvider_noDomainHint = new MsalAuthProvider(config, authenticationParameters_noDomainHint, options);

export { authProvider, authProvider_noDomainHint};