import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {take} from 'rxjs/operators';

import {Recipe} from '../recipe.model';
import * as ShoppingListActions from '../../shopping-list/store/shopping-list.actions';
import * as RecipesActions from '../store/recipes.actions';
import * as fromRecipes from '../store/recipes.reducers';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  id: number;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private store: Store<fromRecipes.FeatureState>) {
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.store.select('recipes')
        .pipe(take(1))
        .subscribe((recipeState: fromRecipes.State) => {
          this.recipe = recipeState.recipes[this.id];
        });
    });
  }

  onAddToShoppingList() {
    this.store.dispatch(new ShoppingListActions.AddIngredients(this.recipe.ingredients));
  }

  onEditRecipe() {
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

  onDeleteRecipe() {
    this.store.dispatch(new RecipesActions.DeleteRecipe(this.id));
    this.router.navigate(['/recipes'], {relativeTo: this.route});
  }

}
