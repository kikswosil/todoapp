import { Inject, Injectable } from '@angular/core';
import { UserService } from '../user/user.service';
import { Todo } from './todo.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TodosService {

  private url: string = "http://localhost:3000/api/todos";

  constructor(
    @Inject(UserService) private userService: UserService,
    @Inject(HttpClient) private httpClient: HttpClient
    ) { }

  public async getTodosForUser() {
    if(!this.userService.isAuthenticated()) return;
    const userId = this.extractUserIdFromProfile();
    return new Promise<{todos: [{id: number, title: string, details: string, isDone: boolean, authorId: number}] | [], error: string}>((resolve, reject) => {
      this.httpClient.get<[{id: number, title: string, details: string, isDone: boolean, authorId: number}]>(`${this.url}/${userId}`, {
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
