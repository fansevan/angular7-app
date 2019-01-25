import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {map, take} from 'rxjs/operators';

import * as fromApp from '../store/app.reducers';
import * as fromAuth from './store/auth.reducers';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private store: Store<fromApp.AppState>,
              private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.store.select('auth').pipe(
      take(1),
      map((authState: fromAuth.State) => {
        const isAuthenticated = authState.authenticated;
        if (!isAuthenticated) {
          this.router.navigate(['/signin']);
        }
        return isAuthenticated;
      }));
  }
}
