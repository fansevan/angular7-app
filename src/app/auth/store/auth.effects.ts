import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {from} from 'rxjs';
import {map, switchMap, mergeMap, tap} from 'rxjs/operators';
import * as firebase from 'firebase';

import * as AuthActions from './auth.actions';

const localStorageTokenName = 'recipeToken';

@Injectable()
export class AuthEffects {
  @Effect() authSignup = this.actions$.pipe(
    ofType(AuthActions.TRY_SIGNUP),
    map((action: AuthActions.TrySignup) => {
      return action.payload;
    }),
    switchMap((authData: { email: string, password: string }) => {
      return from(firebase.auth().createUserWithEmailAndPassword(authData.email, authData.password));
    }),
    switchMap(() => {
      return from(firebase.auth().currentUser.getIdToken());
    }),
    mergeMap((token: string) => {
      localStorage.setItem(localStorageTokenName, token);
      this.router.navigate(['/']);
      return [
        new AuthActions.Signup(),
        new AuthActions.SetToken(token)
      ];
    }));

  @Effect() authSignin = this.actions$.pipe(
    ofType(AuthActions.TRY_SIGNIN),
    map((action: AuthActions.TrySignin) => {
      return action.payload;
    }),
    switchMap((authData: { email: string, password: string }) => {
      return from(firebase.auth().signInWithEmailAndPassword(authData.email, authData.password));
    }),
    switchMap(() => {
      return from(firebase.auth().currentUser.getIdToken());
    }),
    mergeMap((token: string) => {
      localStorage.setItem(localStorageTokenName, token);
      this.router.navigate(['/']);
      return [
        new AuthActions.Signin(),
        new AuthActions.SetToken(token)
      ];
    }));

  @Effect({dispatch: false}) authLogout = this.actions$.pipe(
    ofType(AuthActions.LOGOUT),
    tap(() => {
      localStorage.removeItem(localStorageTokenName);
      this.router.navigate(['/']);
    }));

  @Effect() authSetToken = this.actions$.pipe(
    ofType(AuthActions.TRY_SET_TOKEN),
    mergeMap(() => {
      const token = localStorage.getItem(localStorageTokenName);
      if (token) {
        return [
          new AuthActions.Signin(),
          new AuthActions.SetToken(token)
        ];
      }
      return;
    }));

  constructor(private actions$: Actions,
              private router: Router) {
  }

}
