import { Inject, Injectable } from '@angular/core';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class TodosService {
  constructor(@Inject(UserService) private userService: UserService) { }

  public getTodosForUser() {
    if(!this.userService.isAuthenticated) return;
  }
}
