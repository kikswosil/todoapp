import { Inject, Injectable } from '@angular/core';
import { UserModule } from './user.module';
import { UserLoginDTO } from './user-login-dto';
import { User } from './user.interface';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: UserModule 
})
export class UserService {

  private url = "http://localhost:3000/api/auth";
  private user: User | null = null;

  constructor(@Inject(HttpClient) private httpClient: HttpClient) {}

  authenticate(user: UserLoginDTO): Observable<any> {
    const request: Observable<any> = this.httpClient.post<{access_token: string}>(`${this.url}/login`, user, {headers: {"Content-Type": "application/json"}});
    return request;
  }

  getUserProfile() {
    return this.user;
  }
}
