import { Component } from '@angular/core';

import { RecipesService } from '../../recipes/resipes.service';
import { AuthService } from '../../auth/auth.service';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html'
})
export class HeaderComponent {
	constructor(private recipesService: RecipesService,
				private authService: AuthService) {}

	onSave() {
		this.recipesService.saveRecipes()
			.subscribe(response => console.log(response));
	}

	onFetch() {
		this.recipesService.fetchRecipes();
	}

	onLogout() {
		this.authService.logout();
	}

	isAuthenticated() {
	    return this.authService.isAuthenticated();
	}
}