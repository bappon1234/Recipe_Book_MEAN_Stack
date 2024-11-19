import { Component } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
data = {
  email: '',
  password: ''
}

constructor(private authService: AuthService, private router:Router){}

// login():void{
// this.authService.login(this.data).subscribe(()=>{
//   console.log("Login Successfully");
//   alert("Login Successfully");
//   this.router.navigate(['/recipe/home']);
// },
// (error)=>{
//   console.log("Login error", error)
//   alert("Login error");
// }
// );
// }

login():void{
  this.authService.login(this.data).subscribe({
    next: (response) => {
      const {role, token}=response;
      localStorage.setItem('token', token);
      if(role === 'admin'){
        this.router.navigate(['/recipe/admin-home']);
      }else{
        this.router.navigate(['/recipe/home']);
      }
    },
    error: (err) => {
      console.error(err);
      alert('Login failed');
    }
  });
}
}
