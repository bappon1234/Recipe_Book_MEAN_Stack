import { Component } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';
import { FormsModule} from '@angular/forms'

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  data = {
    name: '',
    email: '',
    password: '',
    role: 'user'
  };
constructor(private authService:AuthService, private router:Router){}

register():void{
  this.authService.register(this.data).subscribe(()=>{
    console.log("User registered Successfully");
    alert("register succeessfully")
    this.router.navigate(['/recipe/login']);
  },
  (error)=>{
    console.log("Registered error", error);
    alert("Registered failed");
  }
);
}
}
