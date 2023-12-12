import { Inject, Injectable } from '@angular/core';
import { UserLoginDTO } from './user-login-dto';
import { User } from './user.interface';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';
import { UserResponse } from './user-response.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private url = 'http://localhost:3000/api/auth';
  private access_token = '';
  private user: UserResponse = {sub: -1, username: '', iat: -1, exp: -1};

  private headers: HttpHeaders = new HttpHeaders().append(
    'Content-Type',
    'application/json'
  );

  constructor(@Inject(HttpClient) private httpClient: HttpClient) {}

  logout() {
    this.access_token = '';
    window.sessionStorage.setItem('token', '');
  }

  isAuthenticated() {
    const token = window.sessionStorage.getItem('token') ?? this.access_token;
    if (this.access_token == '' && window.sessionStorage.getItem('token') != '')
      this.access_token = token;
    return token != '' ? true : false;
  }

  authenticate(
    user: UserLoginDTO,
    next: (success: boolean, error: string) => void
  ): void {
    this.httpClient
      .post<{ access_token: string }>(`${this.url}/login`, user, {
        headers: this.headers,
      })
      .subscribe({
        next: (response) => {
          this.access_token = response.access_token;
          window.sessionStorage.setItem('token', response.access_token);
          next(true, '');
        },
        error: (response) => {
          this.access_token = '';
          window.sessionStorage.setItem('token', '');
          console.error('something went wrong.');
          next(false, 'Authentication Failed: Check email or password.');
        },
      });
  }

  getUserProfile(next: (user: UserResponse, error: string) => void): void {
    if(this.user.sub != -1) return next(this.user, '');
    this.httpClient.get<UserResponse>(`${this.url}/user-profile`, {
      headers: this.headers.append('Authorization', `Bearer ${this.access_token}`),
    }).subscribe(
      {
        next: response => {
          this.user = response;
          next(response, '');
        },
        error: error => {
          this.user = {sub: -1, username: '', iat: -1, exp: -1};
          next({sub: -1, username: '', iat: -1, exp: -1}, 'something went wrong');
        }
      }
    );
  }

  getToken(): string | null {
    if (this.isAuthenticated()) return this.access_token;
    return null;
  }
}
