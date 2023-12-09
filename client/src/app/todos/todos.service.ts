import { Inject, Injectable } from '@angular/core';
import { UserService } from '../user/user.service';
import { HttpClient } from '@angular/common/http';
import { TodoResponse } from './todo-response.interface';

@Injectable({
  providedIn: 'root'
})
export class TodosService {

  private url: string = "http://localhost:3000/api/todos";

  constructor(
    @Inject(UserService) private userService: UserService,
    @Inject(HttpClient) private httpClient: HttpClient
    ) { }

  public async getTodosForUser(): Promise<{todos: TodoResponse[] | [], error: string}> {
    const userId = await this.extractUserIdFromProfile();
    return new Promise<{todos: TodoResponse[] | [], error: string}>((resolve, reject) => {
      if(!this.userService.isAuthenticated()) resolve({todos: [], error: 'user is not authenticated'});
      this.httpClient.get<TodoResponse[]>(`${this.url}/${userId}`, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${this.userService.getToken()}`
        }
      }).subscribe({
          next: response => {
            resolve({todos: response, error: ''});
        },
        error: error => {
          resolve({todos: [], error: 'something went wrong when fetching todos.'});
        }
      });
    });
  }

  private async extractUserIdFromProfile() {
    return (await this.userService.getUserProfile()).response.sub;
  }
}
