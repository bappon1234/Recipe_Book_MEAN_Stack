import { Routes } from '@angular/router';

export const routes: Routes = [
    {path:'recipe', loadChildren:()=> import('./recipe/recipe-routing.module').then(m=> m.RecipeRoutingModule)},
    {path:'', redirectTo:"recipe",  pathMatch:"full"},

];
