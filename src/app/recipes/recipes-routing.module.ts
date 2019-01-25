import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {RecipesComponent} from './recipes.component';
import {RecipesStartComponent} from './recipes-start/recipes-start.component';
import {RecipeDetailComponent} from './recipe-detail/recipe-detail.component';
import {RecipeEditComponent} from './recipe-edit/recipe-edit.component';
import {AuthGuard} from '../auth/auth-guard.service';

const recipesRoutes: Routes = [
  {
    path: '', component: RecipesComponent, children: [
      {path: '', component: RecipesStartComponent},
      {path: 'new', component: RecipeEditComponent, canActivate: [AuthGuard]},
      {path: ':id', component: RecipeDetailComponent},
      {path: ':id/edit', component: RecipeEditComponent, canActivate: [AuthGuard]}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(recipesRoutes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class RecipesRoutingModule {
}
