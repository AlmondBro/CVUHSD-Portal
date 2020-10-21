import { AuthenticationContext, adalFetch, withAdalLogin } from 'react-adal';
 
export const adalConfig = {
  tenant: '2ea7058a-3b74-428d-8829-30c4101bdc9c',
  clientId: '2ea7058a-3b74-428d-8829-30c4101bdc9c',
  endpoints: {
    api: '2ea7058a-3b74-428d-8829-30c4101bdc9c',
  },
  cacheLocation: 'localStorage',
};
 
export const authContext = new AuthenticationContext(adalConfig);
 
export const adalApiFetch = (fetch, url, options) =>
  adalFetch(authContext, adalConfig.endpoints.api, fetch, url, options);
 
export const withAdalLoginApi = withAdalLogin(authContext, adalConfig.endpoints.api);