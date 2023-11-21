import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

import { User } from './user.interface';

@Injectable()
export class UsersService {
  //   users: User[] = [
  //     {
  //       id: 1,
  //       name: 'kikswosil',
  //       email: 'kikswosil@example.com',
  //       password: 'password',
  //     },
  //   ];

  constructor(private prismaService: PrismaService) {}

  async getUserByEmail(email: string): Promise<User | undefined> {
    return await this.prismaService.user.findUnique({
      where: { email: email },
    });
    // return this.users.find((user: User) => user.email === email);
  }
}
