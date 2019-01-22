import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
	constructor(private authService: AuthService) {}

	ngOnInit() {
		firebase.initializeApp({
			apiKey: "AIzaSyC16I601n-gXJP55WXQ5qHy-wRkXiPPXzk",
    		authDomain: "angular-example-31590.firebaseapp.com"
		});

		this.authService.setTokenFromLocalStorage();
	}
}
