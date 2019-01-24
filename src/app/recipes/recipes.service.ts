import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

const URL = 'https://angular-example-31590.firebaseio.com/recipes.json';

@Injectable()
export class RecipesService {
	recipesChanged = new Subject<Recipe[]>();

	private recipes: Recipe[] = [
	  	new Recipe(
	  		'Schnitzel',
	  		'This is simply a test',
	  		'https://food.fnr.sndimg.com/content/dam/images/food/fullset/2016/7/22/3/FNM090116_Grilled-Steak-and-Greek-Corn-Salad_s4x3.jpg.rend.hgtvcom.966.725.suffix/1469255050835.jpeg',
	  		[
	  			new Ingredient('Meat', 1),
	  			new Ingredient('French Fries', 20)
	  		]),
	  	new Recipe(
	  		'Burger',
	  		'This is simply a test2',
	  		'https://food.fnr.sndimg.com/content/dam/images/food/fullset/2017/5/10/0/FNM_060117-Smashburger-Style-Burgers-Recipe_s4x3.jpg.rend.hgtvcom.616.462.suffix/1494459418304.jpeg',
	  		[
	  			new Ingredient('Buns', 2),
	  			new Ingredient('Meat', 1)
	  		])
	];

	constructor(private shoppingListService: ShoppingListService,
				private http: HttpClient) {}

	getRecipe(index: number) {
		return this.recipes[index];
	}

	getRecipes() {
		return this.recipes.slice();
	}

	addIngredientsToShoppingList(ingredients: Ingredient[]) {
		this.shoppingListService.addIngredients(ingredients);
	}

	addRecipe(recipe: Recipe) {
		this.recipes.push(recipe);
		this.recipesChanged.next(this.recipes.slice());
	}

	updateRecipe(index: number, newRecipe: Recipe) {
		this.recipes[index] = newRecipe;
		this.recipesChanged.next(this.recipes.slice());
	}

	deleteRecipe(index: number) {
		this.recipes.splice(index, 1);
		this.recipesChanged.next(this.recipes.slice());
	}

	setRecipes(recipes: Recipe[]) {
		this.recipes = recipes;
		this.recipesChanged.next(this.recipes.slice());
	}

	saveRecipes() {
		return this.http.put(URL, this.recipes);
	}

	fetchRecipes() {
		this.http.get<Recipe[]>(URL).subscribe(recipes => this.setRecipes(recipes));
	}
}