import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { TodosModule } from './todos/todos.module';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [UsersModule, AuthModule, TodosModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
