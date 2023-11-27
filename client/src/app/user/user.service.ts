import { Injectable } from '@angular/core';
import { UserModule } from './user.module';
import { UserLoginDTO } from './user-login-dto';
import { User } from './user.interface';

@Injectable({
  providedIn: UserModule 
})
export class UserService {

  jwt_token: string = "";
  user: User | null = null;

  constructor() { }

  authenticate(user: UserLoginDTO): string {
    return this.jwt_token
  }

  getUserProfile() {
    return this.user;
  }
}
