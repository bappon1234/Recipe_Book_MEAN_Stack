import { Component } from '@angular/core';
import { RecipeService } from '../../service/recipe.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-recipe',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './create-recipe.component.html',
  styleUrls: ['./create-recipe.component.css']
})
export class CreateRecipeComponent {
  data = {
    name: '',
    description: '',
    ingredients: '',
    instructions: '',
    tags: '',
    categories: '',
    cookingTime: '',
    servings: '',
    difficulty: '',
    rating: '',
    image: null,
    createdBy: ''
  };

  constructor(private recipeService: RecipeService, private router: Router) {}

  onImageSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.data.image = file;
    }
  }

  recipeCreate() {
    if (!this.data.difficulty) {
      alert('Please select a difficulty');
      return;
    }
    if (!this.data.image) {
      alert('Please select an image');
      return;
    }

    // Form data should be sent as FormData for file uploads
    const formData = new FormData();
    formData.append('name', this.data.name);
    formData.append('description', this.data.description);
    formData.append('ingredients', this.data.ingredients);
    formData.append('instructions', this.data.instructions);
    formData.append('tags', this.data.tags);
    formData.append('categories', this.data.categories);
    formData.append('cookingTime', this.data.cookingTime);
    formData.append('servings', this.data.servings);
    formData.append('difficulty', this.data.difficulty);
    formData.append('rating', this.data.rating);
    formData.append('image', this.data.image);
    formData.append('createdBy', this.data.createdBy);

    this.recipeService.recipeCreate(formData).subscribe(() => {
      console.log('Recipe Created');
      alert('Recipe created successfully');
      this.router.navigate(['/recipes/home']);  // Redirect to recipes list or home page
    }, (error) => {
      console.log('Error:', error);
      alert('Error creating recipe');
    });
  }
}
