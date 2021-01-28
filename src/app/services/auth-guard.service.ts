import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    const userId = this.authService.getLoggedInUserId();

    if (userId === null) {
      this.router.navigate(['/login']);
      return false;
    }

    return true;
  }
}
