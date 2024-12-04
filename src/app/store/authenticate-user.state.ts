import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';

export interface AuthenticateUserStateModel {
  isAuthorized: boolean;
  msalAuthToken: string | null;
  userName: string | null;
  name: string | undefined;
}
export class SetMSALAuthToken {
  static readonly type = '[AuthenticateUser] MSAL Auth Token';
  constructor(
    public isAuthorized: boolean,
    public msalAuthToken: string,
    public userName: string,
    public name: string | undefined
  ) {}
}
@State<AuthenticateUserStateModel>({
  name: 'authenticateUserState',
  defaults: {
    isAuthorized: false,
    msalAuthToken: null,
    userName: null,
    name: undefined,
  },
})
@Injectable()
export class AuthenticateUserState {
  //selector has logic to get data
  @Selector()
  static getIsAuthorized(state: AuthenticateUserStateModel) {
    return state.isAuthorized;
  }
  ///get token which is from msal
  @Selector()
  static getMSALAuthToken(state: AuthenticateUserStateModel) {
    return state.msalAuthToken;
  }
  //get name of logged in use
  @Selector()
  static getLoggedInUserName(state: AuthenticateUserStateModel) {
    return state.name;
  }
  //actions to do operation
  @Action(SetMSALAuthToken)
  setMSALAuthToken(
    { patchState }: StateContext<AuthenticateUserStateModel>,
    { isAuthorized, msalAuthToken, userName, name }: SetMSALAuthToken
  ): void {
    patchState({
      msalAuthToken: msalAuthToken,
      userName: userName,
      name: name,
      isAuthorized: isAuthorized,
    });
  }
}
