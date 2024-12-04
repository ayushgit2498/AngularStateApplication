import {
  LogLevel,
  Configuration,
  BrowserCacheLocation,
} from '@azure/msal-browser';

const isIE =
  window.navigator.userAgent.indexOf('MSIE ') > -1 ||
  window.navigator.userAgent.indexOf('Trident/') > -1;

export const b2cPolicies = {
  names: {
    signUpSignIn: 'B2C_1_signin_signup',
    profileEdit: 'B2C_1_profile_edit',
    passwordReset: 'B2C_1_password_reset',
  },
  authorities: {
    signUpSignIn: {
      authority:
        'https://b2cemployee.b2clogin.com/b2cemployee.onmicrosoft.com/B2C_1_signin_signup',
    },
    profileEdit: {
      authority:
        'https://b2cemployee.b2clogin.com/b2cemployee.onmicrosoft.com/B2C_1_profile_edit',
    },
    passwordReset: {
      authority:
        'https://b2cemployee.b2clogin.com/b2cemployee.onmicrosoft.com/B2C_1_password_reset',
    },
  },
  authorityDomain: 'b2cemployee.b2clogin.com',
};

export const msalConfig: Configuration = {
  auth: {
    clientId: '10550ffb-f16d-4ba1-81e8-bb4876a9676f',
    authority: b2cPolicies.authorities.signUpSignIn.authority,
    knownAuthorities: [b2cPolicies.authorityDomain],
    redirectUri: '/',
  },
  cache: {
    cacheLocation: BrowserCacheLocation.LocalStorage,
    storeAuthStateInCookie: isIE,
  },
  system: {
    loggerOptions: {
      loggerCallback: (logLevel, message, containsPii) => {
        console.log(message);
      },
      logLevel: LogLevel.Verbose,
      piiLoggingEnabled: false,
    },
  },
};

export const protectedResources = {
  employeeManagementApi: {
    endpoint: 'https://localhost:7253',
    scopes: ['https://b2cemployee.onmicrosoft.com/employee/api/Data.Read'],
  },
};
export const loginRequest = {
  scopes: [],
};
