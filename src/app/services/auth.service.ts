import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginResponse } from '../models/login-response.model';

export interface RegisterRequest {
  email: string;
  password: string;
  name: string;
  division: string;
  businessUnit: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private registerUrl = 'https://localhost:7106/api/Users/register';
  private loginUrl = 'https://localhost:7106/api/Users/Loginverify';
  private userId: string | null = null;

  constructor(private http: HttpClient) {}

  register(userData: RegisterRequest): Observable<any> {
    return this.http.post(this.registerUrl, userData);
  }

  login(email: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.loginUrl, { email, password });
  }

  setUserId(userId: string): void {
    this.userId = userId;
    localStorage.setItem('userId', userId);
  }

  getUserId(): string | null {
    if (this.userId) {
      return this.userId;
    }
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      this.userId = storedUserId;
      return this.userId;
    }
    return null;
  }
}
