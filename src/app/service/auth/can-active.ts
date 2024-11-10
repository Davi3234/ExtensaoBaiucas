import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { inject } from "@angular/core";

export const AuthGuardService: CanActivateFn = () => {
  let isAuthenticated = inject(AuthService).isAuthenticated()
  let router = inject(Router)

  if (!isAuthenticated) {
    router.navigate(['auth/login']);
    return false;
  }

  return true;
}
