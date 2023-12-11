import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Todo } from '../todos/todo.interface';
import { TodosService } from '../todos/todos.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-editor',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './editor.component.html',
  styleUrl: './editor.component.css'
})
export class EditorComponent implements OnInit {
  todo: Todo | undefined;

  constructor(
    @Inject(TodosService) private todosService: TodosService, 
    @Inject(ActivatedRoute) private route: ActivatedRoute,
    @Inject(Router) private router: Router
    ) {}

  ngOnInit(): void {
    this.todosService.getTodosForUser().then(response => {
      this.todo = response.todos.find(todo => todo.id == Number(this.route.snapshot.paramMap.get('id')));
    });
  }
}
