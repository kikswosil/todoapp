import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { UserLoginDTO } from '../user/user-login-dto';
import { UserService } from '../user/user.service';
import { Inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule],
  providers: [UserService],
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  model = new UserLoginDTO('', '');
  errorMessage: string = '';

  constructor(
    @Inject(UserService) private userService: UserService,
    private router: Router
  ) {}

  async onSubmit(form: NgForm): Promise<void> {
    if (!form.valid) {
      this.errorMessage =
        'Cannot submit: One or more of required fields are empty.';
      return;
    }

    const {token, errorMessage} = await this.userService.authenticate(this.model);
    if(errorMessage) this.errorMessage = errorMessage;
    else console.log('token: ', token);
  }
}
