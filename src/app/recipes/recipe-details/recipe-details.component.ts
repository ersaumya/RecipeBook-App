import { RecipeService } from './../recipe.service';
import { Component, OnInit} from '@angular/core';
import { Recipe } from '../recipes.model';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css']
})
export class RecipeDetailsComponent implements OnInit {
 recipe:Recipe;
 id:number;
  constructor(private recipeService:RecipeService,
              private route:ActivatedRoute,
              private router:Router,
              private authService:AuthService) { }

  ngOnInit() {
    this.route.params
    .subscribe(
      (params:Params)=>{
        this.id= +params['id'];
        this.recipe=this.recipeService.getRecipe(this.id);
      }
    );
  }
  onAddToShoppingList(){
    this.recipeService.addIngredientToShoppingList(this.recipe.ingredients);
  }
  onEditRecipe(){
    this.router.navigate(['edit'],{relativeTo:this.route});
  }
  onDeleteRecipe(){
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['/recipes']);
  }
  isAuthenticated() {
    return this.authService.isAuthenticated();
  }
}
