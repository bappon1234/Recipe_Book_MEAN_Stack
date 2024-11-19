import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../../service/recipe.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
menuOpen = false;

toggleMenu(){
  this.menuOpen = !this.menuOpen
}
recipes: any[]=[];
error: String | null=null;
private baseUrl: string = 'http://localhost:3000/uploads/';

constructor(private recipeService:RecipeService,
  private route:ActivatedRoute
){}

ngOnInit(): void {
 this.recipeGetAll() 
}
recipeGetAll(): void {
  this.recipeService.recipeGetAll().subscribe({
    next: (data: any[]) => {
      this.recipes = data.map((recipe: any) => ({
        ...recipe,
        imageUrl: `${this.baseUrl}${recipe.image.replace(/\\/g, '/')}`
      }));
    },
    error: (err) => {
      console.error(err);
      this.error = 'Failed to load recipes';
    }
  });
}

}
