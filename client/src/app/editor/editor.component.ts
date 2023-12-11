import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Todo } from '../todos/todo.interface';
import { TodosService } from '../todos/todos.service';

@Component({
  selector: 'app-editor',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './editor.component.html',
  styleUrl: './editor.component.css'
})
export class EditorComponent implements OnInit {
  todo: Todo | undefined;

  constructor(@Inject(TodosService) private todosService: TodosService) {}

  ngOnInit(): void {}
}
