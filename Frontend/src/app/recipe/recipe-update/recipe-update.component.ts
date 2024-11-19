import { Component } from '@angular/core';
import { RecipeService } from '../../service/recipe.service';
import { ActivatedRoute, Router } from '@angular/router';
import {  FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-recipe-update',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './recipe-update.component.html',
  styleUrl: './recipe-update.component.css'
})
export class RecipeUpdateComponent {
recipeForm!: FormGroup;
_id!: string;

constructor(private recipeService:RecipeService,
  private formBuilder: FormBuilder,
  private route:ActivatedRoute,
  private router:Router
){}

ngOnInit(): void {
  this._id = this.route.snapshot.paramMap.get('id') || '';  // This gets the 'id' param from the URL
  if (this._id) {
    this.loadRecipe();
  } else {
    console.error('Recipe Id is missing');
  }
  this.initializeForm();
}

initializeForm():void{
  this.recipeForm = this.formBuilder.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
    ingredients: ['', Validators.required],
    instructions: ['', Validators.required],
    tags: ['', Validators.required],
    categories: ['', Validators.required],
    cookingTime: ['', Validators.required],
    servings: ['', Validators.required],
    difficulty: ['', Validators.required],
    rating: ['', Validators.required],
    image: ['', Validators.required],
    createdBy: ['', Validators.required],
  });
}

loadRecipe(): void {
  if (this._id) {
    this.recipeService.recipeGet(this._id).subscribe(
      (recipe) => {
        this.recipeForm.patchValue(recipe);
      },
      (error) => {
        console.error(error);
      }
    );
  }
}

onSubmit(): void {
  if (this.recipeForm.valid) {
    this.recipeService.recipeUpdate(this._id, this.recipeForm.value).subscribe(
      () => {
        alert('Recipe updated successfully!');
        this.router.navigate(['/recipe/admin-home']); // Adjust route as needed
      },
      (error) => {
        console.error(error);
        alert('Failed to update recipe.');
      }
    );
  }
}
}
