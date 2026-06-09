import { inject, Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { LoginRequest, LoginResponse, RegisterRequest } from "../models/auth";
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private http = inject(HttpClient);
  private readonly API_URL = 'https://aura-pulse-dz27.onrender.com/api/v2';

  login(credentials: LoginRequest) {
    return this.http.post<LoginResponse>(`${this.API_URL}/auth/login`, credentials).pipe(
      tap({
        next: (res) => {
          localStorage.setItem('token', res.token);
        },
        error(err) {
          console.error('Error en login:', err);
        },
      })
    );
  }

  register(userData: RegisterRequest) {
    return this.http.post(`${this.API_URL}/auth/register`, userData).pipe(
      tap({
        error(err) {
          console.error('Error en registro:', err);
        },
      })
    );
  }


  logout() {
    localStorage.removeItem('token');
  }

  
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
}