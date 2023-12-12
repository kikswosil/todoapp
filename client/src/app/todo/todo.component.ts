import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Inject,
  Input,
  Output
} from '@angular/core';
import { DropdownComponent } from "../dropdown/dropdown.component";
import { Option } from '../dropdown/option.interface';
import { Todo } from '../todos/todo.interface';
import { Router } from '@angular/router';

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
      <app-dropdown [options]="options"></app-dropdown>
    </div>
  `,
    styleUrl: './todo.component.css',
    imports: [CommonModule, DropdownComponent]
})
export class TodoComponent {
  @Input({ required: true }) todo!: Todo;
  @Output() todoChange: EventEmitter<Todo> = new EventEmitter<Todo>();

  constructor(
    @Inject(Router) private router: Router
  ) {}

  options: Option[] = [
    {
      text: 'mark as done',
      callback: () => {
        console.log('done')
        this.todo.isDone = true;
        // add an http request here.
        this.todoChange.emit(this.todo);
      }
    },
    {
      text: 'edit',
      callback: () => {
        console.log('edit')
        // make it open the editor
        this.router.navigate(['/edit', {id: this.todo.id}]);
      }
    }
  ];
}
