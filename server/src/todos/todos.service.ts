import { Injectable } from '@nestjs/common';

import { Todo } from '@prisma/client';

import { PrismaService } from '../prisma/prisma.service';
import { title } from 'process';

@Injectable()
export class TodosService {
  constructor(private prismaService: PrismaService) {}

  async getTodosByUserId(userId: number): Promise<Todo[]> {
    return await this.prismaService.todo.findMany({
      where: { authorId: userId },
    });
  }

  async getTodoById(todoId: number): Promise<Todo> {
    return await this.prismaService.todo.findFirst({ where: { id: todoId } });
  }

  async insertTodo(todo: Todo) {
    return await this.prismaService.todo.create({
      data: {
        ...todo,
        author: {
          connect: {
            id: todo?.authorId,
          },
        },
      },
      include: {
        author: true,
      },
    });
  }

  async updateTodo(oldTodoId: number, newTodo: Todo) {
    return await this.prismaService.todo.update({
      data: newTodo,
      where: { id: oldTodoId },
    });
  }

  async deleteTodo(todoId: number) {
    return await this.prismaService.todo.delete({ where: { id: todoId } });
  }
}
