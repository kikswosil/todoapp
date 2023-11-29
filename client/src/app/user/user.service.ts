import { Inject, Injectable } from '@angular/core';
import { UserModule } from './user.module';
import { UserLoginDTO } from './user-login-dto';
import { User } from './user.interface';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: UserModule,
})
export class UserService {
  private url = 'http://localhost:3000/api/auth';
  private access_token = '';
  private user: User | null = null;

  constructor(@Inject(HttpClient) private httpClient: HttpClient) {}

  authenticate(
    user: UserLoginDTO
  ): Promise<{ success: boolean; errorMessage: string }> {
    return new Promise<{ success: boolean; errorMessage: string }>(
      (resolve, reject) => {
        let httpError = "";
        this.httpClient
          .post<{ access_token: string }>(`${this.url}/login`, user, {
            headers: { 'Content-Type': 'application/json' },
          })
          .subscribe({
            next: (response) => {
              this.access_token = response?.access_token;
              resolve({success: this.access_token ? true : false, errorMessage: httpError});
            },
            error: (error: HttpErrorResponse) => {
              if (error.status == 401)
                httpError =
                  'Failed to authenticate: invalid email or password.';
              else if (error.status >= 500) httpError = 'Error: Server error.';
              else httpError = 'Error: Unknown error';
              resolve({success: this.access_token ? true : false, errorMessage: httpError});
            },
          });
      }
    );
  }

  getUserProfile(): Promise<{response: {}, error: string}> {
    const promise = new Promise<{response: {}, error: string}>((resolve, reject) => {
      this.httpClient.get<{sub: number, username: string, iat: number, exp: number}>(`${this.url}/user-profile`, {
        headers: {
          "Content-Type": "application/json", 
          "Authorization": `Bearer ${this.access_token}`
        }
      }).subscribe({
        next: (response) => {
          resolve({response, error: ""})
        },
        error: (error: HttpErrorResponse) => {
          resolve({response: {}, error: error.message})
        }
      })
    });
    return promise;
  }
}
