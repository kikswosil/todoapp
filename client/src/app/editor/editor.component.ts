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
  styleUrl: './editor.component.css',
})
export class EditorComponent implements OnInit {
  todo: Todo = { id: -1, title: '', details: '', isDone: false };

  editorType: 'creator' | 'editor' = 'creator';

  constructor(
    @Inject(TodosService) private todosService: TodosService,
    @Inject(ActivatedRoute) private route: ActivatedRoute,
    @Inject(Router) private router: Router
  ) {}

  ngOnInit(): void {
    const IdStr: string = this.route.snapshot.paramMap.get('id') ?? 'create';

    this.editorType = IdStr == 'create' ? 'creator' : 'editor';

    if(this.editorType == 'editor') this.todosService.getTodosForUser((todos, error) => {
      if (error) return console.log(error);
      else {
        this.todo = todos.find((todo) => todo.id == Number(IdStr)) ?? this.todo;
      }
    });
  }

  private createTodo() {
    this.todosService.createTodo(this.todo, (todo, error) => {
      if(error) console.log(error);
      else console.log('created todo: ', todo); 
    });
  }

  onSubmit(form: NgForm) {
    if (!form.valid) return;
    if(this.editorType == 'creator') this.createTodo();
    if(this.editorType == 'editor') this.todosService.updateTodo(this.todo.id, this.todo, (response, error) => {
      if(error) return console.log(error);
      this.router.navigate(['/app']);
    });
  }

  cancelEdit() {
    this.router.navigate(['/app']);
  }
}
