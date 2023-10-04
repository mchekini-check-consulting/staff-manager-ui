import { AuthConfig } from 'angular-oauth2-oidc';


export const authCodeFlowConfig: AuthConfig = {
  issuer: 'http://ci.check-consulting.net:10000/auth/realms/staff-manager-collab',
  redirectUri: window.location.origin,
  clientId: 'staff-manager-client',
  responseType: 'code',
  logoutUrl : 'http://ci.check-consulting.net:10000/auth/realms/staff-manager-collab/protocol/openid-connect/logout',
  postLogoutRedirectUri: window.location.origin,
  showDebugInformation: true,
  requireHttps: false
};

