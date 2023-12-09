import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Todo } from '../todos/todo.interface';

@Component({
  selector: 'app-editor',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './editor.component.html',
  styleUrl: './editor.component.css'
})
export class EditorComponent {
  todo: Todo | undefined;
}
