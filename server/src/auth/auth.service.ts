import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService) {}

    async signIn(email: string, pass: string) {
        const user = await this.usersService.getUserByEmail(email);
        if(user?.password !== pass) throw new UnauthorizedException();
        const {password, ...result} = user;
        return result;
    }
}
