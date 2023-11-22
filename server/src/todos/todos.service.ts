import { Injectable } from '@nestjs/common';

import { Todo } from '@prisma/client';

import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TodosService {
  constructor(private prismaService: PrismaService) {}

  async getTodosByUserId(userId: number): Promise<Todo[]> {}

  async getTodoById(todoId: number): Promise<Todo> {}

  async insertTodo(todo: Todo) {}

  async updateTodo(oldTodoId: number, newTodo: Todo) {}

  async deleteTodo(todoId: number) {}
}
