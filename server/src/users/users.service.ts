import { Injectable } from '@nestjs/common';

import { User } from './user.interface';

@Injectable()
export class UsersService {
    users: User[] = [
        {
            id: 1,
            name: 'kikswosil',
            email: 'kikswosil@example.com',
            password: 'password'
        }
    ];

    async getUserByEmail(email: string): Promise<User | undefined> {
        return this.users.find((user: User) => user.email === email);
    }
}
