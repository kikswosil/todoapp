import { Inject, Injectable } from '@angular/core';
import { UserModule } from './user.module';
import { UserLoginDTO } from './user-login-dto';
import { User } from './user.interface';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: UserModule 
})
export class UserService {

  private url = "http://localhost:3000/api/auth";
  private jwt_token: string = "";
  private user: User | null = null;

  constructor(@Inject(HttpClient) private httpClient: HttpClient) {}

  authenticate(user: UserLoginDTO): Subscription {
    return this.httpClient.post(`${this.url}/login`, user).subscribe(response => console.log(response));
  }

  getUserProfile() {
    return this.user;
  }
}
