import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class ValidateUserLoggedInService {
  constructor(private authService: AuthService) {}

  validate(): boolean {
    const userId = this.authService.getLoggedInUserId();

    if (!userId) {
      alert('You are not logged in yet');
      return false;
    }

    return true;
  }
}
