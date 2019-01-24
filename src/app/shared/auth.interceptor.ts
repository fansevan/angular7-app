import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { AuthService } from '../auth/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
	constructor(private authService: AuthService,
				private router: Router) {}

	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		const copiedReq = req.clone({
			params: req.params.set('auth', this.authService.getToken())
		});

		return next.handle(copiedReq).pipe(tap(event => {
			if (event instanceof HttpResponse) {
				// this.authService.removeToken();
				// this.router.navigate(['/signin']);
			}
		}));
	}
}