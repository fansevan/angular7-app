import {ActionReducerMap} from '@ngrx/store';

import * as fromSoppingList from '../shopping-list/store/shopping-list.reducers';
import * as fromAuth from '../auth/store/auth.reducers';


export interface AppState {
  shoppingList: fromSoppingList.State;
  auth: fromAuth.State;
}

export const reducers: ActionReducerMap<AppState> = {
  shoppingList: fromSoppingList.shoppingListReducer,
  auth: fromAuth.authReducer
};
