/* import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { map, skip } from 'rxjs';

export const adminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService)
  const router = inject(Router)

  return authService.verifyUser().pipe(
    skip(1),
    map((authUser) => {
      if (!authUser) {
        return router.createUrlTree(['auth', 'login'])
      }
      return authUser.role !== 'ADMIN' ? router.createUrlTree(['dashboard', 'home'])
      : true
    })
  );
};
 */