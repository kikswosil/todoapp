import { Injectable } from '@nestjs/common';

import { Todo } from '@prisma/client';

import { PrismaService } from '../prisma/prisma.service';
import { TodoDto } from './todo.dto';

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

  async insertTodo(todo: TodoDto) {
    return await this.prismaService.todo.create({
      data: {
        ...todo,
      },
    });
  }

  async updateTodo(oldTodoId: number, newTodo: TodoDto) {
    return await this.prismaService.todo.update({
      data: newTodo,
      where: { id: oldTodoId },
    });
  }

  async deleteTodo(todoId: number) {
    console.log(todoId);
    return await this.prismaService.todo.delete({
      where: {
        id: todoId,
      },
    });
  }
}
