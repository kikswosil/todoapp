import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Inject,
  Input,
  OnInit,
  Output
} from '@angular/core';
import { DropdownComponent } from "../dropdown/dropdown.component";
import { Option } from '../dropdown/option.interface';
import { Todo } from '../todos/todo.interface';
import { Router } from '@angular/router';
import { TodosService } from '../todos/todos.service';

@Component({
    selector: 'app-todo',
    standalone: true,
    template: `
    <div class="todo">
      <div>
        <h1>{{ todo.isDone ? '✅' : '❌' }} {{ todo.title }}</h1>
        <div>{{ todo.details }}</div>
      </div>
      <!-- could extract this into a separate component. -->
      <app-dropdown [dropdownId]="dropdownId" [options]="options"></app-dropdown>
    </div>
  `,
    styleUrl: './todo.component.css',
    imports: [CommonModule, DropdownComponent]
})
export class TodoComponent implements OnInit{
  
  @Input({ required: true }) todo!: Todo;
  @Output() refresh: EventEmitter<void> = new EventEmitter<void>();

  public dropdownId!: string;

  constructor(
    @Inject(TodosService) private todosService: TodosService,
    @Inject(Router) private router: Router
  ) {}

  ngOnInit(): void {
    this.dropdownId = `todo-dropdown-${this.todo.id}`;
  }

  options: Option[] = [
    {
      text: 'mark as done',
      callback: () => {
        console.log('done')
        this.todo.isDone = true;
        // add an http request here.
        this.todosService.updateTodo(this.todo.id, this.todo, (response, error) => {
          if(error) return console.log(error);
          this.refresh.emit();
        });
      }
    },
    {
      text: 'edit',
      callback: () => {
        this.router.navigate([`/app/edit/${this.todo.id}`]);
      }
    },
    {
      text: 'delete',
      callback: () => {
        this.todosService.deleteTodo(this.todo.id, (response, error) => {
          if(error) return console.log(error);
          this.refresh.emit();
        });
      }
    }
  ];
}
function ngOnInit() {
  throw new Error('Function not implemented.');
}

