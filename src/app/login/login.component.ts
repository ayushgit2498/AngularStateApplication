import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../Services/authentication.service';
import { MsalService } from '@azure/msal-angular';
import { Store } from '@ngxs/store';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  public activeUser: string | null | undefined;
  isLoggedIn = false;
  private readonly _destroying$ = new Subject<void>();
  loginDisplay = false;
  public returnUrl: string | undefined;

  constructor(
    private readonly authenticationService: AuthenticationService,
    private msalService: MsalService,
    private store: Store,
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) {}
  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    this.navigateIfalreadyLoggedIn();
  }

  navigateIfalreadyLoggedIn() {
    this.loginDisplay = this.msalService.instance.getAllAccounts().length > 0;
    if (this.loginDisplay) {
      this.router.navigate([this.returnUrl]);
    }
  }

  login() {
    this.authenticationService.signInMSAL();
  }
}
