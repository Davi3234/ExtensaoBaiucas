import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';

export const AuthGuardService: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (!authService.isAuthenticated()) {
    if (router.url != '/auth/login') {
      router.navigate(['/auth/login']);
    }
    return false;
  }

  return true;
};
