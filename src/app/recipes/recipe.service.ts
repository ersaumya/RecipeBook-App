import {  Injectable } from '@angular/core';
import { Recipe } from "./recipes.model";
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';
@Injectable()
export class RecipeService{
    recipeChanged=new Subject<Recipe[]>();
    constructor(private slService:ShoppingListService){

    }
   
    private recipes: Recipe[] =[
        new Recipe('Paneer Masala',
        'Tasty paneer masala with indian spice',
        'https://cdn5.norecipes.com/wp-content/uploads/2018/02/02071116/mapo-tofu-recipe-011.jpg',
    [
        new Ingredient('Paneer',1),
        new Ingredient('Onion',2)

    ]),
        new Recipe('Roasted Chicken',
        'Grilled Rosemary chicken',
        'https://s3.amazonaws.com/finecooking.s3.tauntonclud.com/app/uploads/2017/04/18180350/051SIP112-grilled-mustard-rosemary-chicken-recipe-alt-main.jpg',
    [
        new Ingredient('Chicken',1),
        new Ingredient('Onion',2)

    ])
    ];
      getRecipes(){
        return  this.recipes.slice();
      }
      getRecipe(index:number){
        return this.recipes[index];
      }
      addIngredientToShoppingList(ingredients:Ingredient[]){
        this.slService.addIngredients(ingredients);
      }
      addRecipe(recipe:Recipe){
        this.recipes.push(recipe);
        this.recipeChanged.next(this.recipes.slice());
      }
      updateRecipe(index:number,newRecipe:Recipe){
        this.recipes[index]=newRecipe;
        this.recipeChanged.next(this.recipes.slice());
      }
      deleteRecipe(index:number){
          this.recipes.splice(index,1);
          this.recipeChanged.next(this.recipes.slice());
      }
}