import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TodoComponent } from '../todo/todo.component';
import { Todo } from '../todos/todo.interface';
import { TodosService } from '../todos/todos.service';
import { UserService } from '../user/user.service';

@Component({
  standalone: true,
  imports: [TodoComponent, CommonModule],
  providers: [TodosService],
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent implements OnInit{
  username: string | undefined = '';

  // make this fetch from the server.
  todos: Todo[] = [];

  constructor(
    @Inject(UserService) private userService: UserService, 
    @Inject(TodosService) private todosService: TodosService,
    private router: Router
    ) {}

  async ngOnInit(): Promise<void> {
    // for development purposes disabled this line. uncomment it later.
    if(!this.userService.isAuthenticated()) this.router.navigate(['']);
    const {response, error} = await this.userService.getUserProfile();
    this.username = response?.username;
    this.todos = (await this.todosService.getTodosForUser()).todos;
  }
}
