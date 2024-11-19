import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-home',
  standalone: true,
  imports: [],
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css'] // Ensure the style URL is correct
})
export class AdminHomeComponent {
  menuOpen = false;

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }
}
