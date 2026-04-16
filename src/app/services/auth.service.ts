import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface AuthResponse {
  token: string;
  name: string;
  email: string;
  role: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private API_URL = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  // 🔥 LOGIN (matches your login logic)
  login(email: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.API_URL}/login`, {
      email,
      password
    });
  }

  // 🔥 REGISTER (matches your register logic)
  register(name: string, email: string, password: string, role: string): Observable<any> {
    return this.http.post(`${this.API_URL}/register`, {
      name,
      email,
      password,
      role
    });
  }

  // 🔥 SAVE USER (same behavior as your localStorage)
  saveUser(user: AuthResponse) {
    localStorage.setItem('token', user.token);
    localStorage.setItem('name', user.name);
    localStorage.setItem('email', user.email);
    localStorage.setItem('role', user.role);
    localStorage.setItem('showWelcome', 'true');
  }

  // 🔥 LOGOUT (optional but useful)
  logout() {
    localStorage.clear();
  }
}