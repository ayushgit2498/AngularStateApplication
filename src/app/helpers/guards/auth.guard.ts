import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { MsalBroadcastService, MsalService } from '@azure/msal-angular';
import { filter, of, switchMap } from 'rxjs';
import { InteractionStatus } from '@azure/msal-browser';

export const authGuard = () => {
  const msalService = inject(MsalService);
  const router = inject(Router);
  const msalBroadcastService = inject(MsalBroadcastService);
  return msalBroadcastService.inProgress$.pipe(
    filter(
      (status: InteractionStatus) =>
        status == InteractionStatus.None || status == InteractionStatus.Login
    ),
    switchMap(() => {
      console.log('account information');
      console.log(
        '------------------------------------------------------------------------------------------------------------------------'
      );

      console.log(msalService.instance.getAllAccounts());

      if (msalService.instance.getAllAccounts().length > 0) {
        return of(true);
      }
      router.navigate(['/auth']);
      return of(false);
    })
  );
};
