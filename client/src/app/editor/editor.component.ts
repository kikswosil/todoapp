import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Todo } from '../todos/todo.interface';
import { TodosService } from '../todos/todos.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-editor',
  standalone: true,
  imports: [CommonModule, FormsModule],
  providers: [TodosService],
  templateUrl: './editor.component.html',
  styleUrl: './editor.component.css'
})
export class EditorComponent implements OnInit {
  todo: Todo = {title: '', details: '', isDone: false};

  constructor(
    @Inject(TodosService) private todosService: TodosService, 
    @Inject(ActivatedRoute) private route: ActivatedRoute,
    @Inject(Router) private router: Router
    ) {}

  ngOnInit(): void {
    this.todosService.getTodosForUser().then(({todos}) => {
      this.todo = todos.find(todo => todo.id == Number(this.route.snapshot.paramMap.get('id'))) ?? this.todo;
    });
  }

  onSubmit(form: NgForm) {
    if(!form.valid) return;
    console.log(this.todo);
  }
}
