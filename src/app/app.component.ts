import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './Services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'StateManagementFundamentals';
  isUserSignedIn: boolean = false;

  constructor(private authService: AuthenticationService) {}

  ngOnInit(): void {
    this.authService.initializeMSAL();
    this.authService.loginAndAcquiretokenBroadcast();
    this.isUserSignedIn = this.authService.IsSignedIn();
  }

  logout() {
    this.authService.signOut();
  }
}
