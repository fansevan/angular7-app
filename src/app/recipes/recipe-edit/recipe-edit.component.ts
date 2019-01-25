import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {FormGroup, FormControl, FormArray, Validators} from '@angular/forms';
import {Store} from '@ngrx/store';
import {take} from 'rxjs/operators';

import * as RecipesActions from '../store/recipes.actions';
import * as fromRecipes from '../store/recipes.reducers';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode = false;
  recipeForm: FormGroup;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private store: Store<fromRecipes.FeatureState>) {
  }

  ngOnInit() {
    this.route.params
      .subscribe((params: Params) => {
        this.id = +params['id'];
        this.editMode = params['id'] != null;
        this.initForm();
      });
  }

  onSubmit() {
    const newRecipe = this.recipeForm.value;

    if (this.editMode) {
      this.store.dispatch(new RecipesActions.UpdateRecipe({index: this.id, updatedRecipe: newRecipe}));
    } else {
      this.store.dispatch(new RecipesActions.AddRecipe(newRecipe));
    }

    this.onCancel();
  }

  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  onAddIngredient() {
    (<FormArray>this.recipeForm.get('ingredients'))
      .push(new FormGroup({
        name: new FormControl(null, Validators.required),
        amount: new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/)
        ]),
      }));
  }

  onDeleteIngredient(index: number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }

  getControls() {
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  private initForm() {
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescroption = '';
    const recipeIngredients = new FormArray([]);

    if (this.editMode) {
      this.store.select('recipes')
        .pipe(take(1))
        .subscribe((recipesState: fromRecipes.State) => {
          const recipe = recipesState.recipes[this.id];
          recipeName = recipe.name;
          recipeImagePath = recipe.imagePath;
          recipeDescroption = recipe.description;

          if (recipe['ingredients']) {
            for (const ingredient of recipe.ingredients) {
              recipeIngredients.push(new FormGroup({
                name: new FormControl(ingredient.name, Validators.required),
                amount: new FormControl(ingredient.amount, [
                  Validators.required,
                  Validators.pattern(/^[1-9]+[0-9]*$/)
                ]),
              }));
            }
          }
        });
    }

    this.recipeForm = new FormGroup({
      name: new FormControl(recipeName, Validators.required),
      imagePath: new FormControl(recipeImagePath, Validators.required),
      description: new FormControl(recipeDescroption, Validators.required),
      ingredients: recipeIngredients
    });
  }
}
