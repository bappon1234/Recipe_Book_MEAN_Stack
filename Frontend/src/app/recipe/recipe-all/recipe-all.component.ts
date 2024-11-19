import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../../service/recipe.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-recipe-all',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './recipe-all.component.html',
  styleUrls: ['./recipe-all.component.css']
})
export class RecipeAllComponent implements OnInit {
  recipes: any[] = []; 
  filteredRecipes: any[]=[];
  error: string | null = null;
  searchTerm: string='';
  private baseUrl: string = 'http://localhost:3000/uploads/';

  constructor(private recipeService: RecipeService) {}

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

  onSearch():void{
    const term = this.searchTerm.toLowerCase();
    this.filteredRecipes = this.recipes.filter(recipe =>
      recipe.name.toLowerCase().includes(term) 
    );
  }
}
