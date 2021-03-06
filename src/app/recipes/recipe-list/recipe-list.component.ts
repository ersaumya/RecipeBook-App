import { AuthService } from './../../auth/auth.service';

import { Component, OnInit, OnDestroy } from '@angular/core';
import { Recipe } from '../recipes.model';
import { RecipeService } from '../recipe.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit,OnDestroy {
 subscription:Subscription;
  recipes: Recipe[];
  constructor(private recipeService:RecipeService,
              private router:Router,
              private route:ActivatedRoute,
            private authService:AuthService) { }

  ngOnInit() {
    this.subscription=this.recipeService.recipeChanged
    .subscribe(
      (recipes:Recipe[])=>{
        this.recipes=recipes;
      }
    );
    this.recipes=this.recipeService.getRecipes(); 
  }
  onNewRecipe(){
    this.router.navigate(['new'],{relativeTo:this.route});
  }
  ngOnDestroy(){
    this.subscription.unsubscribe();
 }
 isAuthenticated() {
  return this.authService.isAuthenticated();
}
}
