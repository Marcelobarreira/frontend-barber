import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { JwtService } from '../services/jwt/jwt.service';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const jwtService = inject(JwtService);

  const isAuthenticated = jwtService.isAuthenticated();

  if (!isAuthenticated) {
    router.navigate(['/login']);
    return false; // Retorna falso diretamente
  }
  return true; // Retorna verdadeiro diretamente
};
