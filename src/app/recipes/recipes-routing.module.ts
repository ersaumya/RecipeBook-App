import { NgModule } from '@angular/core';
import { Routes,RouterModule } from '@angular/router';
import { RecipesComponent } from './recipes.component';
import { RecipeStartComponent } from './recipe-start/recipe-start.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipeDetailsComponent } from './recipe-details/recipe-details.component';
import { AuthGuard } from '../auth/auth-guard.service';
const recipeRoutes:Routes=[
    {path:'',component:RecipesComponent,children:[
        {path:'',component:RecipeStartComponent},
        {path:'new',component:RecipeEditComponent,canActivate:[AuthGuard]},
        {path:':id',component:RecipeDetailsComponent},
        {path:':id/edit',component:RecipeEditComponent,canActivate:[AuthGuard]}
    ]},
];
@NgModule({
  imports:[
    RouterModule.forChild(recipeRoutes)
  ],
  exports:[RouterModule],
  providers:[AuthGuard]
})
export class RecipesRoutingModule{

}