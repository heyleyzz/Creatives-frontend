import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface AuthResponse {
  name: string;
  email: string;
  role: string;
  user_id: number;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private API_URL = 'http://localhost:3000/api/users';

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.API_URL}/login`, { email, password });
  }

  register(name: string, email: string, password: string, role: string): Observable<any> {
    return this.http.post(`${this.API_URL}/register`, { name, email, password, role });
  }

  saveUser(user: AuthResponse) {
    localStorage.setItem('name', user.name);
    localStorage.setItem('email', user.email);
    localStorage.setItem('role', user.role);
    localStorage.setItem('user_id', String(user.user_id));
    localStorage.setItem('showWelcome', 'true');
  }

  logout() {
    localStorage.clear();
  }

  isLoggedIn(): boolean {
  return !!localStorage.getItem('name');
}

getToken(): string | null {
  return localStorage.getItem('token');
}

}