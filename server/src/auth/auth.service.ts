import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(email: string, pass: string) {
    const user = await this.usersService.getUserByEmail(email);
    if (user?.password !== pass) throw new UnauthorizedException();
    const payload = { sub: user.id, username: user.name };
    return { access_token: await this.jwtService.signAsync(payload) };
  }

  async signUp(username, email, password) {
    return await this.usersService.createUser(username, email, password);
  }
}
