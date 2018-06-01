import { Injectable } from "@angular/core";
import { Http ,Response} from "@angular/http";
import 'rxjs/Rx';
import { Recipe } from './../recipes/recipes.model';
import { RecipeService } from './../recipes/recipe.service';
@Injectable()
export class DataStorageService{
constructor(
    private httpClient:Http,
    private recipeService:RecipeService){}
storeRecipes(){
    return this.httpClient.put('https://ng-recipe-book-1f94f.firebaseio.com/recipes.json',
           this.recipeService.getRecipes());
}
getRecipes(){
    this.httpClient.get('https://ng-recipe-book-1f94f.firebaseio.com/recipes.json')
    .map(
        (response:Response)=>{
            const recipes:Recipe[]=response.json();
            for(let recipe of recipes){
                if(!recipe['ingredients']){
                    console.log(recipe);
                    recipe['ingredients']=[];
                }
            }
            return recipes;
        }
    )
    .subscribe(
        (recipes:Recipe[])=>{
             this.recipeService.setRecipes(recipes);
        }
    );
  }
}