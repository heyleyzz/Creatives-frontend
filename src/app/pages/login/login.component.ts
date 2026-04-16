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

  isLoginMode: boolean = true;
  showPassword: boolean = false;

  constructor(private router: Router) {}

  submit() {

    const emailKey = this.email.trim().toLowerCase();
    const passwordKey = this.password.trim().toLowerCase();

    let users: any[] = [];
    const stored = localStorage.getItem('users');

    if (stored) {
      try {
        users = JSON.parse(stored);
      } catch (e) {
        console.error('Parse error:', e);
        users = [];
      }
    }

    // =========================
    // 🔥 LOGIN
    // =========================
    if (this.isLoginMode) {

      if (!emailKey || !passwordKey) {
        alert('Please enter your email and password');
        return;
      }

      const user = users.find((u: any) =>
        String(u.email).toLowerCase().trim() === emailKey &&
        String(u.password).toLowerCase().trim() === passwordKey
      );

      if (!user) {
        alert('Email not found or incorrect password.');
        return;
      }

      // ✅ THIS RESTORES YOUR WELCOME ANIMATION
      localStorage.setItem('currentUser', JSON.stringify(user));
      localStorage.setItem('name', user.name);
      localStorage.setItem('email', user.email);
      localStorage.setItem('role', user.role);
      localStorage.setItem('showWelcome', 'true');

      this.router.navigate(['/my-tasks']);
    }

    // =========================
    // 🔥 REGISTER
    // =========================
    else {

      if (!this.name || !this.role || !emailKey || !passwordKey) {
        alert('Please complete all fields');
        return;
      }

      if (!emailKey.endsWith('@liceo.edu.ph')) {
        alert('Use your Liceo email only');
        return;
      }

      const existingUser = users.find((u: any) =>
        String(u.email).toLowerCase().trim() === emailKey
      );

      if (existingUser) {
        alert('Email already registered. Please sign in.');
        return;
      }

      const newUser = {
        name: this.name.trim(),
        email: emailKey,
        password: passwordKey,
        role: this.role
      };

      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));

      // 🔥 SWITCH TO LOGIN
      this.isLoginMode = true;

      // 🔥 AUTO FILL
      this.email = newUser.email;
      this.password = newUser.password;
    }
  }

  toggleMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }
}