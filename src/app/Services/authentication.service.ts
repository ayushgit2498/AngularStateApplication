import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  MSAL_GUARD_CONFIG,
  MsalBroadcastService,
  MsalGuardConfiguration,
  MsalService,
} from '@azure/msal-angular';
import {
  AuthenticationResult,
  EventMessage,
  EventType,
  RedirectRequest,
} from '@azure/msal-browser';
import { Store } from '@ngxs/store';
import { filter, tap } from 'rxjs';
import {
  AuthenticateUserState,
  SetMSALAuthToken,
} from '../store/authenticate-user.state';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private init: boolean = false;
  constructor(
    private readonly http: HttpClient,
    private readonly router: Router,
    @Inject(MSAL_GUARD_CONFIG)
    private readonly msalGuardConfig: MsalGuardConfiguration,
    private msalService: MsalService,
    private store: Store,
    private msalBroadcastService: MsalBroadcastService
  ) {}

  initializeMSAL() {
    //This will enable ACCOUNT_ADDED and ACCOUNT_REMOVED events emitted when a user logs in or out of another tab or window
    this.msalService.instance.enableAccountStorageEvents();
    this.msalBroadcastService.msalSubject$
      .pipe(
        tap((value) => {
          console.log('auth service:', value);
        }),
        filter(
          (message: EventMessage) =>
            message.eventType === EventType.ACCOUNT_ADDED ||
            message.eventType === EventType.ACCOUNT_REMOVED
        )
      )
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .subscribe((result: EventMessage) => {
        if (this.msalService.instance.getAllAccounts().length === 0) {
          window.location.pathname = '/';
        } else {
          console.log('+++In initialize MSAL instance start');
          console.log('loggedin');
          console.log('+++In initialize MSAL instance end');
          //setLoginDisplay() -- ToDo - research more
        }
      });
  }

  public loginAndAcquiretokenBroadcast() {
    this.msalBroadcastService.msalSubject$
      .pipe(
        filter(
          (msg: EventMessage) =>
            msg.eventType === EventType.LOGIN_SUCCESS ||
            msg.eventType === EventType.ACQUIRE_TOKEN_SUCCESS
        )
      )
      .subscribe((result: EventMessage) => {
        console.log('##### in login and acquire token start');
        console.log(result);

        const payload = result.payload as AuthenticationResult;
        this.msalService.instance.setActiveAccount(payload.account);

        console.log('##### in login and acquire token start');
        this.validateMSALSignIn();
      });
  }

  public IsSignedIn(): boolean {
    return this.store.selectSnapshot(AuthenticateUserState.getIsAuthorized);
  }

  public validateMSALSignIn(redirect: string = '/'): void {
    if (this.IsSignedIn()) {
      console.log('!!!!!!!User signed in start');
      console.log('!!!!!!!User signed in end');
      return;
    }
    if (!this.init) {
      console.log('!!!!!!!User first time token acquire and set start');
      this.acquireMSALSilentToken(redirect);
      console.log('!!!!!!!User first time token acquire and set end');
    }
  }

  private acquireMSALSilentToken(redirect: string = '/'): void {
    this.SetActiveMsalAccount(); // add logs here in this function

    const activeAccount = this.msalService.instance.getActiveAccount();

    if (!activeAccount) {
      //   if (!this.router.url.includes('auth/login')) {
      //     //if we want we can add return url here
      //     this.navigateTo(`auth/login`);
      //   }
      if (!this.router.url.includes('auth')) {
        //if we want we can add return url here
        this.navigateTo(`auth`);
      }
      return;
    }
    // If user is signed in do we need to acquire the token again ?
    // ans: when we sign in, in subscribe method we don't set token in store
    // when auzre redirects to app component then we acquire the token
    // and set it in store
    // question is: once token is set after login then
    // we should not acquire it every time the app loads
    this.msalService
      .acquireTokenSilent({
        ...this.msalGuardConfig.authRequest,
      } as RedirectRequest)
      .subscribe({
        next: (data) => {
          this.setupMSALAccount(data, redirect);
        },
        error: (err) => {
          console.log(`acquiretoken error {0}`, err);
          this.signOut();
        },
        complete: () => {
          console.log('acquire Token complete');
        },
      });
  }

  private SetActiveMsalAccount(): void {
    const accounts = this.msalService.instance.getAllAccounts();
    if (accounts?.length > 0) {
      const activeAccount = this.msalService.instance.getActiveAccount();
      if (activeAccount?.username !== accounts[0].username) {
        this.msalService.instance.setActiveAccount(accounts[0]);
      }
    }
  }

  private navigateTo(url: string): void {
    this.router.navigate([url]).then(() => {});
  }

  public setupMSALAccount(
    authResults: AuthenticationResult,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    navigateTo: string = '/'
  ): void {
    this.setMSALAuthToken(authResults);
    //navigate to desired
    if (navigateTo) {
      if (navigateTo !== this.router.url) {
        this.navigateTo(navigateTo);
      }
    }
  }

  private setMSALAuthToken(authData: AuthenticationResult): void {
    const accessToken = authData?.idToken;
    const userName = authData?.account ? authData.account.username : '';
    const name = authData?.account ? authData.account.name?.toString() : '';
    this.store.dispatch(
      new SetMSALAuthToken(true, accessToken, userName, name)
    );
  }

  public signInMSAL(): void {
    if (this.msalGuardConfig.authRequest) {
      this.msalService
        .loginRedirect({
          ...this.msalGuardConfig.authRequest,
        } as RedirectRequest)
        .subscribe({
          next(value) {
            console.log('===========Value afte sign in start========');
            console.log(value);
            console.log('===========Value afte sign in end==========');
          },
        });
    } else {
      this.msalService.loginRedirect();
    }
  }

  public signOut(): void {
    //clear all local storage
    localStorage.clear();
    sessionStorage.clear();
    this.msalService.logoutRedirect({}).subscribe(() => {});
  }
}
