export const environment = {
  production: false,
  msalConfig: {
    auth: {
      clientId: '10550ffb-f16d-4ba1-81e8-bb4876a9676f',
    },
  },
  apiConfig: {
    scopes: ['https://b2cemployee.onmicrosoft.com/employee/api/Data.Read'],
    uri: 'https://localhost:7253',
  },
  b2cPolicies: {
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
  },
};
