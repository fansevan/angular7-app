import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Store} from '@ngrx/store';
import {Effect, Actions, ofType} from '@ngrx/effects';
import {map, switchMap, withLatestFrom} from 'rxjs/operators';

import {Recipe} from '../recipe.model';
import * as RecipesActions from './recipes.actions';
import * as fromRecipes from './recipes.reducers';

const URL = 'https://angular-example-31590.firebaseio.com/recipes.json';

@Injectable()
export class RecipesEffects {
  @Effect() recipesFetch = this.actions$.pipe(
    ofType(RecipesActions.FETCH_RECIPES),
    switchMap(() => {
      return this.http.get<Recipe[]>(URL);
    }),
    map((recipes: Recipe[]) => {
      for (const recipe of recipes) {
        if (!recipe['ingredients']) {
          recipe['ingredients'] = [];
        }
      }
      return new RecipesActions.SetRecipes(recipes);
    }));

  @Effect({dispatch: false}) recipesStore = this.actions$.pipe(
    ofType(RecipesActions.STORE_RECIPES),
    withLatestFrom(this.store.select('recipes')),
    switchMap(([action, state]) => {
      return this.http.put(URL, state.recipes);
    }));

  constructor(private actions$: Actions,
              private http: HttpClient,
              private store: Store<fromRecipes.FeatureState>) {
  }
}
