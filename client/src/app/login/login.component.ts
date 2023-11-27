import { Component } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { UserLoginDTO } from '../user/user-login-dto';
import { UserService } from '../user/user.service';
import { Inject } from '@angular/core';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  providers: [UserService],
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {

  model = new UserLoginDTO("", "");

  constructor(@Inject(UserService) private userService: UserService) {}

  onSubmit() {
    this.userService.authenticate(this.model);
  }
}
