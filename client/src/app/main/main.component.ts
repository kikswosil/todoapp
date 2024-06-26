import { CommonModule } from '@angular/common';
import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TodoComponent } from '../todo/todo.component';
import { Todo } from '../todos/todo.interface';
import { TodosService } from '../todos/todos.service';
import { UserService } from '../user/user.service';
import { DropdownService } from '../dropdown/dropdown.service';

@Component({
  standalone: true,
  imports: [TodoComponent, CommonModule],
  providers: [TodosService, DropdownService],
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.css',
})
export class MainComponent implements OnInit {
  username: string | undefined = '';

  todos: Todo[] = [];

  constructor(
    @Inject(UserService) private userService: UserService,
    @Inject(TodosService) private todosService: TodosService,
    @Inject(DropdownService) private dropdownService: DropdownService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userService.getUserProfile((user, error) => {
      if (error) console.log(error);
      else this.username = user.username;
    });
    this.refetch();
  }

  @HostListener('window:click')
  public closeDropdown() {
    this.dropdownService.setOpenList('');
  }

  public refetch() {
    this.todosService.getTodosForUser((todos, error) => {
      if (error) console.log(error);
      else this.todos = todos;
    });
  }
}
