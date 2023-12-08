import { Inject, Injectable } from '@angular/core';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class TodosService {
  constructor(@Inject(UserService) private userService: UserService) { }

  public async getTodosForUser() {
    if(!this.userService.isAuthenticated) return;
    const userId = this.extractUserIdFromProfile();
    // add http request here.
  }

  private async extractUserIdFromProfile() {
    return (await this.userService.getUserProfile()).response.sub;
  }
}
