import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { CreateRecipeComponent } from './create-recipe/create-recipe.component';
import { RecipeAllComponent } from './recipe-all/recipe-all.component';
import { AboutComponent } from './about/about.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { RecipeUpdateComponent } from './recipe-update/recipe-update.component';
import { AdminRecipeComponent } from './admin-recipe/admin-recipe.component';

const routes: Routes = [
  {path:'register', component:RegisterComponent},
  {path:'login', component:LoginComponent},
  {path:'home', component:HomeComponent},
  {path:'contact', component:ContactComponent},
  {path:'create-recipe', component:CreateRecipeComponent},
  {path:'recipe-all', component:RecipeAllComponent},
  {path:'about', component:AboutComponent},
  {path:'admin-home', component:AdminHomeComponent},
  {path:'recipe-update/:id', component:RecipeUpdateComponent},
  {path:'admin-recipe', component:AdminRecipeComponent},
  
  {path:'', redirectTo:'login', pathMatch:'full'},
];

@NgModule({
  imports: [RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class RecipeRoutingModule { }
