import { Controller, Get, Param } from '@nestjs/common';
import { TodosService } from './todos.service';

@Controller('todos')
export class TodosController {
  constructor(private todosService: TodosService) {}

  @Get('/:userId')
  async getTodosByUserId(@Param('userId') userId: string) {
    return await this.todosService.getTodosByUserId(Number(userId));
  }
}
