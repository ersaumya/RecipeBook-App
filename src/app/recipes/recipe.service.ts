import { EventEmitter, Injectable } from '@angular/core';
import { Recipe } from "./recipes.model";
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
@Injectable()
export class RecipeService{
    constructor(private slService:ShoppingListService){

    }
    recipeSelected=new EventEmitter<Recipe>();
    private recipes: Recipe[] =[
        new Recipe('Mapo Tofu',
        'Mapo tafu',
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
}