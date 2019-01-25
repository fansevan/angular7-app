import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import * as firebase from 'firebase';

import * as fromApp from './store/app.reducers';
import * as AuthActions from './auth/store/auth.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private store: Store<fromApp.AppState>) {
  }

  ngOnInit() {
    firebase.initializeApp({
      apiKey: 'AIzaSyC16I601n-gXJP55WXQ5qHy-wRkXiPPXzk',
      authDomain: 'angular-example-31590.firebaseapp.com'
    });

    this.store.dispatch(new AuthActions.TrySetToken());
  }
}
