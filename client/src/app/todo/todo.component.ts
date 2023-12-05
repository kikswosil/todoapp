import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Todo } from './todo.interface';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="todo">
      <h1>{{ todo.isDone ? '✅' : '❌' }} {{ todo.title }}</h1>
      <div>{{ todo.details }}</div>
    </div>
  `,
  styleUrl: './todo.component.css',
})
export class TodoComponent {
  @Input({ required: true }) todo!: Todo;
}
