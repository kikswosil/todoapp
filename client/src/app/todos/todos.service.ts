import { Inject, Injectable } from '@angular/core';
import { UserService } from '../user/user.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TodoResponse } from './todo-response.interface';
import { Todo } from './todo.interface';

@Injectable({
  providedIn: 'root',
})
export class TodosService {
  private url: string = 'http://localhost:3000/api/todos';
  private headers: HttpHeaders = new HttpHeaders().append(
    'Content-Type',
    'application/json'
  );

  constructor(
    @Inject(UserService) private userService: UserService,
    @Inject(HttpClient) private httpClient: HttpClient
  ) {}

  public getTodosForUser(
    next: (todos: TodoResponse[], error: string) => void
  ): void {
    this.userService.getUserProfile((user, error) => {
      if (error) console.log(error);
      else
        this.httpClient
          .get<TodoResponse[]>(`${this.url}/${user.sub}`, {
            headers: this.headers.append(
              'Authorization',
              `Bearer ${this.userService.isAuthenticated()}`
            ),
          })
          .subscribe({
            next: (response) => {
              next(response, '');
            },
            error: (response) => {
              next([], 'Could not fetch.');
            },
          });
    });
  }

  public createTodo(todo: Todo, next: (response: any, error: string) => void) {
    const {id, ...cleanTodo} = todo;

    this.userService.getUserProfile((user, error) => {
      if(error) console.error('something went wrong, when getting user profile.');
      else this.httpClient.post<TodoResponse>(
        this.url,
        {
          ...cleanTodo,
          authorId: user.sub
        },
        {
          headers: this.headers.append(
            'Authorization',
            `Bearer ${this.userService.isAuthenticated()}`
          )
        }
      ).subscribe(
        {
          next: response => {
            console.log('success');
            next(response, '');
          },
          error: error => {
            console.error('could not create a todo.', error);
            next({}, error);
          }
        }
      );
    }) 
  }

  public deleteTodo(id: number, next: (response: any, error: any) => void) {
    this.userService.getUserProfile((user, error) => {
      if(error) return console.log(error); 
      this.httpClient.delete<any>(
        `${this.url}/${id}`,
        {
          headers: this.headers.append('Authorization', `Bearer ${this.userService.isAuthenticated()}`)
        },
      ).subscribe(
        {
          next: response => {
            next(response, '');
          },
          error: error => {
            next({}, error);
          }
        }
      );
    });
  }

  public updateTodo(todoId: number, newTodo: Todo, next: (response: any, error: any) => void) {
    const {id, ...cleanTodo} = newTodo;
    this.userService.getUserProfile((user, error) => {
      if(error) return console.log(error);
      this.httpClient.put(
        `${this.url}/${todoId}`,
        cleanTodo, 
        {
          headers: this.headers.append(
            'Authorization',
            `Bearer ${this.userService.isAuthenticated()}`
          )
        },
      ).subscribe(
        {
          next: response => {
            next(response, '');
          },
          error: error => {
            next({}, error);
          }
        }
      )
    });
  }
}
