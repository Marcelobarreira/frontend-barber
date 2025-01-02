import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const token = localStorage.getItem('jwt-token');
    const isAdmin = localStorage.getItem('isAdmin') === 'true';

    if (token && isAdmin) {
      return true;
    }

    this.router.navigate(['/login']);
    return false;
  }
}
