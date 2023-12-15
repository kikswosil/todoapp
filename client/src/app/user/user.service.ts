import { Inject, Injectable } from '@angular/core';
import { UserLoginDTO } from './user-login-dto';
import {
  HttpClient,
  HttpHeaders,
} from '@angular/common/http';
import { UserResponse } from './user-response.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private url = 'http://localhost:3000/api/auth';

  private headers: HttpHeaders = new HttpHeaders().append(
    'Content-Type',
    'application/json'
  );

  constructor(@Inject(HttpClient) private httpClient: HttpClient) {}

  public logout() {
    window.sessionStorage.setItem('token', '');
    window.sessionStorage.setItem('user', '');
  }

  private isDefaultUser(user: any) {
    return user?.exp == -1 && user?.iat == -1 && user?.sub == -1 && user?.username == '';
  }

  public isAuthenticated() {
    const token = window.sessionStorage.getItem('token');
    if(token) return token;
    return null;
  }

  public authenticate(
    user: UserLoginDTO,
    next: (success: boolean, error: string) => void
  ): void {
    this.httpClient
      .post<{ access_token: string }>(`${this.url}/login`, user, {
        headers: this.headers,
      })
      .subscribe({
        next: (response) => {
          window.sessionStorage.setItem('token', response.access_token);
          next(true, '');
        },
        error: (response) => {
          window.sessionStorage.setItem('token', '');
          next(false, 'Authentication Failed: Check email or password.');
        },
      });
  }

  private readUserFromSessionOrDefault(): UserResponse {
    try{
      return JSON.parse(window.sessionStorage.getItem('user')!)?.user;
    }
    catch(error) {
      return {sub: -1, username: '', exp: -1, iat: -1};
    }
  }

  public getUserProfile(next: (user: UserResponse, error: string) => void): void {
    const user = this.readUserFromSessionOrDefault();
    if (!this.isDefaultUser(user) && user) return next(user, '');
    this.httpClient
      .get<UserResponse>(`${this.url}/user-profile`, {
        headers: this.headers.append(
          'Authorization',
          `Bearer ${window.sessionStorage.getItem('token')}`
        ),
      })
      .subscribe({
        next: (response) => {
          window.sessionStorage.setItem('user', JSON.stringify({user: response}));
          next(response, '');
        },
        error: (error) => {
          window.sessionStorage.setItem('user', JSON.stringify({user: {sub: -1, username: '', iat: -1, exp: -1}}));
          next(
            { sub: -1, username: '', iat: -1, exp: -1 },
            'something went wrong'
          );
        },
      });
  }
}
