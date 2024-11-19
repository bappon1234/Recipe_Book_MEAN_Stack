import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../../service/recipe.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-recipe',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './admin-recipe.component.html',
  styleUrls: ['./admin-recipe.component.css']
})
export class AdminRecipeComponent implements OnInit {
  recipes: any[] = [];
  filteredRecipes: any[] = [];
  error: string | null = null;
  searchTerm: string = '';
  private baseUrl: string = 'http://localhost:3000/uploads/';

  constructor(
    private recipeService: RecipeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.recipeGetAll();
  }

  recipeGetAll(): void {
    this.recipeService.recipeGetAll().subscribe({
      next: (data: any[]) => {
        this.recipes = data.map((recipe: any) => ({
          ...recipe,
          imageUrl: `${this.baseUrl}${recipe.image.replace(/\\/g, '/')}`,
          showDetails: false
        }));
        this.filteredRecipes = this.recipes;
      },
      error: (err) => {
        console.error(err);
        this.error = 'Failed to load recipes';
      }
    });
  }

  onSearch(): void {
    const term = this.searchTerm.toLowerCase();
    this.filteredRecipes = this.recipes.filter(recipe =>
      recipe.name.toLowerCase().includes(term)
    );
  }

  onUpdateRecipe(id: string): void {
    this.router.navigate([`/recipe/recipe-update/${id}`]);
  }

  onDeleteRecipe(id: string): void{
    if (confirm('Are you sure you want to delete this recipe?')) {
      this.recipeService.recipeDelete(id).subscribe({
        next: () => {
          this.recipes = this.recipes.filter(recipe => recipe._id !== id);
          this.filteredRecipes = this.filteredRecipes.filter(recipe => recipe._id !== id);
          alert('Recipe deleted successfully.');
        },
        error: (err) => {
          console.error(err);
          this.error = 'Failed to delete recipe';
        }
      });
    }
  }
}
