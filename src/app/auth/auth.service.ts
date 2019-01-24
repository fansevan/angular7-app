import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase';

const localStorageTokenName = 'recipesToken';

@Injectable()
export class AuthService {
	token: string;

	constructor(private router: Router) {}

	signupUser(email: string, password: string) {
		firebase.auth().createUserWithEmailAndPassword(email, password)
			.catch(error => console.log(error));
	}

	signinUser(email: string, password: string) {
		firebase.auth().signInWithEmailAndPassword(email, password)
			.then(response => {
				this.router.navigate(['/']);

				firebase.auth().currentUser.getIdToken()
					.then((token: string) => {
						this.token = token;
						localStorage.setItem(localStorageTokenName, token);
					});
			})
			.catch(error => console.log(error));
	}

	logout() {
		firebase.auth().signOut();
		this.removeToken();
		this.router.navigate(['/']);
	}

	getToken() {
		return this.token;
	}

	setTokenFromLocalStorage() {
		this.token = localStorage.getItem(localStorageTokenName);
	}

	isAuthenticated() {
		return this.token != null;
	}

	removeToken() {
		localStorage.removeItem(localStorageTokenName);
		this.token = null;
	}
}