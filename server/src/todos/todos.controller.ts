import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Delete,
} from '@nestjs/common';
import { TodosService } from './todos.service';
import { TodoDto } from './todo.dto';

@Controller('todos')
export class TodosController {
  constructor(private todosService: TodosService) {}

  @Get('/:userId')
  async getTodosByUserId(@Param('userId') userId: string) {
    return await this.todosService.getTodosByUserId(Number(userId));
  }

  @Get('/todo/:todoId')
  async getTodoById(@Param() todoId: string) {
    return await this.todosService.getTodoById(Number(todoId));
  }

  @Post()
  async insertTodo(@Body() todoDto: TodoDto) {
    return await this.todosService.insertTodo(todoDto);
  }

  @Delete('/:todoId')
  async deleteTodo(@Param() params: any) {
    return await this.todosService.deleteTodo(Number(params?.todoId));
  }

  @Put('/:todoId')
  async updateTodo(@Param() params: any, @Body() newTodo: TodoDto) {
    return await this.todosService.updateTodo(Number(params?.todoId), newTodo);
  }
}
