import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

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

  isLoginMode: boolean = true;
  showPassword: boolean = false;

  constructor(private router: Router, private authService: AuthService) {}

  submit() {
    const email = this.email.trim().toLowerCase();
    const password = this.password.trim();

    if (this.isLoginMode) {
      if (!email || !password) {
        alert('Please enter your email and password');
        return;
      }

      this.authService.login(email, password).subscribe({
        next: (user) => {
          this.authService.saveUser(user);
          this.router.navigate(['/my-tasks']);
        },
        error: () => alert('Invalid email or password.')
      });

    } else {
      if (!this.name || !this.role || !email || !password) {
        alert('Please complete all fields');
        return;
      }

      if (!email.endsWith('@liceo.edu.ph')) {
        alert('Use your Liceo email only');
        return;
      }

      this.authService.register(this.name, email, password, this.role).subscribe({
        next: () => {
          alert('Registered! Please sign in.');
          this.isLoginMode = true;
          this.email = email;
          this.password = password;
          this.name = '';           // ← clear name
          this.role = '';           // ← clear role
        },
        error: (err: any) => alert(err.error?.error || 'Registration failed.')
      });
    }
  }

  toggleMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }
}