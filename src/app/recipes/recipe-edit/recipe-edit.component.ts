import { RecipeService } from './../recipe.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Recipe } from '../recipes.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id:number;
  editMode=false;
  recipeForm:FormGroup;
  constructor(
    private route:ActivatedRoute,
    private recipeService:RecipeService,
    private router:Router) { }

  ngOnInit() {
    this.route.params
    .subscribe(
      (params:Params)=>{
        this.id = +params['id'];
        this.editMode=params['id'] != null;
        this.initForm();
      }
    );
  }
  onCancel(){
    this.router.navigate(['../'],{relativeTo:this.route});
  }
  

  getControls() {
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  onSubmit(){
    //const newRecipe=new Recipe(
    //  this.recipeForm.value['name'],
    //  this.recipeForm.value['desc'],
    //  this.recipeForm.value['imagePath'],
     // this.recipeForm.value['ingredient']);
   if(this.editMode){
     this.recipeService.updateRecipe(this.id,this.recipeForm.value)
   }else{
     this.recipeService.addRecipe(this.recipeForm.value);
   }
   this.onCancel();
  }
  private initForm(){
    let recipeName='';
    let recipeImagePath='';
    let recipeDescription='';
    let recipeIngredients=new FormArray([]);
    if(this.editMode){
      const recipe=this.recipeService.getRecipe(this.id);
      recipeName=recipe.name;
      recipeImagePath=recipe.imagePath;
      recipeDescription=recipe.desc;
      if(recipe['ingredients']){
        for(let ingredent of recipe.ingredients){
          recipeIngredients.push(
            new FormGroup({
              'name':new FormControl(ingredent.name,Validators.required),
              'amount':new FormControl(ingredent.amount,[
                Validators.required,
                Validators.pattern(/^[1-9]+[0-9]*$/)
              ])
            })
          );
        }
      }
    }
    this.recipeForm=new FormGroup({
      'name':new FormControl(recipeName,Validators.required),
      'imagePath':new FormControl(recipeImagePath,Validators.required),
      'desc':new FormControl(recipeDescription,Validators.required),
      'ingredients':recipeIngredients
    });
  }
  onDeleteIngredient(index:number){
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }
  onAddIngredient(){
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name':new FormControl(null,Validators.required),
        'amount':new FormControl(null,[
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/)
        ])
      })
    );
  }
 

}
