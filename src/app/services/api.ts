// src/app/services/api.service.ts
import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { environment } from '../../environments/environment'

@Injectable({ providedIn: 'root' })
export class ApiService {
  private apiUrl = environment.apiUrl

  constructor(private http: HttpClient) {}

  getProfile(): Observable<{ user: string; role: string }> {
    return this.http.get<{ user: string; role: string }>(`${this.apiUrl}/protected/profile`)
  }

  getItems(): Observable<{ items: string[] }> {
    return this.http.get<{ items: string[] }>(`${this.apiUrl}/protected/items`)
  }

  createItem(name: string): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(`${this.apiUrl}/protected/items`, { name })
  }
}