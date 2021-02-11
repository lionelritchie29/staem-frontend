import { Injectable } from '@angular/core';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { GameByIdGqlService } from './gql/query/game-by-id-gql.service';

@Injectable({
  providedIn: 'root',
})
export class MatureContentGuardService implements CanActivate {
  checked = new BehaviorSubject<boolean>(false);

  constructor(
    private gameByIdGqlService: GameByIdGqlService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    const id = route.paramMap.get('id');
    const checked = route.queryParamMap.get('checked');

    if (checked === 'true') {
      this.checked.next(true);
      return this.checked;
    }

    return this.gameByIdGqlService.fetch({ id }).pipe(
      map((res) => {
        const isAdult = res.data.game.tags.some((tag) => tag.isAdult);

        if (isAdult) {
          this.router.navigate([`/agecheck/${id}`]);
          return false;
        }

        return true;
      })
    );
  }
}
