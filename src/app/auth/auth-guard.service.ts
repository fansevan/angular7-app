import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

	constructor(private authService: AuthService,
				private router: Router) {}

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
		const isAuthenticated = this.authService.isAuthenticated();
		if (!isAuthenticated) {
			this.router.navigate(['/signin']);
		}
		return isAuthenticated;
	}
}