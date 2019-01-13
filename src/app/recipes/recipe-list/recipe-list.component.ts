import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [
  	new Recipe('A Test Recipe', 'This is simply a test', 'https://food.fnr.sndimg.com/content/dam/images/food/fullset/2016/7/22/3/FNM090116_Grilled-Steak-and-Greek-Corn-Salad_s4x3.jpg.rend.hgtvcom.966.725.suffix/1469255050835.jpeg'),
  	new Recipe('A Test Recipe2', 'This is simply a test2', 'https://food.fnr.sndimg.com/content/dam/images/food/fullset/2016/7/22/3/FNM090116_Grilled-Steak-and-Greek-Corn-Salad_s4x3.jpg.rend.hgtvcom.966.725.suffix/1469255050835.jpeg')
  ];

  @Output() recipeSelected = new EventEmitter<Recipe>();

  constructor() { }

  ngOnInit() {
  }

  onSelected(recipe: Recipe) {
    this.recipeSelected.emit(recipe);
  }

}
