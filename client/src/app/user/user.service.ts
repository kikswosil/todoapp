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
  public access_token = '';
  private user: User | null = null;

  constructor(@Inject(HttpClient) private httpClient: HttpClient) {}

  authenticate(
    user: UserLoginDTO
  ): Promise<{ token: string; errorMessage: string }> {
    const promise = new Promise<{ token: string; errorMessage: string }>(
      (resolve, reject) => {
        let httpError = "";
        this.httpClient
          .post<{ access_token: string }>(`${this.url}/login`, user, {
            headers: { 'Content-Type': 'application/json' },
          })
          .subscribe({
            next: (response) => {
              this.access_token = response?.access_token;
              resolve({token: this.access_token, errorMessage: httpError});
            },
            error: (error: HttpErrorResponse) => {
              if (error.status == 401)
                httpError =
                  'Failed to authenticate: invalid email or password.';
              else if (error.status >= 500) httpError = 'Error: Server error.';
              else httpError = 'Error: Unknown error';
              resolve({token: this.access_token, errorMessage: httpError});
            },
          });
      }
    );
    return promise;
  }

  getUserProfile() {
    return this.user;
  }
}
