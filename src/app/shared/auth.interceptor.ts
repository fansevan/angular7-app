import {HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable, throwError} from 'rxjs';
import {switchMap, take, catchError} from 'rxjs/operators';

import * as fromApp from '../store/app.reducers';
import * as fromAuth from '../auth/store/auth.reducers';
import * as AuthActions from '../auth/store/auth.actions';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private store: Store<fromApp.AppState>) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.store.select('auth').pipe(
      take(1),
      switchMap((authState: fromAuth.State) => {
        const copiedReq = req.clone({
          params: req.params.set('auth', authState.token)
        });

        return next.handle(copiedReq)
          .pipe(catchError((error: HttpErrorResponse) => {
            if (error.status === 401) {
              this.store.dispatch(new AuthActions.Logout());
            }
            return throwError(error);
          }));
      }));
  }
}
