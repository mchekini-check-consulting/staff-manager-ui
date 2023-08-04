import { AuthConfig } from 'angular-oauth2-oidc';


export const authCodeFlowConfig: AuthConfig = {
  issuer: 'https://keycloak.check-consulting.net/auth/realms/staff-manager-collab',
  redirectUri: window.location.origin,
  clientId: 'staff-manager-client',
  responseType: 'code',
  logoutUrl : 'https://keycloak.check-consulting.net/auth/realms/staff-manager-collab/protocol/openid-connect/logout',
  postLogoutRedirectUri: window.location.origin,
  showDebugInformation: true,
  requireHttps: false
};
