import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { GLOBALS } from '../globals';
import { AuthService } from './auth.service';
import { GetUserByIdGqlService } from './gql/get-user-by-id-gql.service';

@Injectable({
  providedIn: 'root',
})
export class AdminUserGuardService implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
    private getUserByIdGqlService: GetUserByIdGqlService
  ) {}

  canActivate(): Observable<boolean> | boolean {
    const userId = this.authService.getLoggedInUserId();

    if (userId === null) {
      this.router.navigate(['/']);
      return false;
    }

    return this.getUserByIdGqlService.fetch({ id: userId }).pipe(
      map((res) => {
        if (
          res.data.user.role.name === GLOBALS.ADMIN_USER_ROLE ||
          res.data.user.role.name === GLOBALS.ADMIN_MASTER_ROLE
        ) {
          return true;
        } else {
          this.router.navigate(['/']);
          return false;
        }
      })
    );
  }
}
