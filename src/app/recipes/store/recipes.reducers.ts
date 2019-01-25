import {Recipe} from '../recipe.model';
import {Ingredient} from '../../shared/ingredient.model';
import * as RecipeActions from './recipes.actions';
import * as fromApp from '../../store/app.reducers';

export interface FeatureState extends fromApp.AppState {
  recipes: State;
}

export interface State {
  recipes: Recipe[];
}

const initialState: State = {
  recipes: [
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
  ]
};

export function recipesReducer(state = initialState, action: RecipeActions.RecipeActions) {
  switch (action.type) {
    case RecipeActions.SET_RECIPES:
      return {
        ...state,
        recipes: [...action.payload]
      };
    case RecipeActions.ADD_RECIPE:
      return {
        ...state,
        recipes: [...state.recipes, action.payload]
      };
    case RecipeActions.UPDATE_RECIPE:
      return {
        ...state,
        recipes: state.recipes.map((recipe, index) =>
          index === action.payload.index ? {...recipe, ...action.payload.updatedRecipe} : recipe)
      };
    case RecipeActions.DELETE_RECIPE:
      return {
        ...state,
        recipes: state.recipes.filter((recipe, index) => index !== action.payload)
      };
    default:
      return state;
  }
}
