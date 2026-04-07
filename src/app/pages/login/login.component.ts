import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  name: string = '';
  email: string = '';
  password: string = '';
  role: string = '';

  constructor(private router: Router) {}

  login() {

    // ✅ VALIDATION
    if (!this.name || !this.email || !this.password || !this.role) {
      alert('Please complete all fields');
      return;
    }

    if (!this.email.endsWith('@liceo.edu.ph')) {
      alert('Use your Liceo email only');
      return;
    }

    // 🔥 SAVE DATA (THIS IS WHAT YOU WANTED)
    localStorage.setItem('name', this.name);
    localStorage.setItem('email', this.email);
    localStorage.setItem('role', this.role);

    // 🚀 NAVIGATE
    this.router.navigate(['/my-tasks']);
  }
}